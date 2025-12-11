"use client";

import { SalaryView } from "@/components/faculty/finance/salary-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function FacultyFinancePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Finance"
                title="Finance"
                subtitle="Check your salary slips and payment history"
            />

            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg">Salary & Payments</CardTitle>
                    <CardDescription className="text-sm">View and download your salary slips</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <SalaryView />
                </CardContent>
            </Card>
        </div>
    );
}
