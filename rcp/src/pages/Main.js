import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import Producers from "./Producers";
import Consumers from "./Consumers";

function Main() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      const user = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUser({ ...user.data() });
    }
    getUser();
  }, []);

  return <div>{user.isProducer ? <Producers name={user.name}/> : <Consumers name={user.name}/>}</div>;
}

export default Main;
