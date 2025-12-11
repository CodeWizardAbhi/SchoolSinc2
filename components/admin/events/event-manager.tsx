"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock, Wallet } from "lucide-react";

export function EventManager() {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
                <div>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription className="mt-1">Manage school events, registrations and activities</CardDescription>
                </div>
                <Button className="bg-[#0f172a]">
                    <Plus className="h-4 w-4 mr-2" /> Create Event
                </Button>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-md">
                            <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Events</p>
                            <h3 className="text-2xl font-bold mt-1">24</h3>
                            <p className="text-xs text-emerald-600 flex items-center mt-1">↑ 12.2% from last month</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-start gap-4">
                        <div className="bg-orange-100 p-2 rounded-md">
                            <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Upcoming Events</p>
                            <h3 className="text-2xl font-bold mt-1">8</h3>
                            <p className="text-xs text-muted-foreground mt-1">Next: Sports Day</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-start gap-4">
                        <div className="bg-purple-100 p-2 rounded-md">
                            <Wallet className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Budget Utilization</p>
                            <h3 className="text-2xl font-bold mt-1">NRP 35K</h3>
                            <p className="text-xs text-muted-foreground mt-1">35% of total budget</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
