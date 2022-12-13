import React from 'react'
import error404 from "../images/error404.png"
export default function Error404() {
  return (
    <div>
    <h1 className='text-red-900 bg-red-300 rounded text-center w-9/12 mx-auto p-4 mt-5'>this page is not found you can use navbar to go to home or any page you prefer</h1>
    <img src={error404} className="mx-auto my-0" style={{width:"60%"}} alt="" />
    </div>
  )
}
