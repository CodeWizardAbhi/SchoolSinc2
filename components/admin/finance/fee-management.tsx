"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Mail,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    CreditCard,
    Receipt,
    BarChart3,
    Plus,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data
const revenueData = [
    { month: 'Jul', income: 2400000, expenses: 1800000 },
    { month: 'Aug', income: 2800000, expenses: 1900000 },
    { month: 'Sep', income: 3200000, expenses: 2100000 },
    { month: 'Oct', income: 2900000, expenses: 2000000 },
    { month: 'Nov', income: 3500000, expenses: 2300000 },
    { month: 'Dec', income: 3800000, expenses: 2400000 },
];

const feeCollection = [
    { name: 'Collected', value: 78, color: '#22c55e' },
    { name: 'Pending', value: 15, color: '#f59e0b' },
    { name: 'Overdue', value: 7, color: '#ef4444' },
];

const recentTransactions = [
    { id: 'TXN00123', student: 'Rahul Kumar', class: '10-A', amount: 15000, method: 'UPI', status: 'success', time: '10:30 AM' },
    { id: 'TXN00122', student: 'Priya Singh', class: '9-B', amount: 12500, method: 'Card', status: 'success', time: '09:45 AM' },
    { id: 'TXN00121', student: 'Amit Patel', class: '10-B', amount: 10000, method: 'Cash', status: 'success', time: 'Yesterday' },
    { id: 'TXN00120', student: 'Neha Sharma', class: '8-A', amount: 8000, method: 'Bank', status: 'pending', time: 'Yesterday' },
];

const pendingFees = [
    { id: "AD9892434", name: "Sita Janaki", class: "10-A", due: 12500, daysOverdue: 7, status: "overdue" },
    { id: "AD9892435", name: "Ram Dashrath", class: "10-A", due: 5000, daysOverdue: 3, status: "pending" },
    { id: "AD9892436", name: "Lakshman D.", class: "9-B", due: 8000, daysOverdue: 0, status: "pending" },
    { id: "AD9892437", name: "Hanuman P.", class: "10-B", due: 15000, daysOverdue: 14, status: "overdue" },
];

const expenseCategories = [
    { category: 'Salaries', amount: 1500000, percentage: 62 },
    { category: 'Infrastructure', amount: 400000, percentage: 17 },
    { category: 'Utilities', amount: 200000, percentage: 8 },
    { category: 'Supplies', amount: 180000, percentage: 8 },
    { category: 'Others', amount: 120000, percentage: 5 },
];

export function FeeManagement() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const totalIncome = 29545000;
    const totalExpenses = 19291266;
    const netProfit = totalIncome - totalExpenses;
    const pendingAmount = 2850000;

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-emerald-100">Total Income</p>
                                <p className="text-2xl font-bold">₹{(totalIncome / 100000).toFixed(1)}L</p>
                                <div className="flex items-center gap-1 mt-1 text-xs">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>+12% from last year</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-rose-100">Total Expenses</p>
                                <p className="text-2xl font-bold">₹{(totalExpenses / 100000).toFixed(1)}L</p>
                                <div className="flex items-center gap-1 mt-1 text-xs">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>+5% from last year</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <TrendingDown className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-blue-100">Net Profit</p>
                                <p className="text-2xl font-bold">₹{(netProfit / 100000).toFixed(1)}L</p>
                                <div className="flex items-center gap-1 mt-1 text-xs">
                                    <ArrowUpRight className="h-3 w-3" />
                                    <span>+15% margin</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <DollarSign className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-amber-100">Pending Fees</p>
                                <p className="text-2xl font-bold">₹{(pendingAmount / 100000).toFixed(1)}L</p>
                                <div className="flex items-center gap-1 mt-1 text-xs">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>127 students</span>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <Clock className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Revenue Chart & Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Revenue Chart */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Revenue Overview
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-7 text-xs">Monthly</Button>
                                    <Button size="sm" className="h-7 text-xs bg-[#0f172a]">Annual</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `₹${v / 100000}L`} />
                                        <Tooltip formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="income" stroke="#22c55e" fillOpacity={1} fill="url(#colorInc)" strokeWidth={2} name="Income" />
                                        <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} name="Expenses" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                                    <span className="text-xs text-slate-500">Income</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                                    <span className="text-xs text-slate-500">Expenses</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Transactions */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <Receipt className="h-4 w-4 text-purple-500" />
                                    Recent Transactions
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 gap-1">
                                                <Plus className="h-4 w-4" /> Record Payment
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Record New Payment</DialogTitle>
                                                <DialogDescription>
                                                    Enter payment details to record a new fee payment.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Student ID</Label>
                                                    <Input placeholder="Enter student ID" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Amount</Label>
                                                    <Input placeholder="₹ 0.00" type="number" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Payment Method</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select method" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cash">Cash</SelectItem>
                                                            <SelectItem value="upi">UPI</SelectItem>
                                                            <SelectItem value="card">Card</SelectItem>
                                                            <SelectItem value="bank">Bank Transfer</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                                <Button className="bg-blue-600 hover:bg-blue-700">Record Payment</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600">View All</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentTransactions.map((txn, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${txn.status === 'success' ? 'bg-emerald-100' : 'bg-amber-100'
                                                }`}>
                                                {txn.status === 'success' ?
                                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" /> :
                                                    <Clock className="h-5 w-5 text-amber-600" />
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{txn.student}</p>
                                                <p className="text-[10px] text-muted-foreground">Class {txn.class} • {txn.method} • {txn.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-emerald-600">+₹{txn.amount.toLocaleString()}</p>
                                            <p className="text-[10px] text-muted-foreground">{txn.id}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Collection Stats & Pending */}
                <div className="space-y-6">
                    {/* Fee Collection Stats */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-blue-500" />
                                Fee Collection Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="relative h-28 w-28 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={feeCollection}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={35}
                                                outerRadius={50}
                                                startAngle={90}
                                                endAngle={-270}
                                                dataKey="value"
                                            >
                                                {feeCollection.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-emerald-600">78%</span>
                                        <span className="text-[10px] text-slate-400">Collected</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {feeCollection.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                                {item.name}
                                            </span>
                                            <span className="font-semibold">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Expense Breakdown */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold">Expense Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {expenseCategories.map((exp, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">{exp.category}</span>
                                        <span className="font-medium">₹{(exp.amount / 100000).toFixed(1)}L</span>
                                    </div>
                                    <Progress value={exp.percentage} className="h-1.5" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Pending Fees */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                    Pending Fees
                                </CardTitle>
                                <Badge variant="outline" className="text-amber-600 border-amber-200 text-[10px]">
                                    {pendingFees.length} Students
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {pendingFees.map((fee, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${fee.status === 'overdue' ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'
                                    }`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${fee.name}`} />
                                                <AvatarFallback>{fee.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{fee.name}</p>
                                                <p className="text-[10px] text-muted-foreground">Class {fee.class}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-rose-600">₹{fee.due.toLocaleString()}</p>
                                            {fee.daysOverdue > 0 && (
                                                <Badge className={`text-[10px] ${fee.status === 'overdue' ? 'bg-rose-500' : 'bg-amber-500'}`}>
                                                    {fee.daysOverdue}d overdue
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="w-full h-7 text-xs text-blue-600 hover:bg-blue-50">
                                        <Mail className="h-3 w-3 mr-1" /> Send Reminder
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
