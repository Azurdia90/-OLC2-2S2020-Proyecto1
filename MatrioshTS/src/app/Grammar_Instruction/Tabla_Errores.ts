import Type_Error from './Type_Error';

class Tabla_Errores extends Array<Type_Error>
{
    private static _instance : Tabla_Errores = new Tabla_Errores();
        
    public static getInstance() 
    {
        if (this._instance != null){
            return this._instance;    
        }else{
          this._instance = new Tabla_Errores();
          return this._instance;
        }         
    }

    public getJson()
    {
        var _return : JSON;

        
    }
}

export default Tabla_Errores;