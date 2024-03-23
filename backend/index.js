require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const mongostore = require("connect-mongo");

const app = express();

app.use(cookieparser());
app.use(express.json());

app.use(session({
    name:"session-name",
    secret:process.env.SESSION_KEY,
    httpOnly:true,
    path:"/",
    saveUninitialized: false,
    store:mongostore.create({
        mongoUrl:process.env.DB_URL
    }),
    sameSite:"lax",
            secure:true,
             domain:".vercel.app",
    cookie: { maxAge: 86400000
            },
    resave: false,
}))


app.use(cors({
    origin:["https://testingdeployment-frontend.vercel.app"],
    methods:["GET","POST"],
    credentials:true
}))

app.get("/",(req,res)=>{
    res.json({result:"working"});
})

app.post("/login",(req,res)=>{
    const email = req.body.email ; 
    req.session.email = email ; 
    res.status(200).json({result:`session built for this ${email} user`});
    console.log(req.session);
});

app.get("/login",(req,res)=>{
    const email = req.session.email;
    console.log(req.session);
    console.log(email);
    if(email !==undefined||""){
        res.status(200).json({result:`session is present for this ${email} user`})
    }else{
        res.status(401).json({result:"_NotaUser"})
    }

})



app.listen(process.env.PORT);
