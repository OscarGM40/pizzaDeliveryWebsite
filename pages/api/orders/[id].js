import Order from "../../../models/Order";
import dbConnect from "../../../utils/dbConnection";

const handler = async (req, res) => {
  const { method, query }  = req;

  dbConnect();
  Order;
  if (method === "GET") { }
  if (method === "PUT") { }
  if (method === "DELETE") { }
};

export default handler;
