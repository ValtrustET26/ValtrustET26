"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SellOrBuyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SellOrBuyPopup({ isOpen, onClose }: SellOrBuyPopupProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 flex flex-col items-center gap-6"
        style={{ animation: "popIn 0.3s cubic-bezier(0.22,1,0.36,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-900 leading-snug">
            What do you need today?
          </h2>
          <p className="text-sm text-gray-400 mt-1">Choose the user experience that best suits you.</p>
        </div>

        <div className="flex gap-4 w-full">

          {/* Seller */}
          <button
            onClick={() => router.push("/sellers/terms")}
            className="flex-1 flex flex-col items-center gap-3 border-2 border-gray-200 rounded-xl p-5 hover:border-[var(--gr-main)] hover:shadow-md transition-all duration-200 group"
          >
            <svg className="w-12 h-12 text-gray-800 group-hover:text-[var(--gr-main)] transition-colors duration-200" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 20L24 6L42 20V42H30V30H18V42H6V20Z" />
            </svg>
            <span className="text-lg font-bold text-[var(--gr-main)]">Sell</span>
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Sell your property. Get an evaluation based on the current market and reach thousands of buyers.
            </p>
            <span className="mt-1 w-full py-2 rounded-lg bg-[var(--gr-main)] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">
              Start Selling
            </span>
          </button>

          {/* Buyer */}
          <button
            onClick={() => router.push("/buyers/terms")}
            className="flex-1 flex flex-col items-center gap-3 border-2 border-gray-200 rounded-xl p-5 hover:border-[var(--gr-main)] hover:shadow-md transition-all duration-200 group"
          >
            <svg className="w-12 h-12 text-gray-800 group-hover:text-[var(--gr-main)] transition-colors duration-200" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="12" width="36" height="26" rx="4" />
              <path d="M6 20h36" />
              <circle cx="30" cy="32" r="3" fill="currentColor" stroke="none" />
              <path d="M14 16V10a4 4 0 018 0v2" />
            </svg>
            <span className="text-lg font-bold text-[var(--gr-main)]">Buy</span>
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Find the house of your dreams with smart filters. Explore verified properties.
            </p>
            <span className="mt-1 w-full py-2 rounded-lg bg-[var(--gr-main)] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">
              Start Buying
            </span>
          </button>

        </div>

        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}