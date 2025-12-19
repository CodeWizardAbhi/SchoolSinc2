"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    BookOpen,
    Calendar,
    Megaphone,
    CheckCircle2,
    FilePlus,
    CalendarDays,
    Clock,
    Users,
    TrendingUp,
    GraduationCap,
    ChevronRight,
    Target,
    Award,
    UserCheck,
    BarChart3,
    Play,
    Pause,
    Bell,
    BookOpenCheck,
    Check,
    X,
    AlertCircle,
    Zap,
    Radio,
} from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface FacultyDashboardClientProps {
    userName: string;
}

// Mock data
const classAttendance = [
    { name: 'Present', value: 92, color: '#22c55e' },
    { name: 'Absent', value: 8, color: '#e5e7eb' },
];

const studentPerformance = [
    { month: 'Aug', avgScore: 68 },
    { month: 'Sep', avgScore: 72 },
    { month: 'Oct', avgScore: 70 },
    { month: 'Nov', avgScore: 76 },
    { month: 'Dec', avgScore: 78 },
];

const todaySchedule = [
    { time: '09:00', class: 'Class 10-A', subject: 'Mathematics', room: '202', status: 'completed' },
    { time: '10:00', class: 'Class 10-B', subject: 'Mathematics', room: '204', status: 'completed' },
    { time: '11:00', class: 'Class 9-A', subject: 'Mathematics', room: '202', status: 'ongoing' },
    { time: '12:00', subject: 'Break', room: '-', class: '-', status: 'upcoming' },
    { time: '02:00', class: 'Class 9-B', subject: 'Mathematics', room: '206', status: 'upcoming' },
    { time: '03:00', class: 'Class 8-A', subject: 'Mathematics', room: '208', status: 'upcoming' },
];

const assignedClasses = [
    { class: '10-A', students: 42, avgAttendance: 94, avgScore: 82 },
    { class: '10-B', students: 38, avgAttendance: 88, avgScore: 76 },
    { class: '9-A', students: 45, avgAttendance: 91, avgScore: 78 },
    { class: '9-B', students: 40, avgAttendance: 86, avgScore: 72 },
];

const pendingTasks = [
    { title: 'Grade Class 10-A Quiz 3', due: 'Due Tomorrow', priority: 'high', type: 'grading' },
    { title: 'Upload Unit 5 Notes', due: 'Due in 2 days', priority: 'medium', type: 'resource' },
    { title: 'Submit Monthly Report', due: 'Due in 3 days', priority: 'medium', type: 'report' },
    { title: 'Review vacation homework', due: 'Due in 5 days', priority: 'low', type: 'grading' },
];

// Fix 2: Quick Pulse data - students missing homework/assignments
const quickPulseItems = [
    { count: 3, issue: 'Missed Homework', students: ['Rahul Kumar', 'Amit Patel', 'Vikram Singh'], class: '10-A' },
    { count: 2, issue: 'Missing Quiz Submission', students: ['Priya Singh', 'Neha Sharma'], class: '9-B' },
];

// Fix 3: Pending Approvals data
const pendingApprovals = [
    { id: 1, name: 'Rahul Kumar', class: '10-A', type: 'Sick Leave', date: 'Dec 18-20', reason: 'Fever and cold', status: 'pending' },
    { id: 2, name: 'Priya Singh', class: '9-B', type: 'Personal Leave', date: 'Dec 22', reason: 'Family event', status: 'pending' },
    { id: 3, name: 'Amit Patel', class: '10-B', type: 'Late Submission', date: 'Math Assignment', reason: 'Medical appointment', status: 'pending' },
];

const notices = [
    { title: 'Staff Meeting Tomorrow', desc: 'All teaching staff at 3 PM', time: '2 hours ago', type: 'meeting' },
    { title: 'Exam Schedule Released', desc: 'Mid-term exams start Dec 20', time: '1 day ago', type: 'exam' },
    { title: 'Holiday Notice', desc: 'Winter break Dec 25 - Jan 2', time: '2 days ago', type: 'holiday' },
];

const upcomingEvents = [
    { title: 'Parents Teacher Meeting', date: 'Dec 18', time: '10:00 AM', type: 'meeting' },
    { title: 'Math Olympiad Prep', date: 'Dec 20', time: '02:00 PM', type: 'event' },
    { title: 'Staff Meeting', date: 'Dec 22', time: '03:00 PM', type: 'meeting' },
];

