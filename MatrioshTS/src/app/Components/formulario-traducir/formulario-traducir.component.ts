import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Middle from '../../Grammar_Instruction/Middle';

declare const Grammar_MatrioshTS: any;

@Component({
  selector: 'app-formulario-traducir',
  templateUrl: './formulario-traducir.component.html',
  styleUrls: ['./formulario-traducir.component.scss'],
})
export class FormularioTraducirComponent implements OnInit 
{
  formulario_traducir : FormGroup;
  traduccion: String;

  constructor(private formBuilder: FormBuilder) 
  {
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() 
  {
    this.formulario_traducir = this.formBuilder.group({
      textarea: ['var hola = 10; \nhola = 50;\nconsole.log(hola);',  [Validators.required]],
      consola: ['',  [Validators.required]],
    });
    this.traduccion = "..."
  }

  traducir(event: Event)
  {
    event.preventDefault();
    const value = this.formulario_traducir.value;

    Middle.getInstance().clear();
    Middle.getInstance().setInput(value['textarea']);

    this.imprimirConsola(value);
  }

  imprimirConsola(value : FormGroup)
  {
    const text_out = Middle.getInstance().getOuput();
    this.traduccion = ''
    this.traduccion = text_out + '\n' + 'fin de la traducción.';
  }

}
