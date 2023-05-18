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
      id: nanoid(),
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
            id="outlined-basic"
            label="Name" 
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        {' '}
        <TextField
            id="outlined-basic"
            label="Telephone number" 
            type="text"
            name="number"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
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
