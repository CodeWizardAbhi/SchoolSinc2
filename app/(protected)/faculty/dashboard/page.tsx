import { auth } from "@/auth";
import FacultyDashboardClient from "./client";

export default async function FacultyDashboard() {
    const session = await auth();
    const userName = session?.user?.name || "Teacher";

    return <FacultyDashboardClient userName={userName} />;
}
