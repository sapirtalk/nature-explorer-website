import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";



const SingleStar = ({index , rating , readOnly}) => {




    const calculateStar = () => {
        
        if (index <= rating) {
            return <FaStar className='lg:text-[22px]' color='green' />
        
        } else if (index - 0.5 <= rating) {
            return <FaStarHalfAlt className='lg:text-[22px]' color="green" />
        }

        if (readOnly) {
            return
        }

        return <FaRegStar className='lg:text-[22px]' color="green" />
    }

                
    return (
        <div>
            {calculateStar()}
        </div>
    )
}



export default SingleStar

