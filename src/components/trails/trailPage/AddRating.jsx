'use client';
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { GiStarsStack } from "react-icons/gi";
import { toast } from "react-toastify";
import Stars from "../ratingStars/Stars";

export default function AddRating({ trailId, userId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ userRating, setUserRating ] = useState(0);

  const handleSubmit = async () => {
    try {
        if (userId) {

            const res = await fetch('/api/user_panel/trail_rating', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    trailId: trailId,
                    rating: userRating,
                    action: 'add'
                })
            }).catch(error => {
                console.log(error);
            });

            const data = await res.json()
            console.log(data)

            if (data.code === 202) {
                toast.info('דירגת כבר את המסלול בעבר, הדירוג הוחלף בהצלחה!');
            }

            data.code !== 202 && toast.success('הדירוג נוסף בהצלחה!');
            onOpenChange();

      // after 2 seconds reload the page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    } catch (error) {
        console.log(error);
    }
    }

  return (
    <>
      <Button className="w-full mx-2 lg:text-xl" onPress={onOpen} color="secondary">דרג את המסלול
        <GiStarsStack className="text-xl" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        className="w-[80%] lg:h-[40%] h-[40%] flex flex-col justify-center items-center"
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <div className="flex flex-col gap-2 w-full" dir="rtl">
              <ModalHeader className="flex flex-col gap-1">דרג את המסלול</ModalHeader>
              <ModalBody className="flex flex-col gap-4 mb-3">
                <div className="flex flex-col justify-center items-center gap-1">
                  <label htmlFor="title" className="text-lg">הוסף דירוג</label>
                    <Stars trailId={trailId} userId={userId} onTrailPage={true} setUserRating={setUserRating} userRating={userRating} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-red-500 text-md" color="primary" variant="flat" onPress={onClose}>
                  ביטול
                </Button>
                <Button className="bg-blue-500 text-md" color="primary" onPress={handleSubmit}>
                  הוסף דירוג
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
