"use client";

import { SyllabusUpload } from "@/components/admin/academics/syllabus-upload";
import { TimetableManager } from "@/components/admin/academics/timetable-manager";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminAcademicsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Academics"
                title="Academics Management"
                subtitle="Manage syllabus and class timetables"
            />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1">
                    <SyllabusUpload />
                </div>
                <div className="xl:col-span-2">
                    <TimetableManager />
                </div>
            </div>
        </div>
    );
}
