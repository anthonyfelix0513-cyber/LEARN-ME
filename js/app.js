/* ============================================================
   LEARN ME — Contrôleur principal de l'application
   ============================================================ */

let VIEW = "home";        // 'home' | 'vocab' | 'listen' | 'profile' | 'outofhearts'
let LESSON = null;        // session de leçon/quiz en cours
let listenSession = null; // session d'écoute en cours
let listenLevel = null;   // niveau choisi pour l'écoute ('easy'|'medium'|'hard')
let vocabSector = null;
let vocabSearch = "";
let vocabShowHistory = false;
let gameSession = null; // session de jeu en cours (niveau actif)

const PROFILE_AVATARS = { "Anthony": "🦁", "Océane": "🌊", "David": "🐯" };

function renderApp() {
  if (!Store.ensureLoaded()) { renderProfileGateScreen(); return; }
  Store.regenHearts();
  renderChrome();
  const main = document.getElementById("main-content");
  main.innerHTML = "";
  main.scrollTop = 0;

  if (LESSON) { renderLessonScreen(main); return; }
  if (listenSession) { renderListenSession(main); return; }
  if (gameSession) { renderGameSession(main); return; }
  if (VIEW === "vocab") { renderVocabScreen(main); return; }
  if (VIEW === "listen") { renderListenScreen(main); return; }
  if (VIEW === "game") { renderGameScreen(main); return; }
  if (VIEW === "profile") { renderProfileScreen(main); return; }
  if (VIEW === "outofhearts") { renderOutOfHeartsScreen(main); return; }
  renderHomeScreen(main);
}

/* ---------- Sélection de profil ---------- */
function renderProfileGateScreen() {
  const topbar = document.getElementById("topbar");
  const nav = document.getElementById("bottom-nav");
  document.getElementById("lesson-footer").innerHTML = "";
  nav.style.display = "none";
  topbar.innerHTML = "";
  topbar.appendChild(el("h1", "app-title", "Learn Me"));

  const main = document.getElementById("main-content");
  main.innerHTML = "";
  main.appendChild(el("div", "section-title", "👋 Qui apprend aujourd'hui ?"));
  main.appendChild(el("p", "hint-text", "Chaque profil a sa propre progression, comme un compte à part entière."));
  const grid = el("div", "profile-grid");
  PROFILES.forEach(name => {
    const card = el("button", "profile-card");
    card.innerHTML = `<div class="avatar">${PROFILE_AVATARS[name] || "👤"}</div><div class="pname">${name}</div>`;
    card.onclick = () => { Store.setActiveProfile(name); VIEW = "home"; renderApp(); };
    grid.appendChild(card);
  });
  main.appendChild(grid);
}

/* ---------- Chrome (en-tête + nav) ---------- */
function renderChrome() {
  const topbar = document.getElementById("topbar");
  const nav = document.getElementById("bottom-nav");
  topbar.innerHTML = "";

  if (LESSON || listenSession || gameSession) {
    nav.style.display = "none";
    const closeBtn = el("button", "close-btn", "✕");
    closeBtn.onclick = () => {
      showConfirmModal("Quitter ? Ta progression sur cette session sera perdue.", () => {
        document.getElementById("lesson-footer").innerHTML = "";
        LESSON = null;
        listenSession = null;
        gameSession = null;
        renderApp();
      });
    };
    topbar.appendChild(closeBtn);
    if (LESSON) {
      const track = el("div", "progress-track");
      const fill = el("div", "progress-fill");
      fill.style.width = "0%";
      track.appendChild(fill);
      const heartsEl = el("div", "stat-pill hearts", "❤️ " + Store.state.hearts);
      topbar.appendChild(track);
      topbar.appendChild(heartsEl);
      LESSON.progressFillEl = fill;
      LESSON.heartsEl = heartsEl;
    } else if (gameSession) {
      topbar.appendChild(el("div", "stat-pill", `🎮 Niveau ${gameSession.level}`));
    } else {
      topbar.appendChild(el("div", "stat-pill", "🎧 Écoute — " + Store.activeProfile));
    }
  } else {
    nav.style.display = "flex";
    topbar.appendChild(el("h1", "app-title", `Learn Me <span class="profile-tag">${Store.activeProfile}</span>`));
    const stats = el("div", "topbar-stats");
    stats.style.display = "flex";
    stats.style.gap = "14px";
    stats.appendChild(el("div", "stat-pill streak", `🔥 ${Store.state.streak}`));
    stats.appendChild(el("div", "stat-pill gems", `💎 ${Store.state.gems}`));
    stats.appendChild(el("div", "stat-pill hearts", `❤️ ${Store.state.hearts}`));
    topbar.appendChild(stats);
    nav.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === VIEW));
  }
}

/* ============================================================
   ÉCRAN D'ACCUEIL — Chemin d'apprentissage
   ============================================================ */
