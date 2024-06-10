

'use client'

import React, { use, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import HelloRegister from './HelloRegister';

const Register = () => {
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    fistName: '',
    lastName: '',
    fromFacebook: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('שדה חובה'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('שדה חובה'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'הסיסמאות אינן תואמות')
      .required('שדה חובה'),
    firstName: Yup.string().required('שדה חובה'),
    lastName: Yup.string().required('שדה חובה'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then((res) => res.json()).then((data) => {
        if (data.error) {
          setMessage(data.error);
          setSubmitting(false);
          toast.error(data.error);
          return;
        }
        setFirstName(values.firstName);
        setMessage(data.message);
        setSubmitting(false);
        toast.success('נרשמת בהצלחה!');
      });
    } catch (error) {
      setMessage('Error registering user');
      setSubmitting(false);
    }
    
  };

  if (firstName !== '') {
    return (
      <div className="max-w-md h-full mx-auto mt-10 p-6">
          <HelloRegister firstName={firstName} />
      </div>
    );
  }

  return (
    <div dir='rtl' className="max-w-md h-full mx-auto mt-10 p-6">
      <h1 className="text-2xl text-center mb-6">הרשמה</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium text-gray-700">אימייל</label>
              <Field
                type="email"
                name="email"
                placeholder="name@email.com"
                id="email"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 font-medium text-gray-700">סיסמא</label>
              <Field
                type="text"
                name="password"
                id="password"
                placeholder="******"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="mb-1 font-medium text-gray-700">אימות סיסמא</label>
                <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="******"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-1 font-medium text-gray-700">שם פרטי</label>
                <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="שם פרטי"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-1 font-medium text-gray-700">שם משפחה</label>
                <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="שם משפחה"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="fromFacebook"
                id="fromFacebook"
                className="mr-2"
              />
              <label htmlFor="fromFacebook" className="text-gray-700 pr-2">הגעת לכאן דרך קבוצת הפייסבוק?</label>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                לסיום הרשמה
              </button>
            </div>
            <div className="flex items-center justify-start">
                <p className='text-[13px]'>*בלחיצה על סיום ההרשמה אני מאשר כי קראתי את תקנון האתר ואני מסכים לתנאים הרשומים שם.</p>
            </div>
            <div className="text-center">
                <a href="/login" className="text-blue-500 hover:underline">כבר רשום? התחבר כאן</a>
            </div>
            {message && <div className="text-red-500 text-sm mt-1">{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
