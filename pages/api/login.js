import cookie from 'cookie';

const handler = (req, res) => {
  
  if(req.method === 'POST'){
    const { username,password } = req.body;

    console.log(username,password);
    console.log(process.env.ADMIN_USERNAME,process.env.ADMIN_PASSWORD);
    
    if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
       
      res.setHeader(
          "Set-Cookie", 
          cookie.serialize('token', process.env.TOKEN, {
            maxAge:60*60,
            sameSite: 'strict',
            path: '/', //visible a toda la app
          }));

      res.status(200).json({
        ok:true,
        message: 'Login correcto',
        token: process.env.TOKEN
      });
    }else{
      res.status(401).json({
        ok:false,
        message: 'Login incorrecto'
      });
    }
  }
};

export default handler;
