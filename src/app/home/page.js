import LatestNews from '@/components/home_comp/LatestNews'
import React from 'react'

function Home() {
  const newsItems = ['הטיול של סובב חיפה בוטל עקב גשמים עמכם הסליחה', 'נוספו מספר טיולים קצרים חדשים לכל המשפחה', 'דוגמא 3']; // Example news items
  

  return (
    <div>
        <div className='w-full h-[20vh]'>
            <LatestNews newsItems={newsItems} />
        </div>
    </div>

  )
}

export default Home