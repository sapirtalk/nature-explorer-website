'use client';

import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import logo from '../../public/resources/images/logo/logo.png';

const SingleTour = ({ tour_id, title, description, tourTime, registeredUsers, registeredUsersCount, image }) => {
    const [user, setUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [registeredUsersCount1, setRegisteredUsersCount] = useState(registeredUsersCount);
    const [isProcessing, setIsProcessing] = useState(false);

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
            numberOfPeople: numberOfPeople
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
                setIsRegistered(true);
                setRegisteredUsersCount(prevCount => parseInt(prevCount) + parseInt(numberOfPeople)); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        } finally {
            setIsProcessing(false);
            handleCloseForm();
        }
    };

    const handleCancel = async () => {
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
                alert('Registration canceled');
                setIsRegistered(false);
                setRegisteredUsersCount(prevCount => prevCount - result.existingPeopleCount);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during cancellation.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div dir="rtl">
            <Card className="lg:w-[21vw] lg:h-[26vh] flex flex-col ">
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
                            <p className="text-xs text-default-500">
                                תאריך הסיור: &nbsp;
                                {new Date(tourTime).toLocaleDateString()} 
                            </p>
                            <p className="text-xs text-default-500">
                                שעת הסיור: &nbsp;
                                {new Date(tourTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-xs text-default-500">
                                מספר משתתפים: {registeredUsersCount1}
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
                    {user == null ? (
                        <div>
                            ההתחבר/הרשם לאתר כדי להירשם לסיור
                        </div>
                    ) : (
                        <div>
                            {!isFormOpen && !isRegistered && (
                                <button disabled={isProcessing} className='bg-blue p-2 rounded-lg text-primary' onClick={handleOpenForm}>הרשמה לסיור</button>
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
                                        <button disabled={isProcessing} type="submit" className='bg-blue p-2 rounded-lg text-primary mr-5'>הרשמה</button>
                                        <IoMdClose onClick={handleCloseForm} className='text-4xl text-text cursor-pointer mr-5' />
                                    </form>
                                </div>
                            )}
                            {isRegistered && (
                                <button disabled={isProcessing} className='bg-red p-2 rounded-lg text-primary' onClick={handleCancel}>ביטול הרשמה</button>
                            )}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default SingleTour;
