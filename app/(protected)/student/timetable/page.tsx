"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, BookOpen, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";

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

// Helper to check if a slot is currently active
const isLiveSlot = (day: string, timeRange: string) => {
    // For demo purposes, we're not strictly checking the date object against "Today" 
    // because that would only work if the user visits on the specific day.
    // Instead, we will check if the TIME matches the current time, and if the selected day matches current day.

    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    if (day !== currentDay) return false;

    // Parse time range "09:00 AM - 10:00 AM"
    const [startStr, endStr] = timeRange.split(" - ");

    const parseTime = (t: string) => {
        const [time, period] = t.split(" ");
        const [h, m] = time.split(":").map(Number);
        let hours = h;
        const minutes = m;
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
    };

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = parseTime(startStr);
    const endMinutes = parseTime(endStr);

    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
};

export default function StudentTimetable() {
    const [selectedDay, setSelectedDay] = useState("monday");
    const [, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Set initial day to today if it's a weekday
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        if (timetableByDay[today]) {
            setSelectedDay(today);
        }

        // Update time every minute to keep "Live" status fresh
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const timetableData = timetableByDay[selectedDay];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <PageHeader
                    breadcrumb="Home / Timetable"
                    title="Class Timetable"
                    subtitle={`Showing schedule for ${dayLabels[selectedDay]}`}
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
                            {timetableData.map((row, i) => {
                                const isLive = isLiveSlot(selectedDay, row.time);

                                return (
                                    <tr
                                        key={i}
                                        className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors 
                                            ${row.isBreak ? 'bg-slate-50/50 italic text-slate-400' : ''}
                                            ${isLive ? 'bg-blue-50/50 relative' : ''}
                                        `}
                                    >
                                        <td className="py-5 font-medium pl-4">
                                            <div className="flex items-center gap-2">
                                                {!row.isBreak && <Clock className={`h-4 w-4 ${isLive ? 'text-blue-500' : 'text-slate-300'}`} />}
                                                <span className={isLive ? 'text-blue-700 font-bold' : ''}>{row.time}</span>
                                                {isLive && (
                                                    <Badge className="ml-2 bg-blue-600 animate-pulse hover:bg-blue-600 border-0">
                                                        LIVE
                                                    </Badge>
                                                )}
                                            </div>
                                            {isLive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md" />}
                                        </td>
                                        <td className={`py-5 font-medium ${isLive ? 'text-blue-900 heading-font font-bold' : 'text-slate-900'}`}>
                                            {row.subject}
                                        </td>
                                        <td className="py-5 text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                {row.room !== "---" && <MapPin className={`h-3 w-3 ${isLive ? 'text-blue-400' : 'text-slate-300'}`} />}
                                                {row.room}
                                            </div>
                                        </td>
                                        <td className="py-5 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                {row.topic !== "---" ? (
                                                    <Link
                                                        href="/student/resources"
                                                        className={`flex items-center gap-2 group transition-colors ${isLive ? 'text-blue-600' : 'hover:text-blue-600'}`}
                                                    >
                                                        <BookOpen className={`h-4 w-4 ${isLive ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-500'}`} />
                                                        <span className="underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
                                                            {row.topic}
                                                        </span>
                                                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                ) : (
                                                    <span>{row.topic}</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Mobile Card View */}
            <div className="space-y-3 md:hidden">
                {timetableData.map((row, i) => {
                    const isLive = isLiveSlot(selectedDay, row.time);

                    return (
                        <Card
                            key={i}
                            className={`p-4 relative overflow-hidden transition-all ${row.isBreak ? 'bg-slate-50 border-dashed' :
                                isLive ? 'border-blue-500 shadow-md bg-blue-50/30' : ''
                                }`}
                        >
                            {isLive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />}

                            <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className={`flex items-center gap-2 text-xs ${isLive ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                                            <Clock className="h-3 w-3" />
                                            <span>{row.time}</span>
                                        </div>
                                        {isLive && (
                                            <Badge className="h-5 text-[10px] bg-blue-600 animate-pulse border-0">LIVE NOW</Badge>
                                        )}
                                    </div>

                                    <h3 className={`font-semibold ${row.isBreak ? 'text-slate-400 italic' : isLive ? 'text-blue-900 text-lg' : 'text-slate-900'}`}>
                                        {row.subject}
                                    </h3>

                                    {!row.isBreak && (
                                        <div className="flex flex-col gap-2 mt-2">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <MapPin className="h-3 w-3" />
                                                Room {row.room}
                                            </div>

                                            <div className="pt-2 border-t border-dashed border-slate-200">
                                                {row.topic !== "---" ? (
                                                    <Link
                                                        href="/student/resources"
                                                        className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1.5 rounded-md w-fit active:bg-blue-100"
                                                    >
                                                        <BookOpen className="h-3 w-3" />
                                                        {row.topic}
                                                    </Link>
                                                ) : (
                                                    <span className="flex items-center gap-2 text-xs text-slate-400">
                                                        <BookOpen className="h-3 w-3" />
                                                        {row.topic}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
