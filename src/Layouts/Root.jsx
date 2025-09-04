import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Header/Footer';

const Root = () => {
    return (
        <div className='bg-[#f5f5f5]'>
            <Navbar></Navbar>
                <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Root;