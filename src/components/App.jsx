import React, { useState, useEffect } from 'react';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts')) ?? []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])
  
  const addContact = (newContact) => {
    if (contacts.some(contact => contact.name.toLowerCase().trim() === newContact.name.toLowerCase().trim())) {
      return toast.error(`The contact "${newContact.name}" is already in the contacts!`);
    } else {
      toast.success("The contact is created  successfully!");
    }
    
   
    setContacts(state => {
      return [
        ...state,
        newContact
      ]
    });
  }

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };
  

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim()));
  }

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
    toast.info("The contact is deleted successfully!");
  }

  const editContact = (contact) => {
    setContacts((prevContacts) => prevContacts.map((item) => {
      if (item.id === contact.id) {
        return contact;
      }
      return item;
    }))
  }

  return (
      <div style={{marginLeft: "20px"}}>
        <h1>Phonebook</h1>
        <Form addContact={addContact}  />
       
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={handleChange} />
        <ContactsList
          contacts={filterContacts()}
          onDelete={deleteContact} 
          onEdit={editContact} />
        <ToastContainer autoClose ={3000} />
      </div>
    );
  }


