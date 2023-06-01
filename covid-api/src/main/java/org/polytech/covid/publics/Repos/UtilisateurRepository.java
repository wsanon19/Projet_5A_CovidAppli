package org.polytech.covid.publics.Repos;

import org.polytech.covid.publics.Entity.Reservation;
import org.polytech.covid.publics.Entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByLogin(final String email);
}
