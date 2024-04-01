import { useState } from "react";
import { api } from "@/api/api";
import { setCookie } from "nookies";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("login", { email, password });
      console.log("Login bem-sucedido:", data);

      setCookie(null, "token", data.accessToken, {
        maxAge: 3600, // 1 hour
        path: "/",
      });
      setCookie(null, "name", data.name, {
        maxAge: 3600, // 1 hour
        path: "/",
      });

      console.log("Redirecting to /home");
      window.location.href = "/home";
    } catch (error) {
      setError(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    loading,
    error,
  };
};
