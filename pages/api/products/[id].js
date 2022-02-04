import Product from "../../../models/Product";
import dbConnect from "../../../utils/dbConnection";


export default async function handler(req,res){
    const { cookies } = req;
    const token = cookies.token;

  await dbConnect();
  /* fijate que un param :id se recoge por la query en Next */
  // console.log(req.query,'aqui tendré los params obligatorios');

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

  if(req.method == 'PUT'){
       if (!token || token !== process.env.TOKEN) {
        return res.status(401).json({
           ok: false,
           message: "Unauthorized",
         });
       }
    try {
      const product = await Product.findByIdAndUpdate(req.query.id, req.body, {new:true});

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
  
  if(req.method == 'DELETE'){
       if (!token || token !== process.env.TOKEN) {
        return res.status(401).json({
           ok: false,
           message: "Unauthorized",
         });
       }
    try {
      await Product.findByIdAndDelete(req.query.id);

      res.status(200).json({
        ok:true, 
        message: "Product by ID deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        ok:false,
        message: "Error deleting product by ID",
        error: error.message,
      });
    }
  }
  
}