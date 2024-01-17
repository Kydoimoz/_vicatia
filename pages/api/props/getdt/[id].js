// api/props/getdt/[id].js

import { connectDB } from '../../../../libs/connectDB';
import User from '../../../../models/dbschema';

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");
    try {
        // Stelle sicher, dass die Verbindung zur Datenbank hergestellt wird
        await connectDB();

        // Holen Sie die user_id aus den Routenparametern
        const { id } = req.query;
        console.log('Received request for user with ID:', id);

        if (!id) {
            return res.status(400).json({ error: 'Missing user ID' });
        }

        const user = await User.findOne({ _id: id });
        console.log(user);
        if (!user) {
            console.log('User not found in MongoDB for ID:', id);
            return res.status(404).json({ error: 'User not found in MongoDB' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}
