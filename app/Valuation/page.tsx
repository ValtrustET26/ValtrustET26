"use client";

import Link from "next/link";
import { useState } from "react";
import { ZONES } from "./actions";

export default function Valuation() {

    const [department, setDepartment] = useState<string>("");
    const [municipality, setMunicipality] = useState<string>("");
    const [zone, setZone] = useState<string>("");

    const municipalities = department ? Object.keys(ZONES[department] || {}) : [];
    const zones = department && municipality ? ZONES[department]?.[municipality] || [] : [];

    return (
        <section className="flex flex-col items-center bg-white py-10">
            <figure className="flex flex-col items-center w-150 gap-y-11">
                <div className="flex flex-col items-center text-center gap-y-5">
                    <p className="text-5xl font-semibold text-[#0D4687] tracking-[0.005em]">Ready to discover your property value?</p>
                    <p className="text-2xl text-[#0B1E4A]">Take the first step toward tour property valuation, complete a few details to get your estimate</p>
                </div>
                <div className="flex flex-col gap-y-15">
                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">

                        {/*Locations Form*/}
                        <p className="text-white text-xl font-medium">Location</p>


                        <div className="flex flex-col gap-y-4">

                            {/*DEPARMENT/STATE DropDown*/}
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">DEPARMENT / STATE</p>
                                <select
                                    className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black"
                                    value={department}
                                    onChange={(event) => {
                                        setDepartment(event.target.value);
                                        setMunicipality("");
                                        setZone("");
                                    }}
                                >
                                    <option value=""></option>
                                    {Object.keys(ZONES).map((actualDepartment) => <option key={actualDepartment}>{actualDepartment}</option>)}
                                </select>
                            </div>

                            {/*MUNICIPALITY/CITY DropDown*/}
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">MUNICIPALITY / CITY</p>
                                <select className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black"
                                    value={municipality}
                                    onChange={(event) => {
                                        setMunicipality(event.target.value);
                                        setZone("");
                                    }}>
                                    <option value=""></option>
                                    {municipalities.map((actualMunicipality) => <option key={actualMunicipality}>{actualMunicipality}</option>)}
                                </select>
                            </div>

                            {/*ZONE/NEIGHBORHOOD DropDown*/}
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">ZONE / NEIGHBORHOOD</p>
                                <select className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black"
                                    value={zone}
                                    onChange={(event) => {
                                        setZone(event.target.value);
                                    }}>
                                    <option value=""></option>
                                    {zones.map((actualZone) => <option key={actualZone}>{actualZone}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">EXACT ADDRESS</p>
                                <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.2 text-black" placeholder="e.g Street, Avenue, House Number" type="text" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">POSTAL CODE</p>
                                <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 text-black" placeholder="e.g 10101" type="number" />
                            </div>
                        </div>
                    </div>

                    {/*Property Details Form*/}

                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">
                        <p className="text-white text-xl">Property Details</p>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">PROPERTY TYPE</p>
                                <select className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black">
                                    <option value=""></option>
                                    <option value="la-libertad">House</option>
                                    <option value="san-salvador">Apartment</option>
                                    <option value="santa-ana">Land</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">CONSTRUCTION AREA (m²)</p>
                                <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.2 px-2 text-black" placeholder="0.00" type="number" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">LOT AREA (m²)</p>
                                <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 px-2 text-black" placeholder="0.00" type="number" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">LEVELS / FLOORS</p>
                                <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 px-2 text-black" placeholder="e.g 1" type="number" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">YEAR BUILT</p>
                                <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 px-2 text-black" placeholder="e.g 2022" type="number" />
                            </div>
                        </div>
                    </div>


                    {/*Room & Spaces Form*/}
                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">
                        <p className="text-white text-xl">Rooms and Spaces</p>
                        <div className="flex flex-col gap-y-4">

                            {/* Bedrooms & Bathrooms Inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Bedrooms</p>
                                    <input className="bg-white w-full h-7 px-2 text-black" placeholder="0" type="number" />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Bathrooms</p>
                                    <input className="bg-white w-full h-7 px-2 text-black" placeholder="0" type="number" />
                                </div>
                            </div>

                            {/* Parking & Kitchen Inputs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Parking Spaces</p>
                                    <input className="bg-white w-full h-7 px-2 text-black" placeholder="0" type="number" />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Kitchen Type</p>
                                    <select className="bg-white w-full h-7 px-2 text-black">
                                        <option value=""></option>
                                        <option>Closed</option>
                                        <option>Open</option>
                                        <option>Semi-Open</option>
                                    </select>
                                </div>
                            </div>

                            {/* Checkboxes Inputs */}
                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2">
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Living / Dining Room
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Laundry Room
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Storage / Cellar
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Studio / Home Office
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Service Quarter
                                </label>
                            </div>

                        </div>
                    </div>

                    {/*Condition Form*/}
                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">
                        <p className="text-white text-xl">Condition</p>
                        <div className="flex flex-col gap-y-4">

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Condition</p>
                                <select className="bg-white w-full h-7 px-2 text-black">
                                    <option>Brand New</option>
                                    <option>Excellent</option>
                                    <option>Good</option>
                                    <option>Regular</option>
                                    <option>Needs Renovation</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-y-3">
                                <p className="text-white text-xs font-bold tracking-widest uppercase">Interiors / Extras</p>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Air Conditioning
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Smart Home
                                </label>
                                <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4" />
                                    Private Pool
                                </label>
                            </div>

                        </div>
                    </div>

                    {/*Security & Amenities Form*/}
                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">
                        <p className="text-white text-xl">Security & Amenities</p>
                        <div className="flex flex-col gap-y-4">

                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4" />
                                Security Gate
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4" />
                                CCTV / Cameras
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4" />
                                GYM
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4" />
                                Elevator
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4" />
                                Green Areas
                            </label>
                            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4" />
                                Other
                            </label>

                            <div className="flex flex-col gap-y-1">
                                <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Specify</p>
                                <textarea className="bg-white w-full h-16 px-2 py-1 text-black text-sm" />
                            </div>

                        </div>
                    </div>

                    {/*Additional Information Form*/}
                    <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-4">
                        <p className="text-white text-xl">Additional Information</p>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Public Description</p>
                            <textarea className="bg-white w-full h-20 px-2 py-1 text-black text-sm placeholder:text-gray-400" placeholder="Describe the key features of the property..." />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Maintenance (HOA)</p>
                            <input className="bg-white w-full h-7 px-2 text-black text-sm placeholder:text-gray-400" placeholder="e.g., $ 200.00" type="number" />
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Pets</p>
                            <select className="bg-white w-full h-7 px-2 text-black text-sm">
                                <option>Allowed</option>
                                <option>Not Allowed</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <p className="text-white text-xs font-medium tracking-[0.05em] uppercase">Included Services</p>
                            <input className="bg-white w-full h-7 px-2 text-black text-sm placeholder:text-gray-400" placeholder="Water, Trash, etc." type="text" />
                        </div>

                    </div>
                    {/*Submit Form*/}
                    <div className="flex flex-col bg-white border border-gray-200 w-130 h-full p-6 gap-y-4">
                        <p className="text-black text-xl font-bold">Check Property Value</p>

                        <div className="flex justify-between">
                            <p className="text-black text-sm">Status:</p>
                            <p className="text-black text-sm font-bold">Draft</p>
                        </div>

                        <Link href="/ValuationResult">
                            <button className="flex items-center justify-center gap-2 bg-[#0B1E4A] w-full h-10 text-white text-sm font-bold cursor-pointer">
                            📊 Get Instant House Estimate
                            </button>
                        </Link>

                        <p className="text-black text-sm text-center font-semibold">
                            By saving, you agree to Valtrust Real Estate's institutional terms and conditions
                        </p>
                    </div>

                </div>
            </figure>
        </section>
    )
}