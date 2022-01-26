import Product from "../../../models/Product";
import dbConnect from "../../../utils/dbConnection";


export default async function handler(req,res){
  
  dbConnect();
  /* fijate que se recogen por la query en Next */
  // console.log(req.query,'<- req.query');

  if(req.method == 'GET'){
    try {
      const product = await Product.findById(req.query.id);

      res.status(200).json({
        ok:true, 
        message: "Product by ID fetched successfully",
        product
      });
    } catch (error) {
      res.status(500).json({
        ok:false,
        message: "Error fetching product by ID",
        error: error.message,
      });
    }
  }
  
}