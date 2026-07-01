import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  UserRound,
  CalendarCheck,
  Sparkles,
  MessageSquareQuote,
  Newspaper,
  Settings,
  LogOut,
  Activity,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

const nav = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/doctors",
    label: "Doctors",
    icon: Stethoscope,
  },
  {
    to: "/staff",
    label: "Staff",
    icon: Users,
  },
  {
    to: "/patients",
    label: "Patients",
    icon: UserRound,
  },
  {
    to: "/bookings",
    label: "Bookings",
    icon: CalendarCheck,
  },
  {
    to: "/services",
    label: "Services",
    icon: Sparkles,
  },
  {
    to: "/testimonials",
    label: "Testimonials",
    icon: MessageSquareQuote,
  },
  {
    to: "/blogs",
    label: "Blogs",
    icon: Newspaper,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-900 text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>

            <div>
              <h2 className="font-bold text-lg">SmileCare</h2>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-500"
                  />
                )}

                <Icon
                  className={`w-5 h-5 ${
                    active ? "text-cyan-400" : ""
                  }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}

        <div className="border-t border-slate-700 p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}