import { createContext, useContext, useEffect, useReducer } from "react";
import { session_name } from "../config/constants";
import api from "../utils/api.config";

const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { isAuthenticated: true, user: payload };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem(session_name));
    if (savedUser) {
      dispatch({
        type: "LOGIN",
        payload: savedUser.user,
      });
    }
  }, []);

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const { auth, dispatch } = useContext(authContext);

  const signUp = async (email, password, confirmPassword) => {
    try {
      await api.post("/auth/signup", {
        email,
        password,
        confirmPassword,
      });

      await signIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });

    dispatch({
      type: "LOGIN",
      payload: response.user,
    });

    console.log(response);

    sessionStorage.setItem(session_name, JSON.stringify(response));
    const favoritesResponse = await api.post("/favorites/getfavorites", {userId: response.user.uid})
    sessionStorage.setItem("favorites", JSON.stringify(favoritesResponse))
  };

  const signOut = () => {
    dispatch({
      type: "LOGOUT",
    });

    sessionStorage.clear();
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    signUp,
    signIn,
    signOut,
  };
};

export default useAuth;
