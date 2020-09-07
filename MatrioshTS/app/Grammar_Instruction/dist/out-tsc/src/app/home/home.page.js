"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let HomePage = class HomePage {
    constructor(menuController) {
        this.menuController = menuController;
    }
    toggleMenu() {
        this.menuController.toggle();
    }
};
exports.HomePage = HomePage;
exports.HomePage = HomePage = tslib_1.__decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: 'home.page.html',
        styleUrls: ['home.page.scss'],
    })
], HomePage);
//# sourceMappingURL=home.page.js.map
//# sourceMappingURL=home.page.js.map