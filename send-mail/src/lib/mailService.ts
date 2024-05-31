'use server'

import { sendMail } from '@/lib/mail';
import { completeProdTemplate } from './templates/assembly';
import { completeProdTemplateStitching } from './templates/stitching';
import { completeProdTemplateSummary } from './templates/summary';


const listMails = [
  "HaiNam-Nguyen@vn.apachefootwear.com", "Hoa-Le@vn.apachefootwear.com",
  "Loan-Le@vn.apachefootwear.com","Jet-Wang@vn.apachefootwear.com",
  "Felix-Yang@vn.apachefootwear.com","duoyan-wang@apachefootwear.com",
  "Bonnie-Liu@vn.apachefootwear.com","Thao-Ha@vn.apachefootwear.com",
  "Hanh-Tran@vn.apachefootwear.com","Harry-Li@vn.apachefootwear.com",
  "denny-liu@vn.apachefootwear.com","Sam-Deng@vn.apachefootwear.com",
  "Amliy-Zhang@vn.apachefootwear.com","Lisa-Shi@vn.apachefootwear.com",
  "XueLau-Liao@vn.apachefootwear.com","Aimee-Gao@vi.apachefootwear.com",
  "Clement-Lai@vn.apachefootwear.com","Shirley-Jiang@vn.apachefootwear.com",
  "Jacques-She@vn.apachefootwear.com","Tim-Kuo@vn.apachefootwear.com",
  "Ivan-Lee@vn.apachefootwear.com"
];

const listMailsS = [
  "HaiNam-Nguyen@vn.apachefootwear.com"
];

const listMailsString = listMails.join(',');

export const send = async () => {
  try {

    const htmlBody = await completeProdTemplate("Assembly Report", "This is the daily report :");

    await sendMail({
      to: listMailsString,
      subject: "Assembly report (加工報告)",
      body: htmlBody
    })

    //toast.success("Send mail successfully!");

  } catch (error) {
    console.error('Error sending mail:', error);
  }
};

export const sendStitching = async () => {
  try {

    const htmlBody = await completeProdTemplateStitching("Stitching Report", "This is the daily report :");

    await sendMail({
      to: listMailsString,
      subject: "Stitching report (針車報工)",
      body: htmlBody
    })

    //toast.success("Send mail successfully!");

  } catch (error) {
    console.error('Error sending mail:', error);
  }
};

export const sendSummary = async () => {
  try {

    const htmlBody = await completeProdTemplateSummary("Summary Report", "This is the daily report :");

    await sendMail({
      to: listMailsString,
      subject: "Summary report (今日生產報告 ( 加工與針車 ) )",
      body: htmlBody
    })

    //toast.success("Send mail successfully!");

  } catch (error) {
    console.error('Error sending mail:', error);
  }
};
