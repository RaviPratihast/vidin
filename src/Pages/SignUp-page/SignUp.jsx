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
    // setSignedIn((prev) => !prev);
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
    <div className="h-screen flex-1 justify-center items-center flex">
      <div className="border w-96 h-96 bg-white shadow-xl rounded  border-gray-700">
        {!signedIn ? (
          <>
            <h3 className="text-lg mt-10 ml-10 font-bold">Sign Up</h3>
            <div className=" mt-10 h-24 flex flex-col gap-3 justify-center">
              <div className=" flex justify-start items-center gap-2 border pl-3 mx-10 p-1 rounded">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  className="outline-none w-full text-gray-700"
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="flex justify-start items-center gap-2 border pl-3 mx-10 p-1 rounded">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="outline-none w-full text-gray-700"
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="flex justify-start items-center gap-2 border pl-3 mx-10 p-1 rounded">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="outline-none w-full text-gray-700"
                  onChange={(event) => handleChange(event)}
                />
              </div>
            </div>
            <div className="flex mt-6 mx-10 justify-end">
              <Button
                onClick={() => handleSignIn()}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Sign Up
              </Button>
            </div>
            <div className="flex justify-center mt-5 gap-2 mx-10">
              <p>Already have an account?</p>
              <span
                className="text-gray-700 font-medium cursor-pointer"
                onClick={() => handleLogin()}
              >
                Log In
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mt-20">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#3b82f6"
                className="w-14 h-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg> */}
            </div>
            <div className="flex flex-col gap-3 justify-center items-center w-full mt-5">
              <h1 className="font-semibold text-lg">Thanks for Signing Up!</h1>
              <div>
                <Button
                  onClick={() => handleLogin()}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
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
