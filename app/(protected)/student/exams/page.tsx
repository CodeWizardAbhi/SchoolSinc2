"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

const upcomingExams = [
    { subject: "Mathematics", date: "Oct 5", time: "10:00 AM", syllabus: "Complete syllabus", venue: "3A", instruction: "Must Bring your identity card" },
    { subject: "English", date: "Oct 8", time: "10:00 AM", syllabus: "Complete syllabus", venue: "4A", instruction: "Must Bring your identity card" },
    { subject: "Nepali", date: "Oct 9", time: "10:00 AM", syllabus: "Complete syllabus", venue: "7A", instruction: "Must Bring your identity card" },
    { subject: "Science", date: "Oct 10", time: "10:00 AM", syllabus: "Complete syllabus", venue: "6A", instruction: "Must Bring your identity card" },
];

const notices = [
    { type: "holiday", title: "Holiday Notice", desc: "Oct 2, Dashain Vacation", time: "Today", iconColor: "bg-rose-100 text-rose-500" },
    { type: "event", title: "Annual Sports Day", desc: "On Oct 15. Registration open till Oct 10.", time: "2 days ago", iconColor: "bg-emerald-100 text-emerald-500" },
    { type: "library", title: "Library Notice", desc: "New books arrived. Check the catalog.", time: "3 days ago", iconColor: "bg-blue-100 text-blue-500" },
];

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
            <div className="space-y-3">
                {upcomingExams.map((exam, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-base sm:text-lg">{exam.subject}</h3>
                                        <p className="text-xs sm:text-sm text-slate-500">{exam.syllabus}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-bold text-slate-900">{exam.date}</p>
                                        <p className="text-xs text-slate-500">{exam.time}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-1.5 text-slate-600">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                                        <span>Venue: {exam.venue}</span>
                                    </div>
                                    <div className="text-rose-500 text-xs font-medium">
                                        {exam.instruction}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Events Section */}
            <div className="space-y-4">
                <h2 className="text-sm font-bold opacity-80">Currently ongoing or Upcoming Events</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="font-semibold text-sm">Latest Notices</h3>
                            <span className="text-xs text-slate-400 cursor-pointer hover:text-blue-500">View All</span>
                        </div>
                        <div className="p-3 sm:p-4 space-y-3">
                            {notices.map((notice, i) => (
                                <div key={i} className="p-3 sm:p-4 rounded-xl border bg-white flex gap-3 sm:gap-4">
                                    <div className={`h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full flex items-center justify-center ${notice.iconColor}`}>
                                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm text-slate-900">{notice.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 break-words">{notice.desc}</p>
                                        <p className="text-[10px] text-rose-500 mt-2 font-medium">{notice.time}</p>
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
