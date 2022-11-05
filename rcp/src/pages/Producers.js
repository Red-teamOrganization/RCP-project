import React, { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent"
// import Products from "../components/Products";
import "./producer.css";

function Producers() {
  const producer = JSON.parse(localStorage.getItem("user"));
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [description,setDescription] = useState('')
  const [producerDonations , setProducerDonations] = useState([])
  const [loading , setLoading] = useState(true)
  const [editImageForm , setEditImageForm] = useState(false)
  const [donationFlag,setDonationFlag]= useState(false)
  const [charities , setCharities] = useState([])

  const [addProducerDonation, setAddProducerDonation] = useState({
    charityName:"",
    productName: "",
    quantity: 0,
    category:""
  });

  const [addDonationError,setAddDonationError]=useState(null)
  const [deleteDonationError,setDeleteDonationError] = useState(null)

  useEffect(()=>{
    async function fetchDonations(){
     try{
      let response = await fetch("http://localhost:3000/producerDonations/myDonations", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization":`bearer ${producer.token}`
        },
      });
      let json = await response.json()
      setProducerDonations(json.data)

      if(producerDonations.length>0){
        setDonationFlag(true)
      }

      setLoading(false)
     } 
     catch(err){
      console.log(err)
     } 
    }
    const fetchCharities = async () => {
      try{
        const response = await fetch("http://localhost:3000/allCharities");
        let json = await response.json();
        setCharities(json.data.filter(c=>c.location === producer.user.location))
      }
      catch(err){
       console.log(err)
      }
    };

    fetchDonations()
    fetchCharities()

  },[producerDonations])
  
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
          "Authorization": `bearer ${producer.token}`
        },
      });
       setLoading(true)
      let data = await response.json();
     producer.user["description"] = data.data.description

     localStorage.setItem('user', JSON.stringify(producer));
     setShowDescriptionForm(false)
     setLoading(false)
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
        "Authorization": `bearer ${producer.token}`
      },
    });

    let json = await response.json();

    producer.user["image"] = json.data.image
    localStorage.setItem('user', JSON.stringify(producer));
    setEditImageForm(false)
 
  } catch (err) {
    console.log(err)
  }
  }

  function handleAddDonationChange(e) {
    setAddProducerDonation(prev=>{
      return{
        ...prev,[e.target.name]:e.target.value
      }
    });
  }

  async function handleAddProducerDonationSubmit(e){
      try{
        e.preventDefault();
        if (addProducerDonation.charityName === "" || addProducerDonation.quantity === 0|| addProducerDonation.productName === "" || addProducerDonation.category=== "" ) {
          setAddProducerDonation({ ...addProducerDonation});
          setAddDonationError("all fields are required")
          return;
        }
        let response = await fetch("http://localhost:3000/producerDonations/addProducerDonation",{
          method:'POSt',
          body: JSON.stringify(addProducerDonation),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `bearer ${producer.token}`
         },
        })
        
       let json = await response.json();
       if(!json.apiStatus){
         setAddDonationError("your donation hasn't been added try again later")
         return;
       }
       setLoading(true)
       setAddProducerDonation({
        charityName:"",
        productName: "",
        quantity: 0,
        category:""
      });
       setLoading(false)
      }
      catch(err){
        setAddDonationError(err.message)
        setLoading(false)
      }
  }
  async function deleteProducerDonation(id){
    try{
    
      let response = await fetch(`http://localhost:3000/producerDonations/deleteDonation/${id}`,{
        method:'DELETE',
        body: JSON.stringify(addProducerDonation),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Authorization": `bearer ${producer.token}`
       },
      })
      
     let json = await response.json();
     if(!json.apiStatus){
      setDeleteDonationError(json.message)
      return;
    }
    
    }
    catch(err){
      setDeleteDonationError(err.message)
      
    }
  }
  return (
    <>
      <main className="charityPage">
        <section className="charityProfile">
          <div>
            <h1>welcome {producer.user.name}</h1>
            <img
              src={producer.user.image?
                "http://localhost:3000/" +
                producer.user.image.replace("public", ""):""
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
                {!producer.user.description ? (
                  <div>add description</div>
                ) : (
                  <div>{producer.user.description}</div>
                )}
              </div>
            )}
            <button onClick={descriptionFormToggle}>edit Description</button>
            {showDescriptionForm && (
              <form action="post" onSubmit={submitDescriptionChange}>
                <input
                  type="text"
                  id="charityDescription"
                  placeholder={producer.user.description ? producer.user.description :"add your description"}
                  onChange={(e)=>{handleDescriptionChange(e)}}
                />
                <button>save changes</button>
              </form>
            )}
          </div>
          <div>{producer.user.location}</div>
        </section>
       <section>
        <h1>your donations</h1> 
        {!donationFlag ? <><div>you have no donations</div></> : producerDonations.map(donation=>{
          return(<div key={donation._id}>
           <p>{donation.charityName}</p>
           <p>{donation.quantity}</p>
           <p>{donation.productName}</p>
           <button>edit</button>
           <button onClick={()=>deleteProducerDonation(donation._id)}>delete</button>
           {deleteDonationError && <div>{deleteDonationError}</div>}
          </div>)
        })}
        <button>add donation</button>
        <form onSubmit={handleAddProducerDonationSubmit}>
          <input type="text" placeholder="enter product name" 
              value={addProducerDonation.productName}
              onChange={handleAddDonationChange}
              name="productName"
              id="productName"
              />
          <input type="number" placeholder="enter product quantity"
           value={addProducerDonation.quantity}
           onChange={handleAddDonationChange}
           name="quantity"
           id="quantity"
           />
              <select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleAddDonationChange}
                name='category'
                id="category"
                value={addProducerDonation.category}
                >
                  <option>category of product</option>
                  <option value="agriculture">agriculture</option>
                  <option value="protein">protein</option>
                  <option value="diary">diary</option>
                </select>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={addProducerDonation.charityName}
              onChange={handleAddDonationChange}
              name="charityName"
              id="charityName"
               >
                <option>Charity Name</option>
              { charities.map(charity=>{
                return(
                  <option value={charity.name} key={charity._id}>{charity.name}</option>
                )
              }) }
              </select>
          <button>send donation</button>
        </form>
        {addDonationError && <div>{addDonationError}</div>}
        </section>
      </main>
    </>
  );
}

export default Producers;
