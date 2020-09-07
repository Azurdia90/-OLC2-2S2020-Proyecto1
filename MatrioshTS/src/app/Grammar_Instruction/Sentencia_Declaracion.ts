import Instruction from './Instruction';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';

class Sentencia_Declaracion extends Instruction
{
    protected identificadores : String[];

    protected tipo : Tipo;
    protected valor :  Instruction;
    protected valor_ext : Simbolo;
    protected const : Boolean;

    constructor(p_fila: number, p_columna: number, p_const : Boolean, p_lista_id : String[], p_valor? : Instruction, p_tipo? : Tipo)
    {
        super(p_fila,p_columna);
        
        this.const = p_const;
        this.identificadores = p_lista_id;
        this.valor = p_valor;
        this.tipo = p_tipo;

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
                _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), "");
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
            
            if (_val_fin.getRol() != tipo_rol.valor && _val_fin.getRol() != tipo_rol.arreglo)
            {
                return _val_fin;
            }
            
            if(this.tipo != undefined)
            {
                if(this.tipo.getTipo()  != _val_fin.getTipo().getTipo())
                {
                    if(_val_fin.getTipo().getTipo() != tipo_dato.NULO)
                    {
                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setValor("El tipo de la variable es diferente al valor a asignar.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                }
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
                    var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.valor,_val_fin.getTipo(),this.identificadores[cont]); 
                    nuevo_simbolo.setValor(_val_fin.getValor());
                    nuevo_simbolo.setConstante(this.const);
                    entorno_padre.set(this.identificadores[cont],nuevo_simbolo);
                }   
            }    
            
            var simbolo_aceptado : Simbolo = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            simbolo_aceptado.setValor("Declaración Succesful");
            simbolo_aceptado.setFila(this.fila);
            simbolo_aceptado.setColumna(this.columna);
            return nuevo_simbolo;
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
        let sentencia_declaracion : Sentencia_Declaracion = new Sentencia_Declaracion(this.fila,this.columna,this.const,this.identificadores);

        if(this.valor != undefined)
        {
            sentencia_declaracion.setValor(this.valor);
        }

        if(this.tipo != undefined)
        {
            sentencia_declaracion.setTipo(this.tipo);
        }

        return sentencia_declaracion;
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