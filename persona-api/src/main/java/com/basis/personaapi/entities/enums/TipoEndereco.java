package com.basis.personaapi.entities.enums;

public enum TipoEndereco {
	RESIDENCIAL(1),
	COMERCIAL(2);
	
	private int code;
	
	private TipoEndereco(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}
	
	public static TipoEndereco valueOf(int code) {
		for (TipoEndereco value : TipoEndereco.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		
		throw new IllegalArgumentException("Invalid TipoEndereco code");
	}
	
	
}
