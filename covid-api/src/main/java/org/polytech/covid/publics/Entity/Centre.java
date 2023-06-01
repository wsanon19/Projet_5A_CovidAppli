package org.polytech.covid.publics.Entity;

import javax.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import static javax.persistence.GenerationType.AUTO;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Centre {
@Id
@GeneratedValue(strategy= AUTO)
@Column(name = "centre_id")
  private int id;
  private String ville;
  private String nom;
  private String adresse;
  private String codePostal;


  @OneToMany(mappedBy = "centre",cascade = CascadeType.ALL,orphanRemoval = true)
  @JsonManagedReference(value = "reservationtocours")
  public List<Reservation> reservations;

  @OneToMany(mappedBy = "centre",cascade = CascadeType.ALL,orphanRemoval = true)
  @JsonManagedReference(value = "medecintocours")
  public List<Medecin> medecins;

  @OneToMany (mappedBy = "centre",cascade = CascadeType.ALL,orphanRemoval = true)
  @JsonManagedReference(value = "admintocours")
  public List<Admin> admins;
/*
  public void setVille(String ville) {
      this.ville = ville;
  }

  public void setNom(String nom) {
      this.nom = nom;
  }

  public void setAdresse(String adresse) {
      this.adresse = adresse;
  }

  public String getVille() { return ville; }

  public String getAdresse() { return adresse; }

  public String getNom() { return nom; }

  public String getCodePostal() {
    return codePostal;
  }

  public void setCodePostal(String codePostal) {
    this.codePostal = codePostal;
  }*/
}
