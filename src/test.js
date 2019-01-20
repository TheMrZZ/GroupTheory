"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prettyPrint(table, names) {
    let representation = {};
    for (let i = 0; i < table.length; i++) {
        const column = table[i];
        const name = names[i];
        representation[name] = column;
    }
    console.table(representation);
}
//# sourceMappingURL=test.js.map