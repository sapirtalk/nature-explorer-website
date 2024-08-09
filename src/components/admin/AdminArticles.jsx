"use client";

import React, { useEffect, useState } from 'react';
import AdminSingleArticle from "./AdminSingleArticle";
import { Spinner, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';

const AdminArticles = ({ admin }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [source, setSource] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [writtenAt, setWrittenAt] = useState('');
  const [image, setImage] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filter, setFilter] = useState('');

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
        setFilteredArticles(Array.isArray(data.articles) ? data.articles : []);
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

  const handleButtonClick = () => {
    setFilterValue('');
    handleFilter();
  };

  const handleFilter = () => {
    setFilter(filterValue);
    if (filter === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.includes(filter) || article.text.includes(filterValue)
      );
      setFilteredArticles(filtered);
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
        url: (url.slice(0, 4) !== 'http' && url.length !== 0) ? 'https://' + url : url,
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

  useEffect(() => {
    handleFilter();
  }, [filter, articles]);

  if (loading) {
    return <div className="flex justify-start flex-col pt-5 h-[80vh] items-center lg:justify-center lg:items-center">
              <Spinner  label="...טוען כתבות" color="secondary" labelColor="secondary" size="lg" />
          </div>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!Array.isArray(filteredArticles) || filteredArticles.length === 0) {
    return <h1>No articles found</h1>;
  }

  return (
    <div dir='rtl' className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center my-3">
            <button className="bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary ml-60" onClick={() => setIsFormOpen(true)}>
                הוסף כתבה חדשה
            </button>
            <input
                type="text"
                placeholder="חיפוש כתבה"
                className="p-2 rounded-lg text-text ml-3"
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
            />
            <button className="bg-blue-500 hover:opacity-50 p-2 rounded-lg text-primary ml-3" onClick={handleFilter}>
                חיפוש
            </button>
            {filter !== '' && (
                <button className="bg-red-500 hover:opacity-50 p-2 rounded-lg text-primary ml-3" onClick={handleButtonClick}>
                  X
                </button>
            )}
        </div>
        <div className="grid overflow-auto max-h-[81vh] gap-10 grid-cols-3 p-5 w-full">
          {filteredArticles.map((article) => (
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
        <Modal dir='rtl' isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
            <ModalContent>
                <ModalHeader>הוספת כתבה חדשה</ModalHeader>
                <form>
                    <ModalBody>
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                        כותרת הכתבה
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
                                    <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">
                                        מקור הכתבה
                                    </label>
                                    <div>
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="source"
                                                name="source"
                                                type="text"
                                                value={source}
                                                onChange={(event) => setSource(event.target.value)}
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="writtenAt" className="block text-sm font-medium leading-6 text-gray-900">
                                        נכתב ב-
                                    </label>
                                    <div>
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="writtenAt"
                                                name="writtenAt"
                                                type="date"
                                                value={writtenAt}
                                                onChange={(event) => setWrittenAt(event.target.value)}
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
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={text}
                                            onChange={(event) => setText(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                                        קישור לכתבה
                                    </label>
                                    <div>
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="url"
                                                name="url"
                                                type="text"
                                                value={url}
                                                onChange={(event) => setUrl(event.target.value)}
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
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setIsFormOpen(false)}>
                            ביטול
                        </Button>
                        <Button className='bg-customBlue text-primary' onClick={handleSubmit}>
                            שמור
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    </div>
  );
};

export default AdminArticles;
