import axios from "axios";

export const createProduct = async (token, from) => {

    return axios.post('http://localhost:5000/api/product', from, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (token, count = 20) => {

    return axios.get('http://localhost:5000/api/products/' + count, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {

    return axios.post("http://localhost:5000/api/images", {
        image: form,
    },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const removeFiles = async (token, public_id) => {

    return axios.post("http://localhost:5000/api/removeimages", {
        public_id
    },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};