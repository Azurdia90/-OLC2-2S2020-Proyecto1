import Expresion from './Expresion';

class Suma extends Expresion
{
    protected matriz_operacion_suma : tipo_operacion_resultado[][] = 
    [   /*                                      void                            nulo                                   booleano                                numero                                 cadena                       identificador                          error 
        /*void*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error],
        /*nulo*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error],
        /*booleano*/      [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error],
        /*numero*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.suma_entero,   tipo_operacion_resultado.suma_decimal,  tipo_operacion_resultado.error, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error],
        /*String*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error],
        /*identificador*/ [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error],
        /*error*/         [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error],
    ];

    constructor()
    {

    }

}

export default Suma;