/*
 * Functions available in Jug documents.
 */

const { readFileSync } = require("fs");
const { join, dirname } = require("path");

let vars, config;

function init(_vars, _config) {
    vars = _vars;
    config = _config;
}

function include(filename) {
    const filePath = join(dirname(config.sourcePath), filename);
    const content = readFileSync(filePath, "utf-8");
    this.globalEval(content);
}

function put(text, printIndentLevel = 0) {
    return print(text, printIndentLevel, false);
}

function print(text, printIndentLevel = 0, trailingNewline = true) {
    text = text.toString();
    const splits = text.split("\n");
    splits.forEach(line => {
        let piece = line;
        if (!vars.blockFirstPrint) {
            piece = " ".repeat(vars.indentLevel + printIndentLevel) + piece;
        }
        if (trailingNewline) piece += "\n";
        vars.outs.push(piece);
        vars.blockFirstPrint = false;
    });
}

function log(...args) {
    if (config.verbose) {
        console.error("[JUG]", ...args);
    }
}

module.exports = {
    init,
    include,
    print,
    put,
    log,
};
