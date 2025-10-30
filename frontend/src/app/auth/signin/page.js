"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Signin(){
  
    const router = useRouter();

    useEffect(()=>{
       async function get(){
        const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
        const pr = await unp.json();
        if(pr.status){
         router.push("/"); 
        }
       }
       get();
    },[])


    function trgrChange(event){
        setFormData((prev)=>{
           return {...prev, [event.target.name]:event.target.value}
        });
    }

    function trgrShowPass(){
        if(formData.showPass){
            setFormData((prev)=>{
                return {...prev,showPass:false}
            })
        }
        else{
            setFormData((prev)=>{
                return {...prev, showPass:true}
            })
        }
    }

    async function trgrSubmission(e){
       e.preventDefault();
       const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/signin`, {method:"POST", credentials:"include", headers:{"Content-Type": "application/json"}, body: JSON.stringify({email:formData.email, password:formData.password})});
       const pr  = await unp.json();
       alert(pr.body);
       if(pr.status){
        console.log(pr);
          setTimeout(()=>{
             router.push("/");
          },1000)
       }
       else{
        return;
       }
    }

    const [formData, setFormData] = useState({email:"", password:"", showPass:false});

    return(
        <main className="flex flex-col h-screen overflow-hidden">
             <header className="headerBar">

             </header>

             <div className="formWrapper">
                 <form className="formBox" onSubmit={trgrSubmission}>

                       <label className="w-full text-center text-3xl">Welcome Back</label>

                       <input className="credentialInput" autoFocus name="email" type="email" onChange={(e)=>{trgrChange(e)}} placeholder="Enter your email" value={formData.email}/>
                       <input className="credentialInput" name="password" type={(formData.showPass)?"text":"password"} onChange={(e)=>{trgrChange(e)}} placeholder="Enter your password" value={formData.password}/>
                       
                       <div className="choiceInputWrapper">
                           <h1 onClick={trgrShowPass} className="showPassButton">{(formData.showPass)?"✖ Hide Password":"✔ Show Password"}</h1>
                        </div>
                      
                       <button className="submitButton">Login</button>
                       <h1 className="suggestionText">Don't have an account ? <Link  className="underline font-semibold" href="/auth/signup">Signup</Link></h1>

                 </form>
             </div>
             
        </main>
    )
}