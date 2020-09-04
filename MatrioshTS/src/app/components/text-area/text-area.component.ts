import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import AST from '../../Grammar_Instruction/AST';


declare const Grammar_MatrioshTS: any;

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {

  formulario_ejecutar : FormGroup

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() 
  {
    this.formulario_ejecutar = this.formBuilder.group({
      textarea: ['',  [Validators.required]]
    });
    
  }

  ejecutar(event: Event)
  {
    event.preventDefault();``
    const value = this.formulario_ejecutar.value;
    const execute_text = value['textarea'];
    var resultado = Grammar_MatrioshTS.parse(execute_text);
    var ast : AST = new AST(resultado);
    ast.build_ast();
    
  }

}
