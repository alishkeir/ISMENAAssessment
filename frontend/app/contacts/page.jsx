'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import ContactsList from './ContactsList';
import Pagination from '../components/Pagination';

// Function to fetch contacts from the API
async function getContacts(page) {
  let url = 'http://localhost:8000/api/contacts';
  if (page) {
    url += `?page=${page}`;
  }
  const res = await fetch(url, {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

// Function to delete a contact from the API
const deleteContact = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/contacts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }

    const data = await response.json();
    return { data, id };
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error; // Rethrow the error to handle it higher up
  }
};

// Contacts component
const Contacts = () => {
  const [contacts, setContacts] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePaginationClick = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setLoading(true);

    getContacts(page)
      .then(async (res) => {
        await setContacts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching contacts:', err);
        setLoading(false);
      });
  }, [page]);

  // Function to handle contact deletion
  const handleDeleteContact = (id) => {
    deleteContact(id).then(({ id }) => {
      setContacts({
        ...contacts,
        data: contacts.data.filter((contact) => contact.id !== id),
        total: contacts.total - 1, // Decrement the total by 1
      });
    });
  };

  return (
    <>
      {/* Navigation */}
      <nav>
        <div>
          <h2>Contacts</h2>
          <p>
            <small>Currently available contacts.</small>
          </p>
        </div>
        {/* Link to add new contact */}
        <Link href='/contacts/add' className='ml-auto'>
          <button className='btn-primary'>New Contact</button>
        </Link>
      </nav>
      <main>
        {/* Suspense fallback */}
        <Suspense fallback={<Loading />}>
          {/* ContactsList component */}
          <ContactsList
            contacts={contacts}
            handleDeleteContact={handleDeleteContact}
          />
          <Pagination
            lastPage={contacts?.last_page}
            current={contacts?.current_page}
            handleClick={handlePaginationClick}
          />
        </Suspense>
      </main>
    </>
  );
};

export default Contacts;
