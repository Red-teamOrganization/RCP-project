import React, { useState, useEffect } from "react";
import { getDoc ,setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Products from "../components/Products";

function Consumers() {
  const [conProducts, setConProducts] = useState({
    TOMATOES: 0,
    POTATOES: 0,
    APPLES: 0,
  });
  const [proProducts, setProProducts] = useState({
    TOMATOES: 0,
    POTATOES: 0,
    APPLES: 0,
  });

  useEffect(()=>{
      async function getProduction(){
        
        const data = await getDoc(doc(db,"producers"))
        console.log(data.docs)
      }
  },[])

  async function handleChange(e){
    setConProducts({...conProducts,[e.target.name]:(e.target.value*12)});
    

  }
  async function handleSubmit(){
    await setDoc(doc(db,"consumers",auth.currentUser.uid),{...conProducts});
    setConProducts({
      TOMATOES: 0,
      POTATOES: 0,
      APPLES: 0,
    });

  };

  const product = Object.keys(conProducts).map((product,i)=>{return <Products key={i} name={product} quantity={conProducts.product} handleChange={handleChange} />})
  return <div>
    {product}
    <div><button onClick={handleSubmit}>Submit</button></div>
  </div>;
}

export default Consumers;
