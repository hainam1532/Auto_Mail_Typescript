import nodemailer from "nodemailer";
import * as handlebars from "handlebars";

export async function sendMail({
    to,
    subject,
    body,
}: {
    to: string,
    subject: string,
    body: string,
}) {
    //const { EMAIL, PASSWORD } = process.env;

    const transport = nodemailer.createTransport({
        host: 'mail.apachefootwear.com',
        port: 25,
        secure: false,
        auth: {
            user: 'APACHE\\APH-System',
            pass: 'Aa123456@',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const testResult = await transport.verify();
        console.log(testResult);
        
    } catch (error) {
        console.log(error);
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: '"APH-System" <APH-system@vn.apachefootwear.com>',
            to,
            subject,
            html: body
        });

        console.log(sendResult);
        
    } catch (error) {
        console.log(error);
    }
}
