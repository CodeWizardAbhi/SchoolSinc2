"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUp } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function StudentLeave() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Leave Application"
                title="Leave Application"
                subtitle="Submit and track your leave requests"
            />

            <Card className="w-full">
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-semibold text-slate-500">Apply for Leave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Full Name</Label>
                                <Input placeholder="Enter your Name" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Student ID</Label>
                                <Input placeholder="Enter your ID" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm">From Date</Label>
                                <Input type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">To Date</Label>
                                <Input type="date" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Leave Type</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select Leave Type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sick">Sick Leave</SelectItem>
                                        <SelectItem value="casual">Casual Leave</SelectItem>
                                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Upload</Label>
                                <div className="border border-input rounded-md h-10 flex items-center px-3 cursor-pointer hover:bg-slate-50">
                                    <span className="text-sm text-muted-foreground flex-1 truncate">Choose a file</span>
                                    <FileUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                                </div>
                                <p className="text-[10px] text-muted-foreground">PDF format only</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">Reason</Label>
                            <Textarea placeholder="Reason for Leave..." className="min-h-[100px]" />
                            <p className="text-[10px] text-right text-muted-foreground">Max: 100</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <Checkbox id="copy" className="mt-0.5" />
                            <label htmlFor="copy" className="text-sm text-muted-foreground">
                                A copy will sent to your Parent Gmails
                            </label>
                        </div>

                        <Button className="w-full bg-[#0f172a]">Submit</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card className="bg-slate-50 dark:bg-slate-900/50">
                <CardContent className="p-4 sm:p-6">
                    <h4 className="font-semibold mb-4 text-center text-sm">Guidelines</h4>
                    <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                        <li>Fill in all the required fields correctly.</li>
                        <li>Ensure the From Date is not later than the To Date.</li>
                        <li>Apply for leave only for valid/future dates unless it&apos;s an emergency.</li>
                        <li>Upload supporting documents only in PDF format.</li>
                        <li>Make sure uploaded documents are clear and readable.</li>
                        <li>Provide a short and accurate reason (max 100 characters).</li>
                        <li>Review all details before submitting.</li>
                        <li>Tick the checkbox if you want a copy sent to your Gmail.</li>
                        <li>Submit the form only once for a single leave request.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
