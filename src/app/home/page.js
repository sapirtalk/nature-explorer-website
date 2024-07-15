import LatestTours from '@/components/home_comp/LatestTours'
import RecommendedTrails from '@/components/home_comp/RecommendedTrails'
import Greeting from '@/components/home_comp/Greeting'
import { cookies } from 'next/headers';
import { Link } from "@nextui-org/react";




const Home = () => {



  return (
    <div>
      <br />
        <Greeting />
        <div className='w-full h-[30vh] '>
        <div className='border-8 border-tertiary'></div>
          <LatestTours />
        </div>
        <div className="flex justify-center lg:mt-8" dir='rtl'>
        <Link
            showAnchorIcon
            className="text-primary-500 text-2xl lg:mt-0 mt-20"
            href='/tours'>
            לכל הסיורים
          </Link>
        </div>
        <div className='border-8 border-tertiary mt-4'></div>
        <div className='w-full h-full p-3 mt-5'>
          <RecommendedTrails cookieCallback={cookieCallback} />
        </div>
        <div className="flex justify-center" dir='rtl'>
        <Link
            showAnchorIcon
            className="text-primary-500 text-2xl lg:mt-0 lg:mb-8 mt-3"
            href='/trail_catalogue'>
            לכל המסלולים
          </Link>
        </div>
    </div>

  )
}

export default Home



const cookieCallback = async (name , value , action) => {
  'use server'

  const isCookiesEnabled = cookies().has(name)

  switch (action) {

      case 'set':
          cookies().set(name, value , {maxAge: 60 * 60 * 24 * 30})
          break;
      case 'remove':
          cookies().delete(name)
          break;
      case 'get':
          return isCookiesEnabled ? JSON.parse(cookies().get(name).value) : null  
  }
}