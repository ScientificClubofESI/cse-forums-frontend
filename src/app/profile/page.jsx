"use client";
import Link from "next/link";
import Sidebar from "@/components/profile/sidebar";
import { useAuth } from "@/hooks/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Profil() {
  const router = useRouter();
  // if the user is not authenticated redirect to the login
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);
  



  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-[48px] m-8 md:m-20">
      {/* Sidebar */}
      <Sidebar />

      {/* Navigation */}
      <div className="basis-3/4">
        <div className="flex flex-row gap-6 mb-8">
          <Link
            href="/profile/myquestions"
            className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white"
          >
            My Questions
          </Link>
          <Link
            href="/profile/myreplies"
            className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white"
          >
            My Answers
          </Link>
          <Link
            href="/profile/savedquestions"
            className="py-2 px-6 bg-neutral-200 rounded hover:bg-secondary-500 hover:text-white"
          >
            Saved Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
