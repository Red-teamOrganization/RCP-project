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
          "http://localhost:3000/producedProducts/allProducerAgricultureProductsByLocation",
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
          "http://localhost:3000/producedProducts/allProducerProteinProductsByLocation",
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
          "http://localhost:3000/producedProducts/allProducerDiaryProductsByLocation",
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
      <h1>market insights</h1>

      <input
        type="number"
        value={yearOfProduction}
        onChange={handleYearChange}
      />

      <Toggle
        defaultValue={1}
        handleSelect={(value) => setItemRendered(value)}
        color="green"
      >
        <ToggleItem value={1} text="Agricultural"  />
        <ToggleItem value={2} text="Protein"  />
        <ToggleItem value={3} text="Diary"  />
      </Toggle>
      {itemRendered === 1 ? (
        <>
          {agriculturalProducedProducts ? (
            <Card>
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
            <Title>
              {" "}
              no entered agricultural produced products for {
                yearOfProduction
              }{" "}
              at {producer.user.location}
            </Title>
          )}
        </>
      ) : itemRendered === 2 ? (
        <>
          {proteinProducedProducts ? (
            <Card>
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
            <Title>
              {" "}
              no entered protein produced products for {
                yearOfProduction
              } at {producer.user.location}
            </Title>
          )}
        </>
      ) : (
        <>
          {diaryProducedProducts ? (
            <Card>
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
            <Title>
              {" "}
              no entered diary produced products for {yearOfProduction} at{" "}
              {producer.user.location}
            </Title>
          )}
        </>
      )}
    </div>
  );
}
