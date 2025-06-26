import InputBox from "../UIComponents/InputBox";
import Button from "../UIComponents/Button";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Signup = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerError,
    registerUser,
    isRegisterLoading,
  } = useContext(AuthContext);



  return (
    <div className="border-2 flex justify-center">
      <div className="border-2 m-1 w-96 h-92 flex flex-col p-4 justify-center">
        <InputBox
          type="text"
          name="displayName"
          label="Enter Display Name"
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, name: e.target.value })
          }
        />
        <InputBox
          type="email"
          name="email"
          label="Enter Email "
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, email: e.target.value })
          }
        />
        <InputBox
          type="password"
          name="password"
          label="Enter password "
          onChange={(e) =>
            updateRegisterInfo({ ...registerInfo, password: e.target.value })
          }
        />

        <div className="flex justify-center">
          <Button
            label={isRegisterLoading ? "Loading" : "Register"}
            width="w-24"
            height="h-12"
            margin="mt-5 mb-5"
            background="bg-stone-400"
            hoverBackground="hover:text-violet-500"
            onClick={() => registerUser()}
          />
          {registerError?.error && (
            <p className="text-center text-red-500 text-sm mt-2">
              {registerError?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
