import NewsDetail from '@/component/NewsDetail';
import RightSidebar from '@/component/RightSidebar';
import { newsDetails } from '@/lib/data';
import React from 'react';

const NewsDetailsPage = async ({params}) => {
    const {id} = await params;
    const news = await newsDetails(id);
    console.log(news)
    return (
        <div className='flex container mx-auto'>
        <div className='card border-1 w-400 border-gray-200 rounded-xl'>
        {
                <NewsDetail news = {news}></NewsDetail>
         }
        
        </div>
        <RightSidebar></RightSidebar>
        </div>
    );
};

export default NewsDetailsPage;