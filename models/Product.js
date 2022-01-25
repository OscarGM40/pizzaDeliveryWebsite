import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 60 },
    description: { type: String, required: true, maxlength: 255 },
    image: { type: String, required: true, maxlength: 255 },
    prices: { type: [Number], required: true },
    extraOptions: [
      { text: { type: String, required: true } },
      { price: { type: Number, required: true } },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default  mongoose.models.Product || mongoose.model("Product", ProductSchema);