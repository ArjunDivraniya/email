// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'arjundivraniya8@gmail.com', // Replace with your email
        pass: '@Arjun_2801',   // Replace with your app password
    },
});

// Verify SMTP Configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to SMTP server:', error);
    } else {
        console.log('SMTP server is ready:', success);
    }
});

// Email Sending Endpoint
app.post('/send-email', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required.' });
    }

    const mailOptions = {
        from: 'arjundivraniya8@gmail.com', // Sender email
        to: email,                   // Recipient email
        subject: 'Hello from the Form',
        text: `Hi ${name},\n\nThis is a test email sent from the form!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: `Failed to send email. Reason: ${error.message}` });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
