"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
    Flame,
    Calendar,
    Trophy,
    Zap,
    Target,
    Gift,
    Star,
    CheckCircle2,
    Circle,
    Lock,
    Snowflake,
    Store,
    Coins,
    ShoppingBag,
} from "lucide-react";

// Initial user state
const INITIAL_XP = 5250;
const INITIAL_FREEZES = 2; // User has 2 freezes available

// Mock history data for tooltips
const HISTORY_DATA: Record<string, string[]> = {
    "default": ["Completed Daily Lesson", "Read Chapter 4", "Solved 5 Math Problems"],
    "missed": ["No activity recorded"],
    "frozen": ["Streak Frozen using 500 XP"]
};

// Generate calendar with more robust state handling
const generateCalendarData = () => {
    const today = new Date();
    const data = [];

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        // Simulate streak data
        // logic: i <= 6 (last week completed), i 7-10 missed, i 11-24 completed
        const isCompleted = i <= 6 || (i > 10 && i <= 24);
        const isMissed = i >= 7 && i <= 10;

        data.push({
            date: date,
            dateStr: dateStr,
            day: date.getDate(),
            dayName: date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1),
            isToday: i === 0,
            status: isCompleted ? "completed" : isMissed ? "missed" : "none", // completed, missed, frozen, none
        });
    }

    return data;
};

// Streak milestones
const milestones = [
    { days: 3, reward: 50, label: "Starter", unlocked: true },
    { days: 7, reward: 100, label: "Week Warrior", unlocked: true },
    { days: 14, reward: 200, label: "Fortnight Fighter", unlocked: true },
    { days: 30, reward: 500, label: "Month Master", unlocked: false, progress: 7 },
    { days: 60, reward: 1000, label: "Discipline Deity", unlocked: false },
    { days: 100, reward: 2000, label: "Legend", unlocked: false },
];

// Daily tasks for streak
const dailyTasks = [
    { id: 1, task: "Complete 1 lesson", completed: true },
    { id: 2, task: "Answer 5 quiz questions", completed: true },
    { id: 3, task: "Review flashcards", completed: true },
    { id: 4, task: "Read for 10 minutes", completed: false },
];

