/* ============================================================
   LEARN ME — Index du programme
   Chargé APRÈS data-curriculum.js et les fichiers avancés,
   une fois que CHAPTERS contient tous les chapitres (1 à 15).
   ============================================================ */

const ALL_UNITS = CHAPTERS.flatMap(c => c.units);
const UNIT_BY_ID = Object.fromEntries(ALL_UNITS.map(u => [u.id, u]));

function unitIndex(unitId) {
  return ALL_UNITS.findIndex(u => u.id === unitId);
}
function prevUnitId(unitId) {
  const i = unitIndex(unitId);
  return i > 0 ? ALL_UNITS[i - 1].id : null;
}
