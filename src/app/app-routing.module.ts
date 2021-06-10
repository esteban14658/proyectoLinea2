import { MedicoComponent } from './pages/medico/medico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarMedicoComponent } from './pages/medico/agregar-medico/agregar-medico.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { AgregarExamenComponent } from './pages/examen/agregar-examen/agregar-examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AgregarConsultaComponent } from './pages/consulta/agregar-consulta/agregar-consulta.component';
import { VisualizasDetallesComponent } from './pages/consulta/visualizas-detalles/visualizas-detalles.component';


const routes: Routes = [
  {path: 'medicos', component: MedicoComponent, children: [
    {path: 'agregar', component: AgregarMedicoComponent},
    {path: 'edicion/:id', component: AgregarMedicoComponent}
  ]},
  {path: 'examen', component: ExamenComponent, children: [
    {path: 'agregar', component: AgregarExamenComponent},
    {path: 'edicion/:id', component: AgregarExamenComponent}
  ]},
  {path: 'consulta', component: ConsultaComponent, children: [
    {path: 'agregar', component: AgregarConsultaComponent},
    {path: 'edicion/:id', component: AgregarConsultaComponent},
    {path: 'visualizardetalles/:id', component: VisualizasDetallesComponent, children: [
      {path: 'visualizardetalles/:id', component: VisualizasDetallesComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
