package br.ufc.dc.validc.model;

import java.time.LocalDateTime;

import br.ufc.dc.validc.util.UUIDGenerator;

public class Validation {

	private String id;

	private String createdAt;

	private String motivo;

	private boolean isValid;

	private String filename;

	private String username;

	public Validation() {
	}

	public Validation(LocalDateTime createdAt, String motivo, boolean isValid, String filename, String username) {
		super();
		this.createdAt = createdAt.toString();
		this.motivo = motivo;
		this.isValid = isValid;
		this.filename = filename;
		this.username = username;
		this.generateId();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCreatedAt() {
		return createdAt.toString();
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt.toString();
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	public boolean getIsValid() {
		return isValid;
	}

	public void setIsValid(boolean isValid) {
		this.isValid = isValid;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "InfoValidation [id=" + id + ", createdAt=" + createdAt + ", motivo=" + motivo + ", isValid=" + isValid
				+ ", filename=" + filename + ", username=" + username + "]";
	}

	public void generateId() {
		setId(UUIDGenerator.getHashFromString(LocalDateTime.now().toString()));
	}

}