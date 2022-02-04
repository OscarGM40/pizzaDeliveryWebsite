import Product from "../../../models/Product";
import dbConnect from "../../../utils/dbConnection";



export default async function handler(req, res){
  const { method, cookies } = req;
  const token = cookies.token;

  await dbConnect();

  if(method === 'GET'){
    try {
      const products = await Product.find();
      
      res.status(200).json({
        ok:true, 
        message: "Products fetched successfully",
        products
      });

    } catch (error) {
      res.status(500).json({
        ok:false,
        message: "Error listing products",
        error: error.message,
      });
    }
  }

  if(method === 'POST'){
    if(!token || token !== process.env.TOKEN){
     return res.status(401).json({
        ok:false,
        message: "Unauthorized",
      });
    }
    try {
      const product = await Product.create(req.body)
     return res.status(201).json({
        ok:true,
        message: 'Product created successfully',
        product,
      })
    } catch (error) {
      return res.status(500).json({
        ok:false,
        message: 'Error creating product',
        error
      });
    }
  } 
}