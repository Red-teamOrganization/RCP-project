import React from 'react';
import './Home.css';
import logo from "../images/logo.png";

function Home() {
  return (
   <>
    <main className='mainPage'>
      <div className='aboutUs'>
        <h1>ABOUT US</h1>
        <p className='content'>We try to make better world by saving wasted vegetables and fruits for better experience as consumers or producers </p>
      </div>
      <aside className='producerRole'>
        <h1>PRODUCER ROLE</h1>
        <p className='content'>Providing producer with market needs, Takes data of number of productions producer produced to show it to consumers</p>
        </aside>
      <aside className='consumerRole'>
      <h1>CONSUMER ROLE</h1> 
      <p className='content'>Consumer provide our app with his monthly need from certain productions and also can see the yearly production of product he wants.</p>
      </aside>
    </main>
    <footer className='footer'>
      <img className='footerLogo' width={'80px'} src={logo} alt="" srcset="" />
      <ul className='contactUs'>
           <h2>CONTACT US</h2>
           <div class="flex justify-between">
           <li><a href='/'><i class="fa-brands fa-facebook hover"></i></a></li>
           <li><a href='/'><i class="fa-brands fa-instagram hover"></i></a></li>
           <li><a href='/'><i class="fa-brands fa-twitter hover"></i></a></li>
           </div>
      </ul>
    </footer>
    </>
   
  )
}

export default Home