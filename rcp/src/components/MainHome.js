import React from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import "../pages/Home.css";
import heroimage from "./../images/recipe.jpeg"
import { Link } from "react-router-dom";
import zakaria from "../images/zakaria.jfif";
import anilson from "../images/anilson.png";
import dionisis from "../images/dionisis.jpg";
import producerImg from "../images/producer.jpeg";
import consumerImg from "../images/consumer.jpeg";
import charityImg from "../images/charity.jpg";


export default function MainHome() {
  return (
    <>
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
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">

              </div>

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
                        <img
                          className="h-8 w-auto"
                          src={heroimage}
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                          <span className="sr-only">Close main menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <a
                      href="#"
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
                  <span className="xl:inline">The </span>{' '}
                  <span className="text-green-600 xl:inline">ReCiPe{' '}</span>Project
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We call our project R.C.P. and it stands for Responsible Consumption
                  Production. The way we like to read it is RECIPE because it is a
                  recipe for a better society. Our goal is to reduce the waste of food
                  and help people have better prices and producers have more efficient
                  production and foolproof work.
                  <br />
                  <br />
                  This application plan to gather data of the total production and the
                  total consumption. Small societies to big countries can use that data
                  to reduce food waste, adjust the prices of goods and create new job
                  opportunities.
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
            src={heroimage}
            alt=""
          />
        </div>
      </div>
      <div className="p-5 text-center bg-green-900">
        <p className="text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Features
        </p>
      </div>
      <div class="flex flex-wrap justify-center items-center bg-green-900 pt-4">
        <img class="object-cover w-full h-96 rounded-md md:h-auto md:w-96  md:rounded-l-lg shadow-lg shadow-green-500/50" src={producerImg} alt="" />
        <div class="flex flex-col justify-between p-4 leading-normal ml-10">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Producers</h5>
          <p class="mb-3 font-normal text-white md:w-96">Producers provide the ReCiPe with his current estimated production and
            can have valuable data back from other producers but from consumers
            needs too. That way he can adjust his production and he can be
            prepared for the upcoming years and evolve professionally.</p>
        </div>
      </div>

      <div class="flex flex-wrap justify-center items-center bg-green-900 pt-4 pb-8">
        <div class="flex flex-col justify-between p-4 leading-normal mr-10">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Seller</h5>
          <p class="mb-3 font-normal text-white md:w-96">Producers provide the ReCiPe with his current estimated production and
            can have valuable data back from other producers but from consumers
            needs too. That way he can adjust his production and he can be
            prepared for the upcoming years and evolve professionally.</p>
        </div>
        <img class="object-cover w-full h-96 rounded-md md:h-auto md:w-96  md:rounded-l-lg shadow-lg shadow-green-500/50" src={consumerImg} alt="" />
      </div>


      <div class="flex flex-wrap justify-center items-center bg-green-900 pt-4 pb-8">
        <img class="object-cover w-full h-96 rounded-md md:h-auto md:w-96  md:rounded-l-lg shadow-lg shadow-green-500/50" src={charityImg} alt="" />
        <div class="flex flex-col justify-between p-4 leading-normal ml-10">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Charity</h5>
          <p class="mb-3 font-normal text-white md:w-96">Charities provide ReCiPe with his
            monthly needs and he can see which products are
            available or not tha way can adjust his current needs and consume products that are available and plenty in the market.
            That way can achieve better prices and help in food waste.
          </p>
        </div>
      </div>


      {/* <div className='p-8 w-full bg-green-900' style={{ display: "flex", justifyContent: "space-around", alignContent: "center", flexWrap: "wrap" }}>
        <aside className="producerRole">
          <h1>PRODUCER ROLE</h1>
          <p className="content">
            Producers provide the ReCiPe with his current estimated production and
            can have valuable data back from other producers but from consumers
            needs too. That way he can adjust his production and he can be
            prepared for the upcoming years and evolve professionally.
          </p>
        </aside>
        <aside className="consumerRole">
          <h1>CONSUMER ROLE</h1>
          <p className="content">
            Consumer provide ReCiPe with his monthly needs and he can see which
            products are available or not tha way can adjust his current needs and
            consume products that are available and plenty in the market. That way
            can achieve better prices and help in food waste.
          </p>
        </aside>
      </div> */}

      <div className="text-center">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Our honor list
        </p>
      </div>


      <div id="animation-carousel" class="relative" data-carousel="static">
        {/* <!-- Carousel wrapper --> */}
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* <!-- Item 1 --> */}
          <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
            <div class="flex flex-wrap justify-center items-center  pt-4 pb-8">

              <a href="#" class=" flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={producerImg} alt="" />
                {/* <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div> */}
              </a>
            </div>
          </div>
          {/* <!-- Item 2 --> */}
          <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
            <div class="flex flex-wrap justify-center items-center  pt-4 pb-8">

              <a href="#" class=" flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={producerImg} alt="" />
                {/* <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div> */}
              </a>
            </div>
          </div>
          {/* <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
            <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" />
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              </div>
            </a>
          </div> */}
          {/* <!-- Item 3 --> */}
          {/* <img src="/docs/images/carousel/carousel-3.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /> */}
          {/* <!-- Item 4 --> */}
          {/* <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-full z-10" data-carousel-item="">
            <img src="/docs/images/carousel/carousel-4.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div> */}
          {/* <!-- Item 5 --> */}
          {/* <div class="hidden duration-200 ease-linear absolute inset-0 transition-all transform" data-carousel-item="">
            <img src="/docs/images/carousel/carousel-5.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div> */}
        </div>
        {/* <!-- Slider controls --> */}
        <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>
      <div className="text-center">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
         Charities
        </p>
      </div>


      <div id="animation-carousel" class="relative" data-carousel="static">
        {/* <!-- Carousel wrapper --> */}
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* <!-- Item 1 --> */}
          <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
            <div class="flex flex-wrap justify-center items-center  pt-4 pb-8">

              <a href="#" class=" flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={producerImg} alt="" />
              </a>
            </div>
          </div>
          {/* <!-- Item 2 --> */}
          <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20" data-carousel-item="active">
            <div class="flex flex-wrap justify-center items-center  pt-4 pb-8">

              <a href="#" class=" flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={producerImg} alt="" />
            
              </a>
            </div>
          </div>
          {/* <!-- Item 3 --> */}
          {/* <img src="/docs/images/carousel/carousel-3.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /> */}
          {/* <!-- Item 4 --> */}
          {/* <div class="duration-200 ease-linear absolute inset-0 transition-all transform translate-x-full z-10" data-carousel-item="">
            <img src="/docs/images/carousel/carousel-4.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div> */}
          {/* <!-- Item 5 --> */}
          {/* <div class="hidden duration-200 ease-linear absolute inset-0 transition-all transform" data-carousel-item="">
            <img src="/docs/images/carousel/carousel-5.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div> */}
        </div>
        {/* <!-- Slider controls --> */}
        <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>

      <div className="text-center">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          The Team
        </p>
      </div>

      <div className='p-6 w-full' style={{ display: "flex", justifyContent: "space-around", alignContent: "center", flexWrap: "wrap" }}>

        <a href="#" class="mb-4 w-96 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={dionisis} alt="" />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dionisis</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The Captain, the one that commands the route of the <></>ship by leading the backend</p>
          </div>
        </a>
        <a href="#" class="mb-4 w-96 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full  rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={zakaria} alt="" />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Zakaria</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The eye in the sky, that catch every design aspects and bring the app up to high levels of ascetics</p>
          </div>
        </a>
        <a href="#" class="w-96 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={anilson} alt="" />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Anilson</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The silent bug catcher, and a feature proposal</p>
          </div>
        </a>
      </div>
    </>
  )
}


