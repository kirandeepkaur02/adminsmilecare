import React from 'react'
import {
  Plus, Search, X
} from "lucide-react";
import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Staff = () => {

  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([
    {
      id: "",
      name: "",
      position: "",
      phone: "",
      email: "",
      joining_date: "",
    },
  ]);

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.joining_date) {
      newErrors.joining_date = "Joining date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const initialStaff = {
    
    name: "",
    position: "",
    phone: "",
    email: "",
    joining_date: "",
  };

  const [formData, setFormData] = useState(initialStaff);

  const openAdd = () => {
    setEditingStaff(null);
    setFormData(initialStaff);
    setShowForm(true);
  };

  const openEdit = (staff) => {
    setEditingStaff(staff);
    setFormData(staff);
    setShowForm(true);
  };

  // const remove = (id) => {
  //   console.log("Delete staff:", id);
  // };

  // const remove = async (id) => {
  //   const confirmDelete = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to recover this staff!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //   });

  //   if (!confirmDelete.isConfirmed) return;

  //   // if (!confirmDelete) return;

  //   try {

  //     const response = await fetch(
  //       "http://localhost/adminsmilecare/staffs/deletestaff.php",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id }),
  //       }
  //     );

  //     const result = await response.json();

  //     // alert(result.message);

  //     if (result.success) {

  //       Swal.fire({
  //         icon: "success",
  //         title: "Deleted!",
  //         text: result.message,
  //         timer: 1800,
  //         showConfirmButton: false,
  //       });


  //       loadStaff();
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: result.message,
  //       });
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

const remove = async (id) => {
  // First confirmation
  const firstConfirm = await Swal.fire({
    title: "Delete Staff?",
    text: "Do you want to delete this staff record?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  if (!firstConfirm.isConfirmed) return;

  // Second confirmation
  const secondConfirm = await Swal.fire({
    title: "Final Confirmation",
    text: "This action cannot be undone. Are you sure you want to permanently delete this staff?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Delete Permanently",
    cancelButtonText: "Cancel",
  });

  if (!secondConfirm.isConfirmed) return;

  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/staffs/deletestaff.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const result = await response.json();

    if (result.success) {
  toast.success(result.message);


      loadStaff();
    } else {
       toast.error(result.message);
    }
  } catch (error) {
   toast.error("Something went wrong!");
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

    if (!validate()) return;

    const api = editingStaff
      ? "http://localhost/adminsmilecare/staffs/editstaff.php"
      : "http://localhost/adminsmilecare/staffs/addstaff.php";

    try {

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // alert(result.message);





     if (result.success) {
      toast.success(result.message);
        setShowForm(false);
        setFormData(initialStaff);
        setEditingStaff(null);

        loadStaff(); // Reload table
      } else {
       toast.error(result.message);
      }

    } catch (error) {
     toast.error(error.message);

  }};

  const loadStaff = () => {
    fetch("http://localhost/adminsmilecare/staffs/getstaff.php")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  useEffect(() => {
    loadStaff();
  }, []);

  useEffect(() => {
    fetch("http://localhost/adminsmilecare/staffs/getstaff.php")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);




  return (


    <div className="p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Staffs
          </h1>

          <p className="text-gray-500">
            Manage staffs and duty schedules.
          </p>

        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add staff
        </button>



      </div>

      {/* Search */}

      <div className="relative mb-6 max-w-md">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Doctor..."

          className="w-full border border-gray-200 shadow-sm rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">

            {/* Header */}
            <div className=" px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingStaff ? "Edit Staff" : "Add Staff"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="absolute right-4 top-4 rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={20} />
              </button>

            </div>

            {/* Body */}
            <div className="grid gap-4 p-6 sm:grid-cols-2">

              {/* <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200  shadow-sm px-3 py-2 outline-none focus:border-blue-500"
                />
              </div> */}

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg  shadow-sm border  border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full rounded-lg border  shadow-sm border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
                {errors.position && (
<p className="text-red-500 text-sm mt-1">
  {errors.position}
</p>
)}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border  shadow-sm  border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
                {errors.phone && (
<p className="text-red-500 text-sm mt-1">
  {errors.phone}
</p>
)}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border  shadow-sm border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
                {errors.email && (
<p className="text-red-500 text-sm mt-1">
  {errors.email}
</p>
)}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  className="w-full rounded-lg border shadow-sm  border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
                {errors.joining_date && (
<p className="text-red-500 text-sm mt-1">
  {errors.joining_date}
</p>
)}
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3  px-6 py-4">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border shadow-sm border-gray-200 px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded-lg shadow-sm bg-blue-400 px-5 py-2 text-white "
              >
                {editingStaff ? "Save Changes" : "Add Staff"}
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 font-medium text-right">Actions</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Position</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Joined</th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200  ">
              {items.length > 0 ? (
                items.map((staff) => (
                  <tr key={staff.id} className="hover:bg-muted/30 transition">

                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(staff)}
                          className="p-2 border border-gray-200  shadow-sm  rounded hover:bg-gray-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => remove(staff.id)}
                          className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {/* <img
                           src={staff.photo || null}
    alt={staff.name}
                          className="h-5 w-5 rounded-lg object-cover"
                        /> */}
                        <span className="font-medium">{staff.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3">{staff.position}</td>

                    <td className="px-5 py-3">{staff.phone}</td>

                    <td className="px-5 py-3">{staff.email}</td>

                    <td className="px-5 py-3">{staff.joining_date}</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-muted-foreground">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

 <ToastContainer
    position="top-right"
    autoClose={2000}
  />

    </div>
  )
}

export default Staff