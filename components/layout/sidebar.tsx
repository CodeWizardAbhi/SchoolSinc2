"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Briefcase,
    ClipboardList,
    BarChart2,
    CreditCard,
    Calendar,
    Megaphone,
    Video,
    FileText,
    LogOut,
    Clock,
    X,
    Building2
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
    role: "admin" | "faculty" | "student";
    isOpen: boolean;
    onClose: () => void;
}

interface NavSection {
    title: string;
    items: {
        label: string;
        href: string;
        icon: React.ComponentType<{ className?: string }>;
    }[];
}

export function Sidebar({ role, isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    // Define sections based on role
    const getSections = (): NavSection[] => {
        if (role === "admin") {
            return [
                {
                    title: "Home",
                    items: [
                        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
                    ]
                },
                {
                    title: "Academics",
                    items: [
                        { label: "Academics", href: "/admin/academics", icon: BookOpen },
                        { label: "Exam Management", href: "/admin/exams", icon: ClipboardList },
                        { label: "Performance & Analytics", href: "/admin/analytics", icon: BarChart2 },
                    ]
                },
                {
                    title: "Management",
                    items: [
                        { label: "Student Management", href: "/admin/students", icon: Users },
                        { label: "Staff Management", href: "/admin/staff", icon: Briefcase },
                        { label: "Fee and Finance", href: "/admin/finance", icon: CreditCard },
                    ]
                },
                {
                    title: "Communication",
                    items: [
                        { label: "Event Management", href: "/admin/events", icon: Calendar },
                        { label: "Notice & Communication", href: "/admin/notices", icon: Megaphone },
                        { label: "Meeting Management", href: "/admin/meetings", icon: Video },
                    ]
                },
            ];
        }

        if (role === "faculty") {
            return [
                {
                    title: "Home",
                    items: [
                        { label: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard },
                    ]
                },
                {
                    title: "Teaching",
                    items: [
                        { label: "Attendance", href: "/faculty/attendance", icon: Calendar },
                        { label: "Academics", href: "/faculty/academics", icon: BookOpen },
                        { label: "Student Management", href: "/faculty/students", icon: Users },
                    ]
                },
                {
                    title: "Personal",
                    items: [
                        { label: "Finance & Payslips", href: "/faculty/finance", icon: CreditCard },
                        { label: "Leave Application", href: "/faculty/leaves", icon: FileText },
                    ]
                },
                {
                    title: "Communication",
                    items: [
                        { label: "Notices & Meetings", href: "/faculty/notices", icon: Megaphone },
                    ]
                },
            ];
        }

        // Student
        return [
            {
                title: "Home",
                items: [
                    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
                ]
            },
            {
                title: "Academics",
                items: [
                    { label: "Timetable", href: "/student/timetable", icon: Clock },
                    { label: "Exams & Events", href: "/student/exams", icon: ClipboardList },
                    { label: "Performance", href: "/student/performance", icon: BarChart2 },
                    { label: "Resources", href: "/student/resources", icon: BookOpen },
                ]
            },
            {
                title: "Reports",
                items: [
                    { label: "Student Reports", href: "/student/reports", icon: FileText },
                ]
            },
            {
                title: "Services",
                items: [
                    { label: "Fees & Finance", href: "/student/finance", icon: CreditCard },
                    { label: "Leave Application", href: "/student/leaves", icon: FileText },
                ]
            },
            {
                title: "Communication",
                items: [
                    { label: "Notices & Meetings", href: "/student/notices", icon: Megaphone },
                ]
            },
        ];
    };

    const sections = getSections();

    const handleLinkClick = () => {
        onClose();
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm transition-transform duration-300 ease-in-out z-40",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Header */}
                <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4">
                    <Link href={`/${role}/dashboard`} className="flex items-center gap-2">
                        <Building2 className="h-7 w-7 text-blue-500" />
                        <div>
                            <span className="text-lg font-bold text-blue-500">School</span>
                            <span className="text-lg font-bold text-orange-500">Sync</span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 rounded-lg lg:hidden"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                    {sections.map((section, sectionIndex) => (
                        <div key={section.title} className={cn("mb-6", sectionIndex === 0 && "mt-0")}>
                            {/* Section Title */}
                            <h3 className="px-3 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                                {section.title}
                            </h3>

                            {/* Section Items */}
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            prefetch={true}
                                            onClick={handleLinkClick}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "h-5 w-5",
                                                isActive ? "text-blue-600" : "text-slate-400"
                                            )} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
