'use client';


import {  Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditUser = ({ user, adminId , closeCallBack }) => {

    const [message, setMessage] = useState('');

    const initialValues = {
        email: user.email,
        password: user.password_hash,
        firstName: user.firstName,
        lastName: user.lastName,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
        password: Yup.string().min(6, 'ססמא חייבת להיות לפחות 6 תווים').required(),
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
    });
    
    

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('/api/admin_panel/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requesterId: adminId,
                    userId: user._id,
                    updatedFields: {
                        email: values.email,
                        password_hash: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                    }
                }),
            });

            const data = await response.json();
            if (data.error) {
                setMessage(data.error);
                toast.error(data.error);    
            }
            else if (data.success === false) {
                setMessage(data.message);
                toast.error(data.message);
            }
            else {
                setMessage('המשתמש עודכן בהצלחה');
                toast.success('המשתמש עודכן בהצלחה');

                closeCallBack({type :"none" , user : null});
                setTimeout(() => {
                    window.location.reload();                
                }, 2000);
    
            }
        } catch (error) {
            setMessage('שגיאה בעת עריכת משתמש');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
    
        <Modal isOpen={true} onClose={() => closeCallBack({type :"none" , user : null})}>
            <ModalContent dir="rtl">
                <ModalHeader>עריכת משתמש</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="mb-1 font-medium text-gray-700">אימייל</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="name@email.com"
                                        id="email"
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="firstName" className="mb-1 font-medium text-gray-700">שם פרטי</label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="שם פרטי"
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="lastName" className="mb-1 font-medium text-gray-700">שם משפחה</label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="שם משפחה"
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="mb-1 font-medium text-gray-700">סיסמא</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="******"
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <Button
                                        auto
                                        disabled={isSubmitting}
                                        flat
                                        color="success"
                                        type="submit"
                                    >
                                שמור שינויים
                                    </Button>
                                </div>
                                {message && <div className="text-red-500 text-sm mt-1">{message}</div>}
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <Button
                        auto
                        flat
                        color="error"
                        onClick={() => closeCallBack({type: "none", user: null})}
                    >
                        ביטול
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default EditUser;
