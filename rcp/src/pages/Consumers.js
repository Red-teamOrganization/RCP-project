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

import Monitor from "../components/Monitor";

import "./producer.css";

function Consumers({ name }) {
  const [conProducts, setConProducts] = useState({
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
  const [availableProducts, setAvailableProducts] = useState({});
  console.log(availableProducts);
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
      doc(db, "consumers", auth.currentUser.uid),
      (doc) => {
        setUserProducts({ ...doc.data() });
      }
    );

    getConsumption();
    getProduction();

    return () => unsub();
  }, []);
  useEffect(() => {
    function getAvailableProducts() {
      for (let key in sumProProducts) {
        setAvailableProducts((current) => ({
          ...current,
          [key]:
            sumProProducts[key] - sumConProducts[key] < 0
              ? 0
              : sumProProducts[key] - sumConProducts[key],
        }));
      }
    }
    getAvailableProducts();
  }, [sumProProducts]);

  async function handleChange(e) {
    setConProducts({ ...conProducts, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await setDoc(doc(db, "consumers", auth.currentUser.uid), {
      ...conProducts,
    });
    setConProducts({
      TOMATOES: 0,
      POTATOES: 0,
      APPLES: 0,
    });
  }

  const product = Object.keys(conProducts).map((product, i) => {
    return (
      <Products
        key={i}
        name={product}
        quantity={conProducts[product]}
        handleChange={handleChange}
        totalProduction={sumProProducts[product]}
        totalConsumption={sumConProducts[product]}
      />
    );
  });
  return (
    <>
      <div className="producerCONPage">
        <div className="producerCONHeader">
         <i class="fa-solid fa-person text-xl"></i>
          <h1>Welcome {name}!!!</h1>
          <p>You have login as a consumer</p>
        </div>
        <div className="form-con">
          {product}
          <button onClick={handleSubmit} className="submit-button-con">
            Submit
          </button>
        </div>
        <div className="monitors">
          <div className="monitor">
          <h4 className="tableHeaders">Your Consumption this Month</h4>
          <Monitor userProducts={userProducts} yearly={false}/>
          </div>
          <div className="monitor">
          <h4 className="tableHeaders">Your Consumption this Year</h4>
          <Monitor userProducts={userProducts} yearly={true} />
          </div>
          <div className="monitor">
          <h4 className="tableHeaders">Available Products in Market</h4>
          <Monitor userProducts={availableProducts} yearly={false}/>

          </div>
        </div>
      </div>
    </>
  );
}

export default Consumers;
