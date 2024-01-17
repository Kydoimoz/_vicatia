import React, { Component } from "react";
import User from "../../../../models/dbschema";
import { connectDB } from "../../../../libs/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export default async function PUT(request, res) {
    res.setHeader("Content-Type", "application/json");
    try {
        const { n_email: email, _id,} = request.body;

        if (!email || !_id) {
            throw new Error('n_email or _id is missing in the request body.');
        }

        await connectDB();

            await User.findByIdAndUpdate(_id, { email });

            return res.status(201).json({ message: 'email updated.' });
        
    } catch (error) {
        console.error('Error: ', error);

        return res.status(500).json({ message: 'Error updating email.' });
    }
}
export async function GET(request, res) {
    res.setHeader("Content-Type", "application/json");
    const { _id } = request.query;
    await connectDB();
    const user = await User.findOne({ _id });
    return NextResponse.json({ user }, { status: 200 });
}