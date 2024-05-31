import axios from 'axios';

export class getDataSummary {
  static fetchDataSummary() {
	  throw new Error('Method not implemented.');
  };
  static insertLog() {
    throw new Error('Method not implemented.');
  }
  
  async fetchDataSummary(): Promise<any> {
    try {
        //const hostname = window.location.hostname;
        const port = 8080; 
        const response = await axios.get(`http://10.30.2.248:${port}/api/summary`);

        //console.log(response.data);
        return response.data;
        
    } catch (error) {
      throw error;
    }
  };
};


export class postLogSummary {
  static postLog() {
    throw new Error('Method not implemented.');
  }

  async insertLog(): Promise<any> {
    try {
      const currentTime = new Date();
      const timeNow = currentTime.toISOString();

      const data = {
        TIME_SEND: timeNow,
        SEND_TO: "HaiNam-Nguyen@vn.apachefootwear.com",
        IS_SYNC: "S",
        TYPE_MAIL: "Summary"
      };

      //const hostname = window.location.hostname;
      const port = 8080;
      const response = await axios.post(`http://10.30.2.248:${port}/api/logSummary`, data);

      return response.data;

    } catch(err) {
      console.error("Error inserting log:", err);
      throw err;
    }
  }
}
