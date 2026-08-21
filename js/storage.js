/* ============================================================
   LEARN ME — Gestion de l'état & de la progression (localStorage)
   Multi-profils : chaque profil a sa propre progression, comme
   un compte à part entière.
   ============================================================ */

const PROFILES = ["Anthony", "Océane", "David"];
const ACTIVE_PROFILE_KEY = "learnme_active_profile";
const MAX_HEARTS = 5;
const HEART_REGEN_MS = 2 * 60 * 60 * 1000; // 1 cœur toutes les 2h
const DAILY_WORDS_COUNT = 5;

function slugify(name) {
  const decomposed = String(name).toLowerCase().normalize("NFD");
  let stripped = "";
  for (const ch of decomposed) {
    const code = ch.codePointAt(0);
    if (code >= 0x0300 && code <= 0x036f) continue; // signes diacritiques combinants
    stripped += ch;
  }
  return stripped.replace(/[^a-z0-9]/g, "");
}
function profileStorageKey(name) {
  return `learnme_state_v2__${slugify(name)}`;
}

function todayStr(d = new Date()) {
  // Date locale (pas UTC) : le "jour" change à minuit chez l'utilisateur,
  // pas à minuit UTC — important pour que les mots changent au bon moment.
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function defaultState() {
  return {
    xp: 0,
    gems: 20,
    streak: 0,
    hearts: MAX_HEARTS,
    lastHeartLoss: null,
    lastActiveDate: null,
    units: {}, // unitId -> { easy:bool, medium:bool, hard:bool, bestScore:number, passed:bool }
    vocab: {
      learnedIds: [],       // mots déjà distribués (5/jour)
      dailyHistory: {},     // date -> [ids]
      reviewFlags: {},      // id -> true si marqué "à revoir"
      lastDailyDate: null,
    },
    listening: {
      lastDate: null,   // dernière date où l'écoute du jour a été faite
      recentIds: [],     // derniers audios écoutés (pour éviter les répétitions)
      history: [],        // [{date, level, passageId, score, total}]
    },
    game: {
      unlockedLevel: 1,  // premier niveau non encore réussi (frontière)
      history: [],        // [{level, score, total, date}]
    },
  };
}

function loadState(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed, {
      units: parsed.units || {},
      vocab: Object.assign(defaultState().vocab, parsed.vocab || {}),
      listening: Object.assign(defaultState().listening, parsed.listening || {}),
      game: Object.assign(defaultState().game, parsed.game || {}),
    });
  } catch (e) {
    console.warn("État corrompu, réinitialisation.", e);
    return defaultState();
  }
}

function saveState(key, state) {
  localStorage.setItem(key, JSON.stringify(state));
}

