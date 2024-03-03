import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Service = {
    id: number;
    name: string;
};

type Ref = {
    id: number;
    name: string;
};

type Budget = {
    start_amount: number;
    secondary_amount: number;
    id: number;
    budget: string;
};

const MakeOrderFirstPart = ({ control }: any) => {
    const [services, setServices] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [refSources, setRefSources] = useState([]);
    const [selectedFile, setSelectedFile]: any = useState(undefined);

    // API Endpoints
    const getServicesUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/all_services/`;
    const getBudgetsUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/all_budgets/`;
    const getRefSourcesUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/ref_sources/`;

    const {
        formState: { errors },
    } = useForm();

    const addClassOnChangeState = (e: any) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                e.target.parentNode.classList.add("active");
            } else {
                e.target.parentNode.classList.remove("active");
            }
        } else {
            if (e.target.checked) {
                document
                    .querySelectorAll('input[name="' + e.target.name + '"]')
                    .forEach((el: any) => {
                        el.parentNode.classList.remove("active");
                    });
                e.target.parentNode.classList.add("active");
            }
        }
    };

    const openInput = (e: any) => {
        const input = e.target.parentNode.querySelector("input[type=file]");
        if (input) {
            input.click();
        }
    };

    const generateMinDate = () => {
        const dateInputs = document.querySelectorAll("input[type=date]");
        dateInputs.forEach((input: any) => {
            input.min = new Date().toISOString().split("T")[0];
        });
    };

    useEffect(() => {
        const input: any = document.querySelector("input[type=file]");

        if (input) {
            input.addEventListener("change", () => {
                const files = input.files;
                const file = files[0];

                if (file) {
                    setSelectedFile(file);
                } else {
                    setSelectedFile(undefined);
                }
            });
        }

        return () => {
            if (input) {
                input.removeEventListener("change", () => {});
            }
        };
    }, []);

    useEffect(() => {
        axios.get(getServicesUrl).then((res) => {
            setServices(res.data);
        });

        axios.get(getBudgetsUrl).then((res) => {
            setBudgets(res.data);
        });

        axios.get(getRefSourcesUrl).then((res) => {
            setRefSources(res.data);
        });

        generateMinDate();
    }, []);

    return (
        <div className="make-order-first-part">
            <p className="mid-text">Project Details</p>
            <div className="make-order-category">
                <p className="small-text required">
                    What services are you interested in?
                </p>
                <form className="category-list">
                    {services &&
                        services.map((service: Service) => (
                            <div key={service.id} className="list-item">
                                <Controller
                                    name={`project_services[${service.id}]`}
                                    control={control}
                                    rules={{
                                        required:
                                            "You must choose at least one service!",
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <label className="form_checkbox">
                                            <input
                                                type="checkbox"
                                                className="checkbox-make-order"
                                                checked={value || false}
                                                onChange={(e) => {
                                                    onChange(e.target.checked);
                                                    addClassOnChangeState(e);
                                                }}
                                            />
                                            {service.name}
                                        </label>
                                    )}
                                />
                            </div>
                        ))}
                </form>
                <p className="error">
                    {errors.project_services?.message as any}
                </p>
            </div>

            <div className="make-order-category">
                <p className="small-text required">
                    Estimated budget for the project?
                </p>
                <div className="category-list">
                    {budgets &&
                        budgets.map((budget: Budget) => (
                            <div key={budget.id} className="list-item">
                                <Controller
                                    name="budget_id"
                                    control={control}
                                    rules={{
                                        required:
                                            "You must select a project budget!",
                                    }}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <label className="form_checkbox">
                                            <input
                                                type="radio"
                                                name="budget_id"
                                                className="radio-make-order"
                                                value={budget.id}
                                                checked={value === budget.id}
                                                onChange={(e) => {
                                                    onChange(e.target.value);
                                                    addClassOnChangeState(e);
                                                }}
                                            />
                                            {budget.budget}
                                        </label>
                                    )}
                                />
                            </div>
                        ))}
                </div>
                <p className="error">{errors.budget_id?.message as any}</p>
            </div>

            <div className="make-order-category">
                <div className="category-list-date">
                    <div className="list-item-dates">
                        <div className="list-item-date">
                            <p className="small-text">Start date</p>
                            <Controller
                                name="start_date"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input type="date" {...field} />
                                )}
                            />
                        </div>

                        <div className="list-item-date">
                            <p className="small-text">Deadline</p>
                            <Controller
                                name="deadline_date"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input type="date" {...field} />
                                )}
                            />
                        </div>
                    </div>
                    <label className="form_checkbox">
                        <Controller
                            name="hard_deadline"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    className="checkbox-make-order"
                                    checked={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.checked);
                                        addClassOnChangeState(e);
                                    }}
                                />
                            )}
                        />
                        This is hard deadline
                    </label>
                </div>
            </div>

            <div className="make-order-category">
                <p className="small-text">
                    Please tell us more about the project.
                </p>
                <div className="category-list-area">
                    <Controller
                        name="project_info"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <textarea
                                id="additional-project-info"
                                placeholder="Message here..."
                                {...field}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="make-order-category">
                <p className="small-text">Attach your technical assignment.</p>
                <div className="category-list-area file-type">
                    <Controller
                        name="technical_task"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <input type="file" {...field} />}
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

            <div className="make-order-category">
                <p className="small-text">How did you hear about us?</p>
                <div className="category-list">
                    {refSources &&
                        refSources.map((ref: Ref) => (
                            <div key={ref.id} className="list-item">
                                <Controller
                                    name="ref_source_id"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Please select a ref source",
                                    }}
                                    render={({ field }) => (
                                        <label className="form_checkbox">
                                            <input
                                                {...field}
                                                value={ref.id}
                                                type="radio"
                                                className="radio-make-order"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    addClassOnChangeState(e);
                                                }}
                                            />
                                            {ref.name}
                                        </label>
                                    )}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MakeOrderFirstPart;
