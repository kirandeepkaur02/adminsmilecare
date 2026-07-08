import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [service, setService] = useState({
    id: "",
    name: "",
    description: "",
    pain_level: "Low",
    recovery_time: "",
    duration: "",
    price: "",
  });

  const [benefits, setBenefits] = useState([]);
  const [steps, setSteps] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await fetch(
        `http://localhost/adminsmilecare/services/getServices.php?id=${id}`
      );

      const data = await response.json();

      if (data.success) {
        setService(data.service);
        setBenefits(data.benefits || []);
        setSteps(data.steps || []);
        setFaqs(data.faqs || []);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleServiceChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const updateBenefit = (index, value) => {
    const temp = [...benefits];
    temp[index].benefit = value;
    setBenefits(temp);
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      {
        id: "",
        benefit: "",
      },
    ]);
  };

  const removeBenefit = (index) => {
    const temp = [...benefits];
    temp.splice(index, 1);
    setBenefits(temp);
  };

  const updateStep = (index, field, value) => {
    const temp = [...steps];
    temp[index][field] = value;
    setSteps(temp);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: "",
        step_no: steps.length + 1,
        title: "",
        description: "",
      },
    ]);
  };

  const removeStep = (index) => {
    const temp = [...steps];
    temp.splice(index, 1);
    setSteps(temp);
  };

  const updateFaq = (index, field, value) => {
    const temp = [...faqs];
    temp[index][field] = value;
    setFaqs(temp);
  };

  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        id: "",
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

  const saveService = async () => {
    const response = await fetch(
      "http://localhost/adminsmilecare/services/EditServices.php",
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
      alert("Service Updated Successfully");
      navigate("/services");
    } else {
      alert("Update Failed");
    }
  };
  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-12 gap-4">

        {/* Edit Services */}
        <div className="bg-white  col-span-6 rounded-xl shadow p-6">

          <h2 className="text-3xl font-bold mb-6">
            Edit Service
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="font-semibold">
                Service Name
              </label>

              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleServiceChange}
                className="border border-gray-200 shadow-sm  rounded w-full p-2 mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Pain Level
              </label>

              <select
                name="pain_level"
                value={service.pain_level}
                onChange={handleServiceChange}
                className="border  border-gray-200 shadow-sm rounded w-full p-2 mt-1"
              >
                <option>Very Low</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="col-span-2">

              <label className="font-semibold">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={service.description}
                onChange={handleServiceChange}
                className="border  border-gray-200 shadow-sm rounded w-full p-2 mt-1"
              />

            </div>

            <div>
              <label className="font-semibold">
                Recovery Time
              </label>

              <input
                type="text"
                name="recovery_time"
                value={service.recovery_time}
                onChange={handleServiceChange}
                className="border   border-gray-200 shadow-sm rounded w-full p-2 mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Duration
              </label>

              <input
                type="text"
                name="duration"
                value={service.duration}
                onChange={handleServiceChange}
                className="border  border-gray-200 shadow-sm rounded w-full p-2 mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={service.price}
                onChange={handleServiceChange}
                className="border   border-gray-200 shadow-sm rounded w-full p-2 mt-1"
              />
            </div>

          </div>

        </div>

        {/* Benefits */}

        <div className="bg-white  col-span-6 rounded-xl shadow p-6 ">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold">
              Benefits
            </h2>

            <button
              onClick={addBenefit}
              className="bg-green-600 text-white px-4 py-2 rounded"
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
                onChange={(e) =>
                  updateBenefit(index, e.target.value)
                }
                className="border  border-gray-200 shadow-sm rounded p-2 flex-1"
              />

              <button
                onClick={() => removeBenefit(index)}
                className="bg-red-500 text-white px-4 rounded"
              >
                Delete
              </button>

            </div>

          ))}

        </div>


      </div>


    <div className="grid grid-cols-12 gap-4">
          {/* Treatment Steps */}

      <div className="bg-white rounded-xl col-span-6 shadow p-6 mt-8">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Treatment Steps
          </h2>

          <button
            onClick={addStep}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Step
          </button>

        </div>

        {steps.map((step, index) => (

          <div
            key={index}
            className="border   border-gray-200 shadow-sm rounded-lg p-5 mb-5"
          >

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label>Step No</label>

                <input
                  type="number"
                  value={step.step_no}
                  onChange={(e) =>
                    updateStep(index, "step_no", e.target.value)
                  }
                  className="border  border-gray-200 shadow-sm rounded p-2 w-full"
                />

              </div>

              <div>

                <label>Title</label>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(index, "title", e.target.value)
                  }
                  className="border   border-gray-200 shadow-sm rounded p-2 w-full"
                />

              </div>

            </div>

            <div className="mt-4">

              <label>Description</label>

              <textarea
                rows="4"
                value={step.description}
                onChange={(e) =>
                  updateStep(index, "description", e.target.value)
                }
                className="border   border-gray-200 shadow-sm rounded p-2 w-full"
              />

            </div>

            <button
              onClick={() => removeStep(index)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Step
            </button>

          </div>

        ))}

      </div>

      {/* FAQs */}

      <div className="bg-white col-span-6  rounded-xl shadow p-6 mt-8">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            FAQs
          </h2>

          <button
            onClick={addFaq}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add FAQ
          </button>

        </div>

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="border   border-gray-200 shadow-sm rounded-lg p-5 mb-5"
          >

            <div>

              <label>Question</label>

              <textarea
                rows="2"
                value={faq.question}
                onChange={(e) =>
                  updateFaq(index, "question", e.target.value)
                }
                className="border  border-gray-200 shadow-sm  rounded p-2 w-full"
              />

            </div>

            <div className="mt-4">

              <label>Answer</label>

              <textarea
                rows="4"
                value={faq.answer}
                onChange={(e) =>
                  updateFaq(index, "answer", e.target.value)
                }
                className="border   border-gray-200 shadow-sm rounded p-2 w-full"
              />

            </div>

            <button
              onClick={() => removeFaq(index)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete FAQ
            </button>

          </div>

        ))}

      </div>
    </div>

     
 
          {/* Button For Saving data */}
      <div className="mt-8 flex justify-end">

        <button
          onClick={saveService}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default EditService;