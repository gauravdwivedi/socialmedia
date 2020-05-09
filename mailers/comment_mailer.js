const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    
    console.log('inside new comment_mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'codingwithgaurav@gmail.com',
        to: comment.user.email,
        subject: 'new comment published',
        html: '<h1>Yup! your comment is now published</h1>',
    }, (err, info) => {
        if (err) { console.log('error in sending mail',err); return; }
            
        // console.log('msg sent', info);
    });
}