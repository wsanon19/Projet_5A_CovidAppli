package org.polytech.covid.publics.services;

import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Entity.Reservation;
import org.polytech.covid.publics.Entity.UserPatient;
import org.polytech.covid.publics.Repos.IUserPatient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPatientService {
  private final IUserPatient ipatientService;

  public UserPatientService(IUserPatient ipatient) {
    this.ipatientService = ipatient;
  }

  public List<UserPatient> getPatients() { return ipatientService.findAll();}

  public UserPatient getPatientByReservation(Reservation reservation) {
    return ipatientService.findPatientByReservations(reservation);
  }

  public List<UserPatient> getPatientByMedecin(Medecin medecin) {
    return ipatientService.findPatientByMedecin(medecin);
  }

  public UserPatient getPatientByName(String name) {
    return ipatientService.findPatientByNom(name);
  }

  public UserPatient addNewPatient (String nom, String prenom, String email, Medecin medecin) {

    UserPatient patient = new UserPatient();
    patient.setNom(nom);
    patient.setPrenom(prenom);
    patient.setMail(email);
    patient.setMedecin(medecin);

    this.ipatientService.save(patient);
    return patient;
  }
}
