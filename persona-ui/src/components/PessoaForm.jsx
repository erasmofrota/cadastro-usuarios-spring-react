import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function PessoasForm({ onAddPessoa }) {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [tipoEndereco, setTipoEndereco] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaPessoa = {
      nome,
      cpf_cnpj: cpfCnpj,
      telefone,
      email,
      endereco: {
        tipoEndereco,
        endereco,
        numero,
        complemento,
        bairro,
        cep,
        cidade,
        uf,
      },
    };

    onAddPessoa(novaPessoa);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nova Usuário</h2>
      <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth />
      <TextField label="CPF/CNPJ" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} fullWidth />
      <TextField label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} fullWidth />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />

      <h3>Endereço</h3>
      <FormControl fullWidth>
        <InputLabel>Tipo de Endereço</InputLabel>
        <Select value={tipoEndereco} onChange={(e) => setTipoEndereco(e.target.value)}>
          <MenuItem value="Residencial">Residencial</MenuItem>
          <MenuItem value="Comercial">Comercial</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} fullWidth />
      <TextField label="Número" value={numero} onChange={(e) => setNumero(e.target.value)} fullWidth />
      <TextField label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} fullWidth />
      <TextField label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} fullWidth />
      <TextField label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} fullWidth />
      <TextField label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} fullWidth />
      <TextField label="UF" value={uf} onChange={(e) => setUf(e.target.value)} fullWidth />

      <Button type="submit" variant="contained" color="primary">Adicionar Usuário</Button>
    </form>
  );
}

export default PessoasForm;
