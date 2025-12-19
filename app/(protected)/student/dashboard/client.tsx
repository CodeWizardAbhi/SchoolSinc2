"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BookOpen,
    Calendar,
    Clock,
    FileText,
    GraduationCap,
    User,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    Target,
    Award,
    CalendarDays,
    Swords,
    Play,
    Trophy,
    Scroll,
    Shield,
    ChevronLeft,
    Brain,
    Zap,
    Crown,
    Medal,
    MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

// ============ GAMIFICATION DATA ============

const rivalInfo = {
    name: "Rahul K.",
    rank: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    xpAhead: 20,
};

const continueLearning = [
    {
        id: 1,
        title: "Algebra II - Quadratic Equations",
        subject: "Mathematics",
        thumbnail: "📐",
        progress: 65,
        duration: "12:34",
        stoppedAt: "12:34",
        teacher: "Mr. Sharma",
        teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sharma",
    },
    {
        id: 2,
        title: "Chemical Reactions - Balancing",
        subject: "Chemistry",
        thumbnail: "⚗️",
        progress: 0,
        duration: "18:20",
        stoppedAt: null,
        missedTopic: true,
        teacher: "Mrs. Patel",
        teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patel",
    },
    {
        id: 3,
        title: "Shakespearean Sonnets",
        subject: "English",
        thumbnail: "📖",
        progress: 30,
        duration: "8:45",
        stoppedAt: "2:38",
        teacher: "Ms. Wilson",
        teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wilson",
    },
];

const dailyChallenge = {
    subject: "Trigonometry",
    topic: "Sin & Cos Functions",
    xpReward: 50,
    questionsCount: 5,
    timeLimit: "5 min",
};

const questsDueToday = [
    { title: "Physics Assignment Ch-5", type: "side", reward: 40, endsIn: "6 hrs" },
    { title: "Math Practice Set", type: "side", reward: 30, endsIn: "8 hrs" },
];

const questsUpcoming = [
    { title: "Mathematics Exam", type: "main", reward: 100, badge: "Math Master", endsIn: "2 days" },
    { title: "Science Project", type: "side", reward: 75, endsIn: "5 days" },
    { title: "English Essay", type: "side", reward: 50, endsIn: "7 days" },
];

type LeaderboardEntry = {
    rank: number;
    name: string;
    xp: number;
    avatar: string;
    isUser?: boolean;
    showGapBefore?: boolean;
};

const allLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Priya S.", xp: 3200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { rank: 2, name: "Amit J.", xp: 3050, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { rank: 3, name: "Sara M.", xp: 2900, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
    { rank: 4, name: "Rahul K.", xp: 2570, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { rank: 5, name: "You", xp: 2550, avatar: "", isUser: true },
];

function getSmartLeaderboard(): LeaderboardEntry[] {
    const top3 = allLeaderboard.filter(e => e.rank <= 3);
    const userEntry = allLeaderboard.find(e => e.isUser);
    const rivalEntry = allLeaderboard.find(e => e.rank === (userEntry?.rank || 0) - 1);
    if (!userEntry) return top3;
    if (userEntry.rank <= 4) return allLeaderboard.filter(e => e.rank <= 5);
    const result: LeaderboardEntry[] = [...top3];
    if (rivalEntry && rivalEntry.rank > 3) result.push({ ...rivalEntry, showGapBefore: true });
    result.push(userEntry);
    return result;
}

const subjectPerformance = [
    { subject: "Mathematics", score: 88, grade: "A", trend: "up", change: "+5%" },
    { subject: "Science", score: 82, grade: "A-", trend: "up", change: "+3%" },
    { subject: "English", score: 78, grade: "B+", trend: "down", change: "-2%" },
    { subject: "Social Studies", score: 85, grade: "A", trend: "up", change: "+7%" },
    { subject: "Nepali", score: 68, grade: "C+", trend: "down", change: "-3%", isWeakest: true },
];

const quickActions = [
    { label: "Exams", icon: Clock, color: "bg-purple-500", href: "/student/exams" },
    { label: "Leave", icon: Calendar, color: "bg-rose-500", href: "/student/leaves" },
    { label: "Resources", icon: BookOpen, color: "bg-blue-500", href: "/student/resources" },
    { label: "Reports", icon: FileText, color: "bg-emerald-500", href: "/student/reports" },
    { label: "Finance", icon: GraduationCap, color: "bg-amber-500", href: "/student/finance" },
    { label: "Profile", icon: User, color: "bg-slate-600", href: "/student/profile" },
];

