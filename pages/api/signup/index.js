import { connectDB } from '../../../libs/connectDB';
import User from '../../../models/dbschema';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import schedule from "node-schedule";

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        const {
            firstName,
            lastName,
            email,
            password,
            gender,
            newsletter,
            role,
            phoneNumber,
            country,
            city,
            birthDate,
        } = req.body;

        console.log('Received Data:', req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDB();

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 30);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            newsletter,
            role,
            phoneNumber,
            country,
            city,
            image: "https://static.wikia.nocookie.net/jorjorswackyjourney/images/3/30/Rihqw92yzpoypx8azfvc.png/revision/latest?cb=20180715145752",
            birthDate,
            verificationToken,
            expirationTime,
            isVerified: false,
            about_me: "I love exploring the animal world!",
            workplaces: [],
            services: [],
            pets_sit: [],
            amount_pet: 0,
            mypets: [],
        });


        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Email Verification',
           // html: `<h1>Hi ${firstName}!</h1><br><p>Click the following link to verify your email: <a href="https://kangaroo-hot-routinely.ngrok-free.app/verify/${verificationToken}">Verify Email</a></p>`,
            html: `<h1>Hi ${firstName}!</h1><br><p>Click the following link to verify your email: <a href="http://localhost:3000/verify/${verificationToken}">Verify Email</a></p>`
        };

        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_APP_PSWD,
            },
        });

        const sendMailResult = await smtpTransport.sendMail(mailOptions);

        if (sendMailResult.accepted && sendMailResult.accepted.length > 0) {
            console.log('Verification email sent successfully.');
            res.status(200).json({ success: true });
        } else {
            console.error('Failed to send verification email.');
            res.status(500).json({ success: false, error: 'Failed to send verification email.' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteExpiredUsers = async () => {
    const currentDate = new Date();
    try {
        const expiredUsers = await User.find({
            expirationTime: { $lt: currentDate },
            verificationToken: { $exists: true },
        });
        await Promise.all(expiredUsers.map(user => user.remove()));

        console.log(`${expiredUsers.length} expired users deleted.`);
    } catch (error) {
        console.error('Error deleting expired users:', error);
    }
};
schedule.scheduleJob('0 0 * * *', deleteExpiredUsers);