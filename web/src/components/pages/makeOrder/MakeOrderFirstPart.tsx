import axios from "axios";
import { LegacyRef, useContext, useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { TechnicalAssignmentRefContext } from "../../../pages/MakeOrder";
import { generateMinDate } from "../../../utils/generateMinDate";
import MakeOrderFieldSection from "../../UI/MakeOrderFieldSection";

type MakeOrderFirstPartProps = {
    control: Control;
};

const MakeOrderFirstPart = ({ control }: MakeOrderFirstPartProps) => {
    const [services, setServices] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [refSources, setRefSources] = useState([]);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(
        undefined
    );
    const techTaskInputRef = useContext<React.MutableRefObject<
        HTMLInputElement | undefined
    > | null>(TechnicalAssignmentRefContext);

    // API Endpoints
    const getServicesUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/project_order/services/`;
    const getBudgetsUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/project_order/budget/`;
    const getRefSourcesUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/project_order/referral_source/`;

    const openInput = () => {
        if (techTaskInputRef && techTaskInputRef.current) {
            techTaskInputRef.current.click();
        }
    };

    const getData = async () => {
        await axios.get(getServicesUrl).then((res) => {
            setServices(res.data);
        });

        await axios.get(getBudgetsUrl).then((res) => {
            setBudgets(res.data);
        });

        await axios.get(getRefSourcesUrl).then((res) => {
            setRefSources(res.data);
        });
    };

    useEffect(() => {
        getData();
        if (techTaskInputRef && techTaskInputRef.current) {
            techTaskInputRef.current.addEventListener("change", (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file: File = (target.files as FileList)[0];

                setSelectedFile(file);
            });
        }

        generateMinDate();
    }, []);

    return (
        <div className="make-order-first-part">
            <p className="pre-big-text bold">Project Details</p>
            {services.length > 0 && (
                <MakeOrderFieldSection
                    control={control}
                    sources={services}
                    fieldName="services"
                    fieldType="checkbox"
                    fieldLabel="What services are you interested in?"
                    fieldContainerCustomClass="category-list"
                    fieldRules={{
                        required: "You must choose at least one service!",
                    }}
                />
            )}
            {budgets.length > 0 && (
                <MakeOrderFieldSection
                    control={control}
                    sources={budgets}
                    fieldName="budget"
                    fieldType="radio"
                    fieldLabel="Estimated budget for the project?"
                    fieldContainerCustomClass="category-list"
                    fieldRules={{
                        required: "You must select a project budget!",
                    }}
                />
            )}

            <div className="make-order-category">
                <div className="category-list-date">
                    <div className="list-item-dates">
                        <MakeOrderFieldSection
                            control={control}
                            fieldLabel="Start date"
                            fieldName="start_date"
                            fieldType="date"
                            fieldContainerWrapperCustomClass={"list-item-date"}
                        />

                        <MakeOrderFieldSection
                            control={control}
                            fieldLabel="Deadline"
                            fieldName="deadline_date"
                            fieldType="date"
                            fieldContainerWrapperCustomClass={"list-item-date"}
                        />
                    </div>

                    <MakeOrderFieldSection
                        control={control}
                        fieldName="hard_deadline"
                        fieldType="boolean"
                    />
                </div>
            </div>

            <div className="make-order-category">
                <p className="small-text bold">
                    Attach your technical assignment.
                </p>
                <div className="category-list-area file-type">
                    <input
                        type="file"
                        ref={
                            techTaskInputRef as
                                | LegacyRef<HTMLInputElement>
                                | undefined
                        }
                    />
                    <div onClick={openInput} className="upload">
                        {selectedFile === undefined && (
                            <>
                                <svg
                                    width="20"
                                    height="23"
                                    viewBox="0 0 20 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 21.5L11 17.5C11 15.2909 12.7909 13.5 15 13.5L19 13.5M1 17.5L1 5.5C1 3.29086 2.79086 1.5 5 1.5L15 1.5C17.2091 1.5 19 3.29086 19 5.5V11.8431C19 12.904 18.5786 13.9214 17.8284 14.6716L12.1716 20.3284C11.4214 21.0786 10.404 21.5 9.34315 21.5H5C2.79086 21.5 1 19.7091 1 17.5Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <p>Select file</p>
                            </>
                        )}

                        {selectedFile !== undefined && (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
                                    ></path>
                                </svg>
                                <p>{selectedFile.name}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <MakeOrderFieldSection
                control={control}
                fieldName="details"
                fieldType="textarea"
                fieldLabel="Please tell us more about the project."
                fieldId="additional-project-info"
                fieldPlaceholder="Message here..."
            />

            {refSources.length > 0 && (
                <MakeOrderFieldSection
                    control={control}
                    sources={refSources}
                    fieldName="referral_source"
                    fieldType="radio"
                    fieldLabel="How did you hear about us?"
                    fieldContainerCustomClass="category-list"
                />
            )}
        </div>
    );
};

export default MakeOrderFirstPart;
