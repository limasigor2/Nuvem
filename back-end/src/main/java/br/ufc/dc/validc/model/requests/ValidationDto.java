package br.ufc.dc.validc.model.requests;

public class ValidationDto {
	private String username;
	private String filename;
	private String motivo;
	private String hash;

	public ValidationDto() {
	}

	public ValidationDto(String username, String filename, String motivo, String hash) {
		super();
		this.username = username;
		this.filename = filename;
		this.motivo = motivo;
		this.hash = hash;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

}
