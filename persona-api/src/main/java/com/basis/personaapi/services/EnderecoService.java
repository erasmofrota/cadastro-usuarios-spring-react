package com.basis.personaapi.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.basis.personaapi.entities.Endereco;
import com.basis.personaapi.repositories.EnderecoRepository;
import com.basis.personaapi.repositories.PessoaEnderecoRepository;
import com.basis.personaapi.services.exceptions.DatabaseException;
import com.basis.personaapi.services.exceptions.ResourceNotFoundException;

@Service
public class EnderecoService {
	@Autowired
	private EnderecoRepository repository;
	@Autowired
	private PessoaEnderecoRepository repository2;
	
	
	public List<Endereco> findAll() {
		return repository.findAll();
	}
	
	public Endereco findById(Long id) {
		Optional<Endereco> obj = repository.findById(id);
		return obj.get();
	}
	
	public List<Endereco> findByUsuarioId(Long usuario) {
        return repository2.findByUsuarioId(usuario);
    }
	
	public Endereco insert(Endereco obj) {
		return repository.save(obj);
	}
	public void delete (Long id) {
		try {
		repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {	
			throw new ResourceNotFoundException(id);	
		} catch (DataIntegrityViolationException e){
			throw new DatabaseException(e.getMessage());
		}
	}
	public Endereco update (Long id, Endereco obj) {
		try {
			Endereco entity = repository.getOne(id);
			updateData(entity, obj);
			return repository.save(entity);	
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
		
	}
	
	private void updateData(Endereco entity, Endereco obj) {
		
		entity.setUsuario(obj.getUsuario());
		entity.setTipoEndereco(obj.getTipoEndereco());
		entity.setEndereco(obj.getEndereco());
		entity.setNumero(obj.getNumero());
		entity.setComplemento(obj.getComplemento());
		entity.setBairro(obj.getBairro());
		entity.setCep(obj.getCep());
		entity.setCidade(obj.getCidade());
		entity.setUf(obj.getUf());
	}

}
