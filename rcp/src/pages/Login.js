import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useRestfulApi from "../hooks/useRestfulApi";

import { LockClosedIcon } from "@heroicons/react/solid";
import LoadingComponent from "../components/LoadingComponent";
import logo from "../images/logo.png";
import { toast } from "react-toastify";
import "./login.css";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loginError , sendLoginReq] = useRestfulApi();
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const { email, password } = userData;

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  });
  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (!email || !password) {
        setUserData({ ...userData });
        setError("all fields are required");
        return;
      }
      
     let data = await sendLoginReq("user/logIn" , "POST" , userData )
    
      setLoading(true);
      if (!data.apiStatus) {
        setError(data.message);
        setLoading(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch({ type: "LOGIN", payload: data.data });
      setUserData({
        email: "",
        password: "",
      });
      setLoading(false);
      navigate("/dashBoard");
      toast.success(`welcome back ${data.data.user.name}`, {
        icon: "😄",
      });
    } catch (err) {
      setLoading(false);
      setError(loginError);
    }
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className=" pageWrapper flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 loginPage">
      <div className="max-w-md w-full space-y-5 loginContainer">
        <div className="loginHeader">
          <img src={logo} width={"150px"} className="mx-auto" alt="" />
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Log in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-green-500 group-hover:text-green-400"
                  aria-hidden="true"
                />
              </span>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
