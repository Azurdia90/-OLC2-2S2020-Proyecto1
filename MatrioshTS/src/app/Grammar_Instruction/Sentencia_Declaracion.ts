import Instruction from './Instruction';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import { RENDER_FLAGS } from '@angular/compiler/src/render3/view/util';

class Sentencia_Declaracion extends Instruction
{
    protected identificadores : String[];

    protected const : Boolean;
    protected tipo : Tipo;
    protected rol : tipo_rol;
    protected dimensiones: number;
    protected valor :  Instruction;

    protected valor_ext : Simbolo;
   
    constructor(p_fila: number, p_columna: number, p_const : Boolean, p_lista_id : String[], p_tipo? : Tipo, p_rol? : tipo_rol, p_dimensiones? : number, p_valor? : Instruction)
    {
        super(p_fila,p_columna);
        
        this.identificadores = p_lista_id;

        this.const = p_const;
        this.tipo = p_tipo;
        this.rol = p_rol;
        this.dimensiones = p_dimensiones;
        this.valor = p_valor;

        this.valor_ext  = undefined;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        let _val_fin : Simbolo;

        try
        {
            if(this.valor == undefined && this.valor_ext == undefined)
            {
                _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.VOID), "");
                _val_fin.setValor("null");
            }
            else if(this.valor == undefined && this.valor_ext != undefined)
            {
                _val_fin = this.valor_ext;
            }
            else if(this.valor != undefined && this.valor_ext == undefined)
            {
                _val_fin = this.valor.ejecutar(entorno_padre, salida);
            }
            else
            {
                _val_fin = this.valor.ejecutar(entorno_padre, salida);
            }
            
            if (_val_fin.getRol() != tipo_rol.valor && _val_fin.getRol() != tipo_rol.arreglo && _val_fin.getRol() != tipo_rol.type)
            {
                return _val_fin;
            }
            
            if(this.rol == undefined)
            {
                this.rol = _val_fin.getRol();
            }
            
