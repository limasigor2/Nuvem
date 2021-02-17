//package br.ufc.dc.validc.model;
//
//import java.time.LocalDateTime;
//
//
//import org.springframework.cloud.gcp.data.datastore.core.mapping.Entity;
//import org.springframework.cloud.gcp.data.datastore.core.mapping.Field;
//import org.springframework.data.annotation.Id;
////import com.google.cloud.spring.data.datastore.core.mapping.Entity;
////import org.springframework.data.annotation.Id
//
//
//
////@Entity(name = "infovalidation")
//@Entity(name = "validation")
//public class Validation {
//
//	@Id
//	@Field(name = "validation_id")
//	private String id;
//	
//	@Field(name = "createdAt")
//	private String createdAt;
//	
//	@Field(name = "motivo")
//	private String motivo;
//	
//	@Field(name = "isValid")
//	private boolean isValid;
//	
//	@Field(name = "filename")
//	private String filename;
//	
//	@Field(name = "username")
//	private String username;
//
//	public Validation() {
//	}
//
//	public Validation(LocalDateTime createdAt, String motivo, boolean isValid, String filename, String username) {
//		super();
//		this.createdAt = createdAt.toString();
//		this.motivo = motivo;
//		this.isValid = isValid;
//		this.filename = filename;
//		this.username = username;
//	}
//
//
//	public String getId() {
//		return id;
//	}
//
//	public void setId(String id) {
//		this.id = id;
//	}
//
//	public String getCreatedAt() {
//		return createdAt.toString();
//	}
//
//	public void setCreatedAt(LocalDateTime createdAt) {
//		this.createdAt = createdAt.toString();
//	}
//	
//	public void setCreatedAt(String createdAt) {
//		this.createdAt = createdAt;
//	}
//	
//
//	public String getMotivo() {
//		return motivo;
//	}
//
//	public void setMotivo(String motivo) {
//		this.motivo = motivo;
//	}
//
//	public boolean getIsValid() {
//		return isValid;
//	}
//
//	public void setIsValid(boolean isValid) {
//		this.isValid = isValid;
//	}
//
//	
//	public String getFilename() {
//		return filename;
//	}
//
//	public void setFilename(String filename) {
//		this.filename = filename;
//	}
//
//	
//	public String getUsername() {
//		return username;
//	}
//
//	public void setUsername(String username) {
//		this.username = username;
//	}
//
//	@Override
//	public String toString() {
//		return "InfoValidation [id=" + id + ", createdAt=" + createdAt + ", motivo=" + motivo + ", isValid=" + isValid
//				+ ", filename=" + filename + ", username=" + username + "]";
//	}
//
//	
//}