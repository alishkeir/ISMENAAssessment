'use client';
import Form from '@/app/components/Form';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Component for editing a contact.
 * @param {object} props - The component props.
 * @returns {ReactElement} The rendered component.
 */
const EditContact = (props) => {
  const [errors, setErrors] = useState(null);
  const router = useRouter();

  // Redirect to the contacts page if searchParams data is missing
  if (!props?.searchParams?.data) {
    router.push('/contacts');
  }

  /**
   * Handle form submission.
   * @param {string} firstName - The first name input value.
   * @param {string} lastName - The last name input value.
   * @param {string} email - The email input value.
   * @param {string} phone - The phone number input value.
   */
  const handleSubmit = async (firstName, lastName, email, phone) => {
    const body = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
    };

    const res = await fetch(
      `http://localhost:8000/api/contacts/${props.params.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    // Set errors if any
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
        <Form
          handleSubmit={handleSubmit}
          errors={errors}
          data={JSON.parse(props.searchParams.data)}
        />
      </main>
    </>
  );
};

export default EditContact;
