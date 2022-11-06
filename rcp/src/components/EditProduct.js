
export default function EditProduct(props) {
  return (
    <>
    <form onSubmit={(e)=>{
      props.handleEditSubmit(e,props.productId)
      }}>
    <input
      type="text"
      placeholder="enter product name"
      value={props.editedProduct.productName}
      onChange={props.handleEditProductChange}
      name="productName"
      id="productName"
    />
    <input
      type="number"
      placeholder="enter product quantity"
      value={props.editedProduct.quantity}
      onChange={props.handleEditProductChange}
      name="quantity"
      id="quantity"
    />
  <input
      type="number"
      placeholder="enter product quantity"
      value={props.userType === "producer" ? props.editedProduct.yearOfProduction : props.editedProduct.yearOfSold}
      onChange={props.handleEditProductChange}
      name={props.userType === "producer" ? "yearOfProduction" : "yearOfSold"}
      id="year"
    />
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={props.handleEditProductChange}
      name="category"
      id="category"
      value={props.editedProduct.category}
    >
      <option>category of product</option>
      <option value="agriculture">agriculture</option>
      <option value="protein">protein</option>
      <option value="diary">diary</option>
    </select>
    <button>edit product</button>
  </form>
  <span onClick={() => props.setEditFormFlag("")}>cancel</span>
  </>
  )
}
