import { Spinner , ScrollShadow } from "@nextui-org/react"
import { useEffect, useState } from "react"
import SingleTour from "../SingleTour"



const RegisteredTours = ({userId}) => {

    const [loading, setLoading] = useState(true)
    const [tours, setTours] = useState([])


    useEffect(() => {
        const fetchTours = async () => {
            const res = await fetch('/api/user_panel/tour_registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            })
            const data = await res.json();
            console.log("registered_tours", data)
            return data.registered_tours;
        }
        fetchTours().then((data) => {
            setTours(data.map((tour) => (
                <div className="flex items-center justify-center mb-5" key={tour._id}>
                    <SingleTour
                        tour_id={tour._id}
                        image={tour.image}
                        title={tour.title}
                        description={tour.description}
                        tourTime={tour.tourTime}
                        registeredUsers={tour.registeredUsers}
                        registeredUsersCount={tour.registeredUsersCount}
                    />
                </div>
            )))
            setLoading(false)
        })
    }, [])



    return (
        <div className='flex flex-col justify-center items-center flex-wrap'>
        <h1 className='text-2xl mb-2'>הסיורים הקרובים שלי</h1>
        {loading ? <div className="flex justify-start flex-col pt-5 items-center">
            <Spinner label="...טוען סיורים" color="secondary" labelColor="secondary" size="lg" />
            </div> :
            <div>
            <div className="flex lg:hidden"> 
            <ScrollShadow isEnabled={false}  orientation="vertical" className="h-[50vh] flex flex-col items-center">{tours.length > 0 ? tours : <p>לא נמצאו סיורים שנרשמת אליהם</p>}</ScrollShadow>
            </div>
            <div className="hidden lg:flex">
            <ScrollShadow isEnabled={false} orientation="horizontal" className="flex flex-row justify-center items-center my-3 w-[80vw]">{tours.length > 0 ? tours : <p>לא נמצאו סיורים שנרשמת אליהם</p>}</ScrollShadow>
            </div>
        </div>
        }
    </div>
    )

}


export default RegisteredTours