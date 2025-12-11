"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function StudentFeedback() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Student Remarks & Feedback</CardTitle>
                <CardDescription>Add optional feedback for individual students</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 border-r pr-6 space-y-2">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Select Student</p>
                    {[
                        { name: "Sita Janaki", class: "Grade 10 A", active: true },
                        { name: "Anil Sarkar", class: "Grade 10 A", active: false },
                        { name: "Bibek Jha", class: "Grade 10 A", active: false },
                    ].map((s, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${s.active ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50'}`}>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} />
                                <AvatarFallback>{s.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{s.name}</p>
                                <p className="text-[10px] text-slate-500">{s.class}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="md:col-span-2 space-y-4">
                    <p className="text-xs font-semibold text-slate-500">Feedback for Sita Janaki</p>
                    <Textarea
                        placeholder="Enter your remarks and feedback for this students..."
                        className="min-h-[150px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Clear</Button>
                        <Button size="sm" className="bg-[#0f172a]">Send Feedback</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
