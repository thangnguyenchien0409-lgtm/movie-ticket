// api to check if user is admin

import Booking from "../modals/Booking.js";
import Show from "../modals/Show.js";
import User from "../modals/User.js";

export const isAdmin = async (req, res) => {
  res.json({
    success: true,
    isAdmin: true,
  });
};

// api to get dashboard data

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShow = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBokings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => {
        acc + booking.amount;
      }, 0),
      activeShow,
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get all show

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const booking = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
