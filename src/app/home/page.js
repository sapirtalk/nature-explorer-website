import LatestNews from '@/components/home_comp/LatestNews'
import RecommendedTrails from '@/components/home_comp/RecommendedTrails'
import Greeting from '@/components/home_comp/Greeting'
import { cookies } from 'next/headers';






const Home = () => {



  return (
    <div>
        <Greeting />
        <div className='w-full h-[30vh]'>
          <LatestNews />
        </div>
        <div className='w-full h-full p-3'>
          <RecommendedTrails cookieCallback={cookieCallback} />
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