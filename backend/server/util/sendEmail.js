require('dotenv').config()
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../model/userSchema');

module.exports = async (email, subject, text) => {
  console.log(process.env.USER,"uugkgufuvyf");
  console.log(process.env.PASS);
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service:'gmail',
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE), 
            auth: {
              user:process.env.USER,
              pass:process.env.PASS, 
            },   
          });  

          await transporter.sendMail({
            from:process.env.USER, 
            to: email, 
            subject: subject, 
            text: text, 
          });
          console.log("Email send successfylly")
    } catch (error) {
        console.log("Email not send")
        console.log(error)
    }
}