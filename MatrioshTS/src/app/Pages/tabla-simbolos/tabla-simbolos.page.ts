import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.page.html',
  styleUrls: ['./tabla-simbolos.page.scss'],
})
export class TablaSimbolosPage implements OnInit {

  constructor(private menuController: MenuController,private formBuilder: FormBuilder) 
  {
    this.buildForm();
  }
  ngOnInit()
  {

  }

  toggleMenu()
  {
    this.menuController.toggle();
  }

  public buildForm()
  {
    
  }

}
