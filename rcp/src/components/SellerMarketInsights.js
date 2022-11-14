import React, { useState , useEffect  } from 'react'
import { Card, Title, LineChart } from "@tremor/react";
import { Toggle, ToggleItem } from "@tremor/react";
import {
  CheckIcon,
  CollectionIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/outline";

export default function SellerMarketInsights() {
  const seller = JSON.parse(localStorage.getItem('user'))
  const[agriculturalSoldProducts , setAgriculturalSoldProducts] = useState([])
  const[proteinSoldProducts , setProteinSoldProducts] = useState([])
  const[diarySoldProducts,setDiarySoldProducts] = useState([])
  const [itemRendered , setItemRenderd] = useState(1)
  const [yearOfSold,setYearOfSold] = useState(new Date().getFullYear())
  const dataFormatter = (number) =>
  `${Intl.NumberFormat("kg").format(number).toString()}kg`;


function handleYearChange(e){
 setYearOfSold(e.target.value)
}

useEffect(()=>{
    async function fetchAllAgriculturalSoldProducts(year){
        try{
            let response = await fetch("http://localhost:3000/soldProducts/allSellerAgricultureProductsByLocation",{
                method:"POST",
                body: JSON.stringify({location:seller.user.location}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
            })
            let json = await response.json()
            
            setAgriculturalSoldProducts(json.data[year])
         
        }
        catch(e){
          console.log(e)
        }
    }
  
   fetchAllAgriculturalSoldProducts(yearOfSold)
   
},[yearOfSold])

useEffect(()=>{
  async function fetchAllProteinSoldProducts(year){
      try{
          let response = await fetch("http://localhost:3000/soldProducts/allSellerProteinProductsByLocation",{
              method:"POST",
              body: JSON.stringify({location:seller.user.location}),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
          })
          let json = await response.json()
          
          setProteinSoldProducts(json.data[year])
       
      }
      catch(e){
        console.log(e)
      }
  }

 fetchAllProteinSoldProducts(yearOfSold)
 
},[yearOfSold])

useEffect(()=>{
  async function fetchAllDiarySoldProducts(year){
      try{
          let response = await fetch("http://localhost:3000/soldProducts/allSellerDiaryProductsByLocation",{
              method:"POST",
              body: JSON.stringify({location:seller.user.location}),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
          })
          let json = await response.json()
          
          setDiarySoldProducts(json.data[year])
       
      }
      catch(e){
        console.log(e)
      }
  }

 fetchAllDiarySoldProducts(yearOfSold)
 
},[yearOfSold])

return (
    <div>
      <h1>market insights</h1>
  
      <input type="number" value={yearOfSold} onChange={handleYearChange}/>
  
    <Toggle defaultValue={1} handleSelect={(value) => setItemRenderd(value)}  color="green">
      <ToggleItem value={1} text="Agricultural"  icon={CollectionIcon} />
      <ToggleItem value={2} text="Protein" icon={CheckIcon} />
      <ToggleItem value={3} text="Diary" icon={ReceiptRefundIcon} />
    </Toggle>
    {
      itemRendered === 1 ? <>
        {agriculturalSoldProducts ?
        <Card>
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
        : <Title> no entered agricultural sold products for {yearOfSold} at {seller.user.location}</Title>
        }
      </>:
      itemRendered === 2 ? <>
        {proteinSoldProducts ?
        <Card>
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
        : <Title> no entered protein sold products for {yearOfSold} at {seller.user.location}</Title>
        }
      </> :
       <>
        {diarySoldProducts ?
        <Card>
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
        : <Title> no entered diary sold products for {yearOfSold} at {seller.user.location}</Title>
        }
       </>
    }
  </div>
  )
}
