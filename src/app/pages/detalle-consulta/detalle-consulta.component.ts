import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleConsulta } from './../../_model/DetalleConsulta';

@Component({
  selector: 'app-detalle-consulta',
  templateUrl: './detalle-consulta.component.html',
  styleUrls: ['./detalle-consulta.component.css']
})
export class DetalleConsultaComponent implements OnInit {

   @Input() detalleConsulta: DetalleConsulta = new DetalleConsulta();
   @Output() eliminarDetalle = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public eventEliminarDetalle(id: number)
  {
    this.eliminarDetalle.next(id);
  }

  validacion(dConsulta: DetalleConsulta){
    if(dConsulta.diagnostico == "")
      console.log('La descripción del diagnótico es requerido');
    else if(dConsulta.tratamiento == "")
      console.log('La descripción del tratamiento es requerido');
  }
}
