package org.polytech.covid.publics.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.GenerationType.AUTO;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Entity
@Data
@AllArgsConstructor
@Getter
@Setter
@Relation(collectionRelation = "bookings", itemRelation = "booking")
public class Reservation extends RepresentationModel<Reservation> {

  @Id
  @GeneratedValue(strategy= AUTO)
  @JsonProperty
  private Long id;
  @JsonProperty
  private Date creneau;
  @JsonProperty
  private Boolean status;

  @ManyToOne
  @JoinColumn(name = "centre_id")
  @JsonBackReference(value = "reservationtocours")
  private Centre centre;

  @ManyToOne
  private UserPatient patient;

  public Reservation() {
  }

  public Reservation(Date creneau, Boolean status, Centre centre, UserPatient patient) {
    add(Link.of("http://localhost:8080/reservations/id"));
  }

  public void setDate(Date date) {
    this.creneau = date;
  }

  public void setStatus(Boolean _status) {
    this.status = _status;
  }

  public void setCentre(Centre center) {
    this.centre = center;
  }

  public void setUtilisateur(UserPatient user) { this.patient = user; }

  public Date getCreneau() {
      return creneau;
    }

    public Boolean getStatus() {
      return status;
    }

    public Centre getCentre() {
      return centre;
    }

    public UserPatient getPatient() {
      return patient;
    }
}
