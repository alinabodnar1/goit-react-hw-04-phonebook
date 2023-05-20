import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';

export default function ContactsListItem({contact, onDelete, onEdit}){
    const [name, setName] = useState(contact.name);
    const [number, setNumber] = useState(contact.number);
    const [isEdit, setIsEdit] = useState(false);
    
    const toggleEdit = () => {
        setIsEdit(prevState => !prevState);
        if (isEdit) {
            onEdit({
                name,
                number,
                id: contact.id
            })
        }
    }

    return (
            <List key={contact.id}>
               
            {isEdit ? 
                <>
                    <TextField
                        margin={'dense'}
                        className='item'
                        id="standard-basic"
                        label="Change Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    {' '}
                    <TextField
                        margin={'dense'}
                        id="standard-basic"
                        label="Change Number"
                        variant="standard"
                        value={number}
                        onChange={(e)=> setNumber(e.target.value)}
                    />
                </>
                : 
                <>
                    <span>{contact.name}</span> {' '}
                    <span>{contact.number}</span> {' '}
                </>
               }
                 <Button
                    variant="outlined"
                    type="button"
                    onClick={toggleEdit}
                >    
                {isEdit ? 'SAVE' : 'EDIT'}
                </Button> {' '}
                <Button 
                    variant="outlined"
                    type="button"
                    onClick={() => onDelete(contact.id)}
                >    
                    DELETE
                </Button>
            </List>
        )
    
}

ContactsListItem.propTypes = {
    contact: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,    
        }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
}