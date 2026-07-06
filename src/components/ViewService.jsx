import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ViewService = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [benefits, setBenefits] = useState([]);
    const [steps, setSteps] = useState([]);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetchService();
    }, []);

    const fetchService = async () => {

        const response = await fetch(
            `http://localhost/adminsmilecare/services/getServices.php?id=${id}`
        );

        const data = await response.json();

        if (data.success) {
            setService(data.service);
            setBenefits(data.benefits);
            setSteps(data.steps);
            setFaqs(data.faqs);
        }

    };

    if (!service) {
        return (
            <div className="p-10 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-blue-600"
            >
                <ArrowLeft size={18} />
                Back
            </button>
               

            <div className="grid grid-cols-12 gap-4">
                  {/* Services Description */}
            <div className="bg-white  col-span-6 rounded-xl shadow p-6">

                <h1 className="text-3xl font-bold mb-6">
                    {service.name}
                </h1>

                <div className="grid grid-cols-2 gap-5">

                    <div>
                        <label className="font-semibold">
                            Description
                        </label>

                        <p className="mt-1 text-gray-700">
                            {service.description}
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Pain Level
                        </label>

                        <p>{service.pain_level}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Recovery Time
                        </label>

                        <p>{service.recovery_time}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Duration
                        </label>

                        <p>{service.duration}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Price
                        </label>

                        <p>₹ {service.price}</p>
                    </div>

                </div>

             </div>

            {/* Benefits */}
            <div className="bg-white   col-span-6 rounded-xl shadow p-6 ">

                <h2 className="text-2xl font-bold mb-4">
                    Benefits
                </h2>

                <ul className="list-disc pl-5">

                    {benefits.map((item) => (

                        <li key={item.id} className="mb-2">
                            {item.benefit}
                        </li>

                    ))}

                </ul>

            </div>

               </div>
            
             <div className="grid grid-cols-12 gap-4 mt-8">
                            {/* Steps */}

            <div className="bg-white  col-span-6 rounded-xl shadow p-6 ">

                <h2 className="text-2xl font-bold mb-4">
                    Treatment Steps
                </h2>

                {steps.map((step) => (

                    <div
                        key={step.id}
                        className="border  border-gray-200 shadow-sm rounded-lg p-4 mb-4"
                    >

                        <h3 className="text-lg font-bold">
                            Step {step.step_no}
                        </h3>

                        <h4 className="font-semibold mt-2">
                            {step.title}
                        </h4>

                        <p className="text-gray-600 mt-2">
                            {step.description}
                        </p>

                    </div>

                ))}

            </div>

            {/* FAQs */}

            <div className="bg-white col-span-6 rounded-xl shadow p-6 ">

                <h2 className="text-2xl font-bold mb-4">
                    FAQs
                </h2>

                {faqs.map((faq) => (

                    <div
                        key={faq.id}
                        className="border-b  border-gray-200   py-4"
                    >

                        <h4 className="font-semibold">
                            Q. {faq.question}
                        </h4>

                        <p className="text-gray-600 mt-2">
                            {faq.answer}
                        </p>

                    </div>

                ))}

            </div>
             </div>





        </div>
    );
};

export default ViewService;