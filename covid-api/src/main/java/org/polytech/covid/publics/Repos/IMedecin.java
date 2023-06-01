package org.polytech.covid.publics.Repos;

import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IMedecin extends JpaRepository<Medecin, Integer> {
  List<Medecin> findMedecinByCentreContaining(Centre center);
  List<Medecin> findMedecinByCentre(Centre center);
  Medecin findMedcinByNom(String name);
  Medecin getMedecinById(Long id);
  Medecin getMedecinByMail(String mail);
  Boolean existsByMail(String mail);
  Boolean existsById(Long id);

  void deleteMedecinById(Long id);
}
