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
import { useEffect, useState } from "react";

const Booking = () => {
  const [status, setStatus] = useState("All");

  const [items, setItems] = useState([]);



  const fetchBookings = async () => {
  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/bookings/getbooking.php"
    );

    const data = await response.json();
    setItems(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchBookings();
}, []);

  // const removeBooking = async()=>{
  // console.log("removeBooking function called");

  // }
const removeBooking = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this booking?");

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/bookings/deletebooking.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();

    if (data.status) {
      alert(data.message);

      // Remove deleted booking from table
      setItems((prev) => prev.filter((booking) => booking.id !== id));
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

const updateBookingStatus = async (id, status) => {
  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/bookings/updatebookingstatus.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      alert(result.message);

      // Refresh bookings
      fetchBookings();

      // OR update state without API call
      // setBookings(prev =>
      //   prev.map(item =>
      //     item.id === id ? { ...item, status } : item
      //   )
      // );

    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
  }
};

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
      <div className=" flex flex-col  gap-3 sm:flex-row items-center justify-between mb-6">

        <div className="relative w-full  max-w-md">

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

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-48 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancel">Cancel</option>
        </select>


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

                    <td className="px-4 py-3 font-medium text-gray-900">
                      {booking.patientName}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {booking.doctor}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {booking.service}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {booking.booking_date}
                      <br />
                      {booking.booking_time}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {booking.phone}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                       className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium border
${
  booking.status === "Confirmed"
    ? "bg-blue-50 text-blue-600 border-blue-200"
    : booking.status === "Completed"
    ? "bg-green-50 text-green-600 border-green-200"
    : booking.status === "Cancelled"
    ? "bg-red-50 text-red-600 border-red-200"
    : "bg-yellow-50 text-yellow-600 border-yellow-200"
}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {booking.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => updateBookingStatus(booking.id,"Confirmed")}
                          className="w-10 h-10 rounded-2xl border  border-gray-200 shadow-sm flex items-center justify-center hover:bg-blue-50"
                        >
                          <Check className="w-5 h-5 text-blue-600" />
                        </button>

                        <button
                          onClick={() => updateBookingStatus(booking.id, "Completed")}
                          className="w-10 h-10 rounded-2xl border border-gray-200  shadow-sm flex items-center justify-center hover:bg-green-50"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </button>

                        <button
                           onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                          className="w-10 h-10 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-yellow-50"
                        >
                          <X className="w-5 h-5 text-orange-500" />
                        </button>

                        <button
                        onClick={()=>removeBooking(booking.id)}
                          className="w-10 h-10 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-red-50"
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