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
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { useNavigate } from "react-router-dom";





const Dashboard = () => {

    const navigate = useNavigate();

  const [statusBreakdown, setStatusBreakdown] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
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
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 const [todayBookings, setTodayBookings] = useState([]);
  


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


  useEffect(() => {
    fetch("http://localhost/adminsmilecare/dashboard/getMonthlyBookings.php")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyBookings(data);
      })
      .catch((err) => console.log(err));
  }, []);


  const getAppointmentStatus = async () => {

    try {

      const response = await fetch(
        "http://localhost/adminsmilecare/dashboard/appointmentStatus.php"
      );

      const result = await response.json();

      if (result.success) {
        setStatusBreakdown(result.data);
      }

    }
    catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getAppointmentStatus();
  }, []);

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  useEffect(() => {
    fetchTodayAppointments();
  }, []);

  const fetchTodayAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost/adminsmilecare/dashboard/getTodayAppointments.php"
      );

      const data = await response.json();

      if (data.success) {
      setTodayBookings(data.data || []);
    } else {
      setTodayBookings([]);
    }
  } catch (error) {
    console.log(error);
    setTodayBookings([]);
  } finally {
    setLoading(false);
  }
  };






  const fetchRecentBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost/adminsmilecare/dashboard/getRecentBookings.php"
      );

      const data = await response.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };


  const StatusBadge = ({ status }) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-700";
        break;

      case "Confirmed":
        bgColor = "bg-blue-100";
        textColor = "text-blue-700";
        break;

      case "Completed":
        bgColor = "bg-green-100";
        textColor = "text-green-700";
        break;

      case "Cancelled":
        bgColor = "bg-red-100";
        textColor = "text-red-700";
        break;

      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-700";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}
      >
        {status}
      </span>
    );
  };

const StatusBadgeAppointment = ({ status }) => {
  let bg = "";

  switch (status) {
    case "Pending":
      bg = "bg-yellow-100 text-yellow-700";
      break;

    case "Confirmed":
      bg = "bg-blue-100 text-blue-700";
      break;

    case "Completed":
      bg = "bg-green-100 text-green-700";
      break;

    case "Cancelled":
      bg = "bg-red-100 text-red-700";
      break;

    default:
      bg = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bg}`}>
      {status}
    </span>
  );
};


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

              {/* <p className="mt-2 max-w-xl text-sm text-white/90">
                You have{" "}
                <span className="font-semibold">
                  {dashboardData.bookings}
                </span>{" "}
                pending bookings and{" "}
                <span className="font-semibold">
                  {dashboardData.todayBookings}
                </span>{" "}
                appointments today.
              </p> */}
            </div>

            {/* Right Side */}
            {/* <div className="flex flex-wrap gap-3">
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
            </div> */}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">

        <StatCard 
         onClick={()=> navigate("/doctors")}
          label="Total Doctors"
          value={dashboardData.doctors}
          icon={Stethoscope}
          tone="primary"
          trend="+2 this month"
          index={0}
        />

        <StatCard
          onClick={()=> navigate("/staff")}
          label="Total Staff"
          value={dashboardData.staff}
          icon={Users}
          tone="secondary"
          trend="+1 this week"
          index={1}
        />

        <StatCard
          onClick={()=> navigate("/patients")}
          label="Total Patients"
          value={dashboardData.patients}
          icon={UserRound}
          tone="accent"
          trend="+8.2%"
          index={2}
        />

        <StatCard
          onClick={()=> navigate("/bookings")}
          label="Total Bookings"
          value={dashboardData.bookings}
          icon={CalendarCheck}
          tone="success"
          trend="+12%"
          index={3}
        />

        <StatCard
          onClick={()=> navigate("/services")}
          label="Services"
          value={dashboardData.services}
          icon={Sparkles}
          tone="info"
          index={4}
        />

        <StatCard
          onClick={()=> navigate("/testimonials")}
          label="Testimonials"
          value={dashboardData.testimonials}
          icon={MessageSquareQuote}
          tone="warning"
          index={5}
        />

        <StatCard
          onClick={()=> navigate("/blogs")}
          label="Blogs"
          value={dashboardData.blogs}
          icon={Newspaper}
          tone="danger"
          index={6}
        />

        <StatCard
          onClick={()=> navigate("/bookings")}
          label="Today's Visits"
          value={dashboardData.todayBookings}
          icon={CalendarCheck}
          tone="primary"
          index={7}
        />

      </div>


      <div className="grid gap-3 lg:grid-cols-2 mt-10">
        <div className="rounded-2xl    border border-gray-200 bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Monthly Bookings
              </h3>
              <p className="text-sm text-gray-500">
                Bookings overview for this year
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              {new Date().getFullYear()}
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBookings}>
                <defs>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#0EA5A4" stopOpacity={0.7} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="bookings"
                  fill="url(#barFill)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>




        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">

          <h3 className="text-lg font-semibold">
            Appointment Status
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            Current Distribution
          </p>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={statusBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >

                  {
                    statusBreakdown.map((item, index) => (
                      <Cell
                        key={index}
                        fill={item.color}
                      />
                    ))
                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-10">
        <div className="rounded-2xl border border-gray-200 shadow-sm  bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">
              Recent Bookings
            </h3>

            <Link
              to="/bookings"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Doctor</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      Loading...
                    </td>
                  </tr>
                ) : bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="transition hover:bg-blue-300/40"
                    >
                      <td className="py-3 font-medium">
                        {booking.patientName}
                      </td>

                      <td className="py-3 text-muted-foreground">
                        {booking.doctorName}
                      </td>

                      <td className="py-3 text-muted-foreground">
                        {booking.bookingDate} · {booking.bookingTime}
                      </td>

                      <td className="py-3">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      No Bookings Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
       </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow">
      <h3 className="text-base font-semibold">
        Today's Appointments
      </h3>

      <div className="mt-4 space-y-3">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) :(todayBookings?.length ?? 0) === 0 ? (
          <p className="text-gray-500">
            No appointments today.
          </p>
        ) : (
         (todayBookings || []).map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-600">
                <CalendarCheck size={18} />
              </div>

              <div className="flex-1">
                <p className="font-medium">
                  {b.patient_name}
                </p>

                <p className="text-sm text-gray-500">
                  {b.service_name} • {b.booking_time}
                </p>
              </div>

              <StatusBadgeAppointment status={b.status} />
            </div>
          ))
        )}
      </div>
    </div>

      </div>
     </div>
  )
}

export default Dashboard