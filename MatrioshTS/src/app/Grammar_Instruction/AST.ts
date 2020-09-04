import Instruction from './Instruction';
import Sentencia_Declaracion from './Sentencia_Declaracion';
import Tipo from './Tipo';
import Suma from './Suma';
import Expresion from './Expresion';
import Sentencia_Llamada from './Sentencia_Llamada';
import Sentencia_Acceso from './Sentencia_Acceso';
import Operador_Decremento from './Operador_Decremento';
import Operador_Incremento from './Operador_Incremento';
import Operador_Unario from './Operador_Unario';
import Or from './Or';
import Not from './Not';
import And from './And';
import Diferente_Que from './Diferente_Que';
import Menor_Igual_Que from './Menor_Igual_Que';
import Mayor_Igual_Que from './Mayor_Igual_Que';
import Menor_Que from './Menor_Que';
import Mayor_Que from './Mayor_Que';
import Modulo from './Modulo';
import Division from './Division';
import Multiplicacion from './Multiplicacion';
import Resta from './Resta';
import Igual_Que from './Igual_Que';
import Dato_Primitivo from './Dato_Primitivo';
import Tipo_Acceso from './Tipo_Acceso';

class AST
{
    private superjason : Array<JSON>;
    private lista_instrucciones : Array<Instruction>;

    constructor(p_jason : Array<JSON>)
    {
        this.superjason = p_jason;
        this.lista_instrucciones = new Array<Instruction>();
    }

    public exec_ast()
    {
        
    }

    public build_ast()
    {   
        for(var i :number = 0; i < this.superjason.length; i++ )
        {            
            this.lista_instrucciones.push(this.fabrica_instrucciones(this.superjason[i]));    
        }

        console.log(this.lista_instrucciones);
    }    

    private fabrica_instrucciones(instruccion_jason : JSON)
    {
        console.log(instruccion_jason);
        if(instruccion_jason['etiqueta'] == 'sentencia_declaracion')
        {
            return new Sentencia_Declaracion(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['identificador'],this.fabrica_expresiones(instruccion_jason['valor']),this.fabrica_tipo(instruccion_jason['tipo']));
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_acceso')
        {
            return new Sentencia_Acceso(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['identificador'], instruccion_jason['lista_acceso']);
        }
        else if(instruccion_jason['etiqueta'] == 'tipo_acceso')
        {
            return new Tipo_Acceso(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['tipo'], this.fabrica_expresiones(instruccion_jason['expresion1']), this.fabrica_expresiones(instruccion_jason['expresion2']), instruccion_jason['expresion3']);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_llamada')
        {
            var lista_parametros : Array<Expresion>;
            var parametro_jason : JSON;

            lista_parametros = new Array<Expresion>();


            for(var cont = 0; cont < instruccion_jason['lista_paramentros'].length; cont++)
            {
                parametro_jason = instruccion_jason['lista_paramentros'][cont];
                lista_parametros.push(this.fabrica_expresiones(parametro_jason));
            }

            return new Sentencia_Llamada(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['identificador'], instruccion_jason['lista_acceso']);
        }
        else
        {
            return undefined;
        }
    }

    private fabrica_expresiones(expresion_jason : JSON)
    {
        if(expresion_jason['etiqueta'] == 'suma')
        {
            return new Suma(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'resta')
        {
            return new Resta(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'multiplicacion')
        {
            return new Multiplicacion(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'division')
        {
            return new Division(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'modulo')
        {
            return new Modulo(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'mayor_que')
        {
            return new Mayor_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'menor_que')
        {
            return new Menor_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'mayor_igual_que')
        {
            return new Mayor_Igual_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'menor_igual_que')
        {
            return new Menor_Igual_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'igual_que')
        {
            return new Igual_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'diferente_que')
        {
            return new Diferente_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'and')
        {
            return new And(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'or')
        {
            return new Or(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'not')
        {
            return new Not(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_unario')
        {
            return new Operador_Unario(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_incremento')
        {
            return new Operador_Incremento(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_decremento')
        {
            return new Operador_Decremento(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'sentencia_acceso')
        {
            return new Sentencia_Acceso(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['identificador'],expresion_jason['lista_acceso']);
        }
        else if(expresion_jason['etiqueta'] == 'tipo_acceso')
        {
            return new Tipo_Acceso(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['tipo'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']), expresion_jason['expresion3']);
        }
        else if(expresion_jason['etiqueta'] == 'sentencia_llamada')
        {
            var lista_parametros : Array<Expresion>;
            var parametro_jason : JSON;

            lista_parametros = new Array<Expresion>();


            for(var cont = 0; cont < expresion_jason['lista_paramentros'].length; cont++)
            {
                parametro_jason = expresion_jason['lista_paramentros'][cont];
                lista_parametros.push(this.fabrica_expresiones(parametro_jason));
            }

            return new Sentencia_Llamada(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['identificador'],expresion_jason['lista_acceso']);
        }
        else if(expresion_jason['etiqueta'] == 'dato_primitivo')
        {   
            return new Dato_Primitivo(expresion_jason['fila'], expresion_jason['columna'],this.fabrica_tipo(expresion_jason['tipo']),expresion_jason['valor']);
        }
        else
        {
            return undefined;
        }
    }


    private fabrica_tipo(tipo_jason : JSON)
    {
        if(tipo_jason == null)
        {
            return undefined;
        }

        if(tipo_jason['tipo'] == 0)
        {
            return new Tipo(tipo_dato.VOID);
        }
        else if(tipo_jason['tipo'] == 1)
        {
            return new Tipo(tipo_dato.NULO);
        }
        else if(tipo_jason['tipo'] == 2)
        {
            return new Tipo(tipo_dato.BOOLEANO);
        }
        else if(tipo_jason['tipo'] == 3)
        {
            return new Tipo(tipo_dato.NUMERO);
        }
        else if(tipo_jason['tipo'] == 4)
        {
            return new Tipo(tipo_dato.CADENA);
        }
        else if(tipo_jason['tipo'] == 5)
        {
            return new Tipo(tipo_dato.IDENTIFICADOR, tipo_jason['valor']);
        }
        else
        {
            undefined
        }
    }

}

export default AST;