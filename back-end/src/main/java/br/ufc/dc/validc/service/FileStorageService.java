package br.ufc.dc.validc.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import br.ufc.dc.validc.exception.FileStorageException;
import br.ufc.validc.property.FileStorageProperties;

@Service
public class FileStorageService {

	private final Path fileStorageLocation;

	@Autowired
	public FileStorageService(FileStorageProperties fileStorageProperties) throws Exception {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("file.forbidden.path", "Could not create the directory where the uploaded files will be stored");
		}
	}


	
	public File multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException, FileStorageException {
		String fileName = StringUtils.cleanPath(multipart.getOriginalFilename());
		if(fileName.contains("..")) {
			throw new FileStorageException("file.invalid.path", "Filename contains invalid path sequence " + fileName);
		}
	    File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+fileName);
	    multipart.transferTo(convFile);
	    return convFile;
	}
	
	public String getFileName(MultipartFile multipart) {
		return StringUtils.cleanPath(multipart.getOriginalFilename());
	}
	
}
