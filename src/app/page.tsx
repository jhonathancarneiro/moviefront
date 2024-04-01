"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";

export default function Home() {
  const { email, setEmail, password, setPassword, handleSubmit, error } =
    useLogin();

  return (
    <main className="bg-slate-800 h-screen flex items-center justify-center p-10">
      <div className="grid h-full w-full grid-cols-1 bg-black md:grid-cols-2">
        <div className="bg-slate-900 text-white flex flex-col items-center justify-center ">
          <div className="my-4">
            <h1 className="text-3xl font-semibold">Login</h1>
            <p className="mt-2 text-xs text-slate-400">
              prepare-se para uma incrivel experiencia.
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="email"> Email*</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-lg w-96"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="password"> Password*</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-lg"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="w-96 bg-red-500 p-2 rounded-sm ">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-400 hover:bg-indigo-700"
            >
              Login
            </Button>
            <Button
              className="w-full mt-6 bg-emerald-400 hover:bg-emerald-700"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Criar Usuário
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