            if(this.rol != _val_fin.getRol())
            {
                if(!(this.rol == tipo_rol.type && _val_fin.getRol() == tipo_rol.valor && _val_fin.getTipo().Equals(new Tipo(tipo_dato.NULO))))
                {
                    if(this.rol == tipo_rol.valor && _val_fin.getRol() == tipo_rol.arreglo)
                    {
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: No es posible asignar un arreglo a un valor primitivo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(this.rol == tipo_rol.valor && _val_fin.getRol() == tipo_rol.type)
                    {
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: No es posible asignar un type a un valor primitivo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(this.rol == tipo_rol.arreglo && _val_fin.getRol() == tipo_rol.valor)
                    {
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: No es posible asignar un valor primitivo a un arreglo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(this.rol == tipo_rol.arreglo && _val_fin.getRol() == tipo_rol.type)
                    {
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: No es posible asignar un type a un arreglo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else
                    {
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: No se encuentran definidos los roles.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }                     
                }
                               
            }

            
            if(this.tipo != undefined && _val_fin.getTipo().getTipo() != tipo_dato.VOID)
            {
                if(this.rol == tipo_rol.valor)
                {
                    if(!this.tipo.Equals(_val_fin.getTipo()))
                    {   
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: El tipo de la variable es diferente al valor a asignar.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                }
                else if(this.rol == tipo_rol.arreglo)
                {
                    if(!this.tipo.Equals(_val_fin.getTipo()))
                    {   
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("Sentencia Declaración: El tipo de la variable es diferente al valor a asignar.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                }
                else if(this.rol == tipo_rol.type)
                {
                    if(!_val_fin.getTipo().Equals(new Tipo(tipo_dato.IDENTIFICADOR,"")))
                    {   
                        if(!this.tipo.Equals(_val_fin.getTipo()))
                        {  
                            var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                            nuevo_simbolo.setValor("Sentencia Declaración: El tipo de la variable es diferente al valor a asignar.");
                            nuevo_simbolo.setFila(this.fila);
                            nuevo_simbolo.setColumna(this.columna);
                            return nuevo_simbolo;
                        }
                    }
                }
                else
                {
                    var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                    nuevo_simbolo.setValor("Sentencia Declaración: El tipo de rol de la variable desconocido.");
                    nuevo_simbolo.setFila(this.fila);
                    nuevo_simbolo.setColumna(this.columna);
                    return nuevo_simbolo;
                }
            }
            else if(this.tipo != undefined && _val_fin.getTipo().getTipo() == tipo_dato.VOID)
            {
                if(this.rol == tipo_rol.valor)
                {
                    if(this.tipo.getTipo() == tipo_dato.NULO)
                    {
                        _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), "");
                        _val_fin.setValor("null");
                    }
                    else if(this.tipo.getTipo() == tipo_dato.BOOLEANO)
                    {
                        _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.BOOLEANO), "");
                        _val_fin.setValor(false);
                    }
                    else if(this.tipo.getTipo() == tipo_dato.NUMERO)
                    {
                        _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NUMERO), "");
                        _val_fin.setValor(0);
                    }
                    else if(this.tipo.getTipo() == tipo_dato.CADENA)
                    {
                        _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.CADENA), "");
                        _val_fin.setValor("");
                    }
                    else
                    {
                        _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), "");
                        _val_fin.setValor("null");
                    }
                }
                else if(this.rol == tipo_rol.arreglo)
                {
                    var arreglo_tmp: Array<Simbolo>;
                    var lista_dimensiones_tmp: Array<Number>;

                    arreglo_tmp: new Array<Simbolo>();
                    lista_dimensiones_tmp: new Array<Number>();

                    for(var x = 0; x < this.dimensiones; x++);
                    {
                        lista_dimensiones_tmp.push(0);
                    }

                    if(this.tipo.getTipo() == tipo_dato.NULO)
                    {
                        _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NULO), "");
                        _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                        _val_fin.setValor(arreglo_tmp);
                    }
                    else if(this.tipo.getTipo() == tipo_dato.BOOLEANO)
                    {
                        _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.BOOLEANO), "");
                        _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                        _val_fin.setValor(arreglo_tmp);
                    }
                    else if(this.tipo.getTipo() == tipo_dato.NUMERO)
                    {
                        _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NUMERO), "");
                        _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                        _val_fin.setValor(arreglo_tmp);
                    }
                    else if(this.tipo.getTipo() == tipo_dato.CADENA)
                    {
                        _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.CADENA), "");
                        _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                        _val_fin.setValor(arreglo_tmp);
                    }
                    else
                    {
                        _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NULO), "");
                        _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                        _val_fin.setValor("null");
                    }
                }
                else if(this.rol == tipo_rol.type)
                {
                    _val_fin = new Simbolo(tipo_rol.type, new Tipo(tipo_dato.NULO), "");
                    _val_fin.setValor("null");
                }
                else
                {
                    var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                    nuevo_simbolo.setValor("Sentencia Declaración: El tipo de rol de la variable desconocido.");
                    nuevo_simbolo.setFila(this.fila);
                    nuevo_simbolo.setColumna(this.columna);
                    return nuevo_simbolo;
                }
            }
            else
            {
                this.tipo = _val_fin.getTipo();
            }

            for(var cont : number = 0; cont < this.identificadores.length; cont++)
            {
                if(entorno_padre.has(this.identificadores[cont]))
                {
                    var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                    nuevo_simbolo.setValor("La variable: \"" + this.identificadores[cont] + "\" ya se encuentra en el entorno local.");
                    nuevo_simbolo.setFila(this.fila);
                    nuevo_simbolo.setColumna(this.columna);
                    return nuevo_simbolo;
                }
                else
                {
                    var nuevo_simbolo : Simbolo = new Simbolo(this.rol,this.tipo,this.identificadores[cont]); 
                    nuevo_simbolo.setConstante(this.const);
                    nuevo_simbolo.setValor(_val_fin.getValor());
                    nuevo_simbolo.setListaDimensiones(_val_fin.getListaDimensiones());
                    nuevo_simbolo.setListaFunciones(_val_fin.getListaFunciones());
                    entorno_padre.set(this.identificadores[cont],nuevo_simbolo);
                }   
            }    
            
            var simbolo_aceptado : Simbolo = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            simbolo_aceptado.setValor("Declaración Succesful");
            simbolo_aceptado.setFila(this.fila);
            simbolo_aceptado.setColumna(this.columna);
            return simbolo_aceptado;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Declaración: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        return new Sentencia_Declaracion(this.fila,this.columna,this.const,this.identificadores,this.tipo == undefined ? undefined : this.tipo,this.rol == undefined ? undefined : this.rol,this.dimensiones,this.valor == undefined ? undefined: this.valor.getThis());
    }

    public getValor()
    {
        return this.valor;
    }

    public setValor(p_valor : Instruction)
    {
        this.valor = p_valor;
    }

    public setValor_Ext(p_valor : Simbolo)
    {
        this.valor_ext = p_valor;
    }

    public setTipo(p_tipo : Tipo)
    {
        this.tipo = p_tipo;
    }
}

export default Sentencia_Declaracion;