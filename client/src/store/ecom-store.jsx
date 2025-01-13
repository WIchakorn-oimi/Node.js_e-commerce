import { create } from "zustand";
import axios from "axios";
import { persist,createJSONStorage } from "zustand/middleware";

const ecomstore = (set)=> ({
    user: null,
    token: null,
    actionLogin: async (form) => {
        const res = await axios.post("http://localhost:5000/api/login", form);
        set({
          user: res.data.payload,
          token: res.data.token,
        });
        return res;
      },
});

const usepersist = {
  name: 'ecom-store',
  storage: createJSONStorage(()=> localStorage)
};

const useEcomstore = create(persist(ecomstore,usepersist));

export default useEcomstore