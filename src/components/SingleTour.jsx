'use client';

import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { IoMdClose } from "react-icons/io";
import logo from '../../public/resources/images/logo/logo.png';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { SiWhatsapp } from 'react-icons/si';

const SingleTour = ({ tour_id, title, description, tourTime, registeredUsers, registeredUsersCount, image, whatsappGroupUrl, maxNumOfPeople, fetchTours }) => {
    const [user, setUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [registeredUsersCount1, setRegisteredUsersCount] = useState(registeredUsersCount);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (storedUser) {
            try {
                const decodedUser = decodeURIComponent(storedUser.split('=')[1]);
                const parsedUser = JSON.parse(decodedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse user cookie', error);
            }
        }
    }, []);

    useEffect(() => {
        if (user && registeredUsers) {
            setIsRegistered(user.id in registeredUsers);
        }
    }, [user, registeredUsers]);

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user || !numberOfPeople) return;

        setIsProcessing(true);

        const payload = {
            userId: user.id,
            tourId: tour_id,
            action: "add",
            numberOfPeople: parseInt(numberOfPeople)
        };

        try {
            const response = await fetch('/api/user_panel/tour_registration', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.success('נרשמת בהצלחה לסיור');
                setIsRegistered(true);
                setRegisteredUsersCount(prevCount => prevCount + parseInt(numberOfPeople)); 
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('שגיאה בהרשמה לסיור, נסה שנית מאוחר יותר');
        } finally {
            setIsProcessing(false);
            handleCloseForm();
            fetchTours();
            // add tour to cookie
            const newRegisteredTours = { ...user.registeredTours, [tour_id]: parseInt(numberOfPeople) };
            setUser({ ...user, registeredTours: newRegisteredTours });
            document.cookie = `user=${encodeURIComponent(JSON.stringify({ ...user, registeredTours: newRegisteredTours }))}; path=/`;
        }
    };

    const handleCancel = async () => {
        setIsModalOpen(false);
        if (!user) return;

        setIsProcessing(true);

        const payload = {
            userId: user.id,
            tourId: tour_id,
            action: "remove",
        };

        try {
            const response = await fetch('/api/user_panel/tour_registration', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.info('ביטלת את הרשמתך לסיור');
                setIsRegistered(false);
                setRegisteredUsersCount(prevCount => prevCount - result.existingPeopleCount);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('שגיאה בביטול הרשמתך לסיור, נסה שנית מאוחר יותר');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div dir="rtl">
            <Card className="lg:w-[21vw] lg:h-[26vh] w-[90vw] flex flex-col mx-2">
                <div className="flex flex-col flex-[2]">
                    <CardHeader className="flex-1">
                        <div className='w-[30%] ml-3'>
                            {image.length === 0 ? (
                                <div>
                                    <Image src={logo} alt='logo' width={80} height={80} />
                                </div>
                            ) : (
                                <Image
                                    alt='logo' 
                                    src={image[0]}
                                    width={500}
                                    height={500} 
                                    className='w-full h-full rounded-r-lg' />
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <header className="text-text font-bold">{title}</header>
                            <p className="text-xs text-default-500">
                                {tourTime.slice(8,10)}.{tourTime.slice(5,7)}.{tourTime.slice(0, 4)}
                            </p>
                            <p className="text-xs text-default-500">
                                שעת הסיור: &nbsp;
                                {tourTime.slice(11, 16)}
                            </p>
                            <p className="text-xs text-default-500">
                                מספר משתתפים: {registeredUsersCount1}
                            </p>
                            <p className="text-xs text-default-500">
                                מספר מקסימלי של משתתפים בסיור זה: {maxNumOfPeople}
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
                <CardFooter className="p-5 flex-[3] justify-center">
                    {user == null ? (
                        <div>
                            ההתחבר/הרשם לאתר כדי להירשם לסיור
                        </div>
                    ) : (
                        <div>
                            {!isFormOpen && !isRegistered && (
                                <button disabled={isProcessing} className='bg-blue-500 p-2 rounded-lg text-primary hover:opacity-50' onClick={handleOpenForm}>הרשמה לסיור</button>
                            )}
                            {isFormOpen && !isRegistered && (
                                <div>
                                    <form className="flex items-center" onSubmit={handleSubmit}>
                                        <input
                                            type="number"
                                            placeholder="כמה תהיו ?"
                                            required
                                            value={numberOfPeople}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value === '' || (Number(value) > 0 && Number.isInteger(Number(value)))) {
                                                    setNumberOfPeople(value);
                                                }}}
                                            className="flex-grow"
                                        />
                                        <button disabled={isProcessing} type="submit" className='bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary mr-5'>הרשמה</button>
                                        <IoMdClose onClick={handleCloseForm} className='text-4xl text-text cursor-pointer mr-5' />
                                    </form>
                                </div>
                            )}
                            {isRegistered && (
                                <div className='flex flex-col items-center mb-2'>
                                    <p>נרשמת לסיור זה עם {user.registeredTours[tour_id]} משתתפים</p>
                                    <button disabled={isProcessing} className='bg-red-500 p-2 rounded-lg hover:opacity-50 text-primary' onClick={() => setIsModalOpen(true)}>ביטול הרשמה</button>
                                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dir="rtl">
                                        <ModalContent>
                                            <ModalHeader>ביטול הרשמה</ModalHeader>
                                            <ModalBody>
                                                <p>האם אתה בטוח שברצונך לבטל את ההרשמה לסיור?</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button auto onClick={() => setIsModalOpen(false)}>לא</Button>
                                                <Button auto className='bg-customRed text-primary' onClick={handleCancel}>כן</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </div>
                            )}
                        </div>
                    )}
                    {whatsappGroupUrl && isRegistered && (
                        <Link href={whatsappGroupUrl} className='mr-5'>
                            <SiWhatsapp size={45} color={'#25d366'} />
                        </Link>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default SingleTour;
