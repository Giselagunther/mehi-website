import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import config from "../tailwind.config.ts";

const require = createRequire(import.meta.url);
// Guard adaptado al compilador Tailwind 3 instalado, no a una lista manual de clases.
const resolveConfig = require("tailwindcss/resolveConfig");
const { createContext } = require("tailwindcss/lib/lib/setupContextUtils");
const { generateRules } = require("tailwindcss/lib/lib/generateRules");

test("las utilidades de las páginas públicas existen en el compilador Tailwind", () => {
  const context = createContext(resolveConfig(config));
  const classes = new Set<string>();
  const files = ["MarketingHome", "PublicContent", "ContactForm"].map(
    (name) => `../app/components/${name}.tsx`,
  );
  files.push("../app/not-found.tsx");
  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      readFileSync(new URL(file, import.meta.url), "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    const collect = (node: ts.Node) => {
      if (
        ts.isStringLiteral(node) ||
        ts.isNoSubstitutionTemplateLiteral(node) ||
        ts.isTemplateHead(node) ||
        ts.isTemplateMiddle(node) ||
        ts.isTemplateTail(node)
      ) {
        for (const candidate of node.text.split(/\s+/).filter(Boolean))
          classes.add(candidate);
      }
      ts.forEachChild(node, collect);
    };
    const visit = (node: ts.Node) => {
      if (
        ts.isJsxAttribute(node) &&
        node.name.getText(source) === "className" &&
        node.initializer
      )
        collect(node.initializer);
      else ts.forEachChild(node, visit);
    };
    visit(source);
  }
  const invalid = Array.from(classes).filter(
    (value) =>
      !["group", "peer"].includes(value) &&
      !generateRules(new Set([value]), context).length,
  );
  assert.deepEqual(invalid, [], "Tailwind ignoraría estas clases");
  assert.equal(
    generateRules(new Set(["h-4.5"]), context).length,
    0,
    "El guard debe detectar clases inválidas",
  );
});
