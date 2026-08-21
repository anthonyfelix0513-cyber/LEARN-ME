/* ============================================================
   LEARN ME — Moteur d'exercices (rendu + correction)
   Types : qcm, fill, translate, order, conjugate, match, listen
   ============================================================ */

function normalizeText(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:"'’]/g, "")
    .replace(/\s+/g, " ");
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function textMatches(userInput, answer, alts = []) {
  const candidates = [answer, ...alts].map(normalizeText);
  const u = normalizeText(userInput);
  if (!u) return false;
  if (candidates.includes(u)) return true;
  return candidates.some(c => c.length >= 5 && levenshtein(u, c) <= 1);
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.92;
  window.speechSynthesis.speak(utter);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* Remplace confirm()/alert() natifs, bloqués dans certains
   environnements sandboxés (ex: iframe d'artefact). */
function showConfirmModal(message, onConfirm) {
  const overlay = el("div", "modal-overlay");
  const box = el("div", "modal-box");
  box.appendChild(el("p", "", message));
  const btnRow = el("div", "");
  btnRow.style.display = "flex";
  btnRow.style.gap = "10px";
  btnRow.style.marginTop = "14px";
  const cancelBtn = el("button", "btn btn-secondary", "Annuler");
  cancelBtn.style.flex = "1";
  cancelBtn.onclick = () => overlay.remove();
  const okBtn = el("button", "btn btn-danger", "Confirmer");
  okBtn.style.flex = "1";
  okBtn.onclick = () => { overlay.remove(); onConfirm(); };
  btnRow.appendChild(cancelBtn);
  btnRow.appendChild(okBtn);
  box.appendChild(btnRow);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}
function showAlertModal(message) {
  const overlay = el("div", "modal-overlay");
  const box = el("div", "modal-box");
  box.appendChild(el("p", "", message));
  const okBtn = el("button", "btn btn-primary btn-block", "OK");
  okBtn.style.marginTop = "14px";
  okBtn.onclick = () => overlay.remove();
  box.appendChild(okBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

/* ---------- QCM (choix multiple), aussi utilisé par "listen" ---------- */
function renderQCM(ex, container, hooks) {
  const wrap = el("div", "ex-qcm");
  if (ex.type === "listen") {
    const playBtn = el("button", "btn-listen", "🔊 Écouter");
    playBtn.onclick = () => speak(ex.text);
    wrap.appendChild(playBtn);
    setTimeout(() => speak(ex.text), 300);
  }
  const optWrap = el("div", "options-grid");
  let selected = null;
  const buttons = ex.options.map((opt, i) => {
    const b = el("button", "option-btn", opt);
    b.onclick = () => {
      buttons.forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      selected = i;
      hooks.onChange();
    };
    optWrap.appendChild(b);
    return b;
  });
  wrap.appendChild(optWrap);
  container.appendChild(wrap);

  return {
    getAnswer: () => selected,
    isCorrect: () => selected === ex.answer,
    correctText: () => ex.options[ex.answer],
    lockUI: () => buttons.forEach(b => (b.disabled = true)),
    markResult: (correct) => {
      buttons[ex.answer].classList.add("correct");
      if (!correct && selected !== null) buttons[selected].classList.add("wrong");
    },
  };
}

/* ---------- Texte à trous / Conjugaison (même mécanique) ---------- */
function renderFillLike(ex, container, hooks) {
  const wrap = el("div", "ex-fill");
  const parts = ex.text.split("___");
  const p = el("p", "fill-sentence");
  p.appendChild(document.createTextNode(parts[0]));
  const input = el("input", "fill-input");
  input.type = "text";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = "...";
  input.oninput = hooks.onChange;
  p.appendChild(input);
  p.appendChild(document.createTextNode(parts[1] || ""));
  wrap.appendChild(p);
  if (ex.hint) wrap.appendChild(el("p", "hint-text", `💡 ${ex.hint}`));
  container.appendChild(wrap);
  setTimeout(() => input.focus(), 50);

  return {
    getAnswer: () => (input.value.trim() ? input.value.trim() : null),
    isCorrect: () => textMatches(input.value, ex.answer, ex.alts || []),
    correctText: () => ex.answer,
    lockUI: () => (input.disabled = true),
    markResult: (correct) => input.classList.add(correct ? "correct" : "wrong"),
  };
}

/* ---------- Traduction libre ---------- */
function renderTranslate(ex, container, hooks) {
  const wrap = el("div", "ex-translate");
  wrap.appendChild(el("p", "translate-prompt", ex.prompt));
  const input = el("input", "fill-input full");
  input.type = "text";
  input.autocomplete = "off";
  input.placeholder = "Écris ta traduction...";
  input.oninput = hooks.onChange;
  wrap.appendChild(input);
  container.appendChild(wrap);
  setTimeout(() => input.focus(), 50);

  return {
    getAnswer: () => (input.value.trim() ? input.value.trim() : null),
    isCorrect: () => textMatches(input.value, ex.answer, ex.alts || []),
    correctText: () => ex.answer,
    lockUI: () => (input.disabled = true),
    markResult: (correct) => input.classList.add(correct ? "correct" : "wrong"),
  };
}

/* ---------- Remise en ordre (tap word bank) ---------- */
function renderOrder(ex, container, hooks) {
  const wrap = el("div", "ex-order");
  const buildZone = el("div", "build-zone");
  const bankZone = el("div", "bank-zone");
  wrap.appendChild(buildZone);
  wrap.appendChild(bankZone);
  container.appendChild(wrap);

  const built = [];
  const shuffled = shuffle(ex.words.map((w, i) => ({ w, key: i })));

  function renderBank() {
    bankZone.innerHTML = "";
    shuffled.forEach(item => {
      if (built.some(b => b.key === item.key)) return;
      const chip = el("button", "word-chip", item.w);
      chip.onclick = () => {
        built.push(item);
        renderAll();
      };
      bankZone.appendChild(chip);
    });
  }
  function renderBuild() {
    buildZone.innerHTML = "";
    if (built.length === 0) {
      buildZone.appendChild(el("span", "build-placeholder", "Touche les mots pour construire la phrase"));
      return;
    }
    built.forEach((item, idx) => {
      const chip = el("button", "word-chip placed", item.w);
      chip.onclick = () => {
        built.splice(idx, 1);
        renderAll();
      };
      buildZone.appendChild(chip);
    });
  }
  function renderAll() {
    renderBuild();
    renderBank();
    hooks.onChange();
  }
  renderAll();

  return {
    getAnswer: () => (built.length ? built.map(b => b.w).join(" ") : null),
    isCorrect: () => built.map(b => b.w).join(" ") === ex.answer.join(" "),
    correctText: () => ex.answer.join(" "),
    lockUI: () => {
      bankZone.querySelectorAll("button").forEach(b => (b.disabled = true));
      buildZone.querySelectorAll("button").forEach(b => (b.disabled = true));
    },
    markResult: (correct) => wrap.classList.add(correct ? "correct" : "wrong"),
  };
}

/* ---------- Associer les paires (vocabulaire) — auto-validé ---------- */
function renderMatch(ex, container, hooks) {
  const words = ex.wordIds
    ? ex.wordIds.map(id => VOCAB_BY_ID[id]).filter(Boolean)
    : (ex.pairs || []).map(([en, fr], i) => ({ id: `p${i}`, en, fr }));
  const wrap = el("div", "ex-match");
  const cols = el("div", "match-cols");
  const leftCol = el("div", "match-col");
  const rightCol = el("div", "match-col");
  cols.appendChild(leftCol);
  cols.appendChild(rightCol);
  wrap.appendChild(el("p", "hint-text", "Associe chaque mot anglais à sa traduction."));
  wrap.appendChild(cols);
  container.appendChild(wrap);

  const leftItems = shuffle(words.map(w => ({ id: w.id, text: w.en })));
  const rightItems = shuffle(words.map(w => ({ id: w.id, text: w.fr })));
  let selectedLeft = null;
  let matchedCount = 0;
  let mistakes = 0;

  function makeBtn(item, col) {
    const b = el("button", "match-item", item.text);
    b.dataset.id = item.id;
    b.onclick = () => {
      if (b.classList.contains("matched")) return;
      if (col === "left") {
        leftCol.querySelectorAll(".match-item").forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
        selectedLeft = b;
      } else {
        if (!selectedLeft) return;
        if (selectedLeft.dataset.id === b.dataset.id) {
          selectedLeft.classList.add("matched");
          b.classList.add("matched");
          selectedLeft.classList.remove("selected");
          selectedLeft = null;
          matchedCount++;
          if (matchedCount === words.length) {
            hooks.onComplete(mistakes === 0);
          }
        } else {
          mistakes++;
          hooks.loseHeart();
          b.classList.add("wrong-flash");
          selectedLeft.classList.add("wrong-flash");
          setTimeout(() => {
            b.classList.remove("wrong-flash");
            selectedLeft && selectedLeft.classList.remove("wrong-flash", "selected");
            selectedLeft = null;
          }, 400);
        }
      }
    };
    return b;
  }
  leftItems.forEach(it => leftCol.appendChild(makeBtn(it, "left")));
  rightItems.forEach(it => rightCol.appendChild(makeBtn(it, "right")));

  return { isAutoChecking: true };
}

/* ---------- Dispatch ---------- */
function renderExercise(ex, container, hooks) {
  container.innerHTML = "";
  switch (ex.type) {
    case "qcm":
    case "listen":
      return renderQCM(ex, container, hooks);
    case "fill":
    case "conjugate":
      return renderFillLike(ex, container, hooks);
    case "translate":
      return renderTranslate(ex, container, hooks);
    case "order":
      return renderOrder(ex, container, hooks);
    case "match":
      return renderMatch(ex, container, hooks);
    default:
      container.appendChild(el("p", "", `Type d'exercice inconnu : ${ex.type}`));
      return { getAnswer: () => "x", isCorrect: () => true, correctText: () => "" };
  }
}
