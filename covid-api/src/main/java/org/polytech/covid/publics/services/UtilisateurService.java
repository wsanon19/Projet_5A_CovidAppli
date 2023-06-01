package org.polytech.covid.publics.services;

import org.polytech.covid.publics.Entity.Utilisateur;
import org.polytech.covid.publics.Repos.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService implements UserDetailsService {
    private static Logger log = LoggerFactory.getLogger(UtilisateurService.class);
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

  @Autowired
  public UtilisateurService(final UtilisateurRepository utilisateurRepository, PasswordEncoder password) {
      this.utilisateurRepository = utilisateurRepository;
      this.passwordEncoder = password;
  }

    /**
     * Pour l'exemple j'enregistre un utilisateur au demarrage
     */
  @PostConstruct
  public void createUserDefault(){
      log.info("Creation du user par defaut");
      Utilisateur utilisateur = new Utilisateur();
      utilisateur.setLogin("user");
      utilisateur.setPassword(passwordEncoder.encode("password"));
      log.info("creation du password"+ utilisateur.getPassword());
      this.utilisateurRepository.save(utilisateur);
  }

  @Override
  public UserDetails loadUserByUsername(final String login)
          throws UsernameNotFoundException {
      log.info("recuperation de {}", login);

      Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findByLogin(login);
      if (optionalUtilisateur.isPresent()) {
        Utilisateur utilisateur = optionalUtilisateur.get();
        return new User(utilisateur.getLogin(), utilisateur.getPassword(), List.of());
      } else {
        throw new UsernameNotFoundException("L'utilisateur" + login + " n'existe pas");
      }
  }
}
