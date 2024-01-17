import { connectDB } from "../../../../libs/connectDB";
import User from "../../../../models/dbschema";

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log('Connected to the database');

    const { services, pets_sit, workplaces, _id, description } = req.body;

    // Validierung der Benutzereingaben
    const validServices = Array.isArray(services) ? services : [];
    const validPetsSit = Array.isArray(pets_sit) ? pets_sit : [];
    const validWorkplaces = Array.isArray(workplaces) ? workplaces : [];

    if (!_id) {
      return res.status(400).json({ error: 'Missing user ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: {  // Änderung von $addToSet auf $push
          services: { $each: validServices },
          pets_sit: { $each: validPetsSit },
          workplaces: { $each: validWorkplaces },
        },
        $set: {  // Hinzufügen von $set für das Aktualisieren von description
          description: description,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Arrays updated successfully');
    res.status(200).json({ message: 'Arrays updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

