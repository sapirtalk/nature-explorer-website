'use client';


import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const ImageCarousel = ({ images }) => {

    const [currentImage, setCurrentImage] = useState(0);


    // on click of the image, change the image to the next one
    const changeImage = () => {
        if (currentImage === images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    };


    return (
        <div className="w-full h-full bg-white flex flex-row">
            <Image
                src={`/resources/images/trails/${images[0]}/${images[currentImage]}.jpg`}
                alt={images[currentImage]}
                width={1000}
                height={1000}
                className="w-full h-full"
                onClick={changeImage}
            />
            <div className="absolute right-6  bg-black bg-opacity-50 text-white p-2">
                <FaArrowRight size={40} onClick={changeImage} />
            </div>    
        </div>
    );
    };



export default ImageCarousel;