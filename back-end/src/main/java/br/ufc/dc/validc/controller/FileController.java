package br.ufc.dc.validc.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import br.ufc.dc.validc.service.GoogleCloudStorageClient;
import br.ufc.dc.validc.service.HashFileService;
import br.ufc.dc.validc.service.UserDetailsImpl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/file")
@CrossOrigin("*")
public class FileController {

//	@Autowired
//	private FileStorageService fileStorageService;

	@Autowired
	private HashFileService hashFileservice;

	@Autowired
	private GoogleCloudStorageClient googleCloudStorageClient;

	@PostMapping("/upload")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file)
			throws IllegalStateException, IOException, NoSuchAlgorithmException, ValidcException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
//		String fileName = fileStorageService.getFileName(file);
//		File file2 = fileStorageService.multipartToFile(file);
		googleCloudStorageClient.uploadObject(file, username);

//		String hashValue = hashFileservice.save(file, userName, fileName);
		return new UploadFileResponse(file.getOriginalFilename(), file.getContentType(), file.getSize(), "hashValue");
	}

	@GetMapping("/download/{filename:.+}")
	public ResponseEntity<?> downloadFile(@PathVariable String filename, HttpServletRequest request) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		byte[] bytes = googleCloudStorageClient.get(username, filename);

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(contentType(filename));
		httpHeaders.setContentLength(bytes.length);
		httpHeaders.setContentDispositionFormData("attachment",
				URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20"));

		return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{filename:.+}")
	public ResponseEntity<?> delete(@PathVariable String filename, HttpServletRequest request) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		googleCloudStorageClient.deleteObject(filename, username);
		hashFileservice.delete(filename, username);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@GetMapping("/list")
	public ResponseEntity<?> list() throws ValidcException, IOException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();

		return ResponseEntity.status(HttpStatus.OK).body(googleCloudStorageClient.list(userName));
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