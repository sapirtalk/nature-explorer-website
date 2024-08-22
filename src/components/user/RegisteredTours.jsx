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
            // remove null from array
            return data.registered_tours ? data.registered_tours.filter(tour => tour !== null) : [];
        }
        fetchTours().then((data) => {
            if (!data || data.length === 0) {
                setTours([]);
            } else {
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
                            whatsappGroupUrl={tour.whatsappGroupUrl}
                            maxNumOfPeople={tour.maxNumOfPeople}
                        />
                    </div>
                )))
            }
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);  // Ensure loading is stopped in case of error as well
        });
    }, [userId]);



    return (
        <div className='flex w-full flex-col justify-center items-center flex-wrap'>
            <h1 className='text-2xl mb-2'>הסיורים הקרובים שלי</h1>
            {loading ? <div className="flex justify-start flex-col pt-5 items-center">
                    <Spinner label="...טוען סיורים" color="secondary" labelColor="secondary" size="lg" />
                </div> :
                <div>
                    <div className="flex lg:hidden"> 
                        <ScrollShadow isEnabled={false}  orientation="vertical" className="h-[50vh] flex flex-col items-center">{tours.length > 0 ? tours : <p>לא נמצאו סיורים שנרשמת אליהם</p>}</ScrollShadow>
                    </div>
                    <div className="hidden lg:flex justify-center items-center w-full">
                        <ScrollShadow isEnabled={false} orientation="horizontal" className="flex flex-row justify-center w-[70vw] items-center my-3">{tours.length > 0 ? tours : <p>לא נמצאו סיורים שנרשמת אליהם</p>}</ScrollShadow>
                    </div>
                </div>
            }
        </div>
    )

}


export default RegisteredTours