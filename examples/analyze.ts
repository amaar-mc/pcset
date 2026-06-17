/**
 * Run with: npm run example
 * In an application you would import from the published package instead:
 *   import { setClass, primeForm, intervalVector } from "pcset";
 */
import { intervalVector, normalOrder, primeForm, sameSetClass, setClass } from "../src/index";

const chords: Record<string, number[]> = {
  "C major triad": [0, 4, 7],
  "A minor triad": [9, 0, 4],
  "diminished seventh": [0, 3, 6, 9],
  "dominant seventh": [0, 4, 7, 10],
  "whole-tone scale": [0, 2, 4, 6, 8, 10],
  "all-interval tetrachord": [0, 1, 4, 6],
};

for (const [name, pcs] of Object.entries(chords)) {
  const sc = setClass(pcs);
  console.log(`${name}: {${pcs.join(" ")}}`);
  console.log(`  normal order   ${JSON.stringify(normalOrder(pcs))}`);
  console.log(`  prime form     (${primeForm(pcs).join("")})`);
  console.log(`  interval vec   <${intervalVector(pcs).join("")}>`);
  console.log(`  symmetry       Tn=${sc.transpositionalSymmetry} TnI=${sc.inversionalSymmetry}`);
  if (sc.zPartner) console.log(`  Z-partner      (${sc.zPartner.join("")})`);
  console.log();
}

console.log("major and minor triads share a set class:", sameSetClass([0, 4, 7], [0, 3, 7]));
