
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function main() {
    console.log("Seeding database...");

    // 1. Admin
    const admin = await prisma.user.upsert({
        where: { email: "admin@schoolsync.com" },
        update: {},
        create: {
            email: "admin@schoolsync.com",
            password: "password123", // In a real app, hash this!
            name: "Admin User",
            role: "ADMIN",
        },
    });
    console.log({ admin });

    // 2. Faculty
    const faculty = await prisma.user.upsert({
        where: { email: "teacher@schoolsync.com" },
        update: {},
        create: {
            email: "teacher@schoolsync.com",
            password: "password123",
            name: "John Teacher",
            role: "FACULTY",
        },
    });
    console.log({ faculty });

    // 3. Student
    const student = await prisma.user.upsert({
        where: { email: "student@schoolsync.com" },
        update: {},
        create: {
            email: "student@schoolsync.com",
            password: "password123",
            name: "Alice Student",
            role: "STUDENT",
        },
    });
    console.log({ student });

    console.log("Seeding finished.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
