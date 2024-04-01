"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import { destroyCookie, parseCookies } from "nookies";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Movie {
  vote_average: number;
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {
  const [movies, setMovies] = useState([]);
  const coverImage = "https://image.tmdb.org/t/p/w500/";
  const cookies = parseCookies();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = cookies["token"];

    if (!token) {
      window.location.href = "/";
    }
  }, []);
  const handleLogout = () => {
    destroyCookie(null, "token");
    destroyCookie(null, "name");
    window.location.href = "/";
  };
  useEffect(() => {
    setUsername(cookies.name);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_MOVIES}/upcoming`
        );
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);
  const logo = "/logo.png ";
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_MOVIES}/${selectedOption}`
        );
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [selectedOption]);

  return (
    <>
      <header className="w-full h-46 bg-slate-900 flex justify-around items-center ">
        <Image src={logo} alt="logo" width={140} height={100} />
        <div className="flex-col justify-items-center text-center ">
          <Avatar className="size-16 ">
            <AvatarImage src="https://play-lh.googleusercontent.com/42Bw-VZcK_OQOCa0BpFJrAK7VtNWv6dGPX4FJurmqWk6NgbYQZ_XmD8y_2Fqd_1KzGs" />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <h1 className="text-center">{username}</h1>
          <Button
            className="bg-red-500 hover:bg-red-700 rounded-sm h-6 w-16 "
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <h1 text-center>Selecione a categoria</h1>
        <div>
          <Select value={selectedOption} onValueChange={handleOptionChange}>
            <SelectTrigger className=" w-52 bg-indigo-700">
              <SelectValue placeholder="Selecionar categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="upcoming">Lançamentos</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="top-rated">Top avaliados</SelectItem>
                <SelectItem value="now-playing">Em cartaz</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-center mt-7 mb-32">
        <div className="grid grid-cols-5 gap-4">
          {movies.map(
            (movie: {
              vote_average: number;
              id: number;
              title: string;
              poster_path: string;
            }) => (
              <Card key={movie.id} className="w-32 h-60 shadow-xl relative ">
                <div
                  className="w-full h-full rounded-lg"
                  style={{
                    backgroundImage: `url(${coverImage}${movie.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity  bg-slate-600 bord rounded-b-lg ">
                  <div className="flex justify-center items-center">
                    <StarRatings
                      rating={movie.vote_average / 2}
                      starRatedColor="#FFD700"
                      numberOfStars={5}
                      name="rating"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </div>
                  <p className="text-white text-center ">{movie.title}</p>
                </div>
              </Card>
            )
          )}
        </div>
      </div>
    </>
  );
}
