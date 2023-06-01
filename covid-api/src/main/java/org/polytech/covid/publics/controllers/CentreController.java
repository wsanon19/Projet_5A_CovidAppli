package org.polytech.covid.publics.controllers;


import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.services.CentreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("centre")
public class CentreController {
  private final CentreService centreService;

  @Autowired
  public CentreController(CentreService centreService) {
    this.centreService = centreService;
  }

  @GetMapping("list")
  public List<Centre> getCentres() {
    return centreService.getCentres();
  }

  @GetMapping("list/{nom}")
  public Centre getCentre(@PathVariable("nom") String nom) {
    return centreService.getCentrebyName(nom);
  }

  @GetMapping("/{id}")
  public Centre getCentreById(@PathVariable("id") int id) {
    return centreService.getCentrebyiD(id);
  }

  @GetMapping("medecins/{id}")
  public ResponseEntity<List<Medecin>> getMedecins(@PathVariable("id") int id) {
    List<Medecin> medecins = centreService.getMedecins(id);
    return new ResponseEntity<>(medecins, OK);
  }

  @GetMapping("admins/{id}")
  public ResponseEntity<List<Admin>> getAdmins(@PathVariable("id") int id) {
    List<Admin> admins = centreService.getAdmins(id);
    return new ResponseEntity<>(admins, OK);
  }

  @PostMapping(path="medecin/{id}")
  public ResponseEntity<Centre> addMedecinToCentre(@PathVariable("id") int id,@RequestBody UserForm medecin) {
    Centre updateCentre = centreService.addNewMedecinToCentre(id, medecin);
    return new ResponseEntity<>(updateCentre, OK);
  }

//  @PostMapping(path="admin/{id}")
//  public ResponseEntity<Centre> addAdminToCentre(@PathVariable("id") int id,@RequestBody UserForm admin) {
//    Centre updateCentre = centreService.addNewAdminToCentre(id, admin);
//    return new ResponseEntity<>(updateCentre, OK);
//  }

  @PostMapping(path = "save")
  public ResponseEntity<Centre> addNewCentre(@RequestBody Centre center) {
    Centre newCentre = centreService.addNewCentre(center.getAdresse(), center.getNom(), center.getVille(), center.getCodePostal());
    return new ResponseEntity<>(newCentre, OK);
  }

  @PostMapping(path="modify/{id}")
  public ResponseEntity<Centre> modifyCenter(@RequestBody Centre center,@PathVariable("id") int id) {
    Centre newCentre = centreService.modifierCentre(center, id);
    return new ResponseEntity<>(newCentre, OK);
  }
}

