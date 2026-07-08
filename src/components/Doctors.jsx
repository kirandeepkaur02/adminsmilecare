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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Doctors = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [doctors, setDoctors] = useState([]);

  const emptyForm = {
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
  };
  const [formData, setFormData] = useState(emptyForm);

  const [showEdit, setShowEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const validate = () => {
    let newErrors = {};

    // Doctor Name
    if (!formData.name.trim()) {
      newErrors.name = "Doctor name is required";
    }

    // Specialization
    if (!formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }

    // Qualification
    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    // Experience
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(formData.experience)) {
      newErrors.experience = "Experience must be a number";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Available Days
    if (!formData.available_days.trim()) {
      newErrors.available_days = "Available days are required";
    }

    // Consultation Time
    if (!formData.consultation_time.trim()) {
      newErrors.consultation_time = "Consultation time is required";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };




  const addDoctor = () => {
    if (!validate()) return;
    fetch("http://localhost/adminsmilecare/doctors/adddoctors.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // alert(data.message);
        if (data.status) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }





        if (data.status) {
          setShowEdit(false);
          setFormData(emptyForm);
          fetchDoctors();
        }
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

    const result = Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this doctor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;


    fetch("http://localhost/adminsmilecare/doctors/delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          toast.success(data.message);
          fetchDoctors();
        } else {
          toast.error(data.message);
        }

      })
  };

  const editDoctor = (id) => {
    console.log("hiii ")
    //  if (!validate()) return;
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
        if (data.status) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }

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
          onClick={() => {
            setFormData(emptyForm);
            setIsEdit(false);
            setShowEdit(true);
          }}
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

      <div className=" rounded-2xl border border-gray-200 bg-white shadow">
        <div className="">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr className="text-left uppercase text-xs text-gray-500">

                <th className="px-5 py-3">Action</th>
                <th className="px-5 py-3">Doctor ID</th>
                <th className="px-5 py-3">Doctor Name</th>
                <th className="px-5 py-3">Specialization</th>


              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200">

              {doctors.map((doctor) => (



                <tr key={doctor.id}
                  className="  hover:bg-gray-100"
                >
                  <td className="p-2">
                    <div className="flex gap-2">

                      {/* View */}

                      <button
                        onClick={() => navigate(`/doctors/view/${doctor.id}`)}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}

                      <button
                        onClick={() => {
                          setIsEdit(true);
                          editDoctor(doctor.id);
                        }}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => deleteDoctor(doctor.id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                  <td className="p-2">{doctor.id}</td>

                  <td className="p-2">{doctor.name}</td>

                  <td className="p-2">{doctor.specialization}</td>



                </tr>

              ))}

            </tbody>
          </table>


        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-sm   p-6">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold"> {isEdit ? "Edit Doctor" : "Add Doctor"}</h2>

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
                className="border border-gray-200 p-2 shadow-sm rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}


              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className=" border border-gray-200 p-2 shadow-sm rounded"
              />
              {errors.specialization && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specialization}
                </p>
              )}
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="border border-gray-200 p-2 shadow-sm rounded"
              />
              {errors.qualification && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.qualification}
                </p>
              )}

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="border border-gray-200 p-2 shadow-sm rounded"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience}
                </p>
              )}
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border border-gray-200 p-2 shadow-sm rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-200 p-2  shadow-sm rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
              <input
                type="text"
                name="available_days"
                value={formData.available_days}
                onChange={handleChange}
                placeholder="Available Days"
                className="border border-gray-200 p-2  shadow-sm rounded"
              />
              {errors.available_days && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.available_days}
                </p>
              )}
              <input
                type="text"
                name="consultation_time"
                value={formData.consultation_time}
                onChange={handleChange}
                placeholder="Consultation Time"
                className="border border-gray-200  shadow-sm  p-2 rounded"
              />
              {errors.consultation_time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.consultation_time}
                </p>
              )}
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border border-gray-200  shadow-sm  p-2 rounded w-full mt-4"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? updateDoctor : addDoctor}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default Doctors