interface StudentDashboardClientProps {
    userName: string;
}

export default function StudentDashboardClient({ userName }: StudentDashboardClientProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => { setIsMounted(true); }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 17) return "Good Afternoon";
        if (hour >= 17 && hour < 21) return "Good Evening";
        return "Good Night";
    };

    const currentDate = isMounted
        ? new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
        : "";

    const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % continueLearning.length);
    const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + continueLearning.length) % continueLearning.length);
    const smartLeaderboard = getSmartLeaderboard();
    const currentItem = continueLearning[carouselIndex];

    if (!isMounted) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
                </div>
            </div>
        );
    }

    // ============ SHARED COMPONENTS ============

    // Rival Alert Card
    const RivalAlertCard = () => (
        <Card className="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 border-rose-200 dark:border-rose-800">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                        <Avatar className="h-11 w-11 border-2 border-rose-300">
                            <AvatarImage src={rivalInfo.avatar} />
                            <AvatarFallback>{rivalInfo.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center border-2 border-white dark:border-slate-900">
                            <span className="text-[10px] font-bold text-white">#{rivalInfo.rank}</span>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-rose-700 dark:text-rose-300 truncate">
                            {rivalInfo.xpAhead} XP behind {rivalInfo.name}
                        </p>
                        <p className="text-[10px] text-rose-600 dark:text-rose-400">Complete a quiz to overtake!</p>
                    </div>
                    <Button size="sm" className="h-8 text-xs bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 font-semibold flex-shrink-0">
                        <Swords className="h-3 w-3 mr-1" />
                        Beat {rivalInfo.name.split(" ")[0]}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    // Daily XP Boost Card
    const DailyXPCard = () => (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-amber-600" />
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Daily XP Boost</span>
                    </div>
                    <Badge className="bg-amber-500 text-white text-[10px]">+{dailyChallenge.xpReward} XP</Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{dailyChallenge.subject} Quiz</h3>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mb-3">{dailyChallenge.topic}</p>
                <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-[10px] text-slate-500">
                        <span>{dailyChallenge.questionsCount} Qs</span>
                        <span>{dailyChallenge.timeLimit}</span>
                    </div>
                    <Button size="sm" className="h-7 text-xs bg-amber-600 hover:bg-amber-700">
                        <Zap className="h-3 w-3 mr-1" />
                        Start Quiz
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    // Leaderboard Card
    const LeaderboardCard = () => (
        <Card>
            <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Class Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
                <div className="space-y-1">
                    {smartLeaderboard.map((entry) => (
                        <div key={entry.rank}>
                            {entry.showGapBefore && (
                                <div className="flex items-center justify-center py-1.5 text-slate-400">
                                    <MoreHorizontal className="h-4 w-4" />
                                </div>
                            )}
                            <div className={`flex items-center justify-between p-2 rounded-lg transition-all ${entry.isUser
                                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-2 border-blue-300 dark:border-blue-700"
                                    : entry.rank === rivalInfo.rank
                                        ? "bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800"
                                        : "bg-slate-50 dark:bg-slate-900/50"
                                }`}>
                                <div className="flex items-center gap-2">
                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${entry.rank === 1 ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white" :
                                            entry.rank === 2 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white" :
                                                entry.rank === 3 ? "bg-gradient-to-br from-orange-400 to-amber-500 text-white" :
                                                    entry.isUser ? "bg-blue-500 text-white" :
                                                        "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                        }`}>
                                        {entry.rank === 1 ? <Crown className="h-3 w-3" /> :
                                            entry.rank === 2 ? <Medal className="h-3 w-3" /> :
                                                entry.rank === 3 ? <Medal className="h-3 w-3" /> :
                                                    `#${entry.rank}`}
                                    </div>
                                    {entry.isUser ? (
                                        <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                            <User className="h-3 w-3 text-blue-600" />
                                        </div>
                                    ) : (
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={entry.avatar} />
                                            <AvatarFallback className="text-[8px]">{entry.name.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <span className={`text-xs font-medium ${entry.isUser ? "text-blue-700 dark:text-blue-300 font-bold" : ""}`}>
                                        {entry.name}
                                    </span>
                                    {entry.isUser && <Badge className="text-[8px] bg-blue-500 text-white h-4 px-1">You</Badge>}
                                    {entry.rank === rivalInfo.rank && !entry.isUser && (
                                        <Badge className="text-[8px] bg-rose-500 text-white h-4 px-1">Rival</Badge>
                                    )}
                                </div>
                                <span className="text-xs font-semibold text-slate-500">{entry.xp.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    // Quick Actions Card
    const QuickActionsCard = () => (
        <Card>
            <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-semibold">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
                <div className="grid grid-cols-3 gap-2">
                    {quickActions.map((action, i) => (
                        <Link key={i} href={action.href} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className={`h-9 w-9 rounded-full ${action.color} flex items-center justify-center`}>
                                <action.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-4">
            {/* ============ HEADER ============ */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs">{getGreeting()},</p>
                        <h2 className="text-xl font-bold">{userName}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{currentDate}</span>
                        <span className="sm:hidden">{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <span className="text-slate-600">|</span>
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>Class 10-A</span>
                    </div>
                </div>
            </div>

            {/* ============ MOBILE LAYOUT (Vertical Stack) ============ */}
            <div className="lg:hidden space-y-4">
                {/* Section 1: Daily Missions */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">🎯 Daily Missions</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <DailyXPCard />
                    <RivalAlertCard />
                </div>

                {/* Section 2: Learning */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">📺 Pick Up Where You Left Off</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <Card>
                        <CardHeader className="py-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Play className="h-4 w-4 text-blue-500" />
                                    Continue Learning
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={prevSlide}>
                                        <ChevronLeft className="h-3 w-3" />
                                    </Button>
                                    <span className="text-[10px] text-slate-500">{carouselIndex + 1}/{continueLearning.length}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={nextSlide}>
                                        <ChevronRight className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 pb-4">
                            <div className="flex items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-4 text-white">
                                <div className="relative h-16 w-20 bg-slate-700/50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={currentItem.teacherAvatar} />
                                        <AvatarFallback className="bg-slate-600 text-white text-lg">{currentItem.thumbnail}</AvatarFallback>
                                    </Avatar>
                                    {currentItem.stoppedAt && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-0.5 px-1 text-center">
                                            <span className="text-[9px] text-amber-400 font-medium">▶ {currentItem.stoppedAt}</span>
                                        </div>
                                    )}
                                    {currentItem.missedTopic && (
                                        <div className="absolute top-0 left-0 right-0 bg-amber-500 py-0.5 text-center">
                                            <span className="text-[8px] text-white font-bold">MISSED</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-300">
                                            {currentItem.subject}
                                        </Badge>
                                    </div>
                                    <h3 className="text-sm font-semibold truncate">{currentItem.title}</h3>
                                    <p className="text-[10px] text-slate-400">
                                        {currentItem.progress > 0 ? `${currentItem.progress}% complete` : "Not started"}
                                    </p>
                                </div>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs h-8 px-3 flex-shrink-0">
                                    <Play className="h-3 w-3 mr-1" />
                                    {currentItem.progress > 0 ? "Resume" : "Start"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Section 3: Work (Active Quests) */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">📋 Your Work</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <Card>
                        <CardHeader className="py-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Scroll className="h-4 w-4 text-purple-500" />
                                    Active Quests
                                </CardTitle>
                                <Link href="/student/exams" className="text-xs text-blue-600 hover:underline">View All</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 pb-4 space-y-3">
                            {/* Due Today */}
                            {questsDueToday.length > 0 && (
                                <div className="bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 overflow-hidden">
                                    <div className="bg-rose-50 dark:bg-rose-950/30 px-3 py-2 border-b border-rose-200 dark:border-rose-800">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase">🔥 Due Today</span>
                                            <Badge className="text-[10px] bg-rose-500 text-white ml-auto">{questsDueToday.length}</Badge>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-rose-100 dark:divide-rose-900">
                                        {questsDueToday.map((quest, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 border-l-4 border-rose-500">
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <Target className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
                                                    <span className="text-xs font-medium truncate">{quest.title}</span>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <Badge variant="outline" className="text-[10px] border-emerald-300 text-emerald-600">+{quest.reward} XP</Badge>
                                                    <span className="text-[10px] text-rose-600 font-bold">⏱️ {quest.endsIn}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upcoming - limited on mobile */}
                            <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-lg overflow-hidden">
                                <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-slate-400" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase">📅 Upcoming</span>
                                        <Badge variant="outline" className="text-[10px] ml-auto">{questsUpcoming.length}</Badge>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {questsUpcoming.slice(0, 2).map((quest, i) => (
                                        <div key={i} className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                {quest.type === "main" ? <Shield className="h-3.5 w-3.5 text-purple-500" /> : <Target className="h-3.5 w-3.5 text-slate-400" />}
                                                <span className="text-xs font-medium truncate">{quest.title}</span>
                                                {quest.type === "main" && <Badge className="text-[10px] bg-purple-100 text-purple-700">⚔️ Main</Badge>}
                                            </div>
                                            <Badge variant="outline" className="text-[10px] border-emerald-300 text-emerald-600">+{quest.reward} XP</Badge>
                                        </div>
                                    ))}
                                    {questsUpcoming.length > 2 && (
                                        <div className="p-2 text-center">
                                            <Link href="/student/exams" className="text-xs text-blue-600 hover:underline">+{questsUpcoming.length - 2} more →</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions - Horizontal Scroll on Mobile */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">⚡ Quick Actions</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                        <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
                            {quickActions.map((action, i) => (
                                <Link key={i} href={action.href} className="flex flex-col items-center gap-1.5 min-w-[60px]">
                                    <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center shadow-md`}>
                                        <action.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-600">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <LeaderboardCard />

                {/* Subject Performance */}
                <Card>
                    <CardHeader className="py-3 px-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Award className="h-4 w-4 text-indigo-500" />
                                Subject Performance
                            </CardTitle>
                            <Link href="/student/performance" className="text-xs text-blue-600 hover:underline">Details</Link>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-4 pb-4">
                        <div className="grid grid-cols-2 gap-2">
                            {subjectPerformance.map((subject, i) => (
                                <div key={i} className={`p-2 rounded-lg border ${subject.isWeakest ? "border-rose-200 bg-rose-50" : "border-slate-100 bg-slate-50/50"}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-semibold truncate">{subject.subject}</span>
                                        <div className="flex items-center gap-1">
                                            <Badge variant="outline" className="text-[9px] h-4 px-1">{subject.grade}</Badge>
                                            {subject.isWeakest && (
                                                <Button size="icon" className="h-4 w-4 bg-rose-500 rounded-full">
                                                    <Zap className="h-2 w-2 text-white" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <Progress value={subject.score} className={`h-1 ${subject.isWeakest ? "[&>div]:bg-rose-500" : ""}`} />
                                    <div className="flex items-center justify-between mt-0.5">
                                        <span className="text-[10px] font-bold">{subject.score}%</span>
                                        <span className={`text-[9px] flex items-center ${subject.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                                            {subject.trend === "up" ? <TrendingUp className="h-2 w-2" /> : <TrendingDown className="h-2 w-2" />}
                                            {subject.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ============ DESKTOP LAYOUT (Newspaper 2-Column Grid) ============ */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                {/* LEFT COLUMN - Main Content (66%) */}
                <div className="lg:col-span-2 space-y-4">
                    {/* 1. Continue Learning Banner */}
                    <Card>
                        <CardHeader className="py-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Play className="h-4 w-4 text-blue-500" />
                                    Continue Learning
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={prevSlide}>
                                        <ChevronLeft className="h-3 w-3" />
                                    </Button>
                                    <span className="text-[10px] text-slate-500">{carouselIndex + 1}/{continueLearning.length}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={nextSlide}>
                                        <ChevronRight className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 pb-4">
                            <div className="flex items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-5 text-white">
                                <div className="relative h-20 w-28 bg-slate-700/50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <Avatar className="h-14 w-14">
                                        <AvatarImage src={currentItem.teacherAvatar} />
                                        <AvatarFallback className="bg-slate-600 text-white text-2xl">{currentItem.thumbnail}</AvatarFallback>
                                    </Avatar>
                                    {currentItem.stoppedAt && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 py-1 px-1 text-center">
                                            <span className="text-[10px] text-amber-400 font-medium">▶ {currentItem.stoppedAt}</span>
                                        </div>
                                    )}
                                    {currentItem.missedTopic && (
                                        <div className="absolute top-0 left-0 right-0 bg-amber-500 py-0.5 text-center">
                                            <span className="text-[9px] text-white font-bold">MISSED</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-300">
                                            {currentItem.subject}
                                        </Badge>
                                        <span className="text-[10px] text-slate-500">by {currentItem.teacher}</span>
                                    </div>
                                    <h3 className="text-base font-semibold mb-1">{currentItem.title}</h3>
                                    <p className="text-xs text-slate-400 mb-2">
                                        {currentItem.progress > 0 ? `${currentItem.progress}% complete` : "Not started"} • {currentItem.duration}
                                    </p>
                                    {currentItem.progress > 0 && (
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden max-w-xs">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${currentItem.progress}%` }} />
                                        </div>
                                    )}
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-sm h-10 px-5 flex-shrink-0">
                                    <Play className="h-4 w-4 mr-2" />
                                    {currentItem.progress > 0 ? "Resume" : "Start"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Active Quests List */}
                    <Card>
                        <CardHeader className="py-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Scroll className="h-4 w-4 text-purple-500" />
                                    Active Quests
                                </CardTitle>
                                <Link href="/student/exams" className="text-xs text-blue-600 hover:underline">View All</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 pb-4 space-y-4">
                            {/* Due Today */}
                            {questsDueToday.length > 0 && (
                                <div className="bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 overflow-hidden">
                                    <div className="bg-rose-50 dark:bg-rose-950/30 px-4 py-2.5 border-b border-rose-200 dark:border-rose-800">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">🔥 Due Today</span>
                                            <Badge className="text-[10px] bg-rose-500 text-white ml-auto">{questsDueToday.length}</Badge>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-rose-100 dark:divide-rose-900">
                                        {questsDueToday.map((quest, i) => (
                                            <div key={i} className="flex items-center justify-between p-3.5 border-l-4 border-rose-500 hover:bg-rose-50/50 transition-colors">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <Target className="h-4 w-4 text-rose-500 flex-shrink-0" />
                                                    <span className="text-sm font-medium">{quest.title}</span>
                                                </div>
                                                <div className="flex items-center gap-3 flex-shrink-0">
                                                    <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-600 bg-emerald-50">+{quest.reward} XP</Badge>
                                                    <span className="text-xs text-rose-600 font-bold font-mono">⏱️ {quest.endsIn}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upcoming */}
                            <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-lg overflow-hidden">
                                <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-slate-400" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">📅 Upcoming</span>
                                        <Badge variant="outline" className="text-[10px] ml-auto">{questsUpcoming.length}</Badge>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {questsUpcoming.map((quest, i) => (
                                        <div key={i} className="flex items-center justify-between p-3.5 border-l-4 border-transparent hover:border-slate-400 hover:bg-white/50 transition-all">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                {quest.type === "main" ? <Shield className="h-4 w-4 text-purple-500" /> : <Target className="h-4 w-4 text-slate-400" />}
                                                <span className="text-sm font-medium text-slate-700">{quest.title}</span>
                                                {quest.type === "main" && <Badge className="text-[10px] bg-purple-100 text-purple-700">⚔️ Main</Badge>}
                                            </div>
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-600">+{quest.reward} XP</Badge>
                                                {quest.badge && <Badge variant="outline" className="text-xs border-amber-300 text-amber-600"><Trophy className="h-3 w-3 mr-1" />{quest.badge}</Badge>}
                                                <span className="text-xs text-slate-500 font-mono">{quest.endsIn}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Subject Performance Grid */}
                    <Card>
                        <CardHeader className="py-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Award className="h-4 w-4 text-indigo-500" />
                                    Subject Performance
                                </CardTitle>
                                <Link href="/student/performance" className="text-xs text-blue-600 hover:underline">Details</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 pb-4">
                            <div className="grid grid-cols-3 gap-3">
                                {subjectPerformance.map((subject, i) => (
                                    <div key={i} className={`p-3 rounded-lg border ${subject.isWeakest ? "border-rose-200 bg-rose-50" : "border-slate-100 bg-slate-50/50"}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold">{subject.subject}</span>
                                            <div className="flex items-center gap-1">
                                                <Badge variant="outline" className="text-[10px] h-5">{subject.grade}</Badge>
                                                {subject.isWeakest && (
                                                    <Button size="icon" className="h-5 w-5 bg-rose-500 rounded-full">
                                                        <Zap className="h-2.5 w-2.5 text-white" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <Progress value={subject.score} className={`h-2 ${subject.isWeakest ? "[&>div]:bg-rose-500" : ""}`} />
                                        <div className="flex items-center justify-between mt-1.5">
                                            <span className="text-sm font-bold">{subject.score}%</span>
                                            <span className={`text-[10px] flex items-center ${subject.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                                                {subject.trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                                                {subject.change}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN - Gamification Sidebar (33%) */}
                <div className="space-y-4">
                    {/* 3. Rival Alert (Red) */}
                    <RivalAlertCard />

                    {/* 4. Daily XP Boost (Yellow) */}
                    <DailyXPCard />

                    {/* 6. Class Leaderboard */}
                    <LeaderboardCard />

                    {/* 7. Quick Actions */}
                    <QuickActionsCard />
                </div>
            </div>
        </div>
    );
}
