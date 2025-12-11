import LoginForm from "@/components/auth/login-form";
import { notFound } from "next/navigation";

export default async function RoleLoginPage({
    params,
}: {
    params: Promise<{ role: string }>;
}) {
    const { role } = await params;
    const roleKey = role.toUpperCase();

    if (!["ADMIN", "FACULTY", "STUDENT"].includes(roleKey)) {
        notFound();
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm role={roleKey as "ADMIN" | "FACULTY" | "STUDENT"} />
            </div>
        </div>
    );
}
