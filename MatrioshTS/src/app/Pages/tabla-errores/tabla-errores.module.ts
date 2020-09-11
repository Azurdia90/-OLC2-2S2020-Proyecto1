import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../Components/components.module';
import { TablaErroresPageRoutingModule } from './tabla-errores-routing.module';

import { TablaErroresPage } from './tabla-errores.page';

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
