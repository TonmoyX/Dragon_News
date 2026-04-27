import React from 'react';
import Marquee from 'react-fast-marquee';

const HeadLine = () => {
    const data = [
        {
            id : 1, 
            title : "Match Highlights: Argentina vs Germany — as it happened   ! "
        },
        {
            id : 2, 
            title : "Match Highlights: Argentina vs Germany — as it happened   ! "
        },
        {
            id : 3, 
            title : "Match Highlights: Argentina vs Germany — as it happened   ! "
        }
    ]
    return (
        <div className='bg-gray-100 p-2 container mx-auto flex space-x-4'>
            <button className='btn bg-red-500 text-white'>Latest</button>
            <Marquee pauseOnHover={true}>{
                data.map(n => {
                    return (
                    <span key={n.id} className='text-[#403F3] font-semibold'>{n.title}</span>
                    )
                })
            }</Marquee>
        </div>
    );
};

export default HeadLine;