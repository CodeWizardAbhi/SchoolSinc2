import { redirect } from "next/navigation";

export default function Home() {
    // Landing page temporarily disabled - redirecting to login
    redirect("/auth/login/student");
}
