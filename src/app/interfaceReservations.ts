import { covid } from "./interfaceCovid";
import { patient } from "./interfacePatient";

export interface reservation {
    id: number;
    creneau:Date;
    status: Boolean;
    centre: covid;
    patient: patient [];
}