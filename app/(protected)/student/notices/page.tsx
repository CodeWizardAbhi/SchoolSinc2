"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Video, Calendar, Clock, Bell, Filter, ChevronDown, Eye, CheckCircle2, PartyPopper } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";

const notices = [
    {
        id: 1,
        type: "Holiday",
        title: "Dashain Holiday Notice",
        desc: "School will remain close from November 10-14 for Diwali celebrations.",
        fullText: "Dear Students and Parents,\n\nThis is to inform you that the school will remain closed from November 10th to November 14th, 2024, on the occasion of Diwali (Tihar). Regular classes will resume from November 15th at the usual time.\n\nWe wish you a happy and safe festival!",
        time: "2 hours ago",
        author: "By Admin"
    },
    {
        id: 2,
        type: "Exam",
        title: "Mid-Term Exam Schedule Released",
        desc: "Mid-term examination schedule for all classes has been published.",
        fullText: "The Mid-Term Examinations for the academic year 2024-25 will commence from December 1st. The detailed subject-wise routine has been attached below and is also available on the notice board. Students are advised to collect their admit cards from the administration office before November 25th.",
        time: "1 day ago",
        author: "By Exam Controller"
    },
    {
        id: 3,
        type: "Meeting",
        title: "Parents Teacher Meeting",
        desc: "Parents Teacher Meeting on November 13.",
        fullText: "A mandatory Parents Teacher Meeting (PTM) will be held on Saturday, November 13th, from 10:00 AM to 2:00 PM. Parents are requested to visit the respective classrooms to discuss their ward's progress. Your presence is highly appreciated.",
        time: "a week ago",
        author: "By Admin"
    },
];

const meetings = [
    { id: 101, title: "Staff coordination Meeting", type: "Staff Meeting", date: "December 24, 2025", time: "4:00 PM - 5:00 PM", platform: "Google Meet", canRsvp: false },
    { id: 102, title: "Grade 5 Parents-Teacher Conference", type: "Parents - Teacher Meeting", date: "Tomorrow", time: "4:00 PM - 5:00 PM", platform: "Zoom", canRsvp: true },
    { id: 103, title: "Board Meeting - Q4 Review", type: "Special Meeting", date: "Dec 15, 2025", time: "10:00 AM - 12:00 PM", platform: "Microsoft Teams", canRsvp: false },
];

export default function StudentNotices() {
    const [expandedNotices, setExpandedNotices] = useState<number[]>([]);
    const [rsvpedMeetings, setRsvpedMeetings] = useState<number[]>([]);
    const [showReward, setShowReward] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedNotices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleRsvp = (id: number) => {
        if (rsvpedMeetings.includes(id)) return;

        setRsvpedMeetings(prev => [...prev, id]);
        setShowReward(id);

        // Hide reward text after 3 seconds
        setTimeout(() => setShowReward(null), 3000);
    };

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
                        {notices.map((notice, i) => {
                            const isExpanded = expandedNotices.includes(notice.id);

                            return (
                                <div key={i} className="p-3 sm:p-4 border rounded-xl hover:bg-slate-50 transition-colors group">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <Badge variant="secondary" className={`text-xs ${notice.type === "Holiday" ? "bg-rose-100 text-rose-600 hover:bg-rose-100" :
                                            notice.type === "Exam" ? "bg-orange-100 text-orange-600 hover:bg-orange-100" :
                                                "bg-blue-100 text-blue-600 hover:bg-blue-100"
                                            }`}>{notice.type}</Badge>
                                        <span className="text-xs text-slate-400">{notice.time}</span>
                                    </div>
                                    <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-1">{notice.title}</h4>

                                    <div className={`text-sm text-slate-600 mb-3 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                                        {isExpanded ? (
                                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-line text-sm text-slate-700 mt-2">
                                                {notice.fullText}
                                            </div>
                                        ) : (
                                            notice.desc
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs mt-3 pt-3 border-t border-dashed border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleExpand(notice.id)}
                                                className="flex items-center gap-1.5 text-slate-600 font-medium hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-blue-50"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                {isExpanded ? "Show Less" : "Quick View"}
                                            </button>

                                            <button className="flex items-center gap-1.5 text-slate-400 font-medium hover:text-slate-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-100">
                                                <Download className="h-3.5 w-3.5" /> PDF
                                            </button>
                                        </div>
                                        <span className="text-slate-400 italic">{notice.author}</span>
                                    </div>
                                </div>
                            );
                        })}
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
                            {meetings.map((meeting, i) => {
                                const isRsvped = rsvpedMeetings.includes(meeting.id);
                                const isJustRsvped = showReward === meeting.id;

                                return (
                                    <div key={i} className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm transition-all hover:shadow-md">
                                        <div className="flex items-start gap-3 mb-3 sm:mb-4">
                                            <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-blue-100 text-blue-600" : i === 1 ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"}`}>
                                                <Video className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-semibold text-sm line-clamp-2">{meeting.title}</h4>
                                                    {isRsvped && (
                                                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-200 gap-1">
                                                            <CheckCircle2 className="h-3 w-3" /> Confirmed
                                                        </Badge>
                                                    )}
                                                </div>
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
                                            {meeting.canRsvp ? (
                                                <Button
                                                    onClick={() => handleRsvp(meeting.id)}
                                                    disabled={isRsvped}
                                                    className={`flex-1 h-9 text-xs gap-2 transition-all duration-500 ${isRsvped
                                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                                            : "bg-[#0f172a] hover:bg-slate-800"
                                                        }`}
                                                >
                                                    {isRsvped ? (
                                                        <>
                                                            {isJustRsvped ? <PartyPopper className="h-3 w-3 animate-bounce" /> : <CheckCircle2 className="h-3 w-3" />}
                                                            {isJustRsvped ? "+20 XP Earned!" : "RSVP Confirmed"}
                                                        </>
                                                    ) : (
                                                        <>Acknowledge / RSVP <span className="text-amber-300 font-bold text-[10px] ml-1">(+20 XP)</span></>
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button className="flex-1 bg-[#0f172a] h-9 text-xs gap-2">
                                                    <Video className="h-3 w-3" /> Join Meeting
                                                </Button>
                                            )}

                                            <Button variant="outline" className="flex-1 h-9 text-xs gap-2">
                                                <Bell className="h-3 w-3" /> Remind
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
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
