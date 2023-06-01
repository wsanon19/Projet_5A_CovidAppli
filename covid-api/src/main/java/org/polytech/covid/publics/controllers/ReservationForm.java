package org.polytech.covid.publics.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
public class ReservationForm {

    public String nom;
    public String prenom;
    public String email;
    public Date date;
}
