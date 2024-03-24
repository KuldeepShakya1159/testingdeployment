require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const mongostore = require("connect-mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const jwtAuth = require("./auth.js")

const app = express();

app.use(cookieparser());
app.use(express.json());

// app.use(session({
//     name:"session-name",
//     secret:process.env.SESSION_KEY,
//     httpOnly:true,
//     path:"/",
//     saveUninitialized: false,
//     store:mongostore.create({
//         mongoUrl:process.env.DB_URL
//     }),
//     cookie: { maxAge: 86400000 },
//     resave: false,
// }))

const jwtAuth = (req,res,next)=>{
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


app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","OPTIONS"],
    credentials:true
}))

app.post("/login",(req,res)=>{
    const email = req.body.email ; 
    const token = jwt.sign({email},process.env.SESSION_KEY,{expiresIn:'2h'});
    // res.status(200).json({result:`session built for this ${email} user`});
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"none",
        secure:true
    })
    res.send(`token built for this ${email} user`);
    console.log(token);
});

app.get("/login",jwtAuth,(req,res)=>{
    const {email} = req.email;
    console.log(email);
    if(email !==undefined||""){
        res.status(200).json({result:`session is present for this ${email} user`})
    }else{
        res.status(401).json({result:"_NotaUser"})
    }

})






app.listen(process.env.PORT);
