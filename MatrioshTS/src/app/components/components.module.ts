import { IonicModule } from '@ionic/angular'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: 
  [
    MenuComponent,
    TextAreaComponent,
    TerminalComponent
  ]
  ,
  imports: 
  [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports:
  [
    MenuComponent,
    TextAreaComponent,
    TerminalComponent
  ]
})
export class ComponentsModule { }
