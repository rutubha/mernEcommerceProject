const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const testAccount = await nodeMailer.createTestAccount();

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        service: process.env.SMTP_SERVICE,
        port: 465,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    // const transporter = nodeMailer.createTransport({
    //     host: "smtp.ethereal.com",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: testAccount.user,
    //         pass: testAccount.pass
    //     }
    // })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    
    // const mailOptions = {
    //     from: "service@eccomerce.com",
    //     to: options.email,
    //     subject: options.subject,
    //     text: options.message
    // };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;