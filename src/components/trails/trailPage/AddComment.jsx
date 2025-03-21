'use client';
import React, { useState, useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { MdOutlineAddComment } from 'react-icons/md';
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

export default function AddComment({ trailId, userId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [textMessage, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortControllerRef = useRef(null);

  const validateForm = () => {
    let formErrors = {};
    if (!title) formErrors.title = "כותרת נדרשת";
    if (!textMessage) formErrors.comment = "תגובה נדרשת";
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    console.log('now in handle submit');

    // Construct the data to be sent
    const commentData = {
      title,
      textMessage,
      trailId,
      userId,
      method: "POST"
    };

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
        signal: abortController.signal,
      });

      if (!response.ok) {
        // Handle the error
        console.error('Failed to submit comment');
        toast.error('שגיאה בשליחת התגובה');
        setIsSubmitting(false);
        return;
      }

      // Clear form and close modal on success
      toast.success('התגובה נוספה בהצלחה!');
      setTitle("");
      setComment("");
      setErrors({});
      setIsSubmitting(false);
      onOpenChange();  // Close the modal only after resetting the submitting state

      // after 2 seconds reload the page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error submitting comment:', error);
        setIsSubmitting(false);
      }
    }
  };

  const handleButtonClick = () => {
    if (isSubmitting) return; // Prevent multiple submissions
    if (validateForm()) {
      setIsSubmitting(true);
      handleSubmit();
    }
  };

  return (
    <>
      <Button className="w-full mx-2 lg:text-xl" onPress={onOpen} color="secondary">
        הוסף תגובה
        <MdOutlineAddComment className="text-xl" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        className="w-[80%] lg:h-[50%] h-[60%] flex flex-col justify-center items-center"
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <div className="flex flex-col gap-2 w-full" dir="rtl">
              <ModalHeader className="flex flex-col gap-1">הוסף תגובה</ModalHeader>
              <ModalBody className="flex flex-col gap-4 mb-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-lg">כותרת</label>
                  <Input
                    id="title"
                    autoFocus
                    placeholder="הכנס כותרת"
                    variant="bordered"
                    size="lg"
                    required
                    className="w-full"
                    type="text"
                    color="secondary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="comment" className="text-lg">תגובה</label>
                  <Textarea
                    id="textMessage"
                    placeholder="הכנס תגובה"
                    required
                    className="w-full h-32"
                    size="lg"
                    color="secondary"
                    value={textMessage}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  {errors.comment && <span className="text-red-500 text-sm">{errors.comment}</span>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-red-500 text-md" color="primary" variant="flat" onPress={onClose}>
                  ביטול
                </Button>
                <Button
                  disabled={isSubmitting}
                  className="bg-blue-500 text-md"
                  color="primary"
                  onPress={handleButtonClick}
                >
                  {isSubmitting ? <Spinner size="xs" /> : 'הוסף תגובה'}
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
