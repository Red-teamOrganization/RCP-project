import React, { useState, useEffect } from "react";
import useRestfulApi from "../hooks/useRestfulApi";

import { Card, Title, LineChart } from "@tremor/react";
import { Toggle, ToggleItem } from "@tremor/react";



export default function MarketInsights({agricultureUrl,proteinUrl,diaryUrl,currentUser}) {
   
    const [error,sendReq] = useRestfulApi()
    const [
      agriculturalProducts,
      setAgriculturalProducts,
    ] = useState([]);
    const [proteinProducts, setProteinProducts] = useState([]);
    const [diaryProducts, setDiaryProducts] = useState([]);
    const [itemRendered, setItemRendered] = useState(1);
    const [yearOfProduction, setYearOfProduction] = useState(
      new Date().getFullYear()
    );
    const dataFormatter = (number) =>
      `${Intl.NumberFormat("kg").format(number).toString()}kg`;
  
    function handleYearChange(e) {
      setYearOfProduction(e.target.value);
    }
  
    useEffect(() => {
      async function fetchAllAgriculturalSoldProducts(year) {
        try {
          const response = await sendReq(agricultureUrl, "POST", {location: currentUser.user.location})
          setAgriculturalProducts(response.data[year]);
        } catch (e) {
          console.log(error);
        }
      }
  
      fetchAllAgriculturalSoldProducts(yearOfProduction);
    }, [yearOfProduction]);
  
    useEffect(() => {
      async function fetchAllProteinSoldProducts(year) {
        try {
          const response = await sendReq(proteinUrl, "POST", {location: currentUser.user.location})
          setProteinProducts(response.data[year]);
        } catch (e) {
          console.log(error);
        }
      }
  
      fetchAllProteinSoldProducts(yearOfProduction);
    }, [yearOfProduction]);
  
    useEffect(() => {
      async function fetchAllDiarySoldProducts(year) {
        try {
          const response = await sendReq(diaryUrl, "POST", {location: currentUser.user.location})
          setDiaryProducts(response.data[year]);
        } catch (e) {
          console.log(error);
        }
      }
  
      fetchAllDiarySoldProducts(yearOfProduction);
    }, [yearOfProduction]);
  
    return (
      <div>
        <Toggle
          defaultValue={1}
          handleSelect={(value) => setItemRendered(value)}
          color="green"
        >
          <ToggleItem value={1} text="Agricultural" />
          <ToggleItem value={2} text="Protein" />
          <ToggleItem value={3} text="Diary" />
          <div className="flex items-center">
            <Title className="ml-5" color="emerald">
              filter by year
            </Title>
            <input
              type="number"
              value={yearOfProduction}
              onChange={handleYearChange}
            />
          </div>
        </Toggle>
        {itemRendered === 1 ? (
          <>
            {agriculturalProducts ? (
              <Card
              maxWidth="max-w-7xl"
              decoration="top"
              decorationColor="green"
              >
                <Title>
                  Agriculture  products in ({yearOfProduction}) at{" "}
                  {currentUser.user.location}
                </Title>
                <LineChart
                  data={agriculturalProducts}
                  dataKey="productName"
                  categories={["quantity"]}
                  valueFormatter={dataFormatter}
                  colors={["green"]}
                  marginTop="mt-6"
                  yAxisWidth="w-10"
                />
              </Card>
            ) : (
              <div
              className="p-4 my-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
              role="alert"
            >
              {" "}
                no entered agricultural  products for {
                  yearOfProduction
                }{" "}
                at {currentUser.user.location}
            </div>
            )}
          </>
        ) : itemRendered === 2 ? (
          <>
            {proteinProducts ? (
              <Card
              maxWidth="max-w-7xl"
              decoration="top"
              decorationColor="red"
              >
                <Title>
                  Protein  products in ({yearOfProduction}) at{" "}
                  {currentUser.user.location}
                </Title>
                <LineChart
                  data={proteinProducts}
                  dataKey="productName"
                  categories={["quantity"]}
                  valueFormatter={dataFormatter}
                  colors={["red"]}
                  marginTop="mt-6"
                  yAxisWidth="w-10"
                />
              </Card>
            ) : (
              <div
              className="p-4 my-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
              role="alert"
            >
               {" "}
                no entered protein  products for {
                  yearOfProduction
                } at {currentUser.user.location}
            </div>
            )}
          </>
        ) : (
          <>
            {diaryProducts ? (
              <Card
              maxWidth="max-w-7xl"
              decoration="top"
              decorationColor="blue"
              >
                <Title>
                  Diary  products in ({yearOfProduction}) at{" "}
                  {currentUser.user.location}
                </Title>
                <LineChart
                  data={diaryProducts}
                  dataKey="productName"
                  categories={["quantity"]}
                  valueFormatter={dataFormatter}
                  colors={["cyan"]}
                  marginTop="mt-6"
                  yAxisWidth="w-10"
                />
              </Card>
            ) : (
              <div
              className="p-4 my-4 mx-auto  text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
              role="alert"
            >
              {" "}
                no entered diary  products for {yearOfProduction} at{" "}
                {currentUser.user.location}
            </div>
            )}
          </>
        )}
      </div>
    );
  }
  