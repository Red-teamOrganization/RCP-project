import { useState, useEffect } from "react";
import CountUp from "react-countup";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function AllStatics() {
  const [totalProducedProducts, setTotalProducedProducts] = useState({});
  const [totalSoldProducts, setTotalSoldProducts] = useState({});

  useEffect(() => {
    async function getAllStatics() {
      let response = await fetch("http://localhost:3000/AllStatics");
      let json = await response.json();
      setTotalProducedProducts(json.data.productionObj);
      setTotalSoldProducts(json.data.consumptionObj);
    }
    getAllStatics();
  });

  return (
    <div>
      <h1 className="text-center mt-10 mb-10 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
        All Statics
      </h1>
      <AnimationOnScroll animateIn="animate__bounceIn" initiallyVisible={true}>
        <div className="flex flex-wrap justify-around mb-20">
          <div className="w-30 rounded  border-2 border-green-700">
            <h2 className="bg-green-300 p-5 text-xl text-center text-green-900 font-bold rounded-tl rounded-tr">
              All Agriculture
            </h2>
            <div className="flex">
              <div className=" bg-green-600 w-40 text-center text-white p-5 rounded-bl">
                <i className="fa-brands fa-product-hunt text-xs block tracking-[0.2em]">
                  roduction
                </i>
                <CountUp
                  end={totalProducedProducts.agriculture}
                  duration={10}
                  className="text-lg"
                />
              </div>
              <div className=" bg-red-600 w-40  text-center text-white p-5 rounded-br">
                <i className="fa-solid fa-copyright text-xs block tracking-[0.2em]">
                  onsumption
                </i>
                <CountUp
                  end={totalSoldProducts.agriculture}
                  duration={10}
                  className="text-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-30 rounded  border-2 border-red-700">
            <h2 className="bg-red-300 p-5 text-xl text-center text-red-900 font-bold rounded-tl rounded-tr">
              All Proteins
            </h2>
            <div className="flex">
              <div className=" bg-green-600 w-40 text-center text-white p-5  rounded-bl">
                <i className="fa-brands fa-product-hunt text-xs block tracking-[0.2em]">
                  roduction
                </i>
                <CountUp
                  end={totalProducedProducts.protein}
                  duration={10}
                  className="text-lg"
                />
              </div>
              <div className=" bg-red-600 w-40 text-center text-white p-5 rounded-br">
                <i className="fa-solid fa-copyright text-xs block tracking-[0.2em]">
                  onsumption
                </i>
                <CountUp
                  end={totalSoldProducts.protein}
                  duration={10}
                  className="text-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-30 rounded  border-2 border-blue-700">
            <h2 className="bg-blue-300 p-5 text-xl text-center text-blue-900 font-bold rounded-tl rounded-tr">
              All Diary
            </h2>
            <div className="flex">
              <div className=" bg-green-600 w-40 text-center text-white p-5 rounded-bl">
                <i className="fa-brands fa-product-hunt text-xs block tracking-[0.2em]">
                  roduction
                </i>
                <CountUp
                  end={totalProducedProducts.diary}
                  duration={10}
                  className="text-lg"
                />
              </div>
              <div className=" bg-red-600 w-40 text-center text-white p-5 rounded-br">
                <i className="fa-solid fa-copyright text-xs block tracking-[0.2em]">
                  onsumption
                </i>
                <CountUp
                  end={totalSoldProducts.diary}
                  duration={10}
                  className="text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimationOnScroll>
    </div>
  );
}
