import { reservation } from "./interfaceReservations";

export interface covid {
    id: number;
    nom: string;
    adresse: string;
    codePostal: string;
    ville: string;
    reservations: reservation[];
}