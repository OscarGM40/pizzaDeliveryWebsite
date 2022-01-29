import Order from "../../../models/Order";
import dbConnect from "../../../utils/dbConnection";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find({});
      res.status(200).json({
        ok:true,
        orders
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Error getting orders",
        error,
      });
    }
  }

  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({
        ok: true,
        message: "Order created",
        order,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Error saving order",
        error,
      });
    }
  }
};

export default handler;