const Store = {
  state: null,
  activeProfile: null,

  // ---------- Profils ----------
  getActiveProfileName() {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  },
  setActiveProfile(name) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, name);
    this.activeProfile = name;
    this.state = loadState(profileStorageKey(name));
  },
  clearActiveProfile() {
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
    this.activeProfile = null;
    this.state = null;
  },
  ensureLoaded() {
    const name = this.getActiveProfileName();
    if (name && PROFILES.includes(name)) {
      if (this.activeProfile !== name || !this.state) this.setActiveProfile(name);
      return true;
    }
    return false;
  },

  save() {
    if (!this.activeProfile) return;
    saveState(profileStorageKey(this.activeProfile), this.state);
  },

  // ---------- Cœurs ----------
  regenHearts() {
    const s = this.state;
    if (s.hearts >= MAX_HEARTS || !s.lastHeartLoss) return;
    const elapsed = Date.now() - s.lastHeartLoss;
    const regained = Math.floor(elapsed / HEART_REGEN_MS);
    if (regained > 0) {
      s.hearts = Math.min(MAX_HEARTS, s.hearts + regained);
      s.lastHeartLoss = s.hearts >= MAX_HEARTS ? null : Date.now() - (elapsed % HEART_REGEN_MS);
      this.save();
    }
  },
  loseHeart() {
    const s = this.state;
    if (s.hearts > 0) {
      s.hearts -= 1;
      if (!s.lastHeartLoss) s.lastHeartLoss = Date.now();
      this.save();
    }
    return s.hearts;
  },
  refillHearts() {
    this.state.hearts = MAX_HEARTS;
    this.state.lastHeartLoss = null;
    this.save();
  },
  nextHeartEta() {
    const s = this.state;
    if (s.hearts >= MAX_HEARTS || !s.lastHeartLoss) return null;
    const elapsed = Date.now() - s.lastHeartLoss;
    const remain = HEART_REGEN_MS - (elapsed % HEART_REGEN_MS);
    return remain;
  },

  // ---------- XP / Gemmes / Streak ----------
  addXp(n) {
    this.state.xp += n;
    this.save();
  },
  addGems(n) {
    this.state.gems += n;
    this.save();
  },
  touchStreak() {
    const s = this.state;
    const today = todayStr();
    if (s.lastActiveDate === today) return;
    if (s.lastActiveDate) {
      const prev = new Date(s.lastActiveDate);
      const diffDays = Math.round((new Date(today) - prev) / 86400000);
      s.streak = diffDays === 1 ? s.streak + 1 : 1;
    } else {
      s.streak = 1;
    }
    s.lastActiveDate = today;
    this.save();
  },

  // ---------- Unités / progression pédagogique ----------
  getUnit(unitId) {
    if (!this.state.units[unitId]) {
      this.state.units[unitId] = { easy: false, medium: false, hard: false, bestScore: 0, passed: false };
    }
    return this.state.units[unitId];
  },
  markLessonDone(unitId, difficulty) {
    const u = this.getUnit(unitId);
    u[difficulty] = true;
    this.save();
  },
  recordQuizScore(unitId, score, total) {
    const u = this.getUnit(unitId);
    u.bestScore = Math.max(u.bestScore, score);
    if (score === total) u.passed = true;
    this.save();
    return u.passed;
  },
  isUnitUnlocked(unitId, prevUnitId) {
    if (!prevUnitId) return true;
    return this.getUnit(prevUnitId).passed;
  },

  // ---------- Vocabulaire quotidien ----------
  getTodaysWords() {
    const s = this.state.vocab;
    const today = todayStr();
    if (s.dailyHistory[today]) {
      return s.dailyHistory[today].map(id => VOCAB_BY_ID[id]).filter(Boolean);
    }
    return null; // pas encore générés aujourd'hui
  },
  generateTodaysWords() {
    const s = this.state.vocab;
    const today = todayStr();
    if (s.dailyHistory[today]) return this.getTodaysWords();

    const learnedSet = new Set(s.learnedIds);
    const pool = VOCAB_WORDS.filter(w => !learnedSet.has(w.id));
    const batch = (pool.length > 0 ? pool : VOCAB_WORDS).slice(0, DAILY_WORDS_COUNT);

    s.dailyHistory[today] = batch.map(w => w.id);
    batch.forEach(w => { if (!learnedSet.has(w.id)) s.learnedIds.push(w.id); });
    s.lastDailyDate = today;
    this.save();
    return batch;
  },
  hasTodaysWords() {
    return !!this.state.vocab.dailyHistory[todayStr()];
  },
  toggleReviewFlag(wordId) {
    const s = this.state.vocab;
    s.reviewFlags[wordId] = !s.reviewFlags[wordId];
    this.save();
  },
  isLearned(wordId) {
    return this.state.vocab.learnedIds.includes(wordId);
  },
  totalLearnedCount() {
    return this.state.vocab.learnedIds.length;
  },

  // ---------- Écoute quotidienne ----------
  hasListenedToday() {
    return this.state.listening.lastDate === todayStr();
  },
  recordListening(passage, score, total) {
    const s = this.state.listening;
    const today = todayStr();
    const isFirstToday = s.lastDate !== today;
    s.lastDate = today;
    s.recentIds.push(passage.id);
    if (s.recentIds.length > 4) s.recentIds.shift();
    s.history.push({ date: today, level: passage.level, passageId: passage.id, score, total });
    if (s.history.length > 30) s.history.shift();
    this.save();
    return isFirstToday;
  },

  // ---------- Jeu d'entraînement (100 niveaux, sans attente) ----------
  getGameLevel() {
    return this.state.game.unlockedLevel;
  },
  recordGameResult(level, score, total) {
    const s = this.state.game;
    const passed = score / total >= 0.75;
    s.history.push({ level, score, total, date: todayStr() });
    if (s.history.length > 60) s.history.shift();
    if (passed && level === s.unlockedLevel && s.unlockedLevel < GAME_TOTAL_LEVELS) {
      s.unlockedLevel += 1;
    }
    this.save();
    return passed;
  },
};
