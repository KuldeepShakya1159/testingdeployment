import React from "react";
import { useState } from "react";

const Login = ()=>{

    const[email,setEmail]=useState("");

    const handleClick = async () =>{
        let response  = await fetch("http://localhost:5000/login",{
            method:"POST",
            mode:"cors",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email})
        })

        response = await response.json();
        console.log(response.result);
    }

    return(
        <div>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;