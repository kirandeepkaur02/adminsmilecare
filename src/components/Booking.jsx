import React from 'react'
import {
  Plus, Search,
} from "lucide-react";
import {
  Check,
  CheckCircle2,
  Trash2,
  X,
} from "lucide-react";
import { useEffect , useState } from "react";

const Booking = () => {

  const [items, setItems] = useState([]);
 useEffect(() => {
  fetch("http://localhost/adminsmilecare/bookings/getbooking.php")
    .then((res) => res.json())
    .then((data) => {
      setItems(data);
    })
    .catch((err) => console.log(err));
}, []);

  return (
      <div className="p-6">

         {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
           Bookings ....
          </h1>

          <p className="text-gray-500">
            Approve, reject and complete patient appointments.
          </p>

        </div>





      </div>

      {/* Search */}

      <div className="relative mb-6 max-w-md">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Booking ..."

          className="w-full border border-gray-200 shadow-sm rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

<div className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-sm">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-muted/50">
        <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
          <th className="px-5 py-3 font-medium">Patient</th>
          <th className="px-5 py-3 font-medium">Doctor</th>
          <th className="px-5 py-3 font-medium">Service</th>
           <th className="px-5 py-3 font-medium">Date & Time</th>
          <th className="px-5 py-3 font-medium">Phone</th>
          <th className="px-5 py-3 font-medium">Status</th>
          <th className="px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>

     <tbody className="divide-y divide-gray-200">
  {items.length > 0 ? (
    items.map((booking) => (
      <tr key={booking.id} className="hover:bg-gray-50">

        <td className="px-6 py-5 font-medium text-gray-900">
          {booking.patientName} 
        </td>

        <td className="px-6 py-6 text-gray-600">
          {booking.doctor}
        </td>

        <td className="px-6 py-6 text-gray-600">
          {booking.service}
        </td>

        <td className="px-6 py-6 text-gray-600">
          {booking.booking_date}
          <br />
          {booking.booking_time}
        </td>

        <td className="px-6 py-6 text-gray-600">
          {booking.phone}
        </td>

        {/* Status */}
        <td className="px-6 py-6">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border
            ${
              booking.status === "Approved"
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : booking.status === "Completed"
                ? "bg-green-50 text-green-600 border-green-200"
                : booking.status === "Rejected"
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-yellow-50 text-yellow-600 border-yellow-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current"></span>
            {booking.status}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-6">
          <div className="flex items-center gap-3">

            <button
              className="w-12 h-12 rounded-2xl border  border-gray-200 shadow-sm flex items-center justify-center hover:bg-blue-50"
            >
              <Check className="w-5 h-5 text-blue-600" />
            </button>

            <button
              className="w-12 h-12 rounded-2xl border border-gray-200  shadow-sm flex items-center justify-center hover:bg-green-50"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </button>

            <button
              className="w-12 h-12 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-yellow-50"
            >
              <X className="w-5 h-5 text-orange-500" />
            </button>

            <button
              className="w-12 h-12 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>

          </div>
        </td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center py-10 text-gray-500">
        No Bookings Found
      </td>
    </tr>
  )}
</tbody>
    </table>
  </div>
</div>


      </div>
  )
}

export default Booking