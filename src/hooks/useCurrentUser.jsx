import { useSelector } from "react-redux";

const useCurrentUser = () => {
  const token = useSelector((state) => state.userCredentials.token);
  const user = useSelector((state) => state.userCredentials.user);
  const isLoading = useSelector((state) => state.userCredentials.isLoading);

  return { token: token, user: user, isLoading: isLoading };
};

export default useCurrentUser;
