const nodemailer = require('../config/nodemailer');

// Another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: 'Codeial.com',
        to: comment.user.email,
        subject: 'New Comment Publised',
        html: htmlString
    }, (err,info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Mail Delivered', info);
        return;
    });
}