"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageRoutingModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const home_page_1 = require("./home.page");
const routes = [
    {
        path: '',
        component: home_page_1.HomePage,
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
exports.HomePageRoutingModule = HomePageRoutingModule;
exports.HomePageRoutingModule = HomePageRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], HomePageRoutingModule);
//# sourceMappingURL=home-routing.module.js.map
//# sourceMappingURL=home-routing.module.js.map