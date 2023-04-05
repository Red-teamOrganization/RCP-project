import { useState } from "react";
import useRestfulApi from "../hooks/useRestfulApi";
import EditProduct from "./EditProduct";

export default function UserProducts(props) {
  const [error, sendReq] = useRestfulApi();
  const [deleteError, setDeleteError] = useState(null);
  const [editProductFormFlag, setEditProductFormFlag] = useState("");

  function toggleEditProductFormFlag(id) {
    setEditProductFormFlag(id);
  }

  async function deleteProduct(id) {
    try {
      const response = await sendReq( props.currentUser.user.userType === "seller" ? `sellerDonations/deleteDonation/${id}}`:`producerDonations/deleteDonation/${id}`, "DELETE", null, props.currentUser.token);
  
      if (!response.apiStatus) {
        setDeleteError(response.message);
        return;
      }
    } catch (err) {
      setDeleteError(error.message);
    }
  }

  return (
    <>
      <p className="w-2/12">{props.productName}</p>
      <p className="w-2/12">{props.category}</p>
      <p className="w-2/12">{props.year}</p>
      <p className="w-2/12">{props.quantity} kg</p>
      <button
       className="bg-yellow-500 p-2 rounded "
        onClick={() => {
          toggleEditProductFormFlag(props.productId);
        }}
      >
        edit
      </button>
      <button className="bg-red-500 p-2 rounded" onClick={() => deleteProduct(props.productId)}>
        delete
      </button>
      {deleteError && <div>{deleteError}</div>}
      {props.productId === editProductFormFlag ? (
                          <EditProduct
                            setEditFormFlag={setEditProductFormFlag}
                            currentUser={props.currentUser}
                            url={props.currentUser.user.userType === "seller" ? `soldProducts/editSoldProduct/${props.productId}}`:`producedProducts/editProducedProduct/${props.productId}`}
                          />
                        ) : (
                          <></>
                        )}
    </>
   
  )
}
