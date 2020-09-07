"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const routes = [
    {
        path: 'home',
        loadChildren: () => Promise.resolve().then(() => require('./home/home.module')).then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
        ],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map