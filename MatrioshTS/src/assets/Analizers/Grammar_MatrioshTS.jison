/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%x estado_caracter
%x estado_cadena
%%

\s+                   /* skip whitespace */

"import"              return 'r_import'

"void"                return 'r_void'
"boolean"             return 'r_boolean'
"number"              return 'r_number'
"String"              return 'r_string'

"public"              return 'r_public'
"private"             return 'r_private'
"let"                 return 'r_let'
"const"               return 'r_const'

"function"            return 'r_function'

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

[0-9]+("."[0-9]+)?    return 'number'
"'"[^"'"]*"'"         return 'string'
"\""[^"\""]*"\""	    return 'string'

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

%left     s_equal s_not_equal
%left     s_greather s_greather_equal s_less s_less_equal

%left     s_plus s_minus
%left     s_mul s_div s_mod

%right    r_new

%left     s_not
%left     UMINUS
%left     s_increment s_decrement

%left     s_par_open s_par_close
%left     s_dot
%left     s_key_open s_key_close

%start BODY_MATRIOSHTS

%% /* language grammar */

BODY_MATRIOSHTS
    : LISTA_CONTENIDO EOF
      {return $1;}
    ;

LISTA_CONTENIDO
    :  /*IMPORT LISTA_SENTENCIAS
      {
        $1 = [$1];
        for(var i = 0; i < $2.length; i++)
        {
            $1.push($2[i]);
        }
        $$ = $1;
      }
    | */LISTA_SENTENCIAS
      {
          $$ = $1;
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
    /*| SENTENCIA_ASIGNACION s_dot_coma
      {$$ = $1;}  */
      | SENTENCIA_LLAMADA s_dot_coma
      {$$ = $1;} 
      | SENTENCIA_ACCESO s_dot_coma
      {$$ = $1;} 
    ;

TIPO
    : r_void
      {$$ = {etiqueta: 'tipo', tipo: 0, valor: $1};}
    | r_nulo
      {$$ = {etiqueta: 'tipo', tipo: 1, valor: $1};}
    | r_boolean
      {$$ = {etiqueta: 'tipo', tipo: 2, valor: $1};}
    | r_number
      {$$ = {etiqueta: 'tipo', tipo: 3, valor: $1};}
    | identificador
      {
        if($1.toLowerCase() == "String")
        {
          $$ = {etiqueta: 'tipo', tipo: 4, valor: $1};
        }
        else
        {
          $$ = {etiqueta: 'tipo', tipo: 5, valor: $1};
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
    : LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $1, tipo: $3, valor: $5};
      }
    |LISTA_IDENTIFICADORES s_doble_dot TIPO
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $1, tipo: $3, valor: null};      
      }
    | LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $1, tipo: null, valor: $3};
      }
    | LISTA_IDENTIFICADORES 
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $1, tipo: null, valor: null};
      }
    | r_let LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: $4, valor: $6};
      }
    | r_let LISTA_IDENTIFICADORES s_doble_dot TIPO
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: $4, valor: null};
      }
    | r_let LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: null, valor: $4};
        $$.setValor($4);
      }
    | r_let LISTA_IDENTIFICADORES
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: null, valor: null};
      }
    | r_const LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: true, identificador: $2, tipo: $4, valor: $6};      
      }  
    | r_const LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: true, identificador: $2, tipo: null, valor: $4};      
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
    | DATO_PRIMITIVO
      {$$ = $1;} 
    ;

EXPRESION_ARITMETICA
    : EXPRESION s_plus EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'suma', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_minus EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'resta', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_mul EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'multiplicacion', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_div EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'divido', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_mod EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'modulo', linea: linea, columna: columna, expresion: $1, expresion2: $3};
      }
    ;

EXPRESION_RELACIONAL
    : EXPRESION s_greather EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'mayor_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_less EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'menor_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_greather_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'mayor_igual_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_less_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'menor_igual_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'igual_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_not_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'diferente_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    ;

EXPRESION_LOGICA
    : EXPRESION s_or EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'or', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_and EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'and', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | s_not EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'not', linea: linea, columna: columna, expresion1: $2};
      }
    ;

OPERADOR_UNARIO
    : s_minus EXPRESION %prec UMINUS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'operador_urinario', linea: linea, columna: columna, expresion1: $2};
      }
    ;

OPERADOR_INCREMENTO
    : identificador s_increment
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'operador_incremento', linea: linea, columna: columna, expresion1: $1};
      }  
    ;    

OPERADOR_DECREMENTO
    : identificador s_decrement
      {
        var linea = yylineno;
        var columna = yyleng; 
        $$ = {etiqueta: 'operador_decremento', linea: linea, columna: columna, expresion: $1};
      }
    ; 

SENTENCIA_ACCESO  
  : identificador LISTA_ACCESOS
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_acceso', linea: linea, columna: columna, identificador: $1, lista_acceso: $2};
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
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'tipo_acceso', linea: linea, columna: columna, tipo: 0, acceso0: $2, acceso1: null, acceso2: null};
    }
    | s_dot SENTENCIA_LLAMADA
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'tipo_acceso', linea: linea, columna: columna, tipo: 2, acceso0: null, acceso1: null, acceso2: $2};
    }
    | s_dot identificador
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'tipo_acceso', linea: linea, columna: columna, tipo: 1, acceso0: null, acceso1: $2, acceso2: null};
    }
  ;

SENTENCIA_LLAMADA
  : identificador s_par_open LISTA_EXPRESIONES s_par_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_llamada', linea: linea, columna: columna, identificador: $1, parametros: $3};
    }
  | identificador s_par_open s_par_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_llamada', linea: linea, columna: columna, identificador: $1, parametros: []};
    } 
  ;

DATO_PRIMITIVO
    : nulo
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 1, valor: $1}, valor: yytext}; 
      }
    | boolean
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 2, valor: $1}, valor: yytext}; 
      }
    | number
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 3, valor: $1}, valor: yytext};
      }
    | string
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 4, valor: $1}, valor:  yytext};
      }
    | identificador
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'valor_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 5, valor: $1}, valor: yytext};
      }
    ;