"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, X } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is installed, or use standard toast

export function SyllabusUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }
        setLoading(true);
        // Simulate upload delay
        setTimeout(() => {
            setLoading(false);
            setFile(null);
            toast.success("Syllabus uploaded successfully!");
        }, 1500);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload & Manage Syllabus</CardTitle>
                <CardDescription>Add or update curriculum for classes and subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Academic Year</Label>
                        <Select defaultValue="2024-2025">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024-2025">2024 - 2025</SelectItem>
                                <SelectItem value="2025-2026">2025 - 2026</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Classes</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10a">Class 10 A</SelectItem>
                                <SelectItem value="10b">Class 10 B</SelectItem>
                                <SelectItem value="9a">Class 9 A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {!file ? (
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                        />
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                            <UploadCloud className="h-8 w-8 text-slate-500" />
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Upload Syllabus File</h4>
                        <p className="text-sm text-slate-500 mt-1">Drag and drop, or click to browse (PDF/DOC)</p>
                    </div>
                ) : (
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-600">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                            <X className="h-4 w-4 text-slate-500 hover:text-red-500" />
                        </Button>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="ghost" onClick={() => setFile(null)}>Cancel</Button>
                    <Button
                        className="bg-[#0f172a]"
                        onClick={handleUpload}
                        disabled={loading || !file}
                    >
                        {loading ? "Uploading..." : "Update Syllabus"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
