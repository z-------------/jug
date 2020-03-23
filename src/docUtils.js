/*
 * Functions available in Jug documents.
 */

let vars, config;

function init(_vars, _config) {
    vars = _vars;
    config = _config;
}

function print(text, printIndentLevel = 0) {
    text.split("\n").forEach(line => {
        vars.outLines.push(" ".repeat(vars.indentLevel + printIndentLevel) + line);
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
    log,
};
