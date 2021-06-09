import { Consulta } from "./Consulta";
import { Examen } from "./Examen";

export class ConsultaExamen {
    id: number;
    consulta: Consulta;
    examen: Examen;
    infoAdicional: String;
}