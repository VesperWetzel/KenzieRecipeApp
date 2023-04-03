import { session_name } from "../config/constants";

const getAuthToken = () => {
  const savedUser = JSON.parse(sessionStorage.getItem(session_name));
  return savedUser ? savedUser.token : "";
};

export default getAuthToken;
