import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarPlus, UserPlus } from "lucide-react";
import {
  Stethoscope,
  Users,
  UserRound,
  CalendarCheck,
  Sparkles,
  MessageSquareQuote,
  Newspaper,
} from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";


const Dashboard = () => {



  const [dashboardData, setDashboardData] = useState({
  doctors: 0,
  staff: 0,
  patients: 0,
  bookings: 0,
  services: 0,
  testimonials: 0,
  // blogs: 0,
  todayBookings: 0,
});  

  useEffect(() => {
  fetch("http://localhost/adminsmilecare/dashboard/dashboardsCards.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setDashboardData(data.data);
      }
    })
    .catch((err) => console.log(err));
}, []);




  return (
    <div className="px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-350 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-sky-500 via-sky-600 to-teal-500 p-6 text-white shadow-lg sm:p-8"
      >
        {/* Background Blur Circles */}
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl"></div>

        <div className="relative grid gap-4 sm:flex sm:items-center sm:justify-between">
          {/* Left Side */}
          <div>
            <p className="text-sm text-white/80">
              Good morning, Dr. Admin 
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Welcome back to SmileCare
            </h2>

            <p className="mt-2 max-w-xl text-sm text-white/90">
              You have{" "}
              <span className="font-semibold">
                {dashboardData.bookings}
              </span>{" "}
              pending bookings and{" "}
              <span className="font-semibold">
                {dashboardData.todayBookings}
              </span>{" "}
              appointments today.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/bookings"
              className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:bg-white/30"
            >
              <CalendarPlus size={18} />
              New Booking
            </Link>

            <Link
              to="/patients"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-sky-600 transition-all duration-300 hover:bg-gray-100"
            >
              <UserPlus size={18} />
              Add Patient
            </Link>
          </div>
        </div>
      </motion.div>
    </div>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">

      <StatCard
        label="Total Doctors"
        value={dashboardData.doctors}
        icon={Stethoscope}
        tone="primary"
        trend="+2 this month"
        index={0}
      />

      <StatCard
        label="Total Staff"
        value={dashboardData.staff}
        icon={Users}
        tone="secondary"
        trend="+1 this week"
        index={1}
      />

      <StatCard
        label="Total Patients"
        value={dashboardData.patients}
        icon={UserRound}
        tone="accent"
        trend="+8.2%"
        index={2}
      />

      <StatCard
        label="Total Bookings"
        value={dashboardData.bookings}
        icon={CalendarCheck}
        tone="success"
        trend="+12%"
        index={3}
      />

      <StatCard
        label="Services"
        value={dashboardData.services}
        icon={Sparkles}
        tone="info"
        index={4}
      />

      <StatCard
        label="Testimonials"
        value={dashboardData.testimonials}
        icon={MessageSquareQuote}
        tone="warning"
        index={5}
      />

      <StatCard
        label="Blogs"
        value={dashboardData.blogs}
        icon={Newspaper}
        tone="danger"
        index={6}
      />

      <StatCard
        label="Today's Visits"
        value={dashboardData.todayBookings}
        icon={CalendarCheck}
        tone="primary"
        index={7}
      />

    </div>
    </div>
    
  )
}

export default Dashboard