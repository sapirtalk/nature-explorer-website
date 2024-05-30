import Image from 'next/image'
import photo from '../../../public/resources/images/trails/trail_image.jpg'



const SingleTrail = ({id ,image , name , desc , length , difficulty , duration , kids , pets , babyStroller}) => {


  return (
    <div dir="rtl" className='flex text-text h-[40vh] rounded-lg bg-white shadow-2xl flex-col mt-4 '>
      <div className='h-[40%]'>
        <Image src={photo}  alt={name} className='w-full h-full rounded-t-lg' />
      </div>  
      <div className='flex px-3 h-[12%] border-b-2'>
        <h2 className='text-xl'>{name}</h2>
      </div>
      <div className='flex flex-row justify-center h-[38%] px-3'>
        <div className='w-[80%]'>
          <p className='p-2'>{desc}</p>
        </div>
        <div className='flex flex-col justify-start w-[35%] border-r-2 pr-2 text-[15px]'>
          <p>מרחק: {length} קמ</p>
          <p>קושי: {difficulty}</p>
          <p>זמן: {duration} שעות</p>
        </div>  
      </div>
      <div className='flex flex-row h-[2%] text-center justify-between px-3 border-t-2 pt-1'>
        <div className='w-[30%]'>
          <p>לילדים: {kids ? 'כן' : 'לא'}</p>
        </div>
        <div className='w-[40%]'>
          <p>לחיות מחמד: {pets ? 'כן' : 'לא'} </p>
        </div>
        <div className='w-[30%]'>
          <p>לעגלות: {babyStroller ? 'כן' : 'לא'}</p>
        </div>
      </div>  

    </div>
  )
}



export default SingleTrail