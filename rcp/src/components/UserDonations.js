import React from 'react';

export default function UserDonations(props) {
 
  return (
    <>
      <p>{props.charityName}</p>
      <p>{props.quantity}</p>
      <p>{props.productName}</p>
      <button
        onClick={() => props.toggleEditDonationFormFlag(props.donationId)}
      >
        edit
      </button>
      <button onClick={() => {props.deleteDonation(props.donationId)}}>
        delete
      </button>
    </>
  );
}
