const jwt=require('jsonwebtoken');

const istokenValid=async(req,res,next)=>{
    const authHeader=req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).json({msg:"Unauthorized Token"});
    }

    jwt.verify(token,"secretKey",(err,user)=>{
        if(err){
        res.status(403).json({msg:"Unauthorized Request"});
        }
        req.user=user;
        next();
    }); 
}

module.exports=istokenValid;