"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export function MarksEntry() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Update Exam Marks</CardTitle>
                <CardDescription>Submit marks for individual students per subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Class</label>
                        <Select defaultValue="10a">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10a">Grade 10 A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Course</label>
                        <Select defaultValue="math">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="math">Mathematics</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium">Exam Type</label>
                    <Select defaultValue="mid">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mid">Mid-term Exam</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                        <span>Student Marks</span>
                        <span>Total: 25 students</span>
                    </div>

                    {[
                        { name: "Sita Janaki", mark: "85" },
                        { name: "Anil Sarkar", mark: "72" },
                        { name: "Bibek Jha", mark: "--" },
                    ].map((student, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 p-2 hover:bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{student.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input className="w-16 h-8 text-right" defaultValue={student.mark === '--' ? '' : student.mark} placeholder="0" />
                                <span className="text-xs text-muted-foreground w-6">/100</span>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className="w-full bg-[#0f172a]">
                    <Save className="h-4 w-4 mr-2" /> Save Marks
                </Button>
            </CardContent>
        </Card>
    );
}
