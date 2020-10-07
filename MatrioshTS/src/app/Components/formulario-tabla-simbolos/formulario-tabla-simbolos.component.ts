import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Tabla_Simbolos from '../../Grammar_Instruction/Tabla_Simbolos';
import { Matrioshts } from '../../Interfaces/matrioshts';

@Component({
  selector: 'app-formulario-tabla-simbolos',
  templateUrl: './formulario-tabla-simbolos.component.html',
  styleUrls: ['./formulario-tabla-simbolos.component.scss'],
})
export class FormularioTablaSimbolosComponent implements OnInit {

  public lista : Matrioshts[];

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() 
  {
    this.loadtabla();
  }

  private buildForm() 
  {
    this.loadtabla();
  }

  private loadtabla()
  {
    this.lista = [];
    let lista_types = Tabla_Simbolos.getInstance().getLista_types();
    let lista_funciones = Tabla_Simbolos.getInstance().getLista_funciones();
    let stack_tmp = Tabla_Simbolos.getInstance().getStack();
    
    for(var t = 0; t < lista_types.length; t++)
    {
      var type_tmp = lista_types[t];
      for(var a = 0; a < type_tmp.getListaAtributos().length; a++)
      {
        let simbolo_tmp = {ambito: "global", subambito: type_tmp.getIdentificador(), rol: "Type", constante: "No", tipo: type_tmp.getListaTipos()[a].getTraduccion(), identificador: type_tmp.getListaAtributos()[a], tamanio: "0", posicion_s: "0"};
        this.lista.push(simbolo_tmp);
      }
    }

    for(var f = 0; f < lista_funciones.length; f++)
    {
      var funcion_tmp = lista_funciones[f];

      let simbolo_tmp = {ambito: "global", subambito: "---", rol: "Función", constante: "No", tipo: funcion_tmp.getTipo() == undefined ? "N/A": funcion_tmp.getTipo().getTraduccion(), identificador: funcion_tmp.getIdentificador(), tamanio: "0", posicion_s: "0"};
      this.lista.push(simbolo_tmp);
    }

    if(stack_tmp.length > 0)
    {
      for(let [key,value] of stack_tmp[0])
      {
        let simbolo_tmp = {ambito: "global", subambito: "---", rol: this.traducir_Rol(value.getRol()), constante: value.getConstante() == true? "Si": "No", tipo: value.getTipo().getTraduccion(), identificador: value.getIdentificador(), tamanio: "0", posicion_s: "0"};
        this.lista.push(simbolo_tmp);
      }
    }

  }

  private traducir_Rol(p_tipo: number)
  {
    if(p_tipo == 0)
    {
      return "Valor";
    }
    else if(p_tipo == 1)
    {
      return "Arreglo";
    }
    else if(p_tipo == 2)
    {
      return "Type";
    }
    else if(p_tipo == 3)
    {
      return "Función";
    }
    else if(p_tipo == 4)
    {
      return "Parámetro";
    }
    else if(p_tipo == 5)
    {
      return "Aceptado";
    }
    else if(p_tipo == 6)
    {
      return "Continuar";      
    }
    else if(p_tipo == 7)
    {
      return "Retornar";
    }
    else if(p_tipo == 8)
    {
      return "Detener"
    }
    else
    {
      return "Error";
    }
  }

  header(dat) {
    console.log(dat);
    let h:any =[] //array to title columns
    let listHeader: any = Object.keys(dat) //getting the headings and adding
    listHeader.forEach(item => { //scanning the array of titles
      h.push({ name: item }) //adding the titles to the list
    })
    return h //retuning list
  }

}