function renderHomeScreen(main) {
  const already = Store.hasTodaysWords();
  const banner = el("div", "daily-banner");
  banner.innerHTML = `<div class="icon">${already ? "✅" : "☀️"}</div>
    <div class="txt">
      <div class="h">${already ? "Mots du jour appris" : "5 nouveaux mots t'attendent"}</div>
      <div class="s">${already ? "Appuie pour les revoir" : "Appuie pour les découvrir"}</div>
    </div>`;
  banner.onclick = () => openDailyWordsModal();
  main.appendChild(banner);

  CHAPTERS.forEach(chapter => {
    if (chapter.comingSoon) {
      const c = el("div", "coming-soon-card",
        `<div style="font-size:28px">${chapter.icon}</div>
         <div style="font-weight:900;margin-top:6px">${chapter.title}</div>
         <div style="font-size:12px;margin-top:4px">Niveau ${chapter.level} — Bientôt disponible 🚧</div>`);
      main.appendChild(c);
      return;
    }
    const card = el("div", "chapter-card");
    card.innerHTML = `<div class="chapter-meta">Niveau ${chapter.level}</div>
      <div class="chapter-title">${chapter.icon} ${chapter.title}</div>`;
    main.appendChild(card);

    const list = el("div", "unit-list");
    chapter.units.forEach(unit => {
      const prev = prevUnitId(unit.id);
      const unlocked = Store.isUnitUnlocked(unit.id, prev);
      const prog = Store.getUnit(unit.id);
      const row = el("div", "unit-row" + (!unlocked ? " locked" : "") + (prog.passed ? " passed" : ""));
      row.innerHTML = `<div class="unit-icon">${unit.icon}</div>
        <div class="unit-info"><div class="t">${unit.title}</div><div class="d">${unit.desc}</div></div>
        <div class="unit-badge">${prog.passed ? "✅" : (unlocked ? "🔓" : "🔒")}</div>`;
      list.appendChild(row);

      if (unlocked) {
        const diffRow = el("div", "diff-row");
        [["easy", "Facile"], ["medium", "Intermédiaire"], ["hard", "Difficile"]].forEach(([key, label]) => {
          const chip = el("button", "diff-chip" + (prog[key] ? " done" : ""), (prog[key] ? "✓ " : "") + label);
          chip.onclick = () => startLesson(unit.id, key);
          diffRow.appendChild(chip);
        });
        list.appendChild(diffRow);

        const quizLink = el("div", "quiz-row",
          prog.passed ? "✅ Quiz réussi (20/20)" : `📝 Quiz final — meilleur score ${prog.bestScore}/20`);
        quizLink.onclick = () => startQuiz(unit.id);
        list.appendChild(quizLink);
      }
    });
    main.appendChild(list);
  });
  main.appendChild(el("div", "empty-space"));
}

/* ============================================================
   LEÇON / QUIZ
   ============================================================ */
function startLesson(unitId, difficulty) {
  if (Store.state.hearts <= 0) {
    showAlertModal("Tu n'as plus de cœurs ! Reviens plus tard ou révise ton vocabulaire en attendant.");
    return;
  }
  LESSON = { unitId, difficulty, isQuiz: false, exercises: UNIT_BY_ID[unitId].lessons[difficulty], index: 0, correctCount: 0, checked: false, controller: null };
  renderApp();
}
function startQuiz(unitId) {
  LESSON = { unitId, difficulty: null, isQuiz: true, exercises: shuffle(UNIT_BY_ID[unitId].quiz), index: 0, correctCount: 0, checked: false, controller: null };
  renderApp();
}

function heartsCheck() {
  if (!LESSON || LESSON.isQuiz) return false;
  if (Store.state.hearts <= 0) {
    LESSON = null;
    VIEW = "outofhearts";
    renderApp();
    return true;
  }
  return false;
}

function exerciseQuestionText(ex) {
  switch (ex.type) {
    case "qcm": return ex.q;
    case "listen": return ex.q;
    case "fill": return "Complète la phrase";
    case "conjugate": return "Conjugue le verbe";
    case "translate": return "Traduis la phrase";
    case "order": return "Remets la phrase dans l'ordre";
    case "match": return "Associe les paires";
    default: return "";
  }
}

function renderLessonScreen(main) {
  const L = LESSON;
  if (L.index >= L.exercises.length) { renderLessonEnd(main); return; }
  const ex = L.exercises[L.index];
  const pct = Math.round((L.index / L.exercises.length) * 100);
  if (L.progressFillEl) L.progressFillEl.style.width = pct + "%";

  main.appendChild(el("div", "exercise-title", exerciseQuestionText(ex)));
  const exContainer = el("div", "exercise-container");
  main.appendChild(exContainer);
  const spacer = el("div"); spacer.style.height = "110px";
  main.appendChild(spacer);

  L.checked = false;

  const hooks = {
    onChange: () => updateCheckBar(),
    onComplete: (allCorrectFirstTry) => {
      L.checked = true;
      if (allCorrectFirstTry) L.correctCount++;
      showResultBar(allCorrectFirstTry, "");
    },
    loseHeart: () => {
      Store.loseHeart();
      if (heartsCheck()) return;
      if (LESSON && LESSON.heartsEl) LESSON.heartsEl.textContent = "❤️ " + Store.state.hearts;
    },
  };
  L.controller = renderExercise(ex, exContainer, hooks);
  updateCheckBar();
}

