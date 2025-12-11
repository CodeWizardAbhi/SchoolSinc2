"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, ArrowLeft, Settings, Grid3X3, User, LogOut, Pencil, Building2 } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
    userName: string;
    role: "admin" | "faculty" | "student";
    isSidebarOpen: boolean;
    onMenuClick: () => void;
}

export function Navbar({ userName, role, isSidebarOpen, onMenuClick }: NavbarProps) {
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const dashboardUrl = `/${role}/dashboard`;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <nav className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
            {/* Left side */}
            <div className="flex items-center gap-1">
                {/* Logo - only show when sidebar is hidden */}
                {!isSidebarOpen && (
                    <Link href={dashboardUrl} className="flex items-center gap-2 mr-4">
                        <Building2 className="h-7 w-7 text-blue-500" />
                        <div className="hidden sm:block">
                            <span className="text-lg font-bold text-blue-500">School</span>
                            <span className="text-lg font-bold text-orange-500">Sync</span>
                        </div>
                    </Link>
                )}

                {/* Sidebar Toggle */}
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-5 w-5 text-slate-600" />
                </button>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                {/* Settings */}
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Settings className="h-5 w-5 text-slate-500" />
                </button>

                {/* Grid/Apps */}
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Grid3X3 className="h-5 w-5 text-slate-500" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-1.5 pl-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-slate-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 hidden sm:block pr-2">
                            {userName}
                        </span>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                            {/* Profile Header */}
                            <div className="px-4 py-3 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                                        <User className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <span className="font-medium text-slate-800">{userName}</span>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                                <Link
                                    href={`/${role}/profile`}
                                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-slate-50 transition-colors"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <Pencil className="h-4 w-4 text-slate-500" />
                                    <span className="text-sm text-slate-700">
                                        {role === "student" ? "Student Profile" : role === "faculty" ? "Faculty Profile" : "Admin Profile"}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-slate-50 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 text-slate-500" />
                                    <span className="text-sm text-slate-700">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
