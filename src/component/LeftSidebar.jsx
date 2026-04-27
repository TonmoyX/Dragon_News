import Link from "next/link";

const LeftSidebar = async ({categories, activeId}) => {
    const data = await categories
    const categoryData = (data.data.news_category);
    // console.log(categoryData)
    return (
        <div>
            {
                categoryData.map(n => {
                    return(
                        <div key={n.category_id} className="text-center">
                            <ul className="">
                               <li key={n.category_id} className={`${activeId === n.category_id && 'bg-gray-300'} mt-4 mr-4 py-2 rounded-md`}><Link href={`/category/${n.category_id}`}>{n.category_name}</Link></li>
                            </ul>
                        </div> 
                    )
                })
            }
        </div>
    );
};
export default LeftSidebar;