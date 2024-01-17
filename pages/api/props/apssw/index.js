import React from "react";
import User from "../../../../models/dbschema";
import { connectDB } from "../../../../libs/connectDB";
export default async function handler(req, res) {
    try {
      await connectDB();
      console.log('Connected to the database');
  
      const { currentPassword, newPassword, _id } = req.body;
  
      const user = await User.findByIdAndUpdate({_id});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }