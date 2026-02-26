"use client";

import { useAuthContext } from "../providers/AuthProvider";

export { useAuthContext };

export const useAuth = () => {
  const { user, loading, refreshUser } = useAuthContext();
  return { user, loading, refreshUser };
};
