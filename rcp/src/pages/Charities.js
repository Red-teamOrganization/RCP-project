import React, { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent"
import Profile from "../components/Profile";

export default function Charities() {
  
  const charity = JSON.parse(localStorage.getItem("user"));
  const [donations , setDonations] = useState([])
  const [loading , setLoading] = useState(true)
 

  useEffect(()=>{
    async function fetchDonations(){
     try{
      let response = await fetch("http://localhost:3000/user/profile", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization":`bearer ${charity.token}`
        },
      });
      let json = await response.json()
      setDonations(json.data.donations)
      setLoading(false)
     } 
     catch(err){
      console.log(err)
     } 
    }
  

    fetchDonations()
  },[donations , charity.token])

  if(loading){
    return <LoadingComponent />
  }

  async function checkDonation(id){
    try{
      let response = await fetch(`http://localhost:3000/user/charityProfile/donationCheck/${id}`, {
        method: "POSt",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `bearer ${charity.token}`
        },
      });
      await response.json();
    }
    catch(err){
    console.log(err)
    }
 
    }

  return (
    <>
      <main className="charityPage">
        <section className="charityProfile">
          <Profile user={charity}/>
        </section>
        <section className="charityDonations">
          {
            donations.map(donation => {
               return(
                <div key={donation._id}>
                <div>{donation.donatorName}</div>
                <div>{donation.productName}</div>
                <div>{donation.quantity}</div>
                {donation.checked ? <p>uncheck donation</p> : <p>check donation</p>}
                <input type="checkbox" checked={donation.checked} onChange={()=>{
                  checkDonation(donation._id)
                }} />
                </div>
               )
            })
          }
        </section>
      </main>
    </>
  );
}
