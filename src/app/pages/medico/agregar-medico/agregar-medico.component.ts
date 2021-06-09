import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Medico } from 'src/app/_model/Medico';
import { MedicoService } from './../../../_service/medico.service';
import { Direccion } from './../../../_model/Direccion';

@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.css']
})
export class AgregarMedicoComponent implements OnInit {

  form: FormGroup;
  private id: number;
  private edicion: boolean;

  constructor(private medicoService: MedicoService,
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
      'apellido': new FormControl('', [Validators.required]),
      'correo': new FormControl('', [Validators.required]),
      'direccionDetallada': new FormControl('', [Validators.required]),
      'barrio': new FormControl('', [Validators.required]),
      'codigoPostal': new FormControl('', [Validators.required]),
    });
  }

  cargarDatos() {
    this.medicoService.listarPorId(this.id).subscribe(data =>{
        this.form.get("nombre").setValue(data.nombre);
        this.form.get("apellido").setValue(data.apellido);
        this.form.get("correo").setValue(data.correo);
        this.form.get("direccionDetallada").setValue(data.direccion.direccionDetallada);
        this.form.get("barrio").setValue(data.direccion.barrio);
        this.form.get("codigoPostal").setValue(data.direccion.codigoPostal);
    });
  }

  guardar() {
    let medico = new Medico();
    let direccion = new Direccion();
    medico.nombre = this.form.value['nombre'];
    medico.apellido = this.form.value['apellido'];
    medico.correo = this.form.value['correo'];
    direccion.direccionDetallada = this.form.value['direccionDetallada'];
    direccion.barrio = this.form.value['barrio'];
    direccion.codigoPostal = this.form.value['codigoPostal'];
    medico.direccion = direccion;
    console.log(medico);

    if (this.edicion == true){
      console.log("editat");
      medico.id = this.id;
      this.medicoService.editar(medico).subscribe(() => {
        this.form.reset();
        this.medicoService.mensajeCambio.next('Medico editado satisfactoriamente');
        this.router.navigate(['/medicos']);
      });
    } else {
      console.log("No editar");
      this.medicoService.guardar(medico).subscribe(() => {
        this.form.reset();
        this.medicoService.mensajeCambio.next('Medico guardado satisfactoriamente');
        this.router.navigate(['/medicos']);
      });
    }
  }

  get nombre(){
    return this.form.get('nombre');
  }

  get apellido(){
    return this.form.get('apellido');
  }

  get correo(){
    return this.form.get('correo');
  }

  get direccionDetallada(){
    return this.form.get('direccionDetallada');
  }

  get barrio(){
    return this.form.get('barrio');
  }

  get codigoPostal(){
    return this.form.get('codigoPostal');
  }
}
