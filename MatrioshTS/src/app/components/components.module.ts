import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from '../Components/menu/menu.component';
import {FormularioEjecutarComponent} from '../Components/formulario-ejecutar/formulario-ejecutar.component';

@NgModule({
  declarations: 
  [
    MenuComponent,
    FormularioEjecutarComponent,
  ]
  ,
  imports: 
  [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports:
  [
    MenuComponent,
    FormularioEjecutarComponent,
  ]
})
export class ComponentsModule { }
