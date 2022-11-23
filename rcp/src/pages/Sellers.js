import React, { useState, useEffect } from "react";
import AddDonation from "../components/AddDonation";
import AddProduct from "../components/AddProduct";
import EditDonation from "../components/EditDonation";
import EditProduct from "../components/EditProduct";
import LoadingComponent from "../components/LoadingComponent";
import Profile from "../components/Profile";
import UserDonations from "../components/UserDonations";
import UserProducts from "../components/UserProducts";
import { toast } from "react-toastify";
import SellerMarketInsights from "../components/SellerMarketInsights";
import ProfileWave from "../components/ProfileWave";

function Sellers() {
  const seller = JSON.parse(localStorage.getItem("user"));

  const [sellerDonations, setSellerDonations] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [donationFlag, setDonationFlag] = useState(false);
  const [productsFlag, setProductsFlag] = useState(false);
  const [addDonationFlag, setAddDonationFlag] = useState(false);
  const [addProductFlag, setAddProductFlag] = useState(false);
  const [editDonationFormFlag, setEditDonationFormFlag] = useState("");
  const [editProductFormFlag, setEditProductFormFlag] = useState("");

  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [toggleContent, setToggleContent] = useState("mySoldProducts");

  const [charities, setCharities] = useState([]);

  const [addSellerDonation, setAddSellerDonation] = useState({
    charityName: "",
    productName: "",
    quantity: 0,
    category: "",
  });
  const [editedSellerDonation, setEditedSellerDonation] = useState({
    productName: "",
    quantity: 0,
    category: "",
  });
  const [addSellerProduct, setAddSellerProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfSold: 2000,
  });

  const [editedSellerProduct, setEditedSellerProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfSold: 2000,
  });

  const [addDonationError, setAddDonationError] = useState(null);

  const [addSellerError, setAddSellerError] = useState(null);
  const [deleteProductError, setDeleteProductError] = useState(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        let response = await fetch(
          "http://localhost:3000/sellerDonations/myDonations",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `bearer ${seller.token}`,
            },
          }
        );
        let json = await response.json();
        setSellerDonations(json.data);

        if (sellerDonations.length > 0) {
          setDonationFlag(true);
        }
        if (sellerDonations.length === 0) {
          setDonationFlag(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    const fetchCharities = async () => {
      try {
        const response = await fetch("http://localhost:3000/allCharities");
        let json = await response.json();
        setCharities(
          json.data.filter((c) => c.location === seller.user.location)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchDonations();
    fetchCharities();
  }, [sellerDonations]);

  useEffect(() => {
    async function fetchProducerProducts() {
      try {
        let response = await fetch(
          "http://localhost:3000/soldProducts/mysoldProducts",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `bearer ${seller.token}`,
            },
          }
        );
        let json = await response.json();
        setSellerProducts(json.data);
        if (sellerProducts.length > 0) {
          setProductsFlag(true);
        }
        if (sellerProducts.length === 0) {
          setProductsFlag(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducerProducts();
  }, [sellerProducts, seller.token]);

  function handleCloseAddProductForm() {
    setAddProductFlag(false);
  }
  function handleCloseAddDonationForm() {
    setAddDonationFlag(false)
  }

  function toggleEditDonationFormFlag(id) {
    setEditDonationFormFlag(id);
  }
  function toggleEditProductFormFlag(id) {
    setEditProductFormFlag(id);
  }

  function handleAddDonationChange(e) {
    setAddSellerDonation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleAddProductChange(e) {
    setAddSellerProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleEditProductChange(e) {
    setEditedSellerProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleEditDonationChange(e) {
    setEditedSellerDonation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleAddProducerProductSubmit(e) {
    try {
      e.preventDefault();
      if (
        addSellerProduct.yearOfSold < 2000 ||
        addSellerProduct.quantity === 0 ||
        addSellerProduct.productName === "" ||
        addSellerProduct.category === ""
      ) {
        setAddSellerProduct({ ...addSellerProduct });
        setAddSellerError("all fields are required");
        return;
      }
      let response = await fetch(
        "http://localhost:3000/soldProducts/addSoldProduct",
        {
          method: "POSt",
          body: JSON.stringify(addSellerProduct),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setAddSellerError(json.message);
        return;
      }
      setAddSellerProduct({
        yearOfSold: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddSellerError(null);
      setAddProductFlag(false);
      toast.success("product has been added successfully");
    } catch (err) {
      setAddSellerError(err.message);
      setLoading(false);
    }
  }
  async function handleEditProducerProductSubmit(e, id) {
    try {
      e.preventDefault();
      if (
        editedSellerProduct.yearOfSold < 2000 ||
        editedSellerProduct.quantity === 0 ||
        editedSellerProduct.productName === "" ||
        editedSellerProduct.category === ""
      ) {
        setEditedSellerProduct({ ...editedSellerProduct });
        toast.error("all fields are required");
        return;
      }
      let response = await fetch(
        `http://localhost:3000/soldProducts/editSoldProduct/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedSellerProduct),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        toast.error(json.message);
        return;
      }
      setEditedSellerProduct({
        yearOfSold: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      toast.success("your product has been edited successfully");
      setEditProductFormFlag("");
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  }
  async function handleAddProducerDonationSubmit(e) {
    try {
      e.preventDefault();
      if (
        addSellerDonation.charityName === "" ||
        addSellerDonation.quantity === 0 ||
        addSellerDonation.productName === "" ||
        addSellerDonation.category === ""
      ) {
        setAddSellerDonation({ ...addSellerDonation });
        setAddDonationError("all fields are required");
        return;
      }
      let response = await fetch(
        "http://localhost:3000/sellerDonations/addSellerDonation",
        {
          method: "POSt",
          body: JSON.stringify(addSellerDonation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        setAddDonationError("your donation hasn't been added try again later");
        return;
      }
      setAddSellerDonation({
        charityName: "",
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddDonationError(null);
      setAddDonationFlag(false);
      toast.success(
        `your ${json.data.productName} has sent to ${json.data.charityName} successfully`,
        {
          icon: "🚀",
        }
      );
    } catch (err) {
      setAddDonationError(err.message);
      setLoading(false);
    }
  }
  async function deleteProducerDonation(id) {
    try {
      let response = await fetch(
        `http://localhost:3000/sellerDonations/deleteDonation/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      let json = await response.json();
      if (!json.apiStatus) {
        toast.error(json.message);
        return;
      }
      toast.info("your donation has been removed");
    } catch (err) {
      toast.error(err);
    }
  }
  async function editProducerDonationSubmit(e, id) {
    try {
      e.preventDefault();
      if (
        editedSellerDonation.quantity === 0 ||
        editedSellerDonation.productName === "" ||
        editedSellerDonation.category === ""
      ) {
        setEditedSellerDonation({ ...editedSellerDonation });
        toast.error("all fields are required");
        return;
      }
      let response = await fetch(
        `http://localhost:3000/sellerDonations/editDonation/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedSellerDonation),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      setLoading(true);
      let json = await response.json();
      if (!json.apiStatus) {
        toast.error(json.message);
        setEditedSellerDonation({
          productName: "",
          quantity: 0,
          category: "",
        });
        return;
      }
      setEditDonationFormFlag("");
      setEditedSellerDonation({
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function deleteProducerProduct(id) {
    try {
      let response = await fetch(
        `http://localhost:3000/soldProducts/deleteSoldProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${seller.token}`,
          },
        }
      );
      let json = await response.json();
      if (!json.apiStatus) {
        setDeleteProductError(json.message);
        return;
      }
    } catch (err) {
      setDeleteProductError(err.message);
    }
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ProfileWave />
      <main className="sellerPage  flex items-center justify-between mb-5">
        <div className="flex  items-center">
          {toggleSideBar && (
            <div className="flex flex-col p-8  bg-emerald-700 shadow w-60 text-white rounded-br rounded-tr relative  fade-in ">
              <div>
                <h2 className="text-xl text-center mt-2  font-bold">
                  {seller.user.name.toUpperCase()}
                </h2>
                <div className="flex-1">
                  <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                      <button
                        onClick={() => {
                          setToggleContent("mySoldProducts");
                        }}
                        className="flex items-center p-2 space-x-3 rounded-md hover:bg-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 32 32"
                        >
                          <path d="M16 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z" />
                          <path d="M16.4 13.2h-.8a2.613 2.613 0 0 1-2.493-1.864 1 1 0 1 1 1.918-.565c.075.253.312.43.575.43h.8a.6.6 0 0 0 0-1.201h-.8C14.166 10 13 8.833 13 7.4s1.166-2.6 2.6-2.6h.8c1.121 0 2.111.714 2.466 1.778a1 1 0 1 1-1.897.633.598.598 0 0 0-.569-.411h-.8a.6.6 0 0 0 0 1.2h.8c1.434 0 2.6 1.167 2.6 2.6s-1.166 2.6-2.6 2.6z" />
                          <path d="M16 6c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18C15.01 5.13 15 5.07 15 5c0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm0 8c-.271 0-.521-.11-.71-.29-.04-.05-.09-.1-.12-.16a.556.556 0 0 1-.09-.17.672.672 0 0 1-.061-.18c-.009-.07-.019-.13-.019-.2 0-.26.109-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.45.29.71 0 .07-.01.13-.021.2a.606.606 0 0 1-.06.18.578.578 0 0 1-.09.17c-.04.06-.08.11-.12.16-.189.18-.449.29-.709.29zm2 17H2a1 1 0 0 1-1-1v-9c0-.265.105-.52.293-.707C1.527 20.058 3.653 18 6 18c1.944 0 4.452 1.469 5.295 2H16a3.004 3.004 0 0 1 2.955 3.519l7.891-3.288a2.995 2.995 0 0 1 2.818.273A2.993 2.993 0 0 1 31 23a1 1 0 0 1-.496.864l-12 7A1.003 1.003 0 0 1 18 31zM3 29h14.729l11.14-6.498a1.01 1.01 0 0 0-.314-.334.984.984 0 0 0-.939-.091l-9.23 3.846A1.007 1.007 0 0 1 18 26h-8a1 1 0 1 1 0-2h6a1.001 1.001 0 0 0 0-2h-5c-.197 0-.391-.059-.555-.167C9.68 21.323 7.387 20 6 20c-1.09 0-2.347.88-3 1.439V29z" />
                        </svg>
                        <span>My Sold Products</span>
                      </button>
                    </li>
                    <li className="rounded-sm">
                      <button
                        onClick={() => {
                          setToggleContent("marketInsights");
                        }}
                        className="flex items-center p-2 space-x-3 rounded-md hover:bg-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 32 32"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <g data-name="Layer 2">
                            <polygon points="14 28 14 30 18 30 18 28 18 22 14 22 14 28" />
                            <path d="M30,10.76l-2-8A1,1,0,0,0,27,2H5a1,1,0,0,0-1,.76l-2,8a1.09,1.09,0,0,0,0,.4A5,5,0,0,0,4,15V29a1,1,0,0,0,1,1h7V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v9h7a1,1,0,0,0,1-1V15a5,5,0,0,0,2-3.84A1.09,1.09,0,0,0,30,10.76Zm-3.53,2.87A2.94,2.94,0,0,1,25,14a3,3,0,0,1-2.83-2h5.66A3,3,0,0,1,26.44,13.63ZM16,14a3,3,0,0,1-2.83-2h5.66A3,3,0,0,1,16,14ZM4.17,12H9.83A3,3,0,0,1,7,14a2.94,2.94,0,0,1-1.44-.37A3,3,0,0,1,4.17,12ZM5.78,4H26.22l1.5,6H4.28Z" />
                          </g>
                        </svg>
                        <span>Market Insights</span>
                      </button>
                    </li>
                    <li className="rounded-sm">
                      <button
                        onClick={() => {
                          setToggleContent("myDonations");
                        }}
                        className="flex items-center p-2 space-x-3 rounded-md hover:bg-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 134 134"
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={5}
                        >
                          <path d="M39.583 106.25v2.083a6.25 6.25 0 0 1-6.25 6.25h-12.5a6.25 6.25 0 0 1-6.25-6.25V79.167a6.251 6.251 0 0 1 6.25-6.25h12.5a6.25 6.25 0 0 1 6.25 6.25v2.083H50c.323 0 .642-.075.932-.22l11.961-5.981a20.207 20.207 0 0 1 9.034-2.132h.019a2.632 2.632 0 0 1 1.862 4.495L61.027 90.194A2.083 2.083 0 0 0 62.5 93.75h12.162a21.16 21.16 0 0 0 9.466-2.235l18.088-9.044a11.567 11.567 0 0 1 5.173-1.221h.789a3.159 3.159 0 0 1 2.234 5.392L98.74 98.314a27.098 27.098 0 0 1-19.16 7.936H39.583ZM81.25 88.255a17.01 17.01 0 0 1-6.588 1.328H68.75v-1.22l8.005-8.005a6.801 6.801 0 0 0-4.809-11.608h-.019c-1.065 0-2.126.07-3.177.208V52.083h12.5v36.172Zm25-11.13V52.083H85.417v34.129l14.936-7.468a15.719 15.719 0 0 1 5.897-1.619Zm-41.667-7.242v-17.8H43.75v25h5.758l11.522-5.761a24.443 24.443 0 0 1 3.553-1.439ZM75 34.247 64.027 21.089a6.757 6.757 0 0 0-11.944 4.327v.989c0 3.485 1.354 6.655 3.563 9.012H50a6.25 6.25 0 0 0-6.25 6.25v6.25h62.5v-6.25a6.25 6.25 0 0 0-6.25-6.25h-5.646a13.138 13.138 0 0 0 3.563-9.012v-.989a6.755 6.755 0 0 0-11.943-4.327L75 34.247Zm18.75-8.831v.989a9.012 9.012 0 0 1-9.012 9.012H79.45l9.723-11.659a2.59 2.59 0 0 1 4.577 1.658Zm-23.2 10.001h-5.288a9.012 9.012 0 0 1-9.012-9.012v-.989a2.59 2.59 0 0 1 4.577-1.658l9.723 11.659Z" />
                        </svg>
                        <span>My Donations</span>
                      </button>
                    </li>
                    <li className="rounded-sm">
                      <button
                        onClick={() => {
                          setToggleContent("settings");
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
                      <span>{seller.user.location}</span>
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

        <section className="contentWrapper w-9/12">
          {toggleContent === "settings" && <Profile user={seller} />}

          {toggleContent === "myDonations" && (
            <section>
               <button
                className="bg-emerald-500 p-3 rounded text-white coolFont mb-2"
                onClick={() => setAddDonationFlag((prev) => !prev)}>
                add donation
              </button>
              {addDonationFlag && (
                <AddDonation
                  handleAddDonationSubmit={handleAddProducerDonationSubmit}
                  addDonation={addSellerDonation}
                  handleAddDonationChange={handleAddDonationChange}
                  charities={charities}
                  addDonationError={addDonationError}
                  handleCloseAddDonationForm={handleCloseAddDonationForm}
                />
              )}
              <h1 className="text-center bg-yellow-700 w-3/12 coolFont rounded-tl-md rounded-tr-md p-2" >your donations</h1>
              {!donationFlag ? (
                <>
                  <div className="bg-red-500 text-center p-4 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 ">you have no donations</div>
                </>
              ) : (
                  <section className="bg-emerald-500 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 h-80 overflow-y-auto p-3">
                {sellerDonations.map((donation) => {
                  return (
                    <div key={donation._id}  className="flex flex-wrap justify-between mb-4 items-center border-b border-black p-1">
                      <UserDonations
                        charityName={donation.charityName}
                        quantity={donation.quantity}
                        productName={donation.productName}
                        toggleEditDonationFormFlag={toggleEditDonationFormFlag}
                        donationId={donation._id}
                        deleteDonation={deleteProducerDonation}
                      />
                      {donation._id === editDonationFormFlag ? (
                        <EditDonation
                          handleEditDonationChange={handleEditDonationChange}
                          editedDonation={editedSellerDonation}
                          setEditDonationFormFlag={setEditDonationFormFlag}
                          editDonationSubmit={editProducerDonationSubmit}
                          donationId={donation._id}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
                </section>
              )}

            </section>
          )}

          {toggleContent === "mySoldProducts" && (
            <section>
              <button
                className="bg-emerald-500 p-3 rounded text-white coolFont mb-2"
                onClick={() => {
                  setAddProductFlag((prev) => !prev);
                }}
              >
                add new product
              </button>
              {addProductFlag && (
                <AddProduct
                  handleAddProductSubmit={handleAddProducerProductSubmit}
                  addProduct={addSellerProduct}
                  handleAddProductChange={handleAddProductChange}
                  error={addSellerError}
                  userType={seller.user.userType}
                  handleCloseAddProductForm={handleCloseAddProductForm}
                />
              )}
              <h1 className="text-center bg-yellow-700 w-3/12 coolFont rounded-tl-md rounded-tr-md p-2">
                your added products
              </h1>
              {!productsFlag ? (
                <>
                  <div className="bg-red-500 text-center p-4 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 ">
                    you have no added products
                  </div>
                </>
              ) : (
                <section className="bg-emerald-500 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 h-80 overflow-y-auto p-3">
                  {sellerProducts.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="flex flex-wrap justify-between mb-4 items-center border-b border-black p-1"
                      >
                        <UserProducts
                          quantity={product.quantity}
                          productName={product.productName}
                          year={product.yearOfSold}
                          category={product.category}
                          toggleEditProductFormFlag={toggleEditProductFormFlag}
                          productId={product._id}
                          deleteError={deleteProductError}
                          deleteProduct={deleteProducerProduct}
                        />
                        {product._id === editProductFormFlag ? (
                          <EditProduct
                            handleEditSubmit={handleEditProducerProductSubmit}
                            editedProduct={editedSellerProduct}
                            setEditFormFlag={setEditProductFormFlag}
                            handleEditProductChange={handleEditProductChange}
                            productId={product._id}
                            userType={seller.user.userType}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </section>
              )}
            </section>
          )}

          {toggleContent === "marketInsights" && (
            <section>
              <SellerMarketInsights />
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export default Sellers;
