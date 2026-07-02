import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
const AuthContext = createContext();

const initState = {
  user: {},
  isAuth: false,
};

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/get-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setState({ user: res.data.user, isAuth: true });
      console.log("fetchUser", res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingOutlined />
      </div>
    );

  return (
    <AuthContext.Provider value={{ ...state, setState, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
