'use client'
import {Accordion, AccordionItem, Link, Spinner} from "@nextui-org/react";
import { useEffect , useState } from "react";
import SingleWeather from "./SingleWeather";




const WeatherComp = () => {

    const [weather, setWeather] = useState({});

    useEffect(() => {

        const getWeather = async () => {
            
            const res = await fetch('/api/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({city : 'Haifa'})
            })

            const data = await res.json();

            // get only the data for today
            const today = new Date();
            const todayData = Object.values(data.data.list).filter(entry => new Date(entry.dt * 1000).getDate() === today.getDate());

            console.log(todayData)
            setWeather(todayData);

        }

        getWeather()
        
    }, []);


    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-2">
        {Object.keys(weather).length === 0 ? (
          <Spinner />
        ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
            <header className="text-2xl lg:text-[30px]">מזג אוויר</header>
            <p className="text-center my-2 w-full">יום {extractDayFromUnix(weather[0].dt)}</p>
            <p className="text-center mb-2 w-full">{extractFullDate(weather[0].dt)}</p>
            <div className="flex w-full flex-row-reverse justify-between items-center">
            {Object.entries(weather).map(([key, entry], index) => (
                <div key={key} className="w-[25%] flex flex-col justify-center items-center">
                <SingleWeather time={translateHour(extractLocalTimeFromUnix(entry.dt))} temp={entry.main.temp} icon={entry.weather[0].icon} />
                </div>
            ))}
            </div>
            </div>
        )}
        <div className="w-full h-full flex flex-col lg:flex-row-reverse justify-center items-center mt-4">
        <p className="text-center text-2xl mt-4 ml-4">: למידע נוסף בנושא מזג אוויר</p>
        <Link
            href="https://ims.gov.il/he/cityPortal?lid=3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 text-2xl mt-4 underline"
        >
            השירות המטאורולוגי
        </Link>
        </div>
      </div>
    )

}

export default WeatherComp


const extractFullDate = (data) => {
    const date = new Date(data * 1000);
    // to en-gb
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
    return formattedDate;
  };


const extractDayFromUnix = (data) => {

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const date = new Date(data * 1000);
    const day = days[date.getDay()];
    return day;
  };

const extractLocalTimeFromUnix = (data) => {
    const date = new Date(data * 1000);
    const hours = date.getHours();

    return hours;
  };



  const translateHour = (hour) => {

    switch (hour) {
        case 12:
            return '12:00';
        case 15:
            return '15:00';
        case 18:
            return '18:00';
        case 21:
            return '21:00';
        default:
            return hour;
    }
}