import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import AST from '../../Grammar_Instruction/AST';
import Middle from '../../Grammar_Instruction/Middle';
import Tabla_Errores from '../../Grammar_Instruction/Tabla_Errores';

declare const Grammar_MatrioshTS: any;

@Component({
  selector: 'app-formulario-ejecutar',
  templateUrl: './formulario-ejecutar.component.html',
  styleUrls: ['./formulario-ejecutar.component.scss'],
})
export class FormularioEjecutarComponent implements OnInit 
{

  formulario_ejecutar : FormGroup;
  salida: String;

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() 
  {
    this.formulario_ejecutar = this.formBuilder.group({
      textarea: ['var hola = 10; \nhola = 50;\nconsole.log(hola);',  [Validators.required]],
      consola: ['',  [Validators.required]],
    });
    this.salida = "..."
  }

  ejecutar(event: Event)
  {
    event.preventDefault();
    const value = this.formulario_ejecutar.value;

    Tabla_Errores.clear();
    Middle.getInstance().clear();
    Middle.getInstance().setInput(value['textarea']);
    var resultado = Grammar_MatrioshTS.parse(Middle.getInstance().getInput());
    var ast : AST = new AST(resultado,false);
    ast.build_ast();
    ast.exec_ast();
    this.imprimirConsola(value);
  }

  imprimirConsola(value : FormGroup)
  {
    const text_out = Middle.getInstance().getOuput();
    this.salida = ''
    this.salida = text_out + '\n' + 'fin de la ejecución';
  }

}
