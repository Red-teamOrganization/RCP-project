import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/solid";
import LoadingComponent from "../components/LoadingComponent";
import logo from "../images/logo.png";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import "./signUp.css"

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    location:"",
    userType:"",
  });
  let user = JSON.parse(localStorage.getItem('user'))
  const [error ,setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { name, email, password,confirmPassword,  userType , location } = userData;

  useEffect(()=>{
    if(user){
      navigate("/");
      return
    }
  })

  function handleChange(e) {
    setUserData(prev=>{
      return{
        ...prev,[e.target.name]:e.target.value
      }
    });
  }
   
  
  async function handleSubmit(e) {
    try{
      e.preventDefault();
      if (!name || !email || !password || userType === "" || location === "" ) {
        setUserData({ ...userData});
        setError("all fields are required")
        return;
      }
      if(password !== confirmPassword){
        setError("check that you enter the confirm password right")
        return;
      }
      
      let response = await fetch("http://localhost:3000/user/signUp",{
        method:'POSt',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
      setLoading(true)
     let data = await response.json();
     if(!data.apiStatus){
       setError(data.message)
       setLoading(false)
       return;
     }
     setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
      location:"",
      userType:"",
    });
     setLoading(false)
     navigate("/login");
     toast.success("one more step to save the world with us please log in",{
      icon: "😊"
    })
    }
    catch(err){
      setError(err.message)
      setLoading(false)
    }
   
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className=" signUpWrapper flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 signUpPage">
        <div className="max-w-md w-full space-y-5 signUpContainer">
          <div className="signUpHeader">
            <img src={logo} width={"150px"} className="mx-auto" alt="" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Create an account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 signUpForm"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-black text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Name must be unique"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-black text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Email address"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-t-md relative block w-60 px-3 py-2 mr-1 border border-gray-300 placeholder-black text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
             
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-t-md relative block w-60 px-3 py-2 border border-gray-300 placeholder-black text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                />
               </div>
              <div>
              <select className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-black text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              value={location}
              onChange={handleChange}
              name="location"
              id="location"
               >
                <option className="text-gray-900">Your Location</option>
                <option value="Berlin">Berlin</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Dortmund">Dortmund</option>
                <option value="Bayern">Bayern</option>
              </select>
              </div>
              <div>
                <select  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-black text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
                name='userType'
                id="userType"
                value={userType}
                >
                  <option>Your Role</option>
                  <option value="producer">Producer</option>
                  <option value="seller">Seller</option>
                  <option value="charity">Charity</option>
                </select>
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
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
               Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


