package org.polytech.covid.publics.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "admins")
@PrimaryKeyJoinColumn(name = "id")
@OnDelete(action = OnDeleteAction.CASCADE)
public class Admin extends Utilisateur {
  @ManyToOne
  @JoinColumn(name = "centre_id")
  @JsonBackReference(value = "admintocours")
  private Centre centre;

  @OneToMany
  private List<Medecin> medecins;

  public Centre getCentre() {
    return centre;
  }

  public void setCentre(Centre centre) {
    this.centre = centre;
  }
}
