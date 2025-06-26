import InputBox from "../UIComponents/InputBox"
import Button from "../UIComponents/Button"

const Login = () => {
  return (
    <div className="border-2 flex justify-center">
      <div className="border-2 flex flex-col justify-center m-5 w-96 h-86 ">
        <InputBox label="Enter Email" type="email" name="email" />
        <InputBox label="Enter Password" type="password" name="passwor" />
        <div className="flex justify-center">
          <Button
            label="Register"
            width="w-24"
            height="h-12"
            margin="mt-5 mb-5"
            background="bg-stone-400"
            hoverBackground="hover:text-violet-500"
          />
          <span className="text-red-400">
            <p>An error Occured</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login