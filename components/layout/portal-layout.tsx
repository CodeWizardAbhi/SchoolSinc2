"use client";

import { useState, useEffect, Suspense } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { NavigationProgress } from "./navigation-progress";
import { cn } from "@/lib/utils";

interface PortalLayoutProps {
    children: React.ReactNode;
    role: "admin" | "faculty" | "student" | "parent";
    userName: string;
}

export function PortalLayout({ children, role, userName }: PortalLayoutProps) {
    // Initialize sidebar state based on screen size
    // Desktop (lg breakpoint = 1024px): open by default
    // Mobile: closed by default
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Check if we're on desktop
        const checkIsDesktop = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
        };

        // Initial check and set sidebar state based on screen size
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
        if (desktop) {
            setIsSidebarOpen(true);
        }

        // Listen for resize events (only update isDesktop, not sidebar state)
        window.addEventListener("resize", checkIsDesktop);
        return () => window.removeEventListener("resize", checkIsDesktop);
    }, []);

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
                isDesktop={isDesktop}
                onClose={() => setIsSidebarOpen(false)}
                userName={userName}
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
