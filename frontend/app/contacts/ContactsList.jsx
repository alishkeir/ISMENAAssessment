'use client';

import Link from 'next/link';

/**
 * Renders a list of contacts
 * @param {Object} contacts - The contacts data
 * @param {Function} handleDeleteContact - The function to handle contact deletion
 * @returns {JSX.Element} - The contacts list component
 */
const ContactsList = async ({ contacts, handleDeleteContact }) => {
  // Check if there are no contacts
  // if (!contacts?.total) {
  //   return <p className='text-center'>There are no contacts</p>;
  // }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email address</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.total &&
            contacts?.data?.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td style={{ display: 'flex' }}>
                  {/* Link to edit contact */}
                  <Link
                    href={{
                      pathname: `/contacts/edit/${contact.id}`,
                      query: { data: JSON.stringify(contact) },
                      as: `/contacts/edit/${contact.id}`,
                    }}
                  >
                    <button
                      className='btn-primary'
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </button>
                  </Link>
                  {/* Button to delete contact */}
                  <button
                    className='btn-primary'
                    onClick={() => {
                      handleDeleteContact(contact.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactsList;
