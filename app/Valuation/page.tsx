"use client";

import { useState } from "react";
import {ZONES} from "./actions";

export default function Valuation() {

    const [department, setDepartment] = useState<string>("");
    const [municipality, setMunicipality] = useState<string>("");
    const [zone, setZone] = useState<string>("");

    const municipalities = department ? Object.keys(ZONES[department] || {}) : [];
    const zones = department && municipality ? ZONES[department]?.[municipality] || []: [];

    return(
    <section className="flex flex-col items-center bg-white">
        <figure className="flex flex-col items-center w-150 gap-y-11">
            <div className="flex flex-col items-center text-center gap-y-5">
                <p className="text-5xl font-semibold text-[#0D4687] tracking-[0.035em]">Ready to discover your property value?</p>
                <p className="text-2xl text-[#0B1E4A]">Take the first step toward tour property valuation, complete a few details to get your estimate</p>
            </div>
            <div className="flex flex-col gap-y-15">
                <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">

                    {/*Locations Form*/}
                    <p className="text-white text-xl">Location</p>


                    <div className="flex flex-col gap-y-4">

                        {/*DEPARMENT/STATE DropDown*/}
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">DEPARMENT / STATE</p>
                            <select
                            className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black"
                            value = {department}
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
                            <p className="text-white">MUNICIPALITY / CITY</p>
                            <select className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black"
                            value = {municipality}
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
                            <p className="text-white">ZONE / NEIGHBORHOOD</p>
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
                            <p className="text-white">EXACT ADDRESS</p>
                            <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.2 text-black" placeholder="e.g Street, Avenue, House Number" type="text"/>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">POSTAL CODE</p>
                            <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 text-black" placeholder="e.g 10101" type="number"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-[#0B1E4A] w-130 h-full p-6 gap-y-3">

                    {/*Property Details Form*/}
                    <p className="text-white text-xl">Property Details</p>


                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">PROPERTY TYPE</p>
                            <select className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.5 text-black">
                                <option value=""></option>
                                <option value="la-libertad">House</option>
                                <option value="san-salvador">Apartment</option>
                                <option value="santa-ana">Land</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">CONSTRUCTION AREA (m²)</p>
                            <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3 placeholder:-translate-y-0.2 px-2 text-black" placeholder="0.00" type="number"/>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">LOT AREA (m²)</p>
                            <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 px-2 text-black" placeholder="0.00" type="number"/>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">LEVELS / FLOORS</p>
                            <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 px-2 text-black" placeholder="e.g 1" type="number"/>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white">YEAR BUILT</p>
                            <input className="bg-white w-full h-7 placeholder:text-sm placeholder:p-3   placeholder:-translate-y-0.2 px-2 text-black" placeholder="e.g 2022" type="number"/>
                        </div>
                    </div>
                </div>
            </div>
        </figure>
    </section>
    )
}