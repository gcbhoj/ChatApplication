import { createContext, useCallback, useState } from "react";
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

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
