
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient;
    prismaConnected: boolean;
};

// Create PrismaClient with connection pooling configuration
const createPrismaClient = () => {
    const client = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    return client;
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

// Ensure the database connection is established immediately
// This prevents the first request from failing while the connection is being established
if (!globalForPrisma.prismaConnected) {
    prisma.$connect()
        .then(() => {
            console.log("✅ Database connection established");
            globalForPrisma.prismaConnected = true;
        })
        .catch((error) => {
            console.error("❌ Failed to connect to database:", error);
        });
}

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
