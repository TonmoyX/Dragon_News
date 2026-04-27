import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
import { format } from "date-fns";
const Header = () => {
    return (
        <div className='mt-4 '>
        <Image src={logo} alt="Dragon News" width={400} height={400} className='mx-auto flex flex-col justify-center'></Image>
        <h2 className='text-center mt-4 text-[#706F6F]'>Journalism Without Fear or Favour</h2>
        <p className='text-center mt-4 text-[#706F6F] mb-6 font-medium'>{format(new Date(), "EEEE, MMMM dd, yyyy")}</p>
        </div>
    );
};

export default Header;