package br.ufc.dc.validc.model;

public class Message {

	private String message;
	private String key;
	
	public Message(String message, String key) {
		super();
		this.message = message;
		this.key = key;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	
	
}
