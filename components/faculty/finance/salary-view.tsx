"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Wallet, Clock } from "lucide-react";

export function SalaryView() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg h-12 w-12 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Salary slips</h4>
                            <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full font-medium">Ready</span>
                        </div>
                        <p className="text-xs text-slate-500">Ready for download</p>
                        <Button className="w-full mt-4 bg-[#0f172a] h-8 text-xs">
                            <Download className="h-3 w-3 mr-2" /> Download PDF
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg h-12 w-12 flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Next Payment</h4>
                            <span className="text-xs text-slate-500">Oct 31, 2025</span>
                        </div>
                        <h2 className="text-xl font-bold mt-1">NRP 42,000</h2>
                        <p className="text-xs text-slate-500">Expected Amount</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg h-12 w-12 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                        <h4 className="font-semibold">Attendance Impact</h4>
                        <p className="text-xs text-slate-500">This Month</p>

                        <div className="mt-2 text-emerald-600 font-semibold text-sm">NO Deductions</div>
                        <p className="text-xs text-emerald-600/80">Perfect Attendance</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
