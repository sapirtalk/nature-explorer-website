'use client'

import PropTypes from 'prop-types';
import { Image } from "@nextui-org/react";

const getDescription = (icon) => {
    switch (icon) {
        case '01d':
        case '01n':
            return 'שמיים בהירים';
        case '02d':
        case '02n':
            return "בהיר עם עננים לפרקים";
        case '03d':
        case '03n':
            return 'מעונן חלקית';
        case '04d':
        case '04n':
            return 'מעונן';
        case '09d':
        case '09n':
            return 'ממטרי גשם לפרקים';
        case '10d':
        case '10n':
            return 'גשום';
        case '11d':
        case '11n':
            return 'סופת רעמים';
        case '13d':
        case '13n':
            return 'שלג';
        case '50d':
        case '50n':
            return 'ערפל';
        default:
            return 'שמיים בהירים';
    }
}

const SingleWeather = ({ weatherEntry }) => {
    const { temperature, feels_like, humidity, icon } = weatherEntry.weatherData;

    return (
        <div className="w-full flex flex-col justify-center items-center p-4">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center">
                    <div>
                    <Image
                        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                        alt={icon}
                        width={100}
                        height={100}
                        className="mb-4"
                    />
                    <p className="text-6xl font-bold">{Math.round(temperature)}°C</p>
                    </div>
                    <div className="flex flex-col mr-10">
                        <p className="text-lg">{getDescription(icon)}</p>
                        <p className="text-lg">מרגיש כמו: {Math.round(feels_like)}°C</p>
                        <p className="text-lg">לחות: {humidity}%</p>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col">
                    <p className="text-6xl font-bold">{new Date(weatherEntry.localTimestamp).toLocaleDateString('he-IL', { weekday: 'long' })}</p>
                    <p className="text-4xl">{new Date(weatherEntry.localTimestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>
        </div>
    );
}

SingleWeather.propTypes = {
    weatherEntry: PropTypes.shape({
        localTimestamp: PropTypes.string.isRequired,
        weatherData: PropTypes.shape({
            temperature: PropTypes.number.isRequired,
            feels_like: PropTypes.number.isRequired,
            humidity: PropTypes.number.isRequired,
            main: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default SingleWeather;
