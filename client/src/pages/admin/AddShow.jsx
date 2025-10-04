import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddShow = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [addingShow, setAddingShow] = useState(false);

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setNowPlayingMovie(data.movies);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTime = prev[date].filter((t) => t !== time);
      if (filteredTime.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTime,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit run");
    try {
      setAddingShow(true);

      if (
        !selectedMovie ||
        Object.keys(dateTimeSelection).length === 0 ||
        !showPrice
      ) {
        return toast("Mising reqired fields");
      }

      const showsInput = Object.entries(dateTimeSelection).map(
        ([date, time]) => ({ date, time })
      );

      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post("/api/show/add", payload, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);
        setSelectedMovie(null);
        setDateTimeSelection({});
        setShowPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã có lỗi xáy ra. Vui lòng thử lại");
    }
    setAddingShow(false);
  };

  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies();
    }
  }, [user]);

  return nowPlayingMovie.length > 0 ? (
    <div>
      <Title text1={"Add"} text2={"Show"} />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      <div className="max-w-[70vw] overflow-x-auto pb-4">
        <div className="group mt-4 flex w-max flex-nowrap gap-4">
          {nowPlayingMovie.map((movie) => (
            <div
              onClick={() => setSelectedMovie(movie.id)}
              key={movie.id}
              className={`relative w-40 shrink-0 cursor-pointer transition duration-300 group-hover:not-hover:opacity-40 hover:-translate-y-1`}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={image_base_url + movie.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between bg-black/70 p-2 text-sm">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="text-primary fill-primary h-4 w-4" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)} Votes
                  </p>
                </div>
              </div>

              {selectedMovie === movie.id && (
                <div className="bg-primary absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded">
                  <CheckIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
              )}

              <p className="truncate font-medium">{movie.title}</p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium">Show Price</label>
        <div className="inline-flex items-center gap-2 rounded-md border border-gray-600 px-3 py-2">
          <p className="text-sm text-gray-400">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>

      {/* Date/Time */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Select Date and Time
        </label>
        <div className="inline-flex items-center gap-5 rounded-lg border border-gray-600 p-1 pl-3">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="rounded-md outline-none"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 hover:bg-primary rounded-lg px-3 py-2 text-sm text-white"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Times */}
      {Object?.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border-primary flex items-center rounded border px-2 py-1"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={addingShow}
        className="bg-primary hover:bg-primary/90 mt-6 cursor-pointer rounded px-8 py-2 text-white transition-all"
      >
        Add Show
      </button>
    </div>
  ) : (
    <Loading />
  );
};

export default AddShow;
