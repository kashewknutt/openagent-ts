"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMath = handleMath;
function handleMath(expression) {
    try {
        const safeExpr = expression.replace(/[^-()\d/*+.]/g, "");
        const result = eval(safeExpr);
        return `The result is: ${result}`;
    }
    catch (err) {
        return "Could not evaluate the expression.";
    }
}
