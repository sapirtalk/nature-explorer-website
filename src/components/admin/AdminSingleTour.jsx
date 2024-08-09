import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { toast } from 'react-toastify';
import logo from '../../../public/resources/images/logo/logo.png';

const AdminSingleTour = ({ tour_id, title, users , description, tourTime, registeredUsersCount, registeredUsers, image, whatsappGroupUrl, maxNumOfPeople, maxNumOfPeoplePerUser, admin, fetchTours }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [clickedDelete, setClickedDelete] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedTourDate, setUpdatedTourDate] = useState(tourTime.slice(0, 10));
    const [updatedTourClock, setUpdatedTourClock] = useState(tourTime.slice(11, 16));
    const [updatedImage, setUpdatedImage] = useState(image);
    const [pendingRemoveImages, setPendingRemoveImages] = useState([]);
    const [registeredUsersList, setRegisteredUsersList] = useState(false);
    const [updatedMaxNumOfPeople, setUpdatedMaxNumOfPeople] = useState(maxNumOfPeople);
    const [updatedMaxNumOfPeoplePerUser, setUpdatedMaxNumOfPeoplePerUser] = useState(maxNumOfPeoplePerUser);
    const [updatedWhatsappGroupUrl, setUpdatedWhatsappGroupUrl] = useState(whatsappGroupUrl);

    const handleImageRemove = (imageUrl) => {
        setPendingRemoveImages([...pendingRemoveImages, imageUrl]);
        setUpdatedImage(updatedImage.filter(img => img !== imageUrl));
    };

    const updatedTourTime = () => {
        const updatedTime = updatedTourClock;
        const updatedDate = updatedTourDate;
        const updatedDateTime = `${updatedDate}T${updatedTime}`;
        return updatedDateTime;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUpdatedImage = updatedImage.filter(img => !pendingRemoveImages.includes(img));
        const payload = {
            requesterId: admin.id,
            tourId: tour_id,
            updatedFields: {
                title: updatedTitle,
                description: updatedDescription,
                tourTime: updatedTourTime(),
                newImages: (image == updatedImage) ? null : newUpdatedImage,
                removeImages: pendingRemoveImages,
                maxNumOfPeople: updatedMaxNumOfPeople,
                maxNumOfPeoplePerUser: updatedMaxNumOfPeoplePerUser,
                whatsappGroupUrl: (updatedWhatsappGroupUrl.slice(0, 4) !== 'http') ? 'https://' + updatedWhatsappGroupUrl : updatedWhatsappGroupUrl,
            }
        };

        try {
            const response = await fetch('/api/admin_panel/tours', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.success('עדכנת את הסיור בהצלחה');
                setPendingRemoveImages([]); // Clear pending removals
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('שגיאה בעדכון הסיור, נסה שנית מאוחר יותר');
        } finally {
            setIsFormOpen(false);
            fetchTours();
        }
    };

    useEffect(() => {
        const initialTime = tourTime.slice(11, 16);
        console.log('Initial time:', initialTime);
        setUpdatedTourClock(initialTime);
    }, [tourTime]);

    const handleDelete = async () => {
        setClickedDelete(false);

        const payload = {
            requesterId: admin.id,
            tourId: tour_id,
        };


        try {
            const response = await fetch('/api/admin_panel/tours', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.info('מחקת את הסיור בהצלחה');
                fetchTours();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('שגיאה במחיקת הסיור, נסה שנית מאוחר יותר');
        }
    };

    return (
        <div dir="rtl">
            <Card className="lg:w-[21vw] lg:h-[26vh] w-[90vw] flex flex-col mx-2 ">
                <div className="flex flex-col flex-[2]">
                    <CardHeader className="flex-1">
                        <div className='w-[30%] ml-3'>
                            {image.length === 0 ? (
                                <div>
                                    <Image src={logo} alt='logo' width={80} height={80} />
                                </div>
                            ) : (
                                <Image 
                                    src={image[0]}
                                    width={500}
                                    height={500} 
                                    className='w-full h-full rounded-r-lg' />
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <header className="text-text font-bold">{title}</header>
                            <p className="flex text-xs text-default-500">
                            תאריך הסיור: &nbsp;
                            {tourTime.slice(8,10)}.{tourTime.slice(5,7)}.{tourTime.slice(0, 4)}
                            </p>
                            <p className="text-xs text-default-500">
                                שעת הסיור: &nbsp;
                                {tourTime.slice(11, 16)}
                            </p>
                            <p className="text-xs text-default-500">
                                <button className="text-text underline" onClick={() => setRegisteredUsersList(true)}>מספר משתתפים: {registeredUsersCount}                                </button>
                                {registeredUsersList && (
                                    <Modal dir='rtl' isOpen={registeredUsersList} onClose={() => setRegisteredUsersList(false)}>
                                        <ModalContent>
                                            <ModalHeader>
                                                <h2 className="text-base font-semibold leading-7 text-gray-900">משתתפים בסיור</h2>
                                            </ModalHeader>
                                            <ModalBody>
                                                <div className="flex flex-col">
                                                {Object.entries(registeredUsers).map(([userId , numOfPeople ]) => (
                                                    <div key={userId} className="flex justify-between items-center p-2 border-b border-gray-300">
                                                        <span> {findFullName(userId , users)}: {numOfPeople}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button className='bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary' onClick={() => setRegisteredUsersList(false)}>סגור</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                )}
                            </p>
                            <p className="text-xs text-default-500">
                                מספר משתתפים מקסימלי: {maxNumOfPeople}
                            </p>
                            <p className="text-xs text-default-500">
                                מספר משתתפים מקסימלי למשתמש: {maxNumOfPeoplePerUser}
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                </div>

                <CardBody className="flex-[6]">
                    <div className="max-h-20 overflow-y-auto">
                        <p className='text-center'>{description}</p>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="p-5 flex-[2] justify-center">
                    <div>
                        {clickedDelete && (
                            <Modal isOpen={clickedDelete} onClose={() => setClickedDelete(false)}>
                                <ModalContent dir="rtl">
                                    <ModalBody>
                                        <p>האם אתה בטוח שברצונך למחוק את הסיור?</p>
                                        <p>הסיור ימחק לחלוטין ולא יהיה ניתן לשחזר אותו</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className='bg primary' onClick={() => setClickedDelete(false)}>לא</Button>
                                        <Button className='bg-customRed text-primary' onClick={handleDelete}>כן</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal> 
                        )}
                        <Button className='bg-red-500 p-2 rounded-lg text-primary hover:opacity-50' onClick={() => setClickedDelete(true)}>מחק סיור</Button>
                        <Button type="button" className='bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary mr-5' onClick={() => setIsFormOpen(true)}>ערוך סיור</Button>
                    </div>
                </CardFooter>
            </Card>

            {isFormOpen && (
                <Modal dir='rtl' isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                    <ModalContent>
                        <ModalHeader>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">עריכת סיור</h2>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                שם הסיור
                                            </label>
                                            <div>
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    value={updatedTitle}
                                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="tourDate" className="block text-sm font-medium leading-6 text-gray-900">
                                                תאריך הסיור
                                            </label>
                                            <div>
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                    id="tourDate"
                                                    name="tourDate"
                                                    type="date"
                                                    value={updatedTourDate}
                                                    onChange={(e) => setUpdatedTourDate(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="tourClock" className="block text-sm font-medium leading-6 text-gray-900">
                                                שעת הסיור
                                            </label>
                                            <div>
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                    id="tourClock"
                                                    name="tourClock"
                                                    type="time"
                                                    value={updatedTourClock}
                                                    onChange={(e) => setUpdatedTourClock(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                תיאור
                                            </label>
                                            <div>
                                                <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                value={updatedDescription}
                                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                מספר משתתפים מקסימלי
                                            </label>
                                            <div>
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    value={updatedMaxNumOfPeople}
                                                    onChange={(e) => setUpdatedMaxNumOfPeople(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                                מספר משתתפים מקסימלי למשתמש
                                            </label>
                                            <div>
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    value={updatedMaxNumOfPeoplePerUser}
                                                    onChange={(e) => setUpdatedMaxNumOfPeoplePerUser(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                        <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                                            קישור לקבוצת הוואטסאפ
                                        </label>
                                        <div>
                                            <div className="mt-2">
                                                <input
                                                    id="url"
                                                    name="url"
                                                    type="text"
                                                    value={updatedWhatsappGroupUrl}
                                                    onChange={(e) => setUpdatedWhatsappGroupUrl(e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                        

                                        <div className="col-span-full">
                                        {updatedImage.length === 0 && (
                                            <div>
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                תמונה
                                            </label>
                                                <input
                                                    type="file"
                                                    id="photo"
                                                    name="photo"
                                                    accept="image/*"
                                                    className="mt-2"
                                                    onChange={(event) => {
                                                        const file = event.target.files[0];
                                                        if (file) {
                                                          const reader = new FileReader();
                                                          reader.onloadend = () => {
                                                            const base64String = reader.result;
                                                            setUpdatedImage([base64String]);
                                                          };
                                                          reader.readAsDataURL(file);
                                                        }
                                                      }}
                                                />
                                            </div>
                                            )}                                    
                                        </div>
                                        {updatedImage.length > 0 && (
                                            <div className="col-span-full">
                                                <h3 className="block text-sm font-medium leading-6 text-gray-900">תמונה</h3>
                                                <div className="flex flex-wrap">
                                                    {updatedImage.map((imgUrl, index) => (
                                                        <div key={index} className="relative m-2">
                                                            <Image src={imgUrl} width={100} height={100} className="rounded-lg" />
                                                            <button
                                                                type="button"
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                                onClick={() => handleImageRemove(imgUrl)}
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <Button type="button" className='bg-red-500 hover:opacity-50 p-2 rounded-lg text-primary' onClick={() => setIsFormOpen(false)}>ביטול</Button>
                                    <Button type="submit" className='bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary'>שמור שינויים</Button>
                                </div>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default AdminSingleTour;




    
const findFullName = (userId, users) => {

    console.log('users', users)

    const user = users.find(user => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : undefined;
};
    

