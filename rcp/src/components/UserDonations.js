import React, { useState } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

import { toast } from "react-toastify";
import EditDonation from "./EditDonation";

export default function UserDonations({donation,currentUser}) {
  const [error, sendReq] = useRestfulApi();
  const [editDonationFormFlag, setEditDonationFormFlag] = useState("");
  const [loading , setLoading] = useState(false)

  function toggleEditDonationFormFlag(id) {
    setEditDonationFormFlag(id);
  }

  async function deleteDonation(id) {
    try {
      setLoading(true);
      let response = await sendReq(
        currentUser.user.userType === "seller"
          ? `sellerDonations/deleteDonation/${id}}`
          : `producerDonations/deleteDonation/${id}`,
        "DELETE",
        null,
        currentUser.token
      );
      setLoading(false)
      if (!response.apiStatus) {
        toast.error(response.message);
        return;
      }
      toast.info("your donation has been removed");
    } catch (err) {
      toast.error(error);
      setLoading(false)
    }
  }

  return (
    <>
      <p className="w-2/12">{donation.charityName}</p>
      <p className="w-2/12">{donation.quantity} kg</p>
      <p className="w-2/12">{donation.productName}</p>
      {loading ? <button className="bg-gray-500 p-2 rounded">deleting...</button> :
      <>
        <button
        className="bg-yellow-500 p-2 rounded "
        onClick={() => toggleEditDonationFormFlag(donation._id)}
      >
        edit
      </button>
      <button
        className="bg-red-500 p-2 rounded"
        onClick={() => {
          deleteDonation(donation._id);
        }}
      >
        delete
      </button>
      {donation._id === editDonationFormFlag ? (
        <EditDonation
          currentUser={currentUser}
          setEditDonationFormFlag={setEditDonationFormFlag}
          url={
            currentUser.user.userType === "seller"
              ? `sellerDonations/editDonation/${donation._id}}`
              : `producerDonations/editDonation/${donation._id}`
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
