"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link"


export default function EditNote({params}){

  const {noteId} = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({title:"Untitled", content:""});

  function trgrChange(event){
    setFormData((prev)=>{
      return {...prev,[event.target.name]:event.target.value};
    })
  }

  async function trgrDelete(event){
    event.preventDefault();
    const choice = confirm("Confirm Delete ?");
    if(!choice){
      return;
    }
    const unpDel = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/notes/${noteId}`, {method:"DELETE", credentials:"include", headers:{"Content-Type": "application/json"}});
    const prDel = await unpDel.json();
    if(prDel){
      alert("Note Deleted Redirecting...");
      setTimeout(()=>{
        router.push("/");
      },1000);
    }
    else{
      alert(prDel.body);
    }
  }

  async function trgrSubmission(event){
    const choice = confirm("Confirm Save ?");
    if(!choice){
      return;
    }
    event.preventDefault();
    const unpFormData = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/notes/${noteId}`,{method:"PATCH", credentials:"include", headers:{"Content-Type": "application/json"}, body:JSON.stringify(formData)});
    const prFormData = await unpFormData.json();
    if(prFormData.status){
      setTimeout(()=>{
        router.push('/');
      },1000)
    }
    else{
      alert(prFormData.body);
    }
  } 
   
  useEffect(()=>{

    async function checkAuth(){
      const unp = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/auth/checkAuth`, {method:"GET", credentials:"include"});
      const pr = await unp.json();
      if(!pr.status){
        router.push("/auth/signup");
        return;
      }
      else{
        const unpNoteInfo = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/notes/${noteId}`, {method:"GET", credentials:"include", headers:{"Content-Type": "application/json"}});
        const prNoteInfo =  await unpNoteInfo.json();
        setFormData(prNoteInfo.body); 
      }
    }
    checkAuth(); 
  },[])

   
  
 
 return(
    <main className="flex flex-col h-screen">
        <header className='headerBar'>
               <h1 className={`text-amber-50 w-full text-center min-[760px]:text-2xl text-[20px]`}>The Notes Keeper</h1>
        </header>
        <section className="noteTemplateWrapper">
               <form className="noteTemplateFormBox" onSubmit={(e)=>{trgrSubmission(e)}}>

                     <label className="w-full text-center text-3xl">Edit Your Note</label>

                     <input  autoFocus required onChange={(e)=>{trgrChange(e)}} className="noteTemplateInput"    name="title"   value={formData.title} type="text" placeholder="Enter your title"/>
                     <textarea  required onChange={(e)=>{trgrChange(e)}} className="noteTemplateTextArea" name="content" value={formData.content} type="text" placeholder="Enter your title"/>
                     <div className="w-full flex justify-between">
                          <Link href="/" className="flex items-center">
                             <img src="/goBackIcon.png" className="h-10"/>
                             <h1 className="text-[15px]">Go Back</h1>
                          </Link>
                          <button onClick={(e)=>{trgrDelete(e)}} type="button" className="flex items-center gap-1 cursor-pointer">
                             <img src="/deleteIcon.png" className="h-5"/>
                             <h1 className="text-[15px]">Delete</h1>
                          </button>
                      </div>
                     <div className="buttonStrip">
                            <button type="submit" className="submitButton">Submit</button>
                     </div>
               </form>
        </section>
    </main>
 )
}