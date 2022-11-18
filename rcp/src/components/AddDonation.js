import  ReactDOM from 'react-dom';
import "./AddDonation.css"
export default function AddDonation(props) {
  return ReactDOM.createPortal((
    <div className="addDonationFormWrapper">
   
    <form className='addDonationForm flex flex-col' onSubmit={props.handleAddDonationSubmit}>
    <div className=' cursor-pointer exitDonationFormButton' onClick={()=>props.handleCloseAddDonationForm()}>X</div>
    <input
      type="text"
      className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
      placeholder="product name"
    
      onChange={props.handleAddDonationChange}
      name="productName"
      id="productName"
    />
    <input
      type="number"
      placeholder="product quantity in kg"
      className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
   
      onChange={props.handleAddDonationChange}
      name="quantity"
      id="quantity"
    />
    <select
     className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
      onChange={props.handleAddDonationChange}
      name="category"
      id="category"
     
    >
      <option>category of product</option>
      <option value="agriculture">agriculture</option>
      <option value="protein">protein</option>
      <option value="diary">diary</option>
    </select>
    <select
      className='rounded  border-gray-300 placeholder-gray-900  rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text coolFont mb-2 '
     
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
    <button  className="bg-blue-900 p-2 rounded text-white coolFont" >send donation</button>
    {props.addDonationError && <div className='bg-red-500 p-2 rounded text-center text-white coolFont mt-2'>{props.addDonationError}</div>}
  </form>
  </div>
  ),document.body)

}
