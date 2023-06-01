package org.polytech.covid.publics.services;

import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Repos.IAdmin;
import org.polytech.covid.publics.Repos.ICentre;
import org.polytech.covid.publics.Repos.IMedecin;
import org.polytech.covid.publics.controllers.UserForm;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Locale;

@Service
public class CentreService {
  private final ICentre iCentre;
  private final IAdmin iAdmin;
  private final IMedecin iMedecin;
  private final AdminService adminService;

  public CentreService(ICentre iCentre, IAdmin iAdmin, IMedecin iMedecin, AdminService adminservice) {
    this.iCentre = iCentre;
    this.iAdmin = iAdmin;
    this.iMedecin = iMedecin;
    this.adminService = adminservice;
  }

  public List<Centre> getCentres () {return  iCentre.findAll();}

  public Centre addNewCentre (String address,String name, String ville,String codePostal) {

    Centre centre = new Centre();
    centre.setAdresse(address);
    centre.setNom(name);
    centre.setVille(ville.toLowerCase(Locale.ROOT));
    centre.setCodePostal(codePostal);

    this.iCentre.save(centre);
    return centre;
  }

  public Centre addNewMedecinToCentre (int id, UserForm medecin) {
    Centre center = iCentre.getCentreById(id);
    if(center == null) {
      throw new EntityNotFoundException();
    }
    else {
      Medecin newmedecin = new Medecin();
      newmedecin.setNom(medecin.getNom());
      newmedecin.setPrenom(medecin.getPrenom());
      newmedecin.setMail(medecin.getMail());
      Medecin entity = iMedecin.save(newmedecin);

      List<Medecin> list = center.getMedecins();
      list.add(entity);
      center.setMedecins(list);
      iCentre.save(center);
      return center;
    }
  }


  public Centre modifierCentre (Centre centre, int id) {
    Centre center = iCentre.getCentreById(id);
    if(center == null) {
      throw new EntityNotFoundException();
    }
    else {
      center.setCodePostal(centre.getCodePostal());
      center.setAdresse(centre.getAdresse());
      center.setNom(centre.getNom());
      center.setVille(centre.getVille());
      this.iCentre.save(center);
      return center;
    }
  }

  public Centre getCentrebyName(String name) {
    return iCentre.findCentreByNom(name);
  }

  public Centre getCentre (String ville) {
    Centre a = iCentre.findCentreByVille(ville);
    return a;
  }

  public Centre getCentrebyiD(int id) {
    return iCentre.getCentreById(id);
  }


  public List<Medecin> getMedecins (int id) {
    Centre center = iCentre.getCentreById(id);
    if(center == null) {
      throw new EntityNotFoundException();
    }
    else {
      return center.getMedecins();
    }
  }

  public List<Admin> getAdmins (int id) {
    Centre center = iCentre.getById(id);
    if(center == null) {
      throw new EntityNotFoundException();
    }
    else {
      return center.getAdmins();
    }
  }
}
