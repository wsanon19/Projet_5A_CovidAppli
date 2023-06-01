package org.polytech.covid.publics.controllers;

import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.Medecin;
import org.polytech.covid.publics.Entity.SuperAdmin;
import org.polytech.covid.publics.services.CentreService;
import org.polytech.covid.publics.services.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("superAdmin")
public class SuperAdminController {
  private final SuperAdminService superAdminService;

  @Autowired
  public SuperAdminController(SuperAdminService superAdminService) {
    this.superAdminService = superAdminService;
  }

  @GetMapping("list")
  public List<SuperAdmin> getSuperAdmins() {return superAdminService.getAdmins();}

  @PostMapping("list/mail")
  public ResponseEntity<SuperAdmin> getSuperAdminByMail(@RequestBody RoleForm form) {return new ResponseEntity<>(superAdminService.getSuperAdminByMail(form),OK);}

  @PostMapping(path = "save")
  public ResponseEntity<SuperAdmin> addNewSuperAdmin(@RequestBody SuperAdmin superAdmin){
    SuperAdmin newSuperAdmin = superAdminService.addNewSuperAdmin(superAdmin.getMail(),superAdmin.getNom(),superAdmin.getPrenom(),superAdmin.getRole());
    return  new ResponseEntity<>(newSuperAdmin, OK);

  }

  @PostMapping(path="modify/{id}")
  public ResponseEntity<SuperAdmin> modifySuperAdmin(@RequestBody UserForm form, @PathVariable("id") Long id) {
    SuperAdmin updateSuperAdmin = superAdminService.modifierSuperAdmin(form, id);
    return new ResponseEntity<>(updateSuperAdmin, OK);
  }

  @PostMapping(path="role")
  public ResponseEntity<Boolean> modifySuperAdmin(@RequestBody RoleForm form) {
    return new ResponseEntity<>(superAdminService.isSuperAdmin(form), OK);
  }


  @DeleteMapping("delete/{id}")
  public void deleteSuperAdminByid(@PathVariable("id") Long id) {
    superAdminService.deleteSuperAdmin(id);
  }
}
