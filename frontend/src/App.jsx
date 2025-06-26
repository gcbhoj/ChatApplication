import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Lobby } from "./Pages/Lobby";

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={user ? <Lobby /> : <Login />} />
        <Route path="/signup" element={user ? <Lobby /> : <Signup />} />
        <Route path="/lobby" element={user ? <Lobby /> : <Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
