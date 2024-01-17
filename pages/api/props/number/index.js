import React, { Component } from "react";
import User from "../../../../models/dbschema";
import { connectDB } from "../../../../libs/connectDB";
import { NextResponse } from "next/server";
export default async function PUT(request, res) {
    res.setHeader("Content-Type", "application/json");
    try {
        const { u_phoneNumber: phoneNumber, _id } = request.body;

        if (!phoneNumber || !_id) {
            throw new Error('u_phoneNumber or _id is missing in the request body.');
        }

        await connectDB();
        await User.findByIdAndUpdate(_id, { phoneNumber });

        return res.status(201).json({ message: 'PhoneNumber updated.' });

    } catch (error) {
        console.error('Error: ', error);

        return res.status(500).json({ message: 'Error updating PhoneNumber.' });
    }
}
export async function GET(request, res) {
    res.setHeader("Content-Type", "application/json");
    const { _id } = request.query;
    await connectDB();
    const user = await User.findOne({ _id });
    return NextResponse.json({ user }, { status: 200 });
}