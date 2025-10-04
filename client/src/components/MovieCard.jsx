import { DotIcon, StarIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { image_base_url } = useAppContext();

  return (
    <div className="z-20 flex w-66 flex-col justify-between rounded-2xl bg-gray-800 p-3 transition duration-300 hover:-translate-y-1">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={image_base_url + movie.backdrop_path}
        alt=""
        className="h-52 w-full cursor-pointer rounded-lg object-cover object-right-bottom"
      />
      <p className="mt-2 truncate font-semibold">{movie.title}</p>

      <p className="mt-2 flex items-center text-sm text-gray-400">
        {new Date(movie.release_date).getFullYear()} <DotIcon />{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        <DotIcon /> {timeFormat(movie.runtime)}
      </p>

      <div className="mt-4 flex items-center justify-between pb-3">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="btn-primary px-4 py-2"
        >
          Buy Tickets
        </button>
        <p className="mt-1 flex items-center gap-1 pr-1 text-sm text-gray-400">
          <StarIcon className="text-primary fill-primary h-4 w-4" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
