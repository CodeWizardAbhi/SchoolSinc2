"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock Data
const students = [
    { id: "S01", name: "Aarav Sharma" },
    { id: "S02", name: "Vihaan Singh" },
    { id: "S03", name: "Aditya Gupta" },
    { id: "S04", name: "Sai Patel" },
    { id: "S05", name: "Reyansh Kumar" },
    { id: "S06", name: "Arjun Reddy" },
    { id: "S07", name: "Ishaan Verma" },
    { id: "S08", name: "Vivaan Malhotra" },
    { id: "S09", name: "Dhruv Kapoor" },
    { id: "S10", name: "Kabir Joshi" },
];

export function MatrixAttendance() {
    const [attendance, setAttendance] = useState<Record<string, string>>({});
    const currentDay = new Date().getDate();

    const toggleStatus = (studentId: string) => {
        const key = `${studentId}-${currentDay}`;
        setAttendance((prev) => {
            const current = prev[key];
            if (!current) return { ...prev, [key]: "present" };
            if (current === "present") return { ...prev, [key]: "absent" };
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    return (
        <div className="bg-white dark:bg-slate-900 overflow-hidden">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                <div>
                    <h3 className="font-semibold text-base sm:text-lg">Class 10-A Attendance</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">October 2025 • Today is Day {currentDay}</p>
                </div>
                <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500"></span> Present
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500"></span> Absent
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden p-3 space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Tap to mark attendance for Day {currentDay}</p>
                {students.map((student) => {
                    const key = `${student.id}-${currentDay}`;
                    const status = attendance[key];
                    return (
                        <Card
                            key={student.id}
                            className={cn(
                                "p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]",
                                status === "present" && "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20",
                                status === "absent" && "border-rose-300 bg-rose-50 dark:bg-rose-900/20"
                            )}
                            onClick={() => toggleStatus(student.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium",
                                    status === "present" ? "bg-emerald-500 text-white" :
                                        status === "absent" ? "bg-rose-500 text-white" :
                                            "bg-slate-200 text-slate-600"
                                )}>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="font-medium text-sm">{student.name}</span>
                            </div>
                            <div className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                status === "present" ? "bg-emerald-500 text-white" :
                                    status === "absent" ? "bg-rose-500 text-white" :
                                        "bg-slate-200 text-slate-500"
                            )}>
                                {status === "present" ? "Present" : status === "absent" ? "Absent" : "Not Marked"}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="w-[160px] text-left py-3 px-4 sticky left-0 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] z-10">
                                Student Name
                            </th>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                <th
                                    key={d}
                                    className={cn(
                                        "text-center min-w-[32px] px-1 py-3 text-xs font-medium",
                                        d === currentDay ? "text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20" : "text-slate-500"
                                    )}
                                >
                                    {d}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b last:border-0">
                                <td className="sticky left-0 bg-white dark:bg-slate-900 py-3 px-4 font-medium text-sm text-slate-700 dark:text-slate-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] z-10">
                                    {student.name}
                                </td>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                                    const key = `${student.id}-${day}`;
                                    const status = attendance[key];
                                    const isToday = day === currentDay;

                                    return (
                                        <td
                                            key={day}
                                            className={cn(
                                                "text-center py-2 transition-colors",
                                                isToday ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" : "cursor-not-allowed opacity-40 bg-slate-50/50 dark:bg-slate-900/50"
                                            )}
                                            onClick={() => isToday && toggleStatus(student.id)}
                                        >
                                            <div className="flex justify-center items-center">
                                                {status === "present" && (
                                                    <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-sm" />
                                                )}
                                                {status === "absent" && (
                                                    <div className="h-4 w-4 rounded-full bg-rose-500 shadow-sm" />
                                                )}
                                                {!status && (
                                                    <div className={cn(
                                                        "h-1.5 w-1.5 rounded-full",
                                                        isToday ? "bg-slate-300 dark:bg-slate-600" : "bg-slate-200 dark:bg-slate-800"
                                                    )} />
                                                )}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
