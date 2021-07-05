//import * as process.env from '/access.json'

export default async (req, res) => {
    //node function to handle contact form submission
    if (req.body.oh_no_honey){
        //handle as spam
        return res.send('spam')
    } else {
        console.log('Sending mail');

        //nodemailer transporter
        const nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            host: 'mail.hover.com',
            //secureConnection: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        //verify server is ready
        /*transporter.verify( async (error, success) => {
            if(error){
                console.log(error)
            } else {
                console.log("Server is ready to take messages", success);
            }
        });*/

        //site owner email content (HTML)
        let emailToSend = 
            `<ul>
                <li>From: ${req.body.email}</li>
                <li>Name: ${req.body.first_name} ${req.body.last_name}</li>
                <li>Message: ${req.body.message}</li>
            </ul>`

        //forward email to site owner
        let forwardMail = {
            from: `${ req.body.email }`,
            to: process.env.EMAIL,
            subject: 'Contact form through dramafruit.com',
            text: req.body.message,
            html: emailToSend,
        };

        transporter.sendMail(forwardMail, async (error, info) => {
            if (error) console.log(error)
            if (info) console.log(info)
        });

        //send email confirmation to form user
        let confirmMail = {
            from: process.env.EMAIL,
            to: `${ req.body.email }`,
            subject: 'Thank you for your email - Drama Fruit',
            text: "This is an automated confirmation: Thank you for getting in touch with me, I will reply to your message asap. - Marek",
            html: `<h2>This is an automated confirmation</h2>
                    <p>Thank you for getting in touch with me, I will reply to your message asap.</p>
                    <br>All the best,
                    <p>Marek</p>`
        };

        transporter.sendMail(confirmMail, async (error) => {
            if (error) {
                res.send(error.message);
            }
            res.send('success');
        });
    }
}

