const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
  
      user: smtpUserName,
      pass: smtpPassword
    }
  });


  const sendEmailWithNodemailer = async (emailData)=>{
     try {
        const emailOptions={
            from: smtpUserName, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html:emailData.html, // html body
        }
      const info = await transporter.sendMail(emailOptions);
      console.log("message send :" , info.response);
        
     } catch (error) {
        console.log("Error is occured when sending email",error);
        throw error
     }

  }

  module.exports =sendEmailWithNodemailer;