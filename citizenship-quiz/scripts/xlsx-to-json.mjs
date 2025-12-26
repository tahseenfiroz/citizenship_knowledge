import fs from "node:fs";
import path from "node:path";
import xlsx from "xlsx";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "data", "questions.xlsx");
const OUTPUT = path.join(ROOT, "data", "questions.json");

function req(v) {
  return String(v ?? "").trim();
}

if (!fs.existsSync(INPUT)) {
  console.error(`Missing Excel file: ${INPUT}`);
  process.exit(1);
}

const wb = xlsx.readFile(INPUT);
const sheet = wb.Sheets["questions"];
if (!sheet) {
  console.error('Sheet named "questions" not found in questions.xlsx');
  process.exit(1);
}

const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

const questions = rows
  .map((r) => {
    const id = req(r.id);
    const chapter = req(r.chapter);
    const type = req(r.type).toUpperCase();
    const question = req(r.question);
    const correct = req(r.correct).toUpperCase();
    const explanation = req(r.explanation);

    if (!id || !chapter || !question || !correct) return null;
    if (type !== "MCQ" && type !== "TF") return null;

    const out = { id, chapter, type, question, correct, explanation: explanation || undefined };

    if (type === "MCQ") {
      out.a = req(r.a) || undefined;
      out.b = req(r.b) || undefined;
      out.c = req(r.c) || undefined;
      out.d = req(r.d) || undefined;
    }
    return out;
  })
  .filter(Boolean);

fs.writeFileSync(OUTPUT, JSON.stringify(questions, null, 2), "utf-8");
console.log(`✅ Wrote ${questions.length} questions → ${OUTPUT}`);
