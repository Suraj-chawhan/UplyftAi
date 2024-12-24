import History from "../../../../Mogodb/schema/storeHistory";
import jwt from "jsonwebtoken";
import connectDB from "../../../../Component/Connect";

const verifyToken = async (req) => {
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
    const { user, bot } = await req.json();
    const userNew = new History({ user, bot });
    await userNew.save();

    return new Response(JSON.stringify({ message: "success" }));
  } catch (err) {
    return new Response(JSON.stringify({ message: err }));
  }
}

export async function GET(req) {
  await connectDB();
  try {
    // const user = await verifyToken(req);

    const history = await History.find();
    return new Response(JSON.stringify({ message: history }));
  } catch (err) {
    return new Response(
      JSON.stringify({ message: err.message || "An error occurred" })
    );
  }
}
