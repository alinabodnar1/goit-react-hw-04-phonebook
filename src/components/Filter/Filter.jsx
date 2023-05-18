import React from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
  return (
      <TextField
        id="standard-basic"
        label="Filter"
        variant="standard"
        value={value}
        onChange={onChange}
      />
  );
}
Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}