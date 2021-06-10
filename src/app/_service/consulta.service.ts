import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from '../_model/Consulta';
import { Examen } from '../_model/Examen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url : string = `${environment.HOST}/consultas`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  lista(page: number, size: number) {
    return this.http.get<any>(`${this.url}/retornarAll/${page}/${size}`)
  }

  listarPorId(id: number) {
    return this.http.get<any>(`${this.url}/retornarPorId/${id}`)
  }

  guardar(consulta: Consulta){
    return this.http.post(`${this.url}/insertar`, consulta)
  }

  editar(consulta: Consulta){
    return this.http.put(`${this.url}/actualizar`, consulta)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/eliminar/${id}`)
  }

  eliminarConsultaExamen(idConsulta: number, idExamen: number){
    return this.http.delete(`${this.url}/eliminarConsultaExamenPorId/${idConsulta}/${idExamen}`)
  }

  eliminarDetalleConsulta(id: number){
    return this.http.delete(`${this.url}/eliminarDetalleConsultaPorId/${id}`)
  }
}
