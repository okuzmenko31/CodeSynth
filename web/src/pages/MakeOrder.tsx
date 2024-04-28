import { useForm } from "react-hook-form";

import "../styles/pages/MakeOrder.scss";

import axios from "axios";
import { createContext, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/UI/Button";
import ModalWindow from "../components/UI/ModalWindow";
import MakeOrderFirstPart from "../components/pages/makeOrder/MakeOrderFirstPart";
import MakeOrderSecondPart from "../components/pages/makeOrder/MakeOrderSecondPart";
import { createFormData } from "../utils/createFormData";
import { processData } from "../utils/processData";

export type ApplicationData = {
    services?: any[any];
    budget?: string | number;
    referral_source?: number | string | null;
    details?: string;
    start_date?: string | number;
    deadline_date?: string | number;
    technical_assignment?: any;
};

export const TechnicalAssignmentRefContext =
    createContext<React.MutableRefObject<HTMLInputElement | undefined> | null>(
        null
    );

const MakeOrder = () => {
    const { handleSubmit, control, reset } = useForm({ mode: "all" });
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>("");
    const technicalAssignmentRef = useRef();
    const sendButtonRef = useRef<HTMLButtonElement | null>();

    // API Endpoints
    const createProjectRequest = `${process.env.REACT_APP_BACKEND_DOMAIN}/project_order/create/`;

    const sendApplication = (data: ApplicationData) => {
        processData(data);

        const button = sendButtonRef.current as HTMLButtonElement;

        button.disabled = true;

        const fd = createFormData(data);

        const fileInput = technicalAssignmentRef.current as any;

        const file = fileInput !== undefined ? fileInput.files[0] : ""; // Reset fileInput soon

        fd.append("technical_assignment", file);

        axios
            .post(createProjectRequest, fd)
            .then(() => {
                setIsModalOpened(true);
                setModalText("Your application was sent successfully!");
                button.disabled = false;

                reset();

                fileInput.value = "";
                fileInput.dispatchEvent(new Event("change"));
            })
            .catch((err) => {
                setIsModalOpened(true);
                setModalText(
                    err.response.data.detail ?? "Something went wrong..."
                );
                button.disabled = false;
            });
    };

    return (
        <>
            <Navbar />
            {isModalOpened && (
                <ModalWindow
                    text={modalText}
                    closeModal={() => setIsModalOpened(false)}
                />
            )}
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
                    <TechnicalAssignmentRefContext.Provider
                        value={technicalAssignmentRef}
                    >
                        <MakeOrderFirstPart control={control} />
                    </TechnicalAssignmentRefContext.Provider>
                    <MakeOrderSecondPart control={control} />

                    <div className="make-order-block-button">
                        <Button
                            reference={sendButtonRef}
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
