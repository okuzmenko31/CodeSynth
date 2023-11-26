import React, { useEffect, useState } from 'react';

import ProjectsWorkspace from '../components/UI/ProjectsWorkspace';

import { Link, useLocation, useNavigate, useParams  } from 'react-router-dom';
import CodeSynth from "../assets/CodeSynth.png"
import "../styles/pages/Admin.css"
import axios from 'axios';
import Loader from '../components/UI/Loader';
import TagsWorkspace from '../components/UI/TagsWorkspace';
import FilterTypeWorkspace from '../components/UI/FilterTypeWorkspace';

const Admin = () => {
    const currentLocation = useLocation();
    const params = useParams()
    const navigate = useNavigate();
    const [secretKey, setSecretKey] = useState("");
    const [authed, setAuthed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const adminLogIn = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/auth/admin/`, {
            'secret_key': secretKey
        })
        .then(res => {
            localStorage.setItem('Access', res.data.access_token);
            localStorage.setItem('Refresh', res.data.refresh_token);
            setAuthed(true);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const checkForAuth = () => {
        if (localStorage.getItem('Access') || localStorage.getItem('Refresh')) {
            axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/auth/admin/access_token_verify/`, {
                "access_or_refresh_token": localStorage.getItem('Access') as string
            })
            .then(res => {
                setAuthed(true);
            })
            .catch(() => {
                adminLogIn();
            });
        }
    }

    const checkHash = async () => {
        const buttons = await document.querySelectorAll('.admin_button');
        
        let hasSameHref = false;

        for (const button of Array.from(buttons)) {
            const href = button?.getAttribute('href')?.split("/admin/").join("");

            if (button && href && params.category === (href)) {       
                button.classList.add('active');
                hasSameHref = true
            } else {
                button.classList.remove('active');
            }
        }

        if (!hasSameHref) {
            navigate('/admin/dashboard')
        }

        let activeButtons = 0

        for (const button of Array.from(buttons)) {
            if (button.classList.contains('active')) {
                activeButtons++
            }
        }

        if (activeButtons > 1) {
            navigate('/admin/dashboard')
        }
    }

    useEffect(() => {
        checkHash()
    }, [currentLocation]);

    useEffect(() => {
        setSecretKey(localStorage.getItem('SecretKey') as string);
        checkForAuth();
    }, []);


    window.addEventListener('load', () => setLoaded(true))

    return (
        <div className="admin">
            {
                authed ?
                <>
                    <div className='sidebar'>
                        <Link to="/" className='web-site'>
                            <img alt="CodeSynth" src={CodeSynth}/>
                            <p className='small-text'>CodeSynth</p>
                        </Link>
                        <div className="sidebar_category">
                            <div className='button_container'>
                                <Link to="/admin/dashboard" className='admin_button' >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <circle cx="18" cy="12" r=".5" fill="currentColor"></circle>
                                        <circle cx="16" cy="8" r=".5" fill="currentColor"></circle>
                                        <circle cx="12" cy="6" r=".5" fill="currentColor"></circle>
                                        <circle cx="8" cy="8" r=".5" fill="currentColor"></circle>
                                        <circle cx="6" cy="12" r=".5" fill="currentColor"></circle>
                                        <line x1="12" y1="12" x2="16" y2="4" stroke="#FF0000"></line>
                                    </svg>
                                    Dashboard
                                </Link>
                            </div>
                        </div>
                        <div className='sidebar_category'>
                            <p className='small-text'>Projects</p>
                            <div className='button_container'>
                                <Link to="/admin/projects" className='admin_button' >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="6" fill='currentColor'></circle>
                                    </svg>
                                    Projects
                                </Link>
                            </div>
                        </div>

                        <div className='sidebar_category'>
                            <p className='small-text'>Tags</p>
                            <div className='button_container'>
                                <Link to="/admin/tags" className='admin_button' >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="6" fill='currentColor'></circle>
                                    </svg>
                                    Tags
                                </Link>
                            </div>
                        </div>

                        <div className='sidebar_category'>
                            <p className='small-text'>Filrer types</p>
                            <div className='button_container'>
                                <Link to="/admin/filter_types" className='admin_button' >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="6" fill='currentColor'></circle>
                                    </svg>
                                    Filrer types
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='working-directory'>
                        {
                            !loaded &&
                            <Loader />
                        }
                        {
                            params.category === "projects" && loaded &&
                            <ProjectsWorkspace />
                        }
                        {
                            params.category === "tags" && loaded &&
                            <TagsWorkspace />
                        }
                        {
                            params.category === "filter_types" && loaded &&
                            <FilterTypeWorkspace />
                        }
                    </div>
                </>
                :
                <div className="admin-input">
                    <input
                        className="order-input"
                        value={secretKey}
                        onChange={e => {
                            setSecretKey(e.target.value)
                            localStorage.setItem("SecretKey", e.target.value)
                        }}
                        placeholder='Secret key'
                    />
                    <button onClick={adminLogIn} className="button">LOG IN</button>
                </div>
            }
        </div>
    );
}

export default Admin;
