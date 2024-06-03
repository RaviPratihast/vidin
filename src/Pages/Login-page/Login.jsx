import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../component/index-component";
import { useAuth } from "../../Context/Auth-Context/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stateAuth, dispatchAuth } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  function handleClick() {
    navigate("/signup");
  }

  function handleLogin() {
    const isUserPresent = stateAuth.users.find(
      (registeredUser) =>
        registeredUser.user === user && registeredUser.password === password
    );
    if (isUserPresent) {
      dispatchAuth({ type: "USER_LOGGED_IN", payload: { loggedIn: true } });
      const defaultPathName = "/explore";
      navigate(location?.state?.from?.pathname || defaultPathName, {
        replace: true,
      });
      toast.success("Logged in successful!");
    } else {
      toast.error("Wrong Password,try again!");
    }
  }

  function handleGuestLogin() {
    dispatchAuth({ type: "GUEST_USER_LOGGED_IN", payload: { loggedIn: true } });
    const defaultPathName = "/explore";
    navigate(location?.state?.from?.pathname || defaultPathName, {
      replace: true,
    });
    toast.success("Welcome,Guest");
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border w-full max-w-md bg-white shadow-xl border-gray-700 rounded p-6 mx-4">
        <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Log In
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border px-3 py-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Username"
              className="outline-none w-full text-gray-700"
              value={user}
              onChange={({ target }) => setUser(target.value)}
            />
          </div>
          <div className="flex items-center gap-2 border px-3 py-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="outline-none w-full text-gray-700"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <Button
            onClick={handleLogin}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Log In
          </Button>
          <Button
            onClick={handleGuestLogin}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Guest Login
          </Button>
        </div>

        <div className="flex justify-center mt-5 gap-2">
          <p className="text-gray-700">Don't have an account?</p>
          <span
            className="text-blue-500 font-medium cursor-pointer"
            onClick={handleClick}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export { Login };
