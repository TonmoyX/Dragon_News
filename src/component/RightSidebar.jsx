import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const RightSidebar = () => {
    return (
        <div className='mt-2 space-y-2 ml-2'>
            <button className='btn border-1 border-blue-300 text-blue-300 w-full'><FaGoogle /> Login With Google</button>
            <button className='btn border-1 border-black text-black w-full'><FaGithub /> Login With Github</button>
        </div>
    );
};

export default RightSidebar;