function updateCheckBar() {
  const L = LESSON;
  if (!L) return;
  const footer = document.getElementById("lesson-footer");
  footer.innerHTML = "";
  if (L.controller && L.controller.isAutoChecking) return;

  const bar = el("div", "check-bar");
  const btn = el("button", "btn btn-primary btn-block", L.checked ? "Continuer" : "Vérifier");
  const ready = L.controller.getAnswer() !== null;
  btn.disabled = !L.checked && !ready;
  btn.onclick = () => {
    if (!L.checked) {
      const correct = L.controller.isCorrect();
      L.controller.lockUI();
      L.controller.markResult(correct);
      L.checked = true;
      if (correct) {
        L.correctCount++;
      } else {
        Store.loseHeart();
        if (heartsCheck()) return;
        if (LESSON.heartsEl) LESSON.heartsEl.textContent = "❤️ " + Store.state.hearts;
      }
      showResultBar(correct, L.controller.correctText());
    } else {
      advanceLesson();
    }
  };
  bar.appendChild(btn);
  footer.appendChild(bar);
}

function showResultBar(correct, correctText) {
  const footer = document.getElementById("lesson-footer");
  footer.innerHTML = "";
  const panel = el("div", "result-panel " + (correct ? "correct" : "wrong"));
  panel.appendChild(el("div", "r-title", correct ? "✅ Bonne réponse !" : "❌ Pas tout à fait"));
  if (!correct && correctText) {
    panel.appendChild(el("div", "r-sub", `Réponse correcte : ${correctText}`));
  }
  const btn = el("button", "btn btn-primary btn-block", "Continuer");
  btn.onclick = () => advanceLesson();
  panel.appendChild(btn);
  footer.appendChild(panel);
}

function advanceLesson() {
  if (!LESSON) return;
  LESSON.index++;
  document.getElementById("lesson-footer").innerHTML = "";
  renderApp();
}

function renderLessonEnd(main) {
  const L = LESSON;
  document.getElementById("lesson-footer").innerHTML = "";

  if (L.isQuiz) {
    const score = L.correctCount, total = L.exercises.length;
    const passed = Store.recordQuizScore(L.unitId, score, total);
    Store.touchStreak();
    if (passed) { Store.addXp(50); Store.addGems(20); } else { Store.addXp(score * 2); }

    const wrap = el("div", "end-screen");
    wrap.innerHTML = `<div class="emoji">${passed ? "🏆" : "📝"}</div>
      <h2>${passed ? "Quiz réussi !" : "Pas encore 20/20"}</h2>
      <div class="end-stats"><div><span class="num">${score}/${total}</span>Score</div></div>
      <p>${passed ? "Bravo, l'unité suivante est débloquée !" : "Il te faut 20/20 pour débloquer la suite. Retente le quiz !"}</p>`;
    main.appendChild(wrap);
    const btn = el("button", "btn btn-primary btn-block", passed ? "Continuer" : "Réessayer le quiz");
    btn.onclick = () => { if (passed) { LESSON = null; VIEW = "home"; renderApp(); } else { startQuiz(L.unitId); } };
    wrap.appendChild(btn);
    const btn2 = el("button", "btn btn-secondary btn-block", "Retour à l'accueil");
    btn2.style.marginTop = "10px";
    btn2.onclick = () => { LESSON = null; VIEW = "home"; renderApp(); };
    wrap.appendChild(btn2);
  } else {
    Store.markLessonDone(L.unitId, L.difficulty);
    const xpGained = L.correctCount * 10 + 20;
    Store.addXp(xpGained);
    Store.addGems(5);
    Store.touchStreak();

    const wrap = el("div", "end-screen");
    wrap.innerHTML = `<div class="emoji">🎉</div><h2>Leçon terminée !</h2>
      <div class="end-stats">
        <div><span class="num">${L.correctCount}/${L.exercises.length}</span>Correct</div>
        <div><span class="num">+${xpGained}</span>XP</div>
      </div>`;
    main.appendChild(wrap);
    const btn = el("button", "btn btn-primary btn-block", "Continuer");
    btn.onclick = () => { LESSON = null; VIEW = "home"; renderApp(); };
    wrap.appendChild(btn);
  }
}

/* ---------- Écran "plus de cœurs" ---------- */
function renderOutOfHeartsScreen(main) {
  const wrap = el("div", "end-screen");
  wrap.innerHTML = `<div class="emoji">💔</div><h2>Plus de cœurs !</h2>
    <p>Reviens plus tard (ils se rechargent avec le temps), ou révise ton vocabulaire en attendant — ça ne consomme pas de cœurs.</p>`;
  main.appendChild(wrap);
  const btn1 = el("button", "btn btn-primary btn-block", "Réviser le vocabulaire");
  btn1.onclick = () => { VIEW = "vocab"; renderApp(); };
  wrap.appendChild(btn1);
  const btn2 = el("button", "btn btn-secondary btn-block", "Retour à l'accueil");
  btn2.style.marginTop = "10px";
  btn2.onclick = () => { VIEW = "home"; renderApp(); };
  wrap.appendChild(btn2);
}

