import React, { useEffect, useState } from "react";
import {
  Plus, Search, X,
} from "lucide-react";

import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Patients = () => {

  const [isEdit, setIsEdit] = useState(false);

  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({});
  const emptyPatient = {
    id: "",
    name: "",
    email: "",
    contacts: "",
    age: "",
    gender: "Male",
    address: "",
  };
  const [formData, setFormData] = useState(emptyPatient);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  useEffect(() => {

    fetch("http://localhost/adminsmilecare/patients/getPatient.php")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

const validateForm = () => {
  let newErrors = {};

  // Name
  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  // Phone
  if (!formData.contacts.trim()) {
    newErrors.contacts = "Phone number is required";
  } else if (!/^[0-9]{10}$/.test(formData.contacts)) {
    newErrors.contacts = "Phone number must be 10 digits";
  }

  // Age
  if (!formData.age) {
    newErrors.age = "Age is required";
  } else if (formData.age <= 0) {
    newErrors.age = "Enter a valid age";
  }

  // Email
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    newErrors.email = "Invalid email address";
  }

  // Address
  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};



  const handleSave = async () => {
   if (!validateForm()) {
    toast.error("Please fix the errors before submitting.");
    return;
  }
     try {
      const response = await fetch(
        "http://localhost/adminsmilecare/patients/addPatient.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message)
        

        setIsEdit(false);          // <-- Add here
        setShowForm(false);
        setFormData(emptyPatient);

        // Reload patient list
        const res = await fetch(
          "http://localhost/adminsmilecare/patients/getPatient.php"
        );
        const data = await res.json();
        setPatients(data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
       toast.error(result.message)
    }
  };


  // const handleDelete = async (id) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to recover this patient!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#dc2626",
  //     cancelButtonColor: "#6b7280",
  //     confirmButtonText: "Yes, Delete",
  //   });

  //   if (!result.isConfirmed) return;

  //   try {
  //     const response = await fetch(
  //       "http://localhost/adminsmilecare/patients/deletePatient.php",
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Deleted!",
  //         text: "Patient deleted successfully.",
  //         timer: 1800,
  //         showConfirmButton: false,
  //       });

  //       setPatients((prev) =>
  //         prev.filter((patient) => patient.id !== id)
  //       );
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: data.message,
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong.",
  //     });
  //   }
  // };

const handleDelete = async (id) => {
  // First confirmation
  const firstConfirm = await Swal.fire({
    title: "Delete Patient?",
    text: "Do you really want to delete this patient?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Next",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563eb",
  });

  if (!firstConfirm.isConfirmed) return;

  // Second confirmation
  const secondConfirm = await Swal.fire({
    title: "Final Confirmation",
    text: "This action cannot be undone. Are you absolutely sure?",
    icon: "error",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "No",
    confirmButtonColor: "#dc2626",
  });

  if (!secondConfirm.isConfirmed) return;

  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/patients/deletePatient.php",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();

    if (data.status) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Patient deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong.",
    });
  }
};



  const handleUpdate = async () => {
    if (!validateForm()) {
    toast.error("Please fix the errors before submitting.");
    return;
  }

    try {
      const response = await fetch(
        "http://localhost/adminsmilecare/patients/editPatient.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
          toast.success(result.message)
        

        // Update UI
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === formData.id ? formData : patient
          )
        );


        setIsEdit(false);        // <-- Add here
        setShowForm(false);
        setFormData(emptyPatient);
      } else {
         toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Patients
          </h1>

          <p className="text-gray-500">
            Manage patients and appointments ...
          </p>

        </div>

        <button
          onClick={() => {
            setFormData(emptyPatient);
            setIsEdit(false);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Patient
        </button>



      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">

            {/* Header */}
            <div className=" px-6 py-4">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Edit Patient Details" : "Add Patient"}
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

              <div className="sm:col-span-2">
                <label className="mb-1  text-sm font-medium">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg  shadow-sm border  border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>



              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  name="contacts"
                  value={formData.contacts}
                  onChange={handleChange}
                  className="w-full rounded-lg border  shadow-sm  border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full rounded-lg border shadow-smborder-gray-200 focus:border-blue-500 px-3 py-2"
                />

              </div>


              <div>
                <label>Gender</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 focus:border-blue-500 px-3 py-2 shadow-sm"
                >

                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>

                </select>

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
              </div>


              <div className="sm:col-span-2">

                <label>Address</label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border-gray-200 rounded-lg border px-3 py-2 focus:border-blue-500 shadow-sm"
                />

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
                type="button"
                onClick={isEdit ? handleUpdate : handleSave}
                className="rounded-lg shadow-sm bg-blue-400 px-5 py-2 text-white "
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}


      {/* Search */}

      <div className="relative mb-6 max-w-md">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search patients..."

          className="w-full border border-gray-200 shadow-sm rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>





      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left uppercase text-xs text-gray-500">

                <th className="px-5 py-3 text-right">Actions</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Age</th>
                <th className="px-5 py-3">Gender</th>
                <th className="px-5 py-3">Address</th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="  hover:bg-gray-100"
                  >
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setFormData(patient);
                            setIsEdit(true);
                            setShowForm(true);
                          }}
                          className="rounded border border-gray-200 shadow-sm   p-2 hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="rounded border  border-gray-200 p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                          {patient.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 2)}
                        </div>

                        <span className="font-medium">
                          {patient.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>{patient.email}</div>
                      <div className="text-xs text-gray-500">
                        {patient.contacts}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-500">{patient.age}</td>

                    <td className="px-5 py-4 text-gray-500">{patient.gender}</td>

                    <td className="px-5 py-4 text-gray-500">{patient.address}</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-gray-500"
                  >
                    No patients found.
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

export default Patients