"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MatrixAttendance } from "@/components/faculty/matrix-attendance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import {
    Users,
    UserCheck,
    UserX,
    Clock,
    Calendar,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Download,
    BarChart3,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mock data
const attendanceStats = [
    { name: 'Present', value: 38, color: '#22c55e' },
    { name: 'Absent', value: 4, color: '#ef4444' },
    { name: 'Leave', value: 2, color: '#f59e0b' },
];

const weeklyTrend = [
    { day: 'Mon', present: 40, absent: 2 },
    { day: 'Tue', present: 38, absent: 4 },
    { day: 'Wed', present: 41, absent: 1 },
    { day: 'Thu', present: 39, absent: 3 },
    { day: 'Fri', present: 37, absent: 5 },
];

const lowAttendanceStudents = [
    { name: 'Rahul Kumar', attendance: 65, absences: 14, status: 'critical' },
    { name: 'Priya Singh', attendance: 72, absences: 11, status: 'warning' },
    { name: 'Amit Patel', attendance: 75, absences: 10, status: 'warning' },
];

export default function FacultyAttendancePage() {
    const [selectedMonth, setSelectedMonth] = useState("december");
    const [selectedClass, setSelectedClass] = useState("10a");

    const totalStudents = 44;
    const presentToday = 38;
    const absentToday = 4;
    const onLeave = 2;
    const attendancePercentage = Math.round((presentToday / totalStudents) * 100);

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <PageHeader
                    breadcrumb="Home / Attendance"
                    title="Attendance Sheet"
                    subtitle="Manage and track student attendance"
                />
                <div className="flex flex-wrap gap-2">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[130px] text-xs sm:text-sm h-9">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="december">December 2024</SelectItem>
                            <SelectItem value="november">November 2024</SelectItem>
                            <SelectItem value="october">October 2024</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-[100px] text-xs sm:text-sm h-9">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10a">Class 10-A</SelectItem>
                            <SelectItem value="10b">Class 10-B</SelectItem>
                            <SelectItem value="9a">Class 9-A</SelectItem>
                            <SelectItem value="9b">Class 9-B</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Total Students</p>
                                <p className="text-xl font-bold">{totalStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Present Today</p>
                                <p className="text-xl font-bold text-emerald-600">{presentToday}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center">
                                <UserX className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Absent Today</p>
                                <p className="text-xl font-bold text-rose-600">{absentToday}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">On Leave</p>
                                <p className="text-xl font-bold text-amber-600">{onLeave}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Attendance Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Mark Section */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    Quick Attendance
                                </CardTitle>
                                <Badge variant="outline" className="text-xs">
                                    Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3 mb-4">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2">
                                    <CheckCircle2 className="h-4 w-4" /> Mark All Present
                                </Button>
                                <Button variant="outline" className="gap-2">
                                    <UserX className="h-4 w-4" /> Mark Individual
                                </Button>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                                <div>
                                    <p className="font-medium text-emerald-800">Attendance for Class 10-A is complete</p>
                                    <p className="text-xs text-emerald-600">Submitted at 10:30 AM today</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Attendance Matrix */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Monthly Attendance Matrix</CardTitle>
                                <Badge className="bg-blue-500">Class 10-A</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 sm:p-6 sm:pt-0">
                            <MatrixAttendance />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Analytics */}
                <div className="space-y-6">
                    {/* Today's Overview - Pie Chart */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-purple-500" />
                                Today&apos;s Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="relative h-28 w-28 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={attendanceStats}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={35}
                                                outerRadius={50}
                                                startAngle={90}
                                                endAngle={-270}
                                                dataKey="value"
                                            >
                                                {attendanceStats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-emerald-600">{attendancePercentage}%</span>
                                        <span className="text-[10px] text-slate-400">Present</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {attendanceStats.map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stat.color }}></span>
                                                {stat.name}
                                            </span>
                                            <span className="font-semibold">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Trend */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                                Weekly Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="present" fill="#22c55e" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="absent" fill="#ef4444" radius={[2, 2, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Low Attendance Students */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-rose-500" />
                                    Low Attendance Alert
                                </CardTitle>
                                <Badge variant="outline" className="text-rose-600 border-rose-200 text-[10px]">{lowAttendanceStudents.length} Students</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {lowAttendanceStudents.map((student, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${student.status === 'critical' ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'
                                    }`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">{student.name}</span>
                                        <Badge className={`text-[10px] ${student.status === 'critical' ? 'bg-rose-500' : 'bg-amber-500'
                                            }`}>
                                            {student.attendance}%
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="text-slate-500">{student.absences} absences this month</span>
                                        <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600">
                                            Notify Parent
                                        </Button>
                                    </div>
                                    <Progress value={student.attendance} className="h-1.5 mt-2" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
