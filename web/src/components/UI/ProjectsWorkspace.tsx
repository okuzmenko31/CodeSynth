import React, { useEffect, useState } from "react"

import "../../styles/components/UI/Workspace.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const ProjectsWorkspace = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [projects, setProjects] = useState([])
    const [choosed, setChoosed] = useState([])
    const [deletedItems, setDeletedItems] = useState([])

    const [name, setName] = useState("")
    const [filterTypeId, setFilterTypeId] = useState("")
    const [sourceLink, setSourceLink] = useState("")
    const [tags, setTags] = useState([])
    const [text, setText] = useState("")
    const formData = new FormData();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/all/`)
        .then(res => {
            setProjects(res.data)
        })
    }, [])

    const handleCheckboxChange = (e: any) => {
        const parent = e.target.parentNode;
        const parentId = parent?.parentNode?.id;
    
        if (e.target.checked && parent && parentId) {
            const newArray: any = [...choosed, parentId];
            setChoosed(newArray);
        } else if (parentId) {
            const newArray: any = choosed.filter((prj: string) => prj !== parentId);
            setChoosed(newArray);
        }
    };

    const deleteItemsFromList = () => {
        const comparedArray = projects.filter((element: any) => choosed.some((id) => id === element.id.toString()));
        setDeletedItems(comparedArray)

        const askModal = document.querySelector(".deletition-ask-modal")

        if (askModal && choosed.length > 0) {
            askModal.classList.add('active')
        }
    };

    const closeDeletitionModal = () => {
        const askModal = document.querySelector(".deletition-ask-modal")

        if (askModal) {
            askModal.classList.remove('active')
            setDeletedItems([])
            setChoosed([])
        }
    }

    const deleteItemsFromListRequest = () => {
        const askModal = document.querySelector(".deletition-ask-modal");

        for (const item of deletedItems) {
            const dItem: any = item;
            axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/delete/${dItem.id}`)
            .then(() => {
                const newArray = projects.filter((item: any) => item.id !== dItem.id)
                console.log(dItem.id);
                console.log(choosed);
                
                const newChoosed = choosed.filter((item: any) => item != dItem.id)
                console.log(newChoosed);
                setProjects(newArray)
                setChoosed(newChoosed)
            })
        }

        if (askModal) {
            const inputs = document.querySelectorAll('.choose-item-admin')
            inputs.forEach((input) => {
                if (input) {
                    (input as HTMLInputElement).checked = false
                }
            })
            askModal.classList.remove('active')
            setDeletedItems([]);
            setChoosed([])
        }
    }

    const navigateToEdit = () => {
        navigate(`/admin/${params.category}/create`)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.id;
    
        if (e.target.type === "file") {
            const file = e.target.files?.[0];
            if (file) {
                formData.set(field, file);
            }
        } else {
            let value = e.target.value;
            formData.set(field, value);
        }
    };

    const sendRequestForCreation = () => {
        formData.append('tags[]', JSON.stringify([1]))
        axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/create/`, formData)
    }
    
    
    return (
        <div className="workspace">
            {
                params.action === "create" &&
                <div className="add-item-modal">
                    <div className="input-category">
                        <p className="small-text">Name</p>
                        <input id="name" className="admin-add-input" placeholder="Name" onChange={handleFileChange}/>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Filter type id</p>
                        <input id="filter_type_id" className="admin-add-input" placeholder="Filter type id" onChange={handleFileChange}/>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Source link</p>
                        <input id="source_link" className="admin-add-input" placeholder="Source link" onChange={handleFileChange}/>
                    </div>

                    <div className="input-category">
                        
                    </div>

                    <div className="input-category">
                        <p className="small-text">Text</p>
                        <input id="text" className="admin-add-input" placeholder="Text" onChange={handleFileChange}/>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Preview image</p>
                        <input type="file" id="preview_image" className="admin-add-input" placeholder="Preview image" onChange={handleFileChange}/>
                    </div>
                    <button onClick={sendRequestForCreation} className="admin-button add">Send request</button>
                </div>
            }

            <div className="deletition-ask-modal">
                <p className="small-text">Do you really wanna to delete:</p>
                <div className="deletition-ask-list">
                    <th>
                        <td className="basic-td">Id</td>
                        <td className="basic-td">Name</td>
                    </th>
                    {
                        deletedItems &&
                        deletedItems.map((item: any) => (
                            <tr id={item.id}>
                                <td className="basic-td">{item.id}</td>
                                <td className="basic-td">{item.name}</td>
                            </tr>
                        ))
                    }
                </div>
                <div className="deletition-buttons">
                    <button onClick={deleteItemsFromListRequest} className="deletition-ask-button yes">Yes</button>
                    <button onClick={closeDeletitionModal} className="deletition-ask-button no">No</button>
                </div>
            </div>
            <p className="small-text">Projects</p>
            <div className="admin-context-menu">
                <div className="admin-items-actions">
                    <button onClick={deleteItemsFromList} className="admin-button delete">
                        Delete
                    </button>

                    <button onClick={navigateToEdit} className="admin-button add">
                        Add
                    </button>
                </div>

                <div className="admin-items-list">
                    <th>
                        <td className="input-td">Choose</td>
                        <td className="basic-td">Id</td>
                        <td className="basic-td">Name</td>
                    </th>
                    {
                        projects &&
                        projects.map((project: any) => (
                            <tr id={project.id}>
                                <td className="input-td"><input onChange={handleCheckboxChange} type="checkbox" className="choose-item-admin" /></td>
                                <td className="basic-td">{project.id}</td>
                                <td className="basic-td">{project.name}</td>
                            </tr>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectsWorkspace;