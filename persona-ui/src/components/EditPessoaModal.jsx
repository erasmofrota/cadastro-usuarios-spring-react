import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,  
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  CssBaseline, 
  Grid,
  Box,
  Divider,
  Slide,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEnderecoModal from './AddEnderecoModal.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function EditPessoaModal({ open, onClose, pessoa, onUpdatePessoa }) {
  const [nome, setNome] = useState(pessoa.nome || '');
  const [cpfCnpj, setCpfCnpj] = useState(pessoa.cpf_cnpj || '');
  const [telefone, setTelefone] = useState(pessoa.telefone || '');
  const [email, setEmail] = useState(pessoa.email || '');
  const [enderecos, setEnderecos] = useState([]);
  //Abrir o Modal AddEndereco
  const [modalOpen, setModalOpen] = useState(false);
  
  //Deleta endereço
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [enderecoToDelete, setEnderecoToDelete] = useState(null);
 
  
  useEffect(() => {
    setNome(pessoa.nome || '');
    setCpfCnpj(pessoa.cpf_cnpj || '');
    setTelefone(pessoa.telefone || '');
    setEmail(pessoa.email || '');
  }, [open, pessoa]);

  useEffect(() => {
    async function fetchAllEnderecos() {
      if (pessoa.id) {
        try {
          const response = await fetch(`http://localhost:8080/enderecos/usuario/${pessoa.id}`);
          const enderecoData = await response.json();
          setEnderecos(enderecoData);
        } catch (error) {
          console.error('Error fetching endereco data:', error);
        }
      }
    }

    fetchAllEnderecos();
  }, [pessoa]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pessoaAtualizada = {
      nome,
      cpf_cnpj: cpfCnpj,
      telefone,
      email
    };

    try {
      const response = await fetch(`http://localhost:8080/pessoas/${pessoa.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoaAtualizada)
      });

      if (response.status === 200) {
        const updatedPessoa = await response.json();
        onUpdatePessoa(updatedPessoa);
        onClose();
      }
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
    }
  };
  

  const handleAddEndereco = () => {
    setModalOpen(true);
  };
  
  const handleShowDeleteConfirmation = (enderecoId) => {
    setEnderecoToDelete(enderecoId);
  };
  
  const handleDeleteConfirmation = async () => {
    if (enderecoToDelete) {
      try {
        const response = await fetch(`http://localhost:8080/enderecos/${enderecoToDelete}`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          setEnderecos(enderecos.filter(endereco => endereco.id !== enderecoToDelete));
          setEnderecoToDelete(null); // Limpa o endereço a ser deletado
        }
      } catch (error) {
        console.error('Erro ao deletar endereço:', error);
      }
    }
  };
  
  
  

  return (
    <Box>
    <Container maxWidth="sm">
    <CssBaseline />
    <Dialog fullScreen open={open} onClose={onClose}>
          
      <DialogTitle>
        <h2>Editar Usuário</h2>
      </DialogTitle>
      <DialogContent >
        
        <form onSubmit={handleSubmit}>
        
        <Grid container spacing={2}>
            <Grid item xs={6}> 
              <TextField
                id="filled-multiline-flexible"
                multiline
                maxRows={4}
                variant="filled"
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}> 
              <TextField
                id="filled-multiline-flexible"
                multiline
                maxRows={4}
                variant="filled"
                label="CPF/CNPJ"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}> 
              <TextField
                id="filled-multiline-flexible"
                multiline
                maxRows={4}
                variant="filled"
                label="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}> 
              <TextField
                id="filled-multiline-flexible"
                multiline
                maxRows={4}
                variant="filled"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button style={{ margin: '8px 0' }} type="submit" variant="contained" color="primary">
            Atualizar Usuário
          </Button>
          
        </form>

        <br />

        <Divider />

        <br />

        <Button
          type="button"
          variant="contained"
          color="primary"
          style={{ margin: '8px 0' }}
          onClick={() => setModalOpen(true)}
        >
          Adicionar Endereço
        </Button>

        <br />
      
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell><strong>Endereço</strong></StyledTableCell> 
                <StyledTableCell><strong>Ações</strong></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enderecos.map((endereco, enderecoIndex) => (
                <StyledTableRow key={enderecoIndex}>
                  <StyledTableCell>{endereco.tipoEndereco},{endereco.endereco},{endereco.numero},{endereco.complemento},{endereco.bairro},{endereco.cep},{endereco.cidade}/{endereco.uf}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleShowDeleteConfirmation(endereco.id)}>
                    <DeleteIcon />Apagar
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </DialogContent>
      <AddEnderecoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEndereco={handleAddEndereco}
        usuarioId={pessoa.id}
        />

    </Dialog>
    </Container>
    {enderecoToDelete && (
      
      <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Deseja realmente deletar o endereço?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Essa ação é irreversível.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEnderecoToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteConfirmation}>Deletar</Button>
            </DialogActions>
          </Dialog>
      
    )}
    </Box>
  );
  
}

export default EditPessoaModal;
