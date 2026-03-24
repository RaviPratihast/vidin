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
      const defaultPathName = "/";
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
    const defaultPathName = "/";
    navigate(location?.state?.from?.pathname || defaultPathName, {
      replace: true,
    });
    toast.success("Welcome,Guest");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="surface-card w-full max-w-md p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">vidIn</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-100">
            Welcome back
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to access your playlists and watch history.
          </p>
        </div>
        <h3 className="sr-only">
          Log In
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-slate-500"
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
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              value={user}
              onChange={({ target }) => setUser(target.value)}
            />
          </div>
          <div className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-slate-500"
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
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-slate-950 hover:bg-blue-400"
          >
            Log In
          </Button>
          <Button
            onClick={handleGuestLogin}
            className="w-full border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
          >
            Guest Login
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <p className="text-slate-300">Don't have an account?</p>
          <span
            className="cursor-pointer font-medium text-blue-300 hover:text-blue-200"
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
