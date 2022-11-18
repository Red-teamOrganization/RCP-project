import React from 'react';

export default function UserDonations(props) {
 
  return (
    <>
      <p className="w-2/12">{props.charityName}</p>
      <p className="w-2/12">{props.quantity} kg</p>
      <p className="w-2/12">{props.productName}</p>
      <button
        className="bg-yellow-500 p-2 rounded "
        onClick={() => props.toggleEditDonationFormFlag(props.donationId)}
      >
        edit
      </button>
      <button
           className="bg-red-500 p-2 rounded" 
       onClick={() => {props.deleteDonation(props.donationId)}}>
        delete
      </button>
    </>
  );
}
