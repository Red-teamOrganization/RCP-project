//import react default and custom hooks
import { useState, useEffect } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

//imported components
import AddDonation from "../components/AddDonation";
import AddProduct from "../components/AddProduct";
import SideBar from "../components/SideBar";
import LoadingComponent from "../components/LoadingComponent";
import Profile from "../components/Profile";
import UserDonations from "../components/UserDonations";
import UserProducts from "../components/UserProducts";
import ProducerMarketInsights from "../components/ProducerMarketInsights";
import ProfileWave from "../components/ProfileWave";

function Users() {
  //bring data of sign in user from local storage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userType = currentUser.user.userType
  
  //use custom hook for different restful api requests
  const [error, sendReq] = useRestfulApi();

  //state of loading
  const [loading, setLoading] = useState(true);

  //store donations and products
  const [userDonations, setUserDonations] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  //toggle different portal forms
  const [addDonationFlag, setAddDonationFlag] = useState(false);
  const [addProductFlag, setAddProductFlag] = useState(false);

  //toggle content in dashboard
  const [toggleContent, setToggleContent] = useState("myProducts");

  //fetch donations and products for a currentUser
  useEffect(() => {
    async function fetchDonations() {
      try {
        let response = await sendReq(userType === "producer" ?
          "producerDonations/myDonations" : "sellerDonations/myDonations",
          "GET",
          null,
          currentUser.token
        );
        setUserDonations(response.data);
        setLoading(false);
      } catch (err) {
        console.log(error);
      }
    }

    fetchDonations();
  }, [userDonations, error, currentUser.token, sendReq,userType]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response = await sendReq(
          userType==="producer" ?
          "producedProducts/myProducedProducts":"soldProducts/mySoldProducts",
          "GET",
          null,
          currentUser.token
        );

        setUserProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [userProducts, error, currentUser.token, sendReq,userType]);

  //close different portal forms
  function handleCloseAddProductForm() {
    setAddProductFlag(false);
  }

  function handleCloseAddDonationForm() {
    setAddDonationFlag(false);
  }
  //return loading component at start of page
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ProfileWave />
      <main className="producerPage  flex items-center justify-between mb-5">
        <SideBar currentUser={currentUser} setToggleContent={setToggleContent} />
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
                  currentUser={currentUser}
                />
              )}
              <h1 className="text-center bg-yellow-700 w-3/12 coolFont rounded-tl-md rounded-tr-md p-2">
                your added products
              </h1>
              {userProducts.length <= 0 ? (
                <>
                  <div className="bg-red-500 text-center p-4 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 ">
                    you have no added products
                  </div>
                </>
              ) : (
                <section className="bg-emerald-500 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 h-80 overflow-y-auto p-3">
                  {userProducts.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="flex flex-wrap justify-between mb-4 items-center border-b border-black p-1"
                      >
                        <UserProducts
                          product={product}
                          currentUser={currentUser}
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
              <Profile user={currentUser} />
            </section>
          )}

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
                  currentUser={currentUser}
                  url="producerDonations/addProducerDonation"
                />
              )}
              <h1 className="text-center bg-yellow-700 w-3/12 coolFont rounded-tl-md rounded-tr-md p-2">
                your donations
              </h1>
              {UserDonations.length <= 0 ? (
                <>
                  <div className="bg-red-500 text-center p-4 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 ">
                    you have no donations
                  </div>
                </>
              ) : (
                <section className="bg-emerald-500 coolFont rounded-bl-md rounded-tr-md rounded-br-md w-9/12 h-80 overflow-y-auto p-3">
                  {userDonations.map((donation) => {
                   
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
                          currentUser={currentUser}
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

export default Users;
