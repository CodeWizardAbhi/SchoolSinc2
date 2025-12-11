"use client";

import { MeetingManager } from "@/components/admin/notices/meeting-manager";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminMeetingsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Meetings"
                title="Meeting Management"
                subtitle="Schedule and manage meetings"
            />
            <div className="h-[calc(100vh-200px)]">
                <MeetingManager />
            </div>
        </div>
    );
}
