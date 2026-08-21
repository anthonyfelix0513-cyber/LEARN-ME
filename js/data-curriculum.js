/* ============================================================
   LEARN ME — Programme pédagogique (chapitres, unités, exercices)
   Premier lot : Chapitre 1 (Les Bases, 4 unités) + Chapitre 2
   (Vie Quotidienne, unité 1). D'autres unités et chapitres
   viendront enrichir ce programme au fil des mises à jour.
   ============================================================ */

/* ---------- Fabriques d'exercices (raccourcis d'écriture) ---------- */
function qcm(q, options, answer, hint) { return { type: "qcm", q, options, answer, hint }; }
function fillEx(text, answer, alts = [], hint) { return { type: "fill", text, answer, alts, hint }; }
function conjEx(text, answer, alts = [], hint) { return { type: "conjugate", text, answer, alts, hint }; }
function trEx(prompt, answer, alts = []) { return { type: "translate", prompt, answer, alts }; }
function ordEx(words) { return { type: "order", words, answer: words }; }
function lisEx(text, q, options, answer) { return { type: "listen", text, q, options, answer }; }
function matchVocab(ids) { return { type: "match", wordIds: ids }; }
function matchPairs(pairs) { return { type: "match", pairs }; }
function ids(prefix, nums) { return nums.map(n => `${prefix}-${String(n).padStart(2, "0")}`); }

/* ============================================================
   CHAPITRE 1 — LES BASES
   ============================================================ */

const u_ch1_1 = {
  id: "ch1-u1", chapterId: "ch1", title: "Se présenter", icon: "👋",
  desc: "Le verbe to be, les pronoms, les salutations",
  lessons: {
    easy: [
      qcm("Comment dit-on « Bonjour » ?", ["Hello", "Goodbye", "Please", "Sorry"], 0),
      qcm("Choisis la bonne traduction de « Merci »", ["Sorry", "Thank you", "Please", "Yes"], 1),
      fillEx("I ___ a student.", "am", [], "verbe to be avec I"),
      fillEx("She ___ happy.", "is"),
      qcm("Quel pronom utilise-t-on pour parler de soi-même ?", ["You", "I", "He", "They"], 1),
      matchVocab(ids("quo", [1, 2, 3, 4, 5, 6])),
    ],
    medium: [
      fillEx("They ___ friends.", "are"),
      fillEx("We ___ from France.", "are"),
      qcm("Choisis l'article correct : ___ apple", ["a", "an", "the", "—"], 1),
      qcm("Choisis l'article correct : ___ book", ["a", "an", "the", "—"], 0),
      ordEx(["I", "am", "a", "teacher", "."]),
      trEx("Traduis : Je suis désolé.", "I am sorry", ["I'm sorry"]),
      lisEx("Excuse me", "Qu'as-tu entendu ?", ["Excuse me", "Thank you", "Goodbye", "Please"], 0),
    ],
    hard: [
      fillEx("He ___ not a doctor.", "is", [], "to be négatif : is + not"),
      trEx("Traduis : Nous sommes amis.", "We are friends", ["We're friends"]),
      ordEx(["She", "is", "not", "tired", "."]),
      qcm("Quelle est la forme correcte ?", ["I is", "I am", "I are", "I be"], 1),
      fillEx("___ you a doctor?", "Are", [], "question avec to be : majuscule en début de phrase"),
      trEx("Traduis : Excusez-moi, où êtes-vous ?", "Excuse me, where are you", ["Excuse me where are you"]),
      lisEx("I am a student", "Qu'as-tu entendu ?", ["I am a student", "I am a teacher", "She is a student", "I am not a student"], 0),
    ],
  },
  quiz: [
    qcm("« Bonjour » se traduit par...", ["Hello", "Sorry", "Please", "Goodbye"], 0),
    qcm("« Merci » se traduit par...", ["Sorry", "Please", "Thank you", "Yes"], 2),
    qcm("« Au revoir » se traduit par...", ["Hello", "Goodbye", "Excuse me", "No"], 1),
    fillEx("I ___ happy.", "am"),
    fillEx("You ___ tall.", "are"),
    fillEx("He ___ tired.", "is"),
    fillEx("We ___ students.", "are"),
    fillEx("They ___ friends.", "are"),
    fillEx("She ___ a doctor.", "is"),
    qcm("___ apple", ["a", "an", "the", "—"], 1),
    qcm("___ car", ["a", "an", "the", "—"], 0),
    ordEx(["I", "am", "not", "sad", "."]),
    ordEx(["Are", "you", "ready", "?"]),
    trEx("Traduis : Je suis fatigué.", "I am tired", ["I'm tired"]),
    trEx("Traduis : Elle est professeure.", "She is a teacher", ["She's a teacher"]),
    trEx("Traduis : Nous ne sommes pas prêts.", "We are not ready", ["We're not ready", "We aren't ready"]),
    qcm("Comment dit-on « nous » ?", ["We", "You", "They", "He"], 0),
    qcm("Quelle phrase est correcte ?", ["She am happy", "She is happy", "She are happy", "She be happy"], 1),
    fillEx("___ they ready?", "Are"),
    lisEx("Thank you very much", "Qu'as-tu entendu ?", ["Thank you very much", "Thank you so much", "Excuse me please", "Sorry very much"], 0),
  ],
};

