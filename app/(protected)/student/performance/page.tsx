"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    ChevronDown,
    TrendingUp,
    TrendingDown,
    Award,
    Target,
    BookOpen,
    Star,
    Trophy,
    BarChart3,
    FileText,
    Calendar,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from 'recharts';
import { PageHeader } from "@/components/ui/page-header";

// Mock data
const performanceData = [
    { term: 'Term 1', marks: 78 },
    { term: 'Term 2', marks: 82 },
    { term: 'Term 3', marks: 80 },
    { term: 'Term 4', marks: 85 },
];

const monthlyProgress = [
    { month: 'Jul', score: 72 },
    { month: 'Aug', score: 75 },
    { month: 'Sep', score: 78 },
    { month: 'Oct', score: 76 },
    { month: 'Nov', score: 82 },
    { month: 'Dec', score: 85 },
];

const subjectPerformance = [
    { subject: 'Math', fullMark: 100, score: 88, grade: 'A', trend: 'up' },
    { subject: 'Science', fullMark: 100, score: 82, grade: 'A-', trend: 'up' },
    { subject: 'English', fullMark: 100, score: 78, grade: 'B+', trend: 'down' },
    { subject: 'Hindi', fullMark: 100, score: 75, grade: 'B+', trend: 'same' },
    { subject: 'Social', fullMark: 100, score: 85, grade: 'A', trend: 'up' },
    { subject: 'Computer', fullMark: 100, score: 92, grade: 'A+', trend: 'up' },
];

const radarData = subjectPerformance.map(s => ({ subject: s.subject, score: s.score }));

const recentExams = [
    { name: 'Unit Test 4 - Mathematics', date: 'Dec 05, 2024', score: 42, maxScore: 50, percentage: 84 },
    { name: 'Practical - Science', date: 'Dec 02, 2024', score: 28, maxScore: 30, percentage: 93 },
    { name: 'Assignment - English', date: 'Nov 28, 2024', score: 18, maxScore: 20, percentage: 90 },
    { name: 'Mid Term - Hindi', date: 'Nov 20, 2024', score: 72, maxScore: 100, percentage: 72 },
];

const achievements = [
    { title: 'Math Champion', desc: 'Topped class in Mathematics', icon: Trophy, color: 'text-amber-500 bg-amber-100' },
    { title: 'Perfect Attendance', desc: 'No absences this month', icon: Star, color: 'text-blue-500 bg-blue-100' },
    { title: 'Assignment Pro', desc: 'Submitted all on time', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-100' },
];

const improvements = [
    { subject: 'English', area: 'Grammar & Writing', suggestion: 'Practice essay writing daily' },
    { subject: 'Hindi', area: 'Literature', suggestion: 'Read more Hindi poetry' },
];

export default function StudentPerformance() {
    const overallAverage = Math.round(subjectPerformance.reduce((acc, s) => acc + s.score, 0) / subjectPerformance.length);

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Performance"
                title="Performance Overview"
                subtitle="Track your academic progress and achievements"
            />

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold">{overallAverage}%</span>
                        <span className="text-xs text-blue-100 mt-1">Overall Average</span>
                        <div className="flex items-center gap-1 mt-2 text-xs">
                            <TrendingUp className="h-3 w-3" />
                            <span>+5% from last term</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold">A</span>
                        <span className="text-xs text-emerald-100 mt-1">Current Grade</span>
                        <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 opacity-40" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold">5th</span>
                        <span className="text-xs text-purple-100 mt-1">Class Rank</span>
                        <div className="flex items-center gap-1 mt-2 text-xs">
                            <TrendingUp className="h-3 w-3" />
                            <span>Up 2 positions</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-4xl font-bold">18/20</span>
                        <span className="text-xs text-amber-100 mt-1">Tests Taken</span>
                        <Progress value={90} className="mt-2 h-1.5 bg-white/30" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Charts */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Performance Trend */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Performance Trend
                                </CardTitle>
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                    2024 <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyProgress}>
                                        <defs>
                                            <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[60, 100]} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPerf)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subject Performance */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-purple-500" />
                                    Subject-wise Performance
                                </CardTitle>
                                <Badge variant="outline">Term 2</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {subjectPerformance.map((subject, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium w-20">{subject.subject}</span>
                                                <Badge variant="outline" className="text-xs font-bold">{subject.grade}</Badge>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs flex items-center gap-0.5 ${subject.trend === 'up' ? 'text-emerald-600' :
                                                    subject.trend === 'down' ? 'text-rose-600' : 'text-slate-500'
                                                    }`}>
                                                    {subject.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                                                    {subject.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                                                    {subject.trend === 'up' ? '+5%' : subject.trend === 'down' ? '-3%' : '0%'}
                                                </span>
                                                <span className="text-sm font-bold w-10 text-right">{subject.score}%</span>
                                            </div>
                                        </div>
                                        <Progress value={subject.score} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Exams */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-amber-500" />
                                    Recent Exam Results
                                </CardTitle>
                                <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600">View All</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentExams.map((exam, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{exam.name}</p>
                                            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {exam.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-semibold">{exam.score}/{exam.maxScore}</p>
                                                <p className="text-[10px] text-muted-foreground">{exam.percentage}%</p>
                                            </div>
                                            <Badge className={`${exam.percentage >= 90 ? 'bg-emerald-500' :
                                                exam.percentage >= 75 ? 'bg-blue-500' :
                                                    exam.percentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                                                }`}>
                                                {exam.percentage >= 90 ? 'A+' :
                                                    exam.percentage >= 80 ? 'A' :
                                                        exam.percentage >= 70 ? 'B+' : 'B'}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Radar, Achievements, Improvements */}
                <div className="space-y-6">
                    {/* Skill Radar */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Target className="h-4 w-4 text-indigo-500" />
                                Subject Strength
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-52">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} strokeWidth={2} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-xs text-muted-foreground">Strongest: <span className="font-semibold text-emerald-600">Computer Science</span></p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Award className="h-4 w-4 text-amber-500" />
                                Recent Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {achievements.map((achievement, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50/50">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${achievement.color}`}>
                                        <achievement.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{achievement.title}</p>
                                        <p className="text-[10px] text-muted-foreground">{achievement.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Areas for Improvement */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                Areas for Improvement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {improvements.map((item, i) => (
                                <div key={i} className="p-3 rounded-lg border border-amber-200 bg-amber-50">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{item.subject}</span>
                                        <Badge variant="outline" className="text-[10px] text-amber-700 border-amber-300">{item.area}</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-600">{item.suggestion}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Term Comparison */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold">Term Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[60, 100]} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="marks" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
