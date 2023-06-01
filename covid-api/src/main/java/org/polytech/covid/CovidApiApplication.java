package org.polytech.covid;

import org.polytech.covid.publics.Entity.Admin;
import org.polytech.covid.publics.Entity.Centre;
import org.polytech.covid.publics.Entity.SuperAdmin;
import org.polytech.covid.publics.Repos.IAdmin;
import org.polytech.covid.publics.Repos.ISuperAdmin;
import org.polytech.covid.publics.controllers.ReservationForm;
import org.polytech.covid.publics.services.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.Link;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

@SpringBootApplication
public class CovidApiApplication {
  private final ISuperAdmin iSuperAdmin;
  private final IAdmin iAdmin;

  public CovidApiApplication(ISuperAdmin iSuperAdmin,
                             IAdmin iAdmin) {
    this.iSuperAdmin = iSuperAdmin;
    this.iAdmin = iAdmin;
  }

  public static void main(String[] args) {
		SpringApplication.run(CovidApiApplication.class, args);
	}

  @Bean
  CommandLineRunner runner(CentreService centreService,
                           UtilisateurService utilisateurService,
                           MedecinService medecinService,
                           AdminService adminService,
                           SuperAdminService superAdminService,
                           UserPatientService patientService,
                           ReservationService reservation,
                           PasswordEncoder password
  ){
    return args -> {
      final PasswordEncoder passwordEncoder = password;

      centreService.addNewCentre("2 Rue Jean l'amour, 54000", "Polytech Nancy","Nancy", "54500");
      centreService.addNewCentre("3 Rue Jean d'arc, 95300", "OuiLab","Paris", "25480");

      centreService.addNewCentre("2 Rue Des Marthyr, 75000", "Ma santé","Anger", "33400");

      adminService.addNewAdmin("jean@durandadm.fr", "DurandAdm", "jean", "ADMINISTRATEUR", centreService.getCentre("nancy"));
      Admin adm = adminService.addNewAdmin("remi@Martinadm.fr", "MartinAdm", "remi", "ADMINISTRATEUR", centreService.getCentre("paris"));
      adm.setPassword(passwordEncoder.encode("password"));
      iAdmin.save(adm);
      adminService.addNewAdmin("christine@Borneadm.fr", "BorneADM", "Christine", "ADMINISTRATEUR", centreService.getCentre("anger"));

      superAdminService.addNewSuperAdmin("jean@durand.fr", "DurandSupADM", "jean", "SUPER_ADMINISTRATEUR");
      superAdminService.addNewSuperAdmin("remi@Martin.fr", "MartinSUPADM", "remi", "SUPER_ADMINISTRATEUR");
      SuperAdmin admin =  superAdminService.addNewSuperAdmin("christine@Borne.fr", "BorneSUPADM", "Christine", "SUPER_ADMINISTRATEUR");


      patientService.addNewPatient("Blondeau", "Brice", "bb@gmail.com", medecinService.getMedecinByNom("TestName"));
      patientService.addNewPatient("Macron", "Remi", "macronremi@gmail.com", medecinService.getMedecinByNom("MartinMED"));
      patientService.addNewPatient("Mergez", "Berenice", "berenicemergez@gmail.com", medecinService.getMedecinByNom("Bornemed"));

      SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
      reservation.addnewReservation(new ReservationForm("patrick","fiori","patrick@test",simpleDateFormat.parse("18/01/2022")),1);


/*
      SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
      reservation.addnewReservation(simpleDateFormat.parse("18/01/2022"), true, centreService.getCentre("nancy"), patientService.getPatientByName("Blondeau"));
      reservation.addnewReservation(simpleDateFormat.parse("20/12/2022"), false, centreService.getCentre("paris"), patientService.getPatientByName("Macron") );
      reservation.addnewReservation(simpleDateFormat.parse("25/12/2022"), true, centreService.getCentre("anger"), patientService.getPatientByName("Mergez") );
      reservation.addnewReservation(simpleDateFormat.parse("26/03/2023"), true, centreService.getCentre("nancy"), patientService.getPatientByName("Blondeau") );*/
    };
  }

  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowCredentials(true);
    //corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
    corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200","http://localhost:4455","http://13.37.112.147","http://www.tosucceed.site" ,"http://tosucceed.site","http://localhost:4455"));
    corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
      "Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
      "Access-Control-Request-Method", "Access-Control-Request-Headers", "application/x-www-form-urlencoded"));
    corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
      "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
    corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
    return new CorsFilter(urlBasedCorsConfigurationSource);
  }
}


