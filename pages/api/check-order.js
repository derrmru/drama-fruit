//firestore
import db from '../../lib/db'

export default async (req, res) => {
    console.log(req.body)
    //check status of transaction in firebase
    const docRef = db.collection('orders').doc(req.body.transaction_id);
    const doc = await docRef.get();
    if (doc.exists) {
        //send confirmation email to customer
        //nodemailer transporter
        /*const nodemailer = require('nodemailer');

        //email customer with confirmation of order and transaction:
        let transporter = nodemailer.createTransport({
            host: 'mail.hover.com',
            //secureConnection: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        //site owner email content (HTML)
        let emailToSend =
            `<div>
                <p>An Order has been made</p>
                <p>
                    name: ${req.body.name},<br />
                    email: ${req.body.email},<br />
                    telephone: ${req.body.telephone},<br />
                    address: ${req.body.address},<br />
                    description: ${req.body.description},<br />
                    total: ${req.body.total},<br />
                    mollie_id: ${payment.id},<br />
                    privacy: ${req.body.privacy},<br />
                    contentful_ids: ${req.body.ids},<br />
                </p>
            </div>`

        //forward email to site owner
        let forwardMail = {
            from: process.env.EMAIL,
            to: 'pjsweeney1@live.co.uk',
            subject: 'Order has been placed via dramafruit.com',
            text: `name: ${req.body.name},
            email: ${req.body.email},
            telephone: ${req.body.telephone},
            address: ${req.body.address},
            description: ${req.body.description},
            total: ${req.body.total},
            mollie_id: ${payment.id},
            privacy: ${req.body.privacy},
            contentful_ids: ${req.body.ids},
        `,
            html: emailToSend,
        };

        transporter.sendMail(forwardMail, async (error, info) => {
            if (error) await console.log(error)
            //res.send(info)
        });*/

        res.json(doc.data())
    }
}