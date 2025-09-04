import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Header/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div className='bg-[#f5f5f5]'>
             <Toaster position="top-right" reverseOrder={false} />
            <Navbar></Navbar>
                <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Root;