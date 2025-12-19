"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Download,
    Video,
    Calendar,
    Clock,
    Bell,
    Eye,
    Send,
    Plus,
    Check,
    Users,

    FileText,
    Megaphone,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Fix 10: Notice data with read receipts
const sentNotices = [
    {
        id: 1,
        type: "Holiday",
        title: "Dashain Holiday Notice",
        desc: "School will remain close from November 10-14 for Diwali celebrations...",
        date: "2 hours ago",
        color: "bg-rose-100 text-rose-600",
        totalRecipients: 40,
        readCount: 24,
        sentTo: 'Class 10-A Parents'
    },
    {
        id: 2,
        type: "Exam",
        title: "Mid-Term Exam Schedule Released",
        desc: "Mid-term examination schedule for all classes has been published...",
        date: "2 day ago",
        color: "bg-orange-100 text-orange-600",
        totalRecipients: 40,
        readCount: 38,
        sentTo: 'Class 10-A Parents'
    },
    {
        id: 3,
        type: "Meeting",
        title: "Parents Teacher Meeting",
        desc: "Parents Teacher Meeting on November 12.",
        date: "a week ago",
        color: "bg-blue-100 text-blue-600",
        totalRecipients: 40,
        readCount: 32,
        sentTo: 'Class 10-A Parents'
    },
    {
        id: 4,
        type: "Fee",
        title: "Fee Reminder - December",
        desc: "Last date for fee submission is December 15. Please ensure timely payment.",
        date: "3 days ago",
        color: "bg-purple-100 text-purple-600",
        totalRecipients: 40,
        readCount: 15,
        sentTo: 'Class 10-A Parents'
    },
];

const meetings = [
    { title: "Staff coordination Meeting", tag: "Staff Meeting", tagColor: "bg-blue-100 text-blue-600", date: "Dec 24, 2025", time: "4:00 PM" },
    { title: "Grade 5 Parents-Teacher Conference", tag: "Parents - Teacher Meeting", tagColor: "bg-emerald-100 text-emerald-600", date: "Dec 28, 2025", time: "10:00 AM" },
    { title: "Board Meeting - Q4 Review", tag: "Special Meeting", tagColor: "bg-orange-100 text-orange-600", date: "Jan 2, 2026", time: "2:00 PM" },
];

