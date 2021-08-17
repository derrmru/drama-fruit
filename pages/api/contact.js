import { header } from '../../src/email-images/header'
import { background } from '../../src/email-images/background'
import { footer } from '../../src/email-images/footer'

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
        /*let forwardMail = {
            from: `${req.body.email}`,
            to: process.env.EMAIL,
            subject: 'Contact form through dramafruit.com',
            text: req.body.message,
            html: emailToSend,
        };

        transporter.sendMail(forwardMail, async (error, info) => {
            if (error) await console.log(error)
            //res.send(info)
        });*/

        //send email confirmation to form user
        let confirmMail = {
            from: process.env.EMAIL,
            to: `${req.body.email}`,
            subject: 'Thank you for your email - Drama Fruit',
            text: "This is an automated confirmation: Thank you for getting in touch with me, I will reply to your message asap. - Marek",
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <!--<![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
                body {width: 600px;margin: 0 auto;}
                table {border-collapse: collapse;}
                table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                img {-ms-interpolation-mode: bicubic;}
            </style>
            <![endif]-->
            <style type="text/css">
                body,
                p,
                div {
                font-family: arial, helvetica, sans-serif;
                font-size: 14px;
                }

                body {
                color: #000000;
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100vh;
                background-image: url(${background});
                background-attachment: fixed;
                background-size: cover;
                background-color: rgba(255, 255, 255, .6);
                background-blend-mode: lighten;
                }

                body a {
                color: #1188E6;
                text-decoration: none;
                }

                p {
                margin: 0;
                padding: 0;
                }

                table.wrapper {
                width: 100% !important;
                table-layout: fixed;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                }

                img.max-width {
                max-width: 100% !important;
                }

                .column.of-2 {
                width: 50%;
                }

                .column.of-3 {
                width: 33.333%;
                }

                .column.of-4 {
                width: 25%;
                }

                ul ul ul ul {
                list-style-type: disc !important;
                }

                ol ol {
                list-style-type: lower-roman !important;
                }

                ol ol ol {
                list-style-type: lower-latin !important;
                }

                ol ol ol ol {
                list-style-type: decimal !important;
                }

                @media screen and (max-width:480px) {

                .preheader .rightColumnContent,
                .footer .rightColumnContent {
                    text-align: left !important;
                }

                .preheader .rightColumnContent div,
                .preheader .rightColumnContent span,
                .footer .rightColumnContent div,
                .footer .rightColumnContent span {
                    text-align: left !important;
                }

                .preheader .rightColumnContent,
                .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                }

                table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                }

                img.max-width {
                    height: auto !important;
                    max-width: 100% !important;
                }

                a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }

                .columns {
                    width: 100% !important;
                }

                .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }

                .social-icon-column {
                    display: inline-block !important;
                }
                }
            </style>
            <!--user entered Head Start-->
            <!--End Head user entered-->
            </head>

            <body>
            <center class="wrapper" data-link-color="#1188E6"
                data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                    <tr>
                    <td valign="top" bgcolor="#FFFFFF" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0"
                        border="0">
                        <tr>
                            <td width="100%">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                <td>
                                    <!--[if mso]>
                <center>
                <table><tr><td width="600">
            <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                    style="width:100%; max-width:600px;" align="center">
                                    <tr>
                                        <td role="modules-container"
                                        style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF"
                                        width="100%" align="left">
                                        <table class="module preheader preheader-hide" role="module" data-type="preheader"
                                            border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                            <tr>
                                            <td role="module-content">
                                                <p></p>
                                            </td>
                                            </tr>
                                        </table>
                                        <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0"
                                            cellspacing="0" width="100%" style="table-layout: fixed;"
                                            data-muid="b5b09020-6963-4da6-b68e-894ea15e0293">
                                            <tbody>
                                            <tr>
                                                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top"
                                                align="center">
                                                <img class="max-width" border="0"
                                                    style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;"
                                                    width="600" alt="" data-proportionally-constrained="true" data-responsive="true"
                                                    src="http://cdn.mcauto-images-production.sendgrid.net/aa22940eda2e6f00/0ffe3648-0070-4827-8552-46eb318108a5/1170x181.png">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                            cellspacing="0" width="100%" style="table-layout: fixed;"
                                            data-muid="1fbc818c-37e4-4d86-8b8d-a5f850bb68fb" data-mc-module-version="2019-10-22">
                                            <tbody>
                                            <tr>
                                                <td style="padding:18px 18px 18px 18px; line-height:22px; text-align:inherit;"
                                                height="100%" valign="top" bgcolor="" role="module-content">
                                                <div>
                                                    <div style="font-family: inherit; text-align: inherit">I will reply to you as
                                                    soon as possible!</div>
                                                    <div style="font-family: inherit; text-align: inherit"><br></div>
                                                    <div style="font-family: inherit; text-align: inherit">Sincerely</div>
                                                    <div style="font-family: inherit; text-align: inherit">Marek @dramafruit</div>
                                                    <div></div>
                                                </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0"
                                            cellspacing="0" width="100%" style="table-layout: fixed;"
                                            data-muid="60ad7413-0fb6-4900-81c3-4ddff157f54d">
                                            <tbody>
                                            <tr>
                                                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top"
                                                align="left">

                                                <a href="https://www.dramafruit.com"><img class="max-width" border="0"
                                                    style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;"
                                                    width="240" alt="" data-proportionally-constrained="true"
                                                    data-responsive="true"
                                                    src="http://cdn.mcauto-images-production.sendgrid.net/aa22940eda2e6f00/ce11275f-44e7-4137-affe-559552f43537/400x300.gif"></a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    </table>
                                    <!--[if mso]>
                                            </td>
                                            </tr>
                                        </table>
                                        </center>
                                        <![endif]-->
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </div>
            </center>
            </body>

            </html>
          `
        };

        transporter.sendMail(confirmMail, async (error) => {
            if (error) {
                res.send(error.message);
            }
            res.send('success');
        });
    }
}

