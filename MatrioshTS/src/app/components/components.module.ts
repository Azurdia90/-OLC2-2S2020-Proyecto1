import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from '../Components/menu/menu.component';
import { TextAreaComponent } from '../Components/text-area/text-area.component';
import { TerminalComponent } from '../Components/terminal/terminal.component';

@NgModule({
  declarations: 
  [
    MenuComponent,
    TextAreaComponent,
    TerminalComponent,
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
    TextAreaComponent,
    TerminalComponent,
  ]
})
export class ComponentsModule { }
