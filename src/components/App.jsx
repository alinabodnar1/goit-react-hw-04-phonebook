import React, { useState, useEffect } from 'react';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  })
  
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContact = localStorage.getItem('contact');

    if (localContact !== null) {
      setContacts(JSON.parse(localContact));
      }
  }, []);


  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  },[contacts])
  
  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }
    setContacts(state => {
      return [
        ...state,
        contact
      ]
    });
  
    if (contacts.some(contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim())) {
      return toast.error(`The contact "${name}" is already in the contacts!`);
    } else {
      toast.success("The contact is created  successfully!");
    }
  }

  const handleChange = ({target}) => {
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
          onDelete={deleteContact} />
        
        <ToastContainer autoClose ={3000} />
      </div>
    );
  }


