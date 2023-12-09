import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import "../styles/pages/MakeOrder.css"

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

type Service = {
    id: number,
    name: string
}

type Ref = {
    id: number,
    name: string
}

type Budget = {
    start_amount: number,
    secondary_amount: number,
    id: number,
    budget: string
}


const MakeOrder = () => {
    const [services, setServices] = useState([])
    const [budgets, setBudgets] = useState([])
    const [refSources, setRefSources] = useState([])
    const [selectedFile, setSelectedFile]: any = useState(undefined)
    const {register, formState: {errors}, handleSubmit} = useForm({mode: "all"})

    // API Endpoints
    const createProjectRequest = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/create/`;
    const getServicesUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/all_services/`;
    const getBudgetsUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/all_budgets/`;
    const getRefSourcesUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/ref_sources/`;

    const addClassOnChangeState = (e: any) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                e.target.parentNode.classList.add('active')
            } else {
                e.target.parentNode.classList.remove('active')
            }
        } else {
            if (e.target.checked) {
                document.querySelectorAll('input[name="' + e.target.name + '"]').forEach((el: any) => {
                    el.parentNode.classList.remove('active');
                });
                e.target.parentNode.classList.add('active');
            }
        }
    }

    const generateMinDate = () => {
        const dateInputs = document.querySelectorAll("input[type=date]")
        dateInputs.forEach((input: any) => {input.min = new Date().toISOString().split("T")[0]})
    }

    useEffect(() => {
        const input: any = document.querySelector("input[type=file]")
        
        if (input) {
            input.addEventListener("change", () => {
                const files = input.files
                const file = files[0]
        
                if (file) {
                    setSelectedFile(file)
                } else {
                    setSelectedFile(undefined)
                }
            })
        }

        return () => {
            if (input) {
                input.removeEventListener("change", () => {});
            }
        };
    }, []);

    useEffect(() => {
        axios.get(getServicesUrl)
        .then(res => {
            setServices(res.data)
        })

        axios.get(getBudgetsUrl)
        .then(res => {
            setBudgets(res.data)
        })

        axios.get(getRefSourcesUrl)
        .then(res => {
            setRefSources(res.data)
        })

        generateMinDate()
    }, [])

    const sendApplication = (data: any) => {
        const currentDate = new Date().toISOString().split("T")[0];
    
        if (data.technical_task && data.technical_task[0]) {
            data.technical_task = data.technical_task[0];
        } else if (data.technical_task && !data.technical_task[0]) {
            data.technical_task = ""
        }
    
        if (data.project_services && data.project_services[0]) {
            data.project_services = data.project_services.map((strId: string) => Number(strId));
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
            data.deadline_date = data.start_date
        }

        if (data.ref_source_id === null) {
            data.ref_source_id = ""
        } else {
            data.ref_source_id = Number(data.ref_source_id)
        }
    
        const fd = new FormData();
    
        for (const key in data) {
            if (Array.isArray(data[key])) {
                fd.append(key, JSON.stringify(data[key]));
            } else {
                fd.append(key, data[key]);
            }
        }
    
        axios.post(createProjectRequest, fd)

    }

    const openInput = (e: any) => {
        const input = e.target.parentNode.querySelector("input[type=file]")
        if (input) {
            input.click()
        }
    }

    return (
        <>
        <Navbar />
        <div className="make-order">
            <div className="make-order-text">
                <p className="big-text">MAKE ORDER</p>
                <p className="small-text">Fill out this quick form to help us better understand your needs and make the onboarding process seamless. You'll be able to schedule a free call with us after submitting the form.</p>
            </div>
            <div className="make-order-content">
                <div className='make-order-first-part'>
                    <p className="mid-text">Project Details</p>
                    <div className='make-order-category'>
                        <p className='small-text required'>What services are you interested in?</p>
                        <form className='category-list'>
                            {
                                services &&
                                services.map((service: Service) => (
                                    <div key={service.id} className='list-item'>
                                        <label className='form_checkbox'>
                                            <input {...register("project_services", {required: {
                                                    value: true,
                                                    message: "You must choose at least one service!"
                                                }})} value={service.id} name="project_services" type="checkbox" className='checkbox-make-order' onChange={addClassOnChangeState} />
                                            {service.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </form>
                        <p className="error">{errors.project_services?.message as any}</p>
                    </div>

                    <div className='make-order-category'>
                        <p className='small-text required'>Estimated budget for the project?</p>
                        <div className='category-list'>
                            {
                                budgets &&
                                budgets.map((budget: Budget) => (
                                    <div key={budget.id} className='list-item'>
                                        <label className='form_checkbox'>
                                            <input {...register("budget_id", {required: {
                                                    value: true,
                                                    message: "You must project budget!"
                                                }})} value={budget.id} type="radio" name="budget_id" className='radio-make-order' onChange={addClassOnChangeState} />
                                            {budget.budget}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        <p className="error">{errors.budget_id?.message as any}</p>
                    </div>

                    <div className='make-order-category'>
                        <div className='category-list-date'>
                            <div className='list-item-dates'>
                                <div className='list-item-date'>
                                    <p className='small-text'>Start date</p>
                                    <input {...register("start_date", {
                                        value: ""
                                    })} type="date"/>
                                </div>
                                <div className='list-item-date'>
                                    <p className='small-text'>Deadline</p>
                                    <input {...register("deadline_date", {
                                        value: ""
                                    })} type="date"/>
                                </div>
                            </div>
                            <label className='form_checkbox'>
                                <input type="checkbox" {...register("hard_deadline")} className='checkbox-make-order' onChange={addClassOnChangeState} />
                                This is hard deadline
                            </label>
                        </div>
                    </div>

                    <div className='make-order-category'>
                        <p className='small-text'>Please tell us more about the project.</p>
                        <div className='category-list-area'>
                            <textarea {...register("project_info", {
                                value: ""
                            })} id="additional-project-info" placeholder="Message here..." />
                        </div>
                    </div>
                    
                    <div className='make-order-category'>
                        <p className='small-text'>Attach your technical assignment.</p>
                        <div className='category-list-area file-type'>
                            <input type="file" {...register("technical_task")} />
                            <div onClick={openInput} className="upload">
                                {
                                    selectedFile === undefined &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                                }

                                {
                                    selectedFile !== undefined &&
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"></path></svg>
                                        <p>{selectedFile.name}</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='make-order-category'>
                        <p className='small-text'>How did you hear about us?</p>
                        <div className='category-list'>
                            {
                                refSources &&
                                refSources.map((ref: Ref) => (
                                    <div key={ref.id} className='list-item'>
                                        <label className='form_checkbox'>
                                            <input {...register("ref_source_id")} value={ref.id} type="radio" className='radio-make-order' name="ref_source_id" onChange={addClassOnChangeState} />
                                            {ref.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <p className="mid-text">Contact Details</p>
                <div className='make-order-category-input'>
                    <div className='make-order-input-container'>
                        <p className='small-text required'>Full Name</p>
                        <div className='category-list-area'>
                            <input {...register("full_name", {required: {
                                    value: true,
                                    message: "Please write your full name!"
                                }})} className="order-input" placeholder='Full Name'/>
                        </div>
                        <p className="error">{errors.full_name?.message as any}</p>
                    </div>

                    <div className='make-order-input-container'>
                        <p className='small-text required'>Email Address</p>
                        <div className='category-list-area'>
                            <input {...register("email", {required: {
                                    value: true,
                                    message: "Please write your email!"
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email!"
                                }})} className="order-input" placeholder='Email Address'/>
                        </div>
                        <p className="error">{errors.email?.message as any}</p>
                    </div>

                    <div className='make-order-input-container'>
                        <p className='small-text'>Company</p>
                        <div className='category-list-area'>
                            <input {...register("company", {
                                value: ""
                            })} className="order-input" placeholder='Company Name'/>
                        </div>
                    </div>

                    <div className='make-order-input-container'>
                        <p className='small-text'>Company website</p>
                        <div className='category-list-area'>
                            <input {...register("company_website", {
                                value: ""
                            })} className="order-input" placeholder='https://'/>
                        </div>
                    </div>
                </div>
                <div className='make-order-block-button'>
                    <button onClick={handleSubmit(sendApplication)} className="button">SUBMIT APPLICATION</button>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}

export default MakeOrder;
