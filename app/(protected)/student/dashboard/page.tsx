import { auth } from "@/auth";
import StudentDashboardClient from "./client";

export default async function StudentDashboard() {
    const session = await auth();
    const userName = session?.user?.name || "Student";

    return <StudentDashboardClient userName={userName} />;
}
