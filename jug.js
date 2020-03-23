const docUtils = require("./src/docUtils");

const patOpen = /^<#jug$/i;
const patClose = /^#>$/;

function jug(doc, config) {
    let isInBlock = false;

    const vars = {
        indentLevel: 0,
        outLines: [],
    };
    const inLines = doc.split("\n");
    const scriptLines = [];

    docUtils.init(vars, config);
    const { print, log } = docUtils;

    for (const line of inLines) {
        const lineTrim = line.trim();
        if (!isInBlock) {
            if (lineTrim.match(patOpen)) {
                isInBlock = true;
                vars.indentLevel = line.indexOf(lineTrim);
            } else {
                vars.outLines.push(line);
            }
            continue;
        } else { // isInBlock == true
            if (lineTrim.match(patClose)) {
                isInBlock = false;
                eval(scriptLines.join("\n"));
                scriptLines.length = 0;
            } else {
                scriptLines.push(line);
            }
        }
    }

    return vars.outLines.join("\n");
}

module.exports = jug;
