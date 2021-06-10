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
  idConsulta: number;

  dataSourceDetalleConsulta = new MatTableDataSource<DetalleConsulta>();
  dataSourceConsultaExamen = new MatTableDataSource<ConsultaExamen>();

  displayedColumnsDC: string[] = ['diagnostico', 'tratamiento', 'acciones'];
  displayedColumnsCE: string[] = ['nombre', 'descripcion', 'acciones'];

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
      this.idConsulta = data.id;
      this.dataSourceConsultaExamen.sort = this.sort;
    });
  }

  eliminarDetalleConsulta(id: number){
    this.consultaService.eliminarDetalleConsulta(id).subscribe(data => {
      this.consultaService.mensajeCambio.next('detalle eliminado satisfactoreamente');
      this.router.navigate(['/consulta/visualizardetalles/' + this.idConsulta]);
    });
  }

  eliminarConsultaExamen(id: number){
    this.consultaService.eliminarConsultaExamen(this.idConsulta,id).subscribe(data => {
      this.consultaService.mensajeCambio.next('detalle eliminado satisfactoreamente');
      this.router.navigate(['/consulta/visualizardetalles/' + this.idConsulta]);
    });
  }

}
