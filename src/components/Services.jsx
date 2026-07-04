import React, { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";



const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
      
   const navigate = useNavigate();


  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const response = await fetch(
        "http://localhost/adminsmilecare/services/getServices.php"
      );

      const data = await response.json();

      if (data.success) {
        setServices(data.services);
      } else {
        alert("No services found");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      const response = await fetch(
        "http://localhost/adminsmilecare/services/deleteServices.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchServices();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-gray-500">
            Manage Dental Services
          </p>
        </div>

        <button
          onClick={()=> navigate("/addService")}
        className="bg-sky-500 text-white px-5 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} />
          Add Service
        </button>

      </div>

      {/* Search */}

      <div className="relative mb-5">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border  border-gray-200  shadow-sm rounded-lg pl-10 py-2 outline-none"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-sky-500 text-white">

            <tr>

              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">
                Service Name
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-5"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredServices.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="text-center p-5"
                >
                  No Services Found
                </td>

              </tr>

            ) : (

              filteredServices.map((service) => (

                <tr
                  key={service.id}
                  className=" hover:bg-gray-100"
                >

                  <td className="p-4">
                    {service.id}
                  </td>

                  <td className="p-4 font-normal">
                    {service.name}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-4">

                      {/* View */}

                      <button
                        className="text-sky-500 hover:text-sky-700"
                        onClick={() => navigate(`/view-service/${service.id}`)}
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}

                      <button
                        className="text-green-600 hover:text-green-700"
                         onClick={() => navigate(`/edit-service/${service.id}`)}


                       
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        className="text-red-600 hover:text-red-700"
                        onClick={() =>
                          deleteService(service.id)
                        }
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Services;