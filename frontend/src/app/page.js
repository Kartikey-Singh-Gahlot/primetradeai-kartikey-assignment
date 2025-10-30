"use client"
import {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";

export default function Home() {

 const router = useRouter();

  useEffect(()=>{
    async function checkAuth() {
      const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
      const pr = await unp.json();
      console.log(pr.status);
      if(!pr.status){
        router.push("/auth/signup");
      }
    }
    checkAuth();
  },[])



  return (
   <main>
       <h1>Notes</h1>

   </main>
  );
}
