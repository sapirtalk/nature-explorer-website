
import SingleStar from './SingleStar'



const Stars = ({rating , setUserRating , readOnly}) => {



    const userInput = (index) => {
        setUserRating(index)
    }






    return (

        !readOnly ? 
        <div className='flex flex-row-reverse'>
            <SingleStar onClick={userInput(1)} index={1} rating={rating} />
            <SingleStar onClick={userInput(2)} index={2} rating={rating} />
            <SingleStar onClick={userInput(3)} index={3} rating={rating} />
            <SingleStar onClick={userInput(4)} index={4} rating={rating} />
            <SingleStar onClick={userInput(5)} index={5} rating={rating} />
        </div>
        :
        <div className='flex flex-row-reverse'>
            <SingleStar index={1} rating={rating} readOnly = {true} />
            <SingleStar index={2} rating={rating} readOnly = {true} />
            <SingleStar index={3} rating={rating} readOnly = {true} />
            <SingleStar index={4} rating={rating} readOnly = {true} />
            <SingleStar index={5} rating={rating} readOnly = {true} />
        </div>
        

    )
}




export default Stars


    

