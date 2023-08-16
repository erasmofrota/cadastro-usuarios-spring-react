import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PersonForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Adicionar Pessoa
        </Button>
      </Box>
    </form>
  );
};

export default PersonForm;
