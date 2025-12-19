"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, Calendar } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend
} from 'recharts';
import { PageHeader } from "@/components/ui/page-header";

export default function AdminAnalyticsPage() {
    // Prevent hydration mismatch with Recharts
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const attendanceData = [
        { name: 'Mon', Student: 95, Staff: 98 },
        { name: 'Tue', Student: 93, Staff: 97 },
        { name: 'Wed', Student: 96, Staff: 98 },
        { name: 'Thu', Student: 92, Staff: 96 },
        { name: 'Fri', Student: 90, Staff: 95 },
        { name: 'Sat', Student: 85, Staff: 90 },
    ];

    const performanceData = [
        { subject: 'Math', Avg: 78 },
        { subject: 'Sci', Avg: 82 },
        { subject: 'Eng', Avg: 75 },
        { subject: 'Hist', Avg: 85 },
        { subject: 'Geo', Avg: 80 },
    ];

    // Show loading skeleton until mounted
    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-72" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-72" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-24" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-24" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-24" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <PageHeader
                    breadcrumb="Home / Analytics"
                    title="Performance & Analytics"
                    subtitle="Insights into school performance and trends"
                />
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                        <Calendar className="mr-2 h-4 w-4" /> This Month
                    </Button>
                    <Button size="sm" className="h-9">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Attendance Trend */}
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg">Attendance Trends</CardTitle>
                        <CardDescription className="text-sm">Weekly student vs staff attendance</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] sm:h-[300px] p-4 sm:p-6 pt-0 sm:pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Student" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="Staff" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Subject Performance */}
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg">Subject Performance</CardTitle>
                        <CardDescription className="text-sm">Average scores across key subjects</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] sm:h-[300px] p-4 sm:p-6 pt-0 sm:pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="subject" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="Avg" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                    <CardHeader className="pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        <div className="text-xl sm:text-2xl font-bold">1,250</div>
                        <p className="text-xs text-emerald-500 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" /> +5% from last year
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Pass Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        <div className="text-xl sm:text-2xl font-bold">96.8%</div>
                        <p className="text-xs text-emerald-500 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" /> +1.2% from last term
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Fee Collection</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        <div className="text-xl sm:text-2xl font-bold">88%</div>
                        <p className="text-xs text-red-500 flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" /> -2% pending dues
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
