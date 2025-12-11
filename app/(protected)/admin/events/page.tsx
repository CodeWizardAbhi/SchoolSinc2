"use client";

import { EventManager } from "@/components/admin/events/event-manager";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminEventsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Events"
                title="Event Management"
                subtitle="Plan and manage school events"
            />
            <EventManager />
        </div>
    );
}
