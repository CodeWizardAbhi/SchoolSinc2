"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2, CheckCircle2 } from "lucide-react";

export function LeaveApplication() {
    const [formData, setFormData] = useState({
        fullName: "",
        teacherId: "",
        fromDate: "",
        toDate: "",
        leaveType: "",
        reason: "",
    });
    const [sendCopy, setSendCopy] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        if (!formData.fullName || !formData.teacherId || !formData.fromDate || !formData.toDate || !formData.leaveType || !formData.reason) {
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    fullName: "",
                    teacherId: "",
                    fromDate: "",
                    toDate: "",
                    leaveType: "",
                    reason: "",
                });
                setSendCopy(false);
            }, 3000);
        }, 1500);
    };

    const leaveTypes = [
        { value: "sick", label: "Sick Leave" },
        { value: "casual", label: "Casual Leave" },
        { value: "earned", label: "Earned Leave" },
        { value: "maternity", label: "Maternity Leave" },
        { value: "unpaid", label: "Unpaid Leave" },
    ];

    if (isSuccess) {
        return (
            <Card className="w-full">
                <CardContent className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-6 rounded-full mb-6">
                        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Leave Application Submitted!</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md">
                        Your leave request has been submitted successfully and is pending approval from the administration.
                    </p>
                </CardContent>
            </Card>
        );
    }

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
                            <Input
                                placeholder="Enter your Name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Teacher ID</Label>
                            <Input
                                placeholder="Enter your ID"
                                value={formData.teacherId}
                                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>From Date</Label>
                            <Input
                                type="date"
                                value={formData.fromDate}
                                onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>To Date</Label>
                            <Input
                                type="date"
                                value={formData.toDate}
                                onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Leave Type</Label>
                            <Select value={formData.leaveType} onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
                                <SelectTrigger><SelectValue placeholder="Select your Leave Type" /></SelectTrigger>
                                <SelectContent>
                                    {leaveTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                    ))}
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
                        <Textarea
                            placeholder="Reason for Leave..."
                            className="min-h-[100px]"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value.slice(0, 100) })}
                        />
                        <p className="text-[10px] text-right text-muted-foreground">{formData.reason.length}/100</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="copy"
                            checked={sendCopy}
                            onCheckedChange={(checked) => setSendCopy(checked as boolean)}
                        />
                        <label htmlFor="copy" className="text-sm text-muted-foreground">A copy will sent to your Gmail</label>
                    </div>

                    <Button
                        className="w-full bg-[#0f172a]"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.fullName || !formData.teacherId || !formData.leaveType || !formData.fromDate || !formData.toDate || !formData.reason}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
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
