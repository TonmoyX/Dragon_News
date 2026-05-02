import LeftSidebar from '@/component/LeftSidebar';
import NewsCard from '@/component/NewsCard';
import RightSidebar from '@/component/RightSidebar';
import { categoryData, getCetagoryNewsData } from '@/lib/data';
import React from 'react';



const NewsCategoryPage = async ({params}) => {

    const {id} = await params
     const categories = await categoryData();
      const getNewsData = await getCetagoryNewsData(id);

    return (
       <div className="container mx-auto grid grid-cols-12 mt-6">
      <div className="col-span-3 space-y-3">
        <h2 className="text-md font-bold">All Category</h2>
        <LeftSidebar categories={categories} activeId={id}></LeftSidebar>
      </div>
      <div className="col-span-6 font-bold space-y-4">
        <h2 className="text-md font-bold">Dragon News Home</h2>
          {
            getNewsData.length > 0 ?
            getNewsData.map((news) => {
              return (
                    <NewsCard key={news._id} news = {news}>
                      
                    </NewsCard>
             )}):
             <h1 className='text-center text-6xl mt-30'>No News In This Page</h1>
          }
        
      </div>
      <div className="ml-4 col-span-3 font-bold">
        <h2>Login With</h2>
        <RightSidebar></RightSidebar>
      </div>
    </div>
    );
};

export default NewsCategoryPage;