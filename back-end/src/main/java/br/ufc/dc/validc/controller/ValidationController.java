//package br.ufc.dc.validc.controller;
//
//import java.io.IOException;
//import java.security.NoSuchAlgorithmException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import br.ufc.dc.validc.exception.ValidcException;
//import br.ufc.dc.validc.service.ValidationService;
//
//@RestController
//@RequestMapping("/validate")
//@CrossOrigin("*")
//public class ValidationController {
//
//	@Autowired
//	private ValidationService validationService;
//
//	@GetMapping()
//	public String teste() {
//		return "texto";
//	}
//
//	@PostMapping
//	@RequestMapping("/")
//	public ResponseEntity<?> validate(@RequestParam("file") MultipartFile file, @RequestParam("motivo") String motivo,
//			@RequestParam("filename") String filename, @RequestParam("username") String username)
//			throws NoSuchAlgorithmException, ValidcException, IOException {
//		return ResponseEntity.status(HttpStatus.OK).body(validationService.validate(file, motivo, filename, username));
//	}
//
//	@GetMapping
//	@RequestMapping("/list")
//	public ResponseEntity<?> listValidation(@RequestParam("username") String username,
//			@RequestParam("filename") String filename) throws NoSuchAlgorithmException, ValidcException, IOException {
//		return ResponseEntity.status(HttpStatus.OK).body(validationService.listValidations(username, filename));
//	}
//}
