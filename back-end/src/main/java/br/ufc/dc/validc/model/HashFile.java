package br.ufc.dc.validc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "hash_file")
public class HashFile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name="filename")
	private String filename;

	@Column
	private String hash;
	

	public HashFile() {
	}

	public HashFile(String fileName, String hash) {
		super();
		this.filename = fileName;
		this.hash = hash;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String fileName) {
		this.filename = fileName;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	@Override
	public String toString() {
		return "HashFile [id=" + id + ", filename=" + filename + ", hash=" + hash + "]";
	}
	
	

}
