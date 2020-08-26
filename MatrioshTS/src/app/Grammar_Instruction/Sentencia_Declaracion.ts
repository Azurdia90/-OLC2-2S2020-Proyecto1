import Instruction from './Instruction';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';

class Sentencia_Declaracion extends Instruction
{
    protected identificadores : String[];

    protected tipo : Tipo;
    protected valor :  Instruction;


    constructor(p_fila: number, p_columna: number, p_lista_id : String[], p_valor? : Instruction, p_tipo? : Tipo)
    {
        super(p_fila,p_columna);

        this.identificadores = p_lista_id;
        this.valor = p_valor;
        this.tipo = p_tipo;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        let _val_fin : Simbolo;

        try
        {
            for(var cont : number = 0; cont < this.identificadores.length - 1, cont++)
            {
                if(this.valor == undefined)
                {
                    _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), "");
                    
                }
                else
                {

                }
            }            
        }
        catch(Exception)
        {
            
        }
    }

    public getThis() 
    {
        let sentencia_declaracion : Sentencia_Declaracion = new Sentencia_Declaracion(this.fila,this.columna,this.identificadores);

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

    public setValor(p_valor : Instruction)
    {
        this.valor = p_valor;
    }

    public setTipo(p_tipo : Tipo)
    {
        this.tipo = p_tipo;
    }
}

export default Sentencia_Declaracion;