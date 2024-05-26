
"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import { fetchData , formatTime } from '@/utils';
import { news } from '../../styles/tailwindSaved'



const LatestNews = () => {

  const [newsItems, setNewsItems ] = useState([]);

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);


  

  useEffect(() => {
    fetchData('/api/admin_news')
    .then((data) => {
      console.log('Data fetched:', data.news);
      setNewsItems(data.news.map((newsItem) => (
        <div key={newsItem._id}>
          <h2>{newsItem.title}</h2>
          <p>{newsItem.description}</p>
          <p>{formatTime(newsItem.date)}</p>
        </div>
      ))
      )
    })
    .catch((error) => {
      console.log('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) =>
        prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div dir="rtl" className={news.latest_container}>
      <h1 className={news.latest_title}>הודעות אחרונות:</h1>
      <div className={news.latest_news}>
        {newsItems[currentNewsIndex]}
      </div>
    </div>
  );

}

export default LatestNews