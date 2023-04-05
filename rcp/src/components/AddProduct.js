import  ReactDOM from 'react-dom';
import { useState } from 'react';
import useRestfulApi from "../hooks/useRestfulApi";

import { toast } from "react-toastify";
import "./AddProduct.css";

export default function AddProduct(props) {
  const [error, sendReq] = useRestfulApi();
  const [addProduct, setAddProduct] = useState({
    productName: "",
    quantity: 0,
    category: "",
    yearOfSold: 2000,
  });
  const [addError, setAddError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleAddProductChange(e) {
    setAddProduct((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleAddProductSubmit(e) {
    try {
      e.preventDefault();
      if (
        addProduct.yearOfSold < 2000 ||
        addProduct.quantity === 0 ||
        addProduct.productName === "" ||
        addProduct.category === ""
      ) {
        setAddProduct({ ...addProduct });
        setAddError("all fields are required");
        return;
      }
      setLoading(true);
      const response = await sendReq(props.url, "POST", addProduct, props.currentUser.token);
      
      
      if (!response.apiStatus) {
        setAddError(response.message);
        setLoading(false);
        return;
      }
      setAddProduct({
        yearOfSold: 2000,
        productName: "",
        quantity: 0,
        category: "",
      });
      setLoading(false);
      setAddError(null);
      props.handleCloseAddProductForm()
      toast.success("product has been added successfully");
    } catch (err) {
      setAddError(error.message);
      setLoading(false);
    }
  }
    return ReactDOM.createPortal((
        <div className="addProductFormWrapper">
        <form onSubmit={handleAddProductSubmit} className="addProductForm flex flex-col">
        <div className=' cursor-pointer exitFormButton' onClick={()=>props.handleCloseAddProductForm()}>X</div>
        <input
          type="text"
          className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          placeholder="product name"
          onChange={handleAddProductChange}
          name="productName"
          id="productName"
        />
        <input
          type="number"
          className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          placeholder="quantity in kg"
          onChange={handleAddProductChange}
          name="quantity"
          id="quantity"
        />
      <input
          type="number"
          placeholder={props.currentUser.user.userType === "producer" ? "year of production" : "year of sold"}
          className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          
          onChange={handleAddProductChange}
          name={props.currentUser.user.userType === "producer" ? "yearOfProduction" : "yearOfSold"}
          id="year"
        />
        <select
         className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          onChange={handleAddProductChange}
          name="category"
          id="category"
          value={addProduct.category}
        >
          <option className='text-gray-900'>category of product</option>
          <option value="agriculture">agriculture</option>
          <option value="protein">protein</option>
          <option value="diary">diary</option>
        </select>
        {
      loading ? 
      <button className="bg-gray-600 p-2 rounded text-white coolFont" disabled>Loading...</button> : 
      <button className="bg-blue-900 p-2 rounded text-white coolFont">add product</button>
    }
        {addError && <div className='bg-red-500 p-2 rounded text-center text-white coolFont mt-2'>{addError}</div>}
      </form>
      </div>),
      document.body
      )
}
