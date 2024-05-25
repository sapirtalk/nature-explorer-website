
"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import { news } from '../../styles/tailwindSaved'



const LatestNews = ({ newsItems }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

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