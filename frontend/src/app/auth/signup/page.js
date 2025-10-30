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

    const [formData, setFormData] = useState({name:"", email:"", password:"", adminKey:"" , choice:"User", showPass:false});

    return(
        <main className="flex flex-col h-screen overflow-hidden">
             <header className="formNavBar"> </header>
             <div className="formWrapper">
                 <form className="formBox">
                       <input className="credentialInput"  type="text" name="name" onChange={(e)=>{trgrChange(e)}} placeholder="Enter your name" value={formData.name}/>
                       <input className="credentialInput"  type="email" name="email" onChange={(e)=>{trgrChange(e)}} placeholder="Enter your email" value={formData.email}/>
                       <input className="credentialInput"  type={(formData.showPass)?"text":"password"} name="password" onChange={(e)=>{trgrChange(e)}}  placeholder="Enter your password" value={formData.password}/>
                        
                       {(formData.choice=="Admin")?<input className="credentialInput" placeholder="Enter the admin key" type="text" name="adminKey" onChange={(e)=>{trgrChange(e)}} value={formData.adminKey}/>:""}
                       
                       <div className="choiceInputWrapper">
                        
                           <h1 onClick={trgrShowPass} className="showPassButton">{(formData.showPass)?"Hide Password":"Show Password"}</h1>

                           <select className="choiceInput" name="choice"  value={formData.choice} onChange={(e)=>{trgrChange(e)}}>
                               <option>Admin</option>
                               <option>User</option>
                           </select>
                        </div>
                      
                       <button className="submitButton">SignUp</button>
                       
                       <h1 className="suggestionText">Already have an account ? <Link href="/auth/signin">Login</Link></h1>
                 </form>
             </div>
             
        </main>
    )
}