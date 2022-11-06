export default function EditDonation(props) {
  return (
    <form
      onSubmit={(e) => {
        props.editDonationSubmit(e, props.donationId);
      }}
    >
      <input
        type="text"
        placeholder="enter product name"
        value={props.editedDonation.productName}
        onChange={props.handleEditDonationChange}
        name="productName"
        id="productNameEdit"
      />
      <input
        type="number"
        placeholder="enter product quantity"
        value={props.editedDonation.quantity}
        onChange={props.handleEditDonationChange}
        name="quantity"
        id="quantityEdit"
      />
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={props.handleEditDonationChange}
        name="category"
        id="categoryEdit"
        value={props.editedDonation.category}
      >
        <option>category of product</option>
        <option value="agriculture">agriculture</option>
        <option value="protein">protein</option>
        <option value="diary">diary</option>
      </select>
      <button>edit donation</button>
      <span onClick={() => props.setEditDonationFormFlag("")}>cancel</span>
    </form>
  );
}