export default function FacultyNoticesPage() {
    const [notices, setNotices] = useState(sentNotices);
    const [activeTab, setActiveTab] = useState("sent");

    // New notice form state
    const [newNotice, setNewNotice] = useState({
        title: '',
        content: '',
        type: 'general',
        audience: '10-A',
    });

    // Fix 10: Remind unread recipients
    const handleRemindUnread = (noticeId: number) => {
        const notice = notices.find(n => n.id === noticeId);
        if (!notice) return;

        const unreadCount = notice.totalRecipients - notice.readCount;
        alert(`Push notification sent to ${unreadCount} parents who haven't read "${notice.title}" yet.`);

        // Simulate some more reads after reminder
        setNotices(prev => prev.map(n =>
            n.id === noticeId
                ? { ...n, readCount: Math.min(n.readCount + 3, n.totalRecipients) }
                : n
        ));
    };

    const handleSendNotice = () => {
        if (!newNotice.title || !newNotice.content) {
            alert('Please fill in all fields');
            return;
        }

        const newNoticeObj = {
            id: notices.length + 1,
            type: newNotice.type === 'holiday' ? 'Holiday' : newNotice.type === 'exam' ? 'Exam' : newNotice.type === 'meeting' ? 'Meeting' : 'General',
            title: newNotice.title,
            desc: newNotice.content,
            date: 'Just now',
            color: newNotice.type === 'holiday' ? 'bg-rose-100 text-rose-600' :
                newNotice.type === 'exam' ? 'bg-orange-100 text-orange-600' :
                    newNotice.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                        'bg-slate-100 text-slate-600',
            totalRecipients: 40,
            readCount: 0,
            sentTo: `Class ${newNotice.audience} Parents`
        };

        setNotices(prev => [newNoticeObj, ...prev]);
        setNewNotice({ title: '', content: '', type: 'general', audience: '10-A' });
        setActiveTab('sent');
        alert('Notice sent successfully!');
    };

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Notices & Meetings"
                title="Notices & Meetings"
                subtitle="Send notices and track read receipts"
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                    <TabsTrigger value="sent" className="gap-2">
                        <Megaphone className="h-4 w-4" />
                        Sent Notices
                    </TabsTrigger>
                    <TabsTrigger value="compose" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Compose
                    </TabsTrigger>
                    <TabsTrigger value="meetings" className="gap-2">
                        <Video className="h-4 w-4" />
                        Meetings
                    </TabsTrigger>
                </TabsList>

                {/* Fix 10: Sent Notices with Read Receipts */}
                <TabsContent value="sent" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Notice Board with Read Receipts */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Megaphone className="h-5 w-5 text-blue-500" />
                                        Sent Notices
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="cursor-pointer bg-slate-100">All Types</Badge>
                                        <Badge variant="outline" className="cursor-pointer text-slate-500">Filter</Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {notices.map((notice) => {
                                    const readPercentage = Math.round((notice.readCount / notice.totalRecipients) * 100);
                                    const unreadCount = notice.totalRecipients - notice.readCount;

                                    return (
                                        <div key={notice.id} className="border rounded-xl p-4 hover:shadow-sm transition-shadow">
                                            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                                {/* Notice Content */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        <Badge variant="secondary" className={`${notice.color} h-5 text-[10px]`}>
                                                            {notice.type}
                                                        </Badge>
                                                        <span className="text-[10px] text-slate-400">{notice.date}</span>
                                                        <Badge variant="outline" className="text-[10px]">
                                                            {notice.sentTo}
                                                        </Badge>
                                                    </div>
                                                    <h4 className="font-semibold text-sm mb-1">{notice.title}</h4>
                                                    <p className="text-xs text-slate-500 mb-3">{notice.desc}</p>
                                                    <div className="flex flex-wrap items-center gap-1 text-[10px] text-blue-600 font-medium cursor-pointer hover:underline">
                                                        <Download className="h-3 w-3" /> Download PDF
                                                    </div>
                                                </div>

                                                {/* Fix 10: Read Receipt Meter */}
                                                <div className="w-full lg:w-64 bg-slate-50 rounded-xl p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-medium flex items-center gap-1">
                                                            <Eye className="h-3 w-3 text-slate-500" />
                                                            Read Receipt
                                                        </span>
                                                        <span className={`text-sm font-bold ${readPercentage >= 80 ? 'text-emerald-600' :
                                                            readPercentage >= 50 ? 'text-amber-600' :
                                                                'text-rose-600'
                                                            }`}>
                                                            {notice.readCount}/{notice.totalRecipients}
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mb-3">
                                                        <Progress
                                                            value={readPercentage}
                                                            className={`h-2 ${readPercentage >= 80 ? '[&>div]:bg-emerald-500' :
                                                                readPercentage >= 50 ? '[&>div]:bg-amber-500' :
                                                                    '[&>div]:bg-rose-500'
                                                                }`}
                                                        />
                                                        <p className="text-[10px] text-muted-foreground mt-1">
                                                            {readPercentage}% of parents have read this
                                                        </p>
                                                    </div>

                                                    {/* Remind Button */}
                                                    {unreadCount > 0 && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="w-full gap-1 text-xs h-8 border-blue-200 text-blue-600 hover:bg-blue-50"
                                                            onClick={() => handleRemindUnread(notice.id)}
                                                        >
                                                            <Bell className="h-3 w-3" />
                                                            Remind {unreadCount} Unread
                                                        </Button>
                                                    )}

                                                    {unreadCount === 0 && (
                                                        <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 bg-emerald-50 rounded-lg py-2">
                                                            <Check className="h-3 w-3" />
                                                            All parents have read!
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Compose New Notice */}
                <TabsContent value="compose" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-500" />
                                Compose New Notice
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Notice Title</Label>
                                    <Input
                                        placeholder="Enter notice title..."
                                        value={newNotice.title}
                                        onChange={(e) => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Type</Label>
                                        <Select
                                            value={newNotice.type}
                                            onValueChange={(v) => setNewNotice(prev => ({ ...prev, type: v }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General</SelectItem>
                                                <SelectItem value="holiday">Holiday</SelectItem>
                                                <SelectItem value="exam">Exam</SelectItem>
                                                <SelectItem value="meeting">Meeting</SelectItem>
                                                <SelectItem value="fee">Fee</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Send To</Label>
                                        <Select
                                            value={newNotice.audience}
                                            onValueChange={(v) => setNewNotice(prev => ({ ...prev, audience: v }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10-A">Class 10-A Parents</SelectItem>
                                                <SelectItem value="10-B">Class 10-B Parents</SelectItem>
                                                <SelectItem value="9-A">Class 9-A Parents</SelectItem>
                                                <SelectItem value="all">All Parents</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Notice Content</Label>
                                <Textarea
                                    placeholder="Write your notice content here..."
                                    className="min-h-[200px]"
                                    value={newNotice.content}
                                    onChange={(e) => setNewNotice(prev => ({ ...prev, content: e.target.value }))}
                                />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    Will be sent to ~40 parents
                                </div>
                                <Button
                                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                                    onClick={handleSendNotice}
                                >
                                    <Send className="h-4 w-4" />
                                    Send Notice
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Meetings Tab */}
                <TabsContent value="meetings" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Upcoming Meetings */}
                        <Card className="lg:col-span-2 bg-slate-50/50">
                            <CardHeader className="border-b">
                                <div className="flex flex-wrap gap-4 sm:gap-6">
                                    <h3 className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-4 sm:pb-6 -mb-4 sm:-mb-6 px-2">Upcoming Meetings</h3>
                                    <h3 className="font-medium text-slate-500 cursor-pointer">Past Meetings</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {meetings.map((meeting, i) => (
                                        <div key={i} className="bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex gap-3">
                                                    <div className="bg-slate-100 p-2 rounded h-fit flex-shrink-0">
                                                        <Video className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm">{meeting.title}</h4>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${meeting.tagColor} mt-1 inline-block`}>
                                                            {meeting.tag}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-2 text-[10px] text-slate-500 mb-4 px-2">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> {meeting.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" /> {meeting.time}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Video className="h-3 w-3" /> Zoom
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Button className="flex-1 h-8 text-xs bg-[#0f172a]">
                                                    <Video className="h-3 w-3 mr-2" /> Join Meeting
                                                </Button>
                                                <Button variant="outline" className="h-8 text-xs px-2 sm:flex-none">
                                                    <Bell className="h-3 w-3 sm:mr-2" />
                                                    <span className="sm:inline hidden">Remind</span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
