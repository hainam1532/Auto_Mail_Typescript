import express from 'express';
import bodyParser from 'body-parser';
import oracledb from 'oracledb';
import cors from 'cors';
import http from 'http';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods:["GET", "POST"],
    },
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
}));

const dbConfigOracle = {
    user: 'mes00',
    password: 'dbmes00',
    connectString: '10.30.3.51:1521/aphmes'
}

let clientOpts = {};
// eslint-disable-next-line no-undef
if (process.platform === 'win32') {
  clientOpts = { libDir: 'C:\\oracle\\instantclient_21_11' };
// eslint-disable-next-line no-undef
} else if (process.platform === 'darwin' && process.arch === 'x64') {
  // macOS Intel
  // eslint-disable-next-line no-undef, no-unused-vars
  clientOpts = { libDir: process.env.HOME + '/Downloads/instantclient_19_8' };
}

async function connectOracle() {
    try {
        oracledb.initOracleClient(clientOpts);
        await oracledb.createPool(dbConfigOracle);
        console.log('Connected to Oracle');
    } catch (err) {
        console.error('Error connecting to Oracle:', err);
    }
}
connectOracle();

io.on('connection', (socket, id) => {
    console.log('Client connected');
    sendAssemblyToClient(socket, io);
    sendStitchingToClient(socket, io);
    sendSummaryToClient(socket, io);
});

async function sendAssemblyToClient(socket, io) {
    try {
        const connectOracle = await oracledb.getConnection();
        const dataOracle = `SELECT * FROM LOG_SEND_MAIL WHERE TYPE_MAIL = 'Assembly' ORDER BY DATE_SEND DESC`;
        const dataResultOracle = await connectOracle.execute(dataOracle);
        const dataQueryOracle = dataResultOracle.rows;
        connectOracle.close();

        const jsonDataOracle = dataQueryOracle.map((row) => {
            const rowData = {};
            for (let i = 0; i < dataResultOracle.metaData.length; i++) {
                rowData[dataResultOracle.metaData[i].name] = row[i];
            }
            return rowData;
        });

        io.emit('dataAssembly', jsonDataOracle);

        //console.log('Data sent to client:', jsonDataOracle);
    } catch (err) {
        console.log('Error executing Oracle query: ', err);
    }
}

async function sendStitchingToClient(socket, io) {
    try {
        const connectOracle = await oracledb.getConnection();
        const dataOracle = `SELECT * FROM LOG_SEND_MAIL WHERE TYPE_MAIL = 'Stitching' ORDER BY DATE_SEND DESC`;
        const dataResultOracle = await connectOracle.execute(dataOracle);
        const dataQueryOracle = dataResultOracle.rows;
        connectOracle.close();

        const jsonDataOracle = dataQueryOracle.map((row) => {
            const rowData = {};
            for (let i = 0; i < dataResultOracle.metaData.length; i++) {
                rowData[dataResultOracle.metaData[i].name] = row[i];
            }
            return rowData;
        });

        io.emit('dataStitching', jsonDataOracle);

        //console.log('Data sent to client:', jsonDataOracle);
    } catch (err) {
        console.log('Error executing Oracle query: ', err);
    }
}

async function sendSummaryToClient(socket, io) {
    try {
        const connectOracle = await oracledb.getConnection();
        const dataOracle = `SELECT * FROM LOG_SEND_MAIL WHERE TYPE_MAIL = 'Summary' ORDER BY DATE_SEND DESC`;
        const dataResultOracle = await connectOracle.execute(dataOracle);
        const dataQueryOracle = dataResultOracle.rows;
        connectOracle.close();

        const jsonDataOracle = dataQueryOracle.map((row) => {
            const rowData = {};
            for (let i = 0; i < dataResultOracle.metaData.length; i++) {
                rowData[dataResultOracle.metaData[i].name] = row[i];
            }
            return rowData;
        });

        io.emit('dataSummary', jsonDataOracle);

        //console.log('Data sent to client:', jsonDataOracle);
    } catch (err) {
        console.log('Error executing Oracle query: ', err);
    }
}


