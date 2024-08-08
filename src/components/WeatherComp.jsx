'use client';
import { Link, Spinner, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import WeatherChart from "./WeatherChart";
import SingleWeather from "./home_comp/SingleWeather";

const WeatherComp = () => {
    const [weather, setWeather] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const res = await fetch('/api/weather', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ city: 'Haifa' })
                });

                const data = await res.json();
                if (res.ok) {
                    const adjustedData = adjustTimestamps(data.data);
                    const groupedByDay = groupByDay(adjustedData);
                    setWeather(groupedByDay);
                    setSelectedDay(groupedByDay[0]);
                    setSelectedHour(new Date().getHours());
                    setCurrentWeather(groupedByDay[0][3]);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Failed to fetch weather data', error);
            } finally {
                setLoading(false);
            }
        }

        getWeather();
    }, []);

    if (loading) {
        return <div dir='ltr' className="flex justify-start flex-col pt-5 h-[80vh] items-center lg:justify-center lg:items-center">
                  <Spinner  label="...טוען מזג אוויר" color="secondary" labelColor="secondary" size="lg" />
              </div>;
      }

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSelectedHour(new Date(day[0].localTimestamp).getHours());
        setCurrentWeather(day[3]);
    };

    const handleHourChange = (event) => {
        const hour = parseInt(event.target.value, 10);
        const selectedEntry = selectedDay.find(entry => new Date(entry.localTimestamp).getHours() === hour);
        setSelectedHour(hour);
        setCurrentWeather(selectedEntry);
    };

    const handleHourClick = (hour) => {
        const selectedEntry = selectedDay.find(entry => new Date(entry.localTimestamp).getHours() === hour);
        setSelectedHour(hour);
        setCurrentWeather(selectedEntry);
    };

    const getIconForTime = (day, hour) => {
        const entry = day.find(entry => new Date(entry.localTimestamp).getHours() === hour);
        return entry ? entry.weatherData.icon : day[0].weatherData.icon;
    };

    return (
        <div dir='rtl' className="w-full h-full flex flex-col justify-center items-center p-4 bg-gray-100">
            {weather.length === 0 ? (
                <Spinner />
            ) : (
                <>
                    {selectedDay && (
                        <div className="w-full text-center lg:hidden">
                            <p className="text-2xl font-bold">יום {extractDayFromUnix(selectedDay[0].localTimestamp)}</p>
                            <p className="text-lg">{extractFullDate(selectedDay[0].localTimestamp)}</p>
                        </div>
                    )}
                    {selectedDay && (
                        <div className="w-full mt-4 lg:hidden">
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={selectedHour ?? ""}
                                onChange={handleHourChange}
                            >
                                {selectedDay
                                    .filter(entry => {
                                        const hour = new Date(entry.localTimestamp).getHours();
                                        return hour !== 0 && hour !== 3;
                                    })
                                    .map((entry, index) => (
                                        <option key={index} value={new Date(entry.localTimestamp).getHours()}>
                                            {new Date(entry.localTimestamp).getHours()}:00
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                    <div className="w-full h-full flex flex-col items-center mb-8">
                        {currentWeather && (
                            <SingleWeather 
                                weatherEntry={currentWeather} 
                            />
                        )}
                    </div>
                    <div className="w-full h-full hidden lg:flex justify-center items-center mb-8">
                        {selectedDay && (
                            <WeatherChart 
                                weatherData={selectedDay} 
                                selectedHour={selectedHour}
                                onHourClick={handleHourClick}
                            />
                        )}
                    </div>
                    <div className="w-full flex overflow-x-auto flex-row justify-around items-center">
                        {weather.map((day, index) => (
                            <div
                                key={index}
                                className={`flex flex-row justify-center items-center sm:w-[30%] lg:w-[20%] bg-[#8884d8] bg-opacity-70 rounded-lg shadow-xl hover:opacity-70 cursor-pointer my-2 mx-2 ${selectedDay === day ? 'border-2 border-blue-500' : ''}`}
                                onClick={() => handleDayClick(day)}
                            >
                                <div className="flex flex-col items-center">
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${getIconForTime(day, 15)}@4x.png`}
                                        alt={getIconForTime(day, 15)}
                                        width={100}
                                        height={100}
                                        className="mb-4 mt-2"
                                    />
                                    <p className="text-center font-bold text-lg">יום {extractDayFromUnix(day[0].localTimestamp)}</p>
                                    <p className="text-center text-sm">{extractFullDate(day[0].localTimestamp)}</p>
                                    <p className="text-center text-lg">
                                        {Math.round(Math.min(...day.map((entry) => entry.weatherData.temperature)))}°C - 
                                        {Math.round(Math.max(...day.map((entry) => entry.weatherData.temperature)))}°C
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div dir='ltr' className="w-full flex flex-col lg:flex-row-reverse justify-center items-center mt-4">
                <p className="text-center text-xl mt-4 ml-4">: למידע נוסף בנושא מזג אוויר</p>
                <Link
                    href="https://ims.gov.il/he/cityPortal?lid=3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 text-xl mt-4 underline"
                >
                    השירות המטאורולוגי
                </Link>
            </div>
        </div>
    )
}

export default WeatherComp;

const extractFullDate = (data) => {
    const date = new Date(data);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
    return formattedDate;
};

const extractDayFromUnix = (data) => {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const date = new Date(data);
    const day = days[date.getDay()];
    return day;
};

const groupByDay = (data) => {
    const grouped = data.reduce((acc, entry) => {
        const date = new Date(entry.localTimestamp);
        const day = date.toISOString().split('T')[0];
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(entry);
        return acc;
    }, {});
    return Object.values(grouped).slice(1, 5);
};

const adjustTimestamps = (data) => {
    const offset = new Date().getTimezoneOffset() * 60000; // Get the local timezone offset in milliseconds
    return data.map(entry => {
        const localTimestamp = new Date(new Date(entry.localTimestamp).getTime() + offset);
        return { ...entry, localTimestamp: localTimestamp.toISOString() };
    });
};
