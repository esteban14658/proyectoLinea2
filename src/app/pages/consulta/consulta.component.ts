import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/_model/Consulta';
import { Medico } from 'src/app/_model/Medico';
import { ConsultaService } from './../../_service/consulta.service';
import { MedicoService } from './../../_service/medico.service';
import { FormGroup } from '@angular/forms';
import { DetalleConsultaComponent } from '../detalle-consulta/detalle-consulta.component';
import { DetalleConsulta } from './../../_model/DetalleConsulta';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'medico', 'acciones'];
  dataSource = new MatTableDataSource<Consulta>()

  public listaDetalleConsulta = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static : true }) sort: MatSort;

  public detalleConsulta: DetalleConsultaComponent;
  //form: FormGroup = this.detalleConsulta.detallesForm;
  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 1;
  medicos: Medico[] = [];

  constructor(public consultaService: ConsultaService, public route: ActivatedRoute, 
              private snackBar: MatSnackBar, public dialog: MatDialog,
              public medicoService: MedicoService, private router: Router) { }

  ngOnInit(): void {
    this.consultaService.mensajeCambio.subscribe(data => {
      this.openSnackBar(data);
      this.listarPaginado();
    });

    this.listarPaginado();
    
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applySelect(id: number){
    this.consultaService.listarPorId(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listarPaginado() {
    this.consultaService.lista(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.registros);
      console.log(data);
      this.dataSource.sort = this.sort;
      this.cantidad = data.cantidadRegistros;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 3000,
    });
  }

  envioDeDatos(){
    
    /*this.consultaService.guardar({
      fecha: this.form.value.fecha;
    }).subscribe(rest => {
      console.log('recibe...', rest);
    })
    this.router.navigate(['/consulta']);*/
  }

  obternerMedicoPorId(id: number){
    
    this.medicoService.lista(0,1000).subscribe(data => {
      this.medicos = data.registros;
      console.log(this.medicos);
    });
  }

  eliminar(id: number){
    console.log(id);
    this.consultaService.eliminar(id).subscribe(data => {
      this.consultaService.mensajeCambio.next('Consulta eliminada satisfactoreamente');
      this.router.navigate(['/consulta']);
    });
  }

}
