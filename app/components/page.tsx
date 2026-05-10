"use client";
 
import { CheckCircle } from "lucide-react";
 
export default function Page() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 px-4">
      {/* Popup */}
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-[#ffffff]
          shadow-2xl
          p-6
          sm:p-8
          text-center
          animate-in fade-in zoom-in duration-300
        "
      >
        {/* Logo */}
        <div className="mb-6 flex justify-start">
          <h1 className="text-2xl font-bold text-[#0B1E4A]">
            Val<span className="text-[#1A6373]">trust</span>
          </h1>
        </div>
 
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="rounded-full border-4 border-green-500 p-3">
            <CheckCircle
              size={55}
              className="text-green-500"
              strokeWidth={2.5}
            />
          </div>
        </div>
 
        {/* Title */}
        <h2
          className="
            text-4xl
            sm:text-5xl
            font-extrabold
            text-[#171717]
            mb-4
          "
        >
          Verified
        </h2>
 
        {/* Description */}
        <p
          className="
            text-base
            sm:text-lg
            text-gray-600
            leading-relaxed
            mb-8
          "
        >
          Your property has been successfully verified.
        </p>
 
        {/* Button */}
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
          Publish Property
        </button>
 
        {/* Bottom text */}
        <p className="mt-4 text-sm text-[#1A6373]">
          Review details before publishing.
        </p>
      </div>
    </div>
  );
}