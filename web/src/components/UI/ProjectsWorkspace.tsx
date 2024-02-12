import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/components/UI/Workspace.scss";
import ItemsListWorkspace from "./ItemsListWorkspace";

type tag = {
    name: string;
    img: string;
    id: number;
};

type EditObject = {
    name: string;
    filter_type_id: number;
    preview_image: string;
    source_link: string;
    tags: any[any];
    text: string;
    id: number;
    filter_type: string;
};

const ProjectsWorkspace = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [projects, setProjects] = useState([]);
    const [choosed, setChoosed] = useState([]);
    const [deletedItems, setDeletedItems] = useState([]);
    const [avaibleTags, setAvaibleTags] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const [editObject, setEditObject] = useState<EditObject>({
        name: "",
        filter_type_id: 0,
        preview_image: "",
        source_link: "",
        tags: [],
        text: "",
        id: 0,
        filter_type: "",
    });

    // API Endpoints
    const getUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/all/`;
    const getTagsUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/tags/`;
    const delUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/delete/`;
    const addUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/create/`;
    const patchUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/update/${params.id}/`;
    const getCurrentUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/`;
    const getAvaibleTagsUrl = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/available_tags_for_project/`;
    const updateTags = `${process.env.REACT_APP_BACKEND_DOMAIN}/api/v1/projects/update_project_tags/`;

    let formData = new FormData();

    useEffect(() => {
        axios.get(getUrl + `?page=0&size=10`).then((res) => {
            setProjects(res.data);
            setIsLoadingProjects(true);
        });

        axios.get(getTagsUrl).then((res) => {
            setAvaibleTags(res.data);
        });
    }, []);

    const handleCheckboxChange = (e: any) => {
        const parent = e.target.parentNode;
        const parentId = parent?.parentNode?.id;

        if (e.target.checked && parent && parentId) {
            const newArray: any[any] = [...choosed, parentId];
            setChoosed(newArray);
        } else if (parentId) {
            const newArray: any[any] = choosed.filter(
                (prj: string) => prj !== parentId
            );
            setChoosed(newArray);
        }
    };

    const deleteItemsFromList = () => {
        const comparedArray = projects.filter((element: any) =>
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

        if (askModal) {
            askModal.classList.remove("active");
        }
    };

    const deleteItemsFromListRequest = () => {
        const askModal = document.querySelector(".deletition-ask-modal");

        for (const item of deletedItems) {
            const dItem: any = item;
            axios.delete(delUrl + `${dItem.id}`).then(() => {
                const newArray = projects.filter(
                    (item: any) => item.id != dItem.id
                );
                console.log(dItem.id);
                console.log(choosed);

                const newChoosed = choosed.filter(
                    (item: any) => item != dItem.id
                );
                console.log(newChoosed);
                setProjects(newArray);
                setChoosed(newChoosed);
            });
        }

        if (askModal) {
            const inputs = document.querySelectorAll(".choose-item-admin");
            inputs.forEach((input) => {
                if (input) {
                    (input as HTMLInputElement).checked = false;
                }
            });
            askModal.classList.remove("active");
            setDeletedItems([]);
            setChoosed([]);
        }
    };

    const navigateToEdit = () => {
        navigate(`/admin/${params.category}/create`);
    };

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

    const updateProjectsTags = (id: number) => {
        const ids = tags.map((tag) => tag.id);

        const data = {
            tags: ids,
        };
        axios.patch(`${updateTags}${id}/`, data);
    };

    const sendRequestForCreation = () => {
        axios.post(addUrl, formData).then((res) => {
            updateProjectsTags(res.data.id);
            navigate(`/admin/${params.category}`);
            setAvaibleTags((prevTags) => [...tags, ...prevTags]);
            setTags([]);
        });
    };

    const sendRequestForPatch = () => {
        axios
            .patch(patchUrl, formData)
            .then((res) => {
                updateProjectsTags(res.data.id);
                formData = new FormData();
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
        formData = new FormData();
        navigate(`/admin/${params.category}`);
    };

    const openTagMenu = () => {
        const list = document.querySelector(".tag-menu-admin");
        if (list) {
            list.classList.toggle("opened");
        }
    };

    const addToTags = (e: any) => {
        const tagId = e.target.id;

        const newTag = avaibleTags.find((tag: any) => tag.id == tagId);
        const isDuplicate = tags.some((tag: any) => tag.id == tagId);

        if (!isDuplicate) {
            setTags([...tags, newTag]);
        }

        setAvaibleTags(avaibleTags.filter((tag: any) => tag.id != tagId));
    };

    const removeFromTags = (e: any) => {
        const removedTagId = e.target.id;

        const updatedTags = tags.filter((tag: any) => tag.id != removedTagId);
        const removedTag = tags.find((tag: any) => tag.id == removedTagId);

        setTags(updatedTags);
        setAvaibleTags([...avaibleTags, removedTag]);
    };

    return (
        <div className="workspace">
            {params.action === "create" && (
                <div className="add-item-modal">
                    <div className="input-category">
                        <p className="small-text">Name</p>
                        <input
                            id="name"
                            className="admin-add-input"
                            placeholder="Name"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        <p className="small-text">Filter type id</p>
                        <input
                            id="filter_type_id"
                            className="admin-add-input"
                            placeholder="Filter type id"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        <p className="small-text">Source link</p>
                        <input
                            id="source_link"
                            className="admin-add-input"
                            placeholder="Source link"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        {tags &&
                            tags.map((tag: tag) => (
                                <p
                                    id={`${tag.id}`}
                                    key={tag.id}
                                    onClick={removeFromTags}
                                    className="small-text"
                                >
                                    {tag.name}
                                </p>
                            ))}
                        <button
                            onClick={openTagMenu}
                            className="admin-button add"
                        >
                            Add tag
                            <div className="tag-menu-admin">
                                {avaibleTags &&
                                    avaibleTags.map((tag: tag) => (
                                        <p
                                            id={`${tag.id}`}
                                            key={tag.id}
                                            onClick={addToTags}
                                            className="small-text"
                                        >
                                            {tag.name}
                                        </p>
                                    ))}
                            </div>
                        </button>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Text</p>
                        <input
                            id="text"
                            className="admin-add-input"
                            placeholder="Text"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        <p className="small-text">Preview image</p>
                        <input
                            type="file"
                            id="preview_image"
                            className="admin-add-input"
                            placeholder="Preview image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        onClick={sendRequestForCreation}
                        className="admin-button add"
                    >
                        Send request
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
                            className="admin-add-input"
                            placeholder="Name"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        <p className="small-text">Filter type id</p>
                        <input
                            id="filter_type_id"
                            className="admin-add-input"
                            placeholder="Filter type id"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        <p className="small-text">Source link</p>
                        <input
                            id="source_link"
                            className="admin-add-input"
                            placeholder="Source link"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        {tags &&
                            tags.map((tag: tag) => (
                                <p
                                    id={`${tag.id}`}
                                    key={tag.id}
                                    onClick={removeFromTags}
                                    className="small-text"
                                >
                                    {tag.name}
                                </p>
                            ))}
                        <button
                            onClick={openTagMenu}
                            className="admin-button add"
                        >
                            Add tag
                            <div className="tag-menu-admin">
                                {avaibleTags &&
                                    avaibleTags.map((tag: tag) => (
                                        <p
                                            id={`${tag.id}`}
                                            key={tag.id}
                                            onClick={addToTags}
                                            className="small-text"
                                        >
                                            {tag.name}
                                        </p>
                                    ))}
                            </div>
                        </button>
                    </div>

                    <div className="input-category">
                        <p className="small-text">Text</p>
                        <input
                            id="text"
                            className="admin-add-input"
                            placeholder="Text"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="input-category">
                        <p className="small-text">Preview image</p>
                        <img
                            className="admin-object-image"
                            src={editObject.preview_image}
                        />
                        <input
                            type="file"
                            id="preview_image"
                            className="admin-add-input"
                            placeholder="Preview image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        onClick={sendRequestForPatch}
                        className="admin-button add"
                    >
                        Send request
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
                        deletedItems.map((item: any) => (
                            <tr id={item.id}>
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
            <p className="small-text">Projects</p>
            <div className="admin-context-menu">
                <div className="admin-items-actions">
                    <button
                        onClick={deleteItemsFromList}
                        className="admin-button delete"
                    >
                        Delete
                    </button>

                    <button
                        onClick={navigateToEdit}
                        className="admin-button add"
                    >
                        Add
                    </button>
                </div>

                {projects.length > 0 && (
                    <ItemsListWorkspace
                        items={projects}
                        currentUrl={getCurrentUrl}
                        getUrl={getUrl}
                        handler={handleCheckboxChange}
                        actions={(res: any) => {
                            setEditObject(res.data);
                            setTags(res.data.tags);
                            const newAvailableTags = avaibleTags.filter(
                                (tag) => !res.data.tags.includes(tag.id)
                            );
                            setAvaibleTags(newAvailableTags);
                            const inputs =
                                document.querySelectorAll(".admin-add-input");
                            inputs.forEach((input: any) => {
                                const id = input.id;
                                if (
                                    input &&
                                    res.data[id] &&
                                    input.type !== "file"
                                ) {
                                    input.value = res.data[id];
                                }
                            });
                        }}
                        loadMore={true}
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectsWorkspace;
