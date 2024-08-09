"use client";

import React, { useEffect, useState } from 'react';
import SingleArticle from "./SingleArticle";
import { Spinner } from '@nextui-org/react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          SortReq: {
            by: 'writtenAt',
            order: 'dsc'
          }
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Fetched articles:', data.articles); // Debugging log
        setArticles(Array.isArray(data.articles) ? data.articles : []);
      } else {
        console.error('Error fetching articles:', data.message); // Debugging log
        setError(data.message || 'Failed to fetch articles');
      }
    } catch (err) {
      console.error('Error:', err); // Debugging log
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div className="flex justify-start flex-col pt-5 h-[80vh] items-center lg:justify-center lg:items-center">
              <Spinner  label="...טוען כתבות" color="secondary" labelColor="secondary" size="lg" />
          </div>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    return <h1>No articles found</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 p-5">
      {articles.map((article) => (
        <SingleArticle
        key={article._id}
        title={article.title}
        source={article.source}
        text={article.text}
        writtenAt={article.writtenAt}
        updatedAt={article.updatedAt}
        image={article.image}
        isArchived={article.isArchived}
        url={article.url}
        />
      ))}
    </div>
  );
};

export default Articles;
