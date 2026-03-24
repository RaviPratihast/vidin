import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../component/index-component";
import { useAuth } from "../../Context/Auth-Context/auth-context";

function SignUp() {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  function handleLogin() {
    navigate("/login");
  }

  function handleSignIn() {
    if (
      username !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      const signInData = {
        user: username,
        password: password,
      };
      dispatchAuth({ type: "SIGN_IN", payload: signInData });
      setSignedIn((prev) => !prev);
    }
  }

  function handleChange(event) {
    const { placeholder, value } = event.target;
    if (placeholder === "Username") {
      setUsername(value);
    } else if (placeholder === "Password") {
      setPassword(value);
    } else if (placeholder === "Confirm Password") {
      setConfirmPassword(value);
    }
  }

  return (
    <div className="page-shell flex items-center justify-center">
      <div className="surface-card w-full max-w-md p-6">
        {!signedIn ? (
          <>
            <h3 className="mb-6 text-xl font-bold text-slate-100">Sign Up</h3>
            <div className="flex flex-col gap-3 justify-center">
              <div className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  onChange={(event) => handleChange(event)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => handleSignIn()}
                className="bg-blue-500 text-slate-950 hover:bg-blue-400"
              >
                Sign Up
              </Button>
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <p className="text-slate-300">Already have an account?</p>
              <span
                className="cursor-pointer font-medium text-blue-300 hover:text-blue-200"
                onClick={() => handleLogin()}
              >
                Log In
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mt-20">
          
            </div>
            <div className="flex flex-col gap-3 justify-center items-center w-full mt-5">
              <h1 className="text-lg font-semibold text-slate-100">Thanks for Signing Up!</h1>
              <div>
                <Button
                  onClick={() => handleLogin()}
                  className="bg-blue-500 text-slate-950 hover:bg-blue-400"
                >
                  Log In
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { SignUp };
