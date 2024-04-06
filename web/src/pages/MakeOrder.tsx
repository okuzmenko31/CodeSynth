import { useForm } from "react-hook-form";

import "../styles/pages/MakeOrder.scss";

import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/UI/Button";
import MakeOrderFirstPart from "../components/pages/makeOrder/MakeOrderFirstPart";
import MakeOrderSecondPart from "../components/pages/makeOrder/MakeOrderSecondPart";

type ApplicationData = {
    technical_task?: any[];
    project_services?: any[];
    budget_id?: string | number;
    ref_source_id?: number | string | null;
    start_date?: string | number;
    deadline_date?: string | number;
};

const MakeOrder = () => {
    const { handleSubmit, control } = useForm({ mode: "all" });

    // API Endpoints
    const createProjectRequest = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/create/`;

    const sendApplication = (data: ApplicationData) => {
        processData(data);

        const fd = createFormData(data);

        axios.post(createProjectRequest, fd);
    };

    const processData = (data: ApplicationData) => {
        const currentDate = new Date().toISOString().split("T")[0];

        if (data.technical_task) {
            data.technical_task = data.technical_task[0] ?? "";
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

        if (
            data.start_date &&
            data.start_date < currentDate &&
            data.start_date !== ""
        ) {
            data.start_date = currentDate;
        }

        if (data.deadline_date) {
            if (data.deadline_date < currentDate && data.deadline_date !== "") {
                data.deadline_date = currentDate;
            } else if (
                data.start_date &&
                data.deadline_date < data.start_date
            ) {
                data.deadline_date = data.start_date;
            }
        }

        data.ref_source_id =
            data.ref_source_id === null ? "" : Number(data.ref_source_id);
    };

    const createFormData = (data: ApplicationData): FormData => {
        const formData = new FormData();

        for (const key in data) {
            const element = data[key as keyof typeof data];

            if (element !== undefined && element !== null) {
                formData.append(
                    key,
                    Array.isArray(element) || typeof element === "number"
                        ? JSON.stringify(element)
                        : element
                );
            }
        }

        return formData;
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
