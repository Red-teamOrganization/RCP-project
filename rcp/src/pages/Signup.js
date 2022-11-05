import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/solid";
import LoadingComponent from "../components/LoadingComponent";
import logo from "../images/logo.png";
import "./Footer.css"
import { useEffect } from "react";


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
      
     let data = await response.json();
     if(!data.apiStatus){
       setError("this account or user name has been entered before")
       return;
     }
     setLoading(true)
     
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
      <div className="min-h-full signup-login-wrapper flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img src={logo} width={"150px"} className="mx-auto" alt="" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div>
        
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <br />
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={location}
              onChange={handleChange}
              name="location"
              id="location"
               >
                <option>Location</option>
                <option value="Berlin">Berlin</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Dortmund">Dortmund</option>
                <option value="Bayern">Bayern</option>
              </select>
              <br />
              <div>
                <select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

              <br />
           
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
                {loading ? "Creating ..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


