/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "..");

function walk(dir, out = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            if (
                ent.name === "node_modules" ||
                ent.name === ".next" ||
                ent.name === ".history" ||
                ent.name === ".git"
            ) {
                continue;
            }
            walk(p, out);
        } else if (ent.isFile() && p.endsWith(".tsx")) {
            out.push(p);
        }
    }
    return out;
}

function transpileTsxToJsx(sourceText, sourceFilePath) {
    const res = ts.transpileModule(sourceText, {
        fileName: sourceFilePath,
        compilerOptions: {
            jsx: ts.JsxEmit.Preserve,
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.ESNext,
            moduleResolution: ts.ModuleResolutionKind.Bundler,
            esModuleInterop: true,
            importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
            removeComments: false,
        },
    });
    return res.outputText;
}

function main() {
    const args = process.argv.slice(2);
    const deleteOriginal = args.includes("--delete");

    const roots = args.filter((a) => !a.startsWith("--"));
    const scanRoots = roots.length ? roots : ["app", "components"];

    const tsxFiles = [];
    for (const r of scanRoots) {
        const abs = path.resolve(ROOT, r);
        if (!fs.existsSync(abs)) continue;
        walk(abs, tsxFiles);
    }

    if (!tsxFiles.length) {
        console.log("No .tsx files found.");
        return;
    }

    for (const tsxPath of tsxFiles) {
        const jsxPath = tsxPath.replace(/\.tsx$/, ".jsx");
        const input = fs.readFileSync(tsxPath, "utf8");
        const output = transpileTsxToJsx(input, tsxPath);

        fs.mkdirSync(path.dirname(jsxPath), { recursive: true });
        fs.writeFileSync(jsxPath, output, "utf8");

        if (deleteOriginal) {
            fs.unlinkSync(tsxPath);
        }
    }

    console.log(
        `Converted ${tsxFiles.length} file(s) to .jsx${
            deleteOriginal ? " and deleted originals" : ""
        }.`
    );
}

main();
