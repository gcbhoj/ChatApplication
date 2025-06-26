import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../Services/UserServices";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logInError, setlogInError] = useState(null);
  const [islogInLoading, setIslogInLoading] = useState(false);
  const [logInInfo, setlogInInfo] = useState({
    email: "",
    password: "",
  });

  console.log("Users", user)
  console.log("LoginInfo:", logInInfo)
  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);
  const updateLogInInfo = useCallback((info) => {
    setlogInInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      if (e) e.preventDefault(); // Handles both form submit or direct call

      setIsRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await postRequest(
          `${baseUrl}/users/register`,
          JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false);

        if (response.error) {
          return setRegisterError(response);
        } else {
          localStorage.setItem("User", JSON.stringify(response));
          setUser(response);

          setRegisterInfo({ name: "", email: "", password: "" });
        }
      } catch (err) {
        setIsRegisterLoading(false);
        setRegisterError(null);
        console.error("Register Error:", err);
      }
    },
    [registerInfo]
  );

  const logOutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const logInUser = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      setIslogInLoading(true);
      setlogInError(null);
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(logInInfo)
      );
      setIslogInLoading(false);

      if (response.error) {
        return setlogInError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [logInInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logOutUser,
        logInUser,
        updateLogInInfo,
        logInError,
        islogInLoading,
        logInInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
