"use client";

import { useRef, useState, useEffect } from "react";

function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--wh-main)]">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${6 + (i % 5) * 4}px`,
            height: `${6 + (i % 5) * 4}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "var(--gr-main)" : i % 3 === 1 ? "var(--bl-main)" : "var(--br-main)",
            opacity: 0.12 + (i % 4) * 0.04,
            left: `${(i * 23) % 95}%`,
            top: `${(i * 37) % 90}%`,
            animation: `float${i % 3 + 1} ${8 + (i % 5) * 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

type Stage = "info" | "deed" | "excerptCert" | "dui" | "result";

const animStyles = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.7); }
    70%  { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes drawCheck {
    from { stroke-dashoffset: 50; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes scanLine {
    0%   { top: 4%; opacity: 1; }
    80%  { top: 88%; opacity: 1; }
    100% { top: 88%; opacity: 0; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.5; }
    100% { transform: scale(1.65); opacity: 0; }
  }
  @keyframes drawX {
    from { stroke-dashoffset: 30; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes shakeNo {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-8px); }
    40%     { transform: translateX(8px); }
    60%     { transform: translateX(-6px); }
    80%     { transform: translateX(6px); }
  }
  @keyframes float1 {
    from { transform: translate(0px, 0px); }
    to   { transform: translate(20px, -30px); }
  }
  @keyframes float2 {
    from { transform: translate(0px, 0px); }
    to   { transform: translate(-25px, 20px); }
  }
  @keyframes float3 {
    from { transform: translate(0px, 0px); }
    to   { transform: translate(15px, 25px); }
  }
  .spin { animation: spin 1s linear infinite; }
  .scan-line { animation: scanLine 1.8s ease-in-out infinite; }
  .pulse-ring { animation: pulse-ring 1.4s ease-out infinite; }
  .x-draw { stroke-dasharray: 30; stroke-dashoffset: 30; animation: drawX 0.4s 0.15s ease forwards; }
  .shake-no { animation: shakeNo 0.5s ease; }
  .stage-enter { animation: fadeSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .pop-in { animation: popIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .check-draw { stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawCheck 0.5s 0.2s ease forwards; }
  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.12s; }
  .stagger-3 { animation-delay: 0.19s; }
  .stagger-4 { animation-delay: 0.26s; }
  button { transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.15s ease; }
  button:hover  { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(26,99,115,0.25); }
  button:active { transform: translateY(0px); box-shadow: none; }
`;

function SpotlightZone({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = divRef.current?.getBoundingClientRect();
        if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-[220px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(209,213,219,0.8) 0%, rgba(209,213,219,0) 70%)`
          : "transparent",
        transition: "background 0.1s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
        transform: isHovered ? "scale(1.01)" : "scale(1)",
        borderColor: isHovered ? "#1A6373" : undefined,
        boxShadow: isHovered ? "0 0 0 4px rgba(26,99,115,0.08)" : "none",
      }}
    >
      {children}
    </div>
  );
}

type VerifyState = "loading" | "verified" | "unverified";

const checkSteps = [
  "Uploading documents...",
  "Reading deed metadata...",
  "Cross-referencing registry...",
  "Validating identity...",
  "Finalizing analysis...",
];

