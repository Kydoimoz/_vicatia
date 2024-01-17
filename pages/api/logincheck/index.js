import { connectDB } from "../../../libs/connectDB";
import User from "../../../models/dbschema";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    try {
        await connectDB();

        // Parse the request body to get the email
        const { email } = req.body;

        const storeData = await User.findOne({ email }).select("_id");
        return NextResponse.json({ storeData });
    } catch (err) {
        console.error("User not found: " + err);
        return NextResponse.error({ error: "Internal Server Error" });
    }
}