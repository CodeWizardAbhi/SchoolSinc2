"use client";

import { PortalLayout } from "@/components/layout/portal-layout";

interface LayoutWrapperProps {
    children: React.ReactNode;
    role: "admin" | "faculty" | "student";
    userName: string;
}

export function PortalLayoutWrapper({ children, role, userName }: LayoutWrapperProps) {
    return (
        <PortalLayout role={role} userName={userName}>
            {children}
        </PortalLayout>
    );
}
