import { auth } from "@/auth";
import ProfileClient from "./client";

export default async function FacultyProfilePage() {
    const session = await auth();
    const userName = session?.user?.name || "Teacher";
    const userEmail = session?.user?.email || "teacher@example.com";

    return (
        <ProfileClient
            userName={userName}
            userEmail={userEmail}
            userRole="faculty"
        />
    );
}
