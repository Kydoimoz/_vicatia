import React, { Component } from "react";
import User from "../../../../models/dbschema";
import { connectDB } from "../../../../libs/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export default async function PUT(request, res) {
    res.setHeader("Content-Type", "application/json");
    try {
        const { n_services: services, _id,} = request.body;

        if (!services || !_id) {
            throw new Error('n_email or _id is missing in the request body.');
        }

        await connectDB();

            //await User.findByIdAndUpdate(_id, { services });
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { $addToSet: { pets_sit: { $each: n_services } } },
                { new: true }
              );
                if(updatedUser) {
                    return res.status(201).json({ message: 'services updated.' });
                }
                
        
    } catch (error) {
        console.error('Error: ', error);

        return res.status(500).json({ message: 'Error updating services.' });
    }
}
export async function GET(request, res) {
    res.setHeader("Content-Type", "application/json");
    const { _id } = request.query;
    await connectDB();
    const user = await User.findOne({ _id });
    return NextResponse.json({ user }, { status: 200 });
}