app.get('/api/assembly', async (req, res) => {
    try {
        const connectOracle = await oracledb.getConnection();
        const dataOracle = `
        SELECT
    d.department_name,
    d.department_code     AS scan_detpt,
    nvl(c.target, 0)      AS target,
    nvl(c.h07, 0)         AS h07,
    nvl(c.h08, 0)         AS h08,
    nvl(c.h09, 0)         AS h09,
    nvl(c.h10, 0)         AS h10,
    nvl(c.h11, 0)         AS h11,
    nvl(c.h12, 0)         AS h12,
    nvl(c.h13, 0)         AS h13,
    nvl(c.h14, 0)         AS h14,
    nvl(c.h15, 0)         AS h15,
    nvl(c.h16, 0)         AS h16,
    nvl(c.h17, 0)         AS h17,
    nvl(c.h18, 0)         AS h18,
    nvl(c.h19, 0)         AS h19,
    nvl(c.total, 0)       AS total
FROM
    sjqdms_orginfo    f, base005m          d
    LEFT JOIN base005m_assembly bs ON d.department_code = bs.department_code
    LEFT JOIN (
        SELECT
            scan_detpt,
            pg_jms.gf_jms_workday_target(scan_detpt, trunc(sysdate))                  AS target,
            SUM(decode(hours, '07', label_qty, NULL))                                 AS h07,
            SUM(decode(hours, '08', label_qty, NULL))                                 AS h08,
            SUM(decode(hours, '09', label_qty, NULL))                                 AS h09,
            SUM(decode(hours, '10', label_qty, NULL))                                 AS h10,
            SUM(decode(hours, '11', label_qty, NULL))                                 AS h11,
            SUM(decode(hours, '12', label_qty, NULL))                                 AS h12,
            SUM(decode(hours, '13', label_qty, NULL))                                 AS h13,
            SUM(decode(hours, '14', label_qty, NULL))                                 AS h14,
            SUM(decode(hours, '15', label_qty, NULL))                                 AS h15,
            SUM(decode(hours, '16', label_qty, NULL))                                 AS h16,
            SUM(decode(hours, '17', label_qty, NULL))                                 AS h17,
            SUM(decode(hours, '18', label_qty, NULL))                                 AS h18,
            SUM(decode(hours, '19', label_qty, NULL))                                 AS h19,
            SUM(label_qty)                                                            AS total
        FROM
            (
                SELECT
                    SUM(label_qty) AS label_qty,
                    hours,
                    scan_detpt
                FROM
                    (
                        SELECT
                            scan_detpt,
                            scan_date,
                            to_char((to_date(scan_date, 'yyyy/mm/dd hh24:mi:ss') - 30 / 24 / 60), 'hh24') AS hours,
                            SUM(label_qty)                                                                AS label_qty
                        FROM
                            (
                                SELECT
                                    SUM(label_qty)     AS label_qty,
                                    to_char(scan_date, 'mi'),
                                    nvl(scan_detpt, 0) AS scan_detpt,
                                    (
                                        CASE
                                            WHEN floor((to_char(scan_date, 'mi')) / 30) = 0 THEN
                                                to_char(scan_date, 'yyyy/mm/dd hh24')
                                                || ':00:00'
                                            WHEN floor((to_char(scan_date, 'mi')) / 30) = 1 THEN
                                                to_char(scan_date, 'yyyy/mm/dd hh24')
                                                || ':30:00'
                                        END
                                    )                  AS scan_date
                                FROM
                                    sfc_trackout_list s
                                WHERE
                                        scan_date >= trunc(sysdate)
                                    AND scan_date < trunc(sysdate + 1)
                                    AND inout_pz = 'OUT'
                                GROUP BY
                                    scan_detpt,
                                    scan_date
                            )
                        GROUP BY
                            scan_detpt,
                            scan_date
                    )
                GROUP BY
                    hours,
                    scan_detpt
                ORDER BY
                    scan_detpt,
                    hours
            )
        GROUP BY
            scan_detpt
    )                 c ON d.department_code = c.scan_detpt
WHERE
        f.code = d.udf05
    AND d.udf06 = 'Y'
    AND d.department_code = bs.department_code
    AND d.department_code LIKE '%L%'
ORDER BY
    d.department_code ASC`;
        const dataResultOracle = await connectOracle.execute(dataOracle);
        const dataQueryOracle = dataResultOracle.rows;
        connectOracle.close();

        const jsonDataOracle = dataQueryOracle.map((row) => {
            const rowData = {};
            for (let i = 0; i < dataResultOracle.metaData.length; i++) {
                rowData[dataResultOracle.metaData[i].name] = row[i];
            }
            return rowData;
        });

        res.status(200).json(jsonDataOracle);
        console.log('Data sent to client:', jsonDataOracle);


    } catch (err) {
        console.log('Error getting Oracle query:', err);
        res.status(500).send('Error query data from Oracle');
    }
});

