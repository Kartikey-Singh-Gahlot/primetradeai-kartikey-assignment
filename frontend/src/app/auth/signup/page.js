"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function signup(){
  
    const router = useRouter();

    useEffect(()=>{
       async function get(){
        const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
        const pr = await unp.json();
        if(pr.status){
         router.push("/"); 
        }
        else{
            return;
        }
       }
       get();
    },[])


    function trgrChange(event){
        setFormData((prev)=>{
           return {...prev, [event.target.name]:event.target.value}
        });
    }

    const [formData, setFormData] = useState({name:"", email:"", password:"", adminKey:""});

    return(
        <main className="h-screen overflow-hidden">
             <header className="formNavBar"> </header>
             <div className="formWrapper">
                 <form className="formBox">
                       <input className="credentialInput" name="name" onChange={(e)=>{trgrChange(e)}} placeholder="Enter your name" value={formData.name}/>
                       <input className="credentialInput" name="email" onChange={(e)=>{trgrChange(e)}} placeholder="Enter your email" value={formData.email}/>
                       <input className="credentialInput" name="password" onChange={(e)=>{trgrChange(e)}} placeholder="Enter your password" value={formData.password}/>
                        <div className="buttonStrip ">
                              <h1 className="showPassButton">Show Password</h1>
                             <button className="submitButton">SignUp</button>
                       </div>
                       <h1 className="suggestionText">Already have an account ? <Link href="/auth/signin">Login</Link></h1>
                 </form>
             </div>
             
        </main>
    )
}