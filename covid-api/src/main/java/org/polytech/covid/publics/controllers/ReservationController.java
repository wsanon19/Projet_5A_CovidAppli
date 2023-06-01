package org.polytech.covid.publics.controllers;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.Refill;
import org.aspectj.lang.annotation.Aspect;
import org.polytech.covid.publics.Entity.*;
import org.polytech.covid.publics.services.CentreService;
import org.polytech.covid.publics.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RestControllerAdvice
@Configuration
@Aspect
@RequestMapping("reservations")
public class ReservationController {

  public ReservationService reservationService;
  public CentreService centreService;

  //rajoute 10 tokens toutes les minutes
  Refill refill = Refill.intervally(10, Duration.ofMinutes(1));
  //capacité max de 10 token
  Bandwidth limit = Bandwidth.classic(10, refill);
  Bucket bucket = Bucket.builder().addLimit(limit).build();

  @Autowired
  public ReservationController(ReservationService reservationService) {
    this.reservationService = reservationService;
  }

  @GetMapping("list")
  public List<Reservation> getReservations() {return reservationService.getReservations();}

  @GetMapping("list/{creneau}")
  public Reservation getResevation(@PathVariable("creneau") Date creneau){ return reservationService.getReservationByCreneau(creneau);}

  @GetMapping("validate/{id}")
  public ResponseEntity<Boolean> validate(@PathVariable("id") Long reservation){ return new ResponseEntity<>(reservationService.validateReservation(reservation),OK);}




  @PostMapping(path = "save/{id}")
  public ResponseEntity<Reservation> addNewReservation(@RequestBody ReservationForm reservation, @PathVariable("id")  int id) throws Exception {

    ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

    if(probe.isConsumed()) {
        Reservation newReservation = reservationService.addnewReservation(reservation, id);
        newReservation.add(Link.of("http://localhost:12037/reservations/list"));
        HttpHeaders head = new HttpHeaders();
        head.set("X-Rate-Limit-Remaining", Long.toString(probe.getRemainingTokens()));
        return new ResponseEntity<>(newReservation, head, OK);
    }
    long delaiEnSeconde = probe.getNanosToWaitForRefill() / 1_000_000_000;
    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
      .header("X-Rate-Limit-Retry-After-Seconds", String.valueOf(delaiEnSeconde))
      .build();
  }
}
