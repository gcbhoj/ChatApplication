import InputBox from "../UIComponents/InputBox";
import Button from "../UIComponents/Button";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { logInUser, updateLogInInfo, logInError, islogInLoading, logInInfo } =
    useContext(AuthContext);
  return (
    <div className="border-2 flex justify-center">
      <div className="border-2 flex flex-col justify-center m-5 w-96 h-86">
        <InputBox
          label="Enter Email"
          type="email"
          name="email"
          onChange={(e) =>
            updateLogInInfo({ ...logInInfo, email: e.target.value })
          }
        />
        <InputBox
          label="Enter Password"
          type="password"
          name="passwor"
          onChange={(e) =>
            updateLogInInfo({ ...logInInfo, password: e.target.value })
          }
        />
        <div className="flex justify-center">
          <Button
            label={islogInLoading?"Getting You In":"login"}
            width="w-24"
            height="h-12"
            margin="mt-5 mb-5"
            background="bg-stone-400"
            hoverBackground="hover:text-violet-500"
            onClick={() => logInUser()}
          />
          {logInError?.error && (
            <span className="text-red-400">
                          <p>{ logInError?.message}</p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
