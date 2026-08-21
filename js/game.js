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

  const chosen = shuffle(pool).slice(0, GAME_QUESTIONS_PER_LEVEL);
  const questions = chosen.map(w => gameBuildQuestion(w, pool, level));

  return { level, questions };
}
