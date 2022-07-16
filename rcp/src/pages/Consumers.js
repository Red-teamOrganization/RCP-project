import React, { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Products from "../components/Products";
import Footer from '../components/Footer';
import Monitor from "../components/Monitor";

import "./producer.css";


function Consumers() {
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
  const [userProducts, setUserProducts] = useState({})

  useEffect(() => {
    async function getProduction() {
      const data = await getDocs(collection(db, "producers"));
      const result = data.docs.map((doc) => doc.data())
      const obj = {};

      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (obj[key]) {
            obj[key] += result[i][key]
          } else {
            obj[key] = result[i][key]
          }
        }
      }

      setSumProProducts({ ...obj });
    }
    async function getConsumption() {
      const data = await getDocs(collection(db, "consumers"));
      const obj = {};
      const result = data.docs.map((doc) => doc.data())
      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          if (obj[key]) {
            obj[key] += result[i][key]
          } else {
            obj[key] = result[i][key]
          }
        }
      }
      setSumConProducts({ ...obj });
    }
    async function getUserProducts() {
      const data = await getDoc(doc(db, "consumers", auth.currentUser.uid))
      setUserProducts({ ...data.data() })
    }

    getProduction();
    getConsumption();
    getUserProducts();
  }, []);

  async function handleChange(e) {
    setConProducts({ ...conProducts, [e.target.name]: e.target.value * 12 });
  }
  async function handleSubmit() {
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
        quantity={conProducts.product}
        handleChange={handleChange}
        totalProduction={sumProProducts[product]}
        totalConsumption={sumConProducts[product]}
      />
    );
  });
  return (
    <>
    <div className="producerCONPage">
      <h1 className="producerCONHeader">CONSUMER page</h1>

      {product}
      <div>


        <button onClick={handleSubmit}
          className="submit-button">Submit</button>

      </div>
      <br />
      <div>
        <Monitor userProducts={userProducts} />
      </div>
    </div>
      <Footer classPosition="footer"/>
    </>
  );
}

export default Consumers;
