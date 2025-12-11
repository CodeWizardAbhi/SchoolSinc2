"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    breadcrumb: string;
    title: string;
    subtitle?: string;
    userName?: string;
    userId?: string;
    showProfileLink?: boolean;
}

export function PageHeader({
    breadcrumb,
    title,
    subtitle,
    userName,
    userId,
    showProfileLink = false,
}: PageHeaderProps) {
    return (
        <div className="space-y-1">
            {/* Breadcrumb */}
            <p className="text-sm text-slate-500">{breadcrumb}</p>

            {/* Title */}
            <h1 className="text-lg sm:text-2xl font-bold">
                <span className="text-orange-500">{title}</span>
                {userName && (
                    <span className="text-blue-600">
                        {" "}| {userName}
                        {userId && <span className="text-sm sm:text-2xl">({userId})</span>}
                    </span>
                )}
            </h1>

            {/* Subtitle or Profile Link */}
            {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}

            {showProfileLink && (
                <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm">
                    Public Profile <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
            )}
        </div>
    );
}
