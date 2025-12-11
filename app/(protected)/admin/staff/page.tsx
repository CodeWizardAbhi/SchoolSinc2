"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Plus, MoreVertical, Phone, Filter, Mail, Briefcase, Building2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface StaffMember {
    id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    contact: string;
    status: "Active" | "On Leave" | "Inactive";
}

export default function StaffManagementPage() {
    const [staffList, setStaffList] = useState<StaffMember[]>([
        { id: 1, name: "Dr. Sarah Wilson", email: "sarah.wilson@school.com", role: "Principal", department: "Administration", contact: "+91 98765 43210", status: "Active" },
        { id: 2, name: "Rahul Sharma", email: "rahul.sharma@school.com", role: "Senior Teacher", department: "Science", contact: "+91 98765 43211", status: "Active" },
        { id: 3, name: "Priya Patel", email: "priya.patel@school.com", role: "Teacher", department: "Mathematics", contact: "+91 98765 43212", status: "On Leave" },
        { id: 4, name: "Amit Kumar", email: "amit.kumar@school.com", role: "Accountant", department: "Finance", contact: "+91 98765 43213", status: "Active" },
        { id: 5, name: "Deepak Singh", email: "deepak.singh@school.com", role: "Lab Assistant", department: "Science", contact: "+91 98765 43214", status: "Active" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({
        name: "",
        email: "",
        role: "",
        department: "",
        contact: "",
    });
    const [searchQuery, setSearchQuery] = useState("");

    const handleAddStaff = () => {
        if (!newStaff.name || !newStaff.email || !newStaff.role || !newStaff.department) {
            return;
        }

        const newMember: StaffMember = {
            id: Date.now(),
            name: newStaff.name,
            email: newStaff.email,
            role: newStaff.role,
            department: newStaff.department,
            contact: newStaff.contact || "Not provided",
            status: "Active",
        };

        setStaffList([newMember, ...staffList]);
        setNewStaff({ name: "", email: "", role: "", department: "", contact: "" });
        setIsDialogOpen(false);
    };

    const filteredStaff = staffList.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <PageHeader
                    breadcrumb="Home / Staff"
                    title="Staff Management"
                    subtitle="Manage teaching and non-teaching staff records"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Add New Staff
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                                Add New Staff Member
                            </DialogTitle>
                            <DialogDescription>
                                Fill in the details below to add a new staff member to the system.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter full name"
                                        value={newStaff.name}
                                        onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@school.com"
                                        value={newStaff.email}
                                        onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role *</Label>
                                    <Select
                                        value={newStaff.role}
                                        onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Principal">Principal</SelectItem>
                                            <SelectItem value="Vice Principal">Vice Principal</SelectItem>
                                            <SelectItem value="Senior Teacher">Senior Teacher</SelectItem>
                                            <SelectItem value="Teacher">Teacher</SelectItem>
                                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                                            <SelectItem value="Lab Assistant">Lab Assistant</SelectItem>
                                            <SelectItem value="Librarian">Librarian</SelectItem>
                                            <SelectItem value="Accountant">Accountant</SelectItem>
                                            <SelectItem value="Administrator">Administrator</SelectItem>
                                            <SelectItem value="IT Support">IT Support</SelectItem>
                                            <SelectItem value="Security">Security</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department *</Label>
                                    <Select
                                        value={newStaff.department}
                                        onValueChange={(value) => setNewStaff({ ...newStaff, department: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Administration">Administration</SelectItem>
                                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                                            <SelectItem value="Science">Science</SelectItem>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Social Studies">Social Studies</SelectItem>
                                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                                            <SelectItem value="Physical Education">Physical Education</SelectItem>
                                            <SelectItem value="Arts">Arts</SelectItem>
                                            <SelectItem value="Music">Music</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                            <SelectItem value="Library">Library</SelectItem>
                                            <SelectItem value="IT">IT</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact">Contact Number</Label>
                                <Input
                                    id="contact"
                                    placeholder="+91 98765 43210"
                                    value={newStaff.contact}
                                    onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddStaff}
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={!newStaff.name || !newStaff.email || !newStaff.role || !newStaff.department}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add Staff
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <CardTitle className="text-base sm:text-lg">
                            Staff Directory
                            <span className="ml-2 text-sm font-normal text-muted-foreground">
                                ({filteredStaff.length} members)
                            </span>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 sm:flex-none">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search staff..."
                                    className="pl-8 w-full sm:w-[250px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 sm:p-6 sm:pt-0">
                    {/* Desktop Table */}
                    <div className="hidden md:block rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Department</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredStaff.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                                    {employee.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{employee.name}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {employee.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                                                {employee.role}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5">
                                                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                                {employee.department}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Phone className="h-3 w-3" /> {employee.contact}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={employee.status === "Active" ? "default" : "secondary"}
                                                className={
                                                    employee.status === "Active"
                                                        ? "bg-emerald-500 hover:bg-emerald-600"
                                                        : employee.status === "On Leave"
                                                            ? "bg-amber-500 hover:bg-amber-600"
                                                            : ""
                                                }
                                            >
                                                {employee.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3 p-4">
                        {filteredStaff.map((employee) => (
                            <div key={employee.id} className="border rounded-lg p-4 space-y-3 bg-white dark:bg-slate-900">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                            {employee.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{employee.name}</p>
                                            <p className="text-xs text-muted-foreground">{employee.role}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={employee.status === "Active" ? "default" : "secondary"}
                                        className={
                                            employee.status === "Active"
                                                ? "bg-emerald-500 hover:bg-emerald-600"
                                                : employee.status === "On Leave"
                                                    ? "bg-amber-500 hover:bg-amber-600"
                                                    : ""
                                        }
                                    >
                                        {employee.status}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Building2 className="h-3 w-3" /> {employee.department}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" /> {employee.contact}
                                    </span>
                                    <span className="flex items-center gap-1 col-span-2">
                                        <Mail className="h-3 w-3" /> {employee.email}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredStaff.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No staff members found matching your search.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
