import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

// Utils impopts
import { openEditMenu } from "../../utils/workspace_utils"

import "../../styles/components/UI/Workspace.css"
import ItemsListWorkspace from "./ItemsListWorkspace"

type EditObject = {
    name: string;
    img: string;
}

const FilterTypeWorkspace = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [tags, setTags] = useState([])
    const [choosed, setChoosed] = useState([])
    const [deletedItems, setDeletedItems] = useState([])
    const [name, setName] = useState("")
    const [editObject, setEditObject] = useState<EditObject>({ name: '', img: '' });

    // API Endpoints
    const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/filter_types/`;
    const delUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/delete_filter_type/`;
    const addUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/create_filter_type/`;
    const patchUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/update_filter_type/${params.id}/`;
    const getCurrentUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/filter_types/`;

    useEffect(() => {
        axios.get(getUrl)
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
        const inputs = document.querySelectorAll('.choose-item-admin')

        if (askModal) {
            askModal.classList.remove('active')
            setDeletedItems([])
            setChoosed([])
            inputs.forEach((input) => {
                if (input) {
                    (input as HTMLInputElement).checked = false
                }
            })
        }
    }

    const deleteItemsFromListRequest = () => {
        const askModal = document.querySelector(".deletition-ask-modal");

        for (const item of deletedItems) {
            const dItem: any = item;
            axios.delete(delUrl + `${dItem.id}`)
            .then(() => {
                const newArray = tags.filter((item: any) => item.id !== dItem.id)
                console.log(dItem.id);
                console.log(choosed);
                
                const newChoosed = choosed.filter((item: any) => item != dItem.id)
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

    const sendRequestForCreation = () => {
        axios.post(addUrl, {
            "name": name
        })
        .then(() => {
            setName("")
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
        axios.patch(patchUrl, {
            "name": name
        })
        .then(() => {
            setName("")
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

    const backToList = () => {
        setName("")
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
                        <input id="name" className="admin-add-input" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
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
                        <input id="name" className="admin-add-input" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
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
                        deletedItems.map((item: any) => (
                            <tr key={item.id} id={item.id}>
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
            <p className="small-text">Filter types</p>
            <div className="admin-context-menu">
                <div className="admin-items-actions">
                    <button onClick={deleteItemsFromList} className="admin-button delete">
                        Delete
                    </button>

                    <button onClick={navigateToCreate} className="admin-button add">
                        Add
                    </button>
                </div>

                {
                    tags.length > 0 &&
                    <ItemsListWorkspace
                        items={tags}
                        currentUrl={getCurrentUrl}
                        handler={handleCheckboxChange}
                        actions={(res: any) => {
                            setEditObject(res.data)
                            const inputs = document.querySelectorAll('.admin-add-input')
                            inputs.forEach((input: any) => {
                                const id = input.id
                                if (input &&  res.data[id]) {
                                    setName(res.data[id])
                                }
                            })
                        }}
                    />
                }

            </div>
        </div>
    )
}

export default FilterTypeWorkspace;