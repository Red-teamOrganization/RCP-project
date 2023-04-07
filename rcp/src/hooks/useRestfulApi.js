import { useState} from "react";
import getHostName from "../utility/getHostName"

const hostName = getHostName();
//localhost3000/
const useRestfulApi = () => {
  const [error, setError] = useState(null);
 async function sendReq(url,method,body,authorization = null){
 
    try {
      let response = await fetch(`${hostName}${url}`, { 
        method : method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
           Authorization: authorization ? `bearer ${authorization}` : null,
        },
      })

     let data = await response.json();

     return data
    } catch (error) {
      setError(error)
    }
 }

 return [error,sendReq]
}

export default useRestfulApi;