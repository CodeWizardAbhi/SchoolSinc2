import { auth } from "@/auth";
import { PortalLayoutWrapper } from "./layout-wrapper";

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const userName = session?.user?.name || "Student";

    return (
        <PortalLayoutWrapper role="student" userName={userName}>
            {children}
        </PortalLayoutWrapper>
    );
}