const u_ch1_2 = {
  id: "ch1-u2", chapterId: "ch1", title: "Nombres, heure et couleurs", icon: "🔢",
  desc: "Compter, dire l'heure, nommer les couleurs",
  lessons: {
    easy: [
      qcm("Comment dit-on « 3 » ?", ["Two", "Three", "Four", "Five"], 1),
      qcm("Comment dit-on « 7 » ?", ["Six", "Seven", "Eight", "Nine"], 1),
      qcm("Quelle est la couleur du ciel ?", ["Red", "Blue", "Green", "Black"], 1),
      fillEx("I have ___ apples. (5)", "five"),
      qcm("« Rouge » se traduit par...", ["Blue", "Red", "Yellow", "White"], 1),
      matchPairs([["one", "un"], ["two", "deux"], ["three", "trois"], ["four", "quatre"], ["five", "cinq"], ["red", "rouge"]]),
    ],
    medium: [
      fillEx("There are ___ days in a week. (7)", "seven"),
      qcm("« It's three ___. » (heure pile)", ["hour", "o'clock", "time", "clock"], 1),
      fillEx("My favorite color is ___. (bleu)", "blue"),
      qcm("Comment demande-t-on l'heure ?", ["What time is it?", "What is your name?", "How old are you?", "Where are you?"], 0),
      ordEx(["The", "car", "is", "black", "."]),
      trEx("Traduis : J'ai dix ans.", "I am ten years old", ["I'm ten years old"]),
      lisEx("It's ten o'clock", "Qu'as-tu entendu ?", ["It's ten o'clock", "It's two o'clock", "It's ten past two", "It's not late"], 0),
    ],
    hard: [
      fillEx("It's half ___ six.", "past", [], "'half past' = et demie"),
      trEx("Traduis : Il est trois heures et quart.", "It's a quarter past three", ["It is a quarter past three"]),
      ordEx(["What", "color", "is", "it", "?"]),
      qcm("« Quatorze » se traduit par...", ["Forty", "Fourteen", "Four", "Fourteenth"], 1),
      fillEx("The train leaves at nine ___.", "o'clock"),
      trEx("Traduis : Quelle heure est-il ? Il est midi.", "What time is it? It's twelve o'clock", ["What time is it? It is noon", "What time is it? It's noon"]),
      lisEx("It's a quarter to five", "Qu'as-tu entendu ?", ["It's a quarter to five", "It's a quarter past five", "It's five o'clock", "It's half past five"], 0),
    ],
  },
  quiz: [
    qcm("Comment dit-on « 1 » ?", ["One", "Two", "Three", "Ten"], 0),
    qcm("Comment dit-on « 2 » ?", ["Two", "Twelve", "Twenty", "Second"], 0),
    qcm("Comment dit-on « 5 » ?", ["Five", "Fifteen", "Fifty", "Four"], 0),
    qcm("Comment dit-on « 9 » ?", ["Nineteen", "Ninety", "Nine", "Ten"], 2),
    qcm("Comment dit-on « 12 » ?", ["Two", "Twelve", "Twenty", "Twelfth"], 1),
    fillEx("There are ___ months in a year. (12)", "twelve"),
    fillEx("A week has ___ days. (7)", "seven"),
    qcm("« Vert » se dit...", ["Green", "Grey", "Yellow", "Blue"], 0),
    qcm("« Noir » se dit...", ["White", "Black", "Brown", "Orange"], 1),
    fillEx("My car is ___. (blanche)", "white"),
    qcm("Comment demande-t-on l'heure ?", ["What time is it?", "What day is it?", "How much is it?", "Where is it?"], 0),
    fillEx("It's three ___.", "o'clock"),
    trEx("Traduis : Il est six heures.", "It's six o'clock", ["It is six o'clock"]),
    trEx("Traduis : Il est midi.", "It's twelve o'clock", ["It's noon", "It is noon"]),
    ordEx(["It", "is", "seven", "o'clock", "."]),
    ordEx(["The", "sky", "is", "blue", "."]),
    qcm("Quelle est la couleur d'une banane mûre ?", ["Purple", "Yellow", "Blue", "Grey"], 1),
    fillEx("It's half ___ four.", "past"),
    lisEx("It's eight o'clock", "Qu'as-tu entendu ?", ["It's eight o'clock", "It's eight thirty", "It's eighteen o'clock", "It's not late"], 0),
    qcm("Quelle phrase dit correctement « il est 15h » ?", ["It's three o'clock", "It's fifteen clock", "It's three hours", "It's the three"], 0),
  ],
};

const u_ch1_3 = {
  id: "ch1-u3", chapterId: "ch1", title: "La famille", icon: "👪",
  desc: "have/has, les adjectifs possessifs",
  lessons: {
    easy: [
      qcm("Comment dit-on « mère » ?", ["Father", "Mother", "Sister", "Brother"], 1),
      qcm("Comment dit-on « frère » ?", ["Brother", "Sister", "Son", "Cousin"], 0),
      fillEx("I ___ two brothers.", "have"),
      fillEx("She ___ one sister.", "has"),
      qcm("« Ma mère » se traduit par...", ["My mother", "Your mother", "His mother", "Their mother"], 0),
      matchVocab(ids("fam", [1, 2, 3, 4, 5, 6])),
    ],
    medium: [
      fillEx("He ___ a big family.", "has"),
      fillEx("This is ___ house. (notre)", "our"),
      qcm("« Leur fille » se traduit par...", ["Their daughter", "Our daughter", "Her daughter", "My daughter"], 0),
      ordEx(["My", "sister", "has", "a", "dog", "."]),
      trEx("Traduis : Mon père a un frère.", "My father has a brother"),
      qcm("Choisis la forme correcte : « They ___ three children. »", ["has", "have", "is", "are"], 1),
      lisEx("This is my grandmother", "Qu'as-tu entendu ?", ["This is my grandmother", "This is my grandfather", "This is her grandmother", "This is my mother"], 0),
    ],
    hard: [
      fillEx("___ this your cousin?", "Is"),
      trEx("Traduis : C'est la maison de mon oncle.", "This is my uncle's house"),
      ordEx(["Her", "husband", "works", "in", "Paris", "."]),
      qcm("Quelle phrase utilise correctement le génitif ?", ["The car of John", "John's car", "John car's", "Johns car"], 1),
      fillEx("My parents ___ two cars.", "have"),
      trEx("Traduis : Nos voisins sont gentils.", "Our neighbors are kind", ["Our neighbours are kind"]),
      qcm("« Sa tante » (à elle) se traduit par...", ["His aunt", "Her aunt", "Their aunt", "Its aunt"], 1),
    ],
  },
  quiz: [
    qcm("« Mère » se traduit par...", ["Father", "Mother", "Son", "Uncle"], 1),
    qcm("« Père » se traduit par...", ["Father", "Mother", "Aunt", "Wife"], 0),
    qcm("« Sœur » se traduit par...", ["Brother", "Sister", "Cousin", "Friend"], 1),
    qcm("« Frère » se traduit par...", ["Sister", "Brother", "Son", "Husband"], 1),
    qcm("« Mari » se traduit par...", ["Husband", "Wife", "Son", "Father"], 0),
    fillEx("I ___ a brother.", "have"),
    fillEx("She ___ a daughter.", "has"),
    fillEx("They ___ two children.", "have"),
    fillEx("He ___ a big family.", "has"),
    qcm("« Ma famille » se traduit par...", ["My family", "Your family", "Their family", "Her family"], 0),
    qcm("« Notre maison » se traduit par...", ["Our house", "His house", "My house", "Its house"], 0),
    qcm("« Leur fils » se traduit par...", ["Their son", "Our son", "Her son", "My son"], 0),
    ordEx(["This", "is", "my", "brother", "."]),
    ordEx(["My", "mother", "has", "a", "car", "."]),
    trEx("Traduis : J'ai une sœur et un frère.", "I have a sister and a brother"),
    trEx("Traduis : Elle a deux enfants.", "She has two children"),
    trEx("Traduis : C'est la voiture de ma sœur.", "This is my sister's car"),
    qcm("Génitif correct :", ["The dog of Anna", "Anna's dog", "Anna dog's", "Annas dog"], 1),
    fillEx("___ you have a pet?", "Do"),
    lisEx("I have a big family", "Qu'as-tu entendu ?", ["I have a big family", "I have a small family", "She has a big family", "I have a big house"], 0),
  ],
};

