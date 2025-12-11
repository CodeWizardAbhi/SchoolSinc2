"use client";

import { QuickActions } from "@/components/admin/notices/quick-actions";
import { NoticeBoard } from "@/components/admin/notices/notice-board";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminNoticesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Notices"
                title="Notices & Announcements"
                subtitle="Create and manage school notices"
            />
            <div className="space-y-8">
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Quick Actions</h2>
                    <QuickActions />
                </section>

                <section>
                    <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Recent Notices</h2>
                    <NoticeBoard />
                </section>
            </div>
        </div>
    );
}
