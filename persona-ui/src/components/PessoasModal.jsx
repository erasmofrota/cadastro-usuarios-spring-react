import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, Grid }from '@mui/material';



function PessoasModal({ open, onClose, onAddPessoa }) {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaPessoa = {
      nome,
      cpf_cnpj: cpfCnpj,
      telefone,
      email
    };

    try {
      // Enviar o formulário via POST para a rota http://localhost:8080/pessoas usando fetch
      const response = await fetch('http://localhost:8080/pessoas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaPessoa)
      });

      if (response.status === 201) {
        
        onAddPessoa(novaPessoa);
        setNome('');
        setCpfCnpj('');
        setTelefone('');
        setEmail('');
        onClose();
      }
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <h2>Novo Usuário</h2>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth /></Grid>
            <Grid item xs={6}>
            
              <TextField required id="filled-multiline-flexible" mask="000.000.000-00" multiline maxRows={4} variant="filled" label="CPF/CNPJ" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} fullWidth /></Grid>
            <Grid item xs={6}>
              <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} fullWidth /></Grid>
            <Grid item xs={6}>  
              <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth /></Grid>
          </Grid>

          <Button  style={{ margin: '8px 0' }} type="submit" variant="contained" color="primary">
            Adicionar Usuário
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PessoasModal;
