"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

export function LeaveApplication() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-500">&quot;Leave application&quot;</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="Enter your Name" />
                        </div>
                        <div className="space-y-2">
                            <Label>Teacher ID</Label>
                            <Input placeholder="Enter your ID" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>From Date</Label>
                            <Input type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>To Date</Label>
                            <Input type="date" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Leave Type</Label>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select your Leave Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sick">Sick Leave</SelectItem>
                                    <SelectItem value="casual">Casual Leave</SelectItem>
                                    <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Upload</Label>
                            <div className="border border-input rounded-md h-10 flex items-center px-3 cursor-pointer hover:bg-slate-50">
                                <span className="text-sm text-muted-foreground flex-1">Choose a file</span>
                                <FileUp className="h-4 w-4 text-slate-400" />
                            </div>
                            <p className="text-[10px] text-muted-foreground">File should be in PDF format only</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Reason</Label>
                        <Textarea placeholder="Reason for Leave..." className="min-h-[100px]" />
                        <p className="text-[10px] text-right text-muted-foreground">Max: 100</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="copy" />
                        <label htmlFor="copy" className="text-sm text-muted-foreground">A copy will sent to your Gmail</label>
                    </div>

                    <Button className="w-full bg-[#0f172a]">Submit</Button>
                </div>

                <div className="lg:col-span-1 border rounded-lg p-6 bg-slate-50 dark:bg-slate-900/50 h-fit">
                    <h4 className="font-semibold mb-4 text-center">Guidelines</h4>
                    <ul className="space-y-3 text-xs text-muted-foreground list-disc pl-4">
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
                </div>
            </CardContent>
        </Card>
    );
}
