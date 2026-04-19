"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router]);

  if (loading) return <p>Checking authentication...</p>;
  if (!user) return null;

  return children;
}