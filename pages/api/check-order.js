//email image imports
import { footer } from '../../src/email-images/footer'
import { inst } from '../../src/email-images/instagram'
import { face } from '../../src/email-images/facebook'
import { etsy } from '../../src/email-images/etsy'

//firestore
import db from '../../lib/db'

export default async (req, res) => {
    console.log(req.body)
    //check status of transaction in firebase
    const docRef = await db.collection('orders').doc(req.body.transaction_id);
    const doc = await docRef.get();
    if (doc.exists) {
        const data = doc.data();
        //if email not already sent, send confirmation email to customer
        if (!data.email_sent) {
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
                    name: ${data.name}<br />
                    email: ${data.email}<br />
                    telephone: ${data.telephone}<br />
                    address: ${data.address}<br />
                    description: ${data.description}<br />
                    total: ${data.total}<br />
                    mollie_id: ${data.mollie_id}<br />
                    privacy: ${data.privacy}<br />
                </p>
            </div>`

            //forward email to site owner
            let forwardMail = {
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: 'Order has been placed via dramafruit.com',
                text: `name: ${data.name}
            email: ${data.email}
            telephone: ${data.telephone}
            address: ${data.address}
            description: ${data.description}
            total: ${data.total}
            mollie_id: ${data.mollie_id}
            privacy: ${data.privacy}
        `,
                html: emailToSend,
            };

            transporter.sendMail(forwardMail, async (error, info) => {
                console.log(info)
                if (error) console.log(error)
                //res.json(data)
            });

            /**
             * Cumstomer purchase confirmation email
             */

            //convert each purhcased item into html table row with number of items purchased
            let purchaseTable = ``;
            const itemArr = data.description.split(',');
            itemArr.forEach(item => {
                if (item.indexOf(' x') >= 0) {
                    purchaseTable += `<tr style="width: 100%;">`
                    purchaseTable += `<td style="width: 60%;">${item.split(' x')[0].trim()}</td>`
                    purchaseTable += `<td style="width: 40%;">${item.split(' x')[1].trim()}</td>`
                    purchaseTable += `</tr>`
                }
            })

            //send email confirmation to form user
            let confirmMail = {
                from: process.env.EMAIL,
                to: `${data.email}`,
                subject: 'Purchase Confirmation - Drama Fruit',
                text: `
            
            `,
                html: `
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <!--[if gte mso 9]>
            <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
            
                <style type="text/css">
                table, td { color: #000000; } @media only screen and (min-width: 520px) {
            .u-row {
                width: 500px !important;
            }
            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 500px !important;
            }

            }

            @media (max-width: 520px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }
            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }
            .u-row {
                width: calc(100% - 40px) !important;
            }
            .u-col {
                width: 100% !important;
            }
            .u-col > div {
                margin: 0 auto;
            }
            }
            body {
            margin: 0;
            padding: 0;
            }

            table,
            tr,
            td {
            vertical-align: top;
            border-collapse: collapse;
            }

            td, 
            th {
                padding: 20px 0;
            }

            p {
            margin: 0;
            }

            .ie-container table,
            .mso-container table {
            table-layout: fixed;
            }

            * {
            line-height: inherit;
            }

            a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
            }

            </style>
            
            

            </head>

            <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
                

            <div class="u-row-container" style="padding: 0px;background-image: url('/images/background.jpeg');background-repeat: repeat;background-position: center top;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('/images/background.jpeg');background-repeat: repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
                
            <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:2px;font-family:arial,helvetica,sans-serif;" align="left">
                    
            <div>
                <div style="width: 100%; margin: 0; border: 3px dashed #33a985; padding: 0; background-color: rgba(255, 255, 255, .9);">
            <h1 style="text-align: center;">Thank You For Your Order!</h1>
            <div style="width: 80%; margin: 20px auto;">
                <p style="margin: 20px 0;">Dear ${data.name.indexOf(' ') >= 0 ? data.name.split(' ')[0] : data.name},</p>
                <p style="margin: 20px 0;">I will be working on your order shortly and will be in touch with a tracking number when it is ready to be shipped.</p>
                <p style="margin: 20px 0;">Here are the details of your order:</p>
                <p style="margin: 20px 0;"><strong>Delivery Address: </strong></p>
                <p>${data.address.indexOf(', ') >= 0 ? data.address.split(', ').join('<br />') : data.address}</p>
                <table style="width: 100%; margin: 20px 0;">
                    <tr style="width: 100%;">
                        <th style="width: 60%;text-align: left;">
                            Item
                        </th>
                        <th style="width: 40%; text-align: left;">
                            No. Items
                        </th>
                    </tr>
                    ${purchaseTable}
                    <tr style="width: 100%;">
                        <td style="width: 60%; text-align: right; padding-right: 20px; border-top: 1px solid #33a985;">Basket Total: </td>
                        <td style="width: 40%; border-top: 1px solid #33a985;">€${data.total}</td>
                    </tr>
                </table>
                <p style="margin: 20px 0;">If you have any questions regarding your purchases, please do not hesitate to contact me at play@dramafruit.com.</p>
                <p>Sincerely</p>
                <p>Marek @dramafruit</p>
                <img src=${footer} style="max-width: 250px; margin: 20px 0;"/>
                <div style="margin: 20px 0; width: 100%; box-sizing: border-box;">
                    <a href="https://www.instagram.com/dramafruit/"><img src=${inst} style="margin: 0 10px;" /></a>
                    <a href="https://www.facebook.com/DramaFruit"><img src=${face} style="margin: 0 10px;" /></a>
                    <a href="https://www.etsy.com/shop/DramaFruit"><img src=${etsy} style="margin: 0 10px;" /></a>
                </div>
            </div>
            </div>
            </div>

                </td>
                </tr>
            </tbody>
            </table>

            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
            </div>
            </div>


                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
            </body>

            </html>
          `
            };

            transporter.sendMail(confirmMail, async (error, info) => {
                console.log(info)
                if (error) {
                    console.log(error)
                }
                if (info) {
                    //update email sent status in firebase
                    await db.collection('orders').doc(req.body.transaction_id).set({
                        email_sent: true
                    }, { merge: true })
                }
                await res.json(data)
            });
        }
    }
}