import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Examen } from 'src/app/_model/Examen';
import { ExamenService } from 'src/app/_service/examen.service';
import { PuenteService } from 'src/app/_service/puente.service';
import { element } from 'protractor';
import { ConsultaExamen } from './../../_model/ConsultaExamen';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-examen',
  templateUrl: './lista-examen.component.html',
  styleUrls: ['./lista-examen.component.css']
})
export class ListaExamenComponent implements OnInit {

  @Input() examen1: Examen = new Examen();
  @Input() dataEntrante: Examen = new Examen();
  @Output() eliminarDetalle = new EventEmitter<number>();
  @Output() examenEnviar = new EventEmitter<number>();

  idExamen: number;

  displayedExamen: Examen[];

  dataSource = new MatTableDataSource<Examen>();
  paginator: any;
  sort: any;

  public consultaExamen: ConsultaExamen;

  constructor(private examenService: ExamenService, private puenteService: PuenteService) { }

  ngOnInit(): void {

    this.puenteService.recibe.emit(this.examen1.id);

    this.examenService.seleccion().subscribe(data => {
      this.displayedExamen = data;
      console.log(this.displayedExamen);
    });

    console.log('hola: ' + this.examen1);


  }

  agregarExamen(id: number){
    this.puenteService.examen.emit(id);
    console.log('otra impresion' + id);
  }

  public eventEliminarDetalle(id: number) {
    this.eliminarDetalle.next(id);
  }

  applySelect(id: number){
    this.idExamen = id;
    console.log(id);
    this.examenEnviar.emit(id);
    this.puenteService.recibe.emit(id);
  }
}