app.get('/api/stitching', async (req, res) => {
    try {
        const connectOracle = await oracledb.getConnection();
        const dataOracle = `
        SELECT ROWNUM AS sno, d.department_name,d.department_code as scan_detpt, NVL(c.target, 0) AS target,
  NVL(c.workhours, 0) AS workhours,
  NVL(c.h07, 0) AS h07,
  NVL(c.h08, 0) AS h08,
  NVL(c.h09, 0) AS h09,
  NVL(c.h10, 0) AS h10,
  NVL(c.h11, 0) AS h11,
  NVL(c.h12, 0) AS h12,
  NVL(c.h13, 0) AS h13,
  NVL(c.h14, 0) AS h14,
  NVL(c.h15, 0) AS h15,
  NVL(c.h16, 0) AS h16,
  NVL(c.h17, 0) AS h17,
  NVL(c.h18, 0) AS h18,
  NVL(c.h19, 0) AS h19,
  NVL(c.total, 0) AS total,
  NVL(c.balance, 0) AS balance,
  NVL(c.acheivement, 0) AS acheivement,
  NVL(c.bcheivement, 0) AS bcheivement,
  NVL(c.ccheivement, 0) AS ccheivement
  FROM sjqdms_orginfo f, base005m d
  LEFT JOIN BASE005M_STITCHING bs
  on d.department_code =bs.department_code
  LEFT JOIN (SELECT scan_detpt,
                    pg_jms.GF_JMS_WorkDay_Target(scan_detpt, TRUNC(SYSDATE)) AS target,
                    GF_WORKINGHOURS_PERC(scan_detpt) AS workhours,
                    SUM(DECODE(hours, '07', label_qty, NULL)) AS H07,
                    SUM(DECODE(hours, '08', label_qty, NULL)) AS H08,
                    SUM(DECODE(hours, '09', label_qty, NULL)) AS H09,
                    SUM(DECODE(hours, '10', label_qty, NULL)) AS H10,
                    SUM(DECODE(hours, '11', label_qty, NULL)) AS H11,
                    SUM(DECODE(hours, '12', label_qty, NULL)) AS H12,
                    SUM(DECODE(hours, '13', label_qty, NULL)) AS H13,
                    SUM(DECODE(hours, '14', label_qty, NULL)) AS H14,
                    SUM(DECODE(hours, '15', label_qty, NULL)) AS H15,
                    SUM(DECODE(hours, '16', label_qty, NULL)) AS H16,
                    SUM(DECODE(hours, '17', label_qty, NULL)) AS H17,
                    SUM(DECODE(hours, '18', label_qty, NULL)) AS H18,
                    SUM(DECODE(hours, '19', label_qty, NULL)) AS H19,
                    SUM(label_qty) AS Total,
                    SUM(label_qty) -
                    pg_jms.GF_JMS_WorkDay_Target(scan_detpt, TRUNC(SYSDATE)) AS Balance,
                    CASE
                      WHEN NVL(MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                TRUNC(SYSDATE))),
                               0) = 0 THEN
                       '无目标产量'
                      WHEN GF_WORKINGHOURS_PERC(scan_detpt) = 0 THEN
                       '无工作历资料'
                      ELSE
                       NVL(ROUND(SUM(label_qty) /
                                 MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                  TRUNC(SYSDATE))),
                                 3) * 100,
                           0) || '%'
                    END AS Acheivement,
                    CASE
                      WHEN NVL(MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                TRUNC(SYSDATE))),
                               0) = 0 THEN
                       0
ELSE NVL(ROUND(SUM(label_qty) /MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                  TRUNC(SYSDATE))),
                                 3),
                           0) * 100
                    END AS Bcheivement,
                    GF_WORKINGHOURS_PERC(scan_detpt) AS Ccheivement
               FROM (SELECT SUM(label_qty) AS label_qty, hours, scan_detpt
                       FROM (SELECT scan_detpt,
                                    scan_date,
                                    TO_CHAR((TO_DATE(scan_date,
                                                     'yyyy/mm/dd hh24:mi:ss') -
                                            30 / 24 / 60),
                                            'hh24') AS hours,
                                    SUM(label_qty) AS label_qty
                               FROM (SELECT SUM(label_qty) AS label_qty,
                                            TO_CHAR(scan_date, 'mi'),
                                            nvl(scan_detpt, 0) as scan_detpt,
                                            (CASE
                                              WHEN FLOOR((TO_CHAR(scan_date,
                                                                  'mi')) / 30) = 0 THEN
                                               TO_CHAR(scan_date,
                                                       'yyyy/mm/dd hh24') ||
                                               ':00:00'
                                              WHEN FLOOR((TO_CHAR(scan_date,
                                                                  'mi')) / 30) = 1 THEN
                                               TO_CHAR(scan_date,
                                                       'yyyy/mm/dd hh24') ||
                                               ':30:00'
                                            END) AS scan_date
                                       FROM sfc_trackout_list s
                                      WHERE scan_date >= TRUNC(SYSDATE)
                                        AND scan_date < TRUNC(SYSDATE + 1)
                                        AND INOUT_PZ = 'OUT'
                                      GROUP BY scan_detpt, scan_date)
                              GROUP BY scan_detpt, scan_date)
                      GROUP BY hours, scan_detpt
                      ORDER BY scan_detpt, hours)
              GROUP BY scan_detpt) c
    ON d.department_code = c.scan_detpt
 WHERE f.code = d.udf05
   AND d.udf06 = 'Y'
   and d.department_code =bs.department_code
   and d.department_code like '%S%'
 ORDER BY d.department_code asc`;
        const dataResultOracle = await connectOracle.execute(dataOracle);
        const dataQueryOracle = dataResultOracle.rows;
        connectOracle.close();

        const jsonDataOracle = dataQueryOracle.map((row) => {
            const rowData = {};
            for (let i = 0; i < dataResultOracle.metaData.length; i++) {
                rowData[dataResultOracle.metaData[i].name] = row[i];
            }
            return rowData;
        });

        res.status(200).json(jsonDataOracle);
        console.log('Data sent to client:', jsonDataOracle);


    } catch (err) {
        console.log('Error getting Oracle query:', err);
        res.status(500).send('Error query data from Oracle');
    }
});

