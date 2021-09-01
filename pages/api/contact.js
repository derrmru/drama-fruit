import { footer } from '../../src/email-images/footer'
import { inst } from '../../src/email-images/instagram'
import { face } from '../../src/email-images/facebook'
import { etsy } from '../../src/email-images/etsy'

export default async (req, res) => {
    //node function to handle contact form submission
    if (req.body.oh_no_honey) {
        //handle as spam
        res.send('spam')
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

        //site owner email content (HTML)
        let emailToSend =
            `<ul>
                <li>From: ${req.body.email}</li>
                <li>Name: ${req.body.first_name} ${req.body.last_name}</li>
                <li>Message: ${req.body.message}</li>
            </ul>`

        //forward email to site owner
        let forwardMail = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Contact form through dramafruit.com',
            text: req.body.message,
            html: emailToSend,
        };

        transporter.sendMail(forwardMail, async (error, info) => {
            if (error) await console.log(error)
            //res.send(info)
        });

        //send email confirmation to form user
        let confirmMail = {
            from: process.env.EMAIL,
            to: `${req.body.email}`,
            subject: 'Thank you for your email - Drama Fruit',
            text: "This is an automated confirmation: Thank you for getting in touch with me, I will reply to your message asap. - Marek",
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
            <h1 style="text-align: center;">Thank You For Your Message!</h1>
            <div style="width: 80%; margin: 20px auto;">
                <p style="margin: 20px 0;">Dear ${req.body.first_name} ${req.body.last_name},</p>
                <p style="margin: 20px 0;">I will reply to you as soon as possible. Feel free to connect with me on social media in the meantime!</p>
                <p>Sincerely</p>
                <p>Marek @dramafruit</p>
                <img src=${footer} style="max-width: 250px; margin: 20px 0;"/>
                <div style="margin: 20px 0;">
                    <a href="https://www.instagram.com/dramafruit/"><img src=${inst} style="margin-right: 20px;" /></a>
                    <a href="https://www.facebook.com/DramaFruit"><img src=${face} style="margin-right: 20px;" /></a>
                    <a href="https://www.etsy.com/shop/DramaFruit"><img src=${etsy} style="margin-right: 20px;" /></a>
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

        transporter.sendMail(confirmMail, async (error) => {
            if (error) {
                res.send(error.message);
            }
            await res.send('success');
        });
    }
}

