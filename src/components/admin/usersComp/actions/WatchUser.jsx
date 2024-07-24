'use client';

import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from '@nextui-org/react';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const WatchUser = ({user , closeCallBack}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const onClose = () => {
        setModalOpen(false);
        closeCallBack({type :"none" , user : null});
    }

    return (
        <>
        <div>
            <Modal isOpen={true} onClose={onClose}>
                <ModalContent dir="rtl">
                    <ModalHeader>פרטי משתמש</ModalHeader>
                    <ModalBody>
                        <p>שם משתמש: {user.firstName} {user.lastName}</p>
                        <p>כתובת מייל: {user.email}</p>
                        <span className='flex flex-row justify-start'>    
                        {showPassword && <p className='ml-2'>סיסמא: {user.password_hash}</p>}
                        {!showPassword && <p className='ml-2'>סיסמא: ********</p>}
                        {!showPassword && <IoIosEye className='cursor-pointer hover:opacity-50' onClick={() => setShowPassword(true)} size={25} />}
                        {showPassword && <IoIosEyeOff className='cursor-pointer hover:opacity-50' onClick={() => setShowPassword(false)} size={25} />}
                        </span>
                        <p>תפקיד: {translateRole(user.role)}</p>
                        <p>הרשאות: {rolePermissionMsg(user.role)}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            auto
                            flat
                            color="error"
                            onClick={onClose}
                        >
                            סגור
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        </>
    );
};

export default WatchUser;

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

    
