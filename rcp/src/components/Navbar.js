import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../images/logo.png";
import "./nav.css";
import { toast } from 'react-toastify';

export default function Navbar() {
  let userData = JSON.parse(localStorage.getItem("user"));
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  async function handleLogOut() {
    try {
      let response = await fetch("https://rcp-q1g3.onrender.com/user/logOut", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `bearer ${userData.token}`,
        },
      });
      await response.json();
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      toast.success("good bye come back soon",{
        icon: "😥"
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img src={logo} width={"63px"} alt="" />
                  </Link>
                </div>
              </div>
              
              {user ? (
                <div className="hidden sm:flex">
                  <div className="flex space-x-4">
                    <NavLink to="/" className="navItem">
                      HOME
                    </NavLink>
                    <NavLink to="/main" className="navItem" aria-current="page">
                      DashBoard
                    </NavLink>
                    <div
                      to="/login"
                      className="navItem"
                      aria-current="page"
                      onClick={handleLogOut}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <NavLink to="/" className="navItem">
                        HOME
                      </NavLink>
                      <NavLink
                        to="/login"
                        className="navItem"
                        aria-current="page"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className="navItem"
                        aria-current="page"
                      >
                        Sign up
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
