"use client"
import {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
 
 const [adminAccess, setAdminAccess] = useState(false);
 const [userNotes, setUserNotes] = useState()
 const router = useRouter();

  async function trgrSignOut(){
    const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/signout`, {method:"POST", credentials:"include", headers:{"Content-Type": "application/json"}});
    const pr = await unp.json();
    if(pr.status){
      router.push("/auth/signup");
    }
    return;
  }

  async function trgrAddNote() {
    
  }

  

  useEffect(()=>{
    async function checkAuth() {
      const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
      const pr = await unp.json();
      if(!pr.status){
        router.push("/auth/signup");
        return;
      }
      else{
       if((pr.adminStatus)){
        setAdminAccess(true);
       }
        const unNotes = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/notes`, {method:"GET", credentials:"include"});
        const prNotes = await unNotes.json();
        setUserNotes(prNotes.body);
      }
    }
    
    checkAuth();
  },[])


  return (
   <main className='flex flex-col h-screen'>
       <header className='headerBar'>
               <h1 className={`text-amber-50 w-full text-center min-[760px]:text-2xl text-[20px]`}>The Notes Keeper</h1>
               <ul className='flex'>
                  <li className='utilityButton' onClick={trgrSignOut}>
                      <img src='/logOutIcon.png' className='h-4'/>
                      <button className="text-center text-[12px] cursor-pointer font-semibold">Logout</button>
                  </li>
                  <li onClick={trgrAddNote} className='utilityButton'>
                      <img src='/addIcon.png' className='h-4'/>
                      <button className="text-center text-[12px] cursor-pointer font-semibold">Add Note</button>
                  </li>
               </ul>
       </header>
      {/* <h1 className='text-black text-center text-nowrap px-3'>{(adminAccess)?"Admin Dashboard":"User Dashboard"}</h1> */}

      <div className='cardWrapper'>
          <h1 className='w-full  px-3 py-5 text-3xl'>Your Notes</h1>

          <ul className='cardBox '>
              {(userNotes?.length>0)? userNotes.map((i, idx)=>{ return <li className='card' key={idx}><h1 className='cardTitle'>{i.title}</h1> <p className='cardContent line-clamp-3'>{i.content}</p> </li>}) :<li>Nothing here to show</li>}
          </ul>
      </div>
      
      

   </main>
  );
}
