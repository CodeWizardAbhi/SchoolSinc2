import { auth } from "@/auth";
import { PortalLayoutWrapper } from "./layout-wrapper";

export default async function ParentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const userName = session?.user?.name || "Parent";

    return (
        <PortalLayoutWrapper role="parent" userName={userName}>
            {children}
        </PortalLayoutWrapper>
    );
}
