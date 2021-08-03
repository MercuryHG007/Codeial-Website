const nodemailer = require('../config/nodemailer');

// Another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer', comment);

    nodemailer.transporter.sendMail({
        from: 'Codeial.com',
        to: comment.user.email,
        subject: 'New Comment Publised',
        html: '<h1> Yup, your comment is now published </h1>'
    }, (err,info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Mail Delivered', info);
        return;
    });
}