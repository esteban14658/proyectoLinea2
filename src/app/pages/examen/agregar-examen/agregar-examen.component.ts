import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Examen } from 'src/app/_model/Examen';
import { ExamenService } from './../../../_service/examen.service';

@Component({
  selector: 'app-agregar-examen',
  templateUrl: './agregar-examen.component.html',
  styleUrls: ['./agregar-examen.component.css']
})
export class AgregarExamenComponent implements OnInit {

  form: FormGroup;
  private id: number;
  private edicion: boolean;

  constructor(private examenService: ExamenService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.inicializarFormularioVacio();

    if (this.edicion === true) {
      this.cargarDatos();
    }

  }

  inicializarFormularioVacio() {
    this.form = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'descripcion': new FormControl('', [Validators.required]),
    });
  }

  cargarDatos() {
    this.examenService.listarPorId(this.id).subscribe(data =>{
        this.form.get("nombre").setValue(data.nombre);
        this.form.get("descripcion").setValue(data.descripcion);
    });
  }

  guardar() {
    let examen = new Examen();
    examen.nombre = this.form.value['nombre'];
    examen.descripcion = this.form.value['descripcion'];

    if (this.edicion == true){
      console.log("editar");
      examen.id = this.id;
      this.examenService.editar(examen).subscribe(() => {
        this.form.reset();
        this.examenService.mensajeCambio.next('Examen editado satisfactoriamente');
        this.router.navigate(['/examen']);
      });
    } else {
      console.log("No editar");
      this.examenService.guardar(examen).subscribe(() => {
        this.form.reset();
        this.examenService.mensajeCambio.next('Examen guardado satisfactoriamente');
        this.router.navigate(['/examen']);
      });
    }
  }

  get nombre(){
    return this.form.get('nombre');
  }

  get descripcion(){
    return this.form.get('descripcion');
  }

}
