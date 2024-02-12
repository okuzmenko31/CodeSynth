import axios from "axios"

export const openEditMenu = (url: string, id: number, action: any, navigate: any, params: any) => {
    navigate(`/admin/${params.category}/edit/${id}`)
    axios.get(url + `${id}/`)
    .then(res => { 
        action(res)
    })
}