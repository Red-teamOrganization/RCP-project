import { useState } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

import EditProduct from "./EditProduct";

export default function UserProducts({product,currentUser}) {
  const [error, sendReq] = useRestfulApi();
  const [deleteError, setDeleteError] = useState(null);
  const [editProductFormFlag, setEditProductFormFlag] = useState("");
  const [loading , setLoading] = useState(false)

  function toggleEditProductFormFlag(id) {
    setEditProductFormFlag(id);
  }

  async function deleteProduct(id) {
    try {
      setLoading(true)
      const response = await sendReq(
        currentUser.user.userType === "seller"
          ? `soldProducts/deleteSoldProduct/${id}`
          : `producedProducts/deleteProducedProduct/${id}`,
        "DELETE",
        null,
        currentUser.token
      );
      setLoading(false)
      if (!response.apiStatus) {
        setDeleteError(response.message);
        return;
      }
    } catch (err) {
      setLoading(false)
      setDeleteError(error.message);
    }
  }

  return (
    <>
      <p className="w-2/12">{product.productName}</p>
      <p className="w-2/12">{product.category}</p>
      <p className="w-2/12">{product.year}</p>
      <p className="w-2/12">{product.quantity} kg</p>
    { loading ? 
    <button className="bg-gray-500 p-2 rounded" disabled >deleting ...</button> : 
    <>
    <button
        className="bg-yellow-500 p-2 rounded "
        onClick={() => {
          toggleEditProductFormFlag(product._id);
        }}
      >
        edit
      </button>
      <button
        className="bg-red-500 p-2 rounded"
        onClick={() => deleteProduct(product._id)}
      >
        delete
      </button>
      {deleteError && <div>failed to delete product try again later</div>}
      {product._id === editProductFormFlag ? (
        <EditProduct
          setEditFormFlag={setEditProductFormFlag}
          currentUser={currentUser}
          url={
            currentUser.user.userType === "seller"
              ? `soldProducts/editSoldProduct/${product._id}}`
              : `producedProducts/editProducedProduct/${product._id}`
          }
        />
      ) : (
        <></>
      )}
      </>
     }
    </>
  );
}
