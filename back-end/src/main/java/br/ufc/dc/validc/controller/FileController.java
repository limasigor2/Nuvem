//package br.ufc.dc.validc.controller;
//
//import java.util.List;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestPart;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import br.ufc.dc.validc.service.AmazonClient;
//
//@RestController
//public class FileController {
//
//	
//	 private static final Logger logger = LoggerFactory.getLogger(FileController.class);
//	 
//
//	    @Autowired
//	    private AmazonClient documentManagementService;
//	 
//	    
//	    @PostMapping("/upload")
//	    public void uploadMultipleFiles(@RequestPart("file") List<MultipartFile> files) {
//	    	System.out.println("Tô aqui");
//	        documentManagementService.uploadMultipleFiles(files);
//	    }
//}
