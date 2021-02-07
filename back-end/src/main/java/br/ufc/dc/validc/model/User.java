package br.ufc.dc.validc.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import br.ufc.dc.validc.util.UUIDGenerator;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String name;

	@NotBlank
	@Size(max = 20)

	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

	@NotBlank
	@Column(nullable = false, name = "externalId")
	private String externalId;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_phonenumber", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "phone_id"))
	private Set<Phonenumber> phonenumbers = new HashSet<>();

	public User() {
	}

	public User(String username, String email, String password, String name, Set<Phonenumber> phonenumbers) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.name = name;
		this.phonenumbers = phonenumbers;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public void generateExternalId() {
		setExternalId(UUIDGenerator.getHashFromString(email));
	}

	public String getExternalId() {
		return externalId;
	}

	public void setExternalId(String externalId) {
		this.externalId = externalId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Phonenumber> getPhonenumbers() {
		return phonenumbers;
	}

	public void setPhonenumbers(Set<Phonenumber> phonenumbers) {
		this.phonenumbers = phonenumbers;
	}

}