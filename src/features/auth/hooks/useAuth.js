"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { TokenService } from "@/lib/tokenService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const token = TokenService.getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading };
};