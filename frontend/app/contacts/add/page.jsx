'use client';
import Form from '@/app/components/Form';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Component for editing a contact.
 */
const EditContact = () => {
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  /**
   * Handles the form submission.
   * @param {string} firstName - The first name of the contact.
   * @param {string} lastName - The last name of the contact.
   * @param {string} email - The email of the contact.
   * @param {string} phone - The phone number of the contact.
   */
  const handleSubmit = async (firstName, lastName, email, phone) => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
    };

    const res = await fetch(`http://localhost:8000/api/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
      return;
    }

    router.refresh();
    router.push('/contacts');
  };

  return (
    <>
      <nav>
        <Link href='/contacts' className='mr-auto'>
          <button className='btn-primary'>Back</button>
        </Link>
      </nav>
      <main style={{ width: '35rem', margin: '0', padding: '0' }}>
        <Form handleSubmit={handleSubmit} errors={errors} />
      </main>
    </>
  );
};

export default EditContact;
