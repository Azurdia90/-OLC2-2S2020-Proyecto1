import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Resta extends Expresion
{
    protected matriz_operacion_resta : tipo_operacion_resultado[][] = 
    [   /*                                      void                            nulo                           booleano                         numero                              cadena                       identificador                          error 
        /*void*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*nulo*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*booleano*/      [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*numero*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.resta_numero,  tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*String*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*identificador*/ [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*error*/         [ tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
    ];

    constructor(p_fila : number, p_columna : number, p_operador_izq : Instruction, p_operador_der : Instruction)
    {
        super(p_fila,p_columna,tipo_operacion.RESTA,p_operador_izq,p_operador_der);
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        
        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.ejecutar(entorno_padre, salida);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.ejecutar(entorno_padre, salida);

            let tipo_resta :tipo_operacion_resultado;

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

            tipo_resta = this.matriz_operacion_resta[op1.getTipo().getTipo()] [op2.getTipo().getTipo()];

            switch(tipo_resta)
            {
                case tipo_operacion_resultado.resta_numero:
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO), "");
                    _return.setValor(Number(op1.getValor()) - Number(op2.getValor()));
                    return _return;
                default:
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No es posible realizar una Resta del tipo: " + op1.getTipo().getTraduccion()  +  " - " + op2.getTipo().getTraduccion());
                    return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operacion Resta: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        return new Resta(this.fila,this.columna,this.operador_izq.getThis(),this.operador_der.getThis());
    }

}

export default Resta;