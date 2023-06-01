package org.polytech.covid.publics.controllers;

import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Entity.Reservation;
import org.polytech.covid.publics.Entity.UserPatient;
import org.polytech.covid.publics.services.UserPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("user")
public class UserPatientController {
  private final UserPatientService patientService;

  @Autowired
  public UserPatientController(UserPatientService patientService) {
    this.patientService = patientService;
  }

  @GetMapping("list")
  public List<UserPatient> getPatients() {return patientService.getPatients();}

  @GetMapping("list/{Medecin}")
  public List<UserPatient> getPatientByMedecin(@PathVariable("Medecin") Medecin medecin) {return patientService.getPatientByMedecin(medecin);}

  @GetMapping("list/{reservation}")
  public UserPatient getPatientByReservation(@PathVariable("reservation") Reservation reservation) {return patientService.getPatientByReservation(reservation);}

  @GetMapping("list/{nom}")
  public UserPatient getPatientByNom(@PathVariable("nom") String nom) {return patientService.getPatientByName(nom);}

  @PostMapping(path = "save")
  public ResponseEntity<UserPatient> addNewPatient(@RequestParam("nom") String nom,
                                               @RequestParam("prenom") String prenom,
                                               @RequestParam("email") String email,
                                               @RequestParam("Medecin") Medecin medecin){
    UserPatient newPatient = patientService.addNewPatient(nom,prenom,email,medecin);
    return  new ResponseEntity<>(newPatient, OK);
  }
}
