import { connectDB } from '../../../libs/connectDB';
import User from '../../../models/dbschema';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        await connectDB(); // Ensure database connection before proceeding

        if (req.method === 'POST') {
            const { token } = req.query;

            if (!token) {
                return res.status(400).json({ error: 'Invalid token' });
            }

            const user = await User.findOne({ verificationToken: token });
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: 'User not found'});
            }
            if (user.isVerified) {
                return res.status(400).json({ error: 'User is already verified' });
            }

            // Update user's isVerified status and save
            user.isVerified = true;
            await user.save();

            return res.status(200).json({ message: 'Email verified successfully' });
        }

        return res.status(405).json({ error: 'Method Not Allowed' });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message});
    }
}   