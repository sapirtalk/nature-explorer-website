"use client";

import React, { useEffect, useState } from 'react';
import AdminSingleArticle from "./AdminSingleArticle";
import { Spinner } from '@nextui-org/react';
import { toast } from 'react-toastify';

const AdminArticles = ({ admin }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [source, setSource] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [writtenAt, setWrittenAt] = useState('');
  const [image, setImage] = useState('');


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

  const handleSubmit = async () => {
    try {
      setIsFormOpen(false);
      const payload = {
        requesterId: admin.id,
        source,
        title,
        text,
        url: (url.slice(0, 4) !== 'http') ? 'https://' + url : url,
        writtenAt,
        image: [image]
      };
  
      const res = await fetch('/api/admin_panel/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
  
      if (data.success) {
        toast.success('הכתבה נוצרה בהצלחה');
        fetchArticles();
      } else {
        toast.error('נכשל ביצירת הכתבה');
      }
    } catch (err) {
        toast.error('נכשל ביצירת הכתבה');
    } finally {
        setSource('');
        setTitle('');
        setText('');
        setUrl('');
        setWrittenAt('');
        setImage(null);
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
    <div dir='rtl'>
        {!isFormOpen && (
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary" onClick={() => setIsFormOpen(true)}>
                    הוסף כתבה חדשה
                </button>
            </div>
        )}
        {!isFormOpen && (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 p-5">
            {articles.map((article) => (
                <AdminSingleArticle
                key={article._id}
                title={article.title}
                source={article.source}
                text={article.text}
                writtenAt={article.writtenAt}
                updatedAt={article.updatedAt}
                image={article.image}
                isArchived={article.isArchived}
                url={article.url}
                admin={admin}
                article_id={article._id}
                fetchArticles={fetchArticles}
                />
            ))}
        </div>
        )}
        {isFormOpen && (
          <form>
            <div className="space-y-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">הוספת כתבה חדשה</h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              כותרת הכתבה
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
                              מקור הכתבה
                          </label>
                          <div>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                  id="title"
                                  name="title"
                                  type="text"
                                  value={source}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    setSource(value);
                                  }}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  />
                              </div>
                          </div>
                      </div>
                      <div className="sm:col-span-4">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                              נכתב ב-
                          </label>
                          <p className="flex text-xs text-default-500">
                          </p>
                          <div>
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <input
                                  id="date"
                                  name="date"
                                  type="date"
                                  value={writtenAt}
                                  onChange={(event) => {
                                    const value = event.target.value;
                                    setWrittenAt(value);
                                  }}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  />
                              </div>
                          </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                          תיאור
                        </label>
                        <div>
                          <textarea
                            id="text"
                            name="text"
                            rows={3}
                            className="block w-[32%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            value={text}
                            onChange={(event) => {
                              const value = event.target.value;
                              setText(value);
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
                      <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                קישור לכתבה
                            </label>
                            <div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                    id="url"
                                    name="url"
                                    type="text"
                                    value={url}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setUrl(value);
                                    }}
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
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
  );
};

export default AdminArticles;
