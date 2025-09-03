import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Header/Footer';

const Root = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <Navbar></Navbar>
            
                <Outlet></Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default Root;