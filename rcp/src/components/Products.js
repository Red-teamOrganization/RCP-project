import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

function Products({name, quantity, handleChange, totalConsumption, totalProduction}) {
  const availability = totalProduction >= totalConsumption
  const market = totalProduction-totalConsumption > 0
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      const user = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUser({ ...user.data() });
    }
    getUser();
  }, []);

  console.log(availability, totalConsumption,totalProduction)
  return (
    <div> 
        <h3>{name}</h3>
        <p>Enter the amount of {name.toLowerCase()} you need per month</p>
        <form >
            
                <input type="number" name={name} id={name} value={quantity} onChange={handleChange} placeholder="0" />
                <label htmlFor={name}>kg</label>
            
            </form> 
            {user.isProducer? market?<h5>Market do not need that product</h5>: <h5>Market needs that product</h5> : availability?<h5>"The product is available"</h5>:<h5>"The product is not available"</h5>}
        </div>
  )
}

export default Products