import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Medico } from '../_model/Medico';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private url : string = `${environment.HOST}/medicos`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  lista(page: number, size: number) {
    return this.http.get<any>(`${this.url}/retornarAll/${page}/${size}`)
  }

  seleccion(){
    return this.http.get<Medico[]>(`${this.url}/retornarSeleccionM`)
  }

  listarPorId(id: number) {
    return this.http.get<any>(`${this.url}/retornarPorId/${id}`)
  }

  guardar(medico: Medico){
    return this.http.post(`${this.url}/insertar`, medico)
  }

  editar(medico: Medico){
    return this.http.put(`${this.url}/actualizar`, medico)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
