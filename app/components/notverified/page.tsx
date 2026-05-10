"use client";
 
import { XCircle } from "lucide-react";
 
export default function Page() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
      
      {/* Popup */}
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-[#fafaf9]
          p-6
          sm:p-8
          text-center
          shadow-2xl
        "
      >
        
        {/* Logo */}
        <div className="mb-8 flex justify-start">
          <h1 className="text-2xl font-bold text-[#0B1E4A]">
            Val<span className="text-[#1A6373]">trust</span>
          </h1>
        </div>
 
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full border-4 border-red-500 p-2">
            <XCircle
              size={60}
              className="text-red-500"
              strokeWidth={2.5}
            />
          </div>
        </div>
 
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#171717] mb-4">
          Not Verified
        </h2>
 
        {/* Description */}
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
          We couldn’t verify your ownership.
        </p>
 
        {/* Buttons */}
        <div className="flex flex-col gap-4">
          
          {/* Review Button */}
          <button
            className="
              w-full
              rounded-2xl
              bg-[#1A6373]
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#144d59]
              hover:scale-[1.02]
              active:scale-95
              shadow-lg
            "
          >
            Review Information
          </button>
 
          {/* Publish Anyway */}
          <button
            className="
              w-full
              rounded-2xl
              bg-[#0B1E4A]
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#081532]
              hover:scale-[1.02]
              active:scale-95
              shadow-lg
            "
          >
            Publish Anyway
          </button>
 
        </div>
      </div>
    </div>
  );
}
 
