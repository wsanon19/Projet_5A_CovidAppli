package org.polytech.covid.publics.controllers;

import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.SuperAdmin;
import org.polytech.covid.publics.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("admin")
public class AdminController {
  private final AdminService adminService;
  private CentreController center;

  @Autowired
  public AdminController(AdminService adminService) {
    this.adminService = adminService; }

  @GetMapping("list")
  public List<Admin> getAdmins() {return adminService.getAdmins();}

  @GetMapping("list/{centre}")
  public List<Admin> getAdmin(@PathVariable("centre") Centre centre) {return adminService.getAdminByCentre(centre);}

  @GetMapping("{id}")
  public ResponseEntity<Admin> getAdminByid(@PathVariable("id") Long id) {return new ResponseEntity<>(adminService.getAdmin(id),OK);}

  @DeleteMapping("delete/{id}")
  public void deleteAdminByid(@PathVariable("id") Long id) {
    adminService.deleteAdmin(id);
  }


  @GetMapping(path = "/centre/{id}")
  public ResponseEntity<Centre> getAdminCentre(@PathVariable("id")  Long id){
    Centre adminCentre = adminService.getCentre(id);
    return  new ResponseEntity<>(adminCentre, OK);
  }

  @PostMapping(path="role")
  public ResponseEntity<Boolean> modifySuperAdmin(@RequestBody RoleForm form) {
    return new ResponseEntity<>(adminService.isAdmin(form), OK);
  }

  @PostMapping("list/mail")
  public ResponseEntity<Admin> getAdminByMail(@RequestBody RoleForm form) {return new ResponseEntity<>(adminService.getAdminBymail(form),OK);}


  @PostMapping(path = "save")
  public ResponseEntity<Admin> addNewAdmin(@RequestBody Admin admin){
    Admin newAdmin = adminService.addNewAdmin(admin.getMail(),admin.getNom(),admin.getPrenom(),admin.getRole(),admin.getCentre());
    return  new ResponseEntity<>(newAdmin, OK);
  }

  @PostMapping(path = "/new/centre/{id}")
  public ResponseEntity<Admin> addNewAdminwithCentre(@PathVariable("id")  int id ,@RequestBody UserForm admin){
    Admin newAdmin = adminService.addnewAdminwithCentre(id,admin);
    return  new ResponseEntity<>(newAdmin, OK);
  }

  @PostMapping(path="modify/{id}")
  public ResponseEntity<Admin> modifyAdmin(@RequestBody UserForm form,@PathVariable("id") Long id) {
    Admin updatedadmin = adminService.modifierAdmin(form, id);
    return new ResponseEntity<>(updatedadmin, OK);
  }

}
