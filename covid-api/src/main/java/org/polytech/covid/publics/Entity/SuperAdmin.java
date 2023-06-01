package org.polytech.covid.publics.Entity;

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
@Table(name = "superadmins")
@PrimaryKeyJoinColumn(name = "id")

@OnDelete(action = OnDeleteAction.CASCADE)
public class SuperAdmin extends Utilisateur {
  @OneToMany
  private List<Centre> centres;
}