export default function FacultyDashboardClient({ userName }: FacultyDashboardClientProps) {
    const [isMounted, setIsMounted] = useState(false);

    // Fix 1: Live Class State
    const [isClassActive, setIsClassActive] = useState(false);
    const [classTimer, setClassTimer] = useState(0); // in seconds
    const [activeClass, setActiveClass] = useState(todaySchedule.find(s => s.status === 'ongoing'));

    // Fix 3: Approvals state
    const [approvals, setApprovals] = useState(pendingApprovals);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fix 1: Timer effect for active class
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isClassActive) {
            interval = setInterval(() => {
                setClassTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isClassActive]);

    const formatTimer = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Fix 1: Toggle class session
    const toggleClassSession = () => {
        if (isClassActive) {
            setIsClassActive(false);
            setClassTimer(0);
        } else {
            setIsClassActive(true);
            setClassTimer(0);
        }
    };

    // Fix 2: Nudge students handler
    const handleNudgeAll = (item: typeof quickPulseItems[0]) => {
        alert(`Notification sent to ${item.students.join(', ')}: "${userName} is waiting for your ${item.issue.toLowerCase()}. Submit now for partial XP."`);
    };

    // Fix 3: Handle approval actions
    const handleApproval = (id: number, action: 'approve' | 'reject') => {
        setApprovals(prev => prev.filter(a => a.id !== id));
        const approval = approvals.find(a => a.id === id);
        if (approval) {
            alert(`${action === 'approve' ? 'Approved' : 'Rejected'} ${approval.type} request from ${approval.name}`);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 17) return 'Good Afternoon';
        if (hour >= 17 && hour < 21) return 'Good Evening';
        return 'Good Night';
    };

    const currentDate = isMounted
        ? new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    const currentTime = isMounted
        ? new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
        : '';

    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-48" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Enhanced Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">{getGreeting()},</p>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">{userName}</h2>
                            <p className="text-slate-300 text-sm">Have a productive day at work</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-blue-400">6</p>
                                <p className="text-xs text-slate-300">Classes Today</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-amber-400">{pendingTasks.length}</p>
                                <p className="text-xs text-slate-300">Pending Tasks</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-emerald-400">165</p>
                                <p className="text-xs text-slate-300">Total Students</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-purple-400">{approvals.length}</p>
                                <p className="text-xs text-slate-300">Approvals</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" /> {currentDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {currentTime}
                        </span>
                        <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" /> Subject: Mathematics
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> 4 Classes Assigned
                        </span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-full pointer-events-none opacity-5">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,90.9,-6.1C91.7,8.2,90.6,22.5,84.1,35.2C77.6,47.9,65.7,59,52.2,65.9C38.7,72.8,23.6,75.5,9.2,74C-5.2,72.5,-19,66.8,-31.6,59.3C-44.2,51.8,-55.6,42.5,-64.5,30.8C-73.4,19.1,-79.8,5,-78.3,-8.3C-76.8,-21.6,-67.4,-34.1,-56.3,-43.3C-45.2,-52.5,-32.4,-58.4,-19.4,-64.4C-6.4,-70.4,6.8,-76.5,20.8,-76.5C34.8,-76.5,52,-70.4,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            {/* Fix 1: Live Class Widget - Prominent Top Widget */}
            {activeClass && (
                <Card className={`border-2 transition-all ${isClassActive ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20' : 'border-slate-200'}`}>
                    <CardContent className="py-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`h-14 w-14 rounded-xl flex items-center justify-center transition-all ${isClassActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-100'}`}>
                                    {isClassActive ? (
                                        <Radio className="h-7 w-7 text-white" />
                                    ) : (
                                        <BookOpen className="h-7 w-7 text-slate-500" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">{activeClass.class} - {activeClass.subject}</h3>
                                        {isClassActive && (
                                            <Badge className="bg-blue-500 text-white animate-pulse flex items-center gap-1">
                                                <span className="h-2 w-2 bg-white rounded-full animate-ping" />
                                                LIVE NOW
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Room {activeClass.room} • {activeClass.time}</p>
                                    {isClassActive && (
                                        <p className="text-sm font-mono font-semibold text-blue-600 mt-1">
                                            Class in Session: {formatTimer(classTimer)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={toggleClassSession}
                                    className={`gap-2 min-w-[140px] ${isClassActive
                                        ? 'bg-rose-500 hover:bg-rose-600'
                                        : 'bg-emerald-500 hover:bg-emerald-600'
                                        }`}
                                >
                                    {isClassActive ? (
                                        <>
                                            <Pause className="h-4 w-4" /> End Class
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4" /> Start Class
                                        </>
                                    )}
                                </Button>
                                <Link href="/faculty/attendance">
                                    <Button variant="outline" className="gap-2">
                                        <CheckCircle2 className="h-4 w-4" /> Mark Attendance
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quick Actions Row - Updated with Quiz Upload */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/faculty/attendance">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all rounded-xl p-4 text-white flex items-center gap-4 cursor-pointer shadow-lg shadow-blue-500/25">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold">Mark Attendance</h4>
                            <p className="text-xs text-blue-100">Speed Grid for 40+ students</p>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-auto opacity-60" />
                    </div>
                </Link>
                <Link href="/faculty/academics">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all rounded-xl p-4 text-white flex items-center gap-4 cursor-pointer shadow-lg shadow-emerald-500/25">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <BookOpenCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold">Upload Quiz</h4>
                            <p className="text-xs text-emerald-100">Create with XP rewards</p>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-auto opacity-60" />
                    </div>
                </Link>
                <Link href="/faculty/leaves">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all rounded-xl p-4 text-white flex items-center gap-4 cursor-pointer shadow-lg shadow-purple-500/25">
                        <div className="bg-white/20 p-3 rounded-xl">
                            <FilePlus className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold">Apply Leave</h4>
                            <p className="text-xs text-purple-100">Submit leave request</p>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-auto opacity-60" />
                    </div>
                </Link>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Schedule & Classes */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Today's Schedule - MOST IMPORTANT (Teachers check 10x/day) */}
                    <Card className="border-blue-200">
                        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-500" />
                                    Today&apos;s Schedule
                                </CardTitle>
                                <Badge className="bg-blue-500">Wednesday</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                {todaySchedule.map((item, i) => (
                                    <div key={i} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${item.status === 'ongoing' ? 'bg-blue-50 border-2 border-blue-300 shadow-sm' :
                                        item.status === 'completed' ? 'bg-slate-50 opacity-60' :
                                            'bg-white border border-slate-100 hover:bg-slate-50'
                                        }`}>
                                        <div className={`text-sm font-mono font-semibold w-14 ${item.status === 'ongoing' ? 'text-blue-600' : 'text-slate-500'
                                            }`}>
                                            {item.time}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-medium text-sm ${item.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                                                {item.class !== '-' ? `${item.class} - ${item.subject}` : item.subject}
                                            </p>
                                            {item.room !== '-' && (
                                                <p className="text-[10px] text-slate-500">Room {item.room}</p>
                                            )}
                                        </div>
                                        <div>
                                            {item.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                            {item.status === 'ongoing' && (
                                                <Badge className="bg-blue-500 text-white text-[10px] animate-pulse">Now</Badge>
                                            )}
                                            {item.status === 'upcoming' && item.subject !== 'Break' && (
                                                <ChevronRight className="h-5 w-5 text-slate-300" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assigned Classes Overview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-blue-500" />
                                    Assigned Classes
                                </CardTitle>
                                <Link href="/faculty/students" className="text-xs text-blue-600 hover:underline">View All</Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assignedClasses.map((cls, i) => (
                                    <div key={i} className="p-4 rounded-xl border bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-lg">Class {cls.class}</span>
                                            <Badge variant="outline">{cls.students} Students</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Avg Attendance</span>
                                                <span className={`font-semibold ${cls.avgAttendance >= 90 ? 'text-emerald-600' : cls.avgAttendance >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                                                    {cls.avgAttendance}%
                                                </span>
                                            </div>
                                            <Progress value={cls.avgAttendance} className="h-1.5" />
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Avg Score</span>
                                                <span className="font-semibold">{cls.avgScore}%</span>
                                            </div>
                                            <Progress value={cls.avgScore} className="h-1.5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance & Attendance Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Class Attendance Overview */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <UserCheck className="h-4 w-4 text-emerald-500" />
                                    Today&apos;s Class Attendance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-6">
                                    <div className="relative h-28 w-28 flex-shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={classAttendance}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={35}
                                                    outerRadius={50}
                                                    startAngle={90}
                                                    endAngle={-270}
                                                    dataKey="value"
                                                >
                                                    {classAttendance.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-emerald-600">92%</span>
                                            <span className="text-[10px] text-slate-400">Present</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Classes Taken</span>
                                            <span className="font-semibold">3/6</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Students Present</span>
                                            <span className="font-semibold text-emerald-600">115/125</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Leave Requests</span>
                                            <span className="font-semibold text-amber-600">4</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Student Performance Trend */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Student Performance Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={studentPerformance}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[60, 90]} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                                    <span className="text-emerald-600 font-medium">+10%</span>
                                    <span className="text-slate-500">improvement this term</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column - Tasks, Quick Pulse, Notices */}
                <div className="space-y-6">
                    {/* Fix 2: Quick Pulse Widget - Replaces At-Risk Students */}
                    <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-rose-700">
                                    <Zap className="h-4 w-4 text-rose-500" />
                                    Quick Pulse
                                </CardTitle>
                                <Badge className="bg-rose-500">Action Required</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickPulseItems.map((item, i) => (
                                <div key={i} className="bg-white border border-rose-100 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-rose-600">{item.count}</span>
                                            <div>
                                                <p className="text-sm font-medium">Students {item.issue}</p>
                                                <p className="text-[10px] text-muted-foreground">Class {item.class}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2 truncate">
                                        {item.students.join(', ')}
                                    </p>
                                    <Button
                                        size="sm"
                                        className="w-full bg-rose-500 hover:bg-rose-600 gap-1"
                                        onClick={() => handleNudgeAll(item)}
                                    >
                                        <Bell className="h-3 w-3" /> Nudge All
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Pending Tasks */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-amber-500" />
                                    Pending Tasks
                                </CardTitle>
                                <Badge variant="outline" className="text-amber-600 border-amber-200">{pendingTasks.length}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {pendingTasks.map((task, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${task.priority === 'high' ? 'bg-rose-500' :
                                        task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{task.title}</p>
                                        <p className="text-[10px] text-slate-500">{task.due}</p>
                                    </div>
                                    <Badge variant="outline" className="text-[10px]">{task.type}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Pending Approvals - Secondary position (checked once/day) */}
                    {approvals.length > 0 && (
                        <Card className="border-amber-200">
                            <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-amber-500" />
                                        Pending Approvals
                                    </CardTitle>
                                    <Badge className="bg-amber-500">{approvals.length}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 pt-3">
                                {approvals.map((approval) => (
                                    <div key={approval.id} className="bg-white border border-amber-100 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                                <span className="text-amber-600 font-semibold text-xs">
                                                    {approval.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{approval.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{approval.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="flex-1 h-7 text-xs bg-emerald-500 hover:bg-emerald-600 gap-1"
                                                onClick={() => handleApproval(approval.id, 'approve')}
                                            >
                                                <Check className="h-3 w-3" /> Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 h-7 text-xs text-rose-600 border-rose-200 hover:bg-rose-50 gap-1"
                                                onClick={() => handleApproval(approval.id, 'reject')}
                                            >
                                                <X className="h-3 w-3" /> Reject
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-purple-500" />
                                    Upcoming Events
                                </CardTitle>
                                <Link href="/faculty/notices" className="text-xs text-blue-600 hover:underline">View All</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${event.type === 'meeting' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                        }`}>
                                        {event.type === 'meeting' ? <Users className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{event.title}</p>
                                        <p className="text-[10px] text-slate-500">{event.date} • {event.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Notices */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Megaphone className="h-4 w-4 text-rose-500" />
                                Recent Notices
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {notices.map((notice, i) => (
                                <div key={i} className={`p-3 rounded-lg ${notice.type === 'meeting' ? 'bg-blue-50' :
                                    notice.type === 'exam' ? 'bg-purple-50' :
                                        'bg-amber-50'
                                    }`}>
                                    <p className={`text-sm font-medium ${notice.type === 'meeting' ? 'text-blue-700' :
                                        notice.type === 'exam' ? 'text-purple-700' :
                                            'text-amber-700'
                                        }`}>{notice.title}</p>
                                    <p className="text-[10px] text-slate-500">{notice.desc}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{notice.time}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
