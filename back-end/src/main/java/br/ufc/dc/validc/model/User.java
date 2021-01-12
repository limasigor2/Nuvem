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

	public User() {
	}

	public User(String username, String email, String password, String name) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.name = name;
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
	

}

//@Entity
//@Table(name = "usuario")
//public class User {
//	
//    @Id
//    @GeneratedValue(strategy= GenerationType.IDENTITY)
//    @JsonIgnore
//    private Long id;
//
//    @Column(nullable = false, name="name")
//    private String name;
//    
//    @Column(nullable = false, name="externalId")
//    private String externalId;
//    
//    @JsonProperty(access = Access.WRITE_ONLY)
//    @Column(nullable = false, name = "password")
//    private String password;
//    
//    @Column(nullable = false, name = "email")
//    private String email;
//       
//    
//    @Column(nullable = false, name = "username")
//    private String username;
//       
//    
//	@ManyToMany(fetch = FetchType.LAZY)
//	@JoinTable(	name = "user_roles", 
//				joinColumns = @JoinColumn(name = "user_id"), 
//				inverseJoinColumns = @JoinColumn(name = "role_id"))
//	private Set<Role> roles = new HashSet<>();
//    
//	
//	
//    public User(){}
//    
//    
//    
//	public User(String name, String password, String email, String username) {
//		super();
//		this.name = name;
//		this.password = password;
//		this.email = email;
//		this.username = username;
//	}
//
//
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getExternalId() {
//		return externalId;
//	}
//
//	public void setExternalId(String externalId) {
//		this.externalId = externalId;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public void generateExternalId() {
//		setExternalId(UUIDGenerator.getHashFromString(email));
//	}
//
//	public Set<Role> getRoles() {
//		return roles;
//	}
//
//	public void setRoles(Set<Role> roles) {
//		this.roles = roles;
//	}
//	
//
//	public String getUsername() {
//		return username;
//	}
//
//
//	public void setUsername(String username) {
//		this.username = username;
//	}
//
//
//	
//	@Override
//	public int hashCode() {
//		final int prime = 31;
//		int result = 1;
//		result = prime * result + ((email == null) ? 0 : email.hashCode());
//		result = prime * result + ((externalId == null) ? 0 : externalId.hashCode());
//		result = prime * result + ((id == null) ? 0 : id.hashCode());
//		result = prime * result + ((name == null) ? 0 : name.hashCode());
//		result = prime * result + ((password == null) ? 0 : password.hashCode());
//		result = prime * result + ((roles == null) ? 0 : roles.hashCode());
//		result = prime * result + ((username == null) ? 0 : username.hashCode());
//		return result;
//	}
//
//
//
//	@Override
//	public String toString() {
//		return "User [id=" + id + ", name=" + name + ", externalId=" + externalId + ", email=" + email + "]";
//	}
//
//
//   
//}
