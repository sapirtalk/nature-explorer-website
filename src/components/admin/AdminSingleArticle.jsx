'use client';

import Image from 'next/image';
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import logo from '../../../public/resources/images/logo/logo.png';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { toast } from 'react-toastify';

const AdminSingleArticle = ({ article_id, title, source, text, writtenAt, image, url, admin, fetchArticles }) => {
    const [clickedDelete, setClickedDelete] = React.useState(false);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [updatedTitle, setUpdatedTitle] = React.useState(title);
    const [updatedSource, setUpdatedSource] = React.useState(source);
    const [updatedText, setUpdatedText] = React.useState(text);
    const [updatedWrittenAt, setUpdatedWrittenAt] = React.useState(new Date(writtenAt).toISOString().split('T')[0]);
    const [updatedImage, setUpdatedImage] = React.useState(image);
    const [pendingRemoveImages, setPendingRemoveImages] = React.useState([]);
    const [updatedUrl, setUpdatedUrl] = React.useState(url);

    const handleImageRemove = (imageUrl) => {
        setPendingRemoveImages([...pendingRemoveImages, imageUrl]);
        setUpdatedImage(updatedImage.filter(img => img !== imageUrl));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUpdatedImage = updatedImage.filter(img => !pendingRemoveImages.includes(img));
        const payload = {
            requesterId: admin.id,
            articleId: article_id,
            updatedFields: {
                title: updatedTitle,
                source: updatedSource, 
                text: updatedText,
                writtenAt: updatedWrittenAt,
                newImages: (image == updatedImage) ? null : newUpdatedImage,
                removeImages: pendingRemoveImages,
                url: (updatedUrl.slice(0, 4) !== 'http') ? 'https://' + updatedUrl : updatedUrl,
            }
        };

        try {
            const response = await fetch('/api/admin_panel/articles', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.success('עדכנת את הכתבה בהצלחה');
                setPendingRemoveImages([]); // Clear pending removals
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('שגיאה בעדכון הכתבה, נסה שנית מאוחר יותר');
        } finally {
            setIsFormOpen(false);
            fetchArticles();
        }
    };



    const handleDelete = async () => {
        setClickedDelete(false);

        const payload = {
            requesterId: admin.id,
            articleId: article_id,
        };

        try {
            const response = await fetch('/api/admin_panel/articles', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                toast.info('מחקת את הכתבה בהצלחה');
                fetchArticles();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('שגיאה במחיקת הכתבה, נסה שנית מאוחר יותר');
        }
    };


    return (
        <div>
                <Card className="lg:w-[21vw] lg:h-[25vh] flex flex-col" dir='rtl'>
                    <CardHeader className="flex flex-col flex-[0_0_40%] overflow-hidden">
                        <div className="flex flex-1">
                            <div className="w-[35%] ml-3">
                                {image.length === 0 ? (
                                    <div>
                                        <Image src={logo} alt='logo' width={500} height={500} />
                                    </div>
                                ) : (
                                    <Image
                                        src={image[0]}
                                        width={500}
                                        height={500}
                                        className='w-full h-full rounded-lg'
                                    />
                                )}
                            </div>
                            <div className="flex flex-col w-full overflow-hidden">
                                <header className="text-text font-bold text-ellipsis overflow-hidden whitespace-nowrap">{title}</header>
                                <p className="text-small text-default-500">{source}</p>
                                <p className="text-xs text-default-500">
                                    נכתב ב: &nbsp;
                                    {new Date(writtenAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex-1 overflow-auto">
                        <p className='text-right'>{text}</p>
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex-shrink-0 h-[20%]">
                        {url ? (
                            <Link
                                isExternal
                                showAnchorIcon
                                href={url}
                                className="text-primary-500"
                            >
                                לכניסה לכתבה
                            </Link>
                        ) : (
                            <p>No URL available</p>
                        )}
                        <div>
                            {clickedDelete && (
                                <Modal isOpen={clickedDelete} onClose={() => setClickedDelete(false)}>
                                    <ModalContent dir="rtl">
                                        <ModalBody>
                                            <p>האם אתה בטוח שברצונך למחוק את הכתבה?</p>
                                            <p>הכתבה תמחק לחלוטין ולא יהיה ניתן לשחזר אותה</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button className='bg primary' onClick={() => setClickedDelete(false)}>לא</Button>
                                            <Button className='bg-customRed text-primary' onClick={handleDelete}>כן</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            )}
                                <Button className='bg-red-500 p-2 rounded-lg text-primary hover:opacity-50 mr-2' onClick={() => setClickedDelete(true)}>מחק כתבה</Button>
                                <Button type="button" className='bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary mr-2' onClick={() => setIsFormOpen(true)}>ערוך כתבה</Button>
                        </div>
                    </CardFooter>
                </Card>
            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
                <ModalContent dir="rtl">
                    <ModalHeader>עריכת כתבה</ModalHeader>
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <div className="space-y-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                            כותרת הכתבה
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
                                        <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">
                                            מקור הכתבה
                                        </label>
                                        <div>
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    id="source"
                                                    name="source"
                                                    type="text"
                                                    value={updatedSource}
                                                    onChange={(e) => setUpdatedSource(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="writtenAt" className="block text-sm font-medium leading-6 text-gray-900">
                                            נכתב ב-
                                        </label>
                                        <div>
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    id="writtenAt"
                                                    name="writtenAt"
                                                    type="date"
                                                    value={updatedWrittenAt}
                                                    onChange={(e) => setUpdatedWrittenAt(e.target.value)}
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                            תוכן הכתבה
                                        </label>
                                        <div>
                                            <div className="mt-2">
                                                <textarea
                                                    id="text"
                                                    name="text"
                                                    rows={3}
                                                    value={updatedText}
                                                    onChange={(e) => setUpdatedText(e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                                            קישור לכתבה
                                        </label>
                                        <div>
                                            <div className="mt-2">
                                                <input
                                                    id="url"
                                                    name="url"
                                                    type="text"
                                                    value={updatedUrl}
                                                    onChange={(e) => setUpdatedUrl(e.target.value)}
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
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" className="hover:opacity-50 text-text rounded-lg" onClick={() => setIsFormOpen(false)}>
                                ביטול
                            </Button>
                            <Button type="submit" className="bg-blue-500 hover:opacity-50 text-primary rounded-lg mr-2">
                                שמור
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AdminSingleArticle;
