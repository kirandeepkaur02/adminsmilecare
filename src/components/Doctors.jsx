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




const Doctors = () => {

  const [doctors, setDoctors] = useState([]);


  const [formData, setFormData] = useState({
  id: "",
  name: "",
  specialization: "",
  qualification: "",
  experience: "",
  phone: "",
  email: "",
  available_days: "",
  consultation_time: "",
  description: "",
});

const [showEdit, setShowEdit] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const fetchDoctors = () => {
    fetch("http://localhost/adminsmilecare/doctors/getdoctors.php")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Delete
  const deleteDoctor = (id) => {

    if(!window.confirm("Delete this doctor?")) return;

    fetch("http://localhost/adminsmilecare/doctors/delete.php",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        fetchDoctors();
    });

  };


 

const editDoctor = (id) => {
  fetch("http://localhost/adminsmilecare/doctors/getdoctors.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); 

      setFormData({
        id: data.id || "",
        name: data.name || "",
        specialization: data.specialization || "",
        qualification: data.qualification || "",
        experience: data.experience || "",
        phone: data.phone || "",
        email: data.email || "",
        available_days: data.available_days || "",
        consultation_time: data.consultation_time || "",
        description: data.description || "",
      });

      setShowEdit(true);
    });
};

const updateDoctor = () => {
  fetch("http://localhost/adminsmilecare/doctors/editdoctors.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);

      if (data.status) {
        setShowEdit(false);
        fetchDoctors(); // Refresh doctor list
      }
    });
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

          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Doctor
        </button>

      </div>

      {/* Search */}

      <div className="relative  mb-6 max-w-md">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Doctor..."


          className="w-full border border-gray-200   shadow-sm  rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

 <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
   <div className="overflow-x-auto">

        <table className="max-w-3 text-sm">

          <thead className="bg-gray-100">

            <tr className="text-left uppercase text-xs text-gray-500">

              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Specialization</th>
              <th className="px-5 py-3">Qualification</th>
              <th className="px-5 py-3">Experience</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Available Days</th>
              <th className="px-5 py-3">Time</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Action</th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-200">

            {doctors.map((doctor) => (

              <tr key={doctor.id}
                className="  hover:bg-gray-100"
              >

                <td className=" p-2">{doctor.id}</td>

                <td className=" p-2">
                  {doctor.name}
                </td>

                <td className=" p-2">
                  {doctor.specialization}
                </td>

                <td className=" p-2">
                  {doctor.qualification}
                </td>

                <td className=" p-2">
                  {doctor.experience}
                </td>

                <td className=" p-2">
                  {doctor.phone}
                </td>

                <td className=" p-2">
                  {doctor.email}
                </td>

                <td className=" p-2">
                  {doctor.available_days}
                </td>

                <td className=" p-2">
                  {doctor.consultation_time}
                </td>

                <td className=" p-2">
                  {doctor.description}
                </td>

                <td className=" p-2">

                  <div className="flex gap-2">

                    <button
                     onClick={()=> {
                        setShowEdit(true);
                        editDoctor(doctor.id)
                     }
                      
                      }  
                                      
                      className="bg-blue-500 text-white p-2 rounded"
                      // onClick={() => alert("Open Edit Modal")}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => deleteDoctor(doctor.id)}
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>
        </table>


      </div>
 </div>

 {showEdit && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-175 p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">Edit Doctor</h2>

        <button onClick={() => setShowEdit(false)}>
          <X size={22} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="available_days"
          value={formData.available_days}
          onChange={handleChange}
          placeholder="Available Days"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="consultation_time"
          value={formData.consultation_time}
          onChange={handleChange}
          placeholder="Consultation Time"
          className="border p-2 rounded"
        />

      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded w-full mt-4"
        rows={4}
      ></textarea>

      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={() => setShowEdit(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>

        <button
          onClick={updateDoctor}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
 </div>
  );
};
export default Doctors