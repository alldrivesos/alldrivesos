import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props{
    user: userProps;
    saveUser: (data: userProps) => void;
    clearUser: () => void;
}
interface userProps{
    name: string;
    email: string;
    token: string;
    image: string;
    state: string;
    phone: string;
    id: string;
    account: string
    charge?: number
}
const userInitState = {
    name: '',
    email: '',
    token: '',
    image: '',
    state: '',
    account: '',
    phone: '',
    id: '',
    charge: 0
}
const useAuthStore = create<Props>()(
  persist(
    (set) => ({
      user: userInitState,
      saveUser: (data:userProps) =>
        set(() => ({
          user: data,
        })),
      clearUser: () =>
        set(() => ({
          user: userInitState,
        })),
    }),
    {
      name: "rsh_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
