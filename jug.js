const docUtils = require("./src/docUtils");

const p = require("./parser/parser");

const trailingWhitespacePat = /(\r|\t| )*$/;

function startsWithNewline(text) {
    return text[0] === "\n" || text.substring(0, 2) === "\r\n";
}

function stripLeadingNewline(text) {
    let start = 1;
    if (text.substring(0, 2) === "\r\n") start = 2;
    return text.substring(start);
}

function jug(doc, config) {
    const vars = {
        indentLevel: 0,
        outs: [],
        blockFirstPrint: true,
    };

    docUtils.init(vars, config);
    const { print, put, log } = docUtils;
    const include = docUtils.include.bind({ globalEval: eval });

    const parsed = p.parse(doc);
    let prevText, prevItem;
    for (const item of parsed) {
        // console.log(item);
        const [kind, text] = item;
        if (kind === 0) { // plaintext
            let textProcessed = text;
            if (prevItem && prevItem[0] === 1 && startsWithNewline(text)) {
                textProcessed = stripLeadingNewline(textProcessed);
            }
            prevText = textProcessed;
            vars.outs.push(textProcessed);
        } else if (kind === 1) { // script
            vars.blockFirstPrint = true;
            if (prevText) {
                const m = prevText.match(trailingWhitespacePat);
                vars.indentLevel = m[0].length;
            }
            eval(text);
        }
        prevItem = item;
    }

    return vars.outs.join("");
}

module.exports = jug;
