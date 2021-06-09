import { MedicoService } from './../../_service/medico.service';
import { MatSort } from '@angular/material/sort';
import { Medico } from 'src/app/_model/Medico';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'direccion', 'acciones'];
  dataSource = new MatTableDataSource<Medico>()

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static : true }) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 1;

  constructor(private medicoService: MedicoService ,public route: ActivatedRoute, 
              private snackBar: MatSnackBar, public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {

    this.medicoService.mensajeCambio.subscribe(data => {
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
    this.medicoService.listarPorId(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listarPaginado() {
    this.medicoService.lista(this.pageIndex, this.pageSize).subscribe(data => {
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

  eliminar(id: number){
    console.log(id);
    this.medicoService.eliminar(id).subscribe(data => {
      this.medicoService.mensajeCambio.next('Medico eliminado satisfactoreamente');
      this.router.navigate(['/medicos']);
    });
  }
}