app.get('/api/summary', async (req, res) => {
    try {
        const connectOracle = await oracledb.getConnection();
        const dataOracle = `
        SELECT 'STITCHING_' || d.udf09 as plant,
       SUM(NVL(c.target, 0)) AS target,
       SUM(NVL(c.total, 0)) AS actual_output
  FROM sjqdms_orginfo f, base005m d
  LEFT JOIN BASE005M_STITCHING bs
    on d.department_code = bs.department_code
  LEFT JOIN (SELECT scan_detpt,
                    pg_jms.GF_JMS_WorkDay_Target(scan_detpt, TRUNC(SYSDATE)) AS target,
                    GF_WORKINGHOURS_PERC(scan_detpt) AS workhours,
                    SUM(label_qty) AS Total,
                    SUM(label_qty) -
                    pg_jms.GF_JMS_WorkDay_Target(scan_detpt, TRUNC(SYSDATE)) AS Balance,
                    CASE
                      WHEN NVL(MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                TRUNC(SYSDATE))),
                               0) = 0 THEN
                       '无目标产量'
                      WHEN GF_WORKINGHOURS_PERC(scan_detpt) = 0 THEN
                       '无工作历资料'
                      ELSE
                       NVL(ROUND(SUM(label_qty) /
                                 MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                  TRUNC(SYSDATE))),
                                 3) * 100,
                           0) || '%'
                    END AS Acheivement,
                    CASE
                      WHEN NVL(MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                TRUNC(SYSDATE))),
                               0) = 0 THEN
                       0
                      ELSE
                       NVL(ROUND(SUM(label_qty) /
                                 MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                  TRUNC(SYSDATE))),
                                 3),
                           0) * 100
                    END AS Bcheivement,
                    GF_WORKINGHOURS_PERC(scan_detpt) AS Ccheivement
               FROM (SELECT SUM(label_qty) AS label_qty, hours, scan_detpt
                       FROM (SELECT scan_detpt,
                                    scan_date,
                                    TO_CHAR((TO_DATE(scan_date,
                                                     'yyyy/mm/dd hh24:mi:ss') -
                                            30 / 24 / 60),
                                            'hh24') AS hours,
                                    SUM(label_qty) AS label_qty
                               FROM (SELECT SUM(label_qty) AS label_qty,
                                            TO_CHAR(scan_date, 'mi'),
                                            nvl(scan_detpt, 0) as scan_detpt,
                                            (CASE
                                              WHEN FLOOR((TO_CHAR(scan_date,
                                                                  'mi')) / 30) = 0 THEN
                                               TO_CHAR(scan_date,
                                                       'yyyy/mm/dd hh24') ||
                                               ':00:00'
                                              WHEN FLOOR((TO_CHAR(scan_date,
                                                                  'mi')) / 30) = 1 THEN
                                               TO_CHAR(scan_date,
                                                       'yyyy/mm/dd hh24') ||
                                               ':30:00'
                                            END) AS scan_date
                                       FROM sfc_trackout_list s
                                      WHERE scan_date >= TRUNC(SYSDATE)
                                        AND scan_date < TRUNC(SYSDATE + 1)
                                        AND INOUT_PZ = 'OUT'
                                      GROUP BY scan_detpt, scan_date)
                              GROUP BY scan_detpt, scan_date)
                      GROUP BY hours, scan_detpt
                      ORDER BY scan_detpt, hours)
              GROUP BY scan_detpt) c
    ON d.department_code = c.scan_detpt
 WHERE f.code = d.udf05
   AND d.udf06 = 'Y'
   and d.department_code = bs.department_code
   and d.department_code like '%S%'
 group by d.udf09

UNION

SELECT 'ASSEMBLY_' || d.udf09 as plant,
       SUM(NVL(c.target, 0)) AS target,
       SUM(NVL(c.total, 0)) AS actual_output
  FROM sjqdms_orginfo f, base005m d
  LEFT JOIN BASE005M_ASSEMBLY bs
    on d.department_code = bs.department_code
  LEFT JOIN (SELECT scan_detpt,
                    pg_jms.GF_JMS_WorkDay_Target(scan_detpt, TRUNC(SYSDATE)) AS target,
                    GF_WORKINGHOURS_PERC(scan_detpt) AS workhours,
                    SUM(label_qty) AS Total,
                    SUM(label_qty) -
                    pg_jms.GF_JMS_WorkDay_Target(scan_detpt, TRUNC(SYSDATE)) AS Balance,
                    CASE
                      WHEN NVL(MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                TRUNC(SYSDATE))),
                               0) = 0 THEN
                       '无目标产量'
                      WHEN GF_WORKINGHOURS_PERC(scan_detpt) = 0 THEN
                       '无工作历资料'
                      ELSE
                       NVL(ROUND(SUM(label_qty) /
                                 MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                  TRUNC(SYSDATE))),
                                 3) * 100,
                           0) || '%'
                    END AS Acheivement,
                    CASE
                      WHEN NVL(MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                TRUNC(SYSDATE))),
                               0) = 0 THEN
                       0
                      ELSE
                       NVL(ROUND(SUM(label_qty) /
                                 MAX(pg_jms.GF_JMS_WorkDay_Target(scan_detpt,
                                                                  TRUNC(SYSDATE))),
                                 3),
                           0) * 100
                    END AS Bcheivement,
                    GF_WORKINGHOURS_PERC(scan_detpt) AS Ccheivement
               FROM (SELECT SUM(label_qty) AS label_qty, hours, scan_detpt
                       FROM (SELECT scan_detpt,
                                    scan_date,
                                    TO_CHAR((TO_DATE(scan_date,
                                                     'yyyy/mm/dd hh24:mi:ss') -
                                            30 / 24 / 60),
                                            'hh24') AS hours,
                                    SUM(label_qty) AS label_qty
                               FROM (SELECT SUM(label_qty) AS label_qty,
                                            TO_CHAR(scan_date, 'mi'),
                                            nvl(scan_detpt, 0) as scan_detpt,
                                            (CASE
                                              WHEN FLOOR((TO_CHAR(scan_date,
                                                                  'mi')) / 30) = 0 THEN
                                               TO_CHAR(scan_date,
                                                       'yyyy/mm/dd hh24') ||
                                               ':00:00'
                                              WHEN FLOOR((TO_CHAR(scan_date,
                                                                  'mi')) / 30) = 1 THEN
                                               TO_CHAR(scan_date,
                                                       'yyyy/mm/dd hh24') ||
                                               ':30:00'
                                            END) AS scan_date
                                       FROM sfc_trackout_list s
                                      WHERE scan_date >= TRUNC(SYSDATE)
                                        AND scan_date < TRUNC(SYSDATE + 1)
                                        AND INOUT_PZ = 'OUT'
                                      GROUP BY scan_detpt, scan_date)
                              GROUP BY scan_detpt, scan_date)
                      GROUP BY hours, scan_detpt
                      ORDER BY scan_detpt, hours)
              GROUP BY scan_detpt) c
    ON d.department_code = c.scan_detpt
 WHERE f.code = d.udf05
   AND d.udf06 = 'Y'
   and d.department_code = bs.department_code
   and d.department_code like '%L%' 
 group by d.udf09`;
        const dataResultOracle = await connectOracle.execute(dataOracle);
        const dataQueryOracle = dataResultOracle.rows;
        connectOracle.close();

        const jsonDataOracle = dataQueryOracle.map((row) => {
            const rowData = {};
            for (let i = 0; i < dataResultOracle.metaData.length; i++) {
                rowData[dataResultOracle.metaData[i].name] = row[i];
            }
            return rowData;
        });

        res.status(200).json(jsonDataOracle);
        console.log('Data sent to client:', jsonDataOracle);


    } catch (err) {
        console.log('Error getting Oracle query:', err);
        res.status(500).send('Error query data from Oracle');
    }
});