function ResultStage({ onRestart, onBack }: { onRestart: () => void; onBack: () => void }) {
  const [verifyState, setVerifyState] = useState<VerifyState>("loading");
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const isVerified = true;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => { if (p >= 100) { clearInterval(interval); return 100; } return p + 1.5; });
    }, 50);
    const stepTimer = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, checkSteps.length - 1));
    }, 700);
    const resolveTimer = setTimeout(() => {
      clearInterval(interval);
      clearInterval(stepTimer);
      setProgress(100);
      setStepIdx(checkSteps.length - 1);
      setTimeout(() => setVerifyState(isVerified ? "verified" : "unverified"), 400);
    }, 3600);
    return () => { clearInterval(interval); clearInterval(stepTimer); clearTimeout(resolveTimer); };
  }, []);

  if (verifyState === "loading") return (
    <div className="stage-enter flex flex-col items-center text-center gap-6 py-4">
      <div className="relative w-36 h-24 rounded-xl border-2 border-[var(--gr-main)] bg-gradient-to-br from-[#e8f4f6] to-white overflow-hidden shadow-md">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 80 56" className="w-28 h-20" fill="none">
            <rect x="4" y="4" width="72" height="48" rx="6" fill="var(--gr-main)"/>
            <circle cx="22" cy="24" r="8" fill="white" opacity="0.5"/>
            <rect x="36" y="16" width="28" height="3" rx="1.5" fill="white"/>
            <rect x="36" y="23" width="20" height="3" rx="1.5" fill="white"/>
            <rect x="36" y="30" width="24" height="3" rx="1.5" fill="white"/>
          </svg>
        </div>
        <div className="scan-line absolute left-0 right-0 h-[2px] bg-[var(--gr-main)] opacity-70 pointer-events-none" style={{ position: "absolute" }}/>
        <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[var(--gr-main)] rounded-tl"/>
        <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[var(--gr-main)] rounded-tr"/>
        <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[var(--gr-main)] rounded-bl"/>
        <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[var(--gr-main)] rounded-br"/>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Analyzing your documents</h2>
        <p className="text-sm text-gray-400 h-5 transition-all duration-300">{checkSteps[stepIdx]}</p>
      </div>
      <div className="w-full max-w-xs">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--gr-main)] rounded-full" style={{ width: `${progress}%`, transition: "width 0.1s linear" }}/>
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    </div>
  );

  if (verifyState === "verified") return (
    <div className="stage-enter flex flex-col items-center text-center gap-5 py-4">
      <div className="relative flex items-center justify-center">
        <div className="pulse-ring absolute w-20 h-20 rounded-full bg-green-300"/>
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center pop-in z-10">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="check-draw"/>
          </svg>
        </div>
      </div>
      <div className="stage-enter stagger-1">
        <h2 className="text-2xl font-bold text-gray-800">You're verified!</h2>
        <p className="text-gray-500 text-sm mt-1">Your documents passed all checks successfully.</p>
      </div>
      <button onClick={onRestart}
        className="stage-enter stagger-2 mt-1 px-10 py-3 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold rounded-lg shadow-md">
        Continue →
      </button>
    </div>
  );

  return (
    <div className="stage-enter flex flex-col items-center text-center gap-5 py-4">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center pop-in shake-no">
        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" className="x-draw"/>
        </svg>
      </div>
      <div className="stage-enter stagger-1">
        <h2 className="text-2xl font-bold text-gray-800">Verification failed</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xs">We couldn't verify your documents. Please check they are clear and valid.</p>
      </div>
      <div className="flex gap-3 stage-enter stagger-2">
        <button onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50">
          ← Go back
        </button>
        <button onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold rounded-lg shadow-md">
          Publish anyway
        </button>
      </div>
    </div>
  );
}

const steps: { key: Stage; label: string }[] = [
  { key: "info",        label: "Info"    },
  { key: "deed",        label: "Deed"    },
  { key: "excerptCert", label: "Extract" },
  { key: "dui",         label: "DUI"     },
  { key: "result",      label: "Result"  },
];

