import LatestNews from '@/components/home_comp/LatestNews'
import RecommendedTrails from '@/components/home_comp/RecommendedTrails'







const Home = () => {

  return (
    <div>
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