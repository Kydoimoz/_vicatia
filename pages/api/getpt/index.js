import { getSession } from 'next-auth/react';
import { connectDB } from "../../../libs/connectDB";
import User from "../../../models/dbschema";

export default async function GET(req, res) {
    try {
        await connectDB();
        const user = await User.find({role: "petsitter"})

        if (!user) {
            return res.status(404).json({ error: 'User not found in MongoDB' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}