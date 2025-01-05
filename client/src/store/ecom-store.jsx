import { create } from "zustand";
import axios from "axios";

const ecomstore = (set)=> ({
    user: null,
    token: null,
    actionLogin: async (form) => {
        const res = await axios.post("http://localhost:5001/api/login", form);
        set({
          user: res.data.payload,
          token: res.data.token,
        });
        return res;
      },
})

const useEcomstore = create(ecomstore)

export default useEcomstore