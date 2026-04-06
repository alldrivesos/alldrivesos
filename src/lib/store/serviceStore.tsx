import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  request: requestProps;
  saveRequest: (data: requestProps) => void;
  clearRequest: () => void;
}
interface requestProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  price: number;
  homeAddress: string;
  level: number;
  qouteId: string;
}
const requestInitState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  price: 0,
  homeAddress: "",
  level: 0,
  qouteId: '',
};
const useRequestStore = create<Props>()(
  persist(
    (set) => ({
      request: requestInitState,
      saveRequest: (data: requestProps) =>
        set(() => ({
          request: data,
        })),
      clearRequest: () =>
        set(() => ({
          request: requestInitState,
        })),
    }),
    {
      name: "rsh_service",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRequestStore;
