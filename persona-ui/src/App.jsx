

import React, { useState } from 'react';
import Header from './components/Header.jsx';
import PessoasList from './components/PessoasList.jsx';
import PessoasModal from './components/PessoasModal.jsx';
import { Button } from '@mui/material';

function App() {
  const [pessoas, setPessoas] = useState([]);
 
  const [open, setOpen] = useState(false);

  const handleAddPessoa = (novaPessoa) => {
    setPessoas([...pessoas, novaPessoa]);
  };

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
    <Header />
   
    <Button  style={{ margin: '8px 0' }} onClick={handleClickOpen} variant="contained" color="primary">
        Adicionar Usuário
      </Button>
      <PessoasModal
        open={open}
        onClose={handleClose}
        onAddPessoa={handleAddPessoa}
      />
      <PessoasList pessoas={pessoas} />
    </div>
  );
}

export default App;
