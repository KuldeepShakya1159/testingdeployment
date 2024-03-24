const jwt = require("jsonwebtoken");

exports.jwtAuth = (req,res,next)=>{
    const token = req.cookies.token;
    try{
       const email = jwt.verify(token,process.env.SESSION_KEY);
       req.email=email;
       next();
        
    }
    catch(err){
        res.clearCookie("token");
        return res.json({result:"unauthorized_user"})
    }
}