import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import Swal from "sweetalert2";
import { listCategory } from "../api/Category";
import { listProduct } from "../api/product";

const ecomstore = (set) => ({
  user: null,
  token: null,
  categories: [],
  products:[],
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5000/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory : async (token) => {
    try {
      const res = await listCategory(token)
      set({
        categories: res.data
      })
    } catch (err) {
      Swal.fire({
        title: 'error',
        text: err,
        icon: 'error',
        showConfirmButton: 'OK',
      })
    }
  },
  getProducts : async (token, count) => {
    try {
      const res = await listProduct(token, count)
      set({
        products: res.data
      })
    } catch (err) {
      Swal.fire({
        title: 'error',
        text: err,
        icon: 'error',
        showConfirmButton: 'OK',
      })
    }
  }
});


const usepersist = {
  name: 'ecom-store',
  storage: createJSONStorage(() => localStorage)
};

const useEcomstore = create(persist(ecomstore, usepersist));

export default useEcomstore