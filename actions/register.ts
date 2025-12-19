
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
// import bcrypt from "bcrypt"; // Not installed, using plain text for now as per plan/task status

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(["STUDENT", "FACULTY", "ADMIN", "PARENT"]),
});

export async function registerUser(formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        role: formData.get("role"),
    });

    if (!validatedFields.success) {
        console.error("Register Error: Invalid fields", validatedFields.error);
        return { error: "Invalid fields" };
    }

    const { email, password, name, role } = validatedFields.data;
    console.log("Registering user:", email, role);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.warn("Register Error: User exists", email);
        return { error: "Email already in use" };
    }

    // Create user
    // Note: Storing password in plain text as requested/established in current flow for simplicity.
    // In production, use bcrypt/argon2.
    await prisma.user.create({
        data: {
            email,
            password, // hashedPassword
            name,
            role: role as Role,
        },
    });

    console.log("User created successfully:", email);

    return { success: "User created successfully" };
}