const u_ch1_4 = {
  id: "ch1-u4", chapterId: "ch1", title: "Le présent simple", icon: "⏰",
  desc: "Routine quotidienne, fréquence, forme -s",
  lessons: {
    easy: [
      qcm("Conjugue : « She (work) in Paris. »", ["work", "works", "working", "to work"], 1),
      qcm("Conjugue : « I (play) football. »", ["play", "plays", "played", "playing"], 0),
      fillEx("He ___ (wake up) at 7am.", "wakes up"),
      fillEx("They ___ (like) pizza.", "like"),
      qcm("« Toujours » se traduit par...", ["Never", "Often", "Always", "Sometimes"], 2),
      matchPairs([["always", "toujours"], ["often", "souvent"], ["sometimes", "parfois"], ["never", "jamais"], ["usually", "habituellement"], ["every day", "tous les jours"]]),
    ],
    medium: [
      fillEx("She ___ (not/like) coffee.", "does not like", ["doesn't like"]),
      qcm("Question correcte :", ["Does she works?", "Does she work?", "Do she work?", "Is she work?"], 1),
      ordEx(["I", "usually", "wake", "up", "at", "seven", "."]),
      trEx("Traduis : Il va au travail tous les jours.", "He goes to work every day"),
      fillEx("___ you like tea?", "Do"),
      qcm("Comment dit-on « jamais » ?", ["Always", "Often", "Never", "Sometimes"], 2),
      lisEx("She always wakes up early", "Qu'as-tu entendu ?", ["She always wakes up early", "She never wakes up early", "She sometimes wakes up early", "She wakes up late"], 0),
    ],
    hard: [
      fillEx("He ___ (not/go) to school on Sunday.", "does not go", ["doesn't go"]),
      trEx("Traduis : Nous ne travaillons jamais le dimanche.", "We never work on Sunday", ["We never work on Sundays"]),
      ordEx(["Does", "she", "like", "coffee", "?"]),
      qcm("Quelle phrase est correcte ?", ["She don't like tea", "She doesn't likes tea", "She doesn't like tea", "She not like tea"], 2),
      fillEx("What time ___ you get up?", "do"),
      trEx("Traduis : Il se lève toujours tôt.", "He always gets up early"),
      qcm("« Habituellement » se traduit par...", ["Usually", "Rarely", "Always", "Never"], 0),
    ],
  },
  quiz: [
    qcm("« She (go) »", ["go", "goes", "going", "went"], 1),
    qcm("« I (have) breakfast »", ["have", "has", "having", "had"], 0),
    qcm("« He (study) English »", ["study", "studys", "studies", "studying"], 2),
    fillEx("They ___ (live) in London.", "live"),
    fillEx("My father ___ (work) every day.", "works"),
    fillEx("___ you like music?", "Do"),
    fillEx("___ she like music?", "Does"),
    qcm("Négation correcte : « I ___ like fish. »", ["don't", "doesn't", "not", "no"], 0),
    qcm("Négation correcte : « He ___ like fish. »", ["don't", "doesn't", "not", "no"], 1),
    qcm("« Souvent » se traduit par...", ["Never", "Often", "Always", "Rarely"], 1),
    qcm("« Parfois » se traduit par...", ["Sometimes", "Always", "Never", "Usually"], 0),
    ordEx(["I", "always", "drink", "coffee", "."]),
    ordEx(["She", "never", "eats", "meat", "."]),
    ordEx(["Do", "you", "speak", "English", "?"]),
    trEx("Traduis : Je me lève à sept heures.", "I get up at seven o'clock", ["I wake up at seven o'clock"]),
    trEx("Traduis : Elle ne mange jamais de viande.", "She never eats meat"),
    trEx("Traduis : Ils vont au travail en voiture.", "They go to work by car"),
    qcm("Question correcte :", ["Does they work?", "Do they work?", "Do they works?", "Does they works?"], 1),
    fillEx("He usually ___ (finish) at six.", "finishes"),
    lisEx("I never drink coffee", "Qu'as-tu entendu ?", ["I never drink coffee", "I always drink coffee", "I never drink tea", "She never drinks coffee"], 0),
  ],
};

/* ============================================================
   CHAPITRE 2 — VIE QUOTIDIENNE
   ============================================================ */

