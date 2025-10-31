"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link"


export default function EditNote({params}){

  const {noteId} = useParams();
  const router = useRouter();

  const [noteInfo, setNoteInfo] = useState();

   
  useEffect(()=>{

    async function checkAuth(){
      const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
      const pr = await unp.json();
      if(!pr.status){
        router.push("/auth/signup");
        return;
      }
      else{
        console.log("authenticated");
        const unpNoteInfo = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/notes/${noteId}`, {method:"GET", credentials:"include"});
        const prNoteInfo =  await unpNoteInfo.json();
        setNoteInfo(prNoteInfo); 
      }
    }
    checkAuth(); 
  },[])

   
  
 
 return(
    <main className="flex flex-col h-screen">
        <header className='headerBar'>
               <h1 className={`text-amber-50 w-full text-center min-[760px]:text-2xl text-[20px]`}>The Notes Keeper</h1>
        </header>
        this is edit note page
    </main>
 )
}