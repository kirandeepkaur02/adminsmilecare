import React, { useState , useEffect} from "react";
import {
  Plus,Search , X 
 
} from "lucide-react";

const Testimonials = () => {


 const [showModal, setShowModal] = useState(false);
const [testimonials, setTestimonials] = useState([]);

const [formData, setFormData] = useState({
   id: "",
  name: "",
  text: "",
  rating: "",
});
const [isEditing, setIsEditing] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleEdit = (item) => {
  setIsEditing(true);
  setShowModal(true);

  setFormData({
    id: item.id,
    name: item.name,
    text: item.text,
    rating: item.rating,
  });
};



const handleSubmit = async () => {
  if (!formData.name || !formData.text || !formData.rating) {
    alert("Please fill all fields");
    return;
  }

  const url = isEditing
    ? "http://localhost/adminsmilecare/testmonials/edittestmonials.php"
    : "http://localhost/adminsmilecare/testmonials/addtestmonials.php";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      fetchTestimonials();

      setShowModal(false);
      setIsEditing(false);

      setFormData({
        id: "",
        name: "",
        text: "",
        rating: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
};



const  fetchTestimonials = async () => {
  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/testmonials/gettestmonials.php"
    );

    const data = await response.json();

    if (data.success) {
      setTestimonials(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchTestimonials();
}, []);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this testimonial?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      "http://localhost/adminsmilecare/testmonials/deletetestmonials.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      fetchTestimonials();
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
     <div className="p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Testimonials
          </h1>

          <p className="text-gray-500">
            Manage Testimonials and reviews ...
          </p>

        </div>

        <button
            
        onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add  Testimonials
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
          placeholder="Search  Testimonials ..."


          className="w-full border border-gray-200   shadow-sm  rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />

      </div>

  {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">

      {/* Header */}
      <div className="flex justify-between items-center  p-4">
        <h2 className="text-xl font-bold">
           {isEditing ? "Edit Testimonial" : "Add Testimonial"}
        </h2>

        <button onClick={() => setShowModal(false)}>
          <X size={22} />
        </button>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">

        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 shadow-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Enter Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Review
          </label>

          <textarea
            rows="4"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border border-gray-200 shadow-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Write Review..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Rating
          </label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-200 shadow-sm rounded-lg px-3 py-2"
          >
            <option value="">Select Rating</option>
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3  p-4">

        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-2 border border-gray-200 shadow-sm rounded-lg"
        >
          Cancel
        </button>

        <button
           onClick={()=>{handleSubmit(formData)}}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
         {isEditing ? "Update" : "Save"}
        </button>

      </div>

    </div>
  </div>
)}


<div className="bg-white rounded-xl shadow overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-100 text-gray-400">
      <tr>
         <th className="px-5 py-3 text-center">Actions</th>
        <th className="px-5 py-3 text-left">ID</th>
        <th className="px-5 py-3 text-left">Name</th>
        <th className="px-5 py-3 text-left">Review</th>
        <th className="px-5 py-3 text-center">Rating</th>
        
      </tr>
    </thead>

    <tbody>
      {testimonials.length > 0 ? (
        testimonials.map((item, index) => (
          <tr
            key={item.id}
            className=" hover:bg-gray-50"
          >
            <td className="px-5 py-4">
              <div className="flex justify-center gap-2">
                <button 
                 onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>

                <button 
                  onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </td>

            <td className="px-5 py-4">{index + 1}</td>

            <td className="px-5 py-4 font-medium">
              {item.name}
            </td>

            <td className="px-5 py-4 max-w-md">
              {item.text}
            </td>

            <td className="px-5 py-4 text-center">
              {"⭐".repeat(Number(item.rating))}
            </td>

          
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="5"
            className="text-center py-6 text-gray-500"
          >
            No testimonials found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

 </div>
  )
}

export default Testimonials