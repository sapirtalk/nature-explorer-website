"use client";

import React, { useEffect, useState } from 'react';
import AdminSingleTour from "./AdminSingleTour";
import { Spinner } from '@nextui-org/react';


const AdminTours = ({ admin }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourClock, setTourClock] = useState('');
  const [image, setImage] = useState(null);

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

  if (loading) {
    return <div className="flex justify-start flex-col pt-5 h-[80vh] items-center lg:justify-center lg:items-center">
              <Spinner  label="...טוען סיורים" color="secondary" labelColor="secondary" size="lg" />
          </div>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  if (!Array.isArray(tours) || tours.length === 0) {
    return <h1>No tours found</h1>;
  }

  const handleSubmit = async () => {
    try {
      setIsFormOpen(false);
      const payload = {
        requesterId: admin.id,
        title,
        description,
        tourTime: `${tourDate}T${tourClock}:00.000Z`,
        image: [image]
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
        alert('Tour created successfully');
        fetchTours();
      } else {
        alert('Failed to create tour');
      }
    } catch (err) {
      alert('Failed to create tour');
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


  return (
    <div className="flex grid" dir='rtl'>
      <div className='mb-10 mt-5'>
        <div className=' flex items-center justify-center'>
        {!isFormOpen && (
          <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary" onClick={() => setIsFormOpen(true)}>
            צור סיור חדש
          </button>
        </div>
        )}
        </div>
        {isFormOpen && (
          <form>
            <div className="space-y-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">יצירת סיור חדש</h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              שם הסיור
                          </label>
                          <div>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                  id="title"
                                  name="title"
                                  type="text"
                                  value={title}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    setTitle(value);
                                  }}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  />
                              </div>
                          </div>
                      </div>
                      <div className="sm:col-span-4">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              תאריך הסיור
                          </label>
                          <p className="flex text-xs text-default-500">
                          </p>
                          <div>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                  id="date"
                                  name="date"
                                  type="date"
                                  value={tourDate}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    setTourDate(value);
                                  }}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  />
                              </div>
                          </div>
                      </div>
                      <div className="sm:col-span-4">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              שעת הסיור
                          </label>
                          <div>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                  id="time"
                                  name="time"
                                  type="time"
                                  value={tourClock}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    setTourClock(value);
                                  }}
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
                            className="block w-[32%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            value={description}
                            onChange={(event) => {
                              const value = event.target.value;
                              setDescription(value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-span-full">
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
                      <div className="col-span-full">
                          <div className="mt-2 flex items-center gap-x-3">
                              <button
                              type="button"
                              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              onClick={() => handleSubmit()}
                              >
                                שמור
                              </button>
                              <button
                              type="button"
                              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              onClick={() => setIsFormOpen(false)}
                              >
                                ביטול
                              </button>
                          </div>
                      </div>
              </div>ֿ
            </div>
        </form>
        )}

      </div>
      <div className=" grid grid-cols-1 gap-10 lg:grid-cols-4 xl:grid-cols-3 w-full max-w-7xl">
        {!isFormOpen && (
        sortedTours.map((tour) => (
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
            admin = {admin}
            fetchTours={fetchTours}
          />
        ))
        )}

      </div>
    </div>
  );
};

export default AdminTours;