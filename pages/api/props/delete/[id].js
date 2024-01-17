import { connectDB } from "../../../../libs/connectDB";
import User from '../../../../models/dbschema'
import { ObjectId } from "mongodb";

export default async function DELETE(request) {
  const id = request.query.id;

  await connectDB();

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      console.log("User not found");
      return { status: 404, body: { message: "User not found" } };
    }

    console.log("User deleted successfully");
    return { status: 200, body: { message: "User deleted successfully" } };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { status: 500, body: { message: "Internal Server Error" } };
  }
}
