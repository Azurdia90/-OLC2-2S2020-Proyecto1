
class Type_Error 
{
    private archivo : String;
    private identificador : String;
    private columna : Number;
    private linea : Number;
    private tipo : String;
    private descripcion : String;
    
    constructor(p_archivo : String, p_identificador : String, p_linea : Number, p_columna : Number, p_tipo : String, p_descripcion : String)
    {
        this.archivo = p_archivo;
        this.identificador = p_identificador;
        this.linea = p_linea;
        this.columna = p_columna;            
        this.tipo = p_tipo;
        this.descripcion = p_descripcion;
    }

    public getArchivo() 
    {
        return this.archivo;
    }

    public setArchivo(archivo : String) 
    {
        this.archivo = archivo;
    }

    public getIdentificador() {
        return this.identificador;
    }

    public setIdentificador(clase : String) {
        this.identificador = clase;
    }

    public getColumna() {
        return this.columna;
    }

    public setColumna(columna : Number) {
        this.columna = columna;
    }

    public getLinea() {
        return this.linea;
    }

    public setLinea(linea : Number) {
        this.linea = linea;
    }

    public getTipo() {
        return this.tipo;
    }

    public setTipo(tipo : String) {
        this.tipo = tipo;
    }

    public getDescripcion() {
        return this.descripcion;
    }

    public setDescripcion(descripcion : String) {
        this.descripcion = descripcion;
    }
}

export default Type_Error;