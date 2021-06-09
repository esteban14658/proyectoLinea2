import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material/_material.module';
import { MedicoComponent } from './pages/medico/medico.component';
import { AgregarMedicoComponent } from './pages/medico/agregar-medico/agregar-medico.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { AgregarExamenComponent } from './pages/examen/agregar-examen/agregar-examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { AgregarConsultaComponent } from './pages/consulta/agregar-consulta/agregar-consulta.component';
import { DetalleConsultaComponent } from './pages/detalle-consulta/detalle-consulta.component';
import { ListaExamenComponent } from './pages/lista-examen/lista-examen.component';
import { VisualizasDetallesComponent } from './pages/consulta/visualizas-detalles/visualizas-detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicoComponent,
    AgregarMedicoComponent,
    ExamenComponent,
    AgregarExamenComponent,
    ConsultaComponent,
    AgregarConsultaComponent,
    DetalleConsultaComponent,
    ListaExamenComponent,
    VisualizasDetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
