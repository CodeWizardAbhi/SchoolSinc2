import Link from "next/link";
import { CloudSun, Users, GraduationCap, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-5xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">SchoolSync</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <Link href="/auth/login/admin" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:border-blue-500 cursor-pointer group-hover:-translate-y-1">
              <CardHeader className="text-center pt-10">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-fit mb-4 group-hover:bg-blue-600 transition-colors">
                  <ShieldCheck className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl">Admin</CardTitle>
                <CardDescription>Management & Control</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-10">
                <span className="text-sm text-slate-400">Access Dashboard</span>
              </CardContent>
            </Card>
          </Link>

          {/* Teacher Card */}
          <Link href="/auth/login/faculty" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:border-emerald-500 cursor-pointer group-hover:-translate-y-1">
              <CardHeader className="text-center pt-10">
                <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full w-fit mb-4 group-hover:bg-emerald-600 transition-colors">
                  <Users className="h-10 w-10 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl">Teacher</CardTitle>
                <CardDescription>Faculty & Staff Portal</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-10">
                <span className="text-sm text-slate-400">Mark Attendance & Grades</span>
              </CardContent>
            </Card>
          </Link>

          {/* Student Card */}
          <Link href="/auth/login/student" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:border-indigo-500 cursor-pointer group-hover:-translate-y-1">
              <CardHeader className="text-center pt-10">
                <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full w-fit mb-4 group-hover:bg-indigo-600 transition-colors">
                  <GraduationCap className="h-10 w-10 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl">Student</CardTitle>
                <CardDescription>Learning & History</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-10">
                <span className="text-sm text-slate-400">View Results & Fees</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400">Secure Enterprise Access System v1.0</p>
        </div>
      </div>

      <footer className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
          <CloudSun className="h-6 w-6 text-yellow-500" />
          <div className="text-sm">
            <span className="font-semibold text-slate-900 dark:text-white">24°C</span>
            <span className="mx-2 text-slate-300">|</span>
            <span className="text-slate-600 dark:text-slate-400">New Delhi, IN</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
