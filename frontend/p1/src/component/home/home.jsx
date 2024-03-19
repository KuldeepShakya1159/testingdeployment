import React from "react";
import { useState ,useEffect} from "react";

const Home = ()=>{

    const[user,setUser] = useState("");

    const setLogin = async ()=>{
        let response = await fetch("https://testingdeployment-server.vercel.app/login",{
            credentials:"include"
        })
        response= await response.json();
        setUser(response.result);
        console.log(response.result);
    }

    useEffect(()=>{
        setLogin();
    },[])



    return(
        <div>
            {user}
        </div>
    )
}

export default Home;
