package org.polytech.covid.publics.services;

import org.polytech.covid.publics.Entity.SuperAdmin;
import org.polytech.covid.publics.Repos.ISuperAdmin;
import org.polytech.covid.publics.controllers.RoleForm;
import org.polytech.covid.publics.controllers.UserForm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SuperAdminService {

  private final PasswordEncoder passwordEncoder;

  public final ISuperAdmin iSuperAdmin;

  public SuperAdminService(PasswordEncoder passwordEncoder, ISuperAdmin superAdmin) {
    this.passwordEncoder = passwordEncoder;
    this.iSuperAdmin = superAdmin;
  }

  public List<SuperAdmin> getAdmins() { return iSuperAdmin.findAll();}

  public SuperAdmin addNewSuperAdmin (String email, String name, String firstname, String role) {

    SuperAdmin superAdmin = new SuperAdmin();
    superAdmin.setMail(email);
    superAdmin.setNom(name);
    superAdmin.setPrenom(firstname);
    superAdmin.setLogin(email);
    superAdmin.setPassword(passwordEncoder.encode("password"));
    superAdmin.setRole(role);

    return this.iSuperAdmin.save(superAdmin);

  }

  public void reMoveSuperAdmin (SuperAdmin superAdmin) {
    this.iSuperAdmin.delete(superAdmin);
  }

  public SuperAdmin modifierSuperAdmin (UserForm form, Long id) {
    SuperAdmin superAdmin = iSuperAdmin.getMedecinById(id);
    if(superAdmin == null) {
      throw new EntityNotFoundException();
    }
    else {
      superAdmin.setNom(form.getNom());
      superAdmin.setPrenom(form.getPrenom());
      superAdmin.setMail(form.getMail());
      superAdmin.setRole("SUPERADMIN");
      superAdmin.setLogin(form.getMail());
      superAdmin.setPassword(passwordEncoder.encode(form.getPassword()));
      return iSuperAdmin.save(superAdmin);
    }
  }

  public Boolean isSuperAdmin(RoleForm form){
    return iSuperAdmin.existsByMail(form.mail);
  }

  public void deleteSuperAdmin(Long id ){
    boolean test = iSuperAdmin.existsById(id);

    if(!test) {
      throw new IllegalStateException("User with id " + id +" doesn't exist");
    }
    else
      iSuperAdmin.deleteSuperAdminById(id);

  }

  public SuperAdmin getSuperAdminByMail(RoleForm form) {
    return iSuperAdmin.getSuperAdminByMail(form.mail);
  }
}
