import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Examen } from 'src/app/_model/Examen';
import { ExamenService } from './../../_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<Examen>()

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static : true }) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 1;

  constructor(public examenService: ExamenService, public route: ActivatedRoute, 
              private snackBar: MatSnackBar, public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.examenService.mensajeCambio.subscribe(data => {
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
    this.examenService.listarPorId(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listarPaginado() {
    this.examenService.lista(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.examenService.eliminar(id).subscribe(data => {
      this.examenService.mensajeCambio.next('Examen eliminado satisfactoreamente');
      this.router.navigate(['/examen']);
    });
  }

}
