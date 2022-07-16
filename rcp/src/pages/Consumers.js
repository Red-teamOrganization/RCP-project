import React, { useState, useEffect } from "react";
import { collection,getDocs, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Products from "../components/Products";

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
  
console.log(sumConProducts , sumProProducts)
  useEffect(() => {
    async function getProduction() {
      const data = await getDocs(collection(db, "producers"));
      
      const obj = {};
      const result = data.docs.map((doc)=>doc.data())
      console.log(result)
      result.forEach((doc) => {
        return Object.keys(doc).forEach((key) => {
          return obj.key ? (obj.key += doc.key) : doc.key;
        });
      });
      setSumProProducts({ ...obj });
    }
    async function getConsumption() {
      const data = await getDocs(collection(db, "consumers"));
      const obj = {};
      const result = data.docs.map((doc)=>doc.data())
      result.forEach((doc) => {
        return Object.keys(doc).forEach((key) => {
          return obj.key ? (obj.key += doc.key) : doc.key;
        });
      });
      setSumConProducts({ ...obj });
    }
    getProduction();
    getConsumption();
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
        totalProduction={sumProProducts.product}
        totalConsumption={sumConProducts.product}
      />
    );
  });
  return (
    <div>
      {product}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Consumers;
