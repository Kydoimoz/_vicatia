// pages/api/updateUserImage.js

import { connectDB } from "../../../libs/connectDB";
import User from "../../../models/dbschema";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await connectDB();
    const { n_image: image, _id } = req.body;
    console.log('Received _id:', _id);
console.log('Received image:', image);
    const user = await User.findByIdAndUpdate(_id ,{image});
    console.log('User found:', user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's image
    user.image = image;
    await user.save();

    return res.status(200).json({ message: 'User image updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
