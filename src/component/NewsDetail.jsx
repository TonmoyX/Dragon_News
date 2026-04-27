import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiBookmark, CiShare2 } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

const NewsDetail = ({news}) => {
    console.log(news)

    return( <div className=''>
           <div className='flex justify-between bg-gray-200 w-full p-4 rounded-xl'>
              <div className='flex gap-2'>
                <Image src={news.author.img} alt='pic' width={40} height={40} className='rounded-full'></Image>
                <div>
                    <h1 className='text-gray-500'>{news.author.name}</h1>
                    <p className='text-gray-400'>{news.author.published_date}</p>
                </div>
              </div>
              <div className='flex gap-3'>
                <p><CiBookmark /></p>
                <p><CiShare2 /></p>
              </div>
              </div>
              <div className='p-4'>
                <h1 className='text-3xl font-bold text-gray-700 mb-4'>{news.title}</h1>
                <Image src={news.image_url} alt='news pic' width={1000} height={450} className='mb-8 mx-auto'></Image>
                <h1 className='text-gray-500 pb-6 border-b-1 border-gray-300'>{news.details}<br></br><span className='text-orange-500'><Link href={`/category/${news.category_id}`} className='btn btn-primary'>See other category</Link></span></h1>
              </div>

              <div className='p-4 flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <p className='text-orange-500'><FaStar /></p>
                    <p className='text-orange-500'><FaStar /></p>
                    <p className='text-orange-500'><FaStar /></p>
                    <p className='text-orange-500'><FaStar /></p>
                    <p className='text-orange-500'><FaStar /></p>
                    <p className='text-gray-400'>{news.rating.number}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p><IoMdEye /></p>
                    <p>{news.total_view}</p>
                </div>
              </div>
        </div>
    )
};

export default NewsDetail;