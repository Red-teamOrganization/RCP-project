import React, { useState, useEffect } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

import AddDonation from "../components/AddDonation";
import AddProduct from "../components/AddProduct";
import SideBar from "../components/SideBar";
import LoadingComponent from "../components/LoadingComponent";
import Profile from "../components/Profile";
import UserDonations from "../components/UserDonations";
import UserProducts from "../components/UserProducts";

import SellerMarketInsights from "../components/SellerMarketInsights";
import ProfileWave from "../components/ProfileWave";

function Sellers() {
  const seller = JSON.parse(localStorage.getItem("user"));

  const [error, sendReq] = useRestfulApi();

  const [sellerDonations, setSellerDonations] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [donationFlag, setDonationFlag] = useState(false);
  const [productsFlag, setProductsFlag] = useState(false);

  const [addDonationFlag, setAddDonationFlag] = useState(false);

  const [addProductFlag, setAddProductFlag] = useState(false);

  const [toggleContent, setToggleContent] = useState("myProducts");

  useEffect(() => {
    async function fetchDonations() {
      try {

        const response = await sendReq(
          "sellerDonations/myDonations",
          "GET",
          null,
          seller.token
        );
        setLoading(false);
        setSellerDonations(response.data);

        if (sellerDonations.length > 0) {
          setDonationFlag(true);
        }
        if (sellerDonations.length === 0) {
          setDonationFlag(false);
        }
      
      } catch (err) {
        console.log(error);
      }
    }

    fetchDonations();
  }, [sellerDonations]);

  useEffect(() => {
    async function fetchSellerProducts() {
      try {
       
        const response = await sendReq(
          "soldProducts/mysoldProducts",
          "GET",
          null,
          seller.token
        );
        setLoading(false);
        setSellerProducts(response.data);
        if (sellerProducts.length > 0) {
          setProductsFlag(true);
        }
        if (sellerProducts.length === 0) {
          setProductsFlag(false);
        }
        
      } catch (err) {
        console.log(error);
      }
    }
    fetchSellerProducts();
  }, [sellerProducts]);

  function handleCloseAddDonationForm() {
    setAddDonationFlag(false);
  }

  function handleCloseAddProductForm() {
    setAddProductFlag(false);
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ProfileWave />
      <main className="sellerPage  flex items-center justify-between mb-5">
      <SideBar currentUser={seller} setToggleContent={setToggleContent} />
        <section className="contentWrapper w-9/12">
          {toggleContent === "settings" && <Profile user={seller} />}

          {toggleContent === "myDonations" && (
            <section>
              <button
                className="bg-emerald-500 p-3 rounded text-white coolFont mb-2"
                onClick={() => setAddDonationFlag((prev) => !prev)}
              >
                add donation
              </button>

              {addDonationFlag && (
                <AddDonation
                  closeAddDonationForm={handleCloseAddDonationForm}
                  currentUser={seller}
                  url="sellerDonations/addSellerDonation"
                />
              )}

              <h1 className="text-center bg-yellow-700 w-3/12 coolFont rounded-tl-md rounded-tr-md p-2">
                your donations
              </h1>
              {!donationFlag ? (
                <>
                  <div className="bg-red-500 text-center p-4 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 ">
                    you have no donations
                  </div>
                </>
              ) : (
                <section className="bg-emerald-500 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 h-80 overflow-y-auto p-3">
                  {sellerDonations.map((donation) => {
                    return (
                      <div
                        key={donation._id}
                        className="flex flex-wrap justify-between mb-4 items-center border-b border-black p-1"
                      >
                        <UserDonations
                          charityName={donation.charityName}
                          quantity={donation.quantity}
                          productName={donation.productName}
                          donationId={donation._id}
                          currentUser={seller}
                        />
                      </div>
                    );
                  })}
                </section>
              )}
            </section>
          )}

          {toggleContent === "myProducts" && (
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
                  url="soldProducts/addSoldProduct"
                  handleCloseAddProductForm={handleCloseAddProductForm}
                  currentUser={seller}
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
                          productId={product._id}
                          currentUser={seller}
                        />
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
