//firestore
import db from '../../lib/db'

export default async (req, res) => {
    console.log(req.body)
    //check status of transaction in firebase
    const docRef = db.collection('orders').doc(req.body.transaction_id);
    const doc = await docRef.get();
    if (doc.exists) {
        const data = doc.data();
        //send confirmation email to customer
        //nodemailer transporter
        const nodemailer = require('nodemailer');

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
                    name: ${data.name},<br />
                    email: ${data.email},<br />
                    telephone: ${data.telephone},<br />
                    address: ${data.address},<br />
                    description: ${data.description},<br />
                    total: ${data.total},<br />
                    mollie_id: ${data.mollie_id},<br />
                    privacy: ${data.privacy},<br />
                    contentful_ids: ${data.ids},<br />
                </p>
            </div>`

        //forward email to site owner
        let forwardMail = {
            from: process.env.EMAIL,
            to: 'pjsweeney1@live.co.uk',
            subject: 'Order has been placed via dramafruit.com',
            text: `name: ${data.name},
            email: ${data.email},
            telephone: ${data.telephone},
            address: ${data.address},
            description: ${data.description},
            total: ${data.total},
            mollie_id: ${data.mollie_id},
            privacy: ${data.privacy},
            contentful_ids: ${data.ids},
        `,
            html: emailToSend,
        };

        transporter.sendMail(forwardMail, (error, info) => {
            console.log(info)
            if (error) await console.log(error)
            //res.send(info)
        });

        res.json(data)
    }
}