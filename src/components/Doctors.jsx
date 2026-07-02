import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Phone,
  Mail,
  Clock,
  Calendar,
  Eye,
  X,
} from "lucide-react";

import { motion } from "framer-motion";
import { toast } from "sonner";



const Doctors = () => {

  

  const emptyDoctor = {
    id: "",
    photo: "",
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    availableDays: "",
    consultationTime: "",
    description: "",
  };

  const [doctors, setDoctors] = useState([]);

  const [query, setQuery] = useState("");

  const [editingDoctor, setEditingDoctor] = useState(null);

  const [viewDoctor, setViewDoctor] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyDoctor);

useEffect(() => {
  fetchDoctors();
}, []);

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialization} ${doctor.email}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Doctor name is required");
      return;
    }

    if (editingDoctor) {
      setDoctors(
        doctors.map((doctor) =>
          doctor.id === editingDoctor.id
            ? {
                ...formData,
                id: editingDoctor.id,
              }
            : doctor
        )
      );

      toast.success("Doctor Updated");
    } else {
      setDoctors([
        {
          ...formData,
          id: Date.now(),
          photo:
            formData.photo ||
            "https://randomuser.me/api/portraits/lego/1.jpg",
        },
        ...doctors,
      ]);

      toast.success("Doctor Added");
    }

    setShowForm(false);
    setEditingDoctor(null);
    setFormData(emptyDoctor);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this doctor?")) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      toast.success("Doctor Deleted");
    }
  };

const fetchDoctors = async () => {
  try {
    const res = await fetch("http://localhost/adminsmilecare/getDoctors.php");
    const data = await res.json();
    setDoctors(data);
  } catch (err) {
    console.error(err);
    toast.error("Unable to load doctors");
  }
};


  return (
   
       <div className="p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Doctors
          </h1>

          <p className="text-gray-500">
            Manage doctors and consultation schedules.
          </p>

        </div>

        <button
          onClick={() => {
            setEditingDoctor(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Doctor
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* Doctor Cards */}

      {filteredDoctors.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredDoctors.map((doctor, index) => (

            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
            >

              <div className="h-24 bg-linear-to-r from-blue-100 to-cyan-100 relative">

                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="absolute left-5 -bottom-8 h-16 w-16 rounded-xl border-4 border-white object-cover"
                />

              </div>

              <div className="pt-10 px-5 pb-5">

                <h2 className="font-semibold text-lg">
                  {doctor.name}
                </h2>

                <p className="text-blue-600 text-sm">
                  {doctor.specialization}
                </p>

                <p className="text-gray-500 text-sm">
                  {doctor.qualification} • {doctor.experience}
                </p>

                <div className="mt-3 space-y-2 text-sm">

                  <p className="flex items-center gap-2">
                    <Phone size={15} />
                    {doctor.phone}
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail size={15} />
                    {doctor.email}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={15} />
                    {doctor.availableDays}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={15} />
                    {doctor.consultationTime}
                  </p>

                </div>

                <div className="flex gap-2 mt-5">

                  <button
                    onClick={() => setViewDoctor(doctor)}
                    className="flex-1 border border-gray-200 rounded-lg py-2 hover:bg-gray-100 flex justify-center items-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() => {
                      setEditingDoctor(doctor);
                      setShowForm(true);
                    }}
                    className="border  border-gray-200 rounded-lg p-2 hover:bg-yellow-100"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="border border-gray-200 rounded-lg p-2 text-red-500 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </motion.div>

          ))}
        </div>

            
)}

          

    

      {/* View Doctor Modal */}

      {viewDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl w-full max-w-lg relative">

            <button
              onClick={() => setViewDoctor(null)}
              className="absolute top-4 right-4"
            >
              <X size={22} />
            </button>

            <div className="p-6">

              <div className="flex gap-5">

                <img
                  src={viewDoctor.photo}
                  alt={viewDoctor.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {viewDoctor.name}
                  </h2>

                  <p className="text-blue-600">
                    {viewDoctor.specialization}
                  </p>

                  <p className="text-gray-500">
                    {viewDoctor.qualification}
                  </p>

                  <p className="text-gray-500">
                    {viewDoctor.experience}
                  </p>

                </div>

              </div>

              <div className="mt-6 space-y-3 text-sm">

                <p>
                  <strong>Phone :</strong> {viewDoctor.phone}
                </p>

                <p>
                  <strong>Email :</strong> {viewDoctor.email}
                </p>

                <p>
                  <strong>Available :</strong> {viewDoctor.availableDays}
                </p>

                <p>
                  <strong>Consultation :</strong>{" "}
                  {viewDoctor.consultationTime}
                </p>

                <p>
                  <strong>Description :</strong>
                </p>

                <p className="text-gray-600">
                  {viewDoctor.description}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Add/Edit Doctor Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-xl w-full max-w-3xl relative">

            <button
              onClick={() => {
                setShowForm(false);
                setEditingDoctor(null);
              }}
              className="absolute right-5 top-5"
            >
              <X />
            </button>

            <div className="p-6">

              <h2 className="text-2xl font-bold mb-6">

                {editingDoctor ? "Edit Doctor" : "Add Doctor"}

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Field label="Photo URL">

                  <input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                   className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Doctor Name">

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Specialization">

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Qualification">

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Experience">

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Phone">

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Email">

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                   className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <Field label="Available Days">

                  <input
                    type="text"
                    name="availableDays"
                    value={formData.availableDays}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                  />

                </Field>

                <div className="md:col-span-2">

                  <Field label="Consultation Time">

                    <input
                      type="text"
                      name="consultationTime"
                      value={formData.consultationTime}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                    />

                  </Field>

                </div>

                <div className="md:col-span-2">

                  <Field label="Description">

                    <textarea
                      rows="4"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                    />

                  </Field>

                </div>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingDoctor(null);
                  }}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingDoctor ? "Update Doctor" : "Add Doctor"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      </div>
    );
  };

/* =========== Field Component  ============== */

function Field({ label, children }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      {children}
    </div>
  );
}

/* ============ Empty State  ================= */

function EmptyState() {
  return (
    <div className="bg-white border rounded-xl p-12 text-center">

      <Search
        size={55}
        className="mx-auto text-gray-400"
      />

      <h2 className="mt-5 text-2xl font-semibold">
        No Doctors Found
      </h2>

      <p className="text-gray-500 mt-2">
        Try searching with another name or add a new doctor.
      </p>

    </div>
   )}

  
export default Doctors