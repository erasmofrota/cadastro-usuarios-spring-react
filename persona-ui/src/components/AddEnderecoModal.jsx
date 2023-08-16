import React, { useState } from 'react';
import {Button, Dialog, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Grid} from '@mui/material';


function AddEnderecoModal({ open, onClose, onAddEndereco, usuarioId}) {
  
  const [tipoEndereco, setTipoEndereco] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoEndereco = {
      usuario: { id: usuarioId },
      tipoEndereco,
      endereco,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      uf
    };

    try {
     
      const response = await fetch('http://localhost:8080/enderecos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEndereco)
      });

      if (response.status === 201) {
        
        onAddEndereco(novoEndereco);
        // setUsuario('');
        setTipoEndereco('');
        setEndereco('');
        setNumero('');
        setComplemento('');
        setBairro('');
        setCep('');
        setCidade('');
        setUf('');
        onClose();
      }
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <h2>Adicionar um Novo Endereço</h2>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={6}> 
          <FormControl fullWidth>
            <InputLabel>Tipo de Endereço</InputLabel>
            <Select
              value={tipoEndereco}
              onChange={(e) => setTipoEndereco(e.target.value)}
            >
              <MenuItem value="RESIDENCIAL">Residencial</MenuItem>
              <MenuItem value="COMERCIAL">Comercial</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} fullWidth /></Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Número" value={numero} onChange={(e) => setNumero(e.target.value)} fullWidth /></Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} fullWidth /></Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} fullWidth /></Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} fullWidth /></Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} fullWidth /></Grid>
        <Grid item xs={6}> 
        <TextField required id="filled-multiline-flexible" multiline maxRows={4} variant="filled" label="UF" value={uf} onChange={(e) => setUf(e.target.value)} fullWidth /></Grid>
        </Grid>

          <Button style={{ margin: '8px 0' }}  type="submit" variant="contained" color="primary">
            Adicionar Endereço
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEnderecoModal;
