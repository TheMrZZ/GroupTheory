"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
Array.prototype.get = function (index) {
    if (index >= 0) {
        return this[index];
    }
    return this[this.length + index];
};
Array.prototype.set = function (index, value) {
    if (index >= 0) {
        this[index] = value;
    }
    else {
        this[this.length + index] = value;
    }
};
function euclideanExtendedAlgorithm(a, b) {
    let table = [[1, 0], [0, 1], [0, 0], [a, b]];
    while (table[constants_1.r].get(-1) !== 0) {
        /* First get the new quotient */
        const quotient = Math.floor(table[constants_1.r].get(-2) / table[constants_1.r].get(-1));
        table[constants_1.q].push(quotient);
        table[constants_1.r].push(table[constants_1.r].get(-2) % table[constants_1.r].get(-1));
        table[constants_1.u].push(table[constants_1.u].get(-2) - quotient * table[constants_1.u].get(-1));
        table[constants_1.v].push(table[constants_1.v].get(-2) - quotient * table[constants_1.v].get(-1));
        if (table[constants_1.u].length > 10) {
            break;
        }
    }
    return table;
}
exports.default = euclideanExtendedAlgorithm;
//# sourceMappingURL=euclideanAlgorithm.js.map