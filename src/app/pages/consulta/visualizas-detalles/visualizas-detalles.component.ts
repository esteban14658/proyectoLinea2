import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleConsulta } from './../../../_model/DetalleConsulta';
import { ConsultaExamen } from './../../../_model/ConsultaExamen';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MedicoService } from 'src/app/_service/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-visualizas-detalles',
  templateUrl: './visualizas-detalles.component.html',
  styleUrls: ['./visualizas-detalles.component.css']
})
export class VisualizasDetallesComponent implements OnInit {

  id: number;

  dataSourceDetalleConsulta = new MatTableDataSource<DetalleConsulta>();
  dataSourceConsultaExamen = new MatTableDataSource<ConsultaExamen>();

  displayedColumnsDC: string[] = ['diagnostico', 'tratamiento'];
  displayedColumnsCE: string[] = ['nombre', 'descripcion'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public consultaService: ConsultaService, public route: ActivatedRoute, 
    private snackBar: MatSnackBar, public dialog: MatDialog,
    public medicoService: MedicoService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.listarConsultaExamen();

    this.listarDetallesConsulta();

  }

  listarDetallesConsulta() {
    this.consultaService.listarPorId(this.id).subscribe(data => {
      this.dataSourceDetalleConsulta = new MatTableDataSource(data.listaDetalleConsulta);
      console.log(data);
      this.dataSourceDetalleConsulta.sort = this.sort;
    });
  }

  listarConsultaExamen() {
    this.consultaService.listarPorId(this.id).subscribe(data => {
      this.dataSourceConsultaExamen = new MatTableDataSource(data.listaConsultaExamen);
      console.log(data);
      this.dataSourceConsultaExamen.sort = this.sort;
    });
  }

}
