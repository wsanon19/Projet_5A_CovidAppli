package org.polytech.covid.publics.services;

import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Repos.ICentre;
import org.polytech.covid.publics.Repos.IMedecin;
import org.polytech.covid.publics.controllers.RoleForm;
import org.polytech.covid.publics.controllers.UserForm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class MedecinService {

  private final PasswordEncoder passwordEncoder;
  private final IMedecin iMedecin;
  private final ICentre iCentre;

  public MedecinService(PasswordEncoder passwordEncoder, IMedecin medecin, ICentre iCentre) {
    this.passwordEncoder = passwordEncoder;
    this.iMedecin = medecin;
    this.iCentre = iCentre;
  }

  public List<Medecin> getMedecins() { return iMedecin.findAll();}

  public Medecin addNewMedecin (String email, String name, String firstname, String role, Centre centre ) {

    Medecin medecin = new Medecin();
    medecin.setMail(email);
    medecin.setNom(name);
    medecin.setLogin(email);
    medecin.setPrenom(firstname);
    medecin.setRole(role);
    medecin.setCentre(centre);

    this.iMedecin.save(medecin);
    return medecin;
  }

  public Centre getCentre(Long id) {
    return  iCentre.getCentreByMedecinsContaining(iMedecin.getMedecinById(id));
  }

  public void reMoveMedecin ( Medecin medecin) {
    this.iMedecin.delete(medecin);
  }

  public Medecin modifierMedecin (Medecin medecin,String email, String name, String firstname, String role, Centre centre) {
    medecin.setMail(email);
    medecin.setNom(name);
    medecin.setPrenom(firstname);
    medecin.setRole(role);
    medecin.setCentre(centre);

    medecin.setPassword(passwordEncoder.encode("password"));
    this.iMedecin.save(medecin);
    return medecin;
  }

  public List<Medecin> getMedecinByCentre (Centre centre) {
    return iMedecin.findMedecinByCentre(centre);
  }

  public Medecin getMedecinByNom(String nom) { return iMedecin.findMedcinByNom(nom);}

  public Medecin addnewMedecinwithCentre(int id, UserForm medecin){
    Medecin newmedecin = new Medecin();
    newmedecin.setNom(medecin.getNom());
    newmedecin.setPrenom(medecin.getPrenom());
    newmedecin.setRole("MEDECIN");
    newmedecin.setMail(medecin.getMail());
    newmedecin.setLogin(medecin.getMail());
    newmedecin.setPassword(passwordEncoder.encode(medecin.getPassword()));
    newmedecin.setCentre(iCentre.getCentreById(id));
    return iMedecin.save(newmedecin);
  }

  public Boolean isMedecin(RoleForm form){
    return iMedecin.existsByMail(form.mail);
  }

  public Medecin getMedecinBymail(RoleForm form){
    return iMedecin.getMedecinByMail(form.mail);
  }



  public void deleteMedecin(Long id){

    boolean test = iMedecin.existsById(id);

    if(!test) {
      throw new IllegalStateException("User with id " + id +" doesn't exist");
    }
    else
      iMedecin.deleteMedecinById(id);

  }

  public Medecin modifierMedecin (UserForm form, Long id) {
    Medecin medecin = iMedecin.getMedecinById(id);
    if(medecin == null) {
      throw new EntityNotFoundException();
    }
    else {
      medecin.setNom(form.getNom());
      medecin.setPrenom(form.getPrenom());
      medecin.setMail(form.getMail());
      medecin.setRole("MEDECIN");
      medecin.setLogin(form.getMail());
      medecin.setPassword(passwordEncoder.encode(medecin.getPassword()));
      return iMedecin.save(medecin);
    }
  }
}
