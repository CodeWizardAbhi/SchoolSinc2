"use client";

import { Card } from "@/components/ui/card";
import { Clock, MapPin, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";

const timetableData = [
    { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "202", topic: "Quadratic Equations" },
    { time: "10:00 AM - 11:00 AM", subject: "Science", room: "202", topic: "Organic Chemistry" },
    { time: "11:00 AM - 12:00 PM", subject: "Social", room: "202", topic: "Genz protest, 2025" },
    { time: "12:00 PM - 02:00 PM", subject: "Break Time", room: "---", topic: "---", isBreak: true },
    { time: "02:00 PM - 03:00 PM", subject: "Nepali", room: "---", topic: "Balak ko Katha" },
    { time: "03:00 PM - 04:00 PM", subject: "Optional Mathematics", room: "---", topic: "Trigonometric" },
];

export default function StudentTimetable() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <PageHeader
                    breadcrumb="Home / Timetable"
                    title="Class Timetable"
                    subtitle="View your daily class schedule"
                />
                <div className="w-full sm:w-32">
                    <Select defaultValue="monday">
                        <SelectTrigger className="bg-[#0f172a] text-white border-0 h-9">
                            <SelectValue placeholder="Select Day" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Desktop Table View */}
            <Card className="p-4 sm:p-6 hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                        <thead>
                            <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                                <th className="pb-4 font-medium pl-4">Time</th>
                                <th className="pb-4 font-medium">Subject</th>
                                <th className="pb-4 font-medium">Room</th>
                                <th className="pb-4 font-medium">Topic/Lesson Plan</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600">
                            {timetableData.map((row, i) => (
                                <tr
                                    key={i}
                                    className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${row.isBreak ? 'bg-slate-50/50 italic text-slate-400' : ''}`}
                                >
                                    <td className="py-5 font-medium pl-4 flex items-center gap-2">
                                        {!row.isBreak && <Clock className="h-4 w-4 text-slate-300" />}
                                        {row.time}
                                    </td>
                                    <td className="py-5 font-medium text-slate-900">{row.subject}</td>
                                    <td className="py-5 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            {row.room !== "---" && <MapPin className="h-3 w-3 text-slate-300" />}
                                            {row.room}
                                        </div>
                                    </td>
                                    <td className="py-5 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            {row.topic !== "---" && <BookOpen className="h-4 w-4 text-slate-300" />}
                                            {row.topic}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Mobile Card View */}
            <div className="space-y-3 md:hidden">
                {timetableData.map((row, i) => (
                    <Card
                        key={i}
                        className={`p-4 ${row.isBreak ? 'bg-slate-50 border-dashed' : ''}`}
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{row.time}</span>
                                </div>
                                <h3 className={`font-semibold ${row.isBreak ? 'text-slate-400 italic' : 'text-slate-900'}`}>
                                    {row.subject}
                                </h3>
                                {!row.isBreak && (
                                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            Room {row.room}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="h-3 w-3" />
                                            {row.topic}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
