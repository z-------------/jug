#!/usr/bin/env node

const jug = require("..");
const path = require("path");
const fsp = require("fs").promises;

function assert(condition, message) {
    if (!condition) {
        console.error(message);
        process.exit(1);
    }
}

(async () => {
    const filename = process.argv[2];
    assert(filename, "No filename specified.");

    const filePath = path.join(process.cwd(), filename);
    const data = await fsp.readFile(filePath, "utf-8");
    const processed = jug(data);

    process.stdout.write(processed);
})();
