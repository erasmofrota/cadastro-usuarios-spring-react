package com.basis.personaapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.basis.personaapi.entities.Endereco;

public interface PessoaEnderecoRepository extends JpaRepository<Endereco, Long>{
	List<Endereco> findByUsuarioId(Long usuario_id);

}
