'use client';

import React, { useState } from 'react';

// Handles displaying errors on the form
const handleErrors = (errors) => {
  for (let field in errors) {
    if (document.getElementById(`#${field}`)) {
      document.getElementById(`${field}-error`).classList.add('field_error');
    }

    if (document.getElementById(`${field}-error`)) {
      document.getElementById(`${field}-error`).classList.remove('hidden');
      document.getElementById(`${field}-error`).innerHTML = errors[field];
    }
  }
};

// Clears all errors on the form
const clearErrors = () => {
  document.querySelectorAll('.error').forEach((element) => {
    element.classList.add('hidden');
    element.innerHTML = '';
  });

  document.querySelectorAll('.field').forEach((element) => {
    element.classList.remove('field_error');
  });
};

// Form component
const Form = ({ handleSubmit, errors, data }) => {
  const [firstName, setFirstName] = useState(data?.first_name || '');
  const [lastName, setLastName] = useState(data?.last_name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [phone, setPhone] = useState(data?.phone_number || '');

  // Updates the contact details and handles form submission
  const updateContact = (e) => {
    e.preventDefault();
    clearErrors();
    handleSubmit(firstName, lastName, email, phone);
  };

  // Handles displaying errors on initial render
  if (errors) {
    const simplifiedErrors = Object.entries(errors).reduce(
      (acc, [key, value]) => {
        acc[key] = value[0];
        return acc;
      },
      {}
    );
    handleErrors(simplifiedErrors);
  }

  return (
    <main>
      <div className='w-full'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full'
          onSubmit={(e) => updateContact(e)}
        >
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='first_name'
            >
              First Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='first_name'
              type='text'
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <p
              className='text-red-500 text-xs  error hidden'
              id='first_name-error'
            ></p>
          </div>

          {/* ========================================================== */}

          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='last_name'
            >
              Last Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='last_name'
              type='text'
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <p
              className='text-red-500 text-xs  error hidden'
              id='last_name-error'
            ></p>
          </div>

          {/* ========================================================== */}

          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2              px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p
              className='text-red-500 text-xs  error hidden'
              id='email-error'
            ></p>
          </div>

          {/* ========================================================== */}

          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone_number'
            >
              Phone number
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='phone_number'
              type='text'
              placeholder='Phone number'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <p
              className='text-red-500 text-xs  error hidden'
              id='phone_number-error'
            ></p>
          </div>

          <div className='flex items-center justify-between'>
            <button className='btn-primary' type='submit'>
              Update
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
