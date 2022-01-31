import Product from "../../../models/Product";
import dbConnect from "../../../utils/dbConnection";



export default async function handler(req, res){
  const { method, cookies } = req;

  // console.log(method,'<- method');
  // console.log(cookies,'<- cookies');

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
    try {
      const product = await Product.create(req.body)
      res.status(201).json({
        ok:true,
        message: 'Product created successfully',
        product,
      })
    } catch (error) {
      res.status(500).json({
        ok:false,
        message: 'Error creating product',
        error
      });
    }
  } 
}