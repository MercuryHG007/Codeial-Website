const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// this sends the email & defines account of sender
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    port: '587',
    secure: 'false',
    auth: {
        user: 'mercurianpixoral',
        pass: '29Apri!1970'
    }
});

// defines the html file that is send inside mail and 
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}