export default function Sellers() {
  const [stage, setStage]                             = useState<Stage>("info");
  const [animKey, setAnimKey]                         = useState(0);
  const [deedUploaded, setDeedUploaded]               = useState(false);
  const [excerptCertUploaded, setExcerptCertUploaded] = useState(false);
  const [duiUploaded, setDuiUploaded]                 = useState(false);

  const deedInputRef        = useRef<HTMLInputElement>(null);
  const excerptCertInputRef = useRef<HTMLInputElement>(null);
  const duiInputRef         = useRef<HTMLInputElement>(null);
  const currentIndex        = steps.findIndex((s) => s.key === stage);

  const goTo = (next: Stage) => { setStage(next); setAnimKey((k) => k + 1); };

  useEffect(() => {
    if (document.getElementById("valtrust-anim")) return;
    const el = document.createElement("style");
    el.id = "valtrust-anim";
    el.textContent = animStyles;
    document.head.appendChild(el);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <ParticleBackground />

      <section className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-200 p-6 md:p-10">

        {/* Step indicator */}
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
                  <div
                    className="absolute inset-y-0 left-0 bg-[var(--gr-main)] rounded-full"
                    style={{ width: i < currentIndex ? "100%" : "0%", transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)" }}
                  />
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
                    <rect x="4" y="4" width="72" height="48" rx="6" fill="var(--wh-main)" stroke="var(--gr-main)" strokeWidth="2"/>
                    <circle cx="26" cy="24" r="10" fill="#b0d8e5" stroke="var(--gr-main)" strokeWidth="1.5"/>
                    <rect x="42" y="18" width="24" height="3" rx="1.5" fill="var(--gr-main)" opacity="0.5"/>
                    <rect x="42" y="25" width="18" height="3" rx="1.5" fill="var(--gr-main)" opacity="0.4"/>
                    <rect x="42" y="32" width="20" height="3" rx="1.5" fill="var(--gr-main)" opacity="0.3"/>
                    <path d="M14 48 Q26 38 38 48" stroke="var(--gr-main)" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload a clear photo of your DUI</p>
              </div>
              <div className="flex flex-col items-center gap-2 stage-enter stagger-2">
                <div className="w-32 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
                    <rect x="12" y="8" width="56" height="64" rx="4" fill="#e0f0f5" stroke="var(--gr-main)" strokeWidth="2"/>
                    <path d="M40 12 L52 24 H40 V12Z" fill="#b0d8e5" stroke="var(--gr-main)" strokeWidth="1"/>
                    <path d="M28 38 h24 M28 44 h18 M28 50 h20" stroke="var(--gr-main)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                    <circle cx="40" cy="62" r="5" fill="#c8a45a" stroke="#9b7a2e" strokeWidth="1.5"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload your deed document</p>
              </div>
              <div className="flex flex-col items-center gap-2 stage-enter stagger-3">
                <div className="w-32 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
                    <rect x="12" y="8" width="56" height="64" rx="4" fill="#e0f0f5" stroke="var(--gr-main)" strokeWidth="2"/>
                    <path d="M40 12 L52 24 H40 V12Z" fill="#b0d8e5" stroke="var(--gr-main)" strokeWidth="1"/>
                    <path d="M22 38 h36 M22 44 h28 M22 50 h32" stroke="var(--gr-main)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                    <rect x="22" y="56" width="12" height="6" rx="2" fill="#c8a45a" stroke="#9b7a2e" strokeWidth="1"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload your excerpt certification</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed stage-enter stagger-4">
              Upload your <strong>DUI</strong>, verify your <strong>Deed document</strong>, and add the{" "}
              <strong>Extracted certification</strong>. Make sure everything is clear and visible.
            </p>
            <button onClick={() => goTo("deed")}
              className="stage-enter stagger-4 mt-2 px-10 py-3 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold rounded-lg shadow-md">
              Next
            </button>
          </div>
        )}

        {/* Stage 2: Deed */}
        {stage === "deed" && (
          <div key={animKey} className="stage-enter flex flex-col items-center gap-6">
            <div className="bg-[var(--gr-main)] text-white text-xl font-semibold px-10 py-3 rounded-lg shadow-md stage-enter stagger-1">
              Deed Verification
            </div>
            <p className="text-sm text-gray-500 text-center max-w-sm stage-enter stagger-2">
              Upload a scanned copy or photo of your property deed. Accepted formats: PDF or image.
            </p>
            <div className="w-full stage-enter stagger-3">
              <input type="file" className="hidden" ref={deedInputRef} accept="application/pdf,image/*" onChange={() => setDeedUploaded(true)}/>
              <SpotlightZone onClick={() => deedInputRef.current?.click()}>
                <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center mb-3">
                  <span className="text-white text-2xl">↑</span>
                </div>
                {deedUploaded
                  ? <p className="text-green-600 font-medium pop-in">File selected ✓</p>
                  : <p className="text-gray-600 font-medium">Click here or drag files to upload</p>}
              </SpotlightZone>
            </div>
            <div className="flex gap-4 w-full stage-enter stagger-4">
              <button onClick={() => goTo("info")}
                className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={() => goTo("excerptCert")}
                className="flex-1 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold py-3 rounded-lg shadow-md">Next</button>
            </div>
          </div>
        )}

        {/* Stage 3: Excerpt Certification */}
        {stage === "excerptCert" && (
          <div key={animKey} className="stage-enter flex flex-col items-center gap-6">
            <div className="bg-[var(--gr-main)] text-white text-xl font-semibold px-10 py-3 rounded-lg shadow-md stage-enter stagger-1">
              Excerpt Certification
            </div>
            <p className="text-sm text-gray-500 text-center max-w-sm stage-enter stagger-2">
              Upload your excerpt certification issued by the registry. Accepted formats: PDF or image.
            </p>
            <div className="w-full stage-enter stagger-3">
              <input type="file" className="hidden" ref={excerptCertInputRef} accept="application/pdf,image/*" onChange={() => setExcerptCertUploaded(true)}/>
              <SpotlightZone onClick={() => excerptCertInputRef.current?.click()}>
                <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center mb-3">
                  <span className="text-white text-2xl">↑</span>
                </div>
                {excerptCertUploaded
                  ? <p className="text-green-600 font-medium pop-in">File selected ✓</p>
                  : <p className="text-gray-600 font-medium">Click here or drag files to upload</p>}
              </SpotlightZone>
            </div>
            <div className="flex gap-4 w-full stage-enter stagger-4">
              <button onClick={() => goTo("deed")}
                className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={() => goTo("dui")}
                className="flex-1 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold py-3 rounded-lg shadow-md">Next</button>
            </div>
          </div>
        )}

        {/* Stage 4: DUI */}
        {stage === "dui" && (
          <div key={animKey} className="stage-enter flex flex-col items-center gap-6">
            <div className="bg-[var(--gr-main)] text-white text-xl font-semibold px-10 py-3 rounded-lg shadow-md stage-enter stagger-1">
              DUI Upload
            </div>
            <p className="text-sm text-gray-500 text-center max-w-sm stage-enter stagger-2">
              Upload a clear photo of both sides of your DUI. Images only (JPG, PNG, WEBP).
            </p>
            <div className="w-full stage-enter stagger-3">
              <input type="file" className="hidden" ref={duiInputRef} accept="image/*" onChange={() => setDuiUploaded(true)}/>
              <SpotlightZone onClick={() => duiInputRef.current?.click()}>
                <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center mb-3">
                  <span className="text-white text-2xl">↑</span>
                </div>
                {duiUploaded
                  ? <p className="text-green-600 font-medium pop-in">File selected ✓</p>
                  : <p className="text-gray-600 font-medium">Click here or drag files to upload</p>}
              </SpotlightZone>
            </div>
            <div className="flex gap-4 w-full stage-enter stagger-4">
              <button onClick={() => goTo("excerptCert")}
                className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={() => goTo("result")}
                className="flex-1 bg-gradient-to-r from-[var(--bl-main)] to-[var(--gr-main)] text-white font-semibold py-3 rounded-lg shadow-md">Submit</button>
            </div>
          </div>
        )}

        {/* Stage 5: Result */}
        {stage === "result" && (
          <ResultStage
            key={animKey}
            onRestart={() => { setDeedUploaded(false); setExcerptCertUploaded(false); setDuiUploaded(false); goTo("info"); }}
            onBack={() => goTo("dui")}
          />
        )}

        {/* Help link */}
        <div className="flex justify-center mt-4">
          <a href="/help" className="text-sm text-[var(--gr-main)] hover:underline">
            Need help?
          </a>
        </div>

      </section>
    </main>
  );
}