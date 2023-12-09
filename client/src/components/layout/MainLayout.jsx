import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/navbar'
import Footer from '../footer/footer'

const MainLayout = () => {
    return (
        <div>
          <div className='bg-white'>
         <Navbar></Navbar>
          </div>
            <Outlet></Outlet>
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default MainLayout