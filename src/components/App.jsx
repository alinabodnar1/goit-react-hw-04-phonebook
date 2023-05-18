import React, { Component } from 'react';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };


  componentDidMount() {
    const localContact = localStorage.getItem('contact');
		if (localContact !== null) {
      this.setState({
        contacts: JSON.parse(localContact)
      });

		}
	}

	componentDidUpdate(_, prevState) {
		if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    } 
    
		if (prevState.contacts.length > this.state.contacts.length) {
      toast.info("The contact is deleted successfully!");
    }
	}
  addContact = ({ name, number}) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }

    if (this.state.contacts.some(contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim())) {
      return toast.error(`The contact "${name}" is already in the contacts!`);
    } else {
      toast.success("The contact is created  successfully!");
    }

    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contact],
      }
    })
   }
  
  handleChange = e => {
    this.setState({
      filter: e.target.value,
    });
  }

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(filter.toLowerCase().trim())
      );
    });
  }

 deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
 }
  
  
  render() {
    
    const { filter } = this.state;
    return (
      <div style={{marginLeft: "20px"}}>
        <h1>Phonebook</h1>
        <Form addContact={this.addContact}  />
       
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={this.handleChange} />
        <ContactsList
          contacts={this.filterContacts()}
          onDelete={this.deleteContact} />
        
        <ToastContainer autoClose ={3000} />
      </div>
    );
  }
}

