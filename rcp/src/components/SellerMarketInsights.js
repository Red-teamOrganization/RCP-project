import React, { useState , useEffect  } from 'react'
import getHostName from '../utility/getHostName';
import useRestfulApi from '../hooks/useRestfulApi';

import { Card, Title, LineChart } from "@tremor/react";
import { Toggle, ToggleItem } from "@tremor/react";


export default function SellerMarketInsights() {
  const seller = JSON.parse(localStorage.getItem('user'))

  const hostName = getHostName();
  const[error,sendReq] = useRestfulApi();

  const[agriculturalSoldProducts , setAgriculturalSoldProducts] = useState([])
  const[proteinSoldProducts , setProteinSoldProducts] = useState([])
  const[diarySoldProducts,setDiarySoldProducts] = useState([])
  const [itemRendered , setItemRendered] = useState(1)
  const [yearOfSold,setYearOfSold] = useState(new Date().getFullYear())
  const dataFormatter = (number) =>
  `${Intl.NumberFormat("kg").format(number).toString()}kg`;


function handleYearChange(e){
 setYearOfSold(e.target.value)
}

useEffect(()=>{
    async function fetchAllAgriculturalSoldProducts(year){
        try{
            const response = await sendReq(`${hostName}soldProducts/allSellerAgricultureProductsByLocation`, "POST", {location: seller.user.location})
            setAgriculturalSoldProducts(response.data[year])
         
        }
        catch(e){
          console.log(error)
        }
    }
  
   fetchAllAgriculturalSoldProducts(yearOfSold)
   
},[yearOfSold])

useEffect(()=>{
  async function fetchAllProteinSoldProducts(year){
      try{
          const response = await sendReq(`${hostName}soldProducts/allSellerProteinProductsByLocation`, "POST", {location: seller.user.location})
          setProteinSoldProducts(response.data[year])
      }
      catch(e){
        console.log(error)
      }
  }

 fetchAllProteinSoldProducts(yearOfSold)
 
},[yearOfSold])

useEffect(()=>{
  async function fetchAllDiarySoldProducts(year){
      try{
          const response = await sendReq(`${hostName}soldProducts/allSellerDiaryProductsByLocation`, "POST", {location: seller.user.location})
          setDiarySoldProducts(response.data[year])
       
      }
      catch(e){
        console.log(error)
      }
  }

 fetchAllDiarySoldProducts(yearOfSold)
 
},[yearOfSold])

return (
    <div>
    
    <Toggle defaultValue={1} handleSelect={(value) => setItemRendered(value)}  color="green">
      <ToggleItem value={1} text="Agricultural"  />
      <ToggleItem value={2} text="Protein"  />
      <ToggleItem value={3} text="Diary"  />
      <div className="flex items-center">
          <Title className="ml-5" color="emerald">filter by year</Title>
          <input type="number" value={yearOfSold} onChange={handleYearChange}/>
        </div>
    </Toggle>
    {
      itemRendered === 1 ? <>
        {agriculturalSoldProducts ?
        <Card
        maxWidth="max-w-7xl"
        decoration="top"
        decorationColor="green"
        >
        <Title>Agriculture sold products in ({yearOfSold}) at {seller.user.location}</Title>
        <LineChart
          data={agriculturalSoldProducts}
          dataKey="productName"
          categories={["quantity"]}
          valueFormatter={dataFormatter}  
          colors={["green"]}
          marginTop="mt-6"         
          yAxisWidth="w-10"
        />
        </Card>
        :  <div
        className="p-4 my-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
        role="alert"
      >
        no entered agricultural sold products for {yearOfSold} at {seller.user.location}
      </div>
       
        }
      </>:
      itemRendered === 2 ? <>
        {proteinSoldProducts ?
        <Card
        maxWidth="max-w-7xl"
            decoration="top"
            decorationColor="red"
        >
        <Title>Protein sold products in ({yearOfSold}) at {seller.user.location}</Title>
        <LineChart
          data={proteinSoldProducts}
          dataKey="productName"
          categories={["quantity"]}
          valueFormatter={dataFormatter}  
          colors={["red"]}
          marginTop="mt-6"         
          yAxisWidth="w-10"
        />
        </Card>
        : <div
        className="p-4 my-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
        role="alert"
      >
        no entered protein sold products for {yearOfSold} at {seller.user.location}
      </div>
        }
      </> :
       <>
        {diarySoldProducts ?
        <Card
        maxWidth="max-w-7xl"
        decoration="top"
        decorationColor="blue"
        >
        <Title>Diary sold products in ({yearOfSold}) at {seller.user.location}</Title>
        <LineChart
          data={diarySoldProducts}
          dataKey="productName"
          categories={["quantity"]}
          valueFormatter={dataFormatter}  
          colors={["cyan"]}
          marginTop="mt-6"         
          yAxisWidth="w-10"
        />
        </Card>
        : <div
        className="p-4 my-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
        role="alert"
      >
        no entered diary sold products for {yearOfSold} at {seller.user.location}
      </div>
        }
       </>
    }
  </div>
  )
}
