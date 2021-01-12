const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "hartn001@outlook.com",
        subject: "Thanks for joining in!",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`, // need to use back ticks next to plus button allows you to insert variables without having to concatenate. 
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "hartn001@outlook.com",
        subject: "Sorry to see you go!",
        text: `So sorry, ${name} to lose your account, please drop us a email and let us know what we could do better`
    })

}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}