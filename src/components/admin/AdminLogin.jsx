'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import HelloLogin from '../login_comp/HelloLogin';
import { toast } from 'react-toastify';
import { Spinner } from '@nextui-org/react';

const AdminLogin = ({loginCallback}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  const [user, setUser] = useState(null);

  
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('אימייל לא תקין').required('שדה חובה'),
    password: Yup.string().min(4, 'סיסמא לא תקינה').required('שדה חובה'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission

    const { email, password } = values;

    fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.error) {
          setBadLogin(true);
          toast.error('אימייל או סיסמא לא נכונים');
          setSubmitting(false); // Add this line to stop the spinner on error
          return;
        }
        else if (data.user.role !== 'admin' && data.user.role !== 'editor') {
          setBadLogin(true);
          toast.error('אין לך הרשאות מתאימות');
          setSubmitting(false); // Add this line to stop the spinner on error
          return;
        }
        await loginCallback(data.user);
        setUser(data.user);
        toast.success(`ברוך הבא ${data.user.role}`);
        setSubmitting(false); // Add this line to stop the spinner on success
      })
      .catch((error) => {
        console.error('Login error', error);
        toast.error('אופס! משהו השתבש... נסה שוב מאוחר יותר');
        setSubmitting(false); // Add this line to stop the spinner on error
      });

  };

  
  
    return (
      <div dir='rtl' className="max-w-md lg:w-[50vw]  h-full mx-auto mt-10 p-6">
        <h1 className="text-2xl text-center mb-6">התחברות לפאנל מנהלים</h1>
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
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="******"
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
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex justify-center items-center"
                >
                  {isSubmitting ? <Spinner color='white' size='sm' /> : 'כנס/י'}
                </button>
                {badLogin && <div className="text-red-500 text-sm mt-1">אימייל או סיסמא לא נכונים</div>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
};

export default AdminLogin;
