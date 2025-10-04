import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { DotIcon, HeartIcon, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat.js";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovie,
    favoriteMovie,
    image_base_url,
  } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);

      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");
      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        await fetchFavoriteMovie();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 pt-30 md:px-16 md:pt-50 lg:px-40">
      <div className="max-x-6xl mx-auto flex flex-col gap-8 md:flex-row">
        <img
          src={image_base_url + show.movie.poster_path}
          alt=""
          className="h-104 max-w-70 rounded-xl object-cover max-md:mx-auto"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary uppercase">english</p>
          <h1 className="max-w-96 text-4xl font-semibold text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="text-primary fill-primary h-5 w-5" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="mt-2 max-w-xl text-sm leading-tight text-gray-400">
            {show.movie.overview}
          </p>

          <p className="flex items-center">
            {timeFormat(show.movie.runtime)} <DotIcon />{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")}{" "}
            <DotIcon /> {show.movie.release_date.split("-")[0]}{" "}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-800 px-7 py-3 text-sm font-medium transition hover:bg-gray-900 active:scale-95">
              <PlayCircleIcon className={`h-5 w-5`} />
              Watch Trailer
            </button>
            <a
              href="#dataSelect"
              className="bg-primary hover:bg-primary-dull cursor-pointer rounded-md px-10 py-3 text-sm font-medium transition active:scale-95"
            >
              Buy Tickets
            </a>
            <button
              onClick={handleFavorite}
              className="cursor-pointer rounded-full bg-gray-700 p-2.5 transition active:scale-95"
            >
              <HeartIcon
                className={`h-5 w-5 ${
                  favoriteMovie.find((movie) => movie._id === id)
                    ? "fill-primary text-primary"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-20 text-lg font-medium">Your Favorite Cast</p>
      <div className="no-scrollbar mt-8 overflow-x-auto pb-4">
        <div className="flex w-max items-center gap-4 px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={image_base_url + cast.profile_path}
                alt=""
                className="aspect-square h-20 rounded-full object-cover md:h-20"
              />
              <p className="mt-3 text-xs font-medium">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className="mt-20 mb-8 text-lg font-medium">You May Also Like</p>
      <div className="flex flex-wrap gap-8 max-sm:justify-center">
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="bg-primary hover:bg-primary-dull cursor-pointer rounded-md px-10 py-3 text-sm font-medium transition"
        >
          Show more
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetail;