const u_ch2_1 = {
  id: "ch2-u1", chapterId: "ch2", title: "Nourriture & restaurant", icon: "🍽️",
  desc: "Commander, some/any, there is/are",
  lessons: {
    easy: [
      qcm("Comment dit-on « petit-déjeuner » ?", ["Breakfast", "Lunch", "Dinner", "Snack"], 0),
      qcm("Comment dit-on « eau » ?", ["Water", "Wine", "Bread", "Tea"], 0),
      fillEx("I am hungry, I want some ___. (pain)", "bread"),
      qcm("« Délicieux » se traduit par...", ["Disgusting", "Delicious", "Expensive", "Cheap"], 1),
      fillEx("Can I have the ___, please? (addition)", "bill"),
      matchVocab(ids("nou", [1, 2, 3, 4, 5, 6])),
    ],
    medium: [
      qcm("Pour commander poliment on dit :", ["I want a coffee", "I'd like a coffee, please", "Give me a coffee", "Coffee now"], 1),
      fillEx("There ___ some apples on the table.", "are"),
      fillEx("There ___ some water in the glass.", "is"),
      qcm("« How ___ apples do you want? »", ["much", "many", "some", "any"], 1),
      qcm("« How ___ water do you want? »", ["much", "many", "some", "any"], 0),
      ordEx(["I", "would", "like", "a", "tea", "."]),
      lisEx("I'd like the bill, please", "Qu'as-tu entendu ?", ["I'd like the bill, please", "I'd like a coffee, please", "Can I have water, please", "I'd like some bread"], 0),
    ],
    hard: [
      trEx("Traduis : Je voudrais une table pour deux, s'il vous plaît.", "I would like a table for two, please", ["I'd like a table for two, please"]),
      fillEx("Is there ___ bread left?", "any"),
      ordEx(["Could", "I", "have", "the", "menu", "please", "?"]),
      qcm("Quelle phrase est correcte au restaurant ?", ["I have hungry", "I am hungry", "I hungry", "I do hungry"], 1),
      trEx("Traduis : Ce plat a un goût délicieux.", "This dish tastes delicious", ["This dish has a delicious taste"]),
      fillEx("We don't have ___ vegetables today.", "any"),
      qcm("« L'addition, s'il vous plaît » se traduit par...", ["The menu, please", "The bill, please", "The water, please", "The recipe, please"], 1),
    ],
  },
  quiz: [
    qcm("« Petit-déjeuner » se traduit par...", ["Breakfast", "Lunch", "Dinner", "Bread"], 0),
    qcm("« Déjeuner » se traduit par...", ["Breakfast", "Lunch", "Dinner", "Menu"], 1),
    qcm("« Dîner » se traduit par...", ["Breakfast", "Lunch", "Dinner", "Waiter"], 2),
    qcm("« Serveur » se traduit par...", ["Waiter", "Menu", "Bill", "Recipe"], 0),
    qcm("« Menu » se traduit par...", ["Bill", "Menu", "Recipe", "Taste"], 1),
    fillEx("I am thirsty, I want some ___. (eau)", "water"),
    fillEx("Can I have the ___, please? (addition)", "bill"),
    qcm("Commander poliment :", ["Give me tea", "I'd like some tea, please", "Tea now", "I want tea now"], 1),
    fillEx("There ___ some bread on the table.", "is"),
    fillEx("There ___ some vegetables in the fridge.", "are"),
    qcm("« How ___ coffee do you drink? »", ["much", "many", "some", "any"], 0),
    qcm("« How ___ apples are there? »", ["much", "many", "some", "any"], 1),
    ordEx(["I", "would", "like", "some", "water", "."]),
    ordEx(["Can", "I", "have", "the", "menu", "?"]),
    trEx("Traduis : Je voudrais un café, s'il vous plaît.", "I would like a coffee, please", ["I'd like a coffee, please"]),
    trEx("Traduis : Ce restaurant est délicieux.", "This restaurant is delicious"),
    trEx("Traduis : Je n'ai pas de pain.", "I don't have any bread"),
    qcm("« Affamé » se traduit par...", ["Hungry", "Thirsty", "Tired", "Delicious"], 0),
    qcm("« Assoiffé » se traduit par...", ["Hungry", "Thirsty", "Tired", "Full"], 1),
    lisEx("I'd like a table for two", "Qu'as-tu entendu ?", ["I'd like a table for two", "I'd like a table for four", "I'd like the bill now", "I'd like some water"], 0),
  ],
};

const u_ch2_2 = {
  id: "ch2-u2", chapterId: "ch2", title: "Demande ton chemin", icon: "🧭",
  desc: "Directions, impératif, prépositions de lieu",
  lessons: {
    easy: [
      qcm("Comment demande-t-on son chemin poliment ?", ["Where the station?", "Excuse me, where is the station?", "Station where?", "Give me station"], 1),
      qcm("« Tourne à gauche » se traduit par...", ["Turn left", "Turn right", "Go straight", "Stop here"], 0),
      fillEx("Go ___. (tout droit)", "straight"),
      qcm("« À droite » se traduit par...", ["Left", "Right", "Straight", "Behind"], 1),
      fillEx("Turn ___ at the corner. (à gauche)", "left"),
      matchPairs([["left", "gauche"], ["right", "droite"], ["straight ahead", "tout droit"], ["street", "rue"], ["map", "carte"], ["corner", "coin"]]),
    ],
    medium: [
      qcm("« à côté de » se traduit par...", ["Next to", "Behind", "Between", "In front of"], 0),
      qcm("« en face de » se traduit par...", ["Next to", "Behind", "In front of", "Between"], 2),
      fillEx("The bank is ___ the post office and the school. (entre)", "between"),
      ordEx(["Excuse", "me", "how", "do", "I", "get", "to", "the", "station", "?"]),
      trEx("Traduis : Où est la pharmacie la plus proche ?", "Where is the nearest pharmacy", ["Where's the nearest pharmacy"]),
      qcm("Quelle préposition pour « derrière » ?", ["Behind", "In front of", "Next to", "Between"], 0),
      lisEx("Turn right at the traffic lights", "Qu'as-tu entendu ?", ["Turn right at the traffic lights", "Turn left at the traffic lights", "Go straight at the traffic lights", "Stop at the traffic lights"], 0),
    ],
    hard: [
      trEx("Traduis : Continuez tout droit puis tournez à droite.", "Go straight ahead and then turn right", ["Go straight and then turn right", "Continue straight and turn right"]),
      fillEx("The museum is ___ the corner of the street. (au coin de)", "on"),
      ordEx(["Is", "it", "far", "from", "here", "?"]),
      qcm("Comment répondre si c'est proche ?", ["It's ten minutes by car", "No, it's very close", "Yes, it's next year", "It's Monday"], 1),
      trEx("Traduis : Prenez la deuxième rue à gauche.", "Take the second street on the left", ["Take the second street left"]),
      fillEx("You can't miss ___! (expression : tu ne peux pas le rater)", "it"),
      qcm("« Traverser la rue » se traduit par...", ["Cross the street", "Turn the street", "Take the street", "Stop the street"], 0),
    ],
  },
  quiz: [
    qcm("« Tourner » se traduit par...", ["Turn", "Cross", "Take", "Go"], 0),
    qcm("« Traverser » se traduit par...", ["Turn", "Cross", "Take", "Stop"], 1),
    qcm("« Gauche » se traduit par...", ["Left", "Right", "Straight", "Behind"], 0),
    qcm("« Droite » se traduit par...", ["Left", "Right", "Straight", "Between"], 1),
    fillEx("Go ___ for two minutes. (tout droit)", "straight"),
    fillEx("Turn ___ at the bank. (à droite)", "right"),
    qcm("« à côté de » se traduit par...", ["Next to", "Between", "Behind", "Far from"], 0),
    qcm("« en face de » se traduit par...", ["Next to", "In front of", "Behind", "Between"], 1),
    fillEx("The hotel is ___ the bank and the school. (entre)", "between"),
    qcm("Comment demande-t-on poliment son chemin ?", ["Where station?", "Excuse me, where is the station?", "I want station", "Station now"], 1),
    ordEx(["Excuse", "me", "where", "is", "the", "bank", "?"]),
    ordEx(["Turn", "left", "at", "the", "corner", "."]),
    trEx("Traduis : Où est la gare ?", "Where is the station", ["Where's the station"]),
    trEx("Traduis : C'est loin d'ici ?", "Is it far from here"),
    trEx("Traduis : Continuez tout droit.", "Go straight ahead", ["Go straight", "Continue straight ahead"]),
    qcm("« Prendre la première rue à gauche » se dit...", ["Take the first street on the left", "Turn the first street left", "Go the first street", "Cross the first street"], 0),
    fillEx("The pharmacy is next ___ the supermarket. (à côté de)", "to"),
    qcm("« Proche » se traduit par...", ["Close", "Far", "Behind", "Between"], 0),
    qcm("« Loin » se traduit par...", ["Close", "Far", "Next to", "Straight"], 1),
    lisEx("Go straight and turn left", "Qu'as-tu entendu ?", ["Go straight and turn left", "Go straight and turn right", "Turn left and go straight", "Go straight ahead"], 0),
  ],
};

