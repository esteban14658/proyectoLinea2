import { Injectable, Output, EventEmitter } from '@angular/core';
import { Examen } from 'src/app/_model/Examen';

@Injectable({
  providedIn: 'root'
})
export class PuenteService {

  @Output() recibe: EventEmitter<number> = new EventEmitter();
  @Output() examen: EventEmitter<number> = new EventEmitter();

  public examenCompartir: Examen;

  constructor() { }

}
