import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { nanoid } from 'nanoid';

export default function Form({addContact}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
      case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }
  }
  
  const handleSubmit = evt => {
    evt.preventDefault();
    const contact = {
      id: nanoid(5),
      name,
      number
    }

    addContact(contact);
    setName('');
    setNumber(''); 
  }
  
    return (
        <form onSubmit={handleSubmit}>
        <TextField
          inputProps={{
            pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
            title: "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"}}
            id="outlined-basic"
            label="Name" 
            type="text"
            name="name"
            required
            value={name}
            onChange={handleChange}
          />
        {' '}
        <TextField
          inputProps={{
            pattern: "\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}",
            title: "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"}}
            id="outlined-basic"
            label="Telephone number" 
            type="text"
            name="number"
            required
            value={number}
            onChange={handleChange} />
          {' '}
        <Button
          variant="contained"
          type="submit"
          >Add contact</Button>
        </form>
    );
  }