const u_ch2_3 = {
  id: "ch2-u3", chapterId: "ch2", title: "Le présent continu & les loisirs", icon: "🎨",
  desc: "be + verbe -ing, activités en cours",
  lessons: {
    easy: [
      qcm("Conjugue : « I ___ (read) a book right now. »", ["read", "reads", "am reading", "reading"], 2),
      qcm("La forme « -ing » de « run » s'écrit...", ["runing", "runeing", "running", "runnning"], 2),
      fillEx("She ___ (watch) TV now.", "is watching"),
      fillEx("They ___ (play) football right now.", "are playing"),
      qcm("« En ce moment » se traduit par...", ["Every day", "Right now", "Yesterday", "Never"], 1),
      matchVocab(ids("spo", [13, 14, 15, 16, 17, 18, 19, 20])),
    ],
    medium: [
      fillEx("___ you doing your homework now?", "Are"),
      qcm("Forme négative du présent continu :", ["I not am working", "I am not working", "I don't working", "I doesn't work"], 1),
      ordEx(["She", "is", "cooking", "dinner", "."]),
      trEx("Traduis : Je suis en train de lire un livre.", "I am reading a book", ["I'm reading a book"]),
      qcm("Quelle orthographe est correcte ?", ["swiming", "swimming", "swimmming", "swimeing"], 1),
      fillEx("What ___ you doing this weekend?", "are"),
      lisEx("We are going hiking this weekend", "Qu'as-tu entendu ?", ["We are going hiking this weekend", "We are going fishing this weekend", "We are going camping this weekend", "We are going cycling this weekend"], 0),
    ],
    hard: [
      trEx("Traduis : Ils ne sont pas en train de travailler.", "They are not working", ["They aren't working"]),
      fillEx("Look! It ___ (snow)!", "is snowing"),
      ordEx(["What", "are", "you", "doing", "this", "weekend", "?"]),
      qcm("Présent simple ou continu : « I usually ___ (play) chess on Sundays. »", ["am playing", "play", "playing", "plays"], 1),
      trEx("Traduis : En ce moment, elle fait de la randonnée.", "She is hiking right now", ["Right now, she is hiking", "She's hiking right now"]),
      fillEx("We ___ (not/practice) yoga today.", "are not practicing", ["aren't practicing"]),
      qcm("« Passe-temps » se traduit par...", ["Hobby", "Job", "Task", "Habit"], 0),
    ],
  },
  quiz: [
    qcm("« I (read) now. »", ["read", "reads", "am reading", "reading"], 2),
    qcm("« She (cook) now. »", ["cooks", "cook", "is cooking", "cooking"], 2),
    qcm("« They (play) now. »", ["play", "plays", "are playing", "playing"], 2),
    fillEx("He ___ (work) right now.", "is working"),
    fillEx("I ___ (write) an email now.", "am writing"),
    fillEx("___ you listening to music?", "Are"),
    fillEx("___ she doing yoga now?", "Is"),
    qcm("Négation : « I ___ working now. »", ["not am", "am not", "don't", "doesn't"], 1),
    qcm("« En ce moment » se traduit par...", ["Every day", "Right now", "Sometimes", "Never"], 1),
    qcm("« Passe-temps » se traduit par...", ["Hobby", "Job", "Rule", "Goal"], 0),
    ordEx(["I", "am", "reading", "a", "book", "."]),
    ordEx(["She", "is", "not", "working", "."]),
    ordEx(["What", "are", "you", "doing", "?"]),
    trEx("Traduis : Nous sommes en train de danser.", "We are dancing", ["We're dancing"]),
    trEx("Traduis : Il fait de la randonnée ce week-end.", "He is hiking this weekend", ["He's hiking this weekend"]),
    trEx("Traduis : Que fais-tu en ce moment ?", "What are you doing right now", ["What are you doing now"]),
    qcm("Orthographe correcte du participe présent de « swim » :", ["swiming", "swimming", "swimmming", "swimeing"], 1),
    qcm("Orthographe correcte du participe présent de « run » :", ["runing", "running", "runnning", "runeing"], 1),
    fillEx("Look! It ___ (rain)!", "is raining"),
    lisEx("I am playing chess right now", "Qu'as-tu entendu ?", ["I am playing chess right now", "I am playing chess later", "I am playing cards right now", "I was playing chess"], 0),
  ],
};

/* ============================================================
   CHAPITRE 3 — RÉCITS & PASSÉ
   ============================================================ */

