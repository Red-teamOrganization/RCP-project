import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import AllStatics from "./AllStatics";
import "../pages/Home.css";
import heroImage from "./../images/recipe.jpeg";
import { Link } from "react-router-dom";
import zakaria from "../images/zakaria.jfif";
import producerImg from "../images/producer.jpeg";
import sellerImg from "../images/consumer.jpeg";
import noUserImage from "../images/noUser.png";
import charityImg from "../images/charity.jpg";
import { useState } from "react";
import { useEffect } from "react";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import WholeMarketInsights from "./WholeMarketInsights";

export default function MainHome() {
  const [honorList, setHonorList] = useState([]);
  const [charities, setCharities] = useState([]);

  const fetchHonorList = async () => {
    const response = await fetch("http://localhost:3000/honorList");
    if (!response.ok) {
      throw new Error("Data could not be fetched!");
    } else {
      return response.json();
    }
  };

  const fetchCharities = async () => {
    const response = await fetch("http://localhost:3000/allCharities");
    if (!response.ok) {
      throw new Error("Data could not be fetched!");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    fetchHonorList().then((res) => {
      setHonorList(res.data);
    });

    fetchCharities().then((res) => {
      setCharities(res.data);
    });
  }, []);

  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img className="h-8 w-auto" src={heroImage} alt="" />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                          <span className="sr-only">Close main menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <a
                      href="/"
                      className="block w-full px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="xl:inline">The </span>{" "}
                  <span className="text-green-600 xl:inline">ReCiPe </span>
                  Project
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We call our project R.C.P. and it stands for Responsible
                  Consumption Production. The way we like to read it is RECIPE
                  because it is a recipe for a better society. Our goal is to
                  reduce the waste of food and help people have better prices
                  and producers have more efficient production and foolproof
                  work.
                  <br />
                  <br />
                  This application plan to gather data of the total production
                  and the total consumption. Small societies to big countries
                  can use that data to reduce food waste, adjust the prices of
                  goods and create new job opportunities.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={heroImage}
            alt=""
          />
        </div>
      </div>

      <div className="p-5 text-center bg-green-900">
        <AnimationOnScroll animateOnce={true} animateIn="animate__bounceIn">
          <p className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Features
          </p>
        </AnimationOnScroll>
      </div>
      <div className="flex flex-wrap justify-center items-center bg-green-900 pt-4">
        <AnimationOnScroll animateOnce={true} animateIn="animate__backInLeft">
          <img
            className="object-cover w-full h-96 rounded-md md:h-auto md:w-96  md:rounded-l-lg shadow-lg shadow-green-500/50"
            src={producerImg}
            alt=""
          />
        </AnimationOnScroll>
        <AnimationOnScroll animateOnce={true} animateIn="animate__backInRight ">
          <div className="flex flex-col justify-between p-4 leading-normal ml-10">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Producers
            </h5>
            <p className="mb-3 font-normal text-white md:w-96">
              Producers provide the ReCiPe with his current estimated production
              and can have valuable data back from other producers. That way he
              can adjust his production and he can be prepared for the upcoming
              years and evolve professionally.
            </p>
          </div>
        </AnimationOnScroll>
      </div>

      <div className="flex flex-wrap justify-center items-center bg-green-900 pt-4 pb-8">
        <AnimationOnScroll animateOnce={true} animateIn="animate__backInLeft">
          <div className="flex flex-col justify-between p-4 leading-normal mr-10">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Seller
            </h5>
            <p className="mb-3 font-normal text-white md:w-96">
              Sellers provide the ReCiPe with his current estimated sold
              products and can have valuable data back from other sellers data.
              That way he can adjust his sold productions and he can be prepared
              for the upcoming years and evolve professionally.
            </p>
          </div>
        </AnimationOnScroll>
        <AnimationOnScroll animateOnce={true} animateIn="animate__backInRight ">
          <img
            className="object-cover w-full h-96 rounded-md md:h-auto md:w-96  md:rounded-l-lg shadow-lg shadow-green-500/50"
            src={sellerImg}
            alt=""
          />
        </AnimationOnScroll>
      </div>

      <div className="flex flex-wrap justify-center items-center bg-green-900 pt-4 pb-8">
        <AnimationOnScroll animateOnce={true} animateIn="animate__backInLeft">
          <img
            className="object-cover w-full h-96 rounded-md md:h-auto md:w-96  md:rounded-l-lg shadow-lg shadow-green-500/50"
            src={charityImg}
            alt=""
          />
        </AnimationOnScroll>
        <AnimationOnScroll animateOnce={true} animateIn="animate__backInRight">
          <div className="flex flex-col justify-between p-4 leading-normal ml-10">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Charity
            </h5>
            <p className="mb-3 font-normal text-white md:w-96">
              Charities provide ReCiPe with his monthly needs and he can see
              which products are available or not tha way can adjust his current
              needs and consume products that are available and plenty in the
              market. That way can achieve better prices and help in food waste.
            </p>
          </div>
        </AnimationOnScroll>
      </div>

      <section className="allStatics">
        <AllStatics />
      </section>
      <section className="wholeMarketInsights">
        <WholeMarketInsights />
      </section>
      <div className="text-center">
        <p className="m-10 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Our honor list
        </p>
      </div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {honorList.map((user, i) => {
          if (user.numberOfDonations > 0) {
            return (
              <SwiperSlide key={user._id}>
                <div className="flex justify-around items-center">
                  {user.image ? (
                    <img
                      className="object-fill w-3/12 honorImageHeight rounded"
                      src={
                        "http://localhost:3000/" +
                        user.image.replace("public", "")
                      }
                      alt={`slide${i + 1}`}
                    />
                  ) : (
                    <img
                      className="object-fill w-3/12 honorImageHeight rounded"
                      src={
                       noUserImage
                      }
                      alt={`slide${i + 1}`}
                    />
                  )}

                  <div className="w-5/12 bg-green-900 p-5 text-white rounded">
                    <h1 className="text-center text-xl mb-2">
                      {user.name.toUpperCase()}
                    </h1>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mb-1">
                          <i className="fa-regular fa-user"></i> {user.userType}
                        </p>
                        <p>
                          <i className="fa-solid fa-location-dot"></i>{" "}
                          {user.location}
                        </p>
                      </div>
                      <div>
                        <h3>Number of donates</h3>
                        <p className=" border-2  border-yellow-700 numberOfDonations rounded-full">
                          {user.numberOfDonations}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          } else {
            return <></>;
          }
        })}
      </Swiper>

      <div className="text-center">
        <p className="m-10 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Charities
        </p>
      </div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {charities.map((charity, i) => {
          return (
            <SwiperSlide key={charity._id}>
              <div className="flex justify-around">
                {charity.image ? (
                  <img
                    className="object-fill w-3/12 honorImageHeight rounded"
                    src={
                      "http://localhost:3000/" +
                      charity.image.replace("public", "")
                    }
                    alt={`slide${i + 1}`}
                  />
                ) : (
                  <img
                    className="object-fill w-3/12 honorImageHeight rounded"
                    src={noUserImage}
                    alt={`slide${i + 1}`}
                  />
                )}
                <div className="w-5/12 bg-green-900 p-5 text-white rounded relative">
                  <h1 className="text-center text-xl mb-2">
                    {charity.name.toUpperCase()}
                  </h1>
                  <div>
                    <p className="text-center">
                      <i className="fa-solid fa-feather"></i>{" "}
                      {charity.description}
                    </p>
                    <p className="absolute bottom-0 left-0 bg-blue-400 p-2 rounded-bl rounded-tr">
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {charity.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="text-center">
        <p className="mt-5 mb-3 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
          The Team
        </p>
      </div>

      <div className="p-6 w-full flex content-center justify-around">
        <a
          href="/"
          className="mb-4 w-96 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-green-400 dark:border-green-700 dark:bg-green-800 dark:hover:bg-green-700"
        >
          <img
            className="object-cover w-full  rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={zakaria}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black ">
              Zakaria
            </h5>
            <p className="mb-3 font-normal text-black">
              creator of the website from back to front hope you have nice
              experience using it and to help in saving wasted food from all
              around the world
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
