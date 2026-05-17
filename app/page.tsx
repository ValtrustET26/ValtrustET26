"use client";

import { useState } from "react";

import Image from "next/image";
import Sellers from "./sellers/page";
import DeedUpload from "./components/sellers/Deed";
import ExcerptCertUpload from "./components/sellers/Excerpt";
import DuiUpload from "./components/sellers/DUI";
import SellOrBuyPopup from "./components/selection/page";



export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="bg-[var(--wh-main)]">
          
          <button onClick={() => setShowPopup(true)} className="px-6 py-3 rounded-lg bg-[var(--gr-main)] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Login
          </button>
          
        <Sellers isOpen={showPopup} onClose={() => setShowPopup(false)} />
        </div>
      </main>
    </div>
  );
}
