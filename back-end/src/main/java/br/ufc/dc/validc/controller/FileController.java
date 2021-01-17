package br.ufc.dc.validc.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ufc.dc.validc.exception.FileStorageException;
import br.ufc.dc.validc.model.response.UploadFileResponse;
import br.ufc.dc.validc.service.DownloadFile;
import br.ufc.dc.validc.service.FileStorageService;
import br.ufc.dc.validc.service.UploadObject;
import br.ufc.dc.validc.service.UserDetailsImpl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;

//import br.ufc.dc.validc.service.AmazonClient;

@RestController
public class FileController {


	@Autowired
	private FileStorageService fileStorageService;
	
	
	@Autowired
	private UploadObject uploader;
	
	@Autowired
	private DownloadFile downloader;

	@PostMapping("/uploadFile")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException, FileStorageException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
		String fileName = fileStorageService.getFileName(file);
		File file2 = fileStorageService.multipartToFile(file);
		uploader.send(file2, userName, fileStorageService.getFileName(file));
		return new UploadFileResponse(fileName,file.getContentType(), file.getSize());
	}
	
	@GetMapping("/downloadFile/{fileName:.+}")
	public ResponseEntity<?> downloadFile(@PathVariable String fileName, HttpServletRequest request) throws Exception{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
        byte[] bytes = downloader.get(userName, fileName);
        
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(contentType(fileName));
        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDispositionFormData("attachment",  URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20"));

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);		
	}

	private MediaType contentType(String keyname) {
        String[] arr = keyname.split("\\.");
        String type = arr[arr.length - 1];
        switch (type) {
        case "txt":
            return MediaType.TEXT_PLAIN;
        case "png":
            return MediaType.IMAGE_PNG;
        case "jpg":
            return MediaType.IMAGE_JPEG;
        case "jpeg":
            return MediaType.IMAGE_JPEG;
        default:
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
	
}
