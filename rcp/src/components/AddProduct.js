import  ReactDOM from 'react-dom';
import "./AddProduct.css";

export default function AddProduct(props) {
    return ReactDOM.createPortal((
        <div className="addProductFormWrapper">
        <form onSubmit={props.handleAddProductSubmit} className="addProductForm flex flex-col">
        <div className=' cursor-pointer exitFormButton' onClick={()=>props.handleCloseAddProductForm()}>X</div>
        <input
          type="text"
          className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          placeholder="product name"
          onChange={props.handleAddProductChange}
          name="productName"
          id="productName"
        />
        <input
          type="number"
          className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          placeholder="quantity in kg"
          onChange={props.handleAddProductChange}
          name="quantity"
          id="quantity"
        />
      <input
          type="number"
          placeholder={props.userType === "producer" ? "year of production" : "year of sold"}
          className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          
          onChange={props.handleAddProductChange}
          name={props.userType === "producer" ? "yearOfProduction" : "yearOfSold"}
          id="year"
        />
        <select
         className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
          onChange={props.handleAddProductChange}
          name="category"
          id="category"
          value={props.addProduct.category}
        >
          <option className='text-gray-900'>category of product</option>
          <option value="agriculture">agriculture</option>
          <option value="protein">protein</option>
          <option value="diary">diary</option>
        </select>
        <button  className="bg-blue-900 p-2 rounded text-white coolFont">add product</button>
        {props.error && <div className='bg-red-500 p-2 rounded text-center text-white coolFont mt-2'>{props.error}</div>}
      </form>
      </div>),
      document.body
      )
}
