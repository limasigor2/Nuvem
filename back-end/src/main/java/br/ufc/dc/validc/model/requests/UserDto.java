package br.ufc.dc.validc.model.requests;

import java.util.Set;

import br.ufc.dc.validc.model.Role;

public class UserDto {
	private String name;
	private String username;
	private String email;
	private String externalId;
	private Set<Role> roles;
	
	public UserDto(String name, String username, String email, String externalId, Set<Role> roles) {
		super();
		this.name = name;
		this.username = username;
		this.email = email;
		this.externalId = externalId;
		this.roles = roles;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getExternalId() {
		return externalId;
	}
	public void setExternalId(String externalId) {
		this.externalId = externalId;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	
}
