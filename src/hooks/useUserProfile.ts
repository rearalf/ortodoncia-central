import { FormEvent, useState } from "react";

import useAlertState from "@/states/useAlertState";
import useUserState from "@/states/useUserState";
import User from "@/models/User";

function useUserProfile() {
  const { setHandleState } = useAlertState();
  const { user } = useUserState();

  const [loading, setLoading] = useState<boolean>(false);
  const links: ILink[] = [
    {
      link_name: "Inicio",
      link_to: "/homne",
    },
    {
      link_name: "Perfil",
      link_to: "/user/profile",
    },
  ];

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const auth = new User();
      const getUser = await auth.authGetUser();
      console.log(getUser);
    } catch (error) {}
  };

  return {
    user,
    links,
    loading,
    handleOnSubmit,
  };
}

export default useUserProfile;
