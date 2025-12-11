"use client";

import { useState, Suspense } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { NavigationProgress } from "./navigation-progress";
import { cn } from "@/lib/utils";

interface PortalLayoutProps {
    children: React.ReactNode;
    role: "admin" | "faculty" | "student";
    userName: string;
}

export function PortalLayout({ children, role, userName }: PortalLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Navigation Progress Bar */}
            <Suspense fallback={null}>
                <NavigationProgress />
            </Suspense>

            {/* Sidebar */}
            <Sidebar
                role={role}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "lg:ml-64" : "ml-0"
                )}
            >
                {/* Navbar */}
                <Navbar
                    userName={userName}
                    role={role}
                    isSidebarOpen={isSidebarOpen}
                    onMenuClick={toggleSidebar}
                />

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