app.post('/api/logAssembly', async (req, res) => {
    try {
        const { SEND_TO, TIME_SEND, IS_SYNC, TYPE_MAIL } = req.body;

        const connection = await oracledb.getConnection();

        const insertQuery = `INSERT INTO LOG_SEND_MAIL 
            (DATE_SEND, SEND_TO, TIME_SEND, IS_SYNC, TYPE_MAIL)
            VALUES 
            (SYSDATE, :SEND_TO, :TIME_SEND, :IS_SYNC, :TYPE_MAIL)`;

        const result = await connection.execute(insertQuery, 
                {   SEND_TO: SEND_TO, 
                    TIME_SEND: TIME_SEND,
                    IS_SYNC: IS_SYNC,
                    TYPE_MAIL: TYPE_MAIL
                },
                {autoCommit: true}
        );

        await connection.close();

        res.status(200).json({ message: 'Log insert success' });

    } catch(err) {
        // Handle any errors that occur during the process
        console.error('Error inserting log:', err);
        res.status(500).json({ message: 'Error inserting data to Oracle' });
    }
});

app.post('/api/logStitching', async (req, res) => {
    try {
        const { SEND_TO, TIME_SEND, IS_SYNC, TYPE_MAIL } = req.body;

        const connection = await oracledb.getConnection();

        const insertQuery = `INSERT INTO LOG_SEND_MAIL 
            (DATE_SEND, SEND_TO, TIME_SEND, IS_SYNC, TYPE_MAIL)
            VALUES 
            (SYSDATE, :SEND_TO, :TIME_SEND, :IS_SYNC, :TYPE_MAIL)`;

        const result = await connection.execute(insertQuery, 
                {   SEND_TO: SEND_TO, 
                    TIME_SEND: TIME_SEND,
                    IS_SYNC: IS_SYNC,
                    TYPE_MAIL: TYPE_MAIL
                },
                {autoCommit: true}
        );

        await connection.close();

        res.status(200).json({ message: 'Log insert success' });

    } catch(err) {
        // Handle any errors that occur during the process
        console.error('Error inserting log:', err);
        res.status(500).json({ message: 'Error inserting data to Oracle' });
    }
});

app.post('/api/logSummary', async (req, res) => {
    try {
        const { SEND_TO, TIME_SEND, IS_SYNC, TYPE_MAIL } = req.body;

        const connection = await oracledb.getConnection();

        const insertQuery = `INSERT INTO LOG_SEND_MAIL 
            (DATE_SEND, SEND_TO, TIME_SEND, IS_SYNC, TYPE_MAIL)
            VALUES 
            (SYSDATE, :SEND_TO, :TIME_SEND, :IS_SYNC, :TYPE_MAIL)`;

        const result = await connection.execute(insertQuery, 
                {   SEND_TO: SEND_TO, 
                    TIME_SEND: TIME_SEND,
                    IS_SYNC: IS_SYNC,
                    TYPE_MAIL: TYPE_MAIL
                },
                {autoCommit: true}
        );

        await connection.close();

        res.status(200).json({ message: 'Log insert success' });

    } catch(err) {
        // Handle any errors that occur during the process
        console.error('Error inserting log:', err);
        res.status(500).json({ message: 'Error inserting data to Oracle' });
    }
});



server.listen(port, () => {
    console.log(`API is running on port: ${port}`);
});