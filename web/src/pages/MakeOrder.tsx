import React from 'react';

import "../styles/pages/MakeOrder.css"

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MakeOrder = () => {

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

    const generateMinDate = (e: any) => {
        e.target.min = new Date().toISOString().split("T")[0];
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
                        <div className='category-list'>
                            <div className='list-item'>
                                <label className='form_checkbox'>
                                    <input type="checkbox" className='checkbox-make-order' onChange={addClassOnChangeState} />
                                    dasdads
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='make-order-category'>
                        <p className='small-text required'>Estimated budget for the project?</p>
                        <div className='category-list'>
                            <div className='list-item'>
                                <label className='form_checkbox'>
                                    <input type="radio" name="budget" className='radio-make-order' onChange={addClassOnChangeState} />
                                    dasdads
                                </label>
                            </div>

                            <div className='list-item'>
                                <label className='form_checkbox'>
                                    <input type="radio" name="budget" className='radio-make-order' onChange={addClassOnChangeState} />
                                    dasdads
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='make-order-category'>
                        <div className='category-list-date'>
                            <div className='list-item-dates'>
                                <div className='list-item-date'>
                                    <p className='small-text'>Start date</p>
                                    <input onClick={generateMinDate} type="date"/>
                                </div>
                                <div className='list-item-date'>
                                    <p className='small-text'>Deadline</p>
                                    <input type="date"/>
                                </div>
                            </div>
                            <label className='form_checkbox'>
                                <input type="checkbox" className='checkbox-make-order' onChange={addClassOnChangeState} />
                                This is hard deadline
                            </label>
                        </div>
                    </div>

                    <div className='make-order-category'>
                        <p className='small-text'>Please tell us more about the project.</p>
                        <div className='category-list-area'>
                            <textarea id="additional-project-info" placeholder="Message here..." />
                        </div>
                    </div>

                    <div className='make-order-category'>
                        <p className='small-text'>How did yiu hear about us?</p>
                        <div className='category-list'>
                            <div className='list-item'>
                                <label className='form_checkbox'>
                                    <input type="radio" className='radio-make-order' name="hear" onChange={addClassOnChangeState} />
                                    dasdads
                                </label>
                            </div>

                            <div className='list-item'>
                                <label className='form_checkbox'>
                                    <input type="radio" className='radio-make-order' name="hear" onChange={addClassOnChangeState} />
                                    dasdads
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mid-text">Contact Details</p>
                <div className='make-order-category-input'>
                    <div className='make-order-input-container'>
                        <p className='small-text required'>Full Name</p>
                        <div className='category-list-area'>
                            <input className="order-input" placeholder='Full Name'/>
                        </div>
                    </div>

                    <div className='make-order-input-container'>
                        <p className='small-text required'>Email Address</p>
                        <div className='category-list-area'>
                            <input className="order-input" placeholder='Email Address'/>
                        </div>
                    </div>

                    <div className='make-order-input-container'>
                        <p className='small-text'>Company</p>
                        <div className='category-list-area'>
                            <input className="order-input" placeholder='Company Name'/>
                        </div>
                    </div>

                    <div className='make-order-input-container'>
                        <p className='small-text'>Company website</p>
                        <div className='category-list-area'>
                            <input className="order-input" placeholder='https://'/>
                        </div>
                    </div>
                </div>
                <div className='make-order-block-button'>
                    <button className="button">SUBMIT APPLICATION</button>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}

export default MakeOrder;
