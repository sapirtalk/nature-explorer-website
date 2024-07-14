'use client';

import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserSettings = ({ userEmail, userId, cookieCallback, firstName, lastName }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [clickedDelete, setClickedDelete] = useState(false);
    const [clickedEdit, setClickedEdit] = useState(false);
    const [password, setPassword] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [message, setMessage] = useState('');

    const initialValues = {
        email: userEmail,
        old_password: '',
        password: '',
        confirmPassword: '',
        firstName: firstName,
        lastName: lastName,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
        old_password: Yup.string().min(6, 'ססמא חייבת להיות לפחות 6 תווים').required('שדה חובה'),
        password: Yup.string()
            .min(6, 'ססמא חייבת להיות לפחות 6 תווים')
            .notRequired()
            .test('passwords-match', 'סיסמא חייבת להיות לפחות 6 תווים', function (value) {
                const { confirmPassword } = this.parent;
                if (confirmPassword && confirmPassword.length > 0) {
                    return value && value.length >= 6;
                }
                return true;
            }),
        confirmPassword: Yup.string()
            .min(6, 'ססמא חייבת להיות לפחות 6 תווים')
            .oneOf([Yup.ref('password'), null], 'הסיסמאות אינן תואמות')
            .notRequired()
            .test('passwords-match', 'סיסמא חייבת להיות לפחות 6 תווים', function (value) {
                const { password } = this.parent;
                if (password && password.length > 0) {
                    return value && value.length >= 6;
                }
                return true;
            }),
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
    });
    
    

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('/api/user_panel/information', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    old_password: values.old_password,
                    updatedFields: {
                        email: values.email,
                        password_hash: values.password === '' ? null : values.password,
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
            else if (data.message === 'Incorrect password') {
                setMessage('הססמא הנוכחית אינה נכונה');
                toast.error('הססמא הנוכחית אינה נכונה');
            }
            else {
                setMessage('המשתמש עודכן בהצלחה');
                toast.success('המשתמש עודכן בהצלחה');
                await cookieCallback('user', JSON.stringify(data.updatedUser), 'set');

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

    const onDelete = async () => {
        try {
            const response = await fetch('/api/user_panel/information', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId, password_hash: password })
            });

            const data = await response.json();

            if (data.success) {
                setClickedDelete(false);
                await cookieCallback('user', null, 'remove');
                await cookieCallback('rememberMe', null, 'remove');
                toast.info('המשתמש נמחק בהצלחה');
                window.location.replace('/login');
            } else {
                toast.error('נסה שנית, סיסמא שגויה');
            }
        } catch (error) {
            toast.error('שגיאה בעת מחיקת משתמש');
        }
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger className="cursor-pointer">
                    <Button 
                        className="cursor-pointer hover:underline flex flex-row justify-center items-center"
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered ? (
                            <IoSettingsSharp className="text-[#1877F2] text-[30px]" />
                        ) : (
                            <IoSettingsOutline className="text-[30px]" />
                        )}
                        <p className="hidden lg:flex text-text px-2 text-[18px]">הגדרות משתמש</p>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={() => setClickedEdit(true)} endContent={<MdEdit className="text-xl text-[#1877F2]" />} key="edit profile">
                        ערוך פרופיל
                    </DropdownItem>
                    <DropdownItem 
                        onClick={() => setClickedDelete(true)} 
                        endContent={<MdDelete className="text-xl text-red-500" />} 
                        key="delete" 
                        className="text-red w-full flex flex-row" 
                        color="danger"
                    >
                        מחק משתמש
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {clickedEdit && (
                <Modal isOpen={clickedEdit} onClose={() => setClickedEdit(false)}>
                    <ModalContent dir="rtl">
                        <ModalHeader>עריכת פרופיל</ModalHeader>
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
                                            <label htmlFor="old_password" className="mb-1 font-medium text-gray-700">סיסמא נוכחית</label>
                                            <Field
                                                type="password"
                                                name="old_password"
                                                id="old_password"
                                                placeholder="******"
                                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                            <ErrorMessage name="old_password" component="div" className="text-red-500 text-sm mt-1" />
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
                                            <label htmlFor="password" className="mb-1 font-medium text-gray-700">סיסמא חדשה - לא חובה</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="******"
                                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">אימות סיסמא חדשה</label>
                                            <Field
                                                type="text"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="******"
                                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
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
                                onClick={() => setClickedEdit(false)}
                            >
                                סגור
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {clickedDelete && (
                <Modal isOpen={clickedDelete} onClose={() => setClickedDelete(false)}>
                    <ModalContent dir="rtl">
                        <ModalHeader>מחיקת משתמש</ModalHeader>
                        <ModalBody>
                            <p>האם אתה בטוח שברצונך למחוק את המשתמש {userEmail}?</p>
                            <p>המשתמש ימחק לחלוטין ולא יהיה ניתן לשחזר אותו</p>
                            <p>כדי למחוק את המשתמש, הקש את הססמא שלך</p>
                            <Input clearable className="w-full" id="password" label="ססמא" placeholder="הקש את הססמא שלך" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <Button auto color="danger" onClick={() => setClickedDelete(false)}>לא</Button>
                            <Button auto color="error" onClick={onDelete}>כן</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export default UserSettings;
