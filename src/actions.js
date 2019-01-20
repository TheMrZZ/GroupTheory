"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const euclideanAlgorithm_1 = __importDefault(require("./euclideanAlgorithm"));
const constants_1 = require("./constants");
function getChildrenByTagName(element, tagName) {
    let array = (Array
        .from(element.getElementsByTagName('*'))
        .filter(e => e.tagName === tagName));
    console.log(array);
    return array;
}
function getEuclideanTable() {
    const table = document.getElementById('table');
    const form = document.getElementById('algorithm-form');
    const number1 = getChildrenByTagName(form, 'input')[0];
    const number2 = getChildrenByTagName(form, 'input')[1];
    console.log(number1, number2);
    form.onsubmit = function () {
        let tableBody = document.createElement('tbody');
        table.innerHTML = '';
        tableBody.innerHTML = '<thead><th>u</th><th>v</th><th>q</th><th>r</th></thead>';
        let a = parseInt(number1.value);
        let b = parseInt(number2.value);
        let result = euclideanAlgorithm_1.default(a, b);
        // need to iter on rows first
        for (let row = 0; row < result[0].length; row++) {
            let tableRow = document.createElement('tr');
            for (let col = 0; col < result.length; col++) {
                let tableCell = document.createElement('td');
                let n = result[col][row];
                tableCell.innerText = n.toString();
                // Check if the number is PGCD to display him in another color.
                // PGCD is on the r column, one row before the last
                if (col === constants_1.r && row === result[0].length - 2) {
                    tableCell.id = 'pgcd';
                    tableCell.title = 'PGCD';
                }
                tableRow.appendChild(tableCell);
            }
            tableBody.appendChild(tableRow);
        }
        table.appendChild(tableBody);
    };
}
exports.getEuclideanTable = getEuclideanTable;
function addHoverOnPGCD() {
    let PGCD = document.getElementById('pgcd');
    PGCD.onmouseenter = function () {
    };
}
exports.addHoverOnPGCD = addHoverOnPGCD;
//# sourceMappingURL=actions.js.map