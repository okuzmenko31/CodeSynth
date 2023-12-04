import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Utils impopts
import { openEditMenu } from "../../utils/workspace_utils"

import "../../styles/components/UI/ItemsListWorkspace.css"

type ListProps = {
    items: any,
    currentUrl: string,
    getUrl?: string,
    handler: any,
    actions: any,
    loadMore?: boolean
}

const ItemsListWorkspace = ({items, currentUrl, getUrl, handler, actions, loadMore = false}: ListProps) => {
    const params = useParams()
    const navigate = useNavigate()
    const [localItems, setLocalItems] = useState(items);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [localPage, setLocalPage] = useState(0);

    const loadMoreData = () => {
        if (loadMore === true) {
            const newPage = localPage + 1
            setLocalPage(newPage);
            setIsLoadingData(false);
        
            axios.get(getUrl + `?page=${newPage}&size=10`)
                .then(res => {
                    const incomingProjects = res.data;
                    const uniqueProjects = incomingProjects.filter((newProject: any) =>
                        !localItems.some((existingProject: any) => existingProject.id === newProject.id)
                    );
        
                    if (uniqueProjects.length > 0) {
                        const newProjects: any[any] = [...localItems, ...uniqueProjects];
                        setLocalItems(newProjects);
                        setIsLoadingData(true);
                    } else if (uniqueProjects.length < 10) {
                        const loadMoreButton = document.getElementById('load-more')
                        if (loadMoreButton) {
                            loadMoreButton.remove()
                        }
                    }
                })
                .finally(() => {
                    setIsLoadingData(true);
                });
        }
    };

    return (
        <div className="admin-items-list">
            <th>
                <td className="input-td">Choose</td>
                <td className="basic-td">Id</td>
                <td className="basic-td">Name</td>
            </th>
            {
                localItems &&
                localItems.map((item: any) => (
                    <tr key={item.id} id={`${item.id}`}>
                        <td className="input-td"><input onChange={handler} type="checkbox" className="choose-item-admin" /></td>
                        <td className="basic-td">{item.id}</td>
                        <td className="basic-td">{item.name}</td>
                        <span onClick={() => openEditMenu(
                            currentUrl,
                            item.id,
                            actions,
                            navigate,
                            params)
                        } className="edit-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                        </span>
                    </tr>
                ))
            }

            {
                loadMore &&
                <tr>
                    <td className="basic-td" id="load-more" onClick={loadMoreData}>Load More</td>
                </tr>
            }
        </div>
    )
}

export default ItemsListWorkspace;