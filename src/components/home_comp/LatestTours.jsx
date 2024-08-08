"use client";

import React, { useEffect, useState } from 'react';
import SingleTour from '../SingleTour';
import { Spinner } from '@nextui-org/react';

const LatestTours = () => {
  const [latestTours, setLatestTours] = useState([]);
  const [error, setError] = useState(null);
  const [currentToursIndex, setCurrentToursIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToursIndex((prevIndex) =>
        prevIndex === latestTours.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [latestTours.length]);

  useEffect(() => {
    const fetchLatestTours = async () => {
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
          const tours = Array.isArray(data.tours) ? data.tours : [];
          setLatestTours(tours);
        } else {
          setError(data.message || 'Failed to fetch tours');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTours();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center flex-col pt-5 h-[30vh] items-center">
        <Spinner label="...טוען סיורים" color="secondary" labelColor="secondary" size="lg" />
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!Array.isArray(latestTours) || latestTours.length === 0) {
    return <h1>No tours found</h1>;
  }

  const today = new Date();

  const sortedTours = latestTours.filter(tour => new Date(tour.tourTime) > today).sort((a, b) => new Date(a.tourTime) - new Date(b.tourTime));

  const tours = sortedTours.map((tour) => (
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
    />
  ));

  return (
    <div className="flex justify-center p-5">
      <div className="w-full max-w-7xl">
        <h1 className="mb-2 text-2xl text-center">סיורים קרובים</h1>
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-10" dir='rtl'>
          {tours.slice(0, 3)}
        </div>
        <div className="lg:hidden">
          {tours[currentToursIndex]}
        </div>
      </div>
    </div>
  );
};

export default LatestTours;
