import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjecutarPageRoutingModule } from './ejecutar-routing.module';

import { EjecutarPage } from './ejecutar.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EjecutarPageRoutingModule
  ],
  declarations: [EjecutarPage]
})
export class EjecutarPageModule {}
