"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, FileText, FileCheck, DollarSign, Megaphone, AlertTriangle } from "lucide-react";

const actions = [
    { label: "Exam Schedule", desc: "Publish the Exam Schedule", icon: GraduationCap, color: "bg-blue-100 text-blue-600", action: "Manage Paper" },
    { label: "Result Notice", desc: "Publish the Exam Results and Event Results", icon: FileCheck, color: "bg-emerald-100 text-emerald-600", action: "Manage Paper" },
    { label: "General Notice", desc: "Publish general updates", icon: FileText, color: "bg-purple-100 text-purple-600", action: "Manage Paper" },
    { label: "Fee Reminder", desc: "Notify about upcoming or pending fees", icon: DollarSign, color: "bg-emerald-100 text-emerald-600", action: "Manage Paper" },
    { label: "Event Announcement", desc: "Share details about cultural program", icon: Megaphone, color: "bg-blue-100 text-blue-600", action: "Manage Paper" },
    { label: "Emergency Alert", desc: "Urgent communication", icon: AlertTriangle, color: "bg-rose-100 text-rose-600", action: "Manage Paper" },
];

export function QuickActions() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action, i) => (
                <Card key={i} className="text-center">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${action.color}`}>
                            <action.icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold">{action.label}</h4>
                        <p className="text-xs text-muted-foreground mt-1 mb-6 px-4">{action.desc}</p>
                        <Button className="bg-[#0f172a] h-8 text-xs">{action.action}</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
