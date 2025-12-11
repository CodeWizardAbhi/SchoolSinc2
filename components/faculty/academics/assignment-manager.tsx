"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

const assignments = [
    { title: "Quadratic Equations", subject: "Mathematics", due: "Dec 14", status: "Submitted", count: "32/40 Submitted", statusColor: "bg-emerald-100 text-emerald-600" },
    { title: "Newton's Laws", subject: "Physics", due: "Dec 18", status: "Pending", count: "23/40 Submitted", statusColor: "bg-orange-100 text-orange-600" },
    { title: "Organic Compounds", subject: "Chemistry", due: "Dec 10", status: "Late", count: "2/30 Submitted", statusColor: "bg-rose-100 text-rose-600" },
];

export function AssignmentManager() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Assignments</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {assignments.map((asg, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold text-sm">{asg.title}</h4>
                                <p className="text-xs text-muted-foreground">{asg.subject}</p>
                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span> Dues: {asg.due}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge variant="secondary" className={`text-[10px] h-5 ${asg.statusColor}`}>
                                    {asg.status === 'Submitted' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                    {asg.status === 'Pending' && <Clock className="h-3 w-3 mr-1" />}
                                    {asg.status === 'Late' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                    {asg.status}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">{asg.count}</span>
                            </div>
                        </div>
                        <Button className="w-full h-8 text-xs bg-[#0f172a]">Grade Now</Button>
                    </div>
                ))}
                <Button className="w-full bg-[#0f172a]">
                    <Plus className="h-4 w-4 mr-2" /> Create New
                </Button>
            </CardContent>
        </Card>
    );
}
