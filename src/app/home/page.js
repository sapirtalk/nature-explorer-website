import LatestTours from '@/components/home_comp/LatestTours'
import RecommendedTrails from '@/components/home_comp/RecommendedTrails'
import Greeting from '@/components/home_comp/Greeting'
import { cookies } from 'next/headers';
import { Link } from "@nextui-org/react";
import WeatherHome from '@/components/home_comp/WeatherHome';


const Home = () => {
  return (
    <div className="p-1 w-full flex flex-col">
      <div dir='rtl' className="lg:flex w-[100%] lg:items-center lg:justify-around">
        <div className='lg:w-[85%] '>
        <Greeting />
        </div>
        <div  className='lg:w-[10%] hover:border-text flex justify-center items-center hover:cursor-pointer rounded-xl hover:opacity-70 '>
        <Link href='/weather' className='text-text' >
          <WeatherHome />
        </Link>
        </div>
      </div>
      <div className="my-1">
        <div className='border-8 border-tertiary'></div>
        <LatestTours />
        <div className="flex justify-center">
          <Link
            showAnchorIcon
            className="text-primary-500 text-2xl"
            href='/tours'>
            לכל הסיורים
          </Link>
        </div>
        <div className='border-8 border-tertiary mt-4'></div>
      </div>
      <div className='w-full h-full p-3'>
        <RecommendedTrails cookieCallback={cookieCallback} />
      </div>
      <div className="flex justify-center" dir='rtl'>
        <Link
          showAnchorIcon
          className="text-primary-500 text-2xl lg:mt-0 lg:mb-8"
          href='/trail_catalogue'>
          לכל המסלולים
        </Link>
      </div>
    </div>
  )
}

export default Home

const cookieCallback = async (name, value, action) => {
  'use server'

  const isCookiesEnabled = cookies().has(name)

  switch (action) {
    case 'set':
      cookies().set(name, value, { maxAge: 60 * 60 * 24 * 30 })
      break;
    case 'remove':
      cookies().delete(name)
      break;
    case 'get':
      return isCookiesEnabled ? JSON.parse(cookies().get(name).value) : null  
  }
}
