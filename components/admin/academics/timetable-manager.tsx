"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Save, Edit2, X } from "lucide-react";
import { toast } from "sonner";

interface ScheduleRow {
    id: number;
    time: string;
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    type?: string;
    [key: string]: string | number | undefined; // Allow index signature for dynamic access
}

const initialSchedule: ScheduleRow[] = [
    { id: 1, time: "10:00 - 11:00 AM", mon: "Advance Math", tue: "Advance Math", wed: "Advance Math", thu: "Advance Math", fri: "Advance Math", sat: "Advance Math" },
    { id: 2, time: "11:00 - 12:00 AM", mon: "Science", tue: "Science", wed: "Science", thu: "Science", fri: "Science", sat: "Science" },
    { id: 3, time: "12:00 - 01:00 PM", mon: "English", tue: "English", wed: "English", thu: "English", fri: "English", sat: "English" },
    { id: 4, time: "01:00 - 02:00 PM", mon: "Break", type: "break" },
    { id: 5, time: "02:00 - 03:00 PM", mon: "Opt. Math", tue: "Opt. Math", wed: "Opt. Math", thu: "Opt. Math", fri: "Opt. Math", sat: "Opt. Math" },
];

export function TimetableManager() {
    const [isEditing, setIsEditing] = useState(false);
    const [schedule, setSchedule] = useState<ScheduleRow[]>(initialSchedule);

    const handleCellChange = (id: number, field: string, value: string) => {
        setSchedule(schedule.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const handleSave = () => {
        setIsEditing(false);
        toast.success("Timetable updated successfully!");
    };

    const handleCancel = () => {
        setSchedule(initialSchedule); // Reset changes
        setIsEditing(false);
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Timetable Management</CardTitle>
                    <CardDescription>Create, manage, and publish class timetables</CardDescription>
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="destructive" size="sm" onClick={handleCancel}>
                                <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700" size="sm" onClick={handleSave}>
                                <Save className="h-4 w-4 mr-1" /> Save
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit2 className="h-4 w-4 mr-1" /> Edit
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                <TableHead className="w-[140px]">Time</TableHead>
                                <TableHead>Monday</TableHead>
                                <TableHead>Tuesday</TableHead>
                                <TableHead>Wednesday</TableHead>
                                <TableHead>Thursday</TableHead>
                                <TableHead>Friday</TableHead>
                                <TableHead>Saturday</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schedule.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="font-medium text-xs text-muted-foreground whitespace-nowrap">
                                        {row.time}
                                    </TableCell>
                                    {row.type === "break" ? (
                                        <TableCell colSpan={6} className="bg-slate-100 dark:bg-slate-800 text-center font-bold text-slate-400 py-2">
                                            LUNCH BREAK
                                        </TableCell>
                                    ) : (
                                        <>
                                            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                                                <TableCell key={day} className="p-2">
                                                    {isEditing ? (
                                                        <Input
                                                            className="h-8 text-xs min-w-[100px]"
                                                            value={row[day] as string || ''}
                                                            onChange={(e) => handleCellChange(row.id, day, e.target.value)}
                                                        />
                                                    ) : (
                                                        <span>{row[day]}</span>
                                                    )}
                                                </TableCell>
                                            ))}
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
