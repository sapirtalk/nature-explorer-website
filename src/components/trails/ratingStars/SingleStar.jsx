import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";



const SingleStar = ({index , rating , readOnly}) => {




    const calculateStar = () => {
        
        if (index <= rating) {
            return <FaStar color='green' />
        
        } else if (index - 0.5 <= rating) {
            return <FaStarHalfAlt color="green" />
        }

        if (readOnly) {
            return
        }

        return <FaRegStar color="green" />
    }

                
    return (
        <div>
            {calculateStar()}
        </div>
    )
}



export default SingleStar

