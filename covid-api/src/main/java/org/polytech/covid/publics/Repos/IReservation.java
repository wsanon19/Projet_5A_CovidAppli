package org.polytech.covid.publics.Repos;

import org.polytech.covid.publics.Entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IReservation extends JpaRepository<Reservation, Long> {

    Reservation getReservationById(Long id);
    Reservation findReservationByCentre(String centre);
    Reservation findReservationsByCreneau(Date date);
}
