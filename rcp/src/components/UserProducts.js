
export default function UserProducts(props) {
  return (
    <>
      <p className="w-2/12">{props.productName}</p>
      <p className="w-2/12">{props.category}</p>
      <p className="w-2/12">{props.year}</p>
      <p className="w-2/12">{props.quantity}</p>
      <button
       className="bg-yellow-500 p-2 rounded "
        onClick={() => {
          props.toggleEditProductFormFlag(props.productId);
        }}
      >
        edit
      </button>
      <button className="bg-red-500 p-2 rounded" onClick={() => props.deleteProduct(props.productId)}>
        delete
      </button>
      {props.deleteError && <div>{props.deleteDError}</div>}
    </>
   
  )
}
