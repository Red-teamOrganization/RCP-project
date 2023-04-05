import React, { useState, useEffect } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

import AddDonation from "../components/AddDonation";
import AddProduct from "../components/AddProduct";
import SideBar from "../components/SideBar";
import LoadingComponent from "../components/LoadingComponent";
import Profile from "../components/Profile";
import UserDonations from "../components/UserDonations";
import UserProducts from "../components/UserProducts";

import ProducerMarketInsights from "../components/ProducerMarketInsights";

import ProfileWave from "../components/ProfileWave";

function Producers() {
 
  const [error, sendReq] = useRestfulApi();

  const producer = JSON.parse(localStorage.getItem("user"));

  const [producerDonations, setProducerDonations] = useState([]);
  const [producerProducts, setProducerProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [donationFlag, setDonationFlag] = useState(false);
  const [productsFlag, setProductsFlag] = useState(false);
  const [addDonationFlag, setAddDonationFlag] = useState(false);
  const [addProductFlag, setAddProductFlag] = useState(false);

 const [toggleContent, setToggleContent] = useState("myProducts");

  useEffect(() => {
   
    async function fetchDonations() {
      try {
        let response = await sendReq("producerDonations/myDonations", "GET", null, producer.token);
        setProducerDonations(response.data);
        if (producerDonations.length > 0) {
          setDonationFlag(true);
        }
        if (producerDonations.length === 0) {
          setDonationFlag(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(error);
      }
    }
    
    fetchDonations();
  
  }, [producerDonations]);

  useEffect(() => {
    async function fetchProducerProducts() {
      try {
        let response = await sendReq("producedProducts/myProducedProducts", "GET", null, producer.token);
      
        setProducerProducts(response.data);
        if (producerProducts.length > 0) {
          setProductsFlag(true);
        }
        if (producerProducts.length === 0) {
          setProductsFlag(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducerProducts();
  }, [producerProducts]);

  function handleCloseAddProductForm() {
    setAddProductFlag(false);
  }

  function handleCloseAddDonationForm() {
    setAddDonationFlag(false)
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ProfileWave />
      <main className="producerPage  flex items-center justify-between mb-5">
        <SideBar currentUser={producer} setToggleContent={setToggleContent} />
        <section className="contentWrapper w-9/12">
          {toggleContent === "myProducts" && (
            <section>
               <button
                className="bg-emerald-500 p-3 rounded text-white coolFont mb-2"
                onClick={() => {
                  setAddProductFlag((prev) => !prev);
                }}
              >
               add product
              </button>
              {addProductFlag && (
               <AddProduct
               url="producedProducts/addProducedProduct"
               handleCloseAddProductForm={handleCloseAddProductForm}
               currentUser={producer}
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
                {producerProducts.map((product) => {
                  return (
                    <div key={product._id}  className="flex flex-wrap justify-between mb-4 items-center border-b border-black p-1">
                      <UserProducts
                        quantity={product.quantity}
                        productName={product.productName}
                        year={product.yearOfProduction}
                        category={product.category}
                        productId={product._id}
                        currentUser={producer}
                      />
                    </div>
                  );
                })}
                </section>
              )}
            </section>
          )}
          {toggleContent === "settings" && (
            <section className="producerProfile">
              <Profile user={producer} />
            </section>
          )}

          {toggleContent === "myDonations" && (
            <section>
              <button  className="bg-emerald-500 p-3 rounded text-white coolFont mb-2" onClick={() => setAddDonationFlag((prev) => !prev)}>
                add donation
              </button>
              { addDonationFlag && (   
           <AddDonation
                  closeAddDonationForm={handleCloseAddDonationForm}
                  currentUser={producer}
                  url="producerDonations/addProducerDonation"
                />)
                }
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
                  {producerDonations.map((donation) => {
                    return (
                      <div key={donation._id}  className="flex flex-wrap justify-between mb-4 items-center border-b border-black p-1">
                        <UserDonations
                           charityName={donation.charityName}
                           quantity={donation.quantity}
                           productName={donation.productName}
                           donationId={donation._id}
                           currentUser={producer}
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
              <ProducerMarketInsights />
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export default Producers;
