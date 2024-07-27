




'use client';

import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from '@nextui-org/react';
import { toast } from 'react-toastify';

const DeleteTrailModal = ({trail , closeCallback , adminId}) => {

    const onClose = () => {
        closeCallback({modal :"none" , trail : null});
    }

    const onDelete = async () => {
        try {
            const response = await fetch('/api/admin_panel/trails', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requesterId: adminId,
                    trailId: trail._id,
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
                toast.info('מסלול נמחק בהצלחה');
                closeCallback({type :"none" , user : null});
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }

        } catch (error) {
            toast.error('שגיאה במחיקת מסלול, נסה שנית מאוחר יותר');
        }
        
    }

    return (
        <>
        <div>
            <Modal isOpen={true} onClose={onClose}>
                <ModalContent dir="rtl">
                    <ModalHeader>בכוונתך למחוק את מסלול {trail.name}</ModalHeader>
                    <ModalBody>
                        <p>האם אתה בטוח שברצונך למחוק את מסלול?</p>
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
                            מחק את מסלול לצמיתות
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        </>
    );
};

export default DeleteTrailModal;

    
