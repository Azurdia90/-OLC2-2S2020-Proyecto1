/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%x estado_caracter
%x estado_cadena
%%

\s+                   /* skip whitespace */

"import"              return 'r_import'

"boolean"             return 'r_boolean'
"number"              return 'r_number'
"String"              return 'r_string'

"public"              return 'r_public'
"private"             return 'r_private'
"let"                 return 'r_let'
"const"               return 'r_const'
"global"              return 'r_global'

"void"                return 'r_void'
"try"                 return 'r_try'
"catch"               return 'r_catch'
"throw"               return 'r_throw'
"as"                  return 'r_as'
"strc"                return 'r_strc'

"if"                  return 'r_if'
"else"                return 'r_else'
"switch"              return 'r_switch'
"case"                return 'r_case'
"default"             return 'r_default'
"do"                  return 'r_do'
"while"               return 'r_while'
"for"                 return 'r_for'
"in"                  return 'r_if'
"of"                  return 'r_of'
"continue"            return 'r_continue'
"break"               return 'r_break'
"return"              return 'r_return'
           
"true"                return 'boolean'
"false"               return 'boolean'

[0-9]+"."[0-9]+       return 'number'
"'"[^"'"]*"'"         return 'string'
"\""[^"\""]*"\""	  return 'string'

"null"                return 'nulo'

"=="                  return 's_equal'
"="                   return 's_asign'
"++"                  return 's_increment'
"--"                  return 's_decrement'
"+"                   return 's_plus'
"-"                   return 's_minus'
"*"                   return 's_mul'
"/"                   return 's_div' 
"%"                   return 's_mod'
"!="                  return 's_not_equal'
"<="                  return 's_less_equal'
">="                  return 's_greather_equal'
"<"                   return 's_less'
">"                   return 's_greather'
"||"                  return 's_or'
"&&"                  return 's_and'
"!"                   return 's_not'
"("                   return 's_par_open'
")"                   return 's_par_close'
"?"                   return 's_ternario'

"{"                   return 's_key_open'
"}"                   return 's_key_close'
"["                   return 's_cor_open'
"]"                   return 's_cor_close'
"."                   return 's_dot'
","                   return 's_coma'
":"                   return 's_doble_dot'
";"                   return 's_dot_coma'

([a-zA-ZñÑ]|("_"[a-zA-ZñÑ]))([a-zA-ZñÑ]|"_"|[0-9])* return 'identificador'

<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%right    s_asign
%right    s_ternario, s_doble_dot

%left     s_or
%left     s_and
%left     s_xor  

%left     s_equal s_not_equal
%left     s_greather s_greather_equal s_less s_less_equal

%left     s_plus
%left     s_plus s_minus
%left     s_mul s_div s_mod

%right    r_new

%left     s_not
%left     UMINUS
%left     s_increment s_decrement

%left     s_par_open s_par_close
%left     s_dot
%left     s_key_open s_key_close

%start BODY_J#

%% /* language grammar */

BODY_J#
    : LISTA_CONTENIDO EOF
      {return $1;}
    ;

LISTA_CONTENIDO
    :  IMPORT LISTA_SENTENCIAS
      {
        $1 = [$1];
        for(var i = 0; i < $2.length; i++)
        {
            $1.push($2[i]);
        }
        $$ = $1;
      }
    | LISTA_SENTENCIAS
      {
          $$ = $1;
      } 
    ;


 /*************************SENTENCIAS***********************/

IMPORT
    : r_import s_doble_dot s_asign LISTA_IDENTIFICADORES
    {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Import(linea,columna,$4);
    }
    ;

 /*************************SENTENCIAS***********************/

LISTA_SENTENCIAS
    : LISTA_SENTENCIAS SENTENCIA
      { 
        $1.push($2);
        $$ = $1;
      }
    | SENTENCIA
      {$$ = [$1];}
    ;

SENTENCIA
    : SENTENCIA_DECLARACION s_dot_coma
      {$$ = $1;}
    | SENTENCIA_ASIGNACION s_dot_coma
      {$$ = $1;}  
    | SENTENCIA_LLAMADA s_dot_coma
      {$$ = $1;}
    | SENTENCIA_IF
      {$$ = $1;}
    | SENTENCIA_SWITCH
      {$$ = $1;}
    | SENTENCIA_WHILE
      {$$ = $1;}
    | SENTENCIA_DO_WHILE
      {$$ = $1;}
    | SENTENCIA_FOR
      {$$ = $1;}
    | SENTENCIA_CONTINUE s_dot_coma
      {$$ = $1;}
    | SENTENCIA_BREAK s_dot_coma
      {$$ = $1;}
    | SENTENCIA_RETURN s_dot_coma
      {$$ = $1;}
    | FUNCION
      {$$ = $1;}
    ;

