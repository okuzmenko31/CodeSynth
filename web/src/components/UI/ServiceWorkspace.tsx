import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/components/UI/Workspace.scss";
import ItemsListWorkspace from "./ItemsListWorkspace";

type EditObject = {
    name: string;
};

type Service = {
    name: string;
    id: number;
};

const ServiceWorkspace = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [services, setServices] = useState([]);
    const [choosed, setChoosed] = useState([]);
    const [deletedItems, setDeletedItems] = useState([]);
    const [editObject, setEditObject] = useState<EditObject>({ name: "" });

    // API Endpoints
    const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/all_services/`;
    const delUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/delete_services/`;
    const addUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/create_service/`;
    const patchUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/update_service/${params.id}/`;
    const getCurrentUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/project_requests/service/`;

    useEffect(() => {
        axios.get(getUrl).then((res) => {
            setServices(res.data);
        });
    }, []);

    const handleCheckboxChange = (e: any) => {
        const parent = e.target.parentNode;
        const parentId = parent?.parentNode?.id;

        if (e.target.checked && parent && parentId) {
            const newArray: any = [...choosed, parentId];
            setChoosed(newArray);
        } else if (parentId) {
            const newArray: any = choosed.filter(
                (prj: string) => prj !== parentId
            );
            setChoosed(newArray);
        }
    };

    const deleteItemsFromList = () => {
        const comparedArray = services.filter((element: any) =>
            choosed.some((id) => id === element.id.toString())
        );
        setDeletedItems(comparedArray);

        const askModal = document.querySelector(".deletition-ask-modal");

        if (askModal && choosed.length > 0) {
            askModal.classList.add("active");
        }
    };

    const closeDeletitionModal = () => {
        const askModal = document.querySelector(".deletition-ask-modal");
        const inputs = document.querySelectorAll(".choose-item-admin");

        if (askModal) {
            askModal.classList.remove("active");
            setDeletedItems([]);
            setChoosed([]);
            inputs.forEach((input) => {
                if (input) {
                    (input as HTMLInputElement).checked = false;
                }
            });
        }
    };

    const deleteItemsFromListRequest = () => {
        const askModal = document.querySelector(".deletition-ask-modal");

        let deleteItemIds = deletedItems.map((item: any) => item.id);

        const data: any = {
            ids: deleteItemIds,
        };

        axios.delete(delUrl, { data }).then(() => {
            deletedItems.forEach(async () => {
                const newArray = await services.filter(
                    (prevItem: Service) => !deleteItemIds.includes(prevItem.id)
                );
                setServices(await newArray);
            });
        });

        if (askModal) {
            const inputs = document.querySelectorAll(".choose-item-admin");
            inputs.forEach((input) => {
                if (input) {
                    (input as HTMLInputElement).checked = false;
                }
            });
            askModal.classList.remove("active");
            console.log("Final services array:", services);
            console.log("Final choosed array:", choosed);
            setDeletedItems([]);
            setChoosed([]);
        }
    };

    const navigateToCreate = () => {
        navigate(`/admin/${params.category}/create`);
    };

    const sendRequestForCreation = () => {
        const allInputs = document.querySelectorAll(".admin-add-input");

        const data = {
            name: name,
        };

        if (name !== "") {
            for (const input of allInputs) {
                const field: any = input;
                field.style.border = "2px solid rgba(0,0,0,.15)";
            }
            axios
                .post(addUrl, data)
                .then(() => {
                    setName("");
                    navigate(`/admin/${params.category}`);
                })
                .catch((err) => {
                    const errors = err.response.data.detail;
                    if (Array.isArray(errors)) {
                        errors.forEach((error: any) => {
                            if (
                                error &&
                                error.type === "missing" &&
                                error.loc[1]
                            ) {
                                for (const input of allInputs) {
                                    const field: any = input;
                                    if (field && field.id === error.loc[1]) {
                                        field.style.border =
                                            "2px solid #FF0000";
                                    } else {
                                        field.style.border =
                                            "2px solid rgba(0,0,0,.15)";
                                    }
                                }
                            }
                        });
                    }
                });
        } else {
            for (const input of allInputs) {
                const field: any = input;
                field.style.border = "2px solid #FF0000";
            }
        }
    };

    const sendRequestForPatch = () => {
        const data = {
            name: name,
        };
        axios
            .patch(patchUrl, data)
            .then(() => {
                setName("");
                navigate(`/admin/${params.category}`);
            })
            .catch((err) => {
                const allInputs = document.querySelectorAll(".admin-add-input");
                const errors = err.response.data.detail;
                if (Array.isArray(errors)) {
                    errors.forEach((error: any) => {
                        if (error && error.type === "missing" && error.loc[1]) {
                            for (const input of allInputs) {
                                const field: any = input;
                                if (field && field.id === error.loc[1]) {
                                    field.style.border = "2px solid #FF0000";
                                } else {
                                    field.style.border =
                                        "2px solid rgba(0,0,0,.15)";
                                }
                            }
                        }
                    });
                }
            });
    };

    const backToList = () => {
        setName("");
        navigate(`/admin/${params.category}`);
    };

    return (
        <div className="workspace">
            {params.action === "create" && (
                <div className="add-item-modal">
                    <button
                        onClick={backToList}
                        className="admin-button delete"
                    >
                        Return
                    </button>
                    <div className="input-category">
                        <p className="small-text">Name</p>
                        <input
                            id="name"
                            value={name}
                            className="admin-add-input"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={sendRequestForCreation}
                        className="admin-button add"
                    >
                        Create item
                    </button>
                </div>
            )}
            {params.action === "edit" && params.id && editObject && (
                <div className="add-item-modal">
                    <button
                        onClick={backToList}
                        className="admin-button delete"
                    >
                        Return
                    </button>
                    <div className="input-category">
                        <p className="small-text">Name</p>
                        <input
                            id="name"
                            value={name}
                            className="admin-add-input"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={sendRequestForPatch}
                        className="admin-button add"
                    >
                        Change item
                    </button>
                </div>
            )}

            <div className="deletition-ask-modal">
                <p className="small-text">Do you really wanna to delete:</p>
                <div className="deletition-ask-list">
                    <th>
                        <td className="basic-td">Id</td>
                        <td className="basic-td">Name</td>
                    </th>
                    {deletedItems &&
                        deletedItems.map((item: Service) => (
                            <tr key={item.id} id={`${item.id}`}>
                                <td className="basic-td">{item.id}</td>
                                <td className="basic-td">{item.name}</td>
                            </tr>
                        ))}
                </div>
                <div className="deletition-buttons">
                    <button
                        onClick={deleteItemsFromListRequest}
                        className="deletition-ask-button yes"
                    >
                        Yes
                    </button>
                    <button
                        onClick={closeDeletitionModal}
                        className="deletition-ask-button no"
                    >
                        No
                    </button>
                </div>
            </div>
            <p className="small-text">Services</p>
            <div className="admin-context-menu">
                <div className="admin-items-actions">
                    <button
                        onClick={deleteItemsFromList}
                        className="admin-button delete"
                    >
                        Delete
                    </button>

                    <button
                        onClick={navigateToCreate}
                        className="admin-button add"
                    >
                        Add
                    </button>
                </div>

                {services.length > 0 && (
                    <ItemsListWorkspace
                        items={services}
                        currentUrl={getCurrentUrl}
                        handler={handleCheckboxChange}
                        actions={(res: any) => {
                            setEditObject(res.data);
                            setName(res.data.name);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ServiceWorkspace;
