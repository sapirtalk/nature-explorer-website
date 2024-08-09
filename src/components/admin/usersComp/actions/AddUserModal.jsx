'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { PlusIcon } from '../table/PlusIcon';
import { ChevronDownIcon } from '../table/ChevronDownIcon';

const AddUserModal = () => {
    const [message, setMessage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const onClose = () => {
        setModalOpen(false);
        setMessage(null);
    }

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        fromFacebook: false
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
        password: Yup.string().required('שדה חובה'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'הסיסמאות אינן תואמות').required('שדה חובה'),
        role: Yup.string().required('שדה חובה'),
    });

    const onSubmit = async (values, { setSubmitting }) => {

        
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.error) {
                setMessage(data.error);
                setSubmitting(false);
                toast.error(data.error);
                return;
            }
            setSubmitting(false);
            toast.success('משתמש נוסף בהצלחה');
            setModalOpen(false);
            
            // reload the page after 2 seconds
            setTimeout(() => {
                location.reload();
            }, 2000);
            
        } catch (error) {
            setMessage('שגיאה בהוספת משתמש, נסה שוב מאוחר יותר');
            setSubmitting(false);
        }
    };

    return (
        <>
            <Button color="success" onPress={() => setModalOpen(true)} endContent={<PlusIcon />}>
                הוסף משתמש
            </Button>

            {modalOpen &&
                <div>
                    <Modal isOpen={true} onClose={onClose}>
                        <ModalContent dir="rtl">
                            <ModalHeader>משתמש חדש</ModalHeader>
                            <ModalBody>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ isSubmitting, setFieldValue, values }) => (
                                        <Form className="space-y-6">
                                            <div className="flex flex-col">
                                                <label htmlFor="role" className="mb-1 font-medium text-gray-700">הרשאות משתמש</label>
                                                <Dropdown aria-label="Single selection actions">
                                                    <DropdownTrigger className='cursor-pointer'>
                                                        <Button flat className='w-fit'>
                                                            {translateRole(values.role)}
                                                            <ChevronDownIcon />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Single selection actions"
                                                        id ="role"
                                                        name="role"
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        selectedKeys={[values.role]}
                                                        onSelectionChange={(selection) => {
                                                            const role = Array.from(selection).join('');
                                                            setFieldValue('role', role);
                                                        }}
                                                    >
                                                        <DropdownItem key="user">משתמש רגיל</DropdownItem>
                                                        <DropdownItem key="admin">מנהל</DropdownItem>
                                                        <DropdownItem key="editor">עורך</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                                {rolePermissionMsg(values.role)}
                                                <ErrorMessage name="role" component="div" className="text-red-500 text-md mt-1" />
                                            </div>
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
                                            <div className="flex flex-col">
                                                <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">אימות סיסמא</label>
                                                <Field
                                                    type="password"
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
                                                    הוסף משתמש
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
                                    onClick={onClose}
                                >
                                    ביטול
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            }
        </>
    );
};

export default AddUserModal;

const translateRole = (role) => {
    switch (role) {
        case 'user':
            return 'משתמש רגיל';
        case 'admin':
            return 'מנהל';
        case 'editor':
            return 'עורך';
        default:
            return 'משתמש';
    }
}



const rolePermissionMsg = (role) => {
    switch (role) {
        case 'user':
            return <p>אין הרשאות מיוחדות</p>;
        case 'admin':
            return <p>מחיקה\עריכה של כלל הנתונים באתר כולל משתמשים ועורכים</p>;
        case 'editor':
            return <p>מחיקה\עריכה של כלל הנתונים באתר למעט משתמשים</p>;
        default:
            return <p>אין הרשאות מיוחדות</p>;
    }
}

    
