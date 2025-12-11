"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavigationProgress() {
    const [isNavigating, setIsNavigating] = useState(false);
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Reset when navigation completes
        setIsNavigating(false);
        setProgress(100);

        const timeout = setTimeout(() => {
            setProgress(0);
        }, 200);

        return () => clearTimeout(timeout);
    }, [pathname, searchParams]);

    // Start progress on click of any link
    useEffect(() => {
        const handleStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (link && link.href && !link.href.startsWith("#") && !link.target) {
                const url = new URL(link.href, window.location.origin);

                // Only show for internal navigation
                if (url.origin === window.location.origin && url.pathname !== pathname) {
                    setIsNavigating(true);
                    setProgress(30);

                    // Simulate progress
                    const interval = setInterval(() => {
                        setProgress(prev => {
                            if (prev >= 90) {
                                clearInterval(interval);
                                return 90;
                            }
                            return prev + 10;
                        });
                    }, 100);
                }
            }
        };

        document.addEventListener("click", handleStart);
        return () => document.removeEventListener("click", handleStart);
    }, [pathname]);

    if (!isNavigating && progress === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
            <div
                className={cn(
                    "h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 transition-all duration-200 ease-out",
                    progress === 100 && "opacity-0"
                )}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
