package org.polytech.covid.publics.Repos;

import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Entity.Reservation;
import org.polytech.covid.publics.Entity.UserPatient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.polytech.covid.publics.Entity.UserPatient;

@Repository
public interface IUserPatient extends JpaRepository<UserPatient, Long> {
  UserPatient findPatientByReservations(Reservation reservation);
  UserPatient findPatientByNom(String nom);
  List<UserPatient> findPatientByMedecin(Medecin medecin);
  UserPatient getPatientById(int id);
}
