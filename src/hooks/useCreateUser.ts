import { useState } from "react";
import { api } from "@/api/api";

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const createUser = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response = await api.post("register", {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}
