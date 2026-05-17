"use client";
import { useState, useEffect } from "react";

import DeedUpload        from "../components/sellers/Deed";
import ExcerptCertUpload from "../components/sellers/Excerpt";
import DuiUpload         from "../components/sellers/DUI";

interface SellersProps {
  isOpen: boolean;
  onClose: () => void;
}

type Stage = "info" | "deed" | "excerptCert" | "dui" | "result";
type VerifyState = "loading" | "verified" | "unverified";

const steps: { key: Stage; label: string }[] = [
  { key: "info",        label: "Info"    },
  { key: "deed",        label: "Deed"    },
  { key: "excerptCert", label: "Extract" },
  { key: "dui",         label: "DUI"     },
  { key: "result",      label: "Result"  },
];

const checkSteps = [
  "Uploading documents...",
  "Reading deed metadata...",
  "Cross-referencing registry...",
  "Validating identity...",
  "Finalizing analysis...",
];

// ── Result stage ────────────────────────────────────────────────────

function ResultStage({ onRestart, onBack }: { onRestart: () => void; onBack: () => void }) {
  const [verifyState, setVerifyState] = useState<VerifyState>("loading");
  const [progress, setProgress]       = useState(0);
  const [stepIdx, setStepIdx]         = useState(0);
  const isVerified = true;

  useEffect(() => {
    const interval     = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(interval); return 100; } return p + 1.5; }); }, 50);
    const stepTimer    = setInterval(() => { setStepIdx((i) => Math.min(i + 1, checkSteps.length - 1)); }, 700);
    const resolveTimer = setTimeout(() => {
      clearInterval(interval); clearInterval(stepTimer);
      setProgress(100); setStepIdx(checkSteps.length - 1);
      setTimeout(() => setVerifyState(isVerified ? "verified" : "unverified"), 400);
    }, 3600);
    return () => { clearInterval(interval); clearInterval(stepTimer); clearTimeout(resolveTimer); };
  }, []);

  if (verifyState === "loading") return (
    <div className="stage-enter flex flex-col items-center text-center gap-6 py-4">
      <div className="relative w-36 h-24 rounded-xl border-2 border-[var(--gr-main)] bg-gradient-to-br from-[#e8f4f6] to-white overflow-hidden shadow-md">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 80 56" className="w-28 h-20" fill="none">
            <rect x="4" y="4" width="72" height="48" rx="6" fill="var(--gr-main)" />
            <circle cx="22" cy="24" r="8" fill="white" opacity="0.5" />
            <rect x="36" y="16" width="28" height="3" rx="1.5" fill="white" />
            <rect x="36" y="23" width="20" height="3" rx="1.5" fill="white" />
            <rect x="36" y="30" width="24" height="3" rx="1.5" fill="white" />
          </svg>
        </div>
        <div className="scan-line absolute left-0 right-0 h-[2px] bg-[var(--gr-main)] opacity-70 pointer-events-none" />
        <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[var(--gr-main)] rounded-tl" />
        <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[var(--gr-main)] rounded-tr" />
        <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[var(--gr-main)] rounded-bl" />
        <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[var(--gr-main)] rounded-br" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Analyzing your documents</h2>
        <p className="text-sm text-gray-400 h-5 transition-all duration-300">{checkSteps[stepIdx]}</p>
      </div>
      <div className="w-full max-w-xs">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--gr-main)] rounded-full" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    </div>
  );

  if (verifyState === "verified") return (
    <div className="stage-enter flex flex-col items-center text-center gap-5 py-4">
      <div className="relative flex items-center justify-center">
        <div className="pulse-ring absolute w-20 h-20 rounded-full bg-green-300" />
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center pop-in z-10">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="check-draw" />
          </svg>
        </div>
      </div>
      <div className="stage-enter stagger-1">
        <h2 className="text-2xl font-bold text-gray-800">You're verified!</h2>
        <p className="text-gray-500 text-sm mt-1">Your documents passed all checks successfully.</p>
      </div>
      <button onClick={onRestart} className="stage-enter stagger-2 mt-1 px-10 py-3 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold rounded-lg shadow-md">
        Continue →
      </button>
    </div>
  );

  return (
    <div className="stage-enter flex flex-col items-center text-center gap-5 py-4">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center pop-in shake-no">
        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" className="x-draw" />
        </svg>
      </div>
      <div className="stage-enter stagger-1">
        <h2 className="text-2xl font-bold text-gray-800">Verification failed</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xs">We couldn't verify your documents. Please check they are clear and valid.</p>
      </div>
      <div className="flex gap-3 stage-enter stagger-2">
        <button onClick={onBack} className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50">← Go back</button>
        <button onClick={onRestart} className="px-6 py-3 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold rounded-lg shadow-md">Publish anyway</button>
      </div>
    </div>
  );
}

