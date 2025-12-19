import LoginForm from "@/components/auth/login-form";
import { notFound } from "next/navigation";

export default async function RoleLoginPage({
    params,
}: {
    params: Promise<{ role: string }>;
}) {
    const { role } = await params;
    const roleKey = role.toUpperCase();

    if (!["ADMIN", "FACULTY", "STUDENT", "PARENT"].includes(roleKey)) {
        notFound();
    }

    return (
        <LoginForm role={roleKey as "ADMIN" | "FACULTY" | "STUDENT" | "PARENT"} />
    );
}
