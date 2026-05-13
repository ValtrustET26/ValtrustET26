"use client";

// ExcerptCertUpload
// Componente aislado para la subida del Excerpt Certification.
// Maneja su propio estado de archivo internamente.
// Props:
//   onFileChange?: (file: File) => void  - callback opcional para
//                                          que Tesseract OCR reciba el archivo :P


import { useRef, useState } from "react";

interface ExcerptCertUploadProps {
  onFileChange?: (file: File) => void;
}

function SpotlightZone({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = divRef.current?.getBoundingClientRect();
        if (rect)
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-[220px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(209,213,219,0.8) 0%, rgba(209,213,219,0) 70%)`
          : "transparent",
        transition:
          "background 0.1s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
        transform: isHovered ? "scale(1.01)" : "scale(1)",
        borderColor: isHovered ? "#1A6373" : undefined,
        boxShadow: isHovered ? "0 0 0 4px rgba(26,99,115,0.08)" : "none",
      }}
    >
      {children}
    </div>
  );
}

export default function ExcerptCertUpload({ onFileChange }: ExcerptCertUploadProps) {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploaded(true);
    setFileName(file.name);
    onFileChange?.(file);
  };

  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept="application/pdf,image/*"
        onChange={handleChange}
      />
      <SpotlightZone onClick={() => inputRef.current?.click()}>
        <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center mb-3">
          <span className="text-white text-2xl">↑</span>
        </div>
        {uploaded ? (
          <div className="flex flex-col items-center gap-1 pop-in">
            <p className="text-green-600 font-medium">File selected ✓</p>
            {fileName && (
              <p className="text-xs text-gray-400 max-w-[200px] truncate">{fileName}</p>
            )}
          </div>
        ) : (
          <p className="text-gray-600 font-medium">Click here or drag files to upload</p>
        )}
      </SpotlightZone>
    </>
  );
}