'use client'

import { Image } from "@nextui-org/react"


const SingleWeather = ({ time , temp , icon }) => {


    const getDescription = (icon) => {
        switch (icon) {
            case '01d':
                return 'שמיים בהירים'
            case '01n':
                return 'שמיים בהירים'
            case '02d':
                return "בהיר עם עננים לפרקים"
            case '02n':
                return "בהיר עם עננים לפרקים"
            case '03d':
                return 'מעונן חלקית'
            case '03n':
                return 'מעונן חלקית'
            case '04d':
                return 'מעונן'
            case '04n':
                return 'מעונן'
            case '09d':
                return 'ממטרי גשם לפרקים'
            case '09n':
                return 'ממטרי גשם לפרקים'
            case '10d':
                return 'גשום'
            case '10n':
                return 'גשום'
            case '11d':
                return 'סופת רעמים'
            case '11n':
                return 'סופת רעמים'
            case '13d':
                return 'שלג'
            case '13n':
                return 'שלג'
            case '50d':
                return 'ערפל'
            case '50n':
                return 'ערפל'
            default:
                return 'שמיים בהירים'
        }
    }


    return (
            <div>
            <div className="hidden lg:flex text-text shadow-2xl flex-col justify-center w-[20vw] p-2 items-center bg-sky-200 rounded-3xl ">
                <p className="font-bold text-[20px]">{time}</p>
                <div className="flex flex-row-reverse items-center justify-center border-t-2 border-text w-full">
                <Image
                    src={'https://openweathermap.org/img/wn/' + icon + '@4x.png'}
                    alt={icon}
                    width={100}
                    height={100}
                    className="rounded-3xl"
                />
                <p className="text-[50px]">{Math.round(temp)}°C</p>
                </div>
                <p className="text-[20px]">{getDescription(icon)}</p>
            </div>    
            <div className="flex lg:hidden text-text shadow-2xl flex-col justify-center mx-2 p-2 items-center bg-sky-200 rounded-3xl ">
                <p className="font-bold">{time}</p>
                <Image
                    src={'https://openweathermap.org/img/wn/' + icon + '@2x.png'}
                    alt={icon}
                    width={100}
                    height={100}
                    className="rounded-3xl"
                />

                <p className="font-bold">{Math.round(temp)}°C</p>
            </div>
            </div>
    )
}



export default SingleWeather