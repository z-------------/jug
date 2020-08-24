#!/usr/bin/env node

const jug = require("..");
const path = require("path");
const fsp = require("fs").promises;
const { program } = require("commander");

let filename;
program
    .version(require("../package.json").version)
    .arguments("<filename>")
    .action(_filename => filename = _filename)
    .option("-v, --verbose", "enable logging output from Jug documents")
    .parse(process.argv);

(async () => {
    const filePath = path.join(process.cwd(), filename);
    const data = await fsp.readFile(filePath, "utf-8");
    const processed = jug(data, {
        verbose: program.verbose,
        sourcePath: filePath,
    });

    process.stdout.write(processed);
})();
