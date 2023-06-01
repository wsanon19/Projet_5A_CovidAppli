package org.polytech.covid.publics.services;

import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Repos.IAdmin;
import org.polytech.covid.publics.Repos.ICentre;
import org.polytech.covid.publics.controllers.RoleForm;
import org.polytech.covid.publics.controllers.UserForm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class AdminService {

  private final PasswordEncoder passwordEncoder;

  private final IAdmin iAdmin;
  private final ICentre iCentre;

  public AdminService(PasswordEncoder passwordEncoder, IAdmin iAdmin, ICentre iCentre) {
    this.passwordEncoder = passwordEncoder;
    this.iAdmin = iAdmin;
    this.iCentre = iCentre;
  }

  public List<Admin> getAdmins() { return iAdmin.findAll();}

  public Centre getCentre(Long id) {
    return  iCentre.getCentreByAdminsContaining(iAdmin.getAdminById(id));
  }

  public Admin addNewAdmin (String email, String name, String firstname, String role, Centre centre) {

    Admin admin = new Admin();
    admin.setMail(email);
    admin.setNom(name);
    admin.setLogin(email);
    admin.setRole("ADMINISTRATEUR");
    admin.setPrenom(firstname);
    admin.setRole(role);
    admin.setCentre(centre);
    admin.setPassword(passwordEncoder.encode("password"));
    this.iAdmin.save(admin);
    return admin;
  }

  public Admin modifierAdmin (Admin admin,String email, String name, String firstname, String role, Centre centre) {
    admin.setMail(email);
    admin.setNom(name);
    admin.setLogin(email);
    admin.setPrenom(firstname);
    admin.setRole(role);
    admin.setCentre(centre);
    admin.setPassword(passwordEncoder.encode("password"));

    this.iAdmin.save(admin);
    return admin;
  }

  public void reMoveAdmin ( Admin admin) {
    this.iAdmin.delete(admin);
  }

  public List<Admin> getAdminByCentre (Centre centre) {
    return iAdmin.findAdminByCentre(centre);
  }

  public Admin getAdmin (Long id) {
    return iAdmin.findAdminById(id);
  }

  public Admin addnewAdminwithCentre(int id, UserForm admin){
    Admin newadmin = new Admin();
    newadmin.setNom(admin.getNom());
    newadmin.setPrenom(admin.getPrenom());
    newadmin.setMail(admin.getMail());
    newadmin.setRole("ADMINISTRATEUR");
    newadmin.setLogin(admin.getMail());
    newadmin.setPassword(passwordEncoder.encode(admin.getPassword()));
    newadmin.setCentre(iCentre.getCentreById(id));
    return iAdmin.save(newadmin);
  }

  public void deleteAdmin(Long id){
    boolean test = iAdmin.existsById(id);

    if(!test) {
      throw new IllegalStateException("User with id " + id +" doesn't exist");
    }
    else
      iAdmin.deleteAdminById(id);

  }
  public Boolean isAdmin(RoleForm form){
    return iAdmin.existsByMail(form.mail);
  }

  public Admin getAdminBymail(RoleForm form){
    return iAdmin.getAdminByMail(form.mail);
  }

  public Admin modifierAdmin (UserForm form, Long id) {
    Admin admin = iAdmin.getAdminById(id);
    if(admin == null) {
      throw new EntityNotFoundException();
    }
    else {
      admin.setNom(form.getNom());
      admin.setPrenom(form.getPrenom());
      admin.setMail(form.getMail());
      admin.setRole("ADMINISTRATEUR");
      admin.setLogin(form.getMail());
      admin.setPassword(passwordEncoder.encode(form.getPassword()));
      return iAdmin.save(admin);
    }
  }

}
