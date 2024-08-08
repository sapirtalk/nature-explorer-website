"use client";

import React, { useEffect, useState } from 'react';
import SingleTour from "./SingleTour";
import { Spinner } from '@nextui-org/react';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const today = new Date();

  const sortedTours = tours.filter(tour => new Date(tour.tourTime) > today).sort((a, b) => new Date(a.tourTime) - new Date(b.tourTime));


  return (
    <div className="flex justify-center" dir='rtl'>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 xl:grid-cols-3 w-full max-w-7xl">
        {sortedTours.map((tour) => (
          <SingleTour
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
            fetchTours={fetchTours}
          />
        ))}
      </div>
    </div>
  );
};

export default Tours;