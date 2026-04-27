import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import NavLink from './NavLink';

const Navbar = () => {

    return (
        <div className='container flex mx-auto justify-between mt-4 items-center'>
            <div></div>
            <ul className='flex text-center gap-8 ml-35 text-gray-500'>
                <li><NavLink href={'/'}>Home</NavLink></li>
                <li><NavLink href={'/about'}>About</NavLink></li>
               <li> <NavLink href={'/career'}>Career</NavLink></li>
            </ul>

            <div className='flex gap-4 items-center'>
                <span className='text-3xl'><FaUserCircle /></span>
                <Link href={'/login'}><button className='btn bg-gray-700 text-white px-8'>Login</button></Link>
            </div>
        </div>
    );
};

export default Navbar;