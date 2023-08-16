import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Alert,
  TextField,
  Snackbar 

} from '@mui/material';
import EditPessoaModal from './EditPessoaModal.jsx';

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



function PessoasList() {
  const [pessoas, setPessoas] = React.useState([]);
  const [enderecos, setEnderecos] = React.useState({});
  const [editModalOpen, setEditModalOpen] = React.useState(false); 
  const [selectedPessoa, setSelectedPessoa] = React.useState(null); 
  const [pessoaToDelete, setPessoaToDelete] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  


  

  React.useEffect(() => {
    async function fetchPessoas() {
      try {
        const response = await fetch('http://localhost:8080/pessoas');
        const data = await response.json();
        setPessoas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchPessoas();
  }, []);

  const fetchEndereco = async (usuario) => {
    try {
      const response = await fetch(`http://localhost:8080/enderecos/usuario/${usuario}`);
      const enderecoData = await response.json();
      return enderecoData;
    } catch (error) {
      console.error('Error fetching endereco data:', error);
      return {};
    }
  };

  React.useEffect(() => {
    async function fetchAllEnderecos() {
      const enderecoMap = {};
      await Promise.all(
        pessoas.map(async (pessoa) => {
          if (pessoa.id) {
            const enderecosData = await fetchEndereco(pessoa.id);
            enderecoMap[pessoa.id] = enderecosData;
          }
        })
      );
      setEnderecos(enderecoMap);
    }

    fetchAllEnderecos();
  }, [pessoas]);

  const handleEditClick = (pessoa) => {
    setSelectedPessoa(pessoa);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedPessoa(null);
    setEditModalOpen(false);
  };
  
  
  const handleShowDeleteConfirmation = (pessoaId) => {
    setPessoaToDelete(pessoaId);
  };
  
  const handleDeleteConfirmation = async () => {
    if (pessoaToDelete) {
      try {
        const response = await fetch(`http://localhost:8080/pessoas/${pessoaToDelete}`, {
          method: 'DELETE',
        });

        if (response.status === 204) {
          setPessoas(pessoas.filter(pessoa => pessoa.id !== pessoaToDelete));
        }

        setPessoaToDelete(null); 
      } catch (error) {
        console.error('Erro ao deletar usuario:', error);
      }
    }
  };

  const filteredPessoas = pessoas.filter((pessoa) =>
    pessoa.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasEnderecos = pessoaToDelete && enderecos[pessoaToDelete] && enderecos[pessoaToDelete].length > 0;
  

  return (
    <div>
      <TextField
        label="Buscar Pessoas"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <h1>Lista de Usuários</h1>
      <TableContainer component={Paper}>
        <Table  sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell><strong>Nome</strong></StyledTableCell>
              <StyledTableCell><strong>CPF/CNPJ</strong></StyledTableCell>
              <StyledTableCell><strong>Telefone</strong></StyledTableCell>
              <StyledTableCell><strong>Email</strong></StyledTableCell>
              <StyledTableCell><strong>Endereços</strong></StyledTableCell>
              <StyledTableCell><strong>Ações</strong></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPessoas.map((pessoa, index) => (
              <TableRow key={index}>
                <StyledTableCell>{pessoa.nome}</StyledTableCell>
                <StyledTableCell>{pessoa.cpf_cnpj}</StyledTableCell>
                <StyledTableCell>{pessoa.telefone}</StyledTableCell>
                <StyledTableCell>{pessoa.email}</StyledTableCell>
                <StyledTableCell>
                  {enderecos[pessoa.id] && (
                    <ul>
                      {enderecos[pessoa.id].map((endereco, enderecoIndex) => (
                        <li key={enderecoIndex}>
                          <p><strong>Tipo:</strong> {endereco.tipoEndereco}, {endereco.endereco}, {endereco.numero}, {endereco.complemento}, {endereco.bairro}, {endereco.cep},{endereco.cidade}/{endereco.uf}</p>
                          
                        </li>
                      ))}
                    </ul>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <EditIcon onClick={() => handleEditClick(pessoa)} /> 
                  <DeleteIcon variant="outlined" onClick={() => handleShowDeleteConfirmation(pessoa.id)} />
                  
                  
                  
                </StyledTableCell>               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {selectedPessoa && (
        <EditPessoaModal
          open={editModalOpen}
          onClose={handleEditModalClose}
          pessoa={selectedPessoa}
          onUpdatePessoa={(updatedPessoa) => {
            const updatedPessoas = pessoas.map((p) =>
              p.id === updatedPessoa.id ? updatedPessoa : p
            );
            setPessoas(updatedPessoas);
          }}
        />
      )}
      {hasEnderecos ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setPessoaToDelete(null)}>
          <Alert severity="warning" onClose={() => setPessoaToDelete(null)}>
          Não foi possível remover o usuário porque existem endereços no seu cadastro.
          </Alert>
        </Snackbar>
      ) : pessoaToDelete ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Deseja realmente excluir o usuario?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Essa ação é irreversível.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPessoaToDelete(null)}>Cancelar</Button>
            <Button onClick={handleDeleteConfirmation}>Deletar</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      
    </div>
  );
}

export default PessoasList;
