import { DetalleConsulta } from './DetalleConsulta';
import { Medico } from 'src/app/_model/Medico';
import { ConsultaExamen } from './ConsultaExamen';
export class Consulta {
    id: number;
    fecha: Date;
    listaDetalleConsulta: DetalleConsulta[];
    listaConsultaExamen: ConsultaExamen[];
    medico: Medico;
}
