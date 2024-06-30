
import Image from 'next/image'
import Stars from './ratingStars/Stars';



const SingleTrail = ({id ,image , name , desc , length , difficulty , duration , kids , pets , babyStroller , rating}) => {


  const difficultyTranslate = (diff) => {
    switch (diff) {
      case 1:
        return 'קל';
      case 2:
        return 'בינוני';
      case 3:
        return 'קשה';
      default:
        return 'לא ידוע';
    }
  }


  return (
    // <div dir="rtl" className='flex text-text h-[40vh] rounded-lg bg-white shadow-2xl flex-col mt-4 '>
    //   <div className='h-[40%]'>
    //     <Image 
    //       src={`/resources/images/trails/${image[0]}/${image[0]}.jpg`}
    //       alt={name}
    //       width={500}
    //       height={500} 
    //       className='w-full h-full rounded-t-lg' />
    //   </div>  
    //   <div className='flex px-3 h-[12%] border-b-2'>
    //     <h2 className='text-xl'>{name}</h2>
    //   </div>
    //   <div className='flex flex-row justify-center h-[38%] px-3'>
    //     <div className='w-[80%]'>
    //       <p className='p-2'>{desc}</p>
    //     </div>
    //     <div className='flex flex-col justify-start w-[35%] border-r-2 pr-2 text-[15px]'>
    //       <p>מרחק: {length} קמ</p>
    //       <p>קושי: {difficulty}</p>
    //       <p>זמן: {duration} שעות</p>
    //     </div>  
    //   </div>
    //   <div className='flex flex-row h-[2%] text-center justify-between px-3 border-t-2 pt-1'>
    //     <div className='w-[30%]'>
    //       <p>לילדים: {kids ? 'כן' : 'לא'}</p>
    //     </div>
    //     <div className='w-[40%]'>
    //       <p>לחיות מחמד: {pets ? 'כן' : 'לא'} </p>
    //     </div>
    //     <div className='w-[30%]'>
    //       <p>לעגלות: {babyStroller ? 'כן' : 'לא'}</p>
    //     </div>
    //   </div>  

    // </div>

    <div dir="rtl" className='flex text-text h-[20vh] w-full min-w-[95vw] rounded-lg bg-white shadow-2xl flex-row mt-4 '>
      <div className='w-[30%]'>
        <Image 
          src={`/resources/images/trails/${image[0]}/${image[0]}.jpg`}
          alt={name}
          width={500}
          height={500} 
          className='w-full h-full rounded-r-lg' />
      </div>
      <div className='w-[70%] flex flex-col'>  
      <div className='flex flex-col px-3 h-[28%] border-b-2'>
        <Stars rating = {rating == 0 ? 3 : rating} readOnly={true} />
        <h2 className='text-l'>{name}</h2>
      </div>
      <div className='flex flex-row justify-start h-[45%] px-3'>
        <div className='w-[60%] overflow-scroll'>
          <p className='px-2 py-4 text-[12px]'>{desc}</p>
        </div>
        <div className='flex flex-col justify-center w-[40%] border-r-2 pr-2 text-[12px]'>
          <p>מרחק: {length} קמ</p>
          <p>קושי: {difficultyTranslate(difficulty)}</p>
          <p>זמן: {duration} שעות</p>
        </div>  
      </div>
      <div className='flex text-[12px] flex-row text-center justify-between px-3 border-t-2 pt-1'>
        <div className='w-[20%]'>
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
    </div>






  )
}



export default SingleTrail