import HeadLine from '@/component/headline/HeadLine';
import Header from '@/component/shared/header/header';
import Navbar from '@/component/shared/navbar/Navbar';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <>
        <Header></Header>
        <HeadLine></HeadLine>
        <Navbar></Navbar>
        {children}
        </>
    );
};

export default MainLayout;