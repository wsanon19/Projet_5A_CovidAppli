package org.polytech.covid.publics.controllers;

import org.polytech.covid.publics.Entity.Medecin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginController {

    @GetMapping()
    public ResponseEntity<Void> login() {
        return ResponseEntity.ok().build();
    }
//    @PostMapping()
//    public Medecin validateLogin(@RequestParam){
//    return new Medecin("user successfully authenticated");
//  }

}
