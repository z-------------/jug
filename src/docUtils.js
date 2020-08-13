/*
 * Functions available in Jug documents.
 */

let vars, config;

function init(_vars, _config) {
    vars = _vars;
    config = _config;
}

function put(text, printIndentLevel = 0) {
    return print(text, printIndentLevel, false);
}

function print(text, printIndentLevel = 0, trailingNewline = true) {
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
    print,
    put,
    log,
};
