import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    user: { type: String },
    bot: { type: String },
  },
  { timestamps: true }
);

const History = mongoose.models.History || mongoose.model("History", Schema);
export default History;
