'use client';

import Image from 'next/image'
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";

const SingleTour = ({ tour_id, title, description, tourTime, registeredUsers, registeredUsersCount, isArchived, image, createdAt, updatedAt }) => {
    const [user, setUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [registeredUsersCount1, setRegisteredUsersCount] = useState(registeredUsersCount);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
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
                alert('Registration successful');
                setIsRegistered(true);  // Update state immediately after successful registration
                setRegisteredUsersCount(prevCount => prevCount + 1);  // Increment registered users count
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        }
        handleCloseForm();
    };

    const handleCancel = async () => {
        if (!user) return;

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
                setIsRegistered(false);  // Update state immediately after successful cancellation
                setRegisteredUsersCount(prevCount => prevCount - 1);  // Decrement registered users count
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during cancellation.');
        }
    };

    return (
        <div dir="rtl">
            <Card className="lg:w-[21vw] lg:h-[25vh] flex flex-col">
                <div className="flex flex-col flex-[2]">
                    <CardHeader className="flex-1">
                        <div className='w-[30%] ml-3'>
                            <Image 
                            src={image[0]}
                            alt={name}
                            width={500}
                            height={500} 
                            className='w-full h-full rounded-r-lg' />
                        </div>
                        <div className="flex flex-col w-full">
                            <header className="text-text font-bold">{title}</header>
                            <p className="text-xs text-default-500">
                                תאריך הסיור: &nbsp;
                                {new Date(tourTime).toLocaleDateString()} 
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                </div>

                <CardBody className="flex-[6]">
                    <p>{description}</p>
                    <p className="text-xs text-default-500">
                        מספר משתתפים: {registeredUsersCount1}
                    </p>
                </CardBody>
                <Divider />
                <CardFooter className="flex-[2] justify-center">
                    {user == null ? (
                        <div>
                            ההתחבר/הרשם לאתר כדי להירשם לסיור
                        </div>
                    ) : (
                        <div>
                            {!isFormOpen && !isRegistered && (
                                <button className='bg-blue p-2 rounded-lg text-primary' onClick={handleOpenForm}>הרשמה לסיור</button>
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
                                        <button type="submit" className='bg-blue p-2 rounded-lg text-primary mr-5'>הרשמה</button>
                                        <IoMdClose onClick={handleCloseForm} className='text-4xl text-text cursor-pointer mr-5' />
                                    </form>
                                </div>
                            )}
                            {isRegistered && (
                                <button className='bg-red p-2 rounded-lg text-primary' onClick={handleCancel}>ביטול הרשמה</button>
                            )}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default SingleTour;
