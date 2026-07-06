import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewDoctor = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);

    useEffect(() => {

        fetch("http://localhost/adminsmilecare/doctors/getdoctors.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => setDoctor(data));

    }, [id]);

    if (!doctor) {
        return <div className="p-6">Loading...</div>;
    }

    return (

        <div className="p-6">

            <div className="bg-white rounded-xl shadow border border-gray-200 p-6 max-w-3xl mx-auto">

                <h2 className="text-2xl font-bold mb-6">
                    Doctor Details
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="font-semibold">Doctor ID</label>
                        <p>{doctor.id}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Name</label>
                        <p>{doctor.name}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Specialization</label>
                        <p>{doctor.specialization}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Qualification</label>
                        <p>{doctor.qualification}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Experience</label>
                        <p>{doctor.experience}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Phone</label>
                        <p>{doctor.phone}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Email</label>
                        <p>{doctor.email}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Available Days</label>
                        <p>{doctor.available_days}</p>
                    </div>

                    <div>
                        <label className="font-semibold">Consultation Time</label>
                        <p>{doctor.consultation_time}</p>
                    </div>

                </div>

                <div className="mt-5">

                    <label className="font-semibold">
                        Description
                    </label>

                    <p className="mt-2">
                        {doctor.description}
                    </p>

                </div>

                <button
                    onClick={() => navigate("/doctors")}
                    className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Back
                </button>

            </div>

        </div>
    );
};

export default ViewDoctor;