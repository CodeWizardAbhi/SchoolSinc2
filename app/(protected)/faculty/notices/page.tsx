"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Video, Calendar, Clock, Bell } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function FacultyNoticesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Notices & Meetings"
                title="Notices & Meetings"
                subtitle="Stay updated with school announcements"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notice Board */}
                <Card className="h-full">
                    <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                        <h3 className="font-semibold">Notice Board</h3>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="cursor-pointer bg-slate-100">All Types</Badge>
                            <Badge variant="outline" className="cursor-pointer text-slate-500">Filter</Badge>
                        </div>
                    </div>
                    <CardContent className="p-4 sm:p-6 space-y-6">
                        {[
                            { type: "Holiday", title: "Dashain Holiday Notice", desc: "School will remain close from November 10-14 for Diwali celebrations...", date: "2 hours ago", color: "bg-rose-100 text-rose-600" },
                            { type: "Exam", title: "Mid-Term Exam Schedule Released", desc: "Mid-term examination schedule for all classes has been published...", date: "2 day ago", color: "bg-orange-100 text-orange-600" },
                            { type: "Meeting", title: "Parents Teacher Meeting", desc: "Parents Teacher Meeting on November 12.", date: "a week ago", color: "bg-blue-100 text-blue-600" },
                        ].map((notice, i) => (
                            <div key={i} className="border-b last:border-0 pb-6 last:pb-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Badge variant="secondary" className={`${notice.color} h-5 text-[10px]`}>{notice.type}</Badge>
                                    <span className="text-[10px] text-slate-400">{notice.date}</span>
                                </div>
                                <h4 className="font-semibold text-sm mb-1">{notice.title}</h4>
                                <p className="text-xs text-slate-500 mb-3">{notice.desc}</p>
                                <div className="flex flex-wrap items-center gap-1 text-[10px] text-blue-600 font-medium cursor-pointer hover:underline">
                                    <Download className="h-3 w-3" /> Download PDF
                                    <span className="text-slate-400 ml-1 font-normal">By: Admin</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Meetings */}
                <Card className="h-full bg-slate-50/50">
                    <div className="p-4 sm:p-6 border-b flex flex-wrap gap-4 sm:gap-6">
                        <h3 className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-4 sm:pb-6 -mb-4 sm:-mb-6 px-2">Upcoming Meetings</h3>
                        <h3 className="font-medium text-slate-500 cursor-pointer">Past Meetings</h3>
                    </div>
                    <CardContent className="p-4 sm:p-6 space-y-4">
                        {[
                            { title: "Staff coordination Meeting", tag: "Staff Meeting", tagColor: "bg-blue-100 text-blue-600" },
                            { title: "Grade 5 Parents-Teacher Conference", tag: "Parents - Teacher Meeting", tagColor: "bg-emerald-100 text-emerald-600" },
                            { title: "Board Meeting - Q4 Review", tag: "Special Meeting", tagColor: "bg-orange-100 text-orange-600" },
                        ].map((meeting, i) => (
                            <div key={i} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex gap-3">
                                        <div className="bg-slate-100 p-2 rounded h-fit flex-shrink-0">
                                            <Video className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{meeting.title}</h4>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${meeting.tagColor} mt-1 inline-block`}>{meeting.tag}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-2 text-[10px] text-slate-500 mb-4 px-2">
                                    <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Dec 24, 2025</div>
                                    <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> 4:00 PM</div>
                                    <div className="flex items-center gap-1"><Video className="h-3 w-3" /> Zoom</div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <Button className="flex-1 h-8 text-xs bg-[#0f172a]"> <Video className="h-3 w-3 mr-2" /> Join Meeting</Button>
                                    <Button variant="outline" className="h-8 text-xs px-2 sm:flex-none"><Bell className="h-3 w-3 sm:mr-2" /><span className="sm:inline hidden">Remind</span></Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
