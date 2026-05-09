"use client";
import { useState } from "react";

export default function Home(){
  const [files, setFiles] = useState<FileList | null>(null)

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(!files) return

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
      <h1>Subir imagen (OCR)</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}