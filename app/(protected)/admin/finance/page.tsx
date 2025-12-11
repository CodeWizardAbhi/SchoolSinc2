"use client";

import { FeeManagement } from "@/components/admin/finance/fee-management";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminFinancePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Finance"
                title="Finance Management"
                subtitle="Manage school fees and financial reports"
            />
            <FeeManagement />
        </div>
    );
}
