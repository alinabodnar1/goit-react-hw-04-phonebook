import React from 'react';
import PropTypes from 'prop-types';
import ContactsListItem from 'components/ContactsListItem/ContactsListItem';

export default function ContactsList({contacts, onDelete}) {
  return (<ul>
            { contacts.map(contact => (
                <ContactsListItem
                    key={contact.id}
                    contact={contact}
                    onDelete={onDelete}
                />
            ))}
        </ul>
  )
}
ContactsList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}