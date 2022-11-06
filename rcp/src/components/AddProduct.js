export default function AddProduct(props) {
    return (
        <>
        <form onSubmit={props.handleAddProductSubmit}>
        <input
          type="text"
          placeholder="enter product name"
          value={props.addProduct.productName}
          onChange={props.handleAddProductChange}
          name="productName"
          id="productName"
        />
        <input
          type="number"
          placeholder="enter product quantity"
          value={props.addProduct.quantity}
          onChange={props.handleAddProductChange}
          name="quantity"
          id="quantity"
        />
      <input
          type="number"
          placeholder="enter product quantity"
          value={props.userType === "producer" ? props.addProduct.yearOfProduction : props.addProduct.yearOfSold}
          onChange={props.handleAddProductChange}
          name={props.userType === "producer" ? "yearOfProduction" : "yearOfSold"}
          id="year"
        />
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={props.handleAddProductChange}
          name="category"
          id="category"
          value={props.addProduct.category}
        >
          <option>category of product</option>
          <option value="agriculture">agriculture</option>
          <option value="protein">protein</option>
          <option value="diary">diary</option>
        </select>
        <button>add product</button>
      </form>
      {props.error && <div>{props.error}</div>}
      </>
      )
}
