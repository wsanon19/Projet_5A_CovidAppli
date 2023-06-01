package org.polytech.covid.config;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tag;
import io.micrometer.core.instrument.Timer;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Configuration
@Aspect
@RequestMapping("rdv")
public class CountAppointment {
  private final MeterRegistry registry;

  @Autowired
  public CountAppointment(MeterRegistry registry) {
    this.registry = registry;
  }

  @AfterReturning("execution(public * org.polytech.covid.publics.services.ReservationService.addnewReservation(..))")//Marquer une fonction comme un conseil à exécuter avant la ou les méthodes couvertes par Pointcut,
  //si la méthode retourne avec succès.
  public void succes(JoinPoint joinPoint) {
    Tag tag = Tag.of("rdv-impl", joinPoint.getTarget().getClass().getSimpleName());
    registry.counter("rdv-enregistré", List.of(tag)).increment();
  }

  @AfterThrowing("execution(public * org.polytech.covid.publics.services.ReservationService.addnewReservation(..))") //est exécutée après un point de jonction ne se termine pas normalement et finit par lancer une exception.
  public void fail(JoinPoint joinPoint) {
    Tag tag = Tag.of("rdv-impl", joinPoint.getTarget().getClass().getSimpleName());
    registry.counter("rdv-failed", List.of(tag)).increment();
  }

  @GetMapping("count")
  @Around("execution(public * org.polytech.covid.publics.services.ReservationService.addnewReservation(..))") //garantit qu'une règle peut être exécuté avant et après l'exécution de la méthode.
  public Object duration(ProceedingJoinPoint joinPoint)
    throws Throwable {
    Tag tag = Tag.of("rdv-impl", joinPoint.getTarget().getClass().getSimpleName());
    Timer timer = registry.timer("rdv-duration", List.of(tag));
    Instant startTime = Instant.now();
    try {
      return joinPoint.proceed(joinPoint.getArgs());
    } finally {
      timer.record(Duration.between(startTime, Instant.now()));
    }
  }
}
