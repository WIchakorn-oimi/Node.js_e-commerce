import axios from "axios";

export const createCategory = async (token, from) => {

    return axios.post('http://localhost:5000/api/category', from, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async (token) => {

    return axios.get('http://localhost:5000/api/category', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const RemoveCategory = async (token, id) => {

    return axios.delete('http://localhost:5000/api/category/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}