TIPO_VALOR
    : r_booleano
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.booleano, traduccion: "boolean", rol: tipo_rol.identificador};}
    | r_entero
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.entero, traduccion: "integer", rol: tipo_rol.identificador};}
    | r_double
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.decimal, traduccion: "double", rol: tipo_rol.identificador};}  
    | r_caracter
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.caracter, traduccion: "char", rol: tipo_rol.identificador};}
    | identificador
      {
        if($1.toLowerCase() == "string")
        {
          $$ = {etiqueta: "tipo_dato", tipo: tipo_dato.cadena, traduccion: "String", rol: tipo_rol.identificador};
        }
        else
        {
          $$ = {etiqueta: "tipo_dato", tipo: tipo_dato.identificador, traduccion: $1, rol: tipo_rol.struct};
        }
      }
    | r_void
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.void, traduccion: "void", rol: tipo_rol.identificador};}  
    |r_booleano s_cor_open s_cor_close
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.booleano, traduccion: "boolean", rol: tipo_rol.arreglo};}
    | r_entero s_cor_open s_cor_close
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.entero, traduccion: "integer", rol: tipo_rol.arreglo};}
    | r_double s_cor_open s_cor_close
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.decimal, traduccion: "double", rol: tipo_rol.arreglo};}  
    | r_caracter s_cor_open s_cor_close
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.caracter, traduccion: "char", rol: tipo_rol.arreglo};}
    | identificador s_cor_open s_cor_close
      {
        if($1.toLowerCase() == "string")
        {
          $$ = {etiqueta: "tipo_dato", tipo: tipo_dato.cadena, traduccion: "String", rol: tipo_rol.arreglo};
        }
        else
        {
          $$ = {etiqueta: "tipo_dato", tipo: tipo_dato.identificador, traduccion: $1, rol: tipo_rol.arreglo};
        }
      }
    ;

TIPO_VALOR_PRIMITIVO
    : r_booleano
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.booleano, traduccion: "boolean", rol: tipo_rol.identificador};}
    | r_entero
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.entero, traduccion: "integer", rol: tipo_rol.identificador};}
    | r_double
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.decimal, traduccion: "double", rol: tipo_rol.identificador};}  
    | r_caracter
      {$$ = {etiqueta: "tipo_dato", tipo: tipo_dato.caracter, traduccion: "char", rol: tipo_rol.identificador};}
    | identificador
      {
        if($1.toLowerCase() == "string")
        {
          $$ = {etiqueta: "tipo_dato", tipo: tipo_dato.cadena, traduccion: "String", rol: tipo_rol.identificador};
        }
        else
        {
          $$ = {etiqueta: "tipo_dato", tipo: tipo_dato.identificador, traduccion: $1, rol: tipo_rol.struct};
        }
      }
    ;

LISTA_IDENTIFICADORES
    : LISTA_IDENTIFICADORES s_coma identificador
      { 
        $1.push($3);
        $$ = $1;
      }
    | identificador
      { $$ = [$1];}
    ;

SENTENCIA_DECLARACION
    : TIPO_VALOR LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Declaracion(linea,columna,$2);
        $$.setTipodato($1);
        $$.setValor($4);
      }
    | r_var LISTA_IDENTIFICADORES s_doble_dot s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Declaracion(linea,columna,$2);
        $$.setValor($5);
      }
    | r_const LISTA_IDENTIFICADORES s_doble_dot s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Declaracion(linea,columna,$2);
        $$.setisConst(true);
        $$.setValor($5);        
      }  
    | r_global LISTA_IDENTIFICADORES s_doble_dot s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Declaracion(linea,columna,$2);
        $$.setisGlobal(true);
        $$.setValor($5);        
      } 
    | TIPO_VALOR LISTA_IDENTIFICADORES
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Declaracion(linea,columna,$2);
        $$.setTipodato($1);        
      }
    ;

SENTENCIA_ASIGNACION 
    : identificador s_asign EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = new Sentencia_Asignacion(linea,columna,$1,$3);
    }
    | SENTENCIA_ACCESO s_asign EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = new Sentencia_Asignacion(linea,columna,$1,$3);
    }
    ;

SENTENCIA_LLAMADA
    : identificador s_par_open LISTA_EXPRESIONES s_par_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_LLamada(linea,columna,$1,$3);
      }
    | identificador s_par_open s_par_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_LLamada(linea,columna,$1,[]);
      } 
    ;

SENTENCIA_IF
    : r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close LISTA_ELSE_IF r_else s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_If(linea,columna,$3,$6);
        $$.setLista_else_if($8);
        $$.setLista_else($11);
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close r_else s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_If(linea,columna,$3,$6);
        $$.setLista_else($10);
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close LISTA_ELSE_IF
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_If(linea,columna,$3,$6);
        $$.setLista_else_if($8);
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_If(linea,columna,$3,$6);        
      }
    ;

