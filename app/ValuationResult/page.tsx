"use client";

export default function valuationResult() {
    return (
        <section className="flex justify-center bg-white text-black py-10">
            <figure className="content-center flex flex-col gap-y-10">
                <div className="flex justify-center items-center gap-x-100 border-gray-200 shadow-lg p-6 border-l-1 border-b-2 border-r-1 w-300 h-20">
                    <p className="text-xl font-semibold ">Valuation result</p>
                    <button></button>
                    <p className="text-semibold">Back to dashboard</p>
                </div>
                <div className="flex justify-center gap-x-100 border-gray-200 shadow-lg p-6 border-l-1 border-b-2 border-r-1">
                    <div>
                        <p>imagen</p>
                        
                    </div>
                    <div className="flex justify-center flex-col">
                        <p>Estimated propertie value</p>
                        <p>DATE</p>
                        <p>Schema</p>
                        <p>This is the estimated value of your property based on the information you provided.</p>
                    </div>
                </div>
                <div className="flex flex-row gap-x-75">
                    <div className="border-gray-200 shadow-lg p-6 border-l-1 border-b-2 border-r-1">
                        <p>Property overview</p>
                        <hr className="w-100"></hr>
                            <div className="flex flex-row gap-x-40 gap-y-5">
                                <div>
                                    <p>Property type</p>
                                    <p>Location</p>
                                    <p>Land Area</p>
                                    <p>Building area</p>
                                    <p>Bedroom</p>
                                    <p>Bathroom</p>
                                    <p>Year built</p>
                                    <p>Condition</p>
                                </div>
                                <div>
                                    <p>Property type</p>
                                    <p>Location</p>
                                    <p>Land Area</p>
                                    <p>Building area</p>
                                    <p>Bedroom</p>
                                    <p>Bathroom</p>
                                    <p>Year built</p>
                                    <p>Condition</p>
                                </div>
                            </div>
                    </div>
                    <div className="border-gray-200 shadow-lg p-6 border-l-1 border-b-2 border-r-1">
                        <p>Why is the estimated value?           </p>
                        <hr className="w-100"></hr>
                            <div>
                                <div>
                                    <p>Location</p>
                                    <p>Infrastructure</p>
                                    <p>Property features</p>
                                    <p>Condition & age</p>
                                    <p>Market trend</p>
                                </div>
                                <div>
                                    <p>Location</p>
                                    <p>Infrastructure</p>
                                    <p>Property features</p>
                                    <p>Condition & age</p>
                                    <p>Market trend</p>
                                </div>
                            </div>
                    </div>
                </div>
            </figure>
        </section>
    )
}