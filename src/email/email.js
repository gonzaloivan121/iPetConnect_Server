const express = require('express');
const fs = require('fs');
const multer = require('multer');
const nodemailer = require('nodemailer');

// Store email template path and store the emailTemplate in templateContent
const templatePath = process.cwd() + '/src/email/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');

// Configure multer to use memory storage to receive attachment
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a function to replace placeholders in the email template with received data
function replacePlaceholders(html, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const placeholder = `{{ ${key} }}`;
            html = html.replace(new RegExp(placeholder, 'g'), data[key]);
        }
    }

    return html;
}

function createRouter() {
    const router = express.Router();

    // the routes are defined here

    // Define send endpoint, which will send emails and response with the corresponding status
    router.post('/email/send', upload.single('file'), async (req, res) => {
        try {
            const { name, email, message } = req.body.body;

            // Extra backend validation
            if (!name || !email || !message) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Store attachments
            const attachmentData = [{
                filename: 'logo.png',
                path: __dirname + '\\logo.png',
                cid: 'logo'
            }];

            // Create nodemailer transport
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_KEY
                }
            });

            // Replace placeholders in the email template with received data
            const emailHtml = replacePlaceholders(templateContent, { name, email, message });

            // Define the options of your email like to/from-headers, subject line, body text, html and attachment
            const mailOptions = {
                from: email,
                to: process.env.RECIPIENT_EMAIL,
                subject: `New message from ${name}`,
                text: `New message \n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n\n${message}`,
                html: emailHtml,
                attachments: attachmentData
            };

            // Store send mail response
            const info = await transporter.sendMail(mailOptions);

            // Provide console feedback and return a positive response to the client
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'EMAIL_SENT_SUCCESSFULLY', icon: 'ni ni-like-2' });
        } catch (error) {
            // provide error information in case there is any and send corresponding response
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'ERROR_SENDING_EMAIL', icon: 'ni ni-fat-remove' });
        }
    });

    return router;
}

module.exports = createRouter;