/* ============================================================
   VOCABULAIRE
   ============================================================ */
function renderVocabScreen(main) {
  if (vocabShowHistory) { renderVocabHistory(main); return; }
  if (vocabSector) { renderVocabSectorDetail(main); return; }

  main.appendChild(el("div", "section-title", `📖 Mes mots (${Store.totalLearnedCount()}/${VOCAB_WORDS.length})`));
  const search = el("input", "search-input");
  search.type = "text";
  search.placeholder = "Rechercher un mot (anglais ou français)...";
  search.value = vocabSearch;
  search.oninput = (e) => { vocabSearch = e.target.value; renderApp(); };
  main.appendChild(search);

  if (vocabSearch.trim()) {
    const q = vocabSearch.trim().toLowerCase();
    const results = VOCAB_WORDS.filter(w => w.en.toLowerCase().includes(q) || w.fr.toLowerCase().includes(q));
    renderWordList(main, results);
    return;
  }

  const historyLink = el("button", "back-link", "📅 Voir l'historique de mes mots du jour, jour par jour");
  historyLink.style.marginBottom = "12px";
  historyLink.onclick = () => { vocabShowHistory = true; renderApp(); };
  main.appendChild(historyLink);

  VOCAB_SECTORS.forEach(sector => {
    const words = VOCAB_WORDS.filter(w => w.sector === sector.id);
    const learnedCount = words.filter(w => Store.isLearned(w.id)).length;
    const card = el("div", "sector-card");
    card.innerHTML = `<div class="ic">${sector.icon}</div>
      <div class="info"><div class="t">${sector.name}</div><div class="d">${learnedCount}/${words.length} appris</div></div>
      <div>›</div>`;
    card.onclick = () => { vocabSector = sector.id; renderApp(); };
    main.appendChild(card);
  });
  main.appendChild(el("div", "empty-space"));
}

function renderVocabHistory(main) {
  const back = el("button", "back-link", "‹ Retour au vocabulaire");
  back.onclick = () => { vocabShowHistory = false; renderApp(); };
  main.appendChild(back);
  main.appendChild(el("div", "section-title", "📅 Historique des mots du jour"));
  main.appendChild(el("p", "hint-text", "Chaque jour, 5 nouveaux mots (jamais les mêmes) te sont proposés. Voici ce que tu as déjà reçu, du plus récent au plus ancien."));

  const dates = Object.keys(Store.state.vocab.dailyHistory).sort((a, b) => b.localeCompare(a));
  if (dates.length === 0) {
    main.appendChild(el("p", "hint-text", "Aucun mot du jour reçu pour l'instant. Reviens depuis l'accueil pour découvrir tes 5 premiers mots !"));
    main.appendChild(el("div", "empty-space"));
    return;
  }

  dates.forEach(date => {
    const ids = Store.state.vocab.dailyHistory[date];
    const words = ids.map(id => VOCAB_BY_ID[id]).filter(Boolean);
    const isToday = date === todayStr();
    main.appendChild(el("div", "section-title", `${isToday ? "☀️ Aujourd'hui" : "📆 " + date}`));
    renderWordList(main, words);
  });
  main.appendChild(el("div", "empty-space"));
}

function renderVocabSectorDetail(main) {
  const sector = VOCAB_SECTORS.find(s => s.id === vocabSector);
  const back = el("button", "back-link", "‹ Retour aux secteurs");
  back.onclick = () => { vocabSector = null; renderApp(); };
  main.appendChild(back);
  main.appendChild(el("div", "section-title", `${sector.icon} ${sector.name}`));
  renderWordList(main, VOCAB_WORDS.filter(w => w.sector === sector.id));
}

function renderWordList(main, words) {
  if (words.length === 0) {
    main.appendChild(el("p", "hint-text", "Aucun mot trouvé."));
    return;
  }
  words.forEach(w => {
    const item = el("div", "word-item");
    const learned = Store.isLearned(w.id);
    const flagged = !!Store.state.vocab.reviewFlags[w.id];
    const left = el("div", "");
    left.innerHTML = `<div class="en">${learned ? "" : "🔹 "}${w.en}</div><div class="fr">${w.fr}</div>`;
    item.appendChild(left);
    const right = el("div", "");
    right.style.display = "flex";
    right.style.gap = "6px";
    const speakBtn = el("button", "speak-btn", "🔊");
    speakBtn.onclick = () => speak(w.en);
    const flagBtn = el("button", "flag-btn", flagged ? "⭐" : "☆");
    flagBtn.onclick = () => { Store.toggleReviewFlag(w.id); renderApp(); };
    right.appendChild(speakBtn);
    right.appendChild(flagBtn);
    item.appendChild(right);
    main.appendChild(item);
  });
  main.appendChild(el("div", "empty-space"));
}

