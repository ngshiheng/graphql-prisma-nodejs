const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
    },
});

exports.sendPasswordResetEmail = (email, token) => {
    const message = {
        from: process.env.GMAIL,
        to: email,
        template: 'forgot-password-email',
        subject: 'Request To Reset Password',
        text: `Attach this token to the authorization header when running updatePassword mutation: ${token}`,
    };
    transporter.sendMail(message, error => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Message sent successfully');
    });
};

exports.sendPasswordResetSuccessEmail = email => {
    const message = {
        from: process.env.GMAIL,
        to: email,
        template: 'reset-password-email',
        subject: 'Reset Password Succsessful',
        html: '<h1>You can now login with your new password!</h1>',
    };
    transporter.sendMail(message, error => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Message sent successfully');
    });
};
