import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <div className="border-2 m-1 flex flex-wrap justify-between">
      <Link to="/">
        <h2 className="text-5xl hover:text-sky-700 flex ml-1 font-[Roboto]">
          Chat App
        </h2>
      </Link>
      {user && (
        <span className="flex items-center font-[Roboto]">{user.name}</span>
      )}

      <div className="flex flex-row m-1 border-2 justify-center items-center">
        {user && (
          <>
            <Link className="m-1 font-[Roboto] " onClick={() => logOutUser()}>
              Logout
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="m-1 font-[Roboto]">
              Login
            </Link>
            <Link to="/signup" className="m-1 font-[Roboto]">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
