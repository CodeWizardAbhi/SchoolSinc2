import { auth } from "@/auth";
import ReportsClient from "./client";

export default async function ReportsPage() {
    const session = await auth();
    const userName = session?.user?.name || "Student";

    return <ReportsClient userName={userName} />;
}
