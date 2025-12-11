"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import {
    Search,
    Users,
    TrendingUp,
    BarChart3,
    Target,
    AlertTriangle,
    CheckCircle2,
    Star,
    Send,
    MessageSquare,
    Phone,
    Mail,
    GraduationCap,
    Award,
    Clock,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

// Mock data
const students = [
    { id: 'ST001', name: 'Rahul Kumar', class: '10-A', rollNo: 15, attendance: 92, avgScore: 85, status: 'excellent', image: 'rahul' },
    { id: 'ST002', name: 'Priya Singh', class: '10-A', rollNo: 18, attendance: 88, avgScore: 78, status: 'good', image: 'priya' },
    { id: 'ST003', name: 'Amit Patel', class: '10-A', rollNo: 8, attendance: 65, avgScore: 62, status: 'at-risk', image: 'amit' },
    { id: 'ST004', name: 'Neha Sharma', class: '10-A', rollNo: 22, attendance: 95, avgScore: 92, status: 'excellent', image: 'neha' },
    { id: 'ST005', name: 'Vikram Singh', class: '10-A', rollNo: 28, attendance: 72, avgScore: 68, status: 'needs-attention', image: 'vikram' },
    { id: 'ST006', name: 'Anjali Gupta', class: '10-A', rollNo: 5, attendance: 90, avgScore: 82, status: 'good', image: 'anjali' },
];

const performanceHistory = [
    { month: 'Aug', score: 72 },
    { month: 'Sep', score: 78 },
    { month: 'Oct', score: 75 },
    { month: 'Nov', score: 82 },
    { month: 'Dec', score: 85 },
];

const subjectScores = [
    { subject: 'Math', score: 88 },
    { subject: 'Science', score: 82 },
    { subject: 'English', score: 75 },
    { subject: 'Hindi', score: 78 },
    { subject: 'Social', score: 85 },
];

const recentActivity = [
    { type: 'assignment', title: 'Submitted Math Assignment', date: 'Dec 10', status: 'on-time' },
    { type: 'test', title: 'Unit Test - Science', date: 'Dec 08', score: '42/50' },
    { type: 'attendance', title: 'Absent from class', date: 'Dec 05', status: 'excused' },
    { type: 'achievement', title: 'Won Math Quiz', date: 'Dec 02', status: 'award' },
];

export default function FacultyStudentsPage() {
    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [feedback, setFeedback] = useState("");

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toString().includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Students"
                title="Student Details"
                subtitle="View performance and provide feedback"
            />

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
                                <p className="text-xl font-bold">{students.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Avg Performance</p>
                                <p className="text-xl font-bold text-emerald-600">78%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">At-Risk</p>
                                <p className="text-xl font-bold text-amber-600">2</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Award className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Top Performers</p>
                                <p className="text-xl font-bold text-purple-600">4</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Student List */}
                <div className="lg:col-span-1">
                    <Card className="h-fit">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Class 10-A</CardTitle>
                                <Select defaultValue="10a">
                                    <SelectTrigger className="w-24 h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10a">10-A</SelectItem>
                                        <SelectItem value="10b">10-B</SelectItem>
                                        <SelectItem value="9a">9-A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by name or roll no..."
                                    className="pl-9 h-9 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                {filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedStudent.id === student.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'hover:bg-slate-50'
                                            }`}
                                        onClick={() => setSelectedStudent(student)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.image}`} />
                                                <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{student.name}</p>
                                                <p className="text-[10px] text-muted-foreground">Roll No: {student.rollNo}</p>
                                            </div>
                                            <Badge className={`text-[10px] ${student.status === 'excellent' ? 'bg-emerald-500' :
                                                student.status === 'good' ? 'bg-blue-500' :
                                                    student.status === 'at-risk' ? 'bg-rose-500' :
                                                        'bg-amber-500'
                                                }`}>
                                                {student.avgScore}%
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Student Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Student Profile Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.image}`} />
                                    <AvatarFallback>{selectedStudent.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Class {selectedStudent.class} | Roll No: {selectedStudent.rollNo}
                                            </p>
                                        </div>
                                        <Badge className={`${selectedStudent.status === 'excellent' ? 'bg-emerald-500' :
                                            selectedStudent.status === 'good' ? 'bg-blue-500' :
                                                selectedStudent.status === 'at-risk' ? 'bg-rose-500' :
                                                    'bg-amber-500'
                                            }`}>
                                            {selectedStudent.status === 'excellent' ? 'Excellent' :
                                                selectedStudent.status === 'good' ? 'Good' :
                                                    selectedStudent.status === 'at-risk' ? 'At Risk' : 'Needs Attention'}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="text-center p-3 rounded-lg bg-slate-50">
                                            <p className="text-2xl font-bold text-blue-600">{selectedStudent.avgScore}%</p>
                                            <p className="text-[10px] text-muted-foreground">Avg Score</p>
                                        </div>
                                        <div className="text-center p-3 rounded-lg bg-slate-50">
                                            <p className="text-2xl font-bold text-emerald-600">{selectedStudent.attendance}%</p>
                                            <p className="text-[10px] text-muted-foreground">Attendance</p>
                                        </div>
                                        <div className="text-center p-3 rounded-lg bg-slate-50">
                                            <p className="text-2xl font-bold text-purple-600">5th</p>
                                            <p className="text-[10px] text-muted-foreground">Class Rank</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <Phone className="h-3 w-3" /> Call Parent
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <Mail className="h-3 w-3" /> Send Email
                                </Button>
                                <Button size="sm" className="flex-1 gap-1 bg-[#0f172a]">
                                    <GraduationCap className="h-3 w-3" /> Full Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Performance Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={performanceHistory}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[60, 100]} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-purple-500" />
                                    Subject Strength
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={subjectScores}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                                            <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} strokeWidth={2} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity & Feedback */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-amber-500" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50">
                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                                            activity.type === 'test' ? 'bg-purple-100 text-purple-600' :
                                                activity.type === 'attendance' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                            }`}>
                                            {activity.type === 'achievement' ? <Star className="h-4 w-4" /> :
                                                activity.type === 'test' ? <Target className="h-4 w-4" /> :
                                                    <CheckCircle2 className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-[10px] text-muted-foreground">{activity.date}</p>
                                        </div>
                                        {activity.score && (
                                            <Badge variant="outline" className="text-[10px]">{activity.score}</Badge>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    Send Feedback
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Textarea
                                    placeholder="Write feedback for the student or parent..."
                                    className="min-h-[100px] text-sm"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <Select defaultValue="general">
                                        <SelectTrigger className="w-32 h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="academic">Academic</SelectItem>
                                            <SelectItem value="behavior">Behavior</SelectItem>
                                            <SelectItem value="appreciation">Appreciation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-1">
                                        <Send className="h-4 w-4" /> Send Feedback
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
