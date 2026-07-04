import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const tones = {
  primary: "from-sky-500/10 to-sky-500/0 text-sky-500",
  secondary: "from-teal-500/10 to-teal-500/0 text-teal-500",
  accent: "from-cyan-400/15 to-cyan-400/0 text-cyan-600",
  success: "from-green-500/10 to-green-500/0 text-green-500",
  warning: "from-yellow-500/10 to-yellow-500/0 text-yellow-500",
  danger: "from-red-500/10 to-red-500/0 text-red-500",
  info: "from-blue-500/10 to-blue-500/0 text-blue-500",
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  tone = "primary",
  trend,
  index = 0,
   onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
       onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Background Circle */}
      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-linear-to-br opacity-60 blur-3xl ${tones[tone]}`}
      ></div>

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {label}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          {trend && (
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp size={14} />
              {trend}
            </div>
          )}
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${tones[tone]}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;