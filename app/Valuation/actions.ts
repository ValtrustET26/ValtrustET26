"use server";

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import { Record } from "@prisma/client/runtime/client";

{/* Prices Per Meter Squared */}

const ZONE_PRICE: Record<string, number> = {
    "Colonia Escalón": 2000,
    "San Benito": 1800,
    "Colonia Médica": 1200,
    "Colonia Miramonte": 1100,
    "Residencial Soyapango": 650,
    "Colonia Palomo": 600,
    "Col. Zacamil": 580,
    "Colonia Amatepec": 560,
    "Residencial Apopa": 520,
    "Colonia Universitaria": 540,
    "Colonia Las Mercedes": 580,
    "Residencial San Marcos": 600,
    "Jardines de Guadalupe": 1700,
    "Maquilishuat": 1600,
    "La Sultana": 1550,
    "Residencial Santa Tecla": 1000,
    "Ciudad Merliot": 1050,
    "Las Cumbres": 1100,
    "Residencial Zaragoza": 780,
    "Colonia El Refugio": 750,
    "Puerto La Libertad": 900,
    "Residencial Costa del Sol": 950,
    "Residencial Colón": 700,
    "Colonia Santa Teresa": 680,
    "Colonia Flor Blanca": 780,
    "Centro": 480,
    "Residencial Santa Ana": 700,
    "Residencial Chalchuapa": 550,
    "Colonia El Carmen": 520,
    "Centro Metapán": 390,
    "Residencial Metapán": 420,
    "Centro Zacatecoluca": 450,
    "Residencial La Paz": 480,
    "Aeropuerto": 850,
    "Residencial Talpa": 800,
    "Residencial Olocuilta": 500,
    "Colonia Santa Rosa": 480,
    "Centro Sonsonate": 520,
    "Colonia Bethania": 500,
    "Puerto Acajutla": 600,
    "Residencial Acajutla": 580,
};

const MUNICIPALITY_PRICE: Record<string, number> = {
    "San Salvador": 1200,
    "Soyapango": 650,
    "Mejicanos": 580,
    "Apopa": 520,
    "San Marcos": 580,
    "Antiguo Cuscatlán": 1700,
    "Santa Tecla": 1000,
    "Zaragoza": 780,
    "La Libertad": 900,
    "Colón": 700,
    "Santa Ana": 650,
    "Chalchuapa": 550,
    "Metapán": 390,
    "Zacatecoluca": 450,
    "San Luis Talpa": 800,
    "Olocuilta": 500,
    "Sonsonate": 520,
    "Acajutla": 600,
};

const CONDITION_MULTIPLIER: Record<string, number> = {
  brand_new: 1.20,
  excellent: 1.10,
  good: 1.00,
  regular: 0.85,
  needs_renovation: 0.70,
};

const TYPE_MULTIPLIER: Record<string, number> = {
  House: 1.00,
  apartment: 0.90,
  land: 0.50,
}

const KITCHEN_MULTIPLIER: Record<string, number> = {
  closed: 1.00,
  open: 1.03,
  semi_open: 1.02,
}

export type ValuationInput = {
  department: string;
  municipality: string;
  zone: string;
    exactAddress?: string;
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
    otherAmenityDescription?: string;
    publicDescription?: string;
    maintenanceFee: number;
    petsAllowed: string;
    includedServices?: string;
};

export type ValuationResult = {
    id: number;
    estimatedValue: number;
    estimatedMin: number;
    estimatedMax: number;
    pricePerM2: number;
};

export async function calculateValuation(input: ValuationInput): Promise<ValuationResult> {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    const prisma = new PrismaClient({ adapter });

    const basePricePerM2 = ZONE_PRICE[input.zone] || MUNICIPALITY_PRICE[input.municipality] || 600;
    const effectiveArea = input.areaM2 + (input.landAreaM2 ? input.landAreaM2 * 0.3 : 0);

    let price = effectiveArea * basePricePerM2;

    price *= CONDITION_MULTIPLIER[input.condition] ?? 1.0;
    price *= TYPE_MULTIPLIER[input.type] ?? 1.0;
    price *= KITCHEN_MULTIPLIER[input.kitchenType] ?? 1.0;

    if (input.bedrooms > 3) price += (input.bedrooms - 3) * 8000;
    if (input.bathrooms > 2) price += (input.bathrooms - 2) * 5000;
    if (input.parkingSpaces > 1) price += (input.parkingSpaces - 1) * 4000;

    if (input.hasLivingDiningRoom) price *= 1.02;
    if (input.hasLaundryRoom) price *= 1.01;
    if (input.hasStorageCellar) price *= 1.01;
    if (input.hasStudioHomeOffice) price *= 1.02;
    if (input.hasServiceQuarter) price *= 1.02;
    if (input.hasAC) price *= 1.04;
    if (input.hasSmartHome) price *= 1.03;
    if (input.hasPool) price *= 1.08;
    if (input.hasSecurityGate) price *= 1.03;
    if (input.hasCCTV) price *= 1.02;
    if (input.hasGym) price *= 1.02;
    if (input.hasElevator) price *= 1.03;
    if (input.hasGreenAreas) price *= 1.02;
    if (input.hasOtherAmenity) price *= 1.01;
    if (input.maintenanceFee && input.maintenanceFee > 200) price *= 1.02;
    if (input.maintenanceFee && input.maintenanceFee > 500) price *= 1.03;
    if (input.petsAllowed === "allowed") price *= 1.01;

    const estimatedValue = Math.round(price);
    const estimatedMin = Math.round(price * 0.88);
    const estimatedMax = Math.round(price * 1.12);
    const pricePerM2 = Math.round(price / input.areaM2);

    const valuation = await prisma.valuation.create({
        data: {
            department: input.department,
            municipality: input.municipality,
            zone: input.zone,
            exactAddress: input.exactAddress,
            postalCode: input.postalCode,
            type: input.type,
            condition: input.condition,
            areaM2: input.areaM2,
            landAreaM2: input.landAreaM2,
            levels: input.levels,
            yearBuilt: input.yearBuilt,
            bedrooms: input.bedrooms,
            bathrooms: input.bathrooms,
            parkingSpaces: input.parkingSpaces,
            kitchenType: input.kitchenType,
            hasLivingDiningRoom: input.hasLivingDiningRoom,
            hasLaundryRoom: input.hasLaundryRoom,
            hasStorageCellar: input.hasStorageCellar,
            hasStudioHomeOffice: input.hasStudioHomeOffice,
            hasServiceQuarter: input.hasServiceQuarter,
            hasAC: input.hasAC,
            hasSmartHome: input.hasSmartHome,
            hasPool: input.hasPool,
            hasSecurityGate: input.hasSecurityGate,
            hasCCTV: input.hasCCTV,
            hasGym: input.hasGym,
            hasElevator: input.hasElevator,
            hasGreenAreas: input.hasGreenAreas,
            hasOtherAmenity: input.hasOtherAmenity,
            otherAmenityDescription: input.otherAmenityDescription,
            publicDescription: input.publicDescription,
            maintenanceFee: input.maintenanceFee,
            petsAllowed: input.petsAllowed,
            includedServices: input.includedServices,
            estimatedValue,
            estimatedMin,
            estimatedMax,
            pricePerM2,
        },
    });

    await prisma.$disconnect();

    return { id: valuation.id, estimatedValue, estimatedMin, estimatedMax, pricePerM2 };
}