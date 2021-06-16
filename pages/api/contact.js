const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'drama-fruit-test@outlook.com',
        pass: 'genericPassword'
    },
    tls: {
        rejectUnauthorized:false,
    }
});

export default async (req, res) => {
    console.log(req.body);
    //node function to handle contact form submission
    if (req.body.oh_no_honey){
        ; //handle as spam
    } else {
        console.log('Sending mail');
        
        transporter.verify(function(error, success) {
            if(error){
                console.log(error)
            } else  {
                console.log("Server is ready to take messages");
            }
        });
        
        //forward email to site owner
        const mailOptionsRec = {
            from: '"${ req.body.first_name } ${ req.body.last_name }" <${ req.body.email }>', 
            to: 'drama-fruit-test@outlook.com',
            subject: 'Contact email through drama-fruit.com',
            text: req.body.message
        };
        transporter.sendMail(mailOptionsRec, function(error, info){
            if (error){
                console.log(error);
            } else {
                res.status(418);
                console.log('Email sent: ' + info.response);
                
                //send confirmation email to enquirer
                const mailOptionsSent = {
                    from: 'play@drama-fruit.com',
                    to: '${ req.body.email }',
                    subject: 'Thank you for your email - Drama Fruit',
                    text: "Automated confirmation -- Thank you for your e-mail. I'll get back to you asap. In the meantime, stay sexy."
                };
                transporter.sendMail(mailOptionsSent, function(error, info){
                    if (error){
                        console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                res.send('Success');
                });
            };
        
    });
    
    return res.send('complete');
    }
}

    //endpoint receives body of email
    
    //if honepot has content handle as spam 
    //if not spam, sent submitted form content to Marek via email, then
    //send confirmation email to customer via their submitted email (in req.body.email)
    //endpoint responds with success or error (you can probably just respond with the nodemailer result)
    //frontend displays success or error to client