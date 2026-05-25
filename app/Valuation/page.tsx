"use client";

import { useState } from "react";
import { ZONES } from "./zones";
import { useRouter } from "next/navigation";
import { calculateValuation } from "./actions";

// Define a type for the form state that mirrors what the UI collects
export type ValuationFormInput = {
    department: string;
    municipality: string;
    zone: string;
    exactAddress: string;
    postalCode: number;
    type: string;
    condition: string;
    areaM2: number;
    landAreaM2: number;
    levels: number;
    yearBuilt: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    kitchenType: string;
    hasLivingDiningRoom: boolean;
    hasLaundryRoom: boolean;
    hasStorageCellar: boolean;
    hasStudioHomeOffice: boolean;
    hasServiceQuarter: boolean;
    hasAC: boolean;
    hasSmartHome: boolean;
    hasPool: boolean;
    hasSecurityGate: boolean;
    hasCCTV: boolean;
    hasGym: boolean;
    hasElevator: boolean;
    hasGreenAreas: boolean;
    hasOtherAmenity: boolean;
    otherAmenityDescription: string;
    publicDescription: string;
    maintenanceFee: number;
    petsAllowed: string;
    includedServices: string;
};

export default function Valuation() {
    const [form, setForm] = useState<ValuationFormInput>({
        department: "",
        municipality: "",
        zone: "",
        exactAddress: "",
        postalCode: 0,
        type: "",
        condition: "good", // Set a default valid fallback match for your select field
        areaM2: 0,
        landAreaM2: 0,
        levels: 0,
        yearBuilt: 0,
        bedrooms: 0,
        bathrooms: 0,
        parkingSpaces: 0,
        kitchenType: "",
        hasLivingDiningRoom: false,
        hasLaundryRoom: false,
        hasStorageCellar: false,
        hasStudioHomeOffice: false,
        hasServiceQuarter: false,
        hasAC: false,
        hasSmartHome: false,
        hasPool: false,
        hasSecurityGate: false,
        hasCCTV: false,
        hasGym: false,
        hasElevator: false,
        hasGreenAreas: false,
        hasOtherAmenity: false,
        otherAmenityDescription: "",
        publicDescription: "",
        maintenanceFee: 0,
        petsAllowed: "allowed",
        includedServices: "",
    });

    const router = useRouter();

    const municipalities = form.department ? Object.keys(ZONES[form.department] || {}) : [];
    const zones = form.department && form.municipality ? ZONES[form.department]?.[form.municipality] || [] : [];

    function Change(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = event.target;
        const checked = (event.target as HTMLInputElement).checked;

        setForm((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? value === ""
                            ? 0
                            : Number(value.replace(/[^0-9.]/g, ""))
                        : value,
        }));
    }

    async function handleSubmit() {
        // Correct truthy check for numbers: explicitly check against 0 or empty strings
        if (
            !form.department ||
            !form.municipality ||
            !form.zone ||
            !form.exactAddress ||
            form.areaM2 === 0 ||
            form.levels === 0 ||
            form.yearBuilt === 0 ||
            form.bedrooms === 0 ||
            form.bathrooms === 0 ||
            !form.type ||
            !form.condition
        ) {
            alert("Please complete all required fields with values greater than 0");
            return;
        }

        try {
            // Send form directly to server action
            const result = await calculateValuation(form);
            if (result?.id) {
                router.push(`/ValuationResult?id=${result.id}`);
            }
        } catch (error) {
            console.error("Error creating valuation record:", error);
            alert("Something went wrong while saving your house estimate.");
        }
    }

    return (
        <section className="flex flex-col items-center bg-white py-10">
            <figure className="flex flex-col items-center w-150 gap-y-11">
                <div className="flex flex-col items-center text-center gap-y-5">
                    <p className="text-5xl font-semibold text-[#0D4687] tracking-[0.005em]">Ready to discover your property value?</p>
                    <p className="text-2xl text-[#0B1E4A]">Take the first step toward your property valuation, complete a few details to get your estimate</p>
                </div>
                <div className="flex flex-col gap-y-15">
                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">
                        <div className="flex flex-row gap-x-2">
                            <img src="/Valuation/location-icon.png" alt="" className="h-5 mt-1"/>
                            <p className="text-white text-xl font-medium">Location</p>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">DEPARTMENT / STATE</p>
                                <select
                                    name="department"
                                    className="bg-white w-full h-7 text-black px-2"
                                    value={form.department}
                                    onChange={(event) => {
                                        Change(event);
                                        setForm((previous) => ({ ...previous, municipality: "", zone: "" }));
                                    }}
                                >
                                    <option value=""></option>
                                    {Object.keys(ZONES).map((actualDepartment) => (
                                        <option key={actualDepartment} value={actualDepartment}>{actualDepartment}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">MUNICIPALITY / CITY</p>
                                <select
                                    name="municipality"
                                    className="bg-white w-full h-7 text-black px-2"
                                    value={form.municipality}
                                    onChange={(event) => {
                                        Change(event);
                                        setForm((previous) => ({ ...previous, zone: "" }));
                                    }}
                                >
                                    <option value=""></option>
                                    {municipalities.map((actualMunicipality) => (
                                        <option key={actualMunicipality} value={actualMunicipality}>{actualMunicipality}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">ZONE / NEIGHBORHOOD</p>
                                <select
                                    name="zone"
                                    className="bg-white w-full h-7 text-black px-2"
                                    value={form.zone}
                                    onChange={Change}
                                >
                                    <option value=""></option>
                                    {zones.map((actualZone) => (
                                        <option key={actualZone} value={actualZone}>{actualZone}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">EXACT ADDRESS</p>
                                <input name="exactAddress"
                                    value={form.exactAddress}
                                    onChange={Change}
                                    className="bg-white w-full h-7 px-2 text-black"
                                    placeholder="e.g Street, Avenue, House Number"
                                    type="text" />
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">POSTAL CODE</p>
                                <input name="postalCode"
                                    min={0}
                                    value={form.postalCode || ""}
                                    onChange={Change} 
                                    className="bg-white w-full h-7 px-2 text-black" 
                                    placeholder="e.g 10101" 
                                    type="number" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">
                        <div className="flex flex-row gap-x-2">
                            <img src="/Valuation/property-icon.png" alt="" className="h-5 mt-1"/>
                            <p className="text-white text-xl font-medium">Property Details</p>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">PROPERTY TYPE</p>
                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={Change}
                                    className="bg-white w-full h-7 text-black px-2">
                                    <option value=""></option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="land">Land</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">CONSTRUCTION AREA (m²)</p>
                                <input name="areaM2"
                                    min={0}
                                    value={form.areaM2 || ""}
                                    onChange={Change}
                                    className="bg-white w-full h-7 px-2 text-black" 
                                    placeholder="0.00"
                                    type="number" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">LOT AREA (m²)</p>
                                <input
                                    name="landAreaM2"
                                    min={0}
                                    value={form.landAreaM2 || ""}
                                    onChange={Change}
                                    className="bg-white w-full h-7 px-2 text-black" 
                                    placeholder="0.00"
                                    type="number" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">LEVELS / FLOORS</p>
                                <input
                                    name="levels"
                                    min={0}
                                    value={form.levels || ""}
                                    onChange={Change}
                                    className="bg-white w-full h-7 px-2 text-black" 
                                    placeholder="e.g 1"
                                    type="number" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">YEAR BUILT</p>
                                <input
                                    name="yearBuilt"
                                    min={0}
                                    value={form.yearBuilt || ""}
                                    onChange={Change}
                                    className="bg-white w-full h-7 px-2 text-black" 
                                    placeholder="e.g 2022"
                                    type="number" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-6">
                        <div className="flex flex-row gap-x-2">
                            <img src="/Valuation/bed-icon.png" alt="" className="h-5 mt-1"/>
                            <p className="text-white text-xl font-medium">Room & Spaces</p>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Bedrooms</p>
                                    <input
                                        name="bedrooms"
                                        min={0}
                                        value={form.bedrooms || ""}
                                        onChange={Change}
                                        className="bg-white w-full h-7 px-2 text-black" 
                                        placeholder="0"
                                        type="number" />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Bathrooms</p>
                                    <input
                                        name="bathrooms"
                                        min={0}
                                        value={form.bathrooms || ""}
                                        onChange={Change}
                                        className="bg-white w-full h-7 px-2 text-black" 
                                        placeholder="0" 
                                        type="number" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Parking Spaces</p>
                                    <input
                                        name="parkingSpaces"
                                        min={0}
                                        value={form.parkingSpaces || ""}
                                        onChange={Change}
                                        className="bg-white w-full h-7 px-2 text-black" 
                                        placeholder="0"
                                        type="number" />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Kitchen Type</p>
                                    <select
                                        name="kitchenType"
                                        value={form.kitchenType}
                                        onChange={Change}
                                        className="bg-white w-full h-7 px-2 text-black">
                                        <option value=""></option>
                                        <option value="closed">Closed</option>
                                        <option value="open">Open</option>
                                        <option value="semi_open">Semi-Open</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-5 gap-x-4 mt-2">
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasLivingDiningRoom"
                                        checked={form.hasLivingDiningRoom}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Living / Dining Room
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasLaundryRoom"
                                        checked={form.hasLaundryRoom}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Laundry Room
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasStorageCellar"
                                        checked={form.hasStorageCellar}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Storage / Cellar
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasStudioHomeOffice"
                                        checked={form.hasStudioHomeOffice}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Studio / Home Office
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasServiceQuarter"
                                        checked={form.hasServiceQuarter}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Service Quarter
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-4">
                        <div className="flex flex-row gap-x-2">
                            <img src="/Valuation/tools-icon.png" alt="" className="h-6 mt-0.5"/>
                            <p className="text-white text-xl font-medium">Condition</p>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            <div className="flex flex-col gap-y-2">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Condition</p>
                                <select
                                    name="condition"
                                    value={form.condition}
                                    onChange={Change}
                                    className="bg-white w-full h-7 px-2 text-black">
                                    <option value="brand_new">Brand New</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="regular">Regular</option>
                                    <option value="needs_renovation">Needs Renovation</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-y-6">
                                <p className="text-white text-xs font-bold tracking-widest uppercase">Interiors / Extras</p>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasAC"
                                        checked={form.hasAC}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Air Conditioning
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasSmartHome"
                                        checked={form.hasSmartHome}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Smart Home
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input
                                        name="hasPool"
                                        checked={form.hasPool}
                                        onChange={Change}
                                        type="checkbox"
                                        className="w-4 h-4" />
                                    Private Pool
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-4">
                        <div className="flex flex-row gap-x-2">
                            <img src="/Valuation/shield-icon.png" alt="" className="h-8 mb-2 "/>
                            <p className="text-white text-xl font-medium mt-0.5">Security & Amenities</p>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    name="hasSecurityGate"
                                    checked={form.hasSecurityGate}
                                    onChange={Change}
                                    type="checkbox"
                                    className="w-4 h-4" />
                                Security Gate
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    name="hasCCTV"
                                    checked={form.hasCCTV}
                                    onChange={Change}
                                    type="checkbox"
                                    className="w-4 h-4" />
                                CCTV / Cameras
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    name="hasGym"
                                    checked={form.hasGym}
                                    onChange={Change}
                                    type="checkbox"
                                    className="w-4 h-4" />
                                GYM
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    name="hasElevator"
                                    checked={form.hasElevator}
                                    onChange={Change}
                                    type="checkbox"
                                    className="w-4 h-4" />
                                Elevator
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    name="hasGreenAreas"
                                    checked={form.hasGreenAreas}
                                    onChange={Change}
                                    type="checkbox"
                                    className="w-4 h-4" />
                                Green Areas
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input
                                    name="hasOtherAmenity"
                                    checked={form.hasOtherAmenity}
                                    onChange={Change}
                                    type="checkbox"
                                    className="w-4 h-4" />
                                Other
                            </label>

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Specify</p>
                                <textarea
                                    name="otherAmenityDescription"
                                    value={form.otherAmenityDescription}
                                    onChange={Change}
                                    className="bg-white w-full h-16 px-2 py-1 text-black text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-7">
                        <div className="flex flex-row gap-x-2">
                            <img src="/Valuation/info-icon.png" alt="" className="h-8 mb-2 "/>
                            <p className="text-white text-xl font-medium mt-1">Aditional Information</p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Public Description</p>
                            <textarea
                                name="publicDescription"
                                value={form.publicDescription}
                                onChange={Change}
                                className="bg-white w-full h-20 px-2 py-1 text-black text-sm placeholder:text-gray-400"
                                placeholder="Describe the key features of the property..." />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Maintenance (HOA)</p>
                            <input
                                name="maintenanceFee"
                                min={0}
                                value={form.maintenanceFee || ""}
                                onChange={Change}
                                className="bg-white w-full h-7 px-2 text-black text-sm"
                                placeholder="e.g., $ 200.00"
                                type="number" />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Pets</p>
                            <select
                                name="petsAllowed"
                                value={form.petsAllowed}
                                onChange={Change}
                                className="bg-white w-full h-7 px-2 text-black text-sm">
                                <option value="allowed">Allowed</option>
                                <option value="not_allowed">Not Allowed</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Included Services</p>
                            <input
                                name="includedServices"
                                value={form.includedServices}
                                onChange={Change}
                                className="bg-white w-full h-7 px-2 text-black text-sm"
                                placeholder="Water, Trash, etc."
                                type="text" />
                        </div>
                    </div>

                    <div className="flex flex-col bg-white border border-gray-200 w-130 h-full p-6 gap-y-4">
                        <p className="text-black text-xl font-bold">Check Property Value</p>
                        <div className="flex justify-between">
                            <p className="text-black text-sm">Status:</p>
                            <p className="text-black text-sm font-bold">Draft</p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center justify-center gap-2 bg-[#0B1E4A] w-full h-20 text-white text-sm font-bold cursor-pointer">
                            <img src="/Valuation/stadistics-icon.png" alt="" className="h-4"/> Get Instant House Estimate
                        </button>
                        <p className="text-black text-sm text-center font-semibold">
                            By saving, you agree to Valtrust Real Estate's institutional terms and conditions
                        </p>
                    </div>
                </div>
            </figure>
        </section>
    );
}