const u_ch3_1 = {
  id: "ch3-u1", chapterId: "ch3", title: "Le passé simple", icon: "🕰️",
  desc: "Verbes réguliers et irréguliers, raconter le passé",
  lessons: {
    easy: [
      qcm("Le passé de « work » est...", ["worked", "workted", "workes", "workd"], 0),
      qcm("Le passé de « be » (I) est...", ["was", "were", "is", "been"], 0),
      fillEx("I ___ (visit) London last year.", "visited"),
      fillEx("She ___ (be) happy yesterday.", "was"),
      qcm("« Hier » se traduit par...", ["Today", "Tomorrow", "Yesterday", "Now"], 2),
      matchPairs([["yesterday", "hier"], ["last week", "la semaine dernière"], ["last year", "l'année dernière"], ["ago", "il y a"], ["before", "avant"], ["past", "passé"]]),
    ],
    medium: [
      fillEx("They ___ (not/watch) TV last night.", "did not watch", ["didn't watch"]),
      qcm("Forme interrogative correcte :", ["Did you worked?", "Did you work?", "Do you worked?", "Were you work?"], 1),
      ordEx(["We", "visited", "Paris", "last", "summer", "."]),
      trEx("Traduis : Il a fini son travail hier.", "He finished his work yesterday"),
      fillEx("___ you like the movie?", "Did"),
      qcm("« Il y a deux jours » se traduit par...", ["Two days ago", "In two days", "Two days later", "Since two days"], 0),
      lisEx("I studied English yesterday", "Qu'as-tu entendu ?", ["I studied English yesterday", "I study English every day", "I studied English last week", "I am studying English"], 0),
    ],
    hard: [
      fillEx("They ___ (go) to the beach last weekend.", "went"),
      trEx("Traduis : Nous n'avons pas mangé au restaurant hier.", "We did not eat at the restaurant yesterday", ["We didn't eat at the restaurant yesterday"]),
      ordEx(["Did", "she", "finish", "her", "homework", "?"]),
      qcm("Passé de « have » :", ["haved", "have", "had", "haveed"], 2),
      fillEx("I ___ (see) a great film last night.", "saw"),
      trEx("Traduis : Il n'a pas travaillé la semaine dernière.", "He did not work last week", ["He didn't work last week"]),
      qcm("Quelle phrase est correcte ?", ["She goed to school", "She wented to school", "She went to school", "She go to school yesterday"], 2),
    ],
  },
  quiz: [
    qcm("Passé de « play »", ["played", "plaied", "playd", "plays"], 0),
    qcm("Passé de « like »", ["liked", "likeed", "likd", "likes"], 0),
    qcm("Passé de « go »", ["goed", "went", "gone", "going"], 1),
    qcm("Passé de « see »", ["seed", "saw", "seen", "sees"], 1),
    qcm("Passé de « have »", ["haved", "had", "haves", "having"], 1),
    fillEx("I ___ (watch) a movie yesterday.", "watched"),
    fillEx("She ___ (be) tired last night.", "was"),
    fillEx("We ___ (be) at home yesterday.", "were"),
    fillEx("They ___ (not/play) football last week.", "did not play", ["didn't play"]),
    qcm("Question correcte au passé :", ["Did you saw it?", "Did you see it?", "Do you saw it?", "Were you see it?"], 1),
    ordEx(["I", "visited", "my", "grandmother", "yesterday", "."]),
    ordEx(["Did", "you", "like", "the", "film", "?"]),
    ordEx(["We", "did", "not", "go", "out", "."]),
    trEx("Traduis : J'ai visité Londres l'année dernière.", "I visited London last year"),
    trEx("Traduis : Elle n'a pas aimé le film.", "She did not like the film", ["She didn't like the film"]),
    trEx("Traduis : Ils sont allés à la plage.", "They went to the beach"),
    qcm("« Il y a trois jours » se traduit par...", ["Three days ago", "In three days", "Three days later", "Since three days"], 0),
    qcm("« La semaine dernière » se traduit par...", ["Next week", "Last week", "This week", "Every week"], 1),
    fillEx("___ she finish her homework?", "Did"),
    lisEx("We went to the beach last weekend", "Qu'as-tu entendu ?", ["We went to the beach last weekend", "We go to the beach every weekend", "We are going to the beach", "We went to the mountains last weekend"], 0),
  ],
};

/* ============================================================
   CHAPITRE 4 — FUTUR & PROJETS
   ============================================================ */

const u_ch4_1 = {
  id: "ch4-u1", chapterId: "ch4", title: "Le futur", icon: "🚀",
  desc: "will / going to, parler de l'avenir",
  lessons: {
    easy: [
      qcm("Pour un plan déjà décidé on utilise...", ["will", "going to", "past simple", "present perfect"], 1),
      qcm("Pour une décision spontanée on utilise...", ["will", "going to", "past simple", "present continuous"], 0),
      fillEx("I ___ (will) call you tomorrow.", "will"),
      fillEx("She is ___ (going to) travel next month.", "going to"),
      qcm("« Demain » se traduit par...", ["Yesterday", "Today", "Tomorrow", "Next week"], 2),
      matchPairs([["tomorrow", "demain"], ["next week", "la semaine prochaine"], ["next year", "l'année prochaine"], ["soon", "bientôt"], ["later", "plus tard"], ["future", "futur"]]),
    ],
    medium: [
      fillEx("They ___ (not/come) to the party tomorrow.", "will not come", ["won't come"]),
      qcm("Forme interrogative correcte :", ["Will you help me?", "Do you will help me?", "Are you will help me?", "Will you helping me?"], 0),
      ordEx(["I", "am", "going", "to", "visit", "my", "parents", "."]),
      trEx("Traduis : Je vais étudier ce soir.", "I am going to study tonight", ["I'm going to study tonight"]),
      fillEx("Look at those clouds! It ___ (going to) rain.", "is going to"),
      qcm("« Bientôt » se traduit par...", ["Soon", "Late", "Never", "Ago"], 0),
      lisEx("I will call you tomorrow", "Qu'as-tu entendu ?", ["I will call you tomorrow", "I called you yesterday", "I am calling you now", "I will call you tonight"], 0),
    ],
    hard: [
      trEx("Traduis : Il ne viendra pas à la réunion demain.", "He will not come to the meeting tomorrow", ["He won't come to the meeting tomorrow"]),
      fillEx("What ___ you do this weekend?", "will"),
      ordEx(["She", "is", "going", "to", "start", "a", "new", "job", "."]),
      qcm("Quelle phrase exprime une prédiction basée sur des preuves visibles ?", ["I will call you", "It is going to rain, look at the sky", "I will study tonight", "She will maybe come"], 1),
      trEx("Traduis : Nous allons déménager l'année prochaine.", "We are going to move next year", ["We're going to move next year"]),
      fillEx("I promise I ___ (will) help you.", "will"),
      qcm("Pour une décision spontanée on utilise...", ["going to", "will", "present continuous", "past simple"], 1),
    ],
  },
  quiz: [
    qcm("Plan déjà décidé →", ["will", "going to", "past", "perfect"], 1),
    qcm("Décision spontanée →", ["will", "going to", "past", "perfect"], 0),
    fillEx("I ___ help you. (spontané)", "will"),
    fillEx("She is ___ (going to) call him.", "going to"),
    fillEx("They ___ (not/be) here tomorrow.", "will not be", ["won't be"]),
    qcm("Question correcte :", ["Will you come?", "Do you will come?", "Are you will come?", "Will you coming?"], 0),
    qcm("« Demain » →", ["Yesterday", "Tomorrow", "Today", "Now"], 1),
    qcm("« La semaine prochaine » →", ["Last week", "Next week", "This week", "Every week"], 1),
    qcm("« Bientôt » →", ["Soon", "Never", "Ago", "Late"], 0),
    ordEx(["I", "will", "call", "you", "tomorrow", "."]),
    ordEx(["She", "is", "going", "to", "travel", "."]),
    ordEx(["What", "will", "you", "do", "?"]),
    trEx("Traduis : Je vais appeler ma mère ce soir.", "I am going to call my mother tonight", ["I'm going to call my mother tonight"]),
    trEx("Traduis : Il pleuvra demain.", "It will rain tomorrow"),
    trEx("Traduis : Nous n'irons pas à la fête.", "We will not go to the party", ["We won't go to the party"]),
    qcm("Prédiction basée sur des indices visibles :", ["I will study", "It's going to rain", "I will call", "She will maybe come"], 1),
    fillEx("Look! The bus ___ (going to) leave without us!", "is going to"),
    qcm("Quelle phrase est correcte ?", ["She wills come", "She will comes", "She will come", "She going to comes"], 2),
    fillEx("I promise I ___ (will) never forget you.", "will"),
    lisEx("It is going to rain tomorrow", "Qu'as-tu entendu ?", ["It is going to rain tomorrow", "It will rain tonight", "It rained yesterday", "It is raining now"], 0),
  ],
};

