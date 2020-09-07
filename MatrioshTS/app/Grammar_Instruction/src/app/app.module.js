"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const angular_1 = require("@ionic/angular");
const ngx_1 = require("@ionic-native/splash-screen/ngx");
const ngx_2 = require("@ionic-native/status-bar/ngx");
const app_component_1 = require("./app.component");
const app_routing_module_1 = require("./app-routing.module");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent],
        entryComponents: [],
        imports: [platform_browser_1.BrowserModule, angular_1.IonicModule.forRoot(), app_routing_module_1.AppRoutingModule],
        providers: [
            ngx_2.StatusBar,
            ngx_1.SplashScreen,
            { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map