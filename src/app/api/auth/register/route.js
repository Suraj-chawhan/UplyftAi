import User from "../../../../../Mogodb/schema/userSchema";
import jwt from "jsonwebtoken";
import connectDB from "../../../../../Component/Connect";
const verifyToken = (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("Authentication token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User Exists" }));
    }

    const newUser = new User(data);

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully." })
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }));
  }
}

export async function GET(req) {
  await connectDB();

  try {
    const user = verifyToken(req);
    const data = await User.find();
    return new Response(JSON.stringify(data));
  } catch (err) {
    return new Response(
      JSON.stringify({ message: err.message || "An error occurred" })
    );
  }
}
