import React from 'react'
import "../static/home.css"

import { Link } from 'react-router-dom';

const home = () => {
  return (
    <>
    <div className=" overflow-x-hidden container-fluid   vh-100 vw-100 p-0 m-0 ">
      <div className="h-50 w-100 position-relative top-0 start-0 home "><h1 className='mx-2'>Got Plans ?</h1>
      <Link className="w-25 btn  btn-outline-secondary text-light border  mx-2" to="/login" role="button">Login</Link>
      </div>
    </div>
    </>
  )
}

export default home
