package br.ufc.dc.validc.model.response;

public class UploadFileResponse {
	
	private String fileName;
	private String fileType;
	private long size;
	private String hash;

	public UploadFileResponse(String fileName, String fileType, long size, String hash) {
		this.fileName = fileName;
		this.fileType = fileType;
		this.size = size;
		this.hash = hash;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

}
