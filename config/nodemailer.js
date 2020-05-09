const nodemailer = require('nodemailer');
const env = require('./environment');
const ejs = require('ejs');
const path = require('path');



let transporter = nodemailer.createTransport(env.smtp);

let rednerTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) { console.log('error in rendering template'); return; }
            
            mailHTML = template;
        })
    
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    rednerTemplate:rednerTemplate
}