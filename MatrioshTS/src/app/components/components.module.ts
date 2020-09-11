import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {FormularioTraducirComponent} from '../Components/formulario-traducir/formulario-traducir.component';
import {FormularioEjecutarComponent} from '../Components/formulario-ejecutar/formulario-ejecutar.component';
import {FormularioTablaSimbolosComponent} from '../Components/formulario-tabla-simbolos/formulario-tabla-simbolos.component';
import {FormularioTablaErroresComponent} from '../Components/formulario-tabla-errores/formulario-tabla-errores.component';

@NgModule({
  declarations: 
  [
    FormularioTraducirComponent,
    FormularioEjecutarComponent,
    FormularioTablaSimbolosComponent,
    FormularioTablaErroresComponent,
  ]
  ,
  imports: 
  [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxDatatableModule
  ],
  exports:
  [
    FormularioTraducirComponent,
    FormularioEjecutarComponent,
    FormularioTablaSimbolosComponent,
    FormularioTablaErroresComponent,
  ]
})
export class ComponentsModule { }
