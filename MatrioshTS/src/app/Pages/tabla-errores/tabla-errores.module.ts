import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaErroresPageRoutingModule } from './tabla-errores-routing.module';

import { TablaErroresPage } from './tabla-errores.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TablaErroresPageRoutingModule
  ],
  declarations: [TablaErroresPage]
})
export class TablaErroresPageModule {}
