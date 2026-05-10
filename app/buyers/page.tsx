export default function BuyersVerificationPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-6xl rounded-2xl bg-white shadow-xl border border-gray-200 p-6 md:p-10">
        
        {/* Title */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#1A6373] text-white text-2xl md:text-3xl font-semibold px-16 py-4 rounded-lg shadow-md">
            Face ID
          </div>
        </div>
 
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Upload Section */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md h-[320px] border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-center bg-white hover:border-[#1A6373] transition">
              
              {/* Upload Icon */}
              <div className="w-14 h-14 bg-black rounded-md flex items-center justify-center mb-4">
                <span className="text-white text-3xl">↑</span>
              </div>
 
              <p className="text-xl font-medium text-black">
                Drag files to upload
              </p>
            </div>
 
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
              <button className="flex-1 bg-[#1A6373] hover:bg-[#144d59] text-white font-semibold py-3 rounded-lg transition">
                Choose File
              </button>
 
              <button className="flex-1 bg-[#1A6373] hover:bg-[#144d59] text-white font-semibold py-3 rounded-lg transition">
                Use camera
              </button>
            </div>
          </div>
 
          {/* Recommendations & Warnings */}
          <div className="space-y-8">
            
            {/* Recommendation */}
            <div>
              <div className="bg-[#0B1E4A] text-white text-center font-semibold text-xl py-3 rounded-xl mb-5">
                Recommendation
              </div>
 
              <ol className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
                <li>
                  <strong>1. Use the camera in a bright place</strong>
                  <br />
                  Make sure your face is clear and easy to see.
                </li>
 
                <li>
                  <strong>2. Look directly at the camera</strong>
                  <br />
                  Keep your face centered and visible.
                </li>
 
                <li>
                  <strong>3. Remove hats or sunglasses</strong>
                  <br />
                  Your full face must be visible.
                </li>
 
                <li>
                  <strong>4. Keep the camera steady</strong>
                  <br />
                  Avoid movement so the image is not blurry.
                </li>
              </ol>
            </div>
 
            {/* Warnings */}
            <div>
              <div className="bg-[#0B1E4A] text-white text-center font-semibold text-xl py-3 rounded-xl mb-5">
                Warnings
              </div>
 
              <ol className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
                <li>
                  <strong>1. Do not cover your face</strong>
                  <br />
                  Hair, hands, or objects should not block your face.
                </li>
 
                <li>
                  <strong>2. Do not use filters or effects</strong>
                  <br />
                  The image must look natural and real.
                </li>
 
                <li>
                  <strong>3. Do not take the photo in the dark</strong>
                  <br />
                  Poor lighting may cause rejection.
                </li>
 
                <li>
                  <strong>4. Do not use a photo of another person</strong>
                  <br />
                  The Face ID must match the document owner.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
 