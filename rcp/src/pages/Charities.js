import React, { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import Profile from "../components/Profile";
import "./Charities.css";
export default function Charities() {
  const charity = JSON.parse(localStorage.getItem("user"));
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [toggleContent, setToggleContent] = useState(true);
  const [toggleDonations, setToggleDonations] = useState(true);
  useEffect(() => {
    async function fetchDonations() {
      try {
        let response = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${charity.token}`,
          },
        });
        let json = await response.json();
        setDonations(json.data.donations);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchDonations();
  }, [donations, charity.token]);

  if (loading) {
    return <LoadingComponent />;
  }

  async function checkDonation(id) {
    try {
      let response = await fetch(
        `http://localhost:3000/user/charityProfile/donationCheck/${id}`,
        {
          method: "POSt",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${charity.token}`,
          },
        }
      );
      await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <main className="charityPage flex items-center justify-between">
        <div className="flex  items-center">
          {toggleSideBar && (
            <div className="flex flex-col p-8  bg-emerald-700 shadow w-60 text-white rounded-br rounded-tr relative  fade-in ">
              <div>
                <h2 className="text-xl text-center mt-2  font-bold">
                  {charity.user.name.toUpperCase()}
                </h2>
                <div className="flex-1">
                  <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                      <button
                        onClick={() => {
                          setToggleContent(true);
                        }}
                        className="flex items-center p-2 space-x-3 rounded-md hover:bg-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <span>Donations</span>
                      </button>
                    </li>
                    <li className="rounded-sm">
                      <button
                        onClick={() => {
                          setToggleContent(false);
                        }}
                        className="flex items-center p-2 space-x-3 rounded-md hover:bg-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>Settings</span>
                      </button>
                    </li>
                    <li className="flex items-center p-2 space-x-3  rounded-br rounded-tl absolute bottom-0 right-0 bg-yellow-900">
                      <i className="fa-solid fa-location-dot w-4 h-3"></i>
                      <span>{charity.user.location}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <button
            className="toggleSideBar"
            onClick={() => {
              setToggleSideBar((prev) => !prev);
            }}
          >
            {" "}
            {toggleSideBar ? (
              <i className="fa-solid fa-angle-left"></i>
            ) : (
              <i className="fa-solid fa-angle-right"></i>
            )}{" "}
          </button>
        </div>
        {toggleContent ? (
          <section className="charityDonations w-6/12 bg-yellow-500  rounded mr-2">
            <ul className="flex justify-around border-b border-white p-1">
              <li
                className="border-r border-white w-5/12 text-emerald-900 cursor-pointer"
                onClick={() => {
                  setToggleDonations(true);
                }}
              >
                <i className="fa-solid fa-check-double"></i> Checked Donations
              </li>
              <li
                className="text-red-900 cursor-pointer"
                onClick={() => {
                  setToggleDonations(false);
                }}
              >
                <i className="fa-solid fa-check"></i> UnChecked Donations
              </li>
            </ul>
            {toggleDonations
              ? donations.map((donation) => {
                  if (donation.checked) {
                    return (
                      <div key={donation._id}>
                        <div>{donation.donatorName}</div>
                        <div>{donation.productName}</div>
                        <div>{donation.quantity}</div>

                        <p>uncheck donation</p>

                        <input
                          type="checkbox"
                          checked={donation.checked}
                          onChange={() => {
                            checkDonation(donation._id);
                          }}
                        />
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })
              : donations.map((donation) => {
                  if (!donation.checked) {
                    return (
                      <div key={donation._id}>
                        <div>{donation.donatorName}</div>
                        <div>{donation.productName}</div>
                        <div>{donation.quantity}</div>

                        <p>check donation</p>

                        <input
                          type="checkbox"
                          checked={donation.checked}
                          onChange={() => {
                            checkDonation(donation._id);
                          }}
                        />
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
          </section>
        ) : (
          <section className="charityProfile w-6/12">
            <Profile user={charity} />
          </section>
        )}
      </main>
    </>
  );
}
