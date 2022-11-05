import React from "react";
import { useState } from "react";

export default function Charities() {
  const charity = JSON.parse(localStorage.getItem("user"));
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [description,setDescription] = useState('')
 
  function descriptionFormToggle() {
    setShowDescriptionForm((prev) => !prev);
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

  return (
    <>
      <main className="charityPage">
        <section className="charityProfile">
          <div>
            <h1>{charity.user.name}</h1>
            <img
              src={
                "http://localhost:3000/" +
                charity.user.image.replace("public", "")
              }
              alt=""
            />
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
        <section className="charityDonations"></section>
      </main>
    </>
  );
}
