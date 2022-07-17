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

    const unsub = onSnapshot(doc(db, "producers", auth.currentUser.uid),(doc) => {setUserProducts({ ...doc.data() })});

    getProduction();
    getConsumption();
    return () => unsub();
  }, []);

  async function handleChange(e) {
    setProProducts({ ...proProducts, [e.target.name]: e.target.value });
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
       <div className="producerCONHeader">
       <i className="fa-solid fa-hat-cowboy text-xl"></i>
       <h1>Welcome {name}!!!</h1>
        <p>You have login as a producer.</p>
       </div>
        <form onSubmit={handleSubmit} className="form-pro">
          {product}
            <button className="submit-button">Submit</button>
        </form>
          <div className="monitors">
            <div className="monitor"> 
                <h4 className="tableHeaders">Your Products this Month</h4>
          <Monitor userProducts={userProducts} yearly={false}/>
          </div>
            <div className="monitor">  <h4 className="tableHeaders">Total Production of Market Yearly</h4>
          <Monitor userProducts={sumProProducts} yearly={true}/></div>
            <div className="monitor"> <h4 className="tableHeaders">Total Consumption of Market Yearly</h4>
          <Monitor userProducts={sumConProducts} yearly={true}/> </div>
       
      
        </div>
      </div>
    </>
  );
}

export default Producers;
