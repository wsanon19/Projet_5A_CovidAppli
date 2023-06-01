package org.polytech.covid.publics.controllers;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Entity.SuperAdmin;
import org.polytech.covid.publics.services.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("medecin")
public class MedecinController {
  private final MedecinService medecinService;

@Autowired
  public MedecinController(MedecinService medecin) { this.medecinService = medecin;}

@GetMapping("list")
 public List<Medecin> getMedecins() {return medecinService.getMedecins();}

  @GetMapping("list/{centre}")
  public List<Medecin> getMedecinsByCentre(@PathVariable("centre") Centre center) {
  return medecinService.getMedecinByCentre(center);
}

  @GetMapping("login")
  @RequestMapping("/validateLogin")
  public Medecin validateLogin(){
    return new Medecin("user successfully authenticated");
  }

  @PostMapping(path = "save")
  public ResponseEntity<Medecin> addNewMedecin(@RequestBody Medecin medecin){
    Medecin newMedecin = medecinService.addNewMedecin(medecin.getMail(),medecin.getNom(),medecin.getPrenom(),medecin.getRole(), medecin.getCentre());
    return  new ResponseEntity<>(newMedecin, OK);
  }

  @PostMapping(path="role")
  public ResponseEntity<Boolean> modifySuperAdmin(@RequestBody RoleForm form) {
    return new ResponseEntity<>(medecinService.isMedecin(form), OK);
  }
  @DeleteMapping("delete/{id}")
  @OnDelete(action = OnDeleteAction.CASCADE)
  public void deleteMedecinByid(@PathVariable("id") Long id) {
    medecinService.deleteMedecin(id);
  }

  @PostMapping(path = "/new/centre/{id}")
  public ResponseEntity<Medecin> addNewMedecinwihCenter(@PathVariable("id")  int id ,@RequestBody UserForm medecin) {
    Medecin newMedecin = medecinService.addnewMedecinwithCentre(id, medecin);
    return new ResponseEntity<>(newMedecin, OK);
  }

  @GetMapping(path = "/centre/{id}")
  public ResponseEntity<Centre> getMedecinCentre(@PathVariable("id")  Long id){
    Centre medecinCentre = medecinService.getCentre(id);
    return  new ResponseEntity<>(medecinCentre, OK);
  }

  @PostMapping ("list/mail")
  public ResponseEntity<Medecin> geMedecinByMail(@RequestBody RoleForm form) {return new ResponseEntity<>( medecinService.getMedecinBymail(form),OK);}

  @PostMapping(path="modify/{id}")
  public ResponseEntity<Medecin> modifyMedecin(@RequestBody UserForm form, @PathVariable("id") Long id) {
    Medecin updatedmedecin = medecinService.modifierMedecin(form, id);
    return new ResponseEntity<>(updatedmedecin, OK);
  }
}
