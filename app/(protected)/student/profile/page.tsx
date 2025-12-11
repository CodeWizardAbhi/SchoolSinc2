import { auth } from "@/auth";
import ProfileClient from "./client";

export default async function ProfilePage() {
    const session = await auth();
    const userName = session?.user?.name || "Student";
    const userEmail = session?.user?.email || "student@example.com";

    return (
        <ProfileClient
            userName={userName}
            userEmail={userEmail}
            userRole="student"
        />
    );
}
