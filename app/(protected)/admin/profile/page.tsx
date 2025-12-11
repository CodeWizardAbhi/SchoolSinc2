import { auth } from "@/auth";
import ProfileClient from "./client";

export default async function AdminProfilePage() {
    const session = await auth();
    const userName = session?.user?.name || "Admin";
    const userEmail = session?.user?.email || "admin@example.com";

    return (
        <ProfileClient
            userName={userName}
            userEmail={userEmail}
            userRole="admin"
        />
    );
}
