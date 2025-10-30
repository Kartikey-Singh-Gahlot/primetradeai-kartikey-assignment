"use client"
import {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
 
 const [adminAccess, setAdminAccess] = useState(false);

 const router = useRouter();

  async function trgrSignOut(){
    const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/signout`, {method:"POST", credentials:"include", headers:{"Content-Type": "application/json"}});
    const pr = await unp.json();
    if(pr.status){
      router.push("/auth/signup");
    }
    return;
  }

  

  useEffect(()=>{
    async function checkAuth() {
      const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
      const pr = await unp.json();
      if(!pr.status){
        router.push("/auth/signup");
        return;
      }
      else if((pr.status) && (pr.adminStatus)){
        setAdminAccess(true);
      }
    }
    checkAuth();
  },[])


  return (
   <main className='flex flex-col h-screen'>
       <header className='headerBar'>
               <h1 className='text-white text-center text-nowrap px-3'>{(adminAccess)?"Admin Dashboard":"User Dashboard"}</h1>
               <h1 className='text-amber-50 w-full text-center text-2xl'>The Notes Keeper</h1>
               <div className='logOutButton' onClick={trgrSignOut}>
                    <img src='/logOutIcon.png' className='h-4'/>
                    <button className="text-center">Logout</button>
                </div>
       </header>
   </main>
  );
}
