

export default function UserProducts(props) {
  return (
    <>
      <p>{props.productName}</p>
      <p>{props.category}</p>
      <p>{props.year}</p>
      <p>{props.quantity}</p>
      <button
        onClick={() => {
          props.toggleEditProductFormFlag(props.productId);
        }}
      >
        edit
      </button>
      <button onClick={() => props.deleteProduct(props.productId)}>
        delete
      </button>
      {props.deleteError && <div>{props.deleteDError}</div>}
    </>
   
  )
}
