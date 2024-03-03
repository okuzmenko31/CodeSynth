import { useForm } from "react-hook-form";

import "../styles/pages/MakeOrder.scss";

import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/UI/Button";
import MakeOrderFirstPart from "../components/pages/makeOrder/MakeOrderFirstPart";
import MakeOrderSecondPart from "../components/pages/makeOrder/MakeOrderSecondPart";

const MakeOrder = () => {
    const { handleSubmit, control } = useForm({ mode: "all" });

    // API Endpoints
    const createProjectRequest = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/create/`;

    const sendApplication = (data: any) => {
        const currentDate = new Date().toISOString().split("T")[0];

        if (data.technical_task && data.technical_task[0]) {
            data.technical_task = data.technical_task[0];
        } else if (data.technical_task && !data.technical_task[0]) {
            data.technical_task = "";
        }

        if (data.project_services && data.project_services[0]) {
            data.project_services = data.project_services.map((strId: string) =>
                Number(strId)
            );
        }

        if (data.budget_id) {
            data.budget_id = Number(data.budget_id);
        }

        if (data.ref_source_id) {
            data.ref_source_id = Number(data.ref_source_id);
        }

        if (data.start_date < currentDate && data.start_date !== "") {
            data.start_date = currentDate;
        }

        if (data.deadline_date < currentDate && data.deadline_date !== "") {
            data.deadline_date = currentDate;
        } else if (data.deadline_date < data.start_date) {
            data.deadline_date = data.start_date;
        }

        if (data.ref_source_id === null) {
            data.ref_source_id = "";
        } else {
            data.ref_source_id = Number(data.ref_source_id);
        }

        const fd = new FormData();

        for (const key in data) {
            if (Array.isArray(data[key])) {
                fd.append(key, JSON.stringify(data[key]));
            } else {
                fd.append(key, data[key]);
            }
        }

        axios.post(createProjectRequest, fd);
    };

    return (
        <>
            <Navbar />
            <div className="make-order">
                <div className="make-order-text">
                    <p className="big-text">MAKE ORDER</p>
                    <p className="small-text">
                        Fill out this quick form to help us better understand
                        your needs and make the onboarding process seamless.
                        You'll be able to schedule a free call with us after
                        submitting the form.
                    </p>
                </div>
                <div className="make-order-content">
                    <MakeOrderFirstPart control={control} />
                    <MakeOrderSecondPart control={control} />

                    <div className="make-order-block-button">
                        <Button
                            text="SUBMIT APPLICATION"
                            callback={handleSubmit(sendApplication)}
                            style={{ width: "100%", maxWidth: "100%" }}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MakeOrder;
