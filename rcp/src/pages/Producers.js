import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Products from "../components/Products";
import "./producer.css";
import Monitor from "../components/Monitor";

function Producers({name}) {
  const [proProducts, setProProducts] = useState({
    TOMATOES: 0,
    POTATOES: 0,
    APPLES: 0,
  });
  const [sumProProducts, setSumProProducts] = useState({
    TOMATOES: 0,
    POTATOES: 0,
    APPLES: 0,
  });
  const [sumConProducts, setSumConProducts] = useState({
    TOMATOES: 0,
    POTATOES: 0,
    APPLES: 0,
  });
  const [userProducts, setUserProducts] = useState({});

  useEffect(() => {
    async function getProduction() {
      const data = await getDocs(collection(db, "producers"));
      const result = data.docs.map((doc) => doc.data());
      const obj = {};

      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (obj[key]) {
            obj[key] += result[i][key];
          } else {
            obj[key] = result[i][key];
          }
        }
      }

      setSumProProducts({ ...obj });
    }
    async function getConsumption() {
      const data = await getDocs(collection(db, "consumers"));
      const obj = {};
      const result = data.docs.map((doc) => doc.data());
      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (obj[key]) {
            obj[key] += result[i][key];
          } else {
            obj[key] = result[i][key];
          }
        }
      }
      setSumConProducts({ ...obj });
    }

    const unsub = onSnapshot(
      doc(db, "producers", auth.currentUser.uid),
      (doc) => {
        setUserProducts({ ...doc.data() });
      }
    );

    getProduction();
    getConsumption();
    return () => unsub();
  }, []);

  async function handleChange(e) {
    setProProducts({ ...proProducts, [e.target.name]: e.target.value  });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await setDoc(doc(db, "producers", auth.currentUser.uid), {
      ...proProducts,
    });
    setProProducts({
      TOMATOES: 0,
      POTATOES: 0,
      APPLES: 0,
    });
  }

  const product = Object.keys(proProducts).map((product, i) => {
    return (
      <Products
        key={i}
        name={product}
        quantity={proProducts[product]}
        handleChange={handleChange}
        totalProduction={sumProProducts[product]}
        totalConsumption={sumConProducts[product]}
      />
    );
  });
  return (
    <>
      <div className="producerCONPage">
        <h1 className="producerCONHeader">PRODUCER page</h1>
        <form onSubmit={handleSubmit}>
          {product}

          <button className="submit-button">Submit</button>
        </form>
          <div>
          <h4>Your Products this Month</h4>
          <Monitor userProducts={userProducts} yearly={false}/>
          <h4>Total Production per Year</h4>
          <Monitor userProducts={sumProProducts} yearly={true}/>
          <h4>Total Consumption per Year</h4>
          <Monitor userProducts={sumConProducts} yearly={true}/>

        </div>
      </div>
    </>
  );
}

export default Producers;
