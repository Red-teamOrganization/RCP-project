

export default function AddDonation(props) {
  return (
    <>
    <form onSubmit={props.handleAddDonationSubmit}>
    <input
      type="text"
      placeholder="enter product name"
      value={props.addDonation.productName}
      onChange={props.handleAddDonationChange}
      name="productName"
      id="productName"
    />
    <input
      type="number"
      placeholder="enter product quantity"
      value={props.addDonation.quantity}
      onChange={props.handleAddDonationChange}
      name="quantity"
      id="quantity"
    />
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={props.handleAddDonationChange}
      name="category"
      id="category"
      value={props.addDonation.category}
    >
      <option>category of product</option>
      <option value="agriculture">agriculture</option>
      <option value="protein">protein</option>
      <option value="diary">diary</option>
    </select>
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={props.addDonation.charityName}
      onChange={props.handleAddDonationChange}
      name="charityName"
      id="charityName"
    >
      <option>Charity Name</option>
      {props.charities.map((charity) => {
        return (
          <option value={charity.name} key={charity._id}>
            {charity.name}
          </option>
        );
      })}
    </select>
    <button>send donation</button>
  </form>
  {props.addDonationError && <div>{props.addDonationError}</div>}
  </>
  )
}
