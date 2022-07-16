import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import "../pages/producer.css";
function Products({
  name,
  quantity,
  handleChange,
  totalConsumption,
  totalProduction,
}) {
  const availability = totalProduction >= totalConsumption;
  const market = totalProduction - totalConsumption > 0;
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      const user = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUser({ ...user.data() });
    }
    getUser();
  }, []);

  console.log(availability, totalConsumption, totalProduction);
  return (
    <>
      <h3 className="productName">{name}</h3>
      <p className="labels">
        Enter the amount of {name.toLowerCase()} you{" "}
        {user.isProducer ? "produce" : "need"} per month
      </p>
      <form className="producerCONForm">
        <input
          type="number"
          name={name}
          id={name}
          value={quantity}
          onChange={handleChange}
          placeholder="0"
          className="inputProducer"
        />
        <label className="weight" htmlFor={name}>kg</label>
      </form>
      {user.isProducer ? (
        market ? (
          <h5 className="producerMessage">Market do not need that product</h5>
        ) : (
          <h5 className="producerMessage">Market needs that product</h5>
        )
      ) : availability ? (
        <h5 className="consumerMessage">"The product is available"</h5>
      ) : (
        <h5 className="consumerMessage" >"The product is not available"</h5>
      )}
    </>
  );
}

export default Products;
