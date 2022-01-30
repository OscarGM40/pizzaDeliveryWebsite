import Order from "../../../models/Order";
import dbConnect from "../../../utils/dbConnection";

const handler = async (req, res) => {
  const { method, query }  = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(query.id);
      res.status(200).json({
        ok:true,
        order
      });

    } catch (error) {
      res.status(500).json({
        ok:false,
        message: "Server error",
        error: error.message
      });
    }
   }
   
  if (method === "PUT") { }
  if (method === "DELETE") { }
};

export default handler;
