package br.ufc.dc.validc.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ufc.dc.validc.exception.ValidcException;
import br.ufc.dc.validc.model.response.UploadFileResponse;
import br.ufc.dc.validc.service.AwsClient;
import br.ufc.dc.validc.service.FileStorageService;
import br.ufc.dc.validc.service.HashFileService;
import br.ufc.dc.validc.service.UserDetailsImpl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/file")
public class FileController {

	@Autowired
	private FileStorageService fileStorageService;
	
	@Autowired
	private HashFileService hashFileservice;
	
	@Autowired
	private AwsClient awsClient;

	@PostMapping("/upload")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file)
			throws IllegalStateException, IOException, NoSuchAlgorithmException, ValidcException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		String fileName = fileStorageService.getFileName(file);
		File file2 = fileStorageService.multipartToFile(file);
		awsClient.send(file2, userName, fileName);
		String hashValue = hashFileservice.save(file, userName, fileName);
		return new UploadFileResponse(fileName, file.getContentType(), file.getSize(), hashValue);
	}

	@GetMapping("/download/{fileName:.+}")
	public ResponseEntity<?> downloadFile(@PathVariable String fileName, HttpServletRequest request) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		byte[] bytes = awsClient.get(userName, fileName);

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(contentType(fileName));
		httpHeaders.setContentLength(bytes.length);
		httpHeaders.setContentDispositionFormData("attachment",
				URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20"));

		return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
	}

	
	@DeleteMapping("/delete/{fileName:.+}")
	public ResponseEntity<?> delete(@PathVariable String fileName, HttpServletRequest request) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		awsClient.delete(userName, fileName);
		hashFileservice.delete(userName, fileName);
		return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
	}
	
	@GetMapping("/list")
	public ResponseEntity<?> list() throws ValidcException{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		awsClient.list(userName);
		return ResponseEntity.status(HttpStatus.OK).body(awsClient.list(userName));
	}
	
	private MediaType contentType(String keyname) {
		String[] arr = keyname.split("\\.");
		String type = arr[arr.length - 1];
		switch (type) {
		case "png":
			return MediaType.IMAGE_PNG;
		case "jpg":
			return MediaType.IMAGE_JPEG;
		case "jpeg":
			return MediaType.IMAGE_JPEG;
		case "pdf":
			return MediaType.APPLICATION_PDF;
		default:
			return MediaType.APPLICATION_OCTET_STREAM;
		}
	}
}