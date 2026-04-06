import useAuthStore from "../store/userStore";

export const getLoggedUserToken = () => {
  const token = useAuthStore((state) => state.user.token);
  return token;
};

export const getToken = () => {
  return `${localStorage.getItem("rhs_token")}`;
};