export default function StreaksPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [xp, setXp] = useState(INITIAL_XP);
    const [freezes, setFreezes] = useState(INITIAL_FREEZES);
    const [calendar, setCalendar] = useState<any[]>([]);
    const [shopOpen, setShopOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setCalendar(generateCalendarData());
    }, []);

    const handleFreeze = (index: number) => {
        const day = calendar[index];
        if (day.status !== 'missed') return;

        if (freezes > 0 && xp >= 500) {
            // Apply freeze
            const newCalendar = [...calendar];
            newCalendar[index] = { ...day, status: 'frozen' };
            setCalendar(newCalendar);
            setXp(prev => prev - 500);
            setFreezes(prev => prev - 1);
        } else {
            alert("Not enough XP or Freezes!");
        }
    };

    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-48" />
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
            </div>
        );
    }

    const currentStreak = 7;
    const longestStreak = 14;
    const todayCompleted = true;
    const weeklyGoal = 5;
    const weeklyProgress = 4;

    return (
        <div className="space-y-6">
            {/* Hero Streak Card */}
            <Card className="bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 border-0 overflow-hidden shadow-xl shadow-orange-500/20">
                <CardContent className="p-6 text-white">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Main Streak Display */}
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                                <Flame className="h-10 w-10 text-amber-300 animate-pulse" />
                                <span className="text-6xl font-black drop-shadow-sm">{currentStreak}</span>
                            </div>
                            <p className="text-xl font-semibold text-white/90">Day Streak!</p>
                            <p className="text-sm text-white/70 mt-1 font-medium">Keep it up! You&apos;re on fire 🔥</p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 lg:gap-8 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                            <div className="text-center">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                                    <Trophy className="h-5 w-5 text-amber-300" />
                                </div>
                                <p className="text-2xl font-bold">{longestStreak}</p>
                                <p className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Longest</p>
                            </div>

                            {/* Freeze Indicator (New) */}
                            <div className="text-center">
                                <div className="h-10 w-10 rounded-full bg-cyan-400/30 flex items-center justify-center mx-auto mb-2 relative">
                                    <Snowflake className="h-5 w-5 text-cyan-200" />
                                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-cyan-500 rounded-full text-[10px] flex items-center justify-center border border-white/20">
                                        {freezes}
                                    </div>
                                </div>
                                <p className="text-2xl font-bold">{freezes}</p>
                                <p className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Frozen</p>
                            </div>

                            <div className="text-center">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                                    <span className="text-xs font-bold text-amber-300">XP</span>
                                </div>
                                <p className="text-lg font-bold truncate max-w-[80px]">{xp}</p>
                                <p className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Available</p>
                            </div>

                            {/* Shop Button */}
                            <Dialog open={shopOpen} onOpenChange={setShopOpen}>
                                <DialogTrigger asChild>
                                    <button className="h-10 w-10 rounded-full bg-amber-400/30 hover:bg-amber-400/50 flex items-center justify-center transition-all hover:scale-110">
                                        <Store className="h-5 w-5 text-amber-200" />
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2">
                                            <ShoppingBag className="h-5 w-5 text-cyan-500" />
                                            Streak Freeze Shop
                                        </DialogTitle>
                                        <DialogDescription>
                                            Missed a day? Don&apos;t lose your streak! Purchase freezes with your XP.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4 py-4">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
                                                    <Snowflake className="h-6 w-6 text-cyan-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">1x Streak Freeze</p>
                                                    <p className="text-xs text-slate-500">Protect one missed day</p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    if (xp >= 500) {
                                                        setXp(prev => prev - 500);
                                                        setFreezes(prev => prev + 1);
                                                        setShopOpen(false);
                                                    }
                                                }}
                                                disabled={xp < 500}
                                                className="bg-cyan-500 hover:bg-cyan-600 gap-2"
                                            >
                                                <Coins className="h-4 w-4" /> 500 XP
                                            </Button>
                                        </div>

                                        <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                                            <p className="text-sm font-medium text-amber-800">Your Balance: <span className="font-bold">{xp} XP</span></p>
                                        </div>
                                    </div>

                                    <DialogFooter className="text-xs text-slate-500">
                                        Freezes never expire. Use them wisely!
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar View */}
                <Card className="overflow-hidden">
                    <CardHeader className="pb-4 border-b bg-slate-50/50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                Consistency Tracker
                            </CardTitle>
                            <Badge variant="outline" className="bg-white">Last 30 Days</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-7 gap-2">
                            {/* Day headers */}
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                                <div key={i} className="text-center text-[10px] text-slate-400 font-bold py-1">
                                    {day}
                                </div>
                            ))}

                            {/* Calendar cells */}
                            {calendar.map((item, i) => {
                                let bgClass = "bg-slate-100 dark:bg-slate-800 text-slate-400"; // Default/Future
                                let canFreeze = false;

                                if (item.status === "completed") {
                                    bgClass = "bg-emerald-500 text-white shadow-emerald-200 shadow-sm cursor-pointer hover:bg-emerald-600";
                                } else if (item.status === "missed") {
                                    bgClass = "bg-rose-100 text-rose-500 border-2 border-rose-200 border-dashed cursor-pointer hover:bg-rose-200";
                                    canFreeze = true;
                                } else if (item.status === "frozen") {
                                    bgClass = "bg-cyan-100 text-cyan-600 border border-cyan-200 cursor-pointer";
                                }

                                return (
                                    <Popover key={i}>
                                        <PopoverTrigger asChild>
                                            <div
                                                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all relative group ${bgClass} ${item.isToday ? "ring-2 ring-offset-2 ring-slate-900 dark:ring-slate-100" : ""}`}
                                            >
                                                {item.day}
                                                {item.status === "frozen" && <Snowflake className="h-3 w-3 absolute top-0.5 right-0.5 opacity-50" />}
                                                {canFreeze && freezes > 0 && (
                                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center">
                                                        <Snowflake className="h-4 w-4 text-cyan-600 animate-pulse" />
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64 p-0" align="center">
                                            <div className="p-3 bg-slate-50 border-b flex justify-between items-center">
                                                <span className="font-semibold text-sm">{item.date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                <Badge className={`text-[10px] capitalize ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                                                    item.status === 'frozen' ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-100' :
                                                        item.status === 'missed' ? 'bg-rose-100 text-rose-700 hover:bg-rose-100' :
                                                            'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {item.status === 'missed' ? 'Missed' : item.status === 'frozen' ? 'Frozen' : item.status === 'completed' ? 'Completed' : 'No Data'}
                                                </Badge>
                                            </div>
                                            <div className="p-3">
                                                {item.status === 'completed' ? (
                                                    <div className="space-y-2">
                                                        {HISTORY_DATA['default'].map((task, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                                {task}
                                                            </div>
                                                        ))}
                                                        <div className="mt-2 pt-2 border-t flex justify-end">
                                                            <span className="text-[10px] font-bold text-emerald-600">+120 XP Earned</span>
                                                        </div>
                                                    </div>
                                                ) : item.status === 'missed' ? (
                                                    <div className="text-center py-2">
                                                        <p className="text-xs text-slate-500 mb-3">You missed your streak this day.</p>
                                                        {freezes > 0 ? (
                                                            <Button
                                                                size="sm"
                                                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-8 text-xs gap-2"
                                                                onClick={() => handleFreeze(i)}
                                                                disabled={xp < 500}
                                                            >
                                                                <Snowflake className="h-3 w-3" />
                                                                Freeze for 500 XP
                                                            </Button>
                                                        ) : (
                                                            <p className="text-xs font-medium text-rose-500">No freezes available!</p>
                                                        )}
                                                        <p className="text-[10px] text-slate-400 mt-2">Cost: 500 XP • available: {freezes}</p>
                                                    </div>
                                                ) : item.status === 'frozen' ? (
                                                    <div className="text-center py-2">
                                                        <p className="text-xs text-cyan-600 mb-1 font-medium">Streak Saved!</p>
                                                        <p className="text-[10px] text-slate-500">This day is frozen and counts towards your streak.</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-slate-400 text-center">No activity for this future date.</p>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
                            {/* ... existing legends ... */}
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-emerald-500 shadow-sm" />
                                <span className="text-xs text-slate-500">Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-xs text-rose-500 font-bold border border-rose-200 bg-rose-50 px-1 rounded">!</div>
                                <span className="text-xs text-slate-500">Missed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-cyan-100 border border-cyan-300 flex items-center justify-center">
                                    <span className="text-[8px]">❄️</span>
                                </div>
                                <span className="text-xs text-slate-500">Frozen</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Today's Tasks & Freeze Promo */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Zap className="h-4 w-4 text-amber-500" />
                                Today&apos;s Streak Tasks
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dailyTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${task.completed
                                            ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
                                            : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                                            }`}
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                                        )}
                                        <span className={`text-sm ${task.completed ? "text-emerald-700 dark:text-emerald-400 line-through" : "text-slate-700 dark:text-slate-300"}`}>
                                            {task.task}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border-cyan-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                                        <Snowflake className="h-5 w-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-cyan-800 dark:text-cyan-300">Habit Protection</p>
                                        <p className="text-xs text-cyan-600 dark:text-cyan-400">Missed a day? Freeze it!</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-black text-cyan-700">{freezes}</span>
                                    <span className="text-[10px] text-cyan-600 uppercase font-bold">Left</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Streak Milestones */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Gift className="h-4 w-4 text-purple-500" />
                        Streak Milestones
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {milestones.map((milestone, i) => (
                            <div
                                key={i}
                                className={`relative p-4 rounded-xl text-center transition-all ${milestone.unlocked
                                    ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800"
                                    : "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-60"
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-2 ${milestone.unlocked
                                    ? "bg-gradient-to-br from-amber-400 to-orange-500"
                                    : "bg-slate-200 dark:bg-slate-700"
                                    }`}>
                                    {milestone.unlocked ? (
                                        <Star className="h-5 w-5 text-white" />
                                    ) : milestone.progress !== undefined ? (
                                        <Flame className="h-5 w-5 text-slate-400" />
                                    ) : (
                                        <Lock className="h-4 w-4 text-slate-400" />
                                    )}
                                </div>

                                {/* Content */}
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{milestone.days}</p>
                                <p className="text-xs text-slate-500 mb-1">days</p>
                                <Badge className={`text-[9px] ${milestone.unlocked
                                    ? "bg-amber-500 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                                    }`}>
                                    +{milestone.reward} XP
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
