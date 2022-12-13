import React, { useEffect, useState } from "react";
import { Toggle, ToggleItem } from "@tremor/react";
import { Card, Title, AreaChart } from "@tremor/react";

export default function WholeMarketInsights() {
  const [agriculturalProducts, setAgriculturalProducts] = useState([]);
  const [proteinProducts, setProteinProducts] = useState([]);
  const [diaryProducts, setDiaryProducts] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [itemRendered, setItemRendered] = useState(1);
  function handleYearChange(e) {
    setYear(e.target.value);
  }
  const dataFormatter = (number) =>
    `${Intl.NumberFormat("kg").format(number).toString()}kg`;

  useEffect(() => {
    async function fetchMarketInsights(year) {
      let response = await fetch("http://localhost:3000/totalMarketInsights");
      let json = await response.json();
      setAgriculturalProducts(json.data.agriculture[year]);
      setProteinProducts(json.data.protein[year]);
      setDiaryProducts(json.data.diary[year]);
    }
    fetchMarketInsights(year);
  }, [year]);

  return (
    <div>
      <h1 className="text-center mt-10 mb-10 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
        Whole Market Insights
      </h1>
      <div className="mb-2 max-w-xl mx-auto">
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
            <input type="number" value={year} onChange={handleYearChange} />
          </div>
        </Toggle>
      </div>
      {itemRendered === 1 ? (
        <>
          {agriculturalProducts ? (
            <Card maxWidth="max-w-5xl" decoration="top" decorationColor="green">
              <Title color="green">Agriculture products in ({year})</Title>
              <AreaChart
                data={agriculturalProducts}
                categories={["production", "consumption"]}
                dataKey="productName"
                height="h-72"
                colors={["green", "red"]}
                valueFormatter={dataFormatter}
                marginTop="mt-4"
              />
            </Card>
          ) : (
            <div
              className="p-4 mb-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
              role="alert"
            >
              no entered agricultural products for {year}
            </div>
          )}
        </>
      ) : itemRendered === 2 ? (
        <>
          {proteinProducts ? (
            <Card maxWidth="max-w-5xl" decoration="top" decorationColor="red">
              <Title color="red">Protein products in ({year})</Title>
              <AreaChart
                data={proteinProducts}
                categories={["production", "consumption"]}
                dataKey="productName"
                height="h-72"
                colors={["green", "red"]}
                valueFormatter={dataFormatter}
                marginTop="mt-4"
              />
            </Card>
          ) : (
            <div
              className="p-4 mb-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
              role="alert"
            >
              no entered protein products for {year}
            </div>
          )}
        </>
      ) : (
        <>
          {diaryProducts ? (
            <Card maxWidth="max-w-5xl" decoration="top" decorationColor="blue">
              <Title color="blue">Diary products in ({year})</Title>
              <AreaChart
                data={diaryProducts}
                categories={["production", "consumption"]}
                dataKey="productName"
                height="h-72"
                colors={["green", "red"]}
                valueFormatter={dataFormatter}
                marginTop="mt-4"
              />
            </Card>
          ) : (
            <div
              className="p-4 mb-4 mx-auto text-sm text-red-700 bg-red-100 w-80 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
              role="alert"
            >
              no entered diary products for {year}
            </div>
          )}
        </>
      )}
    </div>
  );
}
