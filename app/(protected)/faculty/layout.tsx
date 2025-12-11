import { auth } from "@/auth";
import { PortalLayoutWrapper } from "./layout-wrapper";

export default async function FacultyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const userName = session?.user?.name || "Teacher";

    return (
        <PortalLayoutWrapper role="faculty" userName={userName}>
            {children}
        </PortalLayoutWrapper>
    );
}
