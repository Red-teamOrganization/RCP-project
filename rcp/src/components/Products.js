import React from 'react'

function Products({name, quantity, handleChange, totalConsumption, totalProduction}) {
  const availability = totalProduction >= totalConsumption
  return (
    <div> 
        <h3>{name}</h3>
        <p>Enter the amount of {name.toLowerCase()} you need per month</p>
        <form >
            
                <input type="number" name={name} id={name} value={quantity} onChange={handleChange} placeholder="0" />
                <label htmlFor={name}>kg</label>
            
            </form> 
            {availability?<h5>"The product is available"</h5>:<h5>"The product is not available"</h5>}
        </div>
  )
}

export default Products