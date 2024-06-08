

'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
    password: Yup.string().min(6, 'סיסמא לא תקינה').required('שדה חובה'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log('Form data', values);
    setSubmitting(false);
  };

  return (
    <div dir='rtl' className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl text-center mb-6">התחברות</h1>
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
                id="email"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 font-medium text-gray-700">סיסמא</label>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
                <div className="flex justify-end items-center mt-1">
                <input
                    type="checkbox"
                    id="showPassword"
                    className="mr-2"
                    onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword" className="text-gray-700 pr-2">הצג סיסמא</label>
                </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700 pr-2">תזכור אותי</label>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                כנס/י
              </button>
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-500 hover:underline">שכחת את הסיסמא?</a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
