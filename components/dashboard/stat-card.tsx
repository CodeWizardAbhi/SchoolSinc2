import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    description?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendDirection = "neutral",
    description,
}: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(trend || description) && (
                    <p className="text-xs text-muted-foreground">
                        {trend && (
                            <span
                                className={cn(
                                    "mr-1 font-medium",
                                    trendDirection === "up" && "text-green-500",
                                    trendDirection === "down" && "text-red-500"
                                )}
                            >
                                {trend}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
