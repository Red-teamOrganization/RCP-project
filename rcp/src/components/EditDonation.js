export default function EditDonation(props) {
  return (
    <form
     className="w-5/12 mx-auto flex flex-col"
      onSubmit={(e) => {
        props.editDonationSubmit(e, props.donationId);
      }}
    >
      <input
        type="text"
        className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
        placeholder="product name"
        onChange={props.handleEditDonationChange}
        name="productName"
        id="productNameEdit"
      />
      <input
        type="number"
        className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
        placeholder="product quantity"
        onChange={props.handleEditDonationChange}
        name="quantity"
        id="quantityEdit"
      />
      <select
     className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text "
        onChange={props.handleEditDonationChange}
        name="category"
        id="categoryEdit"
      >
        <option>category of product</option>
        <option value="agriculture">agriculture</option>
        <option value="protein">protein</option>
        <option value="diary">diary</option>
      </select>
      <button className="bg-blue-900 p-2 rounded text-white">save edit</button>
      <div className="text-gray-600 cursor-pointer" onClick={() => props.setEditDonationFormFlag("")}>discard edit</div>
    </form>
  );
}
