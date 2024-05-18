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
            <p className="mid-text">Project Details</p>
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
                <p className="small-text">Attach your technical assignment.</p>
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
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                                    <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"></path>
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
