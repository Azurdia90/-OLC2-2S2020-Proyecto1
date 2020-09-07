"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middle {
    constructor() {
        this.input = "";
        this.output = "";
    }
    static getInstance() {
        if (this.instance != null) {
            return this.instance;
        }
        else {
            this.instance = new Middle();
            return this.instance;
        }
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
        this.output.concat(p_output.toString() + "\n");
    }
    clear() {
        this.input = "";
        this.output = "";
    }
}
Middle.instance = new Middle();
exports.default = Middle;
//# sourceMappingURL=Middle.js.map