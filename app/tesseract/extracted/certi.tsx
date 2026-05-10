"use client";
import { useState } from "react";

export default function Certification(){
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(files.length === 0) return

    const data = new FormData();
    Array.from(files).forEach((file) =>{
      data.append("images", file)
    })
    

    const res = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data
    })

    const dato = await res.json()
    console.log(dato.texto_completo)
  }
  return (
    <div style={{ padding: 20 }}>
      <h1>Extracted Certification verification</h1>
      <h1>Drag files to upload</h1>
      <div>
        <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={(e) => {
            if(!e.target.files) return;

            const newFiles = Array.from(e.target.files);

            setFiles((prev) => [...prev, ...newFiles])
            
            
          }}
        />
        <button type="submit">Confirm</button>
      </form>
          <h2>Recomendation</h2>
          <p>Use a clear and well-lit photo Make sure the image is not blurry and all information is easy to read. Upload photos of the front and back to show all the details.</p>
          <p>Avoid reflections and shadows Do not use direct light that creates glare or hides information.</p>
          <p>Keep the document fully visible and centered The ID must appear complete, without cutting off edges or corners.</p>
          <h2>Warnings</h2>
          <p>Do not upload blurry photos If the information cannot be read, it will be rejected.</p>
          <p>Do not cover any information Fingers or objects blocking details will make the photo invalid.</p>
          <p>Do not use edited or altered images This may lead to rejection or legal issues.</p>
          <p>Do not upload screenshots or copies You must upload a real photo of the original document.</p>
      </div>
      
      <div>
        <h3>Selected Files</h3>

        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
    </div>
  )
}