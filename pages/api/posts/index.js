/*import { getSession } from 'next-auth/react';
import { connectDB } from "../../../libs/connectDB";
import User from "../../../models/dbschema";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");
    const session = await getSession({ req });

    // If there's no session or the user is not authenticated, return an unauthorized response
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Connect to the database
        await connectDB();

        // Retrieve the user from the database using the email from the session
        const userEmail = session.user.email;
        const user = await User.findOne({ email: userEmail });

        // If the user is found, return the user data
        if (user) {
            return NextResponse.json(JSON.stringify(user), { status: 200 });
        } else {
            // If the user is not found, return an error response
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (err) {
        // Handle any errors that occur during the process
        console.error("Error: ", err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}*/
import { getSession } from 'next-auth/react';
import { connectDB } from "../../../libs/connectDB";
import User from "../../../models/dbschema";

export default async function GET(req, res) {
    try {
        await connectDB();
        const session = await getSession({ req });
        console.log('Session:', session);

        if (!session || !session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return res.status(404).json({ error: 'User not found in MongoDB' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}