// ── Principal export ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

export default function Sellers({ isOpen, onClose }: SellersProps) {
  const [stage, setStage]     = useState<Stage>("info");
  const [animKey, setAnimKey] = useState(0);

  const currentIndex = steps.findIndex((s) => s.key === stage);
  const goTo = (next: Stage) => { setStage(next); setAnimKey((k) => k + 1); };

  // Yoshua aquí va tu lógica de Tesseract OCR por documento
  const handleDeedFile        = (file: File) => { /* Tesseract - deed */ };
  const handleExcerptCertFile = (file: File) => { /* Tesseract - excerptCert */ };
  const handleDuiFile         = (file: File) => { /* Tesseract - dui */ };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <section className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--wh-main)] shadow-xl border border-gray-200 p-6 md:p-10">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--gr-main)] text-white text-sm font-semibold"
        >✕</button>

        {/* Step indicator (stages) */}
        <div className="flex items-center justify-center mb-8 px-4">
          {steps.map((step, i) => (
            <div key={step.key} className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2"
                style={{
                  transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
                  background:  i <  currentIndex ? "var(--gr-main)" : "white",
                  borderColor: i <= currentIndex ? "var(--gr-main)" : "#d1d5db",
                  color:       i <  currentIndex ? "white" : i === currentIndex ? "var(--gr-main)" : "#9ca3af",
                  boxShadow:   i === currentIndex ? "0 0 0 4px rgba(26,99,115,0.15)" : "none",
                }}
              >
                {i < currentIndex ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="h-0.5 w-12 sm:w-16 mx-1 bg-gray-200 relative overflow-hidden rounded-full">
                  <div className="absolute inset-y-0 left-0 bg-[var(--gr-main)] rounded-full" style={{ width: i < currentIndex ? "100%" : "0%", transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stage 1: Info */}
        {stage === "info" && (
          <div key={animKey} className="stage-enter flex flex-col items-center text-center gap-6">
            <div className="flex gap-8 justify-center mt-4 flex-wrap">
              <div className="flex flex-col items-center gap-2 stage-enter stagger-1">
                <div className="w-32 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <svg viewBox="0 0 80 56" className="w-24 h-16" fill="none">
                    <rect x="4" y="4" width="72" height="48" rx="6" fill="var(--wh-main)" stroke="var(--gr-main)" strokeWidth="2" />
                    <circle cx="26" cy="24" r="10" fill="#b0d8e5" stroke="var(--gr-main)" strokeWidth="1.5" />
                    <rect x="42" y="18" width="24" height="3" rx="1.5" fill="var(--gr-main)" opacity="0.5" />
                    <rect x="42" y="25" width="18" height="3" rx="1.5" fill="var(--gr-main)" opacity="0.4" />
                    <rect x="42" y="32" width="20" height="3" rx="1.5" fill="var(--gr-main)" opacity="0.3" />
                    <path d="M14 48 Q26 38 38 48" stroke="var(--gr-main)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload a clear photo of your DUI</p>
              </div>
              <div className="flex flex-col items-center gap-2 stage-enter stagger-2">
                <div className="w-32 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
                    <rect x="12" y="8" width="56" height="64" rx="4" fill="#e0f0f5" stroke="var(--gr-main)" strokeWidth="2" />
                    <path d="M40 12 L52 24 H40 V12Z" fill="#b0d8e5" stroke="var(--gr-main)" strokeWidth="1" />
                    <path d="M28 38 h24 M28 44 h18 M28 50 h20" stroke="var(--gr-main)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    <circle cx="40" cy="62" r="5" fill="#c8a45a" stroke="#9b7a2e" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload your deed document</p>
              </div>
              <div className="flex flex-col items-center gap-2 stage-enter stagger-3">
                <div className="w-32 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
                    <rect x="12" y="8" width="56" height="64" rx="4" fill="#e0f0f5" stroke="var(--gr-main)" strokeWidth="2" />
                    <path d="M40 12 L52 24 H40 V12Z" fill="#b0d8e5" stroke="var(--gr-main)" strokeWidth="1" />
                    <path d="M22 38 h36 M22 44 h28 M22 50 h32" stroke="var(--gr-main)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                    <rect x="22" y="56" width="12" height="6" rx="2" fill="#c8a45a" stroke="#9b7a2e" strokeWidth="1" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload your excerpt certification</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed stage-enter stagger-4">
              Upload your <strong>DUI</strong>, verify your <strong>Deed document</strong>, and add the{" "}
              <strong>Extracted certification</strong>. Make sure everything is clear and visible.
            </p>
            <button onClick={() => goTo("deed")} className="stage-enter stagger-4 mt-2 px-10 py-3 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold rounded-lg shadow-md">
              Next
            </button>
          </div>
        )}

        {/* Stage 2: Deed */}
        {stage === "deed" && (
          <div key={animKey} className="stage-enter flex flex-col items-center gap-6">
            <div className="bg-[var(--gr-main)] text-white text-xl font-semibold px-10 py-3 rounded-lg shadow-md stage-enter stagger-1">Deed Verification</div>
            <p className="text-sm text-gray-500 text-center max-w-sm stage-enter stagger-2">Upload a scanned copy or photo of your property deed. Accepted formats: PDF or image.</p>
            <div className="w-full stage-enter stagger-3">
              <DeedUpload onFileChange={handleDeedFile} />
            </div>
            <div className="flex gap-4 w-full stage-enter stagger-4">
              <button onClick={() => goTo("info")} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={() => goTo("excerptCert")} className="flex-1 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold py-3 rounded-lg shadow-md">Next</button>
            </div>
          </div>
        )}

        {/* Stage 3: Excerpt Certification */}
        {stage === "excerptCert" && (
          <div key={animKey} className="stage-enter flex flex-col items-center gap-6">
            <div className="bg-[var(--gr-main)] text-white text-xl font-semibold px-10 py-3 rounded-lg shadow-md stage-enter stagger-1">Excerpt Certification</div>
            <p className="text-sm text-gray-500 text-center max-w-sm stage-enter stagger-2">Upload your excerpt certification issued by the registry. Accepted formats: PDF or image.</p>
            <div className="w-full stage-enter stagger-3">
              <ExcerptCertUpload onFileChange={handleExcerptCertFile} />
            </div>
            <div className="flex gap-4 w-full stage-enter stagger-4">
              <button onClick={() => goTo("deed")} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={() => goTo("dui")} className="flex-1 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold py-3 rounded-lg shadow-md">Next</button>
            </div>
          </div>
        )}

        {/* Stage 4: DUI */}
        {stage === "dui" && (
          <div key={animKey} className="stage-enter flex flex-col items-center gap-6">
            <div className="bg-[var(--gr-main)] text-white text-xl font-semibold px-10 py-3 rounded-lg shadow-md stage-enter stagger-1">DUI Upload</div>
            <p className="text-sm text-gray-500 text-center max-w-sm stage-enter stagger-2">Upload a clear photo of both sides of your DUI. Images only (JPG, PNG, WEBP).</p>
            <div className="w-full stage-enter stagger-3">
              <DuiUpload onFileChange={handleDuiFile} />
            </div>
            <div className="flex gap-4 w-full stage-enter stagger-4">
              <button onClick={() => goTo("excerptCert")} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={() => goTo("result")} className="flex-1 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold py-3 rounded-lg shadow-md">Submit</button>
            </div>
          </div>
        )}

        {/* Stage 5: Result */}
        {stage === "result" && (
          <ResultStage key={animKey} onRestart={() => goTo("info")} onBack={() => goTo("dui")} />
        )}

        {/* Help link */}
        <div className="flex justify-center mt-4">
          <a href="/help" className="text-sm text-[var(--gr-main)] hover:underline">Need help?</a>
        </div>

      </section>
    </div>
  );
}