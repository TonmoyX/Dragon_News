import Header from '@/component/shared/header/header';
import Navbar from '@/component/shared/navbar/Navbar';
import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <>
            <Header></Header>
            <Navbar></Navbar>
            {children}
        </>
    );
};

export default AuthLayout;