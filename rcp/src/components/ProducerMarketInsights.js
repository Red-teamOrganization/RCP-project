import React, { useState, useEffect } from "react";
import { Card, Title, LineChart } from "@tremor/react";
import { Toggle, ToggleItem } from "@tremor/react";

export default function ProducerMarketInsights() {
  const producer = JSON.parse(localStorage.getItem("user"));
  const [
    agriculturalProducedProducts,
    setAgriculturalProducedProducts,
  ] = useState([]);
  const [proteinProducedProducts, setProteinProducedProducts] = useState([]);
  const [diaryProducedProducts, setDiaryProducedProducts] = useState([]);
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
        let response = await fetch(
          "https://rcp-q1g3.onrender.com/producedProducts/allProducerAgricultureProductsByLocation",
          {
            method: "POST",
            body: JSON.stringify({ location: producer.user.location }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        let json = await response.json();

        setAgriculturalProducedProducts(json.data[year]);
      } catch (e) {
        console.log(e);
      }
    }

    fetchAllAgriculturalSoldProducts(yearOfProduction);
  }, [yearOfProduction]);

  useEffect(() => {
    async function fetchAllProteinSoldProducts(year) {
      try {
        let response = await fetch(
          "https://rcp-q1g3.onrender.com/producedProducts/allProducerProteinProductsByLocation",
          {
            method: "POST",
            body: JSON.stringify({ location: producer.user.location }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        let json = await response.json();

        setProteinProducedProducts(json.data[year]);
      } catch (e) {
        console.log(e);
      }
    }

    fetchAllProteinSoldProducts(yearOfProduction);
  }, [yearOfProduction]);

  useEffect(() => {
    async function fetchAllDiarySoldProducts(year) {
      try {
        let response = await fetch(
          "https://rcp-q1g3.onrender.com/producedProducts/allProducerDiaryProductsByLocation",
          {
            method: "POST",
            body: JSON.stringify({ location: producer.user.location }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        let json = await response.json();

        setDiaryProducedProducts(json.data[year]);
      } catch (e) {
        console.log(e);
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
          {agriculturalProducedProducts ? (
            <Card
            maxWidth="max-w-7xl"
            decoration="top"
            decorationColor="green"
            >
              <Title>
                Agriculture produced products in ({yearOfProduction}) at{" "}
                {producer.user.location}
              </Title>
              <LineChart
                data={agriculturalProducedProducts}
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
              no entered agricultural produced products for {
                yearOfProduction
              }{" "}
              at {producer.user.location}
          </div>
          )}
        </>
      ) : itemRendered === 2 ? (
        <>
          {proteinProducedProducts ? (
            <Card
            maxWidth="max-w-7xl"
            decoration="top"
            decorationColor="red"
            >
              <Title>
                Protein produced products in ({yearOfProduction}) at{" "}
                {producer.user.location}
              </Title>
              <LineChart
                data={proteinProducedProducts}
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
              no entered protein produced products for {
                yearOfProduction
              } at {producer.user.location}
          </div>
          )}
        </>
      ) : (
        <>
          {diaryProducedProducts ? (
            <Card
            maxWidth="max-w-7xl"
            decoration="top"
            decorationColor="blue"
            >
              <Title>
                Diary produced products in ({yearOfProduction}) at{" "}
                {producer.user.location}
              </Title>
              <LineChart
                data={diaryProducedProducts}
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
              no entered diary produced products for {yearOfProduction} at{" "}
              {producer.user.location}
          </div>
          )}
        </>
      )}
    </div>
  );
}
