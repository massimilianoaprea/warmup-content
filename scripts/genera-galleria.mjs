// ============================================================
//  genera-galleria.mjs
//  Genera automaticamente "galleria.json" leggendo le foto
//  dentro le cartelle img/galleria/<anno>/
//
//  Come si usa (dalla cartella del progetto):
//      node genera-galleria.mjs
//
//  Struttura attesa delle cartelle:
//      img/galleria/2022/...foto...
//      img/galleria/2023/...foto...
//      img/galleria/2026/...foto...   <- nuova edizione: basta creare la cartella
//
//  Lo script:
//   - rilegge img/galleria/, una sottocartella per anno;
//   - mantiene le etichette edizione (5ª, 6ª...) già impostate;
//   - mantiene i titoli foto già scritti a mano;
//   - aggiunge gli anni nuovi con etichetta vuota (la scrivi tu una volta).
// ============================================================

import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = "img/galleria";       // cartella delle foto
const OUT  = "galleria.json";      // file generato
const ESTENSIONI = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// Carica il file esistente (per non perdere etichette e titoli)
let vecchio = { edizioni: {}, foto: [] };
if (existsSync(OUT)) {
  try { vecchio = JSON.parse(readFileSync(OUT, "utf8")); }
  catch { console.warn("⚠  galleria.json esistente non leggibile, lo rigenero da zero."); }
}
const titoliVecchi = Object.fromEntries((vecchio.foto || []).map(f => [f.file, f.titolo || ""]));

if (!existsSync(BASE)) {
  console.error(`✗  Cartella "${BASE}" non trovata. Crea img/galleria/<anno>/ e mettici le foto.`);
  process.exit(1);
}

const anni = readdirSync(BASE)
  .filter(n => statSync(join(BASE, n)).isDirectory())
  .sort();

const edizioni = { ...(vecchio.edizioni || {}) };
const foto = [];

for (const anno of anni) {
  if (!(anno in edizioni)) edizioni[anno] = "";   // nuovo anno: etichetta da compilare
  const files = readdirSync(join(BASE, anno))
    .filter(f => ESTENSIONI.includes(f.toLowerCase().slice(f.lastIndexOf("."))))
    .sort();
  for (const f of files) {
    const src = `${BASE}/${anno}/${f}`;
    foto.push({ anno, file: src, titolo: titoliVecchi[src] || "" });
  }
}

writeFileSync(OUT, JSON.stringify({ edizioni, foto }, null, 2) + "\n", "utf8");

console.log(`✓  ${OUT} aggiornato: ${foto.length} foto in ${anni.length} edizioni (${anni.join(", ")}).`);
const daCompilare = Object.entries(edizioni).filter(([, v]) => !v).map(([a]) => a);
if (daCompilare.length) {
  console.log(`ℹ  Etichetta edizione da scrivere per: ${daCompilare.join(", ")} (apri ${OUT} e compila "edizioni").`);
}
