'use client';


import {Image} from "@nextui-org/image";
import { useState } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import {Modal, ModalContent} from "@nextui-org/react";
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'


const ImageCarousel = ({ images , options }) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false,
    slidesToScroll: 1,
    containScroll: false
  });
  const [currentImage, setCurrentImage] = useState(0);


  const { selectedIndex, scrollSnaps, onDotButtonClick } =
      useDotButton(emblaApi)

  const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
  } = usePrevNextButtons(emblaApi)



  // Open modal and set current image
  const openModal = (index) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };






    return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide flex justify-center items-center hover:opacity-50 hover:cursor-pointer" key={index} onClick={() => openModal(index)}>
              <Image
                src={image}
                alt={`Image ${index}`}
                layout="fill"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="hidden justify-center items-center lg:flex lg:flex-row-reverse lg:justify-between">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot hover:opacity-50 cursor-pointer ${index === selectedIndex ? 'bg-blue-500' : 'bg-gray-500'}`}
            />
          ))}
        </div>
        </div>
      </div>


      {isModalOpen && (
        <Modal
        size="5xl" 
        backdrop="opaque" 
        isOpen={isModalOpen}
        onClose={closeModal}
        onOpenChange={setIsModalOpen}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent className="bg-zinc-900 flex justify-center items-center">
          <Image
            src={images[currentImage]}
            alt={`Image ${currentImage}`}
            layout="fill"
            className="object-cover"
          />
        </ModalContent>
      </Modal>
      )}
    </section>
    );
    };



export default ImageCarousel;