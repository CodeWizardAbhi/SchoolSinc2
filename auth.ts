
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// We need a prisma instance. Let's assume we create one or import it.
// To be safe, let's use a local instance or import verify later.
// const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                        role: z.enum(["ADMIN", "FACULTY", "STUDENT"]).optional(),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password, role } = parsedCredentials.data;
                    const user = await prisma.user.findUnique({ where: { email } });

                    if (!user) return null;

                    // Enforce Role Check if role is provided
                    if (role && user.role !== role) {
                        console.log(`Role mismatch: User role ${user.role} does not match required role ${role}`);
                        return null;
                    }

                    // Simple password match for now
                    if (password === user.password) return user;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
