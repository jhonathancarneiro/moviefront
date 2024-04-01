"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";
import Spinner from "@/components/spinner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { createUser, loading, error } = useCreateUser();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      if (!name || !email || !password) {
        setApiError("Todos campos devem ser preenchidos.");
        return;
      }

      try {
        const userData = await createUser(name, email, password);
        setSuccessMessage("Conta criada com sucesso.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error: any) {
        console.error(error);
        setApiError(error.message);
      }
    },
    [name, email, password, createUser]
  );

  return (
    <main className="bg-slate-800 h-screen flex items-center justify-center p-10">
      <div className="grid h-full w-full grid-cols-1 bg-black md:grid-cols-2">
        <div className="bg-slate-900 text-white flex flex-col items-center justify-center ">
          <div className="my-4">
            <h1 className="text-3xl font-semibold">Cadastre</h1>
            <p className="mt-2 text-xs text-slate-400">
              Crie sua conta e desfrute.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="name"> Nome*</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-lg w-96 "
              type="name"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="email"> Email*</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-lg"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="email"> Password*</Label>

            <Input
              className="mt-2 mb-4 bg-transparent rounded-lg"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {apiError && (
              <div className="w-96 bg-red-500 p-2 rounded-sm ">{apiError}</div>
            )}
            {successMessage && (
              <div className="w-96 bg-green-500 p-2 rounded-sm flex justify-between ">
                {successMessage} <Spinner />
              </div>
            )}
            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-400 hover:bg-indigo-700"
              disabled={loading}
            >
              Cadastrar
            </Button>

            <Button
              className=" w-full mt-6 bg-red-400 hover:bg-red-700"
              onClick={() => (window.location.href = "/")}
            >
              Cancelar
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <div
            style={{
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original/jDzRWCbsndnAhpB70L1jhjzw1NV.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.5,
            }}
            className="h-full w-full"
          ></div>
        </div>
      </div>
    </main>
  );
}
