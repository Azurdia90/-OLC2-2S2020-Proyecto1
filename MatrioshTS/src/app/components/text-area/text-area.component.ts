import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

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
    event.preventDefault();
    const value = this.formulario_ejecutar.value;
    const execute_text = value['textarea'];
  }

}
