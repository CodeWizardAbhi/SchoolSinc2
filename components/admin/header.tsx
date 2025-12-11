import { Search, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b">
            <div className="w-1/3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 bg-slate-50 dark:bg-slate-800 border-none rounded-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-slate-500">
                    <Settings className="h-5 w-5" />
                </Button>
                <div className="relative">
                    <Button variant="ghost" size="icon" className="text-slate-500">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </div>

                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin User</p>
                        <p className="text-xs text-slate-500">School Administrator</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}
