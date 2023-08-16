 package com.basis.personaapi.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.basis.personaapi.entities.enums.TipoEndereco;

@Entity
@Table(name = "endereco")
public class Endereco implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer tipoEndereco;
	
	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private Pessoa usuario;
	
	private String endereco;
	private String numero;
	private String complemento;
	private String bairro; 
	private String cep; 
	private String cidade;
	private String uf;
		
	public Endereco() {
		
	}
		
	public Endereco(Long id, TipoEndereco tipoEndereco, String endereco, String numero, String complemento,
			String bairro, String cep, String cidade, String uf, Pessoa usuario) {
		super();
		this.id = id;
		this.usuario = usuario;
		setTipoEndereco(tipoEndereco);
		this.endereco = endereco;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cep = cep;
		this.cidade = cidade;
		this.uf = uf;
	}
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Pessoa getUsuario() {
		return usuario;
	}

	public void setUsuario(Pessoa usuario) {
		this.usuario = usuario;
	}

	public TipoEndereco getTipoEndereco() {
		return TipoEndereco.valueOf(tipoEndereco);
	}
	public void setTipoEndereco(TipoEndereco tipoEndereco) {
		if(tipoEndereco != null) {
			this.tipoEndereco = tipoEndereco.getCode();		
		}
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
       
        if (numero.matches("\\d+")) {
            this.numero = numero;
        } else {
            throw new IllegalArgumentException("Deve conter apenas numeros.");
        }
    }
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}

	

}
