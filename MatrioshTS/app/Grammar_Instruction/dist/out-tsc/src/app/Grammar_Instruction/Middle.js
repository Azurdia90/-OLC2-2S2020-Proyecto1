"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middle {
    constructor() {
        this.input = "";
        this.output = "";
    }
    getInput() {
        return this.input;
    }
    setInput(p_input) {
        this.input = p_input;
    }
    getOuput() {
        return this.output;
    }
    setOuput(p_output) {
        this.output = this.output.concat(p_output.toString());
    }
    clearOutput() {
        this.output = "";
    }
}
exports.default = Middle;
//# sourceMappingURL=Middle.js.map
//# sourceMappingURL=Middle.js.map