const u_ch4_2 = {
  id: "ch4-u2", chapterId: "ch4", title: "Le present perfect", icon: "🧩",
  desc: "have/has + participe passé, l'expérience",
  lessons: {
    easy: [
      qcm("« have/has + participe passé » s'appelle...", ["Present simple", "Present perfect", "Past simple", "Future"], 1),
      qcm("Participe passé de « see » :", ["saw", "seen", "seed", "seeing"], 1),
      fillEx("I ___ (visit) Paris. (déjà)", "have visited"),
      fillEx("She ___ (see) that movie.", "has seen"),
      qcm("« Déjà » se traduit par...", ["Already", "Never", "Yet", "Just"], 0),
      matchPairs([["already", "déjà"], ["never", "jamais"], ["yet", "encore (négation/question)"], ["just", "à l'instant"], ["ever", "déjà (question)"], ["since", "depuis"]]),
    ],
    medium: [
      fillEx("They ___ (not/finish) their homework yet.", "have not finished", ["haven't finished"]),
      qcm("Question correcte :", ["Have you ever seen a whale?", "Did you have seen a whale?", "Have you saw a whale?", "Do you have seen a whale?"], 0),
      ordEx(["I", "have", "never", "been", "to", "Japan", "."]),
      trEx("Traduis : Elle a déjà fini son travail.", "She has already finished her work"),
      fillEx("We ___ (live) here for five years.", "have lived"),
      qcm("« For five years » signifie...", ["Depuis cinq ans", "Il y a cinq ans", "Cinq ans plus tard", "Cinq ans après"], 0),
      lisEx("I have never been to Japan", "Qu'as-tu entendu ?", ["I have never been to Japan", "I have already been to Japan", "I went to Japan last year", "I am going to Japan"], 0),
    ],
    hard: [
      trEx("Traduis : Avez-vous déjà mangé des sushis ?", "Have you ever eaten sushi", ["Have you ever eaten sushi?"]),
      fillEx("He ___ (just/arrive). (vient d'arriver)", "has just arrived"),
      ordEx(["Has", "she", "finished", "her", "project", "yet", "?"]),
      qcm("Laquelle insiste sur la conséquence présente ?", ["I lost my keys", "I have lost my keys", "Les deux sont identiques", "Aucune des deux"], 1),
      trEx("Traduis : Nous n'avons jamais visité l'Italie.", "We have never visited Italy"),
      fillEx("___ you ever tried sushi?", "Have"),
      qcm("« Just » dans « I have just finished » signifie...", ["Il y a longtemps", "À l'instant", "Jamais", "Toujours"], 1),
    ],
  },
  quiz: [
    qcm("Participe passé de « go »", ["went", "gone", "goed", "going"], 1),
    qcm("Participe passé de « eat »", ["ate", "eaten", "eated", "eating"], 1),
    qcm("Participe passé de « have »", ["had", "haved", "has", "having"], 0),
    fillEx("I ___ (finish) my homework.", "have finished"),
    fillEx("He ___ (lose) his keys.", "has lost"),
    fillEx("They ___ (not/arrive) yet.", "have not arrived", ["haven't arrived"]),
    qcm("Question correcte :", ["Have you ever been to London?", "Did you have been to London?", "Have you went to London?", "Do you have been to London?"], 0),
    qcm("« Déjà » (dans une question) se traduit par...", ["Already", "Ever", "Never", "Just"], 1),
    qcm("« Jamais » se traduit par...", ["Already", "Ever", "Never", "Just"], 2),
    qcm("« À l'instant » se traduit par...", ["Already", "Ever", "Never", "Just"], 3),
    ordEx(["I", "have", "already", "seen", "this", "film", "."]),
    ordEx(["She", "has", "never", "eaten", "sushi", "."]),
    ordEx(["Have", "you", "finished", "yet", "?"]),
    trEx("Traduis : J'ai déjà visité Londres.", "I have already visited London"),
    trEx("Traduis : Elle n'a jamais mangé de sushi.", "She has never eaten sushi"),
    trEx("Traduis : As-tu fini tes devoirs ?", "Have you finished your homework"),
    qcm("« For five years » signifie...", ["Depuis cinq ans", "Il y a cinq ans", "Dans cinq ans", "Cinq ans plus tard"], 0),
    fillEx("We ___ (know) each other for ten years.", "have known"),
    fillEx("___ she ever visited Spain?", "Has"),
    lisEx("I have already finished my homework", "Qu'as-tu entendu ?", ["I have already finished my homework", "I will finish my homework", "I am finishing my homework", "I never finish my homework"], 0),
  ],
};

/* ============================================================
   CHAPITRE 5 — PERFECTIONNEMENT
   ============================================================ */

