import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import List from '@mui/material/List';

export default function ContactsListItem({contact, onDelete}){
        return (
            <List key={contact.id}>
                {contact.name} {' '}
                {contact.number} {' '}
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
        }),
    onDelete: PropTypes.func.isRequired,
}