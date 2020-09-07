"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const angular_1 = require("@ionic/angular");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const menu_component_1 = require("../Components/menu/menu.component");
const formulario_ejecutar_component_1 = require("../Components/formulario-ejecutar/formulario-ejecutar.component");
let ComponentsModule = class ComponentsModule {
};
ComponentsModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [
            menu_component_1.MenuComponent,
            formulario_ejecutar_component_1.FormularioEjecutarComponent,
        ],
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            angular_1.IonicModule,
        ],
        exports: [
            menu_component_1.MenuComponent,
            formulario_ejecutar_component_1.FormularioEjecutarComponent,
        ]
    })
], ComponentsModule);
exports.ComponentsModule = ComponentsModule;
//# sourceMappingURL=components.module.js.map