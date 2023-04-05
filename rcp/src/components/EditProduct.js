import { useState } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

import { toast } from "react-toastify";

export default function EditProduct(props) {
  const [error, sendReq] = useRestfulApi();

  const [editedProduct, setEditedProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfSold: 2000,
  });

  const [loading, setLoading] = useState(false);

  function handleEditProductChange(e) {
    setEditedProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleEditProductSubmit(e) {
    try {
      e.preventDefault();
      if (
        editedProduct.yearOfSold < 2000 ||
        editedProduct.quantity === 0 ||
        editedProduct.productName === "" ||
        editedProduct.category === ""
      ) {
        setEditedProduct({ ...editedProduct });
        toast.error("all fields are required");
        return;
      }
      setLoading(true);
      const response = await sendReq(props.url, "PATCH", editedProduct, props.currentUser.token);
      if (!response.apiStatus) {
        toast.error(response.message);
        setLoading(false)
        return;
      }
      setEditedProduct({
        yearOfSold: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      toast.success("your product has been edited successfully");
      props.setEditFormFlag("");
    } catch (err) {
      setLoading(false);
      console.log(loading)
      toast.error(error);
    }
  }

  return (
    <>
    <form 
    className="w-4/12 mx-auto flex flex-col"
    onSubmit={(e)=>{
      handleEditProductSubmit(e)
      }}>
    <input
      type="text"
      className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
      placeholder="product name"
      value={editedProduct.productName}
      onChange={handleEditProductChange}
      name="productName"
      id="productName"
    />
    <input
      type="number"
      placeholder="quantity in kg"
      onChange={handleEditProductChange}
      name="quantity"
      id="quantity"
      className="block rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
    />
  <input
      type="number"
      placeholder={props.currentUser.user.userType === "producer" ? "year of production" : "year of sold"}
      onChange={handleEditProductChange}
      name={props.currentUser.user.userType === "producer" ? "yearOfProduction" : "yearOfSold"}
      id="year"
      className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
    />
    <select
      className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
      onChange={handleEditProductChange}
      name="category"
      id="category"
      value={editedProduct.category}
    >
      <option>category of product</option>
      <option value="agriculture">agriculture</option>
      <option value="protein">protein</option>
      <option value="diary">diary</option>
    </select>
    {
        loading ? 
        <button className="bg-gray-600 p-2 rounded text-white" disabled>Loading...</button>:
        <button className="bg-blue-900 p-2 rounded text-white" >save edit</button>
      }

    <div className="text-gray-600 cursor-pointer" onClick={() => props.setEditFormFlag("")}>discard edit</div>
  </form>
 
  </>
  )

}
