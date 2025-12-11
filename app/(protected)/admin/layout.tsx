import { auth } from "@/auth";
import { PortalLayoutWrapper } from "./layout-wrapper";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const userName = session?.user?.name || "Admin";

    return (
        <PortalLayoutWrapper role="admin" userName={userName}>
            {children}
        </PortalLayoutWrapper>
    );
}
