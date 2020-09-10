import { Component, OnInit } from '@angular/core';
import Type_Error from '../../Grammar_Instruction/Type_Error';
import Tabla_Errores from '../../Grammar_Instruction/Tabla_Errores';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario-tabla-errores',
  templateUrl: './formulario-tabla-errores.component.html',
  styleUrls: ['./formulario-tabla-errores.component.scss'],
})
export class FormularioTablaErroresComponent implements OnInit 
{
  public lista : Array<Type_Error>;

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
    this.lista = Tabla_Errores.getInstance();
  }

  ngOnInit() 
  {

  }

  private buildForm() 
  {
    
  }

}
