
'use client';

import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from '@nextui-org/react';
import { toast } from 'react-toastify';

const DeleteUser = ({user , closeCallBack , adminId}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const onClose = () => {
        setModalOpen(false);
        closeCallBack({type :"none" , user : null});
    }

    const onDelete = async () => {
        try {
            const response = await fetch('/api/admin_panel/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requesterId: adminId,
                    userId: user._id,
                }),
            });

            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
                return;
            } else if (data.success === false) {
                toast.error(data.message);
                return;
            } else {
                toast.info('המשתמש נמחק בהצלחה');
                closeCallBack({type :"none" , user : null});
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }

        } catch (error) {
            toast.error('שגיאה במחיקת המשתמש, נסה שנית מאוחר יותר');
        }
        
    }

    return (
        <>
        <div>
            <Modal isOpen={true} onClose={onClose}>
                <ModalContent dir="rtl">
                    <ModalHeader>בכוונתך למחוק את המשתמש {user.firstName} {user.lastName}</ModalHeader>
                    <ModalBody>
                        <p>האם אתה בטוח שברצונך למחוק את המשתמש?</p>
                        <p>פעולה זו לא ניתנת לביטול</p>
                    </ModalBody>
                    <ModalFooter className='flex justify-between'>
                        <Button
                            auto
                            flat
                            color="secondary"
                            onClick={onClose}
                        >
                            ביטול
                        </Button>
                        <Button
                        className='text-red-500 bg-transparent'
                            auto
                            flat
                            onClick={onDelete}
                        >
                            מחק את המשתמש לצמיתות
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        </>
    );
};

export default DeleteUser;

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

    