const u_ch5_1 = {
  id: "ch5-u1", chapterId: "ch5", title: "Expressions & phrasal verbs", icon: "🏆",
  desc: "Idiomes et verbes à particule courants",
  lessons: {
    easy: [
      qcm("« Give up » signifie...", ["Commencer", "Abandonner", "Continuer", "Réussir"], 1),
      qcm("« Look for » signifie...", ["Regarder", "Chercher", "Trouver", "Perdre"], 1),
      fillEx("Can you ___ up the volume? (augmenter)", "turn"),
      qcm("« Find out » signifie...", ["Découvrir", "Cacher", "Perdre", "Oublier"], 0),
      qcm("« It's raining cats and dogs » signifie...", ["Il pleut des chats", "Il pleut très fort", "Il fait beau", "Il neige"], 1),
      matchPairs([["give up", "abandonner"], ["look for", "chercher"], ["find out", "découvrir"], ["turn up", "augmenter"], ["turn down", "refuser"], ["get on with", "bien s'entendre avec"]]),
    ],
    medium: [
      fillEx("She decided to ___ up smoking. (arrêter)", "give"),
      qcm("« Break the ice » signifie...", ["Briser un objet", "Détendre l'atmosphère", "Faire du sport d'hiver", "Se fâcher"], 1),
      ordEx(["I", "am", "looking", "for", "my", "keys", "."]),
      trEx("Traduis : Il a fini par abandonner.", "He ended up giving up", ["He gave up in the end"]),
      qcm("« Piece of cake » signifie...", ["Un morceau de gâteau", "Très facile", "Très difficile", "Une fête"], 1),
      fillEx("We need to ___ out the truth. (découvrir)", "find"),
      lisEx("It's raining cats and dogs", "Qu'as-tu entendu ?", ["It's raining cats and dogs", "It's snowing heavily", "It's a beautiful day", "It's very windy"], 0),
    ],
    hard: [
      trEx("Traduis : C'est du gâteau (très facile).", "It's a piece of cake"),
      fillEx("Don't ___ down the offer, it's a great opportunity. (refuser)", "turn"),
      ordEx(["She", "gave", "up", "after", "many", "attempts", "."]),
      qcm("« Under the weather » signifie...", ["Sous la pluie", "Un peu malade", "En pleine forme", "En retard"], 1),
      trEx("Traduis : Ça coûte les yeux de la tête.", "It costs an arm and a leg"),
      qcm("« Get on well with someone » signifie...", ["Se disputer", "Bien s'entendre avec quelqu'un", "Monter dans un bus", "Ignorer quelqu'un"], 1),
      qcm("« Once in a blue moon » signifie...", ["Très souvent", "Très rarement", "Chaque mois", "Chaque nuit"], 1),
    ],
  },
  quiz: [
    qcm("« Give up » →", ["Abandonner", "Continuer", "Commencer", "Gagner"], 0),
    qcm("« Look for » →", ["Regarder", "Chercher", "Trouver", "Voir"], 1),
    qcm("« Find out » →", ["Découvrir", "Cacher", "Fermer", "Perdre"], 0),
    qcm("« Turn up » →", ["Augmenter", "Baisser", "Éteindre", "Ouvrir"], 0),
    qcm("« Turn down » →", ["Accepter", "Refuser", "Augmenter", "Chercher"], 1),
    qcm("« Get on with » →", ["Bien s'entendre avec", "Se disputer avec", "Ignorer", "Chercher"], 0),
    fillEx("Can you ___ up the volume, please?", "turn"),
    fillEx("Don't ___ up, you can do it! (abandonner)", "give"),
    qcm("« Piece of cake » →", ["Très difficile", "Très facile", "Un dessert", "Une fête"], 1),
    qcm("« Break the ice » →", ["Casser un objet", "Détendre l'atmosphère", "Faire du patin", "Se fâcher"], 1),
    qcm("« Under the weather » →", ["En pleine forme", "Un peu malade", "Sous la pluie", "En retard"], 1),
    qcm("« Cost an arm and a leg » →", ["Être blessé", "Coûter très cher", "Être fatigué", "Faire du sport"], 1),
    qcm("« Once in a blue moon » →", ["Très souvent", "Très rarement", "Toutes les nuits", "Jamais"], 1),
    ordEx(["I", "am", "looking", "for", "a", "new", "job", "."]),
    ordEx(["She", "turned", "down", "the", "offer", "."]),
    trEx("Traduis : Il a fini par abandonner.", "He ended up giving up", ["He gave up in the end"]),
    trEx("Traduis : C'est du gâteau.", "It's a piece of cake"),
    trEx("Traduis : Elle est un peu malade aujourd'hui.", "She is under the weather today", ["She's under the weather today"]),
    qcm("« Get along with » est un synonyme de...", ["Get on with", "Give up", "Turn down", "Find out"], 0),
    lisEx("She decided to give up smoking", "Qu'as-tu entendu ?", ["She decided to give up smoking", "She decided to start smoking", "She decided to look for a job", "She decided to turn down the offer"], 0),
  ],
};

/* ---------- Structure du programme ----------
   CHAPTERS est "let" : les fichiers data-curriculum-advanced-*.js
   ajoutent d'autres chapitres via CHAPTERS.push(...). Le calcul de
   ALL_UNITS / UNIT_BY_ID se fait ensuite dans curriculum-index.js,
   une fois tous les chapitres chargés. ---------- */
let CHAPTERS = [
  {
    id: "ch1", title: "Les Bases", level: "A1", icon: "🌱", locked: false,
    units: [u_ch1_1, u_ch1_2, u_ch1_3, u_ch1_4],
  },
  {
    id: "ch2", title: "Vie Quotidienne", level: "A1-A2", icon: "☕", locked: false,
    units: [u_ch2_1, u_ch2_2, u_ch2_3],
  },
  {
    id: "ch3", title: "Récits & Passé", level: "A2", icon: "🕰️", locked: false,
    units: [u_ch3_1],
  },
  {
    id: "ch4", title: "Futur & Projets", level: "A2-B1", icon: "🚀", locked: false,
    units: [u_ch4_1, u_ch4_2],
  },
  {
    id: "ch5", title: "Perfectionnement", level: "B1-B2", icon: "🏆", locked: false,
    units: [u_ch5_1],
  },
];
// ALL_UNITS / UNIT_BY_ID / unitIndex / prevUnitId sont calculés dans
// curriculum-index.js, chargé après tous les fichiers de chapitres.
