<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React from "react";
>>>>>>> 757c77cb343eee6515b9bf7cbc7ba522955e81d7
import { Link } from "react-router-dom";
/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
<<<<<<< HEAD
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

=======
import logo from "../images/logo.png";
>>>>>>> 757c77cb343eee6515b9bf7cbc7ba522955e81d7
const navigation = [
  { name: "Login", href: "/login", current: false },
  { name: "Sign Up", href: "/signup", current: true },
];
const loginNav = { name: "Login", href: "#", current: false };
const signupNav = { name: "Sign Up", href: "#", current: false };
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleSignout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
<<<<<<< HEAD
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
=======
                    <img src={logo} width={"63px"}  alt="" />
                  </Link>
                  <Link to="/">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate ">
>>>>>>> 757c77cb343eee6515b9bf7cbc7ba522955e81d7
                      RCP
                    </h2>
                  </Link>
                </div>
              </div>
<<<<<<< HEAD
              {user ? (
                <button className="btn" onClick={handleSignout}>
                  Logout
                </button>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        href={loginNav.href}
                        className={classNames(
                          "text-gray-900 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current="page"
                      >
                        {loginNav.name}
                      </Link>
                      <Link
                        to="/signup"
                        href={signupNav.href}
                        className={classNames(
                          "bg-gray-900 text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current="page"
                      >
                        {signupNav.name}
                      </Link>
                    </div>
=======

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      href={loginNav.href}
                      className={classNames(
                        "text-gray-900 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current="page"
                    >
                      {loginNav.name}
                    </Link>
                    <Link
                      to="/signup"
                      href={signupNav.href}
                      className={classNames(
                        "bg-gray-900 text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current="page"
                    >
                      {signupNav.name}
                    </Link>
>>>>>>> 757c77cb343eee6515b9bf7cbc7ba522955e81d7
                  </div>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// function Navbar() {
//   return (
//     <nav>
//       <h3>
//         <Link to="/">RCP</Link>
//       </h3>
//       <div>
//         <Link to="/signup">Signup</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
