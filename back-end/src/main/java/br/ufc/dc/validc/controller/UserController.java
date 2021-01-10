//package br.ufc.dc.validc.controller;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import br.ufc.dc.validc.exception.EntityNotFoundException;
//import br.ufc.dc.validc.model.User;
//import br.ufc.dc.validc.service.UserService;
//
//
//@RestController
//@RequestMapping("/user")
//public class UserController {
//	
//	@Autowired
//	private UserService service;
//	
//	@PostMapping("/")
//	public ResponseEntity<?> save(@RequestBody User user) {
//		return ResponseEntity.status(HttpStatus.CREATED).body(service.saveOrUpdate(user));
//	}
//	
//	@GetMapping("/list/")
//	public ResponseEntity<?> list(@RequestParam("page") int page, @RequestParam("size") int size){
//		return ResponseEntity.status(HttpStatus.OK).body(service.listUser(page, size));
//	}
//	
//	@DeleteMapping("/{externalId}")
//	public ResponseEntity<?> delete(@PathVariable("externalId") String externalId) throws EntityNotFoundException{
//		return ResponseEntity.status(HttpStatus.OK).body(service.delete(externalId));
//	}
//
//	@PatchMapping("/{externalId}")
//	public ResponseEntity<?> update(@RequestBody User user, @PathVariable("externalId") String externalId) throws EntityNotFoundException{
//		return ResponseEntity.status(HttpStatus.OK).body(service.update(externalId, user));
//	}
//	
//	@GetMapping("/{externalId}")
//	public ResponseEntity<?> findOne(@PathVariable("externalId") String externalId) throws EntityNotFoundException{
//		return ResponseEntity.status(HttpStatus.OK).body(service.findOne(externalId));
//	}
//
//	
//
//}
