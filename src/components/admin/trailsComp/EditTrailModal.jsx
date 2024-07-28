'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea , Input, CheckboxGroup, Checkbox} from '@nextui-org/react';
import { ChevronDownIcon } from '../usersComp/table/ChevronDownIcon';
import { FaRegClock , FaRegImages } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";



const EditTrailModal = ({adminId , trail , closeCallback }) => {
    const [message, setMessage] = useState(null);
    const oldImages = trail.image;

    const onClose = () => {
        closeCallback( { modal : "none" , trail : null } );
        setMessage(null);
    }

    const initialAccessibility = () => {
        let arr = [];
        if (trail.petsFriendly) arr.push('petsFriendly');
        if (trail.babyStrollerFriendly) arr.push('babyStrollerFriendly');
        if (trail.kidsFriendly) arr.push('kidsFriendly');
        return arr
    }

    const initialValues = {
        difficulty: String(trail.difficulty),
        name: trail.name,
        duration: Number(trail.duration),
        distance: Number(trail.distance),
        accessibility: initialAccessibility(),
        description: trail.description,
        image: trail.image,
    };


    console.log("initialValues" , initialValues);

    const validationSchema = Yup.object({
        name: Yup.string().required('שדה חובה'),
        difficulty: Yup.string().required('שדה חובה'),
        duration: Yup.number()
            .moreThan(0.4, 'המשך חייב להיות לפחות 0.5 שעות')
            .required('שדה חובה'),
        distance: Yup.number()
            .moreThan(0.4, 'מרחק חייב להיות לפחות 0.5 ק"מ')
            .required('שדה חובה'),
        description: Yup.string().required('שדה חובה'),
    });

    const onSubmit = async (values, { setSubmitting }) => {


        const valuesBody = {
            requesterId: adminId,
            trailId : trail._id,
            updatedFields: {
                name: values.name,
                difficulty: Number(values.difficulty),
                location: '',
                distance: values.distance,
                duration: values.duration,
                description: values.description,
                newImages: values.image,
                removeImages: oldImages,
                petsFriendly: values.accessibility.includes('petsFriendly'),
                babyStrollerFriendly: values.accessibility.includes('babyStrollerFriendly'),
                kidsFriendly: values.accessibility.includes('kidsFriendly'),
            }
        }
        
        try {
            const response = await fetch('/api/admin_panel/trails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valuesBody),
            });
            const data = await response.json();
            if (!data.success) {
                setMessage(data.message);
                setSubmitting(false);
                toast.error(data.message);
                return;
            }
            setSubmitting(false);
            toast.success('מסלול עודכן בהצלחה');

            onClose();
            
            // reload the page after 2 seconds
            setTimeout(() => {
                location.reload();
            }, 2000);
            
        } catch (error) {
            setMessage('שגיאה בעדכון המסלול, נסה שוב מאוחר יותר');
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Modal placement='top' size='3xl' isOpen={true} onClose={onClose}>
                <ModalContent dir="rtl">
                    <ModalHeader>ערוך מסלול</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ isSubmitting, setFieldValue, values }) => (
                                <Form className="space-y-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="mb-1 font-medium text-gray-700">שם המסלול</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="שם מסלול"
                                            id="name"
                                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="description" className="mb-1 font-medium text-gray-700">תיאור המסלול</label>
                                        <Textarea 
                                            name="description"
                                            value={values.description} 
                                            id="description" 
                                            placeholder="תיאור המסלול"
                                            onChange={(e) => setFieldValue('description', e.target.value)} 
                                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="flex flex-row justify-around">
                                    <div className="flex flex-col">
                                        <label htmlFor="distance" className="mb-1 font-medium text-gray-700">מרחק</label>
                                        <Input
                                            type="number"
                                            name="distance"
                                            id="distance"
                                            step={0.5}
                                            min={0.5}
                                            value={values.distance}
                                            max={100}
                                            placeholder="0.0"
                                            className="p-2 border border-gray-300 rounded-md focus:outline-none w-[180px] focus:border-blue-500"
                                            startContent = {<GiPathDistance size={30} />}
                                            endContent = {<p>קמ</p>}
                                            onChange={(e) => setFieldValue('distance', e.target.value)}
                                        />  
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="duration" className="mb-1 font-medium text-gray-700">משך</label>
                                        <Input
                                            type="number"
                                            name="duration"
                                            id="duration"
                                            step={0.5}
                                            min={0.5}
                                            max={100}
                                            value={values.duration}
                                            placeholder="0.0"
                                            className="p-2 border border-gray-300 rounded-md focus:outline-none w-[180px] focus:border-blue-500"
                                            startContent = {<FaRegClock size={30} />}
                                            endContent = {<p>שעות</p>}
                                            onChange={(e) => setFieldValue('duration', e.target.value)}
                                        />  
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="difficulty" className="mb-1 font-medium text-gray-700">דרגת קושי</label>
                                        <Dropdown className='bg-gray-200' aria-label="Single selection actions">
                                            <DropdownTrigger className='cursor-pointer'>
                                                <Button size='lg' flat className='w-fit'>
                                                    {translateDifficulty(values.difficulty)}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                color='secondary'
                                                className='w-[180px] text-end'
                                                aria-label="Single selection actions"
                                                id ="difficulty"
                                                name="difficulty"
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={[values.difficulty]}
                                                onSelectionChange={(selection) => {
                                                    const difficulty = Array.from(selection)[0];
                                                    setFieldValue('difficulty', difficulty);
                                                }}
                                            >
                                                <DropdownItem className='text-end' key="1">קל</DropdownItem>
                                                <DropdownItem className='text-end' key="2">בינוני</DropdownItem>
                                                <DropdownItem className='text-end' key="3">קשה</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        
                                    </div>
                                    <div className="flex flex-col">
                                        <ErrorMessage name="distance" component="div" className="text-red-500 text-sm mt-1" />
                                        <ErrorMessage name="difficulty" component="div" className="text-red-500 text-md mt-1" />
                                        <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="image" className="mb-1 font-medium text-gray-700">תמונות (לא חובה)</label>
                                        <p className="text-gray-500">*התמונה הראשונה תהיה בכרטיס הראשי של המסלול</p>
                                        <Button endContent = {<FaRegImages size={30} />} size="md" color='secondary' className="w-[180px] my-2" onClick={() => document.getElementById('image').click()}>בחר תמונות</Button>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="hidden"
                                            accept="image/jpeg"
                                            multiple
                                            onChange={(event) => {
                                                const files = event.target.files;
                                                const fileArray = Array.from(files);
                                                const promises = fileArray.map(file => {
                                                    return new Promise((resolve, reject) => {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        resolve(reader.result);
                                                    };
                                                    reader.onerror = reject;
                                                    reader.readAsDataURL(file);
                                                    });
                                                });
                                                Promise.all(promises).then(base64Strings => {
                                                    setFieldValue('image', [ ...values.image , ...base64Strings]);
                                                });
                                                }}
                                        />
                                        <div className="flex flex-wrap">
                                            {values.image.map((preview, index) => (
                                                <div key={index} className="w-[100px] h-[100px] m-2">
                                                    <button className="text-red-500 hover:opacity-50" onClick={() => setFieldValue('image', values.image.filter((img => img !== preview)))}>
                                                        X
                                                    </button>
                                                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full" />
                                                </div>
                                            ))}
                                        </div>
                                        <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="accessibility" className="mb-1 font-medium text-gray-700">מאפיינים נוספים</label>
                                        <CheckboxGroup
                                            orientation="horizontal"
                                            size='lg'
                                            color="secondary"
                                            name="accessibility"
                                            id="accessibility"
                                            value={values.accessibility}
                                            onChange={(value) => {
                                                setFieldValue('accessibility', value);
                                            }}
                                        >
                                            <Checkbox value="kidsFriendly">מתאים לילדים</Checkbox>
                                            <Checkbox value="petsFriendly">חיות מחמד</Checkbox>
                                            <Checkbox value="babyStrollerFriendly">עגלות</Checkbox>
                                        </CheckboxGroup>
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
                            onClick={onClose}
                        >
                            ביטול
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EditTrailModal;

const translateDifficulty = (difficulty) => {
    switch (difficulty) {
        case "1":
            return 'קל';
        case "2":
            return 'בינוני';
        case "3":
            return 'קשה';
        default:
            return 'קל';
    }
}

