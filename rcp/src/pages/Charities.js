import React, { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../components/LoadingComponent"

export default function Charities() {
  
  const charity = JSON.parse(localStorage.getItem("user"));
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [description,setDescription] = useState('')
  const [donations , setDonations] = useState([])
  const [loading , setLoading] = useState(true)
  const [editImageForm , setEditImageForm] = useState(false)

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

  function descriptionFormToggle() {
    setShowDescriptionForm((prev) => !prev);
  }
  function toggleEditImageForm(){
    setEditImageForm((prev)=> !prev)
  }
  function handleDescriptionChange(e){
    setDescription(e.target.value)  
  }
  
  async function submitDescriptionChange(e){
    try {
      e.preventDefault();
      let response = await fetch("http://localhost:3000/user/addDescription", {
        method: "POSt",
        body: JSON.stringify({description}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `bearer ${charity.token}`
        },
      });

      let data = await response.json();
     charity.user["description"] = data.data.description
     localStorage.setItem('user', JSON.stringify(charity));
     setShowDescriptionForm(false)
    } catch (err) {
      console.log(err)
    }
  }
 
 async function handleImageEdit(e){
    try{
      let formData = new FormData()
      formData.append('logo',e.target.files[0])
    let response = await fetch("http://localhost:3000/user/logoUpload", {
      method: "POSt",
      body: formData,
      headers: {
        "Authorization": `bearer ${charity.token}`
      },
    });

    let json = await response.json();

    charity.user["image"] = json.data.image
    localStorage.setItem('user', JSON.stringify(charity));
 
  } catch (err) {
    console.log(err)
  }
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
          <div>
            <h1>{charity.user.name}</h1>
            <img
              src={charity.user.image?
                "http://localhost:3000/" +
                charity.user.image.replace("public", ""):""
              }
              alt=""
            />
            <button onClick={toggleEditImageForm}>edit Image</button>
           {editImageForm && <input type="file" onChange={(e)=>{
              handleImageEdit(e);
            }} />}
          </div>
          <div>
            {!showDescriptionForm && (
              <div>
                {!charity.user.description ? (
                  <div>add description</div>
                ) : (
                  <div>{charity.user.description}</div>
                )}
              </div>
            )}
            <button onClick={descriptionFormToggle}>edit Description</button>
            {showDescriptionForm && (
              <form action="post" onSubmit={submitDescriptionChange}>
                <input
                  type="text"
                  id="charityDescription"
                  placeholder={charity.user.description ? charity.user.description :"add your description"}
                  onChange={(e)=>{handleDescriptionChange(e)}}
                />
                <button>save changes</button>
              </form>
            )}
          </div>
          <div>{charity.user.location}</div>
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
