import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";



const SingleStar = ({index , rating , readOnly , onTrailPage , onClick}) => {




    const calculateStar = () => {
        
        if (index <= rating) {
            return <FaStar className={onTrailPage ? 'lg:text-[40px] ': 'lg:text-[22px]'} color='green' />
        
        } else if (index - 0.5 <= rating) {
            return <FaStarHalfAlt className={onTrailPage ? 'lg:text-[40px] ': 'lg:text-[22px]'} color="green" />
        }

        if (readOnly) {
            return
        }

        return <FaRegStar className={onTrailPage ? 'lg:text-[40px] ': 'lg:text-[22px]'} color="green" />
    }

                
    return (
        <div className={onTrailPage && !readOnly ? 'cursor-pointer hover:opacity-50': ''} onClick={onClick}>
            {calculateStar()}
        </div>
    )
}



export default SingleStar

