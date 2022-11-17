
export default function EditProduct(props) {
  return (
    <>
    <form 
    className="w-4/12 mx-auto flex flex-col"
    onSubmit={(e)=>{
      props.handleEditSubmit(e,props.productId)
      }}>
    <input
      type="text"
      className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
      placeholder="product name"
      value={props.editedProduct.productName}
      onChange={props.handleEditProductChange}
      name="productName"
      id="productName"
    />
    <input
      type="number"
      placeholder="quantity in kg"
      onChange={props.handleEditProductChange}
      name="quantity"
      id="quantity"
      className="block rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
    />
  <input
      type="number"
      placeholder={props.userType === "producer" ? "year of production" : "year of sold"}
      onChange={props.handleEditProductChange}
      name={props.userType === "producer" ? "yearOfProduction" : "yearOfSold"}
      id="year"
      className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
    />
    <select
      className="rounded mb-1 border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text"
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
    <button className="bg-blue-900 p-2 rounded text-white">save edit</button>
    <div className="text-gray-600 cursor-pointer" onClick={() => props.setEditFormFlag("")}>discard edit</div>
  </form>
 
  </>
  )
}
