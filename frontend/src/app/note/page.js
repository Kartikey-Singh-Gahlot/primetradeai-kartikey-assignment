"use client";

import Link from "next/link"
import { useState } from "react";
import { useParams } from "next/navigation";

export default function AddNote(){

 function trgrChange(event){
   setFormData((prev)=>{
       return {...prev, [event.target.name]:event.target.value}
   })
 }

 async function trgrSubmission(event){
       event.preventDefault();
       const unpFormData = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/notes`, {method:"POST", credentials:"include", headers:{"Content-Type": "application/json"}, body:JSON.stringify(formData)});
       const prFormData = await unpFormData.json();
       console.log(prFormData);
 }

 const [formData, setFormData] = useState({title:"", content:""});

 

 return(
    <main className="flex flex-col h-screen">
        <header className='headerBar'>
               <h1 className={`text-amber-50 w-full text-center min-[760px]:text-2xl text-[20px]`}>The Notes Keeper</h1>
        </header>
        <section className="noteTemplateWrapper">
               <form className="noteTemplateFormBox" onSubmit={(e)=>{trgrSubmission(e)}}>

                     <label className="w-full text-center text-3xl">Add A New Note</label>

                     <input    onChange={(e)=>{trgrChange(e)}} className="noteTemplateInput"    name="title"   value={formData.title} type="text" placeholder="Enter your title"/>
                     <textarea onChange={(e)=>{trgrChange(e)}} className="noteTemplateTextArea" name="content" value={formData.content} type="text" placeholder="Enter your title"/>
                     <div className="flex items-center">
                        <img src="/goBackIcon.png" className="h-10"/>
                        <h1 className="text-[15px]">Go Back</h1>
                     </div>
                     <div className="buttonStrip">
                            <button type="submit" className="submitButton">Submit</button>
                     </div>
               </form>
        </section>
    </main>
 )
}