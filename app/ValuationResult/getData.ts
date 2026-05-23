import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export async function getValuationData(id: string) {
    // Convertimos el id string de la URL a número real
    const numericId = Number(id);

    // Si no es un número válido o está vacío, frena de inmediato sin romper el servidor
    if (isNaN(numericId) || numericId <= 0) {
        console.warn("Aviso: Se recibió un ID inválido en la URL:", id);
        return null;
    }

    try {
        const valuation = await prisma.valuation.findUnique({
            where: {
                id: numericId, // ✅ Busca usando tu clave numérica id
            },
        });
        return valuation;
    } catch (error) {
        console.error("Error al obtener la valoración desde la base de datos:", error);
        return null;
    }
}