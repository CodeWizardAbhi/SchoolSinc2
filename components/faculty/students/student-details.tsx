"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export function StudentDetails() {
    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs font-mono text-slate-500 mb-1">ID: AD9892434</p>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sita`} />
                                <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold">Sita Janaki</h3>
                                <p className="text-sm text-slate-500">35013</p>
                            </div>
                        </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-emerald-200">Active</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-slate-500">Class</p>
                        <p className="font-medium text-sm">10A</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Gender</p>
                        <p className="font-medium text-sm">Female</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Joined On</p>
                        <p className="font-medium text-sm">10 Jan 2015</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-6">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500">Father Name</p>
                        <p className="text-sm font-medium">Janak Janaki</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500">Contact</p>
                        <p className="text-sm font-medium">+12 345-678-9011</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500">Mother Name</p>
                        <p className="text-sm font-medium">Prithvi Janaki</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500">Contact</p>
                        <p className="text-sm font-medium">+12 345-678-9011</p>
                    </div>
                </div>

                <div className="flex gap-4 mb-8">
                    <div className="bg-emerald-50 rounded-lg p-3 flex-1 text-center">
                        <p className="text-xs text-emerald-600 font-semibold">Attendance</p>
                        <p className="text-xl font-bold text-emerald-700">98%</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 flex-1 text-center">
                        <p className="text-xs text-orange-600 font-semibold">Grade</p>
                        <p className="text-xl font-bold text-orange-700">A</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold mb-4">Student Performance Overview</h4>
                    <div className="space-y-4">
                        {[
                            { label: "Science", val: 88, color: "bg-slate-900" },
                            { label: "Mathematics", val: 78, color: "bg-slate-900" },
                            { label: "Nepali", val: 90, color: "bg-slate-900" },
                            { label: "Computer", val: 64, color: "bg-slate-900" },
                            { label: "Social Studies", val: 44, color: "bg-slate-900" },
                        ].map((subj, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-xs w-24">{subj.label}</span>
                                <Progress value={subj.val} className="h-2" />
                                <span className="text-xs w-8 text-right font-medium">{subj.val}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