LISTA_ELSE_IF
    : LISTA_ELSE_IF SENTENCIA_ELSE_IF
      {
        $1.push($2);
        $$ = $1;
      }
    | SENTENCIA_ELSE_IF
      {
        $$ = [$1];
      }
    ;

SENTENCIA_ELSE_IF
    : r_else r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_If(linea,columna,$4,$7); 
      }
    ;

SENTENCIA_SWITCH
    : r_switch s_par_open EXPRESION s_par_close s_key_open LISTA_CASOS DEFECTO s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $6.push($7);
        $$ = new Sentencia_Switch(linea,columna,$3,$6);
      }
    ;

LISTA_CASOS
    : LISTA_CASOS CASO
      {
        $1.push($2);
        $$ = $1;
      }
    | CASO
      {
        $$ = [$1];
      }
    ;

CASO
    : r_case EXPRESION s_doble_dot LISTA_SENTENCIAS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Caso(linea,columna,$2,$4,false);
      }
    ;     

DEFECTO
    : r_default s_doble_dot LISTA_SENTENCIAS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Caso(linea,columna,null,$3,true);
      }
    ;

SENTENCIA_WHILE
    : r_while s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_While(linea,columna,$3,$6);
      }
    ;

SENTENCIA_DO_WHILE
    : r_do s_key_open LISTA_SENTENCIAS s_key_close r_while s_par_open EXPRESION s_par_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Do_While(linea,columna,$7,$3);
      }
    ;  

SENTENCIA_FOR
    : r_for s_par_open SENTENCIA_DECLARACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_For(linea,columna,$3,$5,$7,$10);    
      }
    |r_for s_par_open SENTENCIA_ASIGNACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_For(linea,columna,$3,$5,$7,$10);
      }
    ;  

SENTENCIA_BREAK
    : r_break
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Break(linea,columna);
      }
    ;

SENTENCIA_CONTINUE
    : r_continue
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Continue(linea,columna);
      }
    ;

SENTENCIA_RETURN
    : r_return
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Return(linea,columna,null);
      }
    | r_return EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Sentencia_Return(linea,columna,$2);
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES FUNCIONES***********************************************************************************************************/

FUNCION
    : TIPO_VALOR identificador s_par_open LISTA_PARAMETROS s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        var lista_tipos = [];
        var lista_parametros = [];
        for(var i = 0;  i < $4.length; i++)
        {
          lista_tipos.push($4[i]["tipo"]);
          lista_parametros.push($4[i]["identificador"]);
        }
        $$ = new Funcion(linea,columna,$1,$2,lista_tipos,lista_parametros,$7);      
      }
    | TIPO_VALOR identificador s_par_open s_par_close s_key_open LISTA_SENTENCIAS_METODOS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        var lista_tipos = [];
        var lista_parametros = [];
        $$ = new Funcion(linea,columna,$1,$2,lista_tipos,lista_parametros,$6);
      } 
    ;

LISTA_PARAMETROS
    : LISTA_PARAMETROS s_coma DECLARACION_PARAMETRO
      {
        $1.push($3);
        $$ = $1;
      }
    | DECLARACION_PARAMETRO
      {
        $$ = [$1];
      }
    ;

DECLARACION_PARAMETRO
    : TIPO_VALOR identificador
      {
        $$ = {etiqueta: "parametro", tipo: $1, identificador: $2};
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES EXPRESIONES*********************************************************************************************************/
LISTA_EXPRESIONES 
    : LISTA_EXPRESIONES s_coma EXPRESION
      {
        $1.push($3);
        $$ = $1;
      }
    | EXPRESION
      {
        $$ = [$1];
      }
    ;

EXPRESION
    : EXPRESION_ARITMETICA
      {$$ = $1;}
    | EXPRESION_RELACIONAL   
      {$$ = $1;}
    | EXPRESION_LOGICA
      {$$ = $1;}
    | OPERADOR_UNARIO
      {$$ = $1;}
    | OPERADOR_INCREMENTO
      {$$ = $1;}  
    | OPERADOR_DECREMENTO  
      {$$ = $1;}     
    | s_par_open EXPRESION s_par_close
      {$$ = $2;}            
    | SENTENCIA_ACCESO
      {$$ = $1;}        
    | SENTENCIA_INSTANCIA
      {$$ = $1;}
    | SENTENCIA_LLAMADA 
      {$$ = $1;}    
    | DATO_PRIMITIVO
      {$$ = $1;} 
    ;

EXPRESION_ARITMETICA
    : EXPRESION s_plus EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Suma(linea,columna,$1,$3);
      }
    | EXPRESION s_minus EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Resta(linea,columna,$1,$3);
      }
    | EXPRESION s_mul EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Multiplicacion(linea,columna,$1,$3);
      }
    | EXPRESION s_div EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Division(linea,columna,$1,$3);
      }
    | EXPRESION s_mod EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Modulo(linea,columna,$1,$3);
      }
    | EXPRESION s_xor s_xor EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Potencia(linea,columna,$1,$4);
      }
    ;

