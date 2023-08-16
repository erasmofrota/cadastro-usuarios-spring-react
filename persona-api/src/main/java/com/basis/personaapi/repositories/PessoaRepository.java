package com.basis.personaapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.basis.personaapi.entities.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
	
	

}
