export async function categoryData() {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`,{
      cache:"no-store"
    }
  );
  const data = await res.json();
  return data;
}

export const getCetagoryNewsData = async (category_id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`, {
    cache:"no-store"
  })
  const data = await res.json();
  return data.data;
}

export const newsDetails = async (news_id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`, {
    cache:"no-store"
  })
  const data = await res.json();
  return data.data[0];
}