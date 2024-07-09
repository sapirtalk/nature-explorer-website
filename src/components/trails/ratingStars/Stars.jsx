'use client'

import SingleStar from './SingleStar'



const Stars = ({rating , user_id , trail_id , readOnly , onTrailPage}) => {



    const userInput = async (index) => {

        const setUserRating = async (index) => {
            

            if (user_id) {

                const res = await fetch('/api/user_panel/trail_rating', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user_id,
                        trailId: trail_id,
                        rating: index,
                        action: 'add'
                    })
                })
                const data = await res.json()
                console.log(data)

            }
        }
        setUserRating(index)
    }






    return (

        !readOnly ? 
        <div className='flex flex-row-reverse'>
            <SingleStar onClick={() => userInput(1)} index={1} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(2)} index={2} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(3)} index={3} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(4)} index={4} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(5)} index={5} rating={rating} onTrailPage={onTrailPage} />
        </div>
        :
        <div className='flex flex-row-reverse'>
            <SingleStar index={1} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={2} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={3} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={4} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={5} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
        </div>
        

    )
}




export default Stars


    

