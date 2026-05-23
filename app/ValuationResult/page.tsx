import { getValuationData } from "./getData";

export default async function ValuationResult({ searchParams }: { searchParams: Promise<{ id: string }> }) {
    const { id } = await searchParams;
    const valuation = await getValuationData(id);

    if (!valuation) return <p>No se encontró la valuación.</p>;

    const conditionFactors: Record<string, number> = {
        Excellent: 1.18,
        Good: 1.0,
        Fair: 0.85,
        Poor: 0.72,
    };

    const condMult = conditionFactors[valuation.condition] ?? 1.0;
    const age = new Date().getFullYear() - (valuation.yearBuilt ?? 0);
    const ageDiscount = Math.max(0, 1 - age * 0.008);
    const base = valuation.estimatedValue;

    const locationBonus = Math.round(base * 0.22);
    const infraBonus = Math.round(base * 0.14);
    const featBonus = (valuation.bedrooms ?? 0) * 4000 + (valuation.bathrooms ?? 0) * 3000;
    const condBonus = Math.max(0, Math.round(base * condMult * ageDiscount - base));
    const mktBonus = Math.round(base * 0.085);

    const rangeTotal = valuation.estimatedMax - valuation.estimatedMin;
    const pinPercent = Math.round(((valuation.estimatedValue - valuation.estimatedMin) / rangeTotal) * 100);

    return (
        <section className="flex justify-center bg-white text-black py-10">
            <figure className="flex flex-col gap-y-6">
                
                <div className="flex justify-between items-center border-gray-200 shadow-lg p-6 border-l-[1px] border-b-[2px] border-r-[1px] w-300">
                    <p className="text-xl font-semibold">Valuation Result</p>
                    <p className="text-semibold cursor-pointer">← Back to Dashboard</p>
                </div>

                <div className="flex gap-x-8 border-gray-200 shadow-lg p-6 border-l-[1px] border-b-[2px] border-r-[1px]">
                    <div className="bg-gray-200 w-[450px] h-[250px] flex items-center justify-center shrink-0">
                        <p>imagen</p>
                    </div>
                    <div className="flex flex-col justify-center gap-y-1 w-full">
                        <p className="text-xl font-bold">Estimated Property Value</p>
                        <p className="text-xs text-gray-500">As of May 10, 2026</p>

                        {/* Price range schema */}
                        <div className="mt-6 mb-2">
                            {/* Actual price pin */}
                            <div
                                className="relative"
                                style={{ marginLeft: `${pinPercent}%`, transform: "translateX(-50%)", width: "fit-content" }}
                            >
                                <p className="text-[10px] text-gray-400 text-center mb-0.5">Actual Price</p>
                                <span className="bg-green-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap block text-center">
                                    ${valuation.estimatedValue.toLocaleString()} USD
                                </span>
                                <div className="flex justify-center mt-1">
                                    <div className="w-[1px] h-3 bg-gray-300" />
                                </div>
                            </div>

                            {/* Track */}
                            <div className="relative h-[6px] rounded-full bg-gray-200">
                                <div className="absolute inset-0 rounded-full bg-[#D9D9D9]" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300" />
                                <div
                                    className="absolute top-1/2 w-3 h-3 rounded-full bg-green-600"
                                    style={{ left: `${pinPercent}%`, transform: "translate(-50%, -50%)" }}
                                />
                            </div>

                            {/* Min / Max pills */}
                            <div className="flex justify-between mt-3">
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-3 py-0.5 rounded-full">
                                        ${valuation.estimatedMin.toLocaleString()} USD
                                    </span>
                                    <span className="text-[10px] text-gray-400">Minimum Price</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-3 py-0.5 rounded-full">
                                        ${valuation.estimatedMax.toLocaleString()} USD
                                    </span>
                                    <span className="text-[10px] text-gray-400">Maximum Price</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-4">This is the estimated market value of your property based on the information you provided.</p>
                    </div>
                </div>

                <div className="flex gap-x-8">
                    <div className="border-gray-200 shadow-lg p-6 border-l-[1px] border-b-[2px] border-r-[1px] w-1/2">
                        <p className="font-bold">Property Overview</p>
                        <hr className="my-4 border-gray-200"></hr>
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <p className="text-gray-500">Property Type</p> <p>{valuation.type}</p>
                            <p className="text-gray-500">Location</p> <p>{valuation.municipality}, {valuation.department}</p>
                            <p className="text-gray-500">Land Area</p> <p>{valuation.landAreaM2} sq ft</p>
                            <p className="text-gray-500">Building area</p> <p>{valuation.areaM2} sq ft</p>
                            <p className="text-gray-500">Bedrooms</p> <p>{valuation.bedrooms}</p>
                            <p className="text-gray-500">Bathrooms</p> <p>{valuation.bathrooms}</p>
                            <p className="text-gray-500">Year built</p> <p>{valuation.yearBuilt}</p>
                            <p className="text-gray-500">Condition</p> <p>{valuation.condition}</p>
                        </div>
                    </div>

                    <div className="border-gray-200 shadow-lg p-6 border-l-[1px] border-b-[2px] border-r-[1px] w-1/2">
                        <p className="font-bold">Why is this the estimated value?</p>
                        <hr className="my-4 border-gray-200"></hr>
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <p className="text-gray-500">Location</p> <p className="text-green-600 font-bold">+${locationBonus.toLocaleString()}</p>
                            <p className="text-gray-500">Infrastructure</p> <p className="text-green-600 font-bold">+${infraBonus.toLocaleString()}</p>
                            <p className="text-gray-500">Property features</p> <p className="text-green-600 font-bold">+${featBonus.toLocaleString()}</p>
                            <p className="text-gray-500">Condition & age</p> <p className="text-green-600 font-bold">+${condBonus.toLocaleString()}</p>
                            <p className="text-gray-500">Market trend</p> <p className="text-green-600 font-bold">+${mktBonus.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </figure>
        </section>
    );
}