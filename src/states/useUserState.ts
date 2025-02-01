import { IUserState } from "@/interface/User";
import { USERBASIC } from "@/utils/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseUserState {
    user: IUserState
    setUserState: (value: IUserState) => void
}

const useUserState = create<IUseUserState>()(persist((set) => ({
    user: USERBASIC,
    setUserState: value => set(state => ({
        ...state,
        user: value
    }))
}), {
    name: 'user',
    storage: createJSONStorage(() => sessionStorage),
},))

export default useUserState