/* ---------- Modal mots du jour ---------- */
function openDailyWordsModal() {
  const already = Store.hasTodaysWords();
  const batch = already ? Store.getTodaysWords() : Store.generateTodaysWords();
  if (!already) Store.touchStreak();

  const overlay = el("div", "modal-overlay");
  const box = el("div", "modal-box");
  box.appendChild(el("h2", "", already ? "☀️ Tes mots du jour" : "🎉 5 nouveaux mots pour toi !"));
  box.appendChild(el("p", "hint-text", "Retrouve-les à tout moment dans la rubrique Vocabulaire."));
  batch.forEach(w => {
    const card = el("div", "daily-word-card");
    const left = el("div", "");
    left.innerHTML = `<div style="font-weight:800">${w.en}</div><div style="font-size:12px;color:var(--grey-text)">${w.fr}</div>`;
    const speakBtn = el("button", "speak-btn", "🔊");
    speakBtn.onclick = () => speak(w.en);
    card.appendChild(left);
    card.appendChild(speakBtn);
    box.appendChild(card);
  });
  const closeBtn = el("button", "btn btn-primary btn-block", "Compris !");
  closeBtn.style.marginTop = "14px";
  closeBtn.onclick = () => { overlay.remove(); renderApp(); };
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

/* ============================================================
   ÉCOUTE QUOTIDIENNE
   ============================================================ */
function levelLabel(l) { return l === "easy" ? "Facile" : l === "medium" ? "Intermédiaire" : "Difficile"; }
function suggestedListenLevel() {
  const passed = ALL_UNITS.filter(u => Store.getUnit(u.id).passed).length;
  if (passed >= 6) return "hard";
  if (passed >= 3) return "medium";
  return "easy";
}

function renderListenScreen(main) {
  if (!listenLevel) listenLevel = suggestedListenLevel();
  const doneToday = Store.hasListenedToday();

  main.appendChild(el("div", "section-title", "🎧 Écoute du jour"));
  if (doneToday) {
    const b = el("div", "daily-banner");
    b.innerHTML = `<div class="icon">✅</div><div class="txt"><div class="h">Écoute du jour terminée</div><div class="s">Tu peux en écouter un autre quand tu veux</div></div>`;
    main.appendChild(b);
  } else {
    main.appendChild(el("p", "hint-text", "Écoute un texte en anglais puis réponds aux questions pour vérifier ta compréhension."));
  }

  main.appendChild(el("div", "section-title", "Niveau"));
  const diffRow = el("div", "diff-row");
  diffRow.style.margin = "0 0 14px";
  [["easy", "Facile"], ["medium", "Intermédiaire"], ["hard", "Difficile"]].forEach(([key, label]) => {
    const chip = el("button", "diff-chip" + (listenLevel === key ? " done" : ""), label);
    chip.onclick = () => { listenLevel = key; renderApp(); };
    diffRow.appendChild(chip);
  });
  main.appendChild(diffRow);

  const startBtn = el("button", "btn btn-primary btn-block", doneToday ? "🔊 Écouter un autre audio" : "🔊 Commencer l'écoute du jour");
  startBtn.onclick = () => startListening(listenLevel);
  main.appendChild(startBtn);

  const hist = Store.state.listening.history.slice(-6).reverse();
  if (hist.length) {
    main.appendChild(el("div", "section-title", "📜 Historique récent"));
    hist.forEach(h => {
      const row = el("div", "word-item");
      row.innerHTML = `<div class="en">${h.date} — ${levelLabel(h.level)}</div><div class="fr">Compréhension : ${h.score}/${h.total}</div>`;
      main.appendChild(row);
    });
  }
  main.appendChild(el("div", "empty-space"));
}

function startListening(level) {
  const pool = LISTENING_PASSAGES[level];
  const recent = Store.state.listening.recentIds || [];
  let candidates = pool.filter(p => !recent.includes(p.id));
  if (candidates.length === 0) candidates = pool;
  const passage = candidates[Math.floor(Math.random() * candidates.length)];
  listenSession = { passage, phase: "listen", qIndex: 0, correctCount: 0, checked: false, controller: null };
  renderApp();
}

function renderListenSession(main) {
  const s = listenSession;

  if (s.phase === "listen") {
    main.appendChild(el("div", "exercise-title", `🎧 Niveau ${levelLabel(s.passage.level)} — Écoute attentivement`));
    const box = el("div", "ex-qcm");
    const playBtn = el("button", "btn-listen", "🔊");
    playBtn.onclick = () => speak(s.passage.text);
    box.appendChild(playBtn);
    box.appendChild(el("p", "hint-text", "Écoute autant de fois que nécessaire, puis passe aux questions."));
    main.appendChild(box);
    setTimeout(() => speak(s.passage.text), 300);

    const footer = document.getElementById("lesson-footer");
    footer.innerHTML = "";
    const bar = el("div", "check-bar");
    const btn = el("button", "btn btn-primary btn-block", "Répondre aux questions →");
    btn.onclick = () => { s.phase = "quiz"; s.qIndex = 0; s.correctCount = 0; renderApp(); };
    bar.appendChild(btn);
    footer.appendChild(bar);
    return;
  }

  if (s.phase === "quiz") {
    if (s.qIndex >= s.passage.questions.length) { s.phase = "end"; renderApp(); return; }
    const q = s.passage.questions[s.qIndex];
    s.checked = false;
    main.appendChild(el("div", "exercise-title", q.q));
    const container = el("div", "exercise-container");
    main.appendChild(container);
    const spacer = el("div"); spacer.style.height = "110px";
    main.appendChild(spacer);
    const ex = { type: "qcm", options: q.options, answer: q.answer };
    s.controller = renderExercise(ex, container, { onChange: () => updateListenCheckBar() });
    updateListenCheckBar();
    return;
  }

  if (s.phase === "end") {
    document.getElementById("lesson-footer").innerHTML = "";
    Store.recordListening(s.passage, s.correctCount, s.passage.questions.length);
    Store.touchStreak();
    Store.addXp(s.correctCount * 8 + 15);
    Store.addGems(8);
    const wrap = el("div", "end-screen");
    wrap.innerHTML = `<div class="emoji">🎧</div><h2>Écoute terminée !</h2>
      <div class="end-stats"><div><span class="num">${s.correctCount}/${s.passage.questions.length}</span>Compréhension</div></div>`;
    main.appendChild(wrap);
    const btn1 = el("button", "btn btn-primary btn-block", "Écouter un autre audio");
    btn1.onclick = () => { listenSession = null; startListening(listenLevel); };
    wrap.appendChild(btn1);
    const btn2 = el("button", "btn btn-secondary btn-block", "Retour");
    btn2.style.marginTop = "10px";
    btn2.onclick = () => { listenSession = null; VIEW = "listen"; renderApp(); };
    wrap.appendChild(btn2);
  }
}

function updateListenCheckBar() {
  const s = listenSession;
  if (!s) return;
  const footer = document.getElementById("lesson-footer");
  footer.innerHTML = "";
  const bar = el("div", "check-bar");
  const btn = el("button", "btn btn-primary btn-block", s.checked ? "Continuer" : "Vérifier");
  const ready = s.controller.getAnswer() !== null;
  btn.disabled = !s.checked && !ready;
  btn.onclick = () => {
    if (!s.checked) {
      const correct = s.controller.isCorrect();
      s.controller.lockUI();
      s.controller.markResult(correct);
      s.checked = true;
      if (correct) s.correctCount++;
      showListenResultBar(correct, s.controller.correctText());
    } else {
      s.qIndex++;
      document.getElementById("lesson-footer").innerHTML = "";
      renderApp();
    }
  };
  bar.appendChild(btn);
  footer.appendChild(bar);
}

function showListenResultBar(correct, correctText) {
  const footer = document.getElementById("lesson-footer");
  footer.innerHTML = "";
  const panel = el("div", "result-panel " + (correct ? "correct" : "wrong"));
  panel.appendChild(el("div", "r-title", correct ? "✅ Bonne réponse !" : "❌ Pas tout à fait"));
  if (!correct) panel.appendChild(el("div", "r-sub", `Réponse correcte : ${correctText}`));
  const btn = el("button", "btn btn-primary btn-block", "Continuer");
  btn.onclick = () => {
    listenSession.qIndex++;
    document.getElementById("lesson-footer").innerHTML = "";
    renderApp();
  };
  panel.appendChild(btn);
  footer.appendChild(panel);
}

/* ============================================================
   JEU D'ENTRAÎNEMENT (100 niveaux, sans attente ni cœurs)
   ============================================================ */
function renderGameScreen(main) {
  const unlocked = Store.getGameLevel();
  main.appendChild(el("div", "section-title", "🎮 Jeu d'entraînement"));

  const hero = el("div", "game-hero");
  hero.innerHTML = `<div class="g-title">Niveau ${unlocked} / ${GAME_TOTAL_LEVELS}</div>
    <div class="g-sub">Aucun cœur, aucune attente : enchaîne les niveaux à ton rythme pour progresser tout de suite. 6/8 bonnes réponses pour débloquer le niveau suivant.</div>`;
  const playBtn = el("button", "btn btn-primary btn-block", `▶️ Jouer le niveau ${unlocked}`);
  playBtn.onclick = () => startGameLevel(unlocked);
  hero.appendChild(playBtn);
  main.appendChild(hero);

  main.appendChild(el("div", "section-title", "Tous les niveaux"));
  const grid = el("div", "game-grid");
  for (let lvl = 1; lvl <= GAME_TOTAL_LEVELS; lvl++) {
    const done = lvl < unlocked;
    const isCurrent = lvl === unlocked;
    const locked = lvl > unlocked;
    const chip = el("button", "game-level-chip" + (done ? " done" : "") + (isCurrent ? " current" : "") + (locked ? " locked" : ""), done ? "✓" : String(lvl));
    if (locked) {
      chip.disabled = true;
    } else {
      chip.onclick = () => startGameLevel(lvl);
    }
    grid.appendChild(chip);
  }
  main.appendChild(grid);

  const hist = Store.state.game.history.slice(-6).reverse();
  if (hist.length) {
    main.appendChild(el("div", "section-title", "📜 Dernières parties"));
    hist.forEach(h => {
      const row = el("div", "word-item");
      row.innerHTML = `<div class="en">Niveau ${h.level}</div><div class="fr">${h.score}/${h.total} — ${h.date}</div>`;
      main.appendChild(row);
    });
  }
  main.appendChild(el("div", "empty-space"));
}

function startGameLevel(level) {
  const data = generateGameLevel(level);
  gameSession = { level, questions: data.questions, index: 0, correctCount: 0, checked: false, controller: null };
  renderApp();
}

function renderGameSession(main) {
  const s = gameSession;
  if (s.index >= s.questions.length) { renderGameEnd(main); return; }

  const q = s.questions[s.index];
  s.checked = false;
  main.appendChild(el("div", "exercise-title", q.title));
  const container = el("div", "exercise-container");
  main.appendChild(container);
  const spacer = el("div"); spacer.style.height = "110px";
  main.appendChild(spacer);

  s.controller = renderExercise(q.ex, container, { onChange: () => updateGameCheckBar() });
  updateGameCheckBar();
}

function updateGameCheckBar() {
  const s = gameSession;
  if (!s) return;
  const footer = document.getElementById("lesson-footer");
  footer.innerHTML = "";
  const bar = el("div", "check-bar");
  const btn = el("button", "btn btn-primary btn-block", s.checked ? "Continuer" : "Vérifier");
  const ready = s.controller.getAnswer() !== null;
  btn.disabled = !s.checked && !ready;
  btn.onclick = () => {
    if (!s.checked) {
      const correct = s.controller.isCorrect();
      s.controller.lockUI();
      s.controller.markResult(correct);
      s.checked = true;
      if (correct) s.correctCount++;
      showGameResultBar(correct, s.controller.correctText());
    } else {
      s.index++;
      document.getElementById("lesson-footer").innerHTML = "";
      renderApp();
    }
  };
  bar.appendChild(btn);
  footer.appendChild(bar);
}

function showGameResultBar(correct, correctText) {
  const footer = document.getElementById("lesson-footer");
  footer.innerHTML = "";
  const panel = el("div", "result-panel " + (correct ? "correct" : "wrong"));
  panel.appendChild(el("div", "r-title", correct ? "✅ Bonne réponse !" : "❌ Pas tout à fait"));
  if (!correct) panel.appendChild(el("div", "r-sub", `Réponse correcte : ${correctText}`));
  const btn = el("button", "btn btn-primary btn-block", "Continuer");
  btn.onclick = () => {
    gameSession.index++;
    document.getElementById("lesson-footer").innerHTML = "";
    renderApp();
  };
  panel.appendChild(btn);
  footer.appendChild(panel);
}

function renderGameEnd(main) {
  const s = gameSession;
  document.getElementById("lesson-footer").innerHTML = "";
  const total = s.questions.length;
  const passed = Store.recordGameResult(s.level, s.correctCount, total);
  Store.touchStreak();
  Store.addXp(s.correctCount * 5 + (passed ? 15 : 0));
  Store.addGems(passed ? 8 : 3);

  const wrap = el("div", "end-screen");
  wrap.innerHTML = `<div class="emoji">${passed ? "🎉" : "🔁"}</div>
    <h2>${passed ? "Niveau réussi !" : "Pas encore assez"}</h2>
    <div class="end-stats"><div><span class="num">${s.correctCount}/${total}</span>Score</div></div>
    <p>${passed ? `Le niveau ${s.level + 1} est débloqué !` : "Il te faut au moins 6/8 pour débloquer la suite. Retente, ça ne coûte rien !"}</p>`;
  main.appendChild(wrap);

  const level = s.level;
  if (passed && level < GAME_TOTAL_LEVELS) {
    const nextBtn = el("button", "btn btn-primary btn-block", `▶️ Niveau ${level + 1}`);
    nextBtn.onclick = () => { gameSession = null; startGameLevel(level + 1); };
    wrap.appendChild(nextBtn);
  } else {
    const retryBtn = el("button", "btn btn-primary btn-block", "🔁 Réessayer ce niveau");
    retryBtn.onclick = () => { gameSession = null; startGameLevel(level); };
    wrap.appendChild(retryBtn);
  }
  const backBtn = el("button", "btn btn-secondary btn-block", "Retour");
  backBtn.style.marginTop = "10px";
  backBtn.onclick = () => { gameSession = null; VIEW = "game"; renderApp(); };
  wrap.appendChild(backBtn);
}

/* ============================================================
   PROFIL
   ============================================================ */
function renderProfileScreen(main) {
  main.appendChild(el("div", "section-title", `${PROFILE_AVATARS[Store.activeProfile] || "👤"} ${Store.activeProfile}`));
  const grid = el("div", "profile-stats-grid");
  [
    [`🔥 ${Store.state.streak}`, "Jours de suite"],
    [`💎 ${Store.state.gems}`, "Gemmes"],
    [`⭐ ${Store.state.xp}`, "XP total"],
    [`📖 ${Store.totalLearnedCount()}/${VOCAB_WORDS.length}`, "Mots appris"],
  ].forEach(([v, l]) => {
    const card = el("div", "profile-stat");
    card.innerHTML = `<div class="v">${v}</div><div class="l">${l}</div>`;
    grid.appendChild(card);
  });
  main.appendChild(grid);

  const passedUnits = ALL_UNITS.filter(u => Store.getUnit(u.id).passed).length;
  main.appendChild(el("div", "section-title", `📚 Progression : ${passedUnits}/${ALL_UNITS.length} unités validées`));

  main.appendChild(el("div", "section-title", "🔔 Rappel quotidien 8h30"));
  renderNotifSection(main);

  const switchBtn = el("button", "btn btn-secondary btn-block", "🔄 Changer de profil");
  switchBtn.style.marginTop = "20px";
  switchBtn.onclick = () => { Store.clearActiveProfile(); VIEW = "home"; renderApp(); };
  main.appendChild(switchBtn);

  const resetBtn = el("button", "btn btn-danger btn-block", `Réinitialiser la progression de ${Store.activeProfile}`);
  resetBtn.style.marginTop = "12px";
  resetBtn.onclick = () => {
    showConfirmModal(`Es-tu sûr ? Toute la progression de ${Store.activeProfile} (XP, mots appris, unités) sera effacée.`, () => {
      localStorage.removeItem(profileStorageKey(Store.activeProfile));
      Store.state = loadState(profileStorageKey(Store.activeProfile));
      VIEW = "home";
      renderApp();
    });
  };
  main.appendChild(resetBtn);
  main.appendChild(el("div", "empty-space"));
}

/* ============================================================
   RAPPEL QUOTIDIEN 8H30 (Notification navigateur)
   ------------------------------------------------------------
   Limite honnête : ceci n'est PAS une vraie notification push
   mobile (qui nécessiterait un serveur). Ça fonctionne seulement
   si un onglet du navigateur reste ouvert (même en arrière-plan
   sur ordinateur). Sur mobile ou si l'onglet est fermé, rien ne
   se déclenche. Indisponible dans l'aperçu Artifact (iframe).
   ============================================================ */
const NOTIF_ENABLED_KEY = "learnme_notif_enabled";

function notifEnvUsable() {
  try {
    return "Notification" in window && window.self === window.top;
  } catch (e) {
    return false; // accès à window.top bloqué => on est dans un iframe cross-origin
  }
}
function isNotifEnabled() {
  return notifEnvUsable() && Notification.permission === "granted" && localStorage.getItem(NOTIF_ENABLED_KEY) === "1";
}
function enableDailyNotification() {
  if (!notifEnvUsable()) return;
  Notification.requestPermission().then(perm => {
    if (perm === "granted") {
      localStorage.setItem(NOTIF_ENABLED_KEY, "1");
    }
    renderApp();
  });
}
function disableDailyNotification() {
  localStorage.removeItem(NOTIF_ENABLED_KEY);
  renderApp();
}
function checkDailyNotification() {
  if (!isNotifEnabled()) return;
  const now = new Date();
  if (now.getHours() !== 8 || now.getMinutes() < 30 || now.getMinutes() >= 35) return;
  const sentKey = "learnme_notif_sent_" + todayStr();
  if (localStorage.getItem(sentKey)) return;
  if (!Store.ensureLoaded() || Store.hasTodaysWords()) return;
  localStorage.setItem(sentKey, "1");
  const notif = new Notification("Learn Me ☀️", {
    body: "5 nouveaux mots t'attendent aujourd'hui ! Viens les découvrir.",
  });
  notif.onclick = () => {
    window.focus();
    VIEW = "home";
    renderApp();
    openDailyWordsModal();
  };
}

function renderNotifSection(main) {
  if (!notifEnvUsable()) {
    main.appendChild(el("p", "hint-text", "Non disponible ici (aperçu intégré). Ouvre le fichier index.html directement dans un navigateur pour activer ce rappel."));
    return;
  }
  if (Notification.permission === "denied") {
    main.appendChild(el("p", "hint-text", "Notifications bloquées par le navigateur. Autorise-les dans les paramètres du site pour activer ce rappel."));
    return;
  }
  if (isNotifEnabled()) {
    main.appendChild(el("p", "hint-text", "Activé : si un onglet reste ouvert, une notification arrivera vers 8h30 s'il te reste des mots à découvrir. (Ne fonctionne pas si l'onglet est complètement fermé.)"));
    const btn = el("button", "btn btn-secondary btn-block", "🔕 Désactiver le rappel");
    btn.onclick = disableDailyNotification;
    main.appendChild(btn);
  } else {
    main.appendChild(el("p", "hint-text", "Reçois une notification vers 8h30 pour découvrir tes mots du jour (nécessite de garder un onglet ouvert)."));
    const btn = el("button", "btn btn-primary btn-block", "🔔 Activer le rappel");
    btn.onclick = enableDailyNotification;
    main.appendChild(btn);
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.onclick = () => {
      VIEW = btn.dataset.view;
      vocabSector = null;
      vocabSearch = "";
      vocabShowHistory = false;
      listenSession = null;
      gameSession = null;
      renderApp();
    };
  });
  renderApp();
  checkDailyNotification();
  setInterval(checkDailyNotification, 20000);
});
