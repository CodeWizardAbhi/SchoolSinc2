"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Video, Calendar, Clock, Bell, Filter, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";

const notices = [
    { type: "Holiday", title: "Dashain Holiday Notice", desc: "School will remain close from November 10-14 for Diwali celebrations.", time: "2 hours ago", author: "By Admin" },
    { type: "Exam", title: "Mid-Term Exam Schedule Released", desc: "Mid-term examination schedule for all classes has been published.", time: "1 day ago", author: "By Exam Controller" },
    { type: "Meeting", title: "Parents Teacher Meeting", desc: "Parents Teacher Meeting on November 13.", time: "a week ago", author: "By Admin" },
];

const meetings = [
    { title: "Staff coordination Meeting", type: "Staff Meeting", date: "December 24, 2025", time: "4:00 PM - 5:00 PM", platform: "Google Meet" },
    { title: "Grade 5 Parents-Teacher Conference", type: "Parents - Teacher Meeting", date: "Tomorrow", time: "4:00 PM - 5:00 PM", platform: "Zoom" },
    { title: "Board Meeting - Q4 Review", type: "Special Meeting", date: "Dec 15, 2025", time: "10:00 AM - 12:00 PM", platform: "Microsoft Teams" },
];

export default function ParentNotices() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader
                breadcrumb="Home / Notices & Meetings"
                title="Notices & Meetings"
                subtitle="Stay updated with school announcements"
            />

            {/* Notice Board */}
            <Card>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b">
                        <h3 className="font-semibold text-slate-700">Notice Board</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-xs bg-slate-800 text-white hover:bg-slate-700 hover:text-white border-none rounded-full px-4">
                                All Types <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {notices.map((notice, i) => (
                            <div key={i} className="p-3 sm:p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Badge variant="secondary" className={`text-xs ${notice.type === "Holiday" ? "bg-rose-100 text-rose-600 hover:bg-rose-100" :
                                        notice.type === "Exam" ? "bg-orange-100 text-orange-600 hover:bg-orange-100" :
                                            "bg-blue-100 text-blue-600 hover:bg-blue-100"
                                        }`}>{notice.type}</Badge>
                                    <span className="text-xs text-slate-400">{notice.time}</span>
                                </div>
                                <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">{notice.title}</h4>
                                <p className="text-xs sm:text-sm text-slate-500 mb-3">{notice.desc}</p>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                                    <button className="flex items-center gap-1 text-blue-600 font-medium">
                                        <Download className="h-3 w-3" /> Download PDF
                                    </button>
                                    <span className="text-slate-400">{notice.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Meetings */}
            <Card className="bg-slate-50/50">
                <CardContent className="p-4 sm:p-6">
                    <Tabs defaultValue="upcoming" className="w-full">
                        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                            <TabsList className="mb-4 sm:mb-6 bg-transparent border-b w-max min-w-full justify-start h-auto p-0 rounded-none">
                                <TabsTrigger value="upcoming" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 rounded-none px-0 mr-4 sm:mr-6 pb-2 text-sm text-slate-500 font-normal data-[state=active]:text-slate-900 data-[state=active]:font-semibold whitespace-nowrap">
                                    Upcoming Meetings
                                </TabsTrigger>
                                <TabsTrigger value="past" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-slate-900 rounded-none px-0 pb-2 text-sm text-slate-500 font-normal data-[state=active]:text-slate-900 data-[state=active]:font-semibold whitespace-nowrap">
                                    Past Meetings
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="upcoming" className="space-y-3 sm:space-y-4 mt-0">
                            {meetings.map((meeting, i) => (
                                <div key={i} className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm">
                                    <div className="flex items-start gap-3 mb-3 sm:mb-4">
                                        <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-blue-100 text-blue-600" : i === 1 ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}>
                                            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-sm line-clamp-2">{meeting.title}</h4>
                                            <Badge variant="outline" className={`mt-1 border-0 text-xs ${i === 0 ? "bg-blue-50 text-blue-600" : i === 1 ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
                                                {meeting.type}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 mb-3 sm:mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate">{meeting.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate">{meeting.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Video className="h-3 w-3 flex-shrink-0" />
                                            <span>{meeting.platform}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Button className="flex-1 bg-[#0f172a] h-9 text-xs gap-2">
                                            <Video className="h-3 w-3" /> Join Meeting
                                        </Button>
                                        <Button variant="outline" className="flex-1 h-9 text-xs gap-2">
                                            <Bell className="h-3 w-3" /> Remind
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>

                        <TabsContent value="past" className="mt-0">
                            <div className="text-center text-sm text-slate-400 py-8">
                                No past meetings to show.
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
