export default function buyersVerificationPage() {
  const steps = [
    {
      title: "DUI",
      description: "Upload a clear photo of your DUI",
      icon: "🪪",
    },
    {
      title: "Face ID",
      description: "Verify your face",
      icon: "👤",
    },
    {
      title: "Property Deed",
      description: "Upload the house document",
      icon: "📄",
    },
  ];
 
  return (
    <main className="min-h-screen bg-[#ffffff] px-4 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#0B1E4A] md:text-5xl">
          Buyer Verification
        </h1>
 
        {/* Progress Bar */}
        <div className="mt-8 flex w-full max-w-4xl items-center">
          {/* Step 1 */}
          <div className="h-7 w-7 rounded-full border-4 border-[#1A6373] bg-[#1A6373]" />
 
          {/* Line */}
          <div className="h-[4px] flex-1 bg-[#c7d7dc]" />
 
          {/* Step 2 */}
          <div className="h-7 w-7 rounded-full border-4 border-[#1A6373] bg-[#1A6373]" />
 
          {/* Line */}
          <div className="h-[4px] flex-1 bg-[#c7d7dc]" />
 
          {/* Step 3 */}
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#1A6373] bg-white">
            <div className="h-2 w-2 rounded-full bg-[#1A6373]" />
          </div>
        </div>
 
        {/* Subtitle */}
        <p className="mt-16 max-w-3xl text-center text-lg font-semibold leading-relaxed text-[#0B1E4A] md:text-3xl">
          Upload your ID, verify your face, and add the property deed.
          <br />
          Make sure everything is clear and visible
        </p>
 
        {/* Cards */}
        <div className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              {/* Card Title */}
              <h2 className="mb-5 text-2xl font-bold text-[#171717]">
                {step.title}
              </h2>
 
              {/* Upload Box */}
              <div className="flex h-[230px] w-full max-w-[320px] items-center justify-center rounded-2xl border border-gray-300 bg-[#fafaf9] shadow-sm transition hover:shadow-md">
                <span className="text-7xl">{step.icon}</span>
              </div>
 
              {/* Description */}
              <p className="mt-5 text-center text-lg text-[#171717]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
 
        {/* Buttons */}
        <div className="mt-16 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-[#0B1E4A] px-12 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:bg-[#081632]">
            Go back
          </button>
 
          <button className="rounded-full bg-[#0B1E4A] px-12 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:bg-[#081632]">
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}