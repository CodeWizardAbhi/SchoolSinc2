"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ChevronDown, BookOpen, Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";

const upcomingExams = [
    { subject: "Mathematics", date: "Dec 20", time: "10:00 AM", syllabus: "Chapters 1-5, Algebra & Geometry", venue: "3A", instruction: "Must Bring your identity card", daysLeft: 3 },
    { subject: "English", date: "Dec 22", time: "10:00 AM", syllabus: "Grammar, Essay Writing, Comprehension", venue: "4A", instruction: "Must Bring your identity card", daysLeft: 5 },
    { subject: "Nepali", date: "Dec 24", time: "10:00 AM", syllabus: "Kabita, Nibandha, Byakaran", venue: "7A", instruction: "Must Bring your identity card", daysLeft: 7 },
    { subject: "Science", date: "Dec 26", time: "10:00 AM", syllabus: "Physics & Chemistry combined", venue: "6A", instruction: "Must Bring your identity card", daysLeft: 9 },
];

const notices = [
    { type: "holiday", title: "Holiday Notice", desc: "Dec 25, Christmas Holiday", time: "Today", iconColor: "bg-rose-100 text-rose-500" },
    { type: "event", title: "Annual Sports Day", desc: "On Dec 28. Registration open till Dec 20.", time: "2 days ago", iconColor: "bg-emerald-100 text-emerald-500" },
    { type: "library", title: "Library Notice", desc: "New books arrived. Check the catalog.", time: "3 days ago", iconColor: "bg-blue-100 text-blue-500" },
];

// Get urgency styling based on days left
const getUrgencyStyle = (daysLeft: number) => {
    if (daysLeft <= 3) return { bg: "bg-red-50 border-red-200", text: "text-red-600", badgeBg: "bg-red-100 text-red-700", label: "Urgent" };
    if (daysLeft <= 7) return { bg: "bg-amber-50 border-amber-200", text: "text-amber-600", badgeBg: "bg-amber-100 text-amber-700", label: "Soon" };
    return { bg: "bg-slate-50 border-slate-200", text: "text-slate-600", badgeBg: "bg-slate-100 text-slate-600", label: "" };
};

export default function StudentExams() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <PageHeader
                    breadcrumb="Home / Exams & Events"
                    title="Exams & Events"
                    subtitle="View upcoming exams and school events"
                />
                <Button variant="outline" size="sm" className="h-8 text-xs w-fit">
                    End Term <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </div>

            {/* Exams */}
            <div className="space-y-4">
                {upcomingExams.map((exam, i) => {
                    const urgency = getUrgencyStyle(exam.daysLeft);

                    return (
                        <Card key={i} className={`hover:shadow-lg transition-all duration-300 overflow-hidden ${urgency.bg}`}>
                            {/* Urgency indicator bar */}
                            {exam.daysLeft <= 3 && (
                                <div className="h-1 bg-gradient-to-r from-red-500 to-rose-500" />
                            )}

                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    {/* Left: Subject Info */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="font-bold text-lg sm:text-xl">{exam.subject}</h3>
                                            {urgency.label && (
                                                <Badge className={`${urgency.badgeBg} border-0 text-[10px] font-bold uppercase tracking-wide`}>
                                                    {urgency.label}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600">{exam.syllabus}</p>

                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm pt-2">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <MapPin className="h-3.5 w-3.5" />
                                                <span>Room {exam.venue}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>{exam.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Date & Actions */}
                                    <div className="flex items-center gap-4 lg:gap-6">
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-slate-900">{exam.date}</p>
                                            <p className={`text-sm font-bold ${urgency.text}`}>
                                                In {exam.daysLeft} {exam.daysLeft === 1 ? "Day" : "Days"}
                                            </p>
                                        </div>

                                        <Link href="/student/resources">
                                            <Button
                                                className={`h-10 text-xs sm:text-sm gap-2 ${exam.daysLeft <= 3
                                                        ? "bg-red-600 hover:bg-red-700"
                                                        : "bg-blue-600 hover:bg-blue-700"
                                                    }`}
                                            >
                                                <BookOpen className="h-4 w-4" />
                                                Start Revision
                                                <ArrowRight className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Instruction */}
                                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center gap-2 text-xs text-slate-500">
                                    <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                    <span>{exam.instruction}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Events Section */}
            <div className="space-y-4">
                <h2 className="text-sm font-bold opacity-80">Currently ongoing or Upcoming Events</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="font-semibold text-sm">Latest Notices</h3>
                            <span className="text-xs text-slate-400 cursor-pointer hover:text-blue-500 transition-colors">View All</span>
                        </div>
                        <div className="p-3 sm:p-4 space-y-3">
                            {notices.map((notice, i) => (
                                <div key={i} className="p-3 sm:p-4 rounded-xl border bg-white flex gap-3 sm:gap-4 hover:shadow-sm transition-shadow">
                                    <div className={`h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full flex items-center justify-center ${notice.iconColor}`}>
                                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm text-slate-900">{notice.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 break-words">{notice.desc}</p>
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium">{notice.time}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center text-xs text-slate-400 py-2">
                                No more Activity
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
