"use client";
 
import { CheckCircle } from "lucide-react";
 
export default function Page() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4">
      
      {/* Popup */}
      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          bg-[#fafaf9]
          px-6
          py-10
          text-center
          shadow-2xl
          overflow-hidden
        "
      >
        
        {/* Conguitos / Decorations */}
        <div className="absolute top-4 left-6 text-[#1A6373] text-4xl rotate-12">
          ﹏
        </div>
 
        <div className="absolute top-6 right-10 text-[#1A6373] text-5xl -rotate-12">
          ∿
        </div>
 
        <div className="absolute top-16 left-20 text-[#1A6373] text-3xl rotate-45">
          •
        </div>
 
        <div className="absolute top-10 right-24 text-[#1A6373] text-3xl">
          •
        </div>
 
        <div className="absolute top-20 right-6 text-[#1A6373] text-4xl rotate-90">
          ﹏
        </div>
 
        {/* Title + Icon */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <h2 className="text-4xl font-extrabold text-[#171717]">
            Success!
          </h2>
 
          <CheckCircle
            size={42}
            className="text-green-500"
            strokeWidth={2.5}
          />
        </div>
 
        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Your property is now listed in the{" "}
          <span className="text-[#1A6373] font-semibold">
            Property Marketplace.
          </span>
        </p>
 
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          
          <button
            className="
              flex-1
              rounded-xl
              bg-[#1A6373]
              py-4
              text-white
              font-semibold
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#144d59]
              hover:scale-[1.02]
              active:scale-95
            "
          >
            View Property
          </button>
 
          <button
            className="
              flex-1
              rounded-xl
              bg-[#1A6373]
              py-4
              text-white
              font-semibold
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#144d59]
              hover:scale-[1.02]
              active:scale-95
            "
          >
            Continue
          </button>
 
        </div>
      </div>
    </div>
  );
}