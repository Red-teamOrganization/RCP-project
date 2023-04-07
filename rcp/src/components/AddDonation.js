import  ReactDOM from 'react-dom';
import { useState, useEffect} from 'react';
import { toast } from "react-toastify";
import useRestfulApi from "../hooks/useRestfulApi";

import "./AddDonation.css"

export default function AddDonation(props) {
  const [error, sendReq] = useRestfulApi();
  const [addDonation, setAddDonation] = useState({
    charityName: "",
    productName: "",
    quantity: 0,
    category: "",
  });
 const [addDonationError, setAddDonationError] = useState(null);
 const [loading, setLoading] = useState(false);

 const [charities, setCharities] = useState([]);

useEffect(()=>{
  const fetchCharities = async () => {
    try {
      const response = await sendReq("allCharities", "GET", null, null);
     
      setCharities(
        response.data.filter((c) => c.location === props.currentUser.user.location)
      );
    } catch (err) {
      console.log(error);
    }
  };
  fetchCharities();
})

function handleAddDonationChange(e) {
  setAddDonation((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    };
  });
}
  async function handleAddDonationSubmit(e) {
    try {
      e.preventDefault();
      if (
        addDonation.charityName === "" ||
        addDonation.quantity === 0 ||
        addDonation.productName === "" ||
        addDonation.category === ""
      ) {
        setAddDonation({ ...addDonation });
        setAddDonationError("all fields are required");
        return;
      }
      setLoading(true);
      const response = await sendReq(props.url, "POST", addDonation, props.currentUser.token);

      if (!response.apiStatus) {
        setAddDonationError("your donation hasn't been added try again later");
        setLoading(false);
        return;
      }
      setAddDonation({
        charityName: "",
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddDonationError(null);
      props.closeAddDonationForm()
      toast.success(
        `your ${response.data.productName} has sent to ${response.data.charityName} successfully`,
        {
          icon: "🚀",
        }
      );
    } catch (err) {
      setAddDonationError(error.message);
      setLoading(false);
    }
  }

  return ReactDOM.createPortal((
    <div className="addDonationFormWrapper">
   
    <form className='addDonationForm flex flex-col' onSubmit={handleAddDonationSubmit}>
    <div className=' cursor-pointer exitDonationFormButton' onClick={props.closeAddDonationForm}>X</div>
    <input
      type="text"
      className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
      placeholder="product name"
    
      onChange={handleAddDonationChange}
      name="productName"
      id="productName"
    />
    <input
      type="number"
      placeholder="product quantity in kg"
      className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
   
      onChange={handleAddDonationChange}
      name="quantity"
      id="quantity"
    />
    <select
     className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
      onChange={handleAddDonationChange}
      name="category"
      id="category"
     
    >
      <option>category of product</option>
      <option value="agriculture">agriculture</option>
      <option value="protein">protein</option>
      <option value="diary">diary</option>
    </select>
    <select
      className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
     
      onChange={handleAddDonationChange}
      name="charityName"
      id="charityName"
    >
      <option>Charity Name</option>
      {charities.map((charity) => {
        return (
          <option value={charity.name} key={charity._id}>
            {charity.name}
          </option>
        );
      })}
    </select>
    {
      loading ? 
      <button className="bg-gray-600 p-2 rounded text-white coolFont" disabled>Loading...</button> : 
      <button className="bg-blue-900 p-2 rounded text-white coolFont ">send donation</button>
    }
    {addDonationError && <div className='bg-red-500 p-2 rounded text-center text-white coolFont mt-2'>{addDonationError}</div>}
  </form>
  </div>
  ),document.body)

}
