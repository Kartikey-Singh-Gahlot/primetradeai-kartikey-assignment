"use client"
import {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

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
                  <Link href={"/note"} className='utilityButton'>
                      <img src='/addIcon.png' className='h-4'/>
                      <button className="text-center text-[12px] cursor-pointer font-semibold">Add Note</button>
                  </Link>
                  <li className='utilityButton' onClick={trgrSignOut}>
                      <img src='/logOutIcon.png' className='h-4'/>
                      <button className="text-center text-[12px] cursor-pointer font-semibold">Logout</button>
                  </li>
                  
               </ul>
       </header>

      <section className='cardWrapper'>
          <div className='w-full flex items-center'>
               <h1 className='w-full  px-3 py-5 text-3xl'>Your Notes</h1>
               <h1 className='text-[15px] text-black text-center text-nowrap px-3'>{(adminAccess)?"Role : Admin":"Role : User"}</h1>
          </div>

          <ul className='cardBox '>
              {(userNotes?.length>0)? userNotes.map((i, idx)=>{ return <li className='card' key={idx}><Link href={`note/${i._id}`}><h1 className='cardTitle'>{i.title}</h1> <p className='cardContent line-clamp-3'>{i.content}</p> </Link> </li>}) :<li>Nothing here to show</li>}
          </ul>
      </section>
      
      

   </main>
  );
}
