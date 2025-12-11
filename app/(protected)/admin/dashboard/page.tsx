import { auth } from "@/auth";
import AdminDashboardClient from "./client";

export default async function AdminDashboard() {
    const session = await auth();
    const userName = session?.user?.name || "Admin";

    return <AdminDashboardClient userName={userName} />;
}
