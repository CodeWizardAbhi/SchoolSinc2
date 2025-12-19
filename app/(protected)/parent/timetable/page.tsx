"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";

// Timetable data for each day
const timetableByDay: Record<string, Array<{ time: string; subject: string; room: string; topic: string; isBreak?: boolean }>> = {
    monday: [
        { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "202", topic: "Quadratic Equations" },
        { time: "10:00 AM - 11:00 AM", subject: "Science", room: "Lab 1", topic: "Organic Chemistry" },
        { time: "11:00 AM - 12:00 PM", subject: "English", room: "202", topic: "Essay Writing" },
        { time: "12:00 PM - 01:00 PM", subject: "Lunch Break", room: "---", topic: "---", isBreak: true },
        { time: "01:00 PM - 02:00 PM", subject: "Social Studies", room: "202", topic: "World History" },
        { time: "02:00 PM - 03:00 PM", subject: "Computer Science", room: "Lab 2", topic: "Python Basics" },
    ],
    tuesday: [
        { time: "09:00 AM - 10:00 AM", subject: "English", room: "202", topic: "Grammar & Vocabulary" },
        { time: "10:00 AM - 11:00 AM", subject: "Mathematics", room: "202", topic: "Linear Equations" },
        { time: "11:00 AM - 12:00 PM", subject: "Science", room: "Lab 1", topic: "Physics - Motion" },
        { time: "12:00 PM - 01:00 PM", subject: "Lunch Break", room: "---", topic: "---", isBreak: true },
        { time: "01:00 PM - 02:00 PM", subject: "Nepali", room: "202", topic: "Kabita Bachan" },
        { time: "02:00 PM - 03:00 PM", subject: "Art", room: "Art Room", topic: "Watercolor Painting" },
    ],
    wednesday: [
        { time: "09:00 AM - 10:00 AM", subject: "Science", room: "Lab 1", topic: "Biology - Cells" },
        { time: "10:00 AM - 11:00 AM", subject: "Mathematics", room: "202", topic: "Geometry" },
        { time: "11:00 AM - 12:00 PM", subject: "Physical Education", room: "Ground", topic: "Basketball" },
        { time: "12:00 PM - 01:00 PM", subject: "Lunch Break", room: "---", topic: "---", isBreak: true },
        { time: "01:00 PM - 02:00 PM", subject: "English", room: "202", topic: "Literature" },
        { time: "02:00 PM - 03:00 PM", subject: "Social Studies", room: "202", topic: "Geography" },
    ],
    thursday: [
        { time: "09:00 AM - 10:00 AM", subject: "Nepali", room: "202", topic: "Balak ko Katha" },
        { time: "10:00 AM - 11:00 AM", subject: "Science", room: "Lab 1", topic: "Chemistry Lab" },
        { time: "11:00 AM - 12:00 PM", subject: "Mathematics", room: "202", topic: "Trigonometry" },
        { time: "12:00 PM - 01:00 PM", subject: "Lunch Break", room: "---", topic: "---", isBreak: true },
        { time: "01:00 PM - 02:00 PM", subject: "Computer Science", room: "Lab 2", topic: "Web Development" },
        { time: "02:00 PM - 03:00 PM", subject: "Music", room: "Music Room", topic: "Classical Music" },
    ],
    friday: [
        { time: "09:00 AM - 10:00 AM", subject: "Mathematics", room: "202", topic: "Statistics" },
        { time: "10:00 AM - 11:00 AM", subject: "English", room: "202", topic: "Creative Writing" },
        { time: "11:00 AM - 12:00 PM", subject: "Science", room: "202", topic: "Environmental Science" },
        { time: "12:00 PM - 01:00 PM", subject: "Lunch Break", room: "---", topic: "---", isBreak: true },
        { time: "01:00 PM - 02:00 PM", subject: "Social Studies", room: "202", topic: "Civics" },
        { time: "02:00 PM - 03:00 PM", subject: "Library", room: "Library", topic: "Self Study" },
    ],
};

const dayLabels: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
};

export default function ParentTimetable() {
    const [selectedDay, setSelectedDay] = useState("monday");
    const timetableData = timetableByDay[selectedDay];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <PageHeader
                    breadcrumb="Home / Timetable"
                    title="Class Timetable"
                    subtitle={`Showing your child's schedule for ${dayLabels[selectedDay]}`}
                />
                <div className="w-full sm:w-36">
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
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
