import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from './../../../_service/medico.service';
import { Medico } from 'src/app/_model/Medico';
import { ConsultaService } from './../../../_service/consulta.service';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from 'src/app/_model/Consulta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetalleConsulta } from './../../../_model/DetalleConsulta';
import { Examen } from 'src/app/_model/Examen';
import { ExamenService } from './../../../_service/examen.service';
import { ConsultaExamen } from 'src/app/_model/ConsultaExamen';
import { PuenteService } from './../../../_service/puente.service';
import { ListaExamenComponent } from './../../lista-examen/lista-examen.component';

@Component({
  selector: 'app-agregar-consulta',
  templateUrl: './agregar-consulta.component.html',
  styleUrls: ['./agregar-consulta.component.css']
})
export class AgregarConsultaComponent implements OnInit {

  
  @Input() conEx: ConsultaExamen = new ConsultaExamen();
  @Input() examenTraer: Examen;

  @ViewChild(ListaExamenComponent) consultaExamPrueba: ListaExamenComponent;

  form: FormGroup;
  id: number;
  private edicion: boolean;

  examenes = new FormControl();
  
  medicos: Medico[];
  paginator: any;
  sort: any;
  idExamen: number;

  dataSource = new MatTableDataSource<Consulta>();

  displayedMedico: Medico[];
  displayedExamen: Examen[];
  listaDetalleConsulta: DetalleConsulta[];
  listaConsultaExamen: ConsultaExamen[];
  consulta = new Consulta();
  objetoDeExamen: Examen;

  selectedExamen: Examen[];

  constructor(private medicoService: MedicoService, private consultaService: ConsultaService,
              private examenService: ExamenService, private puenteService: PuenteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.listaDetalleConsulta = new Array<DetalleConsulta>();
    this.listaConsultaExamen = new Array<ConsultaExamen>();

    this.traerId(this.idExamen);
    this.medicoService.seleccion().subscribe(data => {
      this.displayedMedico = data;
      console.log(this.displayedMedico);
    });

    this.examenService.seleccion().subscribe(data => {
      this.displayedExamen = data;
      console.log(this.displayedExamen);
    });

    /*this.examenService.seleccion().subscribe(data => {
      this.puenteService.recibe.subscribe(data =>{
        this.displayedExamen = data;
        console.log('Impresion seleccion: ' + this.displayedExamen);
      });
    });*/

    console.log('Impresion seleccion: ' + this.displayedExamen);

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.inicializarFormularioVacio();

    if (this.edicion === true) {
      this.cargarDatos();
    }

    this.puenteService.recibe.subscribe(rta =>{
      this.idExamen = rta;
    })

  }

  filter (data: any){
    console.log(data);
    this.selectedExamen = data.value;
    //this.listaConsultaExamen.forEach(x => {
    //})
  }

  inicializarFormularioVacio() {
    this.form = new FormGroup({
      'fecha': new FormControl('', [Validators.required]),
      'medico': new FormControl('', [Validators.required]),
      'listaDetalleConsulta': new FormControl('', [Validators.required]),
      'listaConsultaExamen': new FormControl('', [Validators.required]),
      'infoAdicional': new FormControl('', [Validators.required]),
    });
  }

  cargarDatos() {
    this.consultaService.listarPorId(this.id).subscribe(data =>{
        this.form.get("fecha").setValue(data.fecha);
        this.form.get("medico").setValue(data.medico);
        this.form.get("listaDetalleConsulta").setValue(data.listaDetalleConsulta);
        this.form.get("listaConsultaExamen").setValue(data.listaConsultaExamen);
    });
  }

  guardar() {  
    //this.consulta.fecha = this.form.value['fecha'];
    //medico.id = //this.form.value['medico'];
    //this.consulta.medico = medico;
    //this.consulta.medico = this.displayedMedico;
    if (this.selectedExamen != null){
    this.selectedExamen.forEach(x =>{
      let oExamen = new ConsultaExamen();
      oExamen.examen = x;
      oExamen.infoAdicional = this.conEx.infoAdicional;
      this.listaConsultaExamen.push(oExamen);
    });
  }
    this.consulta.listaDetalleConsulta = this.listaDetalleConsulta;
    this.consulta.listaConsultaExamen = this.listaConsultaExamen;

    if (this.edicion == true){
      console.log("editar");
      this.consulta.id = this.id;
      this.consultaService.editar( this.consulta).subscribe(() => {
        this.form.reset();
        this.consultaService.mensajeCambio.next('Consulta editado satisfactoriamente');
        this.router.navigate(['/consulta']);
      });
    } else {
      console.log("No editar");
      this.consultaService.guardar(this.consulta).subscribe(() => {
        this.form.reset();
        this.consultaService.mensajeCambio.next('Consulta guardado satisfactoriamente');
        this.router.navigate(['/consulta']);
      });
    }
  }

  applySelect(id: number){
    this.medicoService.listarPorId(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.medicos = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  obternerMedicoPorId(){
    
    this.medicoService.lista(0,1000).subscribe(data => {
      this.medicos = data.registros;
      console.log(this.medicos);
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adicionarDetalle(){
    let dConsulta = new DetalleConsulta();
    dConsulta.id = this.listaDetalleConsulta.length + 1;
    dConsulta.diagnostico ='';
    dConsulta.tratamiento ='';
    this.listaDetalleConsulta.push(dConsulta);
  }

  /* adicionarExamen(){
    let oExamen = new ConsultaExamen();
    oExamen.id = this.listaConsultaExamen.length + 1;
    /*this.puenteService.recibe.subscribe(rta =>{
      this.idExamen = rta;
    });
    console.log('dios ayuda '+ this.idExamen);
    oExamen.examen = {
      "id": this.idExamen,
      "nombre": 'prueba',
      "descripcion": 'prueba'
    }
    oExamen.examen = this.examenes.value;
    oExamen.infoAdicional = 'prueba';
    this.listaConsultaExamen.push(oExamen);
  } */

  eliminarDetalleConsulta(id: number)
  {
    let dConsulta : DetalleConsulta = this.listaDetalleConsulta.find(x=> x.id == id);
    if(dConsulta.id != 0 )
    {
      this.listaDetalleConsulta = this.listaDetalleConsulta.filter(x=> x.id != id);
    }
  }

  eliminarExamen(id: number){
    let oExamen: ConsultaExamen = this.listaConsultaExamen.find(x=> x.id == id);
    if(oExamen.id != 0){
      this.listaConsultaExamen = this.listaConsultaExamen.filter(x => x.id != id);
    }
  }

  traerId(id: number){
    this.idExamen = id;
  }

  get infoAdicional(){
    return this.form.get('infoAdicional');
  }
}
