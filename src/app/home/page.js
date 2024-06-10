import LatestNews from '@/components/home_comp/LatestNews'
import RecommendedTrails from '@/components/home_comp/RecommendedTrails'
import Greeting from '@/components/home_comp/Greeting'







const Home = () => {



  return (
    <div>
        <Greeting />
        <div className='w-full h-[30vh]'>
          <LatestNews />
        </div>
        <div className='w-full h-full p-3'>
          <RecommendedTrails />
        </div>  
    </div>

  )
}

export default Home