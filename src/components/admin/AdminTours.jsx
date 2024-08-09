"use client";

import React, { useEffect, useState } from 'react';
import AdminSingleTour from "./AdminSingleTour";
import { Spinner, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

const AdminTours = ({ admin , users }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourClock, setTourClock] = useState('');
  const [image, setImage] = useState(null);
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState('');
  const [archivedToursMenu, setArchivedToursMenu] = useState(false);
  const [maxNumOfPeople, setMaxNumOfPeople] = useState(0);
  const [maxNumOfPeoplePerUser, setMaxNumOfPeoplePerUser] = useState(0);

  const setArchivedTours = () => {
    if (archivedToursMenu) {
      setArchivedToursMenu(false);
    } else {
      setArchivedToursMenu(true);
    }
  };

  const fetchTours = async () => {
    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          SortReq: {
            by: 'createdAt',
            order: 'dsc'
          }
        })
      });

      const data = await res.json();

      if (res.ok) {
        setTours(Array.isArray(data.tours) ? data.tours : []);
      } else {
        setError(data.message || 'Failed to fetch tours');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsFormOpen(false);
      const payload = {
        requesterId: admin.id,
        title,
        description,
        tourTime: `${tourDate}T${tourClock}:00.000Z`,
        image: [image],
        whatsappGroupUrl: (whatsappGroupUrl.slice(0, 4) !== 'http') ? 'https://' + whatsappGroupUrl : whatsappGroupUrl, 
        maxNumOfPeople,
        maxNumOfPeoplePerUser
      };

      const res = await fetch('/api/admin_panel/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        toast.success('הסיור נוצר בהצלחה');
        fetchTours();
      } else {
        toast.error('יצירת הסיור נכשלה');
      }
    } catch (err) {
      toast.error('יצירת הסיור נכשלה');
    } finally {
      setTitle('');
      setDescription('');
      setTourDate('');
      setTourClock('');
      setImage(null);
    }
  };

  const today = new Date();
  const sortedTours = tours.filter(tour => new Date(tour.tourTime) > today).sort((a, b) => new Date(a.tourTime) - new Date(b.tourTime));
  const archivedTours = tours.filter(tour => new Date(tour.tourTime) < today);

  if (loading) {
    return (
      <div className="flex justify-start flex-col pt-5 h-[80vh] items-center lg:justify-center lg:items-center">
        <Spinner label="...טוען סיורים" color="secondary" labelColor="secondary" size="lg" />
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!Array.isArray(tours) || tours.length === 0) {
    return <h1>No tours found</h1>;
  }

  return (
    <div className="grid" dir='rtl'>
      <div>
      <div className="flex items-center justify-center my-3">
      <button className="bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary" onClick={() => setIsFormOpen(true)}>
            צור סיור חדש
          </button>
        </div>

        {isFormOpen && (
          <Modal dir='rtl' isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
            <ModalContent>
              <ModalHeader>
                <h2 className="text-base font-semibold leading-7 text-gray-900">יצירת סיור חדש</h2>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}>
                  <div className="space-y-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                          שם הסיור
                        </label>
                        <div>
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="tourDate" className="block text-sm font-medium leading-6 text-gray-900">
                          תאריך הסיור
                        </label>
                        <div>
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="date"
                              name="date"
                              type="date"
                              value={tourDate}
                              onChange={(event) => setTourDate(event.target.value)}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="tourClock" className="block text-sm font-medium leading-6 text-gray-900">
                          שעת הסיור
                        </label>
                        <div>
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="time"
                              name="time"
                              type="time"
                              value={tourClock}
                              onChange={(event) => setTourClock(event.target.value)}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                          תיאור
                        </label>
                        <div>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                          מספר משתתפים מקסימלי בסיור
                        </label>
                        <div>
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              value={maxNumOfPeople}
                              onChange={(event) => setMaxNumOfPeople(event.target.value)}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                          מספר משתתפים מקסימלי למשתמש
                        </label>
                        <div>
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              value={maxNumOfPeoplePerUser}
                              onChange={(event) => setMaxNumOfPeoplePerUser(event.target.value)}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="whatsappGroupUrl" className="block text-sm font-medium leading-6 text-gray-900">
                          קישור לקבוצת וואטסאפ
                        </label>
                        <div>
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="url"
                              name="url"
                              type="text"
                              value={whatsappGroupUrl}
                              onChange={(event) => setWhatsappGroupUrl(event.target.value)}
                              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-full">
                        {!image ? (
                          <div>
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                          תמונה
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                          <input
                            type="file"
                            id="photo"
                            name="photo"
                            alt='tour image'
                            onChange={(event) => {
                              const file = event.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64String = reader.result;
                                  setImage(base64String);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                        </div>
                        ) : (
                          <div className="col-span-full">
                            <h3 className="block text-sm font-medium leading-6 text-gray-900">תמונה</h3>
                              <div className="flex flex-wrap">
                                  <div key={0} className="relative m-2">
                                  <img src={image} alt="Tour" className="rounded-lg" style={{ width: 100, height: 100 }} />
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    onClick={() => setImage(null)}
                                    >
                                      X
                                    </button>
                                  </div>
                              </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <ModalFooter>
                    <Button type="button" className='bg-red-500 hover:opacity-50 p-2 rounded-lg text-primary' onClick={() => setIsFormOpen(false)}>ביטול</Button>
                    <Button type="submit" className='bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary'>שמור שינויים</Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>
      <div className="overflow-auto max-h-[81vh]">
      <div className='grid gap-10 grid-cols-3 p-5 w-full'>
      {sortedTours.map((tour) => (
          <AdminSingleTour
            key={tour._id}
            tour_id={tour._id}
            title={tour.title}
            description={tour.description}
            tourTime={tour.tourTime}
            registeredUsers={tour.registeredUsers}
            registeredUsersCount={tour.registeredUsersCount}
            isArchived={tour.isArchived}
            image={tour.image}
            createdAt={tour.createdAt}
            updatedAt={tour.updatedAt}
            whatsappGroupUrl={tour.whatsappGroupUrl}
            maxNumOfPeople={tour.maxNumOfPeople}
            maxNumOfPeoplePerUser={tour.maxNumOfPeoplePerUser}
            users={users}
            admin={admin}
            fetchTours={fetchTours}
          />
        ))}
      </div>
      <div className='flex items-center justify-center my-3'>
      <button className="bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary" onClick={() => setArchivedTours()}>
            סיורי עבר
      </button>
      </div>
      {archivedToursMenu && (
        <div>
      <div className='border-2 border-tertiary'></div> 
      {archivedTours.length > 0 ? (
        <div>
          <div className='text-2xl text-center mt-5'>
            <h1>סיורי עבר</h1>
          </div>
        </div>
      ) : (
        <div>
          <div className='text-2xl text-center mt-5'>
            <h1>אין סיורי עבר</h1>
          </div>
        </div>
      )}
        <div className="grid overflow-auto max-h-[81vh] gap-10 grid-cols-3 p-5 w-full">
          {archivedTours.map((tour) => (
            <AdminSingleTour
              key={tour._id}
              tour_id={tour._id}
              title={tour.title}
              description={tour.description}
              tourTime={tour.tourTime}
              registeredUsers={tour.registeredUsers}
              registeredUsersCount={tour.registeredUsersCount}
              isArchived={tour.isArchived}
              image={tour.image}
              createdAt={tour.createdAt}
              updatedAt={tour.updatedAt}
              whatsappGroupUrl={tour.whatsappGroupUrl}
              maxNumOfPeople={tour.maxNumOfPeople}
              maxNumOfPeoplePerUser={tour.maxNumOfPeoplePerUser}
              admin={admin}
              users = {users}
              fetchTours={fetchTours}
            />
          ))}
        </div>
      </div>
      )}
    </div>
    </div>
  );
};

export default AdminTours;


