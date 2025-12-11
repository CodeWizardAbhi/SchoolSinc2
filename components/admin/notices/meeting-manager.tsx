"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Presentation, Video, Edit2, Trash2, Clock, Calendar as CalendarIcon, LucideIcon } from "lucide-react";

export function MeetingManager() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center gap-6 border-b pb-4 mb-4">
                <h3 className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-4 -mb-4 px-2">Upcoming Meetings</h3>
                <h3 className="font-medium text-slate-500 pb-4 -mb-4 px-2 cursor-pointer">Past Meetings</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MeetingCard
                    title="Staff coordination Meeting"
                    tag="Staff Meeting"
                    tagColor="bg-blue-100 text-blue-600"
                    date="December 24, 2025"
                    time="4:00 PM - 5:00 PM"
                    participants="28 Participants"
                    platform="Google Meet"
                    icon={Users}
                />
                <MeetingCard
                    title="Grade 5 Parents-Teacher Conference"
                    tag="Parents - Teacher Meeting"
                    tagColor="bg-emerald-100 text-emerald-600"
                    date="Tomorrow"
                    time="4:00 PM - 5:00 PM"
                    participants="--"
                    platform="Zoom"
                    icon={Presentation}
                />
                <MeetingCard
                    title="Board Meeting - Q4 Review"
                    tag="Special Meeting"
                    tagColor="bg-orange-100 text-orange-600"
                    date="Dec 15, 2025"
                    time="10:00 AM - 12:00 PM"
                    participants="--"
                    platform="Microsoft Teams"
                    icon={Presentation}
                />
            </CardContent>
        </Card>
    );
}

interface MeetingCardProps {
    title: string;
    tag: string;
    tagColor: string;
    date: string;
    time: string;
    participants: string;
    platform: string;
    icon: LucideIcon;
}

function MeetingCard({ title, tag, tagColor, date, time, participants, platform, icon: Icon }: MeetingCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg h-fit">
                            <Icon className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm line-clamp-1">{title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${tagColor} mt-1 inline-block`}>{tag}</span>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Edit2 className="h-3 w-3 text-slate-400" /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="h-3 w-3 text-rose-400" /></Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {participants}</span>
                        <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {platform}</span>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button className="flex-1 bg-[#0f172a] h-8 text-xs">
                        <Video className="h-3 w-3 mr-2" /> Join Meeting
                    </Button>
                    <Button variant="outline" className="flex-1 h-8 text-xs">Remind</Button>
                </div>
            </CardContent>
        </Card>
    )
}
