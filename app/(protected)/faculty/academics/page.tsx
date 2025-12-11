"use client";

import { AssignmentManager } from "@/components/faculty/academics/assignment-manager";
import { MarksEntry } from "@/components/faculty/academics/marks-entry";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileSpreadsheet, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function FacultyAcademicsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Academics"
                title="Academics & Assignments"
                subtitle="Create assignments and update student marks"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <AssignmentManager />
                </div>

                <div className="lg:col-span-1">
                    <MarksEntry />
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base sm:text-lg">Upload Assignment Grades</CardTitle>
                            <CardDescription className="text-sm">Upload grades via Excel or PDF file</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="border-2 border-dashed rounded-lg p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-slate-50 transition-colors">
                                <UploadCloud className="h-8 w-8 sm:h-10 sm:w-10 text-slate-300" />
                                <p className="text-sm font-medium">Upload Grade File</p>
                                <p className="text-xs text-muted-foreground">Drag and drop files here or click to browse</p>
                                <Button variant="secondary" size="sm" className="mt-2">Choose Files</Button>
                            </div>

                            <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 space-y-2">
                                <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                                    <AlertTriangle className="h-4 w-4" /> Template Format
                                </div>
                                <p className="text-xs text-rose-600/80">Download the template to ensure proper formatting</p>
                                <Button variant="link" className="text-xs text-rose-600 h-auto p-0 underline">Download Template</Button>
                            </div>

                            <Button className="w-full bg-[#0f172a]">
                                <FileSpreadsheet className="h-4 w-4 mr-2" /> Update Grades
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
