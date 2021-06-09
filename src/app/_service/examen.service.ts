import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Examen } from '../_model/Examen';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private url : string = `${environment.HOST}/examen`;
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  lista(page: number, size: number) {
    return this.http.get<any>(`${this.url}/retornarAll/${page}/${size}`)
  }

  listarPorId(id: number) {
    return this.http.get<any>(`${this.url}/retornarPorId/${id}`)
  }

  seleccion(){
    return this.http.get<Examen[]>(`${this.url}/retornarSeleccionE`)
  }

  guardar(examen: Examen){
    return this.http.post(`${this.url}/insertar`, examen)
  }

  editar(examen: Examen){
    return this.http.put(`${this.url}/actualizar`, examen)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/eliminar/${id}`)
  }
  
}
