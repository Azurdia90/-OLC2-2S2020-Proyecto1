import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Mayor_Igual_Que extends Expresion
{
    protected matriz_operacion_mayor_igual_que : tipo_operacion_resultado[][] = 
    [   /*                                      void                            nulo                           booleano                         numero                                           cadena                                                 identificador                          error 
        /*void*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,                         tipo_operacion_resultado.error,                         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*nulo*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,                         tipo_operacion_resultado.error,                         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*booleano*/      [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,                         tipo_operacion_resultado.error,                         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*numero*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.mayorigualque_numerico,        tipo_operacion_resultado.mayorigualque_numerico_cadena, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*String*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.mayorigualque_cadena_numerico, tipo_operacion_resultado.mayorigualque_cadena,          tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*identificador*/ [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,                         tipo_operacion_resultado.error,                         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*error*/         [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,                         tipo_operacion_resultado.error,                         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
    ];

    constructor(p_fila : number, p_columna : number, p_operador_izq : Instruction, p_operador_der : Instruction)
    {
        super(p_fila,p_columna,tipo_operacion.MAYOR_IGUAL_QUE,p_operador_izq,p_operador_der);
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        
        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.ejecutar(entorno_padre, salida);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.ejecutar(entorno_padre, salida);

            let tipo_mayor_igual_que :tipo_operacion_resultado;

            if (op1 == null || op2 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Operador vacio");
                return _return;
            }

            if (op1.getRol() != tipo_rol.valor && op1.getRol() != tipo_rol.arreglo)
            {
                return op1;
            }

            if (op2.getRol() != tipo_rol.valor && op2.getRol() != tipo_rol.arreglo)
            {
                return op2;
            }

            tipo_mayor_igual_que = this.matriz_operacion_mayor_igual_que[op1.getTipo().getTipo()] [op2.getTipo().getTipo()];

            switch(tipo_mayor_igual_que)
            {
                case tipo_operacion_resultado.mayorigualque_numerico:
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setValor(Number(op1.getValor()) >= Number(op2.getValor()));
                    return _return;
                case tipo_operacion_resultado.mayorigualque_cadena_numerico:
                    var numero = 0;

                    for(var i : number = 0; i < op1.getValor().toString().length; i++)
                    {
                        numero = numero + Number(op1.getValor().toString().charCodeAt(i));
                    }

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setValor(numero >= Number(op2.getValor()));
                    return _return;
                case tipo_operacion_resultado.mayorigualque_numerico_cadena:
                    var numero = 0;

                    for(var i : number = 0; i < op2.getValor().toString().length; i++)
                    {
                        numero = numero + Number(op2.getValor().toString().charCodeAt(i));
                    }
                    
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setValor(Number(op1.getValor()) >= numero);
                    return _return;
                case tipo_operacion_resultado.mayorigualque_cadena:
                    var numero1 = 0;

                    for(var i : number = 0; i < op1.getValor().toString().length; i++)
                    {
                        numero1 = numero1 + Number(op1.getValor().toString().charCodeAt(i));
                    }

                    var numero2 = 0;

                    for(var i : number = 0; i < op2.getValor().toString().length; i++)
                    {
                        numero2 = numero2 + Number(op2.getValor().toString().charCodeAt(i));
                    }

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setValor(numero1 >= numero2);
                    return _return;
                default:
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No es posible realizar una Comparación Mayor Igual Que del tipo: " + op1.getTipo().getTraduccion()  +  " * " + op2.getTipo().getTraduccion());
                    return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operacion Mayor Igual Que: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        return new Mayor_Igual_Que(this.fila,this.columna,this.operador_izq.getThis(),this.operador_der.getThis());
    }

}

export default Mayor_Igual_Que;