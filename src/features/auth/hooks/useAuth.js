"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { TokenService } from "@/lib/tokenService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = TokenService.getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
};