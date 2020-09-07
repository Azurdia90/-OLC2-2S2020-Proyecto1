"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioEjecutarComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const AST_1 = require("../../Grammar_Instruction/AST");
const Middle_1 = require("../../Grammar_Instruction/Middle");
let FormularioEjecutarComponent = class FormularioEjecutarComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.buildForm();
    }
    ngOnInit() { }
    buildForm() {
        this.formulario_ejecutar = this.formBuilder.group({
            textarea: ['', [forms_1.Validators.required]],
            consola: ['', [forms_1.Validators.required]],
        });
        this.salida = "...";
    }
    ejecutar(event) {
        event.preventDefault();
        const value = this.formulario_ejecutar.value;
        Middle_1.default.getInstance().clear();
        Middle_1.default.getInstance().setInput(value['textarea']);
        var resultado = Grammar_MatrioshTS.parse(Middle_1.default.getInstance().getInput());
        var ast = new AST_1.default(resultado, false);
        ast.build_ast();
        ast.exec_ast();
        this.imprimirConsola(value);
    }
    imprimirConsola(value) {
        const text_out = Middle_1.default.getInstance().getOuput();
        this.salida = '';
        this.salida = text_out + '\n' + 'fin de la ejecución';
    }
};
FormularioEjecutarComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-formulario-ejecutar',
        templateUrl: './formulario-ejecutar.component.html',
        styleUrls: ['./formulario-ejecutar.component.scss'],
    })
], FormularioEjecutarComponent);
exports.FormularioEjecutarComponent = FormularioEjecutarComponent;
//# sourceMappingURL=formulario-ejecutar.component.js.map