EXPRESION_RELACIONAL
    : EXPRESION s_greather EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Mayor_Que(linea,columna,$1,$3);
      }
    | EXPRESION s_less EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Menor_Que(linea,columna,$1,$3);
      }
    | EXPRESION s_greather_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Mayor_Igual_Que(linea,columna,$1,$3);
      }
    | EXPRESION s_less_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Menor_Igual_Que(linea,columna,$1,$3);
      }
    | EXPRESION s_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Igual_Que(linea,columna,$1,$3);
      }
    | EXPRESION s_not_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Diferente_Que(linea,columna,$1,$3);
      }
    ;

EXPRESION_LOGICA
    : EXPRESION s_or EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Or(linea,columna,$1,$3);
      }
    | EXPRESION s_and EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new And(linea,columna,$1,$3);
      }
    | EXPRESION s_xor EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new XOr(linea,columna,$1,$3);
      }
    | s_not EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Not(linea,columna,$2);
      }
    ;

OPERADOR_UNARIO
    : s_minus EXPRESION %prec UMINUS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Operador_Unario(linea,columna,$2);
      }
    ;

OPERADOR_INCREMENTO
    : identificador s_increment
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Operador_Incremento(linea,columna,$1);
      }  
    ;    

OPERADOR_DECREMENTO
    : identificador s_decrement
      {
        var linea = yylineno;
        var columna = yyleng; 
        $$ = new Operador_Decremento(linea,columna,$1);
      }
    ; 

SENTENCIA_INSTANCIA
  : s_key_open LISTA_EXPRESIONES s_key_close
    {
      $$ = new Sentencia_Instancia(linea,columna,0,{etiqueta: "tipo_dato", tipo: tipo_dato.nulo, traduccion: "null", rol: tipo_rol.identificador},$2);
    }
  | r_strc TIPO_VALOR_PRIMITIVO s_cor_open EXPRESION s_cor_close
    {
      $$ = new Sentencia_Instancia(linea,columna,1,$2,$4);
    }
  ;

SENTENCIA_ACCESO  
  : identificador LISTA_ACCESOS
    {
      $$ = new Sentencia_Acceso(linea,columna,$1,$2);
    }
  ;

LISTA_ACCESOS   
  : LISTA_ACCESOS ACCESO
    {
      $1.push($2);
      $$ = $1;
    }
    |ACCESO
    {
      $$ = [$1];
    }
  ;

ACCESO 
  : s_cor_open EXPRESION s_cor_close
    {
      acceso = new Tipo_Acceso(linea,columna,0,$2,null,null);
      $$ = acceso;
    }
    | s_dot SENTENCIA_LLAMADA
    {
      acceso = new Tipo_Acceso(linea,columna,2,null,null,$2);
      $$ = acceso;
    }
    | s_dot identificador
    {
      acceso = new Tipo_Acceso(linea,columna,1,null,$2,null);
      $$ = acceso;
    }
  ;    

DATO_PRIMITIVO
    : nulo
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea,columna,{etiqueta: "tipo_dato", tipo: tipo_dato.nulo, traduccion: "null", rol: tipo_rol.identificador},yytext); 
      }
    | booleano
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea,columna,{etiqueta: "tipo_dato", tipo: tipo_dato.booleano, traduccion: "boolean", rol: tipo_rol.identificador},yytext); 
      }
    | entero
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea, columna,{etiqueta: "tipo_dato", tipo: tipo_dato.entero, traduccion: "integer", rol: tipo_rol.identificador},yytext);
      }
    | decimal
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea,columna,{etiqueta: "tipo_dato", tipo: tipo_dato.decimal, traduccion: "double", rol: tipo_rol.identificador},yytext);
      }
    | caracter
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea,columna,{etiqueta: "tipo_dato", tipo: tipo_dato.caracter, traduccion: "char", rol: tipo_rol.identificador},yytext.substring(1,yytext.length-1));
      }
    | cadena
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea,columna,{etiqueta: "tipo_dato", tipo: tipo_dato.cadena, traduccion: "String", rol: tipo_rol.identificador},yytext.substring(1,yytext.length-1));
      }
    | identificador
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = new Dato_Primitivo(linea,columna,{etiqueta: "tipo_dato", tipo: tipo_dato.identificador, traduccion: yytext, rol: tipo_rol.identificador},yytext);
      }
    ;