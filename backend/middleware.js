const key=require('./config');
const jwt=require('jsonwebtoken')

function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg:"can't authenticate"})
    }

    const token=authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,key);
        if(decoded.userId){

            req.userId=decoded.userId;
            next();
        }
        else{
            return res.status(403).json({msg:"Tampered token"})
        }
    }
    catch{
        return res.status(403).json({error:"Invalid or expired token"})
    }
}

module.exports=authMiddleware;