import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddService = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ===========================
  // Service Information
  // ===========================

  const [service, setService] = useState({
    name: "",
    description: "",
    pain_level: "Low",
    recovery_time: "",
    duration: "",
    price: "",
  });

  // ===========================
  // Benefits
  // ===========================

  const [benefits, setBenefits] = useState([
    {
      benefit: "",
    },
  ]);

  // ===========================
  // Treatment Steps
  // ===========================

  const [steps, setSteps] =useState([
    {
      step_no: 1,
      title: "",
      description: "",
    },
  ]);

  // ===========================
  // FAQs
  // ===========================

  const [faqs, setFaqs] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  // ===========================
  // Service Input Change
  // ===========================

  const handleServiceChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // BENEFITS
  // ===========================

  const updateBenefit = (index, value) => {
    const temp = [...benefits];
    temp[index].benefit = value;
    setBenefits(temp);
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        benefit: "",
      },
    ]);
  };

  const removeBenefit = (index) => {
    const temp = [...benefits];
    temp.splice(index, 1);
    setBenefits(temp);
  };

  // ===========================
  // TREATMENT STEPS
  // ===========================

  const updateStep = (index, field, value) => {
    const temp = [...steps];
    temp[index][field] = value;
    setSteps(temp);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        step_no: steps.length + 1,
        title: "",
        description: "",
      },
    ]);
  };

  const removeStep = (index) => {
    const temp = [...steps];
    temp.splice(index, 1);

    temp.forEach((item, i) => {
      item.step_no = i + 1;
    });

    setSteps(temp);
  };

  // ===========================
  // FAQs
  // ===========================

  const updateFaq = (index, field, value) => {
    const temp = [...faqs];
    temp[index][field] = value;
    setFaqs(temp);
  };

  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const removeFaq = (index) => {
    const temp = [...faqs];
    temp.splice(index, 1);
    setFaqs(temp);
  };

  // ===========================
  // Validation
  // ===========================

  const validateForm = () => {
    if (service.name.trim() === "") {
      alert("Service Name is required");
      return false;
    }

    if (service.description.trim() === "") {
      alert("Description is required");
      return false;
    }

    if (service.price.trim() === "") {
      alert("Price is required");
      return false;
    }

    return true;
  };

  // ===========================
  // Save Service
  // ===========================

  const saveService = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost/adminsmilecare/services/AddServices.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service,
            benefits,
            steps,
            faqs,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Service Added Successfully");

        navigate("/services");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);

      alert("Server Error");
    }

    setLoading(false);
  };

    return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Back Button */}

      <button
        onClick={() => navigate("/services")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-12 gap-4">
            {/* Service Details */}

      <div className="bg-white col-span-6 rounded-xl shadow-lg p-6">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Add New Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Service Name */}

          <div>

            <label className="block font-semibold mb-2">
              Service Name
            </label>

            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleServiceChange}
              placeholder="Enter service name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

          </div>

          {/* Pain Level */}

          <div>

            <label className="block font-semibold mb-2">
              Pain Level
            </label>

            <select
              name="pain_level"
              value={service.pain_level}
              onChange={handleServiceChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Very Low">Very Low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>

          {/* Description */}

          <div className="md:col-span-2">

            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={service.description}
              onChange={handleServiceChange}
              placeholder="Write service description..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

          </div>

          {/* Recovery Time */}

          <div>

            <label className="block font-semibold mb-2">
              Recovery Time
            </label>

            <input
              type="text"
              name="recovery_time"
              value={service.recovery_time}
              onChange={handleServiceChange}
              placeholder="Example : 2 Days"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

          </div>

          {/* Duration */}

          <div>

            <label className="block font-semibold mb-2">
              Duration
            </label>

            <input
              type="text"
              name="duration"
              value={service.duration}
              onChange={handleServiceChange}
              placeholder="Example : 30 Minutes"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

          </div>

          {/* Price */}

          <div>

            <label className="block font-semibold mb-2">
              Price
            </label>

            <input
              type="text"
              name="price"
              value={service.price}
              onChange={handleServiceChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

          </div>

        </div>

      </div>

      {/* Benefits Section Starts Below */}


      {/* ================= Benefits ================= */}

      <div className="bg-white  col-span-6 rounded-xl shadow-lg p-6 ">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Service Benefits
          </h2>

          <button
            type="button"
            onClick={addBenefit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Benefit
          </button>

        </div>

        {benefits.map((item, index) => (

          <div
            key={index}
            className="flex gap-3 mb-3"
          >

            <input
              type="text"
              value={item.benefit}
              placeholder={`Benefit ${index + 1}`}
              onChange={(e) =>
                updateBenefit(index, e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-lg p-3"
            />

            <button
              type="button"
              onClick={() => removeBenefit(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
            >
              Delete
            </button>

          </div>

        ))}

      </div>
           </div>

      
    <div className="grid grid-cols-12 gap-4">
      {/* ================= Treatment Steps ================= */}

      <div className="bg-white col-span-6 rounded-xl shadow-lg p-6 mt-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Treatment Steps
          </h2>

          <button
            type="button"
            onClick={addStep}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Step
          </button>

        </div>

        {steps.map((step, index) => (

          <div
            key={index}
            className="border rounded-xl p-5 mb-5"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 font-semibold">
                  Step Number
                </label>

                <input
                  type="number"
                  value={step.step_no}
                  onChange={(e) =>
                    updateStep(index, "step_no", e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold">
                  Step Title
                </label>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(index, "title", e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

            </div>

            <div className="mt-5">

              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                rows="4"
                value={step.description}
                onChange={(e) =>
                  updateStep(index, "description", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
              type="button"
              onClick={() => removeStep(index)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Delete Step
            </button>

          </div>

        ))}

      </div>

      {/* ================= FAQs ================= */}

      <div className="bg-white col-span-6 rounded-xl shadow-lg p-6 mt-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          <button
            type="button"
            onClick={addFaq}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add FAQ
          </button>

        </div>

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="border rounded-xl p-5 mb-5"
          >

            <div>

              <label className="block mb-2 font-semibold">
                Question
              </label>

              <textarea
                rows="2"
                value={faq.question}
                onChange={(e) =>
                  updateFaq(index, "question", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div className="mt-5">

              <label className="block mb-2 font-semibold">
                Answer
              </label>

              <textarea
                rows="4"
                value={faq.answer}
                onChange={(e) =>
                  updateFaq(index, "answer", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
              type="button"
              onClick={() => removeFaq(index)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Delete FAQ
            </button>

          </div>

        ))}

      </div>
    </div>
     

      {/* ================= Buttons ================= */}

      <div className="flex justify-end gap-4 mt-10">

        <button
          type="button"
          onClick={() => navigate("/services")}
          className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={saveService}
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Add Service"}
        </button>

      </div>

    </div>
  );
};
export default AddService;