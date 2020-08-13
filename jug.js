const docUtils = require("./src/docUtils");

const p = require("./parser/parser");

const trailingWhitespacePat = /(\r|\t| )*$/;

function jug(doc, config) {
    const vars = {
        indentLevel: 0,
        outs: [],
        blockFirstPrint: true,
    };

    docUtils.init(vars, config);
    const { print, put, log } = docUtils;

    const parsed = p.parse(doc);
    let prevText, prevItem;
    for (const item of parsed) {
        const [kind, text] = item;
        if (kind === 0) { // plaintext
            let textProcessed = text;
            if (prevItem && prevItem[0] === 1 && text[0] === "\n") {
                textProcessed = textProcessed.substring(1);
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
