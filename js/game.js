/* ============================================================
   LEARN ME — Jeu d'entraînement (300 niveaux, sans attente)
   Génère des niveaux à la volée à partir de la banque de mots,
   avec une difficulté croissante ET des types d'exercices variés
   (QCM, traduction tapée, texte à trous, écoute). Aucun cœur
   consommé, aucune attente : on rejoue immédiatement.
   ============================================================ */

const GAME_TOTAL_LEVELS = 300;
const GAME_QUESTIONS_PER_LEVEL = 8;
const GAME_PASS_RATIO = 0.75; // 6/8
const GAME_LEVELS_PER_BUCKET = 60;

function gameSectorPoolForLevel(level) {
  const buckets = [
    ["quo", "fam", "tra", "voy", "nou"],
    ["mai", "tec", "san", "arg", "nat"],
    ["spo", "emo", "tem", "vil", "edu"],
    ["dro", "med", "sci", "art", "sou"],
  ];
  const bucketIndex = Math.floor((level - 1) / 60);
  if (bucketIndex >= 4) {
    // Niveaux 241-300 : révision complète, tous secteurs + expressions
    return VOCAB_SECTORS.map(s => s.id);
  }
  return buckets[bucketIndex];
}

/* ---------- Anti-doublon : chaque mot n'est retesté qu'une fois
   TOUS les autres mots du même palier de difficulté épuisés. ----------
   On construit, pour chaque palier de 60 niveaux, une séquence de mots
   déterministe (mêlée mais reproductible via une seed), obtenue en
   enchaînant des mélanges indépendants du pool tant qu'il faut pour
   couvrir les 480 questions du palier (60 niveaux × 8). Chaque niveau
   pioche 8 mots consécutifs dans cette séquence : aucun mot ne revient
   avant que tout le pool du palier ait été utilisé une première fois. */

function hashStringToSeed(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

function seededShuffle(arr, seed) {
  let state = seed >>> 0;
  function rand() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const _gameBucketSequenceCache = {};

function gameBucketSequence(bucketIndex, sectorIds) {
  if (_gameBucketSequenceCache[bucketIndex]) return _gameBucketSequenceCache[bucketIndex];
  const pool = VOCAB_WORDS.filter(w => sectorIds.includes(w.sector));
  const usablePool = pool.length >= GAME_QUESTIONS_PER_LEVEL ? pool : VOCAB_WORDS;
  const totalSlots = GAME_LEVELS_PER_BUCKET * GAME_QUESTIONS_PER_LEVEL;
  const baseSeed = hashStringToSeed(`bucket-${bucketIndex}-${sectorIds.slice().sort().join(",")}`);
  const sequence = [];
  let lap = 0;
  while (sequence.length < totalSlots) {
    sequence.push(...seededShuffle(usablePool, baseSeed + lap * 104729));
    lap++;
  }
  const result = sequence.slice(0, totalSlots);
  _gameBucketSequenceCache[bucketIndex] = result;
  return result;
}

function gameWordsForLevel(level) {
  const sectorIds = gameSectorPoolForLevel(level);
  const bucketIndex = Math.min(4, Math.floor((level - 1) / GAME_LEVELS_PER_BUCKET));
  const sequence = gameBucketSequence(bucketIndex, sectorIds);
  const levelWithinBucket = (level - 1) % GAME_LEVELS_PER_BUCKET;
  const startIdx = levelWithinBucket * GAME_QUESTIONS_PER_LEVEL;

  const picked = [];
  const seenIds = new Set();
  let idx = startIdx;
  let safety = 0;
  while (picked.length < GAME_QUESTIONS_PER_LEVEL && safety < sequence.length * 2) {
    const w = sequence[idx % sequence.length];
    if (!seenIds.has(w.id)) {
      seenIds.add(w.id);
      picked.push(w);
    }
    idx++;
    safety++;
  }
  return picked;
}

function gamePickExerciseType(level) {
  const r = Math.random();
  const qcmProb = Math.max(0.3, 0.7 - level / 500);
  if (r < qcmProb) return "qcm";
  const rest = (r - qcmProb) / (1 - qcmProb);
  if (rest < 0.34) return "translate";
  if (rest < 0.67) return "fill";
  return "listen";
}

function gameBuildQuestion(w, pool, level) {
  const type = gamePickExerciseType(level);
  const fr2enProb = Math.min(0.85, 0.15 + level / 300);
  const isFr2En = Math.random() < fr2enProb;

  if (type === "qcm") {
    const distractors = shuffle(pool.filter(x => x.id !== w.id)).slice(0, 3);
    if (isFr2En) {
      const options = shuffle([w.en, ...distractors.map(d => d.en)]);
      return { title: `Comment dit-on « ${w.fr} » en anglais ?`, ex: { type: "qcm", options, answer: options.indexOf(w.en) } };
    }
    const options = shuffle([w.fr, ...distractors.map(d => d.fr)]);
    return { title: `Que signifie « ${w.en} » ?`, ex: { type: "qcm", options, answer: options.indexOf(w.fr) } };
  }

  if (type === "translate") {
    if (isFr2En) {
      return { title: "✍️ Traduction", ex: { type: "translate", prompt: `Traduis en anglais : « ${w.fr} »`, answer: w.en, alts: [] } };
    }
    return { title: "✍️ Traduction", ex: { type: "translate", prompt: `Traduis en français : « ${w.en} »`, answer: w.fr, alts: [] } };
  }

  if (type === "fill") {
    if (isFr2En) {
      return { title: "📝 Texte à trous", ex: { type: "fill", text: `« ${w.fr} » se traduit en anglais par ___.`, answer: w.en, alts: [] } };
    }
    return { title: "📝 Texte à trous", ex: { type: "fill", text: `« ${w.en} » veut dire en français ___.`, answer: w.fr, alts: [] } };
  }

  // listen
  const distractors = shuffle(pool.filter(x => x.id !== w.id)).slice(0, 3);
  const options = shuffle([w.fr, ...distractors.map(d => d.fr)]);
  return {
    title: "🎧 Écoute et choisis la traduction",
    ex: { type: "listen", text: w.en, options, answer: options.indexOf(w.fr) },
  };
}

function generateGameLevel(level) {
  const sectorIds = gameSectorPoolForLevel(level);
  let pool = VOCAB_WORDS.filter(w => sectorIds.includes(w.sector));
  if (pool.length < GAME_QUESTIONS_PER_LEVEL + 3) pool = VOCAB_WORDS;

  const chosen = gameWordsForLevel(level);
  const questions = chosen.map(w => gameBuildQuestion(w, pool, level));

  return { level, questions };
}
