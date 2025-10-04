import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import BlurCircle from "../../components/BlurCircle";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user, image_base_url } = useAppContext();

  const [dashBoardData, setDashBoardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShow: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashBoardCards = [
    {
      title: "TotalBookings",
      value: dashBoardData?.totalBookings || 0,
      icon: ChartLineIcon,
    },
    {
      title: "TotalRevenue",
      value: (currency || "") + (dashBoardData?.totalRevenue || 0),
      icon: CircleDollarSignIcon,
    },
    {
      title: "ActiveShows",
      value: dashBoardData?.activeShow?.length || 0,
      icon: PlayCircleIcon,
    },
    {
      title: "TotalUser",
      value: dashBoardData?.totalUser || 0,
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setDashBoardData(data.dashboardData);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return !loading ? (
    <div>
      <Title text1={"Admin"} text2={"Dashboard"} />

      <div className="relative mt-6 flex flex-wrap gap-4">
        <BlurCircle top="-100px" left="0" />

        <div className="flex w-full flex-wrap gap-4">
          {dashBoardCards.map((card, index) => (
            <div
              key={index}
              className="bg-primary/10 border-primary/20 flex w-full max-w-50 items-center justify-between rounded-md border px-4 py-3"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="mt-1 text-xl font-medium">{card.value}</p>
              </div>
              <card.icon className="h-6 w-6" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium">Active Shows</p>

      <div className="relative mt-4 flex max-w-5xl flex-wrap gap-6">
        <BlurCircle top="100px" left="-10%" />

        {dashBoardData?.activeShow?.map((show) => (
          <div
            className="bg-primary/10 border-primary/20 h-full w-55 overflow-hidden rounded-lg border pb-3 transition duration-300 hover:-translate-y-1"
            key={show._id}
          >
            <img
              src={image_base_url + show.movie.poster_path}
              alt=""
              className="h-60 w-full object-cover"
            />
            <p className="truncate p-2 font-medium">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show.showPrice}
              </p>
              <p className="mt-1 flex items-center gap-1 pr-1 text-sm text-gray-400">
                <StarIcon className="text-primary fill-primary h-4 w-4" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
