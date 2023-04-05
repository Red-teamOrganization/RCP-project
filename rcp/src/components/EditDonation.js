import { useState } from "react";
import { toast } from "react-toastify";
import useRestfulApi from "../hooks/useRestfulApi";


export default function EditDonation(props) {
  const [error, sendReq] = useRestfulApi();

  const [editedDonation, setEditedDonation] = useState({
    productName: "",
    quantity: 0,
    category: "",
  });
  
  const [loading, setLoading] = useState(false);

  function handleEditDonationChange(e) {
    setEditedDonation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function editDonationSubmit(e) {
    try {
      e.preventDefault();
      if (
        editedDonation.quantity === 0 ||
        editedDonation.productName === "" ||
        editedDonation.category === ""
      ) {
        setEditedDonation({ ...editedDonation });
        toast.error("all fields are required");
        return;
      }
      setLoading(true);
      const response = await sendReq(props.url, "PATCH", editedDonation, props.currentUser.token);
     
      if (!response.apiStatus) {
        toast.error(response.message);
        setLoading(false);
        return;
      }
      props.setEditDonationFormFlag("");
      setEditedDonation({
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
    } catch (err) {
      console.log(error);
    }
  }

  return (
    
    <form
     className="w-5/12 mx-auto flex flex-col"
      onSubmit={(e) => {
        editDonationSubmit(e);
      }}
    >
      <input
        type="text"
        className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
        placeholder="product name"
        onChange={handleEditDonationChange}
        name="productName"
        id="productNameEdit"
      />
      <input
        type="number"
        className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
        placeholder="product quantity"
        onChange={handleEditDonationChange}
        name="quantity"
        id="quantityEdit"
      />
      <select
     className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text "
        onChange={handleEditDonationChange}
        name="category"
        id="categoryEdit"
      >
        <option>category of product</option>
        <option value="agriculture">agriculture</option>
        <option value="protein">protein</option>
        <option value="diary">diary</option>
      </select>
      {
        loading ? <button className="bg-gray-600 p-2 rounded text-white" disabled>Loading...</button>:
        <button className="bg-blue-900 p-2 rounded text-white" >save edit</button>
      }
     

      <div className="text-gray-600 cursor-pointer" onClick={() => props.setEditDonationFormFlag("")}>discard edit</div>
    </form>
  );
}
