import React, { useEffect, useState } from "react"

import "../../styles/components/UI/Workspace.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

type EditObject = {
    name: string;
    img: string;
}

type tag = {
    name: string,
    img: string
    id: number
}

const TagsWorkspace = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [tags, setTags] = useState([])
    const [choosed, setChoosed] = useState([])
    const [deletedItems, setDeletedItems] = useState([])
    
    const [editObject, setEditObject] = useState<EditObject>({ name: '', img: '' });

    let formData = new FormData();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/tags/`)
        .then(res => {
            setTags(res.data)
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
        const comparedArray = tags.filter((element: any) => choosed.some((id) => id === element.id.toString()));
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
            const dItem: tag = item;
            axios.delete(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/delete_tag/${dItem.id}`)
            .then(() => {
                const newArray = tags.filter((item: tag) => item.id !== dItem.id)
                console.log(dItem.id);
                console.log(choosed);
                
                const newChoosed = choosed.filter((item: number) => item != dItem.id)
                console.log(newChoosed);
                setTags(newArray)
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

    const navigateToCreate = () => {
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
        axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/create_tag/`, formData)
        .then(() => {
            formData = new FormData()
            navigate(`/admin/${params.category}`)
        })
        .catch(err => {
            const allInputs = document.querySelectorAll(".admin-add-input")
            const errors = err.response.data.detail
            if (Array.isArray(errors)) {
                errors.forEach((error: any) => {
                    if (error && error.type === 'missing' && error.loc[1]) {
                        for (const input of allInputs) {
                            const field: any = input
                            if (field && field.id === error.loc[1]) {
                                field.style.border = '2px solid #FF0000'
                            } else {
                                field.style.border = '2px solid rgba(0,0,0,.15)'
                            }
                        }
                    }
                })
            }
        })
    }

    const sendRequestForPatch = () => {
        axios.patch(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/update_tag/${params.id}`, formData)
        .then(() => {
            formData = new FormData()
            navigate(`/admin/${params.category}`)
        })
        .catch(err => {
            const allInputs = document.querySelectorAll(".admin-add-input")
            const errors = err.response.data.detail
            if (Array.isArray(errors)) {
                errors.forEach((error: any) => {
                    if (error && error.type === 'missing' && error.loc[1]) {
                        for (const input of allInputs) {
                            const field: any = input
                            if (field && field.id === error.loc[1]) {
                                field.style.border = '2px solid #FF0000'
                            } else {
                                field.style.border = '2px solid rgba(0,0,0,.15)'
                            }
                        }
                    }
                })
            }
        })
    }

    const openEditMenu = (id: number) => {
        navigate(`/admin/${params.category}/edit/${id}`)
        axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/tags/${id}/`)
        .then(res => { 
            setEditObject(res.data)
            const inputs = document.querySelectorAll('.admin-add-input')
            inputs.forEach((input: any) => {
                const id = input.id
                if (input &&  res.data[id]) {
                    input.value = res.data[id]
                }
            })
        })
    }

    const backToList = () => {
        formData = new FormData()
        navigate(`/admin/${params.category}`)
    }
    
    
    return (
        <div className="workspace">
            {
                params.action === "create" &&
                <div className="add-item-modal">
                    <button onClick={backToList} className="admin-button delete">Return</button>
                    <div className="input-category">
                        <p className="small-text">Name</p>
                        <input id="name" className="admin-add-input" placeholder="Name" onChange={handleFileChange}/>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Tag image</p>
                        <input type="file" id="image_file" className="admin-add-input" placeholder="Tag image" onChange={handleFileChange}/>
                    </div>
                    <button onClick={sendRequestForCreation} className="admin-button add">Create item</button>
                </div>
            }
            {
                params.action === "edit" && params.id && editObject &&
                <div className="add-item-modal">
                    <button onClick={backToList} className="admin-button delete">Return</button>
                    <div className="input-category">
                        <p className="small-text">Name</p>
                        <input id="name" className="admin-add-input" placeholder="Name" onChange={handleFileChange}/>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Tag image</p>
                        <img className="admin-object-image" src={editObject.img}/>
                        <input type="file" id="image_file" className="admin-add-input" placeholder="Tag image" onChange={handleFileChange}/>
                    </div>
                    <button onClick={sendRequestForPatch} className="admin-button add">Change item</button>
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
                        deletedItems.map((item: tag) => (
                            <tr key={item.id} id={`${item.id}`}>
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

                    <button onClick={navigateToCreate} className="admin-button add">
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
                        tags &&
                        tags.map((item: tag) => (
                            <tr key={item.id} id={`${item.id}`}>
                                <td className="input-td"><input onChange={handleCheckboxChange} type="checkbox" className="choose-item-admin" /></td>
                                <td className="basic-td">{item.id}</td>
                                <td className="basic-td">{item.name}</td>
                                <span onClick={() => openEditMenu(item.id)} className="edit-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                                </span>
                            </tr>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TagsWorkspace;