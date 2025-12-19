import { auth } from "@/auth";
import ParentDashboardClient from "./client";

export default async function ParentDashboard() {
    const session = await auth();
    const userName = session?.user?.name || "Parent";

    return <ParentDashboardClient userName={userName} />;
}
