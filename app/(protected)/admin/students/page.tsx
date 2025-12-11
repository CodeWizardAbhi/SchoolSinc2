"use client";

import { StudentList } from "@/components/admin/students/student-list";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminStudentsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Students"
                title="Student Management"
                subtitle="View and manage all registered students"
            />
            <StudentList />
        </div>
    );
}
