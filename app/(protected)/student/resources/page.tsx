"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Video, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

export default function StudentResourcesPage() {
    const resources = [
        { id: 1, title: "Physics Chapter 5 Notes", subject: "Physics", type: "PDF", size: "2.5 MB", date: "Dec 05" },
        { id: 2, title: "Math Calculus Formulas", subject: "Math", type: "PDF", size: "1.2 MB", date: "Dec 03" },
        { id: 3, title: "Chemical Bonding Lecture", subject: "Chemistry", type: "Video", size: "150 MB", date: "Nov 28" },
        { id: 4, title: "English Grammar Workbook", subject: "English", type: "Worksheet", size: "4.0 MB", date: "Nov 25" },
        { id: 5, title: "Biology Diagram Set", subject: "Biology", type: "Image", size: "5.5 MB", date: "Nov 20" },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Resources"
                title="Study Resources"
                subtitle="Access notes, assignments, and learning materials"
            />

            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search resources..."
                                className="pl-8 w-full"
                            />
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-3">
                        {resources.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-900 gap-3">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 flex-shrink-0">
                                        {item.type === "Video" ? <Video className="h-5 w-5 sm:h-6 sm:w-6" /> : <FileText className="h-5 w-5 sm:h-6 sm:w-6" />}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm sm:text-base line-clamp-2">{item.title}</h4>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <Badge variant="secondary" className="text-xs font-normal">
                                                {item.subject}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">• {item.type}</span>
                                            <span className="text-xs text-muted-foreground">• {item.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
                                    <span className="text-xs text-muted-foreground">{item.size}</span>
                                    <Button size="sm" variant="outline" className="h-8 sm:h-9 text-xs sm:text-sm">
                                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
