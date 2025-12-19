"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Crown,
    Medal,
    Trophy,
    TrendingUp,
    TrendingDown,
    Minus,
    Zap,
    Timer,
    ChevronRight,
    Gem,
    Star,
} from "lucide-react";

// ============ LEADERBOARD DATA ============

const topThree = [
    { rank: 1, name: "Priya S.", xp: 3200, weeklyXp: 450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", level: 12 },
    { rank: 2, name: "Amit J.", xp: 3050, weeklyXp: 380, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit", level: 11 },
    { rank: 3, name: "Sara M.", xp: 2900, weeklyXp: 320, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", level: 11 },
];

// Full ladder data
const allStudents = [
    { rank: 1, name: "Priya S.", xp: 3200, weeklyXp: 450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", level: 12, trend: 0 },
    { rank: 2, name: "Amit J.", xp: 3050, weeklyXp: 380, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit", level: 11, trend: 1 },
    { rank: 3, name: "Sara M.", xp: 2900, weeklyXp: 320, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", level: 11, trend: -1 },
    { rank: 4, name: "Rahul K.", xp: 2570, weeklyXp: 280, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", level: 10, trend: 2 },
    { rank: 5, name: "Neha T.", xp: 2550, weeklyXp: 260, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha", level: 10, trend: 0 },
    { rank: 6, name: "Karan P.", xp: 2480, weeklyXp: 240, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan", level: 9, trend: -2 },
    { rank: 7, name: "Riya S.", xp: 2400, weeklyXp: 220, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya", level: 9, trend: 1 },
    { rank: 8, name: "Vikram M.", xp: 2350, weeklyXp: 200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram", level: 9, trend: 0 },
    { rank: 9, name: "Anjali D.", xp: 2300, weeklyXp: 190, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali", level: 8, trend: 3 },
    { rank: 10, name: "Rohit G.", xp: 2250, weeklyXp: 180, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit", level: 8, trend: -1 },
    { rank: 11, name: "Pooja R.", xp: 2200, weeklyXp: 170, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja", level: 8, trend: 0 },
    { rank: 12, name: "Arjun S.", xp: 2150, weeklyXp: 160, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun", level: 7, trend: 2 },
    { rank: 13, name: "Meera K.", xp: 2100, weeklyXp: 150, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera", level: 7, trend: -2 },
    { rank: 14, name: "Suresh B.", xp: 2050, weeklyXp: 140, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh", level: 7, trend: 1 },
    { rank: 15, name: "You", xp: 2010, weeklyXp: 130, avatar: "", level: 7, trend: -1, isUser: true },
    { rank: 16, name: "Deepak V.", xp: 1980, weeklyXp: 120, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak", level: 6, trend: 0 },
    { rank: 17, name: "Kavita N.", xp: 1950, weeklyXp: 110, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita", level: 6, trend: 1 },
];

const userRank = 15;
const xpToNextRank = 40;

const leagues = [
    { id: "class", label: "Class 10-A", count: 35 },
    { id: "grade", label: "Grade 10 Global", count: 280 },
    { id: "math", label: "Math League", count: 120 },
];

const leagueBadge = { name: "Diamond League", icon: Gem, color: "text-cyan-500", bgColor: "bg-cyan-50" };
const weeklyResetDays = 2;
const weeklyResetHours = 4;

export default function LeaderboardPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeLeague, setActiveLeague] = useState("class");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Get focused ladder (Top 3 + gap + Target + User + Chaser)
    const getFocusedLadder = () => {
        const top3 = allStudents.filter((s) => s.rank <= 3);
        const userEntry = allStudents.find((s) => s.isUser);
        if (!userEntry) return allStudents.slice(0, 10);

        const target = allStudents.find((s) => s.rank === userEntry.rank - 1);
        const chaser = allStudents.find((s) => s.rank === userEntry.rank + 1);

        if (userEntry.rank <= 5) {
            return allStudents.slice(0, 7);
        }

        return [
            ...top3,
            { isGap: true },
            target,
            userEntry,
            chaser,
        ].filter(Boolean);
    };

    const focusedLadder = getFocusedLadder();

    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-16" />
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-48 lg:pb-6">
            {/* ============ SECTION 1: THE PODIUM ============ */}
            {/* Mobile: Compact Row */}
            <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between gap-2 px-1">
                    {/* Rank 2 */}
                    <div className="flex-1 flex flex-col items-center bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-400 mb-2">#2</span>
                        <Avatar className="h-10 w-10 mb-2 border-2 border-slate-300">
                            <AvatarImage src={topThree[1].avatar} />
                            <AvatarFallback>{topThree[1].name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 text-center truncate w-full">{topThree[1].name}</span>
                        <span className="text-[10px] text-slate-500">{topThree[1].weeklyXp} XP</span>
                    </div>

                    {/* Rank 1 */}
                    <div className="flex-1 flex flex-col items-center bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-800 rounded-xl p-3 shadow-md border border-amber-200 dark:border-amber-500/30 relative transform -translate-y-2">
                        <Crown className="h-4 w-4 text-amber-500 absolute -top-2" />
                        <span className="text-sm font-bold text-amber-500 mb-1">#1</span>
                        <Avatar className="h-12 w-12 mb-2 border-2 border-amber-400">
                            <AvatarImage src={topThree[0].avatar} />
                            <AvatarFallback>{topThree[0].name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 text-center truncate w-full">{topThree[0].name}</span>
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-500">{topThree[0].weeklyXp} XP</span>
                    </div>

                    {/* Rank 3 */}
                    <div className="flex-1 flex flex-col items-center bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-400 mb-2">#3</span>
                        <Avatar className="h-10 w-10 mb-2 border-2 border-orange-300">
                            <AvatarImage src={topThree[2].avatar} />
                            <AvatarFallback>{topThree[2].name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 text-center truncate w-full">{topThree[2].name}</span>
                        <span className="text-[10px] text-slate-500">{topThree[2].weeklyXp} XP</span>
                    </div>
                </div>
            </div>

            {/* Desktop: Full Arena Illustration */}
            <Card className="hidden lg:block bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-0 overflow-hidden">
                <CardContent className="pt-8 pb-6 px-6">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-1">🏆 The Arena</h1>
                        <p className="text-sm text-slate-400">Weekly Champions</p>
                    </div>

                    {/* Podium */}
                    <div className="flex items-end justify-center gap-4 lg:gap-8">
                        {/* Rank 2 - Silver (Left) */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-2">
                                <Avatar className="h-16 w-16 lg:h-20 lg:w-20 border-4 border-slate-400 shadow-lg">
                                    <AvatarImage src={topThree[1].avatar} />
                                    <AvatarFallback className="bg-slate-600 text-white text-lg">{topThree[1].name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center border-2 border-slate-800 shadow-md">
                                    <Medal className="h-4 w-4 text-slate-800" />
                                </div>
                            </div>
                            <p className="text-white font-semibold text-sm text-center">{topThree[1].name}</p>
                            <p className="text-slate-400 text-xs">{topThree[1].weeklyXp} XP</p>
                            {/* Pedestal */}
                            <div className="mt-3 w-20 lg:w-24 h-16 bg-gradient-to-t from-slate-600 to-slate-500 rounded-t-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-white/80">2</span>
                            </div>
                        </div>

                        {/* Rank 1 - Gold (Center) */}
                        <div className="flex flex-col items-center -mt-4">
                            <div className="relative mb-2">
                                {/* Crown */}
                                <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 h-7 w-7 text-amber-400 animate-pulse" />
                                {/* Avatar with shimmer effect */}
                                <div className="relative">
                                    <Avatar className="h-20 w-20 lg:h-28 lg:w-28 border-4 border-amber-400 shadow-xl ring-4 ring-amber-400/30">
                                        <AvatarImage src={topThree[0].avatar} />
                                        <AvatarFallback className="bg-amber-600 text-white text-xl">{topThree[0].name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    {/* Shimmer overlay */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center border-2 border-slate-800 shadow-md">
                                    <Trophy className="h-4 w-4 text-amber-900" />
                                </div>
                            </div>
                            <p className="text-white font-bold text-base text-center">{topThree[0].name}</p>
                            <p className="text-amber-400 text-sm font-semibold">{topThree[0].weeklyXp} XP</p>
                            {/* Pedestal */}
                            <div className="mt-3 w-24 lg:w-32 h-24 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg flex items-center justify-center shadow-lg">
                                <span className="text-3xl font-bold text-white">1</span>
                            </div>
                        </div>

                        {/* Rank 3 - Bronze (Right) */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-2">
                                <Avatar className="h-16 w-16 lg:h-20 lg:w-20 border-4 border-orange-400 shadow-lg">
                                    <AvatarImage src={topThree[2].avatar} />
                                    <AvatarFallback className="bg-orange-600 text-white text-lg">{topThree[2].name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center border-2 border-slate-800 shadow-md">
                                    <Medal className="h-4 w-4 text-orange-900" />
                                </div>
                            </div>
                            <p className="text-white font-semibold text-sm text-center">{topThree[2].name}</p>
                            <p className="text-slate-400 text-xs">{topThree[2].weeklyXp} XP</p>
                            {/* Pedestal */}
                            <div className="mt-3 w-20 lg:w-24 h-12 bg-gradient-to-t from-orange-700 to-orange-500 rounded-t-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-white/80">3</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ============ SECTION 2: LEAGUE SWITCHER ============ */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* League Tabs - Mobile Scrollable Pills */}
                        <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                            {leagues.map((league) => (
                                <button
                                    key={league.id}
                                    onClick={() => setActiveLeague(league.id)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${activeLeague === league.id
                                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md transform scale-105"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {league.label}
                                    <span className={`ml-2 text-[10px] ${activeLeague === league.id ? "text-slate-300 dark:text-slate-500" : "text-slate-400"}`}>({league.count})</span>
                                </button>
                            ))}
                        </div>

                        {/* League Badge & Timer */}
                        <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                            {/* League Badge */}
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${leagueBadge.bgColor}`}>
                                <leagueBadge.icon className={`h-4 w-4 ${leagueBadge.color}`} />
                                <span className={`text-xs font-semibold ${leagueBadge.color}`}>{leagueBadge.name}</span>
                            </div>

                            {/* Weekly Reset Timer */}
                            <div className="flex items-center gap-1.5 text-slate-500">
                                <Timer className="h-4 w-4" />
                                <span className="text-xs">Reset: <span className="font-semibold text-slate-700 dark:text-slate-300">{weeklyResetDays}d {weeklyResetHours}h</span></span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ============ SECTION 3: THE LADDER ============ */}
            <Card>
                <CardContent className="p-0">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase">
                        <div className="col-span-3 lg:col-span-1">#</div>
                        <div className="hidden lg:block col-span-1">Trend</div>
                        <div className="col-span-6 lg:col-span-5">Student</div>
                        <div className="hidden lg:block col-span-2 text-center">Level</div>
                        <div className="col-span-3 text-right">XP</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {focusedLadder.map((entry: any) => {
                            if (entry.isGap) {
                                return (
                                    <div key="gap" className="flex items-center justify-center py-3 text-slate-400">
                                        <span className="text-lg tracking-widest">• • •</span>
                                    </div>
                                );
                            }

                            const isUser = entry.isUser;
                            const isTarget = entry.rank === userRank - 1;
                            const isChaser = entry.rank === userRank + 1;

                            return (
                                <div
                                    key={entry.rank}
                                    className={`grid grid-cols-12 gap-2 px-4 py-3 items-center transition-all ${isUser
                                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-l-4 border-blue-500"
                                        : isTarget
                                            ? "bg-rose-50/50 dark:bg-rose-950/20 border-l-4 border-rose-400"
                                            : isChaser
                                                ? "bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-400"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-900/50 border-l-4 border-transparent"
                                        }`}
                                >
                                    {/* Rank (Combined with Trend on Mobile) */}
                                    <div className="col-span-3 lg:col-span-1 flex items-center gap-1">
                                        <span className={`text-sm font-bold ${entry.rank === 1 ? "text-amber-500" :
                                            entry.rank === 2 ? "text-slate-400" :
                                                entry.rank === 3 ? "text-orange-500" :
                                                    isUser ? "text-blue-600" :
                                                        "text-slate-600 dark:text-slate-400"
                                            }`}>
                                            #{entry.rank}
                                        </span>
                                        {/* Mobile Trend Icon */}
                                        <span className="lg:hidden">
                                            {entry.trend > 0 ? (
                                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                            ) : entry.trend < 0 ? (
                                                <TrendingDown className="h-3 w-3 text-rose-500" />
                                            ) : (
                                                <Minus className="h-3 w-3 text-slate-300" />
                                            )}
                                        </span>
                                    </div>

                                    {/* Trend (Desktop Only) */}
                                    <div className="hidden lg:block col-span-1">
                                        {entry.trend > 0 ? (
                                            <div className="flex items-center text-emerald-500">
                                                <TrendingUp className="h-3.5 w-3.5" />
                                                <span className="text-xs ml-0.5">{entry.trend}</span>
                                            </div>
                                        ) : entry.trend < 0 ? (
                                            <div className="flex items-center text-rose-500">
                                                <TrendingDown className="h-3.5 w-3.5" />
                                                <span className="text-xs ml-0.5">{Math.abs(entry.trend)}</span>
                                            </div>
                                        ) : (
                                            <Minus className="h-3.5 w-3.5 text-slate-300" />
                                        )}
                                    </div>

                                    {/* Student (Stacked on Mobile) */}
                                    <div className="col-span-6 lg:col-span-5 flex items-center gap-2">
                                        {isUser ? (
                                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                                <Star className="h-4 w-4 text-blue-600" />
                                            </div>
                                        ) : (
                                            <Avatar className="h-8 w-8 flex-shrink-0">
                                                <AvatarImage src={entry.avatar} />
                                                <AvatarFallback className="text-xs">{entry.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-2">
                                            <span className={`text-xs lg:text-sm font-medium ${isUser ? "text-blue-700 dark:text-blue-300 font-bold" : "truncate max-w-[100px] lg:max-w-none"}`}>
                                                {entry.name}
                                            </span>
                                            <div className="flex">
                                                {isUser && <Badge className="text-[9px] h-4 lg:text-[10px] lg:h-5 px-1 lg:px-1.5 bg-blue-500 text-white">You</Badge>}
                                                {isTarget && <Badge className="text-[9px] h-4 lg:text-[10px] lg:h-5 px-1 lg:px-1.5 bg-rose-500 text-white">Target</Badge>}
                                                {isChaser && <Badge className="text-[9px] h-4 lg:text-[10px] lg:h-5 px-1 lg:px-1.5 bg-amber-500 text-white">Chasing</Badge>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Level (Desktop Only) */}
                                    <div className="hidden lg:block col-span-2 text-center">
                                        <Badge variant="outline" className="text-xs">Lv.{entry.level}</Badge>
                                    </div>

                                    {/* Weekly XP */}
                                    <div className="col-span-3 text-right">
                                        <span className={`text-xs lg:text-sm font-semibold ${entry.rank <= 3 ? "text-amber-600" :
                                            isUser ? "text-blue-600" :
                                                "text-slate-600 dark:text-slate-400"
                                            }`}>
                                            {entry.weeklyXp} XP
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View All Button */}
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                        <Button variant="outline" className="w-full text-sm">
                            View Full Leaderboard
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* ============ SECTION 4: FLOATING ACTION FOOTER ============ */}
            {/* Wrapper for Fixed Mobile Elements */}
            <div className="fixed bottom-0 left-0 right-0 z-30 lg:static lg:z-auto">
                {/* Sticky Me Row for Mobile (Stacked above footer) */}
                <div className="lg:hidden px-2 pb-2">
                    <div className="bg-blue-900/95 text-white backdrop-blur-md rounded-xl shadow-2xl border border-blue-700/50 p-3 flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center min-w-[30px]">
                                <span className="text-xs font-bold text-blue-200">#{userRank}</span>
                                <Minus className="h-3 w-3 text-blue-300" />
                            </div>
                            <Avatar className="h-8 w-8 border border-blue-400">
                                <AvatarFallback className="bg-blue-700 text-white font-bold">Yo</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold">You</span>
                                <span className="text-[10px] text-blue-200">Level {allStudents.find(s => s.isUser)?.level}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold block">{allStudents.find(s => s.isUser)?.weeklyXp} XP</span>
                            <span className="text-[10px] text-blue-300">Target: #14 (40XP)</span>
                        </div>
                    </div>
                </div>

                {/* Quick Quiz Footer */}
                <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 lg:rounded-xl lg:shadow-sm lg:border">
                    <div className="flex items-center justify-between gap-4 max-w-3xl mx-auto">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/30 dark:to-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="h-5 w-5 text-rose-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    <span className="text-rose-600">{xpToNextRank} XP</span> to Rank {userRank - 1}
                                </p>
                                <p className="text-xs text-slate-500 truncate">Complete a quiz to climb!</p>
                            </div>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg flex-shrink-0 h-10 px-4">
                            <Zap className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Quick Quiz (+50 XP)</span>
                            <span className="sm:hidden">Quiz</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Custom shimmer animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}
