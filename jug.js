const patOpen = /^<#jug$/i;
const patClose = /^#>$/;

function jug(doc) {
    function print(text) { // used by scripts in the doc
        text.split("\n").forEach(line => {
            outLines.push(" ".repeat(indentLevel) + line);
        });
    }

    let isInBlock = false;

    let indentLevel = 0;

    const inLines = doc.split("\n");
    const outLines = [];
    const scriptLines = [];

    for (const line of inLines) {
        const lineTrim = line.trim();
        if (!isInBlock) {
            if (lineTrim.match(patOpen)) {
                isInBlock = true;
                indentLevel = line.indexOf(lineTrim);
            } else {
                outLines.push(line);
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

    return outLines.join("\n");
}

module.exports = jug;
