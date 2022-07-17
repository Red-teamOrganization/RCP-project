import React, { useEffect, useState } from "react";
import { compareProducts } from "../utils/util";
function Monitor({userProducts, yearly}) {
  const [products, setProducts] = useState({});
  useEffect(() => {
    setProducts(userProducts);
  }, [userProducts]);

  if (!(Object.entries(userProducts).length > 0)) {
    return (
      <>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product name
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">
                    Quantity
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 w-3 h-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                      </svg>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
          <div
            className="bg-white mx-auto flex items-center justify-center space-x-4"
            style={{ height: 64, width: "100%" }}
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>{" "}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Product name
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">
                Quantity
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                  </svg>
                </a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userProducts)
            .sort(compareProducts)
            .map((item, i) => {
              return getRow(item, i, yearly)
            })}

        </tbody>
      </table>
    </div>
  );
}

function getRow(rowData, index, yearly) {
  console.log(rowData, index);
  return (
    <tr
      key={index}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {rowData[0]}
      </th>
      <td className="py-4 px-6">{yearly?(rowData[1]*12):rowData[1]}</td>
    </tr>
  );
}
export default Monitor;
