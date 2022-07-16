import React from 'react'

function Products({name, quantity, handleChange}) {
  return (
    <div> 
        <h3>{name}</h3>
        <p>Enter the amount of {name.toLowerCase()} you need per month</p>
        <form >
            
                <input type="number" name={name} id={name} value={quantity} onChange={handleChange} placeholder="0" />
                <label htmlFor={name}>kg</label>
            
            </form> 
        </div>
  )
}

export default Products