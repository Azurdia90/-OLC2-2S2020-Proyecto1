"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let TextAreaComponent = class TextAreaComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.buildForm();
    }
    ngOnInit() { }
    buildForm() {
        this.formulario_ejecutar = this.formBuilder.group({
            textarea: ['', [forms_1.Validators.required]]
        });
    }
    ejecutar(event) {
        event.preventDefault();
        ``;
        const value = this.formulario_ejecutar.value;
        const execute_text = value['textarea'];
        var resultado = Grammar_MatrioshTS.parse(execute_text);
        console.log(resultado);
    }
};
exports.TextAreaComponent = TextAreaComponent;
exports.TextAreaComponent = TextAreaComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-text-area',
        templateUrl: './text-area.component.html',
        styleUrls: ['./text-area.component.scss'],
    })
], TextAreaComponent);
//# sourceMappingURL=text-area.component.js.map
//# sourceMappingURL=text-area.component.js.map