"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const ZONE_PRICE: Record<string, number> = {
  "Colonia Escalón": 2000,
  "San Benito": 1800,
  "Colonia Médica": 1200,
  "Residencial Soyapango": 650,
  "Col. Zacamil": 580,
  "Jardines de Guadalupe": 1700,
  "Maquilishuat": 1600,
  "Residencial Santa Tecla": 1000,
  "Ciudad Merliot": 1050,
  "Residencial Zaragoza": 780,
  "Colonia Flor Blanca": 780,
  "Centro": 480,
  "Residencial Chalchuapa": 550,
  "Centro Metapán": 390,
};

const MUNICIPALITY_PRICE: Record<string, number> = {
  "San Salvador": 1200,
  "Soyapango": 650,
  "Mejicanos": 580,
  "Antiguo Cuscatlán": 1700,
  "Santa Tecla": 1000,
  "Zaragoza": 780,
  "Santa Ana": 650,
  "Chalchuapa": 550,
  "Metapán": 390,
};

const CONDITION_MULTIPLIER: Record<string, number> = {
  new: 1.15,
  good: 1.0,
  fair: 0.85,
  needs_work: 0.70,
};

const TYPE_MULTIPLIER: Record<string, number> = {
  house: 1.0,
  apartment: 0.90,
  land: 0.50,
};

export type ValuationInput = {
  department: string;
  municipality: string;
  zone: string;
  type: string;
  condition: string;
  areaM2: number;
  landAreaM2: number | null;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  hasPool: boolean;
  hasSecurity: boolean;
  hasGarden: boolean;
  hasAC: boolean;
};

export type ValuationResult = {
  estimatedValue: number;
  estimatedMin: number;
  estimatedMax: number;
  pricePerM2: number;
};

export async function calculateValuation(
  input: ValuationInput
): Promise<ValuationResult> {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  const basePricePerM2 =
    ZONE_PRICE[input.zone] ||
    MUNICIPALITY_PRICE[input.municipality] ||
    600;

  const effectiveArea =
    input.areaM2 + (input.landAreaM2 ? input.landAreaM2 * 0.3 : 0);

  let price = effectiveArea * basePricePerM2;

  price *= CONDITION_MULTIPLIER[input.condition] ?? 1.0;
  price *= TYPE_MULTIPLIER[input.type] ?? 1.0;

  if (input.hasPool) price *= 1.08;
  if (input.hasSecurity) price *= 1.05;
  if (input.hasGarden) price *= 1.03;
  if (input.hasAC) price *= 1.04;

  if (input.bedrooms > 3) price += (input.bedrooms - 3) * 8000;
  if (input.bathrooms > 2) price += (input.bathrooms - 2) * 5000;
  if (input.parking > 1) price += (input.parking - 1) * 4000;

  const estimatedValue = Math.round(price);
  const estimatedMin = Math.round(price * 0.88);
  const estimatedMax = Math.round(price * 1.12);
  const pricePerM2 = Math.round(price / input.areaM2);

  await prisma.valuation.create({
    data: {
      department: input.department,
      municipality: input.municipality,
      zone: input.zone,
      type: input.type,
      condition: input.condition,
      areaM2: input.areaM2,
      landAreaM2: input.landAreaM2,
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      parking: input.parking,
      hasPool: input.hasPool,
      hasSecurity: input.hasSecurity,
      hasGarden: input.hasGarden,
      hasAC: input.hasAC,
      estimatedValue,
      estimatedMin,
      estimatedMax,
      pricePerM2,
    },
  });

  await prisma.$disconnect();

  return { estimatedValue, estimatedMin, estimatedMax, pricePerM2 };
}