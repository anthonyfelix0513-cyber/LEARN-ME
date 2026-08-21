/* ============================================================
   LEARN ME — Écoute quotidienne (compréhension orale)
   3 niveaux de difficulté. Chaque passage est lu via la synthèse
   vocale du navigateur puis suivi d'un QCM de compréhension.
   ============================================================ */

function lq(q, options, answer) { return { q, options, answer }; }

const LISTENING_PASSAGES = {
  easy: [
    {
      id: "e1", level: "easy",
      text: "My name is Sarah. I am from Canada, and I live in a small town near the mountains with my family. I have two brothers and one sister, and we are all very close. I work in a small shop in the city center, where I sell clothes and help customers find what they need. Every morning, I wake up at seven o'clock and I have breakfast with my family before leaving for work. My mother usually makes toast and tea, and we talk about our plans for the day. After breakfast, I take the bus to the shop, which takes about twenty minutes. I really enjoy my job because I meet many different people every day. In the evening, I come home and help my mother cook dinner. On weekends, I like to go for a walk with my brothers or visit my grandparents, who live just outside the town.",
      questions: [
        lq("D'où vient Sarah ?", ["Canada", "France", "Les États-Unis", "Espagne"], 0),
        lq("Combien de frères a-t-elle ?", ["Un", "Deux", "Trois", "Quatre"], 1),
        lq("À quelle heure se réveille-t-elle ?", ["Six heures", "Sept heures", "Huit heures", "Neuf heures"], 1),
      ],
    },
    {
      id: "e2", level: "easy",
      text: "Tom is a sixteen-year-old student who lives in a small town with his parents and his younger sister. He studies English at school, along with mathematics and science, and he says English is definitely his favorite subject because he loves learning new words. Besides school, Tom has two big passions: music and football. He plays the guitar a little in his free time, although he admits he still has a lot to learn. On Saturdays, he plays football with his friends in the local park, usually for almost two hours, no matter the weather. After the game, they often stop at a small café to have a drink together and talk about the match. In the evening, he watches movies with his family, and they take turns choosing what to watch each week. Tom's favorite movies are usually action films, while his sister prefers comedies.",
      questions: [
        lq("Qu'étudie Tom ?", ["Les mathématiques", "L'anglais", "L'histoire", "L'art"], 1),
        lq("À quoi joue-t-il le samedi ?", ["Au basketball", "Au football", "Au tennis", "Aux échecs"], 1),
        lq("Que fait-il le soir ?", ["Il lit des livres", "Il regarde des films", "Il cuisine", "Il se couche tôt"], 1),
      ],
    },
    {
      id: "e3", level: "easy",
      text: "This is my house. It has three bedrooms, a kitchen, a cozy living room, and a small garden at the back where the children love to play. I live here with my wife and our two children, a boy and a girl, who are both in primary school. We have lived in this house for almost five years now, and we have slowly made it feel like our own by painting the walls in bright colors and adding a small vegetable patch in the garden. We also have a dog. His name is Max, and he is a friendly golden retriever who loves running around outside and playing fetch with the children after school. In the evenings, the whole family often sits in the garden when the weather is nice, and Max usually falls asleep near our feet.",
      questions: [
        lq("Combien de chambres y a-t-il ?", ["Deux", "Trois", "Quatre", "Cinq"], 1),
        lq("Qui vit dans la maison ?", ["Seulement l'auteur", "L'auteur et sa femme", "L'auteur, sa femme et leurs enfants", "Seulement les enfants"], 2),
        lq("Comment s'appelle le chien ?", ["Rex", "Max", "Buddy", "Charlie"], 1),
      ],
    },
    {
      id: "e4", level: "easy",
      text: "Laura works as a nurse in a busy hospital. She starts her shift at six in the morning and finishes at two in the afternoon. Before going to work, she always has a strong cup of coffee and a piece of toast. At the hospital, she checks on her patients, gives them their medicine, and talks with the doctors about their treatment. She likes her job because she can help people every day, even though it is sometimes tiring. After work, she goes home, takes a shower, and rests on the sofa for a while. In the evening, she likes to read a book or call her sister on the phone. On her days off, she enjoys going for a walk in the park near her house or meeting friends for lunch. Laura says that being a nurse is hard work, but it makes her feel proud. On weekends, she sometimes volunteers at a local health fair, where she checks blood pressure for free and answers people's questions about staying healthy. Her colleagues often say she is one of the kindest nurses in the hospital, always ready to comfort a worried patient with a smile.",
      questions: [
        lq("Quel est le métier de Laura ?", ["Médecin", "Infirmière", "Professeure", "Serveuse"], 1),
        lq("Que boit-elle avant d'aller travailler ?", ["Du thé", "Un jus d'orange", "Un café fort", "De l'eau"], 2),
        lq("Que fait-elle le soir ?", ["Elle regarde la télévision", "Elle lit ou appelle sa sœur", "Elle fait du sport", "Elle cuisine pour ses collègues"], 1),
      ],
    },
    {
      id: "e5", level: "easy",
      text: "Last weekend, the Miller family went to the beach. It was a beautiful sunny day, so they decided to leave early in the morning. When they arrived, the children ran straight into the water and started swimming. Mr. Miller set up the umbrella and the chairs while his wife prepared sandwiches for lunch. In the afternoon, they built a big sandcastle together and took some photos. Later, they walked along the beach and collected some seashells. Around five o'clock, they packed their things and went to a small restaurant near the sea to have dinner. Everyone was tired but happy after such a wonderful day. Before leaving, the youngest daughter found a small crab near the rocks and wanted to keep it as a pet, but her parents convinced her to let it go back into the sea. The children fell asleep in the car on the way home.",
      questions: [
        lq("Quel temps faisait-il ?", ["Pluvieux", "Ensoleillé", "Neigeux", "Venteux"], 1),
        lq("Qu'ont-ils construit ensemble l'après-midi ?", ["Une cabane", "Un château de sable", "Un bateau", "Un feu de camp"], 1),
        lq("Où ont-ils dîné ?", ["À la maison", "Dans un restaurant près de la mer", "Sur la plage", "Chez des amis"], 1),
      ],
    },
    {
      id: "e6", level: "easy",
      text: "Every Saturday morning, Daniel goes to the supermarket to buy food for the week. He always makes a list before leaving home so he doesn't forget anything important. Today, he needs to buy milk, eggs, bread, chicken, and some vegetables. At the supermarket, he also finds a discount on his favorite cereal, so he decides to buy two boxes. While he is waiting in line at the checkout, he talks with his neighbor, who is also doing her shopping. When he gets home, he puts everything away in the kitchen and the fridge. Then he cooks a simple lunch with some of the fresh vegetables he just bought. Before leaving the store, he also stops at the bakery section to buy a fresh loaf of bread for tomorrow's breakfast, and this week he remembered to buy some fruit for his children's lunchboxes too. He usually spends around forty-five minutes shopping, and he always tries to avoid the busiest hours in the early afternoon.",
      questions: [
        lq("Que fait Daniel avant d'aller au supermarché ?", ["Il appelle sa mère", "Il fait une liste", "Il prend son petit-déjeuner", "Il dort"], 1),
        lq("Que trouve-t-il en promotion ?", ["Du lait", "Des céréales", "Du pain", "Du poulet"], 1),
        lq("Avec qui parle-t-il à la caisse ?", ["Sa sœur", "Sa voisine", "Son patron", "Un ami d'enfance"], 1),
      ],
    },
    {
      id: "e7", level: "easy",
      text: "Yesterday, Claire met her old friend Julie in the city center. They hadn't seen each other for almost five years, so they had a lot to talk about. They decided to go to a small coffee shop and order some tea and cake. Julie told Claire about her new job in a hospital, and Claire talked about her recent trip to Italy. They also remembered funny stories from when they were at school together. After two hours, they realized it was getting late, but they promised to meet again very soon. Before leaving, they exchanged phone numbers and took a photo together to remember the moment. They also talked about their plans for the upcoming holidays, and Julie invited Claire to visit her new apartment sometime next month. Walking home afterward, Claire felt grateful to have reconnected with such a good friend.",
      questions: [
        lq("Depuis combien de temps ne s'étaient-elles pas vues ?", ["Un an", "Deux ans", "Presque cinq ans", "Dix ans"], 2),
        lq("Où travaille Julie maintenant ?", ["Dans une école", "Dans un hôpital", "Dans un magasin", "Dans un restaurant"], 1),
        lq("Qu'ont-elles fait avant de partir ?", ["Elles se sont disputées", "Elles ont échangé leurs numéros et pris une photo", "Elles ont acheté des vêtements", "Elles ont pris le bus ensemble"], 1),
      ],
    },
    {
      id: "e8", level: "easy",
      text: "It rained all day yesterday, so Ben decided to stay home instead of going out. In the morning, he cleaned his apartment and did some laundry. After lunch, he watched two episodes of his favorite show on television. In the afternoon, he called his mother to see how she was doing, and they talked for almost an hour. Later, he tried a new recipe he found online: a simple pasta with tomatoes and cheese. It was delicious! In the evening, he read a few pages of his book before going to bed early. Even though he couldn't go outside, Ben felt that it had been a relaxing and productive day. Before going to sleep, he also made a short list of things he wanted to do the following weekend, including visiting his sister and finally organizing his old photographs. He felt satisfied knowing that even a rainy day could be turned into something useful and calm.",
      questions: [
        lq("Pourquoi Ben est-il resté à la maison ?", ["Il était malade", "Il pleuvait", "Il n'avait pas d'argent", "Il travaillait"], 1),
        lq("Qu'a-t-il préparé l'après-midi ?", ["Une soupe", "Des pâtes aux tomates et au fromage", "Une salade", "Un gâteau"], 1),
        lq("Comment Ben s'est-il senti à la fin de la journée ?", ["Ennuyé", "Détendu et productif", "En colère", "Fatigué et triste"], 1),
      ],
    },
    {
      id: "e9", level: "easy",
      text: "Two months ago, Anna decided to learn how to cook because she always ordered takeaway food. She started by watching cooking videos online and buying a simple cookbook. At first, it was difficult, and she made a lot of mistakes. One time, she even burned the rice! But she didn't give up. Now, she can cook several dishes very well, like chicken soup, vegetable curry, and homemade pizza. Her friends are always happy when she invites them for dinner. Anna says that cooking helps her relax after a long day at work, and she also saves a lot of money because she doesn't order food as often as before. She has even started a small notebook where she writes down her favorite recipes, adding notes about what worked well and what she would change next time. Her next goal is to learn how to bake bread from scratch, and her family is excited to taste her first attempt this weekend.",
      questions: [
        lq("Pourquoi Anna a-t-elle voulu apprendre à cuisiner ?", ["Elle voulait ouvrir un restaurant", "Elle commandait toujours à emporter", "Elle voulait maigrir", "Son médecin le lui a conseillé"], 1),
        lq("Qu'a-t-elle brûlé une fois ?", ["Des pâtes", "Du riz", "Du pain", "De la viande"], 1),
        lq("Que dit Anna à propos de la cuisine ?", ["Elle déteste ça", "Ça l'aide à se détendre et économiser de l'argent", "C'est trop cher", "Elle ne cuisine que le weekend"], 1),
      ],
    },
    {
      id: "e10", level: "easy",
      text: "Today was Leo's first day at his new school. He felt a little nervous because he didn't know anyone there. When he arrived, his teacher introduced him to the class and showed him where to sit. During the break, a boy named Max came to talk to him and invited him to play football with his friends. At lunchtime, Leo sat with his new classmates and they talked about their favorite games and movies. By the end of the day, Leo felt much happier and less worried. He even made two new friends! When he got home, he told his parents that his first day had gone very well, and he was looking forward to going back tomorrow. The following week, Max invited Leo to his birthday party, which made Leo even more excited about his new school. His parents were relieved to see him settle in so quickly and were proud of how brave he had been on his first day.",
      questions: [
        lq("Comment se sentait Leo au début de la journée ?", ["Très content", "Un peu nerveux", "En colère", "Malade"], 1),
        lq("Qui est venu lui parler pendant la pause ?", ["Sa sœur", "Un garçon nommé Max", "Son professeur", "Personne"], 1),
        lq("Comment s'est terminée sa journée ?", ["Il était triste", "Il s'est senti plus heureux et s'est fait des amis", "Il a pleuré", "Il a manqué le bus"], 1),
      ],
    },
    {
      id: "e11", level: "easy",
      text: "Last summer, the Johnson family took a road trip to visit their grandparents who live in the countryside. The drive took about four hours, so they stopped once to eat lunch and stretch their legs. During the trip, the children played games and listened to music in the back of the car. When they arrived, their grandparents were waiting outside with big smiles. They spent the whole weekend together: they went fishing at the lake, cooked meals outside, and told stories in the evening by the fire. On Sunday, before leaving, they took a family photo in the garden. The children were sad to say goodbye, but they promised to come back again during the winter holidays. During the drive back home, everyone talked about their favorite moments from the weekend, especially the evening by the fire when their grandfather told an old family story. The children already started asking their parents when they could visit again.",
      questions: [
        lq("Combien de temps a duré le trajet ?", ["Deux heures", "Quatre heures", "Six heures", "Toute la journée"], 1),
        lq("Que faisaient les enfants pendant le trajet ?", ["Ils dormaient", "Ils jouaient et écoutaient de la musique", "Ils lisaient des livres", "Ils se disputaient"], 1),
        lq("Que promettent les enfants avant de partir ?", ["De ne plus revenir", "De revenir pendant les vacances d'hiver", "D'appeler tous les jours", "D'écrire une lettre"], 1),
      ],
    },
    {
      id: "e12", level: "easy",
      text: "Emily got a new kitten last month, and she loves taking care of it. Every morning, she gives it fresh water and some food before going to school. When she comes back home in the afternoon, she plays with the kitten using a small toy mouse. The kitten likes to sleep on Emily's bed and follow her around the house. Sometimes it is a little naughty and scratches the furniture, but Emily doesn't mind too much. She took the kitten to the vet last week for a check-up, and the vet said it was healthy and growing well. Emily is very happy to have a new little friend at home. She has also started teaching the kitten simple tricks, like coming when she calls its name, using small treats as a reward. Her parents joke that the kitten now follows her everywhere, just like a tiny shadow, and Emily hopes to teach it even more tricks in the coming months.",
      questions: [
        lq("Quand Emily a-t-elle eu son chaton ?", ["Il y a une semaine", "Le mois dernier", "Il y a un an", "Hier"], 1),
        lq("Où le chaton aime-t-il dormir ?", ["Dans le jardin", "Sur le lit d'Emily", "Dans la cuisine", "Sous la voiture"], 1),
        lq("Qu'a dit le vétérinaire ?", ["Le chaton était malade", "Le chaton était en bonne santé", "Le chaton était trop petit", "Le chaton avait besoin d'un médicament"], 1),
      ],
    },
    {
      id: "e13", level: "easy",
      text: "Making a good breakfast doesn't have to be complicated. Here is a simple recipe that only takes ten minutes. First, take two eggs and break them into a bowl. Add a little salt and pepper, then mix well with a fork. Heat some butter in a pan over medium heat. Pour the eggs into the pan and stir gently until they become soft and fluffy. While the eggs are cooking, toast two slices of bread. When everything is ready, put the eggs on the toast and add a few slices of tomato on top. You can also add a cup of orange juice or a coffee to complete your breakfast. This meal is quick, healthy, and gives you enough energy to start the day. If you want to make it even more special, you can add a small piece of avocado or a sprinkle of cheese on top of the eggs. Many people also enjoy adding fresh herbs like parsley for extra flavor and color.",
      questions: [
        lq("Combien de temps prend cette recette ?", ["Cinq minutes", "Dix minutes", "Trente minutes", "Une heure"], 1),
        lq("Que fait-on cuire dans une poêle avec du beurre ?", ["Du pain", "Des œufs", "Des tomates", "Du fromage"], 1),
        lq("Que peut-on ajouter pour compléter le petit-déjeuner ?", ["Une soupe", "Un jus d'orange ou un café", "Une salade", "Un dessert"], 1),
      ],
    },
    {
      id: "e14", level: "easy",
      text: "Every Wednesday afternoon, Sofia goes to the public library near her house. She likes the quiet atmosphere there, which helps her focus on her studies. Usually, she spends about two hours reading books and doing her homework at one of the tables. Sometimes she also borrows novels to read at home during the weekend. Last Wednesday, she discovered a new section with books about art and photography, which she found very interesting. She talked with the librarian, who recommended a few good books for beginners. Sofia left the library that day with three new books to read. She is now planning to visit the library more often because she really enjoys learning new things there. Before leaving, she also signed up for a small workshop about creative writing that the library was organizing the following month. She felt proud of herself for stepping out of her comfort zone, and her friends were surprised but supportive when she told them about it.",
      questions: [
        lq("Quel jour Sofia va-t-elle à la bibliothèque ?", ["Le lundi", "Le mercredi", "Le vendredi", "Le dimanche"], 1),
        lq("Qu'a-t-elle découvert la semaine dernière ?", ["Une nouvelle librairie", "Une section sur l'art et la photographie", "Un nouveau café", "Un cours de langue"], 1),
        lq("Combien de livres a-t-elle empruntés ?", ["Un", "Deux", "Trois", "Quatre"], 2),
      ],
    },
    {
      id: "e15", level: "easy",
      text: "On sunny afternoons, many families go to the park near the town center. Children run around, play on the swings, and ride their bicycles, while parents sit on benches and chat with each other. Yesterday, Michael took his two children to the park after school. They played football together for almost an hour, and then they had an ice cream from a small stand near the entrance. Michael also met another father from his son's school, and they talked about their children's activities. Before going home, the children fed some ducks near the pond. Michael says that going to the park is a great way to spend quality time with his kids after a busy day at work. On the way home, Michael promised his children that they could return to the park again next weekend if the weather stayed nice. The children were thrilled and immediately started planning which games they wanted to play next time.",
      questions: [
        lq("Où les enfants jouent-ils ?", ["Sur la plage", "Dans un parc", "À l'école", "Chez eux"], 1),
        lq("Qu'ont-ils mangé après avoir joué au football ?", ["Un sandwich", "Une glace", "Un gâteau", "Des fruits"], 1),
        lq("Qu'ont-ils fait avant de rentrer ?", ["Ils ont nourri des canards", "Ils ont fait du vélo", "Ils ont lu un livre", "Ils ont dormi"], 0),
      ],
    },
    {
      id: "e16", level: "easy",
      text: "Peter had a headache and a small fever for two days, so he decided to see a doctor. At the clinic, the nurse checked his temperature and blood pressure before the doctor examined him. The doctor asked him a few questions about his symptoms and looked at his throat. She said it was probably just a common cold and told him to rest and drink a lot of water. She also gave him a prescription for some medicine to help with the fever. Peter thanked the doctor and went to the pharmacy to buy the medicine. After resting at home for two days and following the doctor's advice, he started feeling much better. A few days later, Peter called the clinic to thank the doctor for her help, since he was feeling almost completely recovered. He also decided to be more careful in the future, washing his hands more often to avoid catching another cold.",
      questions: [
        lq("Quels étaient les symptômes de Peter ?", ["Mal de dos", "Mal de tête et fièvre", "Toux seulement", "Mal de ventre"], 1),
        lq("Que lui a dit la doctoresse de faire ?", ["Aller à l'hôpital", "Se reposer et boire beaucoup d'eau", "Faire du sport", "Ne rien faire"], 1),
        lq("Où est-il allé après la consultation ?", ["Chez lui directement", "À la pharmacie", "Au travail", "Au restaurant"], 1),
      ],
    },
    {
      id: "e17", level: "easy",
      text: "Last Saturday, Rachel went shopping for new clothes because she needed something nice to wear for a wedding. She visited several shops in the city center and tried on many different dresses. It took her a long time to decide because she wanted to find the perfect one. Finally, she found a beautiful blue dress that fit her perfectly, and she also bought a pair of matching shoes. The shop assistant was very helpful and gave her some good advice about accessories. Rachel spent more money than she planned, but she was happy with her choices. She can't wait to wear her new outfit at the wedding next month. A week later, at the wedding, several guests complimented Rachel on her elegant outfit, which made all the time she spent shopping feel completely worth it. Her friend even joked that she should become a professional stylist.",
      questions: [
        lq("Pourquoi Rachel a-t-elle fait du shopping ?", ["Pour son anniversaire", "Pour un mariage", "Pour un entretien d'embauche", "Sans raison particulière"], 1),
        lq("Quelle couleur était la robe qu'elle a choisie ?", ["Rouge", "Bleue", "Verte", "Noire"], 1),
        lq("Qui l'a aidée à choisir des accessoires ?", ["Sa mère", "La vendeuse", "Son amie", "Personne"], 1),
      ],
    },
    {
      id: "e18", level: "easy",
      text: "Every evening after dinner, Mr. Wilson likes to take a walk around his neighborhood. He says it helps him relax and sleep better at night. He usually walks for about thirty minutes, passing by the small park and the local shops. Sometimes his neighbor, Mrs. Green, joins him, and they talk about their day while walking. Last night, the weather was cool and pleasant, so they decided to walk a little longer than usual. They saw some children playing outside and a few people walking their dogs. When Mr. Wilson got home, he felt calm and ready for bed. He believes that a simple evening walk is one of the best ways to end the day. Occasionally, other neighbors join them too, turning the walk into a small friendly gathering. Mr. Wilson says that these simple conversations have helped him get to know his neighborhood much better over the years, and he now considers his evening walk one of the highlights of his day.",
      questions: [
        lq("Pourquoi M. Wilson fait-il une promenade le soir ?", ["Pour faire du sport intense", "Pour se détendre et mieux dormir", "Pour promener son chien", "Pour aller au magasin"], 1),
        lq("Qui l'accompagne parfois ?", ["Son fils", "Sa voisine, Mme Green", "Son collègue", "Personne"], 1),
        lq("Comment était le temps hier soir ?", ["Chaud et humide", "Frais et agréable", "Pluvieux", "Très froid"], 1),
      ],
    },
  ],
  medium: [
    {
      id: "m1", level: "medium",
      text: "Last weekend, Emma went to the local market with her mother, something they try to do together at least once a month. The market was full of colorful stalls selling fresh vegetables, fruit, cheese, and freshly baked bread, and the smell of warm pastries filled the air as they walked through the crowded aisles. They bought fresh vegetables, bread, and some fruit, including a large bag of strawberries that Emma couldn't resist. Emma's mother also stopped to chat with a farmer she has known for years, who always saves the best tomatoes for her. After finishing their shopping, they decided to have lunch at a small restaurant near the river, where they could sit outside and enjoy the view of the water. Emma ordered a salad with grilled chicken, and her mother had a warm vegetable soup, since the weather had turned a little cooler that afternoon. It was a lovely day, and Emma said she couldn't remember the last time she had felt so relaxed.",
      questions: [
        lq("Où sont-elles allées en premier ?", ["Au restaurant", "Au marché", "À la rivière", "À l'école"], 1),
        lq("Qu'a commandé Emma ?", ["Une soupe", "Une salade", "Du pain", "Des fruits"], 1),
        lq("Où ont-elles déjeuné ?", ["À la maison", "Près de la rivière", "Au marché", "À l'école"], 1),
      ],
    },
    {
      id: "m4", level: "medium",
      text: "Last week, Daniel had a job interview for a position as a marketing assistant at a growing company. He was quite nervous because it was his first interview in almost two years. Before the interview, he spent several days preparing: he researched the company's history, practiced answers to common questions, and even asked a friend to do a mock interview with him. On the day of the interview, he arrived fifteen minutes early, wearing a smart suit. The interviewer, a friendly woman named Ms. Carter, asked him about his previous experience and why he wanted to work for the company. Daniel explained that he admired their creative advertising campaigns and wanted to be part of a growing team. He also mentioned a project he had managed successfully at his last job, which impressed the interviewer. At the end of the meeting, Ms. Carter told him that they would contact him within a week with their decision. Daniel left feeling confident, even though he knew there were other candidates. Two days later, he received a phone call: he got the job! He was thrilled and immediately called his family to share the good news. He starts his new position next Monday, and he is already looking forward to the challenge.",
      questions: [
        lq("Pour quel poste Daniel a-t-il passé un entretien ?", ["Comptable", "Assistant marketing", "Développeur informatique", "Vendeur"], 1),
        lq("Comment s'est-il préparé ?", ["Il n'a rien fait de spécial", "Il a fait des recherches et un faux entretien avec un ami", "Il a demandé à sa mère de le préparer", "Il a annulé l'entretien"], 1),
        lq("Quel a été le résultat ?", ["Il n'a pas eu le poste", "Il a été embauché", "Il attend toujours une réponse", "Il a refusé le poste"], 1),
      ],
    },
    {
      id: "m5", level: "medium",
      text: "After living in the same small apartment for six years, Clara finally decided it was time to move. She had been looking for a new place for almost two months before finding the perfect apartment: a bright two-bedroom flat on the third floor, close to her workplace and a large park. The moving day was quite stressful. She hired a moving company to help carry the heavy furniture, but she still had many boxes to pack herself. Her friends came over to help, and together they managed to finish everything by the evening. Once all her furniture was in place, Clara realized how much bigger and more comfortable her new apartment felt compared to the old one. She spent the following weekend unpacking boxes, arranging her books on new shelves, and hanging pictures on the walls. Her neighbors introduced themselves and even invited her for coffee, which made her feel welcome right away. A month later, Clara feels completely settled. She loves waking up to natural light in the mornings and being able to walk to the park whenever she wants some fresh air. Moving was hard work, but she is very happy with her decision and doesn't regret leaving her old apartment behind.",
      questions: [
        lq("Depuis combien de temps Clara vivait-elle dans son ancien appartement ?", ["Deux ans", "Six ans", "Dix ans", "Un an"], 1),
        lq("Qui l'a aidée à déménager ?", ["Personne", "Une entreprise de déménagement et ses amis", "Seulement sa famille", "Ses collègues"], 1),
        lq("Comment se sent-elle un mois plus tard ?", ["Elle regrette son ancien appartement", "Elle se sent bien installée et heureuse", "Elle veut déménager à nouveau", "Elle est encore stressée"], 1),
      ],
    },
    {
      id: "m6", level: "medium",
      text: "On Sunday afternoon, thousands of fans gathered at the stadium to watch the local football match between the two rival teams. The atmosphere was electric before the game even started, with supporters singing songs and waving flags in the stands. The match began quite slowly, with both teams playing carefully and avoiding mistakes. However, everything changed in the second half when the home team scored a fantastic goal from outside the penalty area. The crowd went wild, jumping and shouting with joy. Ten minutes later, the visiting team equalized after a well-organized attack, which silenced the stadium for a moment. In the final minutes of the game, tension was extremely high, as both teams tried desperately to score the winning goal. Just before the referee blew the final whistle, the home team's captain scored a dramatic winning goal, sending the entire stadium into celebration. Fans hugged each other, some even cried with happiness. After the match, players thanked the supporters by walking around the pitch and applauding them. For many fans, this was one of the most exciting matches they had ever watched, and they will certainly remember it for a long time.",
      questions: [
        lq("Que s'est-il passé au début du match ?", ["Un but rapide", "Les deux équipes jouaient prudemment", "Un joueur a été blessé", "Le match a été annulé"], 1),
        lq("Combien de buts l'équipe visiteuse a-t-elle marqué ?", ["Aucun", "Un", "Deux", "Trois"], 1),
        lq("Qui a marqué le but de la victoire ?", ["Un supporter", "Le capitaine de l'équipe à domicile", "L'arbitre", "Un joueur de l'équipe visiteuse"], 1),
      ],
    },
    {
      id: "m7", level: "medium",
      text: "When Ethan turned thirty, he decided to fulfill a childhood dream: learning to play the guitar. He bought a second-hand guitar from a local shop and signed up for weekly lessons with a private teacher. At first, his fingers hurt from pressing the strings, and he found it difficult to remember where to place them for each chord. His teacher encouraged him to practice at least twenty minutes every day, even if he made mistakes. After a few weeks, Ethan noticed real progress: he could finally play simple songs without stopping constantly. He started practicing in the evenings after work, and sometimes his neighbors could hear him through the walls, although they never complained. Six months later, Ethan felt confident enough to play a song for his family during a small gathering at home. Everyone was surprised and proud of how much he had improved in such a short time. Encouraged by their reaction, he decided to keep learning new songs and even started writing his own simple melodies. Now, playing the guitar has become one of his favorite ways to relax after a stressful day, and he often says that starting this hobby was one of the best decisions he made that year.",
      questions: [
        lq("Quel instrument Ethan a-t-il choisi d'apprendre ?", ["Le piano", "La guitare", "Le violon", "La batterie"], 1),
        lq("Que lui a conseillé son professeur ?", ["De prendre des cours tous les jours", "De pratiquer au moins vingt minutes par jour", "D'arrêter s'il trouvait ça difficile", "D'acheter une guitare neuve"], 1),
        lq("Que s'est-il passé après six mois ?", ["Il a arrêté la guitare", "Il a joué une chanson devant sa famille", "Il a rejoint un groupe", "Il a vendu sa guitare"], 1),
      ],
    },
    {
      id: "m8", level: "medium",
      text: "Every Sunday morning, Isabella volunteers at a local animal shelter that takes care of abandoned dogs and cats. She started volunteering there about a year ago, after she saw an advertisement asking for help. Her main tasks include feeding the animals, cleaning their cages, and walking the dogs in the nearby park. She also helps organize adoption events, where people can meet the animals and consider giving them a new home. Isabella says that although the work can sometimes be tiring and emotionally difficult, especially when an animal has been mistreated in the past, it is also incredibly rewarding. She has seen many dogs and cats find loving families thanks to the shelter's efforts. Last month, she was particularly happy when a shy dog named Rocky, who had been at the shelter for over a year, was finally adopted by a kind family. Isabella still receives photos from Rocky's new owners, showing him playing happily in their garden. She believes that volunteering has taught her patience and compassion, and it has also connected her with other volunteers who share the same passion for animals. She encourages everyone who loves animals to consider spending a few hours a week helping at a shelter.",
      questions: [
        lq("Depuis quand Isabella fait-elle du bénévolat ?", ["Depuis un mois", "Depuis environ un an", "Depuis cinq ans", "Depuis son enfance"], 1),
        lq("Quelles sont ses tâches principales ?", ["Soigner médicalement les animaux", "Nourrir, nettoyer et promener les animaux", "Vendre des animaux", "Former d'autres bénévoles"], 1),
        lq("Qui est Rocky ?", ["Un autre bénévole", "Un chien timide qui a été adopté", "Le directeur du refuge", "Un chat perdu"], 1),
      ],
    },
    {
      id: "m9", level: "medium",
      text: "Last month, Sarah attended a three-day conference for professionals in her industry, held in a large hotel downtown. She was excited about the opportunity to learn new skills and meet people from different companies. On the first day, she attended several workshops about digital marketing strategies, taking many notes to share with her team later. During the lunch breaks, she talked with other attendees and exchanged business cards, hoping to build useful professional connections. On the second day, she gave a short presentation about a project her company had recently completed, which was well received by the audience. Some people even asked her questions afterward and complimented her on her clear explanations. In the evening, there was a networking event where Sarah met a woman working for a company she had always admired, and they discussed possible future collaboration. By the end of the conference, Sarah felt inspired and full of new ideas for her own work. She returned to the office with a notebook full of information and a list of contacts to follow up with. Her manager was impressed by everything she had learned and asked her to organize a meeting to present the most useful ideas to the rest of the team.",
      questions: [
        lq("Combien de jours a duré la conférence ?", ["Un jour", "Deux jours", "Trois jours", "Une semaine"], 2),
        lq("Qu'a fait Sarah le deuxième jour ?", ["Elle a donné une présentation", "Elle est restée à l'hôtel", "Elle est rentrée chez elle", "Elle a annulé sa participation"], 0),
        lq("Comment Sarah se sentait-elle à la fin de la conférence ?", ["Déçue", "Inspirée et pleine de nouvelles idées", "Fatiguée et sans idées", "En colère contre son manager"], 1),
      ],
    },
    {
      id: "m10", level: "medium",
      text: "At the beginning of the year, Mark decided to start exercising regularly because he wanted to feel healthier and have more energy during the day. He joined a gym near his office and hired a personal trainer to help him get started safely. During the first few weeks, he found it quite challenging, and his muscles were sore after almost every session. However, his trainer reminded him that progress takes time and encouraged him not to give up. After two months, Mark noticed that he could lift heavier weights and run for longer without getting tired so quickly. He also started eating healthier meals, with more vegetables and less sugar, which made him feel even better. His friends noticed the change too, saying that he looked more energetic and confident. Now, six months later, Mark exercises four times a week and has even started training for a small local race. He says that the hardest part was starting, but once he built the habit, it became a normal and enjoyable part of his daily routine. He hopes to inspire his colleagues at work to start their own fitness journey, and a few of them have already asked him for advice.",
      questions: [
        lq("Pourquoi Mark a-t-il commencé à faire de l'exercice ?", ["Pour perdre un pari", "Pour se sentir en meilleure santé", "Sur ordre de son médecin", "Pour un film"], 1),
        lq("Qu'a-t-il changé dans son alimentation ?", ["Il mange plus de sucre", "Il mange plus de légumes et moins de sucre", "Il ne mange presque plus rien", "Il mange seulement de la viande"], 1),
        lq("Que fait-il maintenant, six mois plus tard ?", ["Il a arrêté le sport", "Il s'entraîne quatre fois par semaine pour une course", "Il va à la salle une fois par mois", "Il est devenu entraîneur professionnel"], 1),
      ],
    },
    {
      id: "m11", level: "medium",
      text: "During their trip to Paris, Laura and her husband decided to spend an entire day visiting one of the city's most famous art museums. They arrived early in the morning to avoid the long lines that usually form later in the day. Inside, they were amazed by the huge collection of paintings and sculptures from different periods of history. Laura had studied art history at university, so she enjoyed explaining some of the paintings to her husband, who wasn't very familiar with the subject. They spent almost three hours in the main building before stopping for a light lunch at the museum's café. In the afternoon, they visited a special temporary exhibition about modern photography, which they both found fascinating, even though it was very different from the classical art they had seen earlier. Before leaving, they bought a few postcards and a book about the museum's history as souvenirs. By the end of the day, they were tired but very satisfied with their visit. Laura said it was one of the best cultural experiences of their trip, and her husband admitted that he had learned much more about art than he expected. They both agreed they would love to return one day and explore the parts of the museum they didn't have time to see.",
      questions: [
        lq("Pourquoi sont-ils arrivés tôt au musée ?", ["Pour éviter les longues files d'attente", "Parce que le musée fermait tôt", "Par erreur", "Pour rencontrer un guide"], 0),
        lq("Qu'ont-ils visité l'après-midi ?", ["Une exposition sur l'architecture", "Une exposition temporaire sur la photographie moderne", "Un autre musée", "Un marché d'art"], 1),
        lq("Comment Laura décrit-elle cette journée ?", ["Ennuyeuse", "Une des meilleures expériences culturelles du voyage", "Trop fatigante pour continuer le voyage", "Décevante"], 1),
      ],
    },
    {
      id: "m12", level: "medium",
      text: "After thinking about it for a long time, the Bennett family finally decided to adopt a rescue dog from a local shelter. They wanted to give a second chance to an animal in need, rather than buying a puppy from a breeder. At the shelter, they met several dogs, but they immediately felt a connection with a three-year-old dog named Buddy, who had been abandoned by his previous owners. The staff explained that Buddy was a little shy at first but became very affectionate once he trusted someone. The family took him home the same day and spent the first week helping him get used to his new environment. At first, Buddy was nervous around loud noises and hid under the table whenever visitors came, but with patience and love, he slowly became more confident. The children took turns walking him every day, and he quickly learned the rules of the house. Three months later, Buddy is a completely different dog: playful, loyal, and always excited to greet the family when they come home. The Bennetts often say that adopting Buddy was one of the best decisions they have ever made, and they encourage other families to consider adoption instead of buying pets from breeders.",
      questions: [
        lq("Pourquoi la famille Bennett a-t-elle choisi l'adoption ?", ["Parce que c'était moins cher", "Pour donner une seconde chance à un animal", "Sur les conseils d'un ami", "Par accident"], 1),
        lq("Comment était Buddy au début ?", ["Très agressif", "Un peu timide et nerveux", "Complètement calme", "Malade"], 1),
        lq("Comment est Buddy trois mois plus tard ?", ["Toujours effrayé", "Joueur, loyal et confiant", "Il a été rendu au refuge", "Il est parti vivre ailleurs"], 1),
      ],
    },
    {
      id: "m13", level: "medium",
      text: "After working at the same company for three years, Michael felt that it was time to ask for a raise. He had taken on more responsibilities recently and consistently received positive feedback from his manager, but his salary hadn't changed since he started. Before requesting a meeting, he prepared carefully: he made a list of his achievements, researched typical salaries for his position, and practiced what he wanted to say. During the meeting with his manager, Michael calmly explained his contributions to the company and presented the information he had gathered about industry salaries. His manager listened carefully and admitted that Michael had indeed been doing excellent work. However, she explained that she needed to discuss the budget with the company's director before making a final decision. A week later, Michael received good news: he was granted a ten percent salary increase, along with a new title reflecting his added responsibilities. He was extremely happy and felt that his preparation had really paid off. This experience taught him the importance of speaking up for himself professionally and being well prepared before important conversations at work. He now advises his younger colleagues to do the same whenever they feel they deserve more recognition for their efforts.",
      questions: [
        lq("Depuis combien de temps Michael travaillait-il pour l'entreprise ?", ["Un an", "Trois ans", "Cinq ans", "Dix ans"], 1),
        lq("Comment s'est-il préparé pour la réunion ?", ["Il n'a rien préparé", "Il a fait une liste de ses réussites et recherché les salaires du marché", "Il a démissionné avant la réunion", "Il a demandé à un collègue de parler à sa place"], 1),
        lq("Quel a été le résultat ?", ["Aucune augmentation", "Une augmentation de salaire de dix pour cent", "Il a été licencié", "Il a changé d'entreprise"], 1),
      ],
    },
    {
      id: "m14", level: "medium",
      text: "For his wife's fortieth birthday, Thomas decided to organize a surprise party without her knowing anything about it. He spent weeks planning everything secretly: he booked a small venue, contacted her closest friends and family members, and ordered a beautiful cake with her favorite flavor, chocolate and raspberry. To keep the plan hidden, he told his wife that they were simply going out for a quiet dinner together. On the night of the party, he drove her to the venue, and when she walked through the door, everyone shouted \"Surprise!\" She was completely shocked and even started crying with joy when she saw so many people she loved gathered in one place. Throughout the evening, guests shared funny stories and old photos, and her sister gave a touching speech about their childhood memories. Thomas had also prepared a slideshow with pictures from different moments of their life together, which made his wife even more emotional. She later told him that it was the best birthday surprise she had ever received and that she couldn't believe he had managed to keep it a secret for so long. Thomas admitted it wasn't easy, but seeing her happiness made all the planning completely worth it.",
      questions: [
        lq("Pour quel événement Thomas a-t-il organisé une fête ?", ["Son propre anniversaire", "Le quarantième anniversaire de sa femme", "Leur mariage", "Une promotion au travail"], 1),
        lq("Comment a-t-il caché ses plans ?", ["Il ne lui parlait plus", "Il lui a dit qu'ils allaient simplement dîner tranquillement", "Il l'a envoyée en voyage", "Il a annulé la fête plusieurs fois"], 1),
        lq("Comment sa femme a-t-elle réagi ?", ["Elle était en colère", "Elle a été très émue et a pleuré de joie", "Elle n'a rien remarqué", "Elle a refusé d'entrer"], 1),
      ],
    },
    {
      id: "m15", level: "medium",
      text: "Last Tuesday morning, Jennifer discovered that her washing machine had suddenly stopped working, right in the middle of a cycle full of dirty laundry. She tried restarting it several times, but nothing happened, so she decided to call a repair technician. Unfortunately, the earliest appointment available was three days later, which meant she had to find another solution for her laundry in the meantime. She decided to visit a laundromat near her apartment, something she hadn't done since she was a student many years ago. Although it took more time and effort than usual, she found the experience surprisingly pleasant, chatting with other customers while waiting for her clothes to dry. When the technician finally arrived, he discovered that a small part inside the machine had broken and needed to be replaced. The repair took about an hour, and thankfully it wasn't too expensive. Jennifer was relieved that her washing machine was working properly again, and she even joked with her friends that dealing with the problem had reminded her how convenient having her own machine really was. From that day on, she decided to schedule regular maintenance checks to avoid similar surprises in the future.",
      questions: [
        lq("Quel appareil est tombé en panne ?", ["Le réfrigérateur", "La machine à laver", "Le four", "La télévision"], 1),
        lq("Que fait Jennifer en attendant la réparation ?", ["Elle lave son linge à la main", "Elle va dans une laverie automatique", "Elle achète une nouvelle machine", "Elle demande à sa voisine"], 1),
        lq("Qu'a découvert le technicien ?", ["Rien n'était cassé", "Une petite pièce était cassée et devait être remplacée", "La machine était trop vieille pour être réparée", "Le problème venait de l'électricité de l'appartement"], 1),
      ],
    },
    {
      id: "m16", level: "medium",
      text: "Two years ago, a group of neighbors decided to transform an empty piece of land in their neighborhood into a community garden. At first, only a handful of people were involved, but over time, more residents joined the project, attracted by the idea of growing their own vegetables and spending time outdoors. Every Saturday morning, volunteers meet to water the plants, remove weeds, and plan what to grow next season. The garden now produces tomatoes, carrots, lettuce, and herbs, which are shared among the participants or donated to a local food bank. Beyond the vegetables, the garden has also become a place where neighbors get to know each other better. Children learn about nature by helping their parents plant seeds, while older residents enjoy sharing gardening tips they learned many years ago. Last summer, the group organized a small festival to celebrate the garden's anniversary, inviting the whole neighborhood to taste dishes made with vegetables grown there. The event was a huge success, and even people who weren't involved in the garden decided to join afterward. The community garden has clearly become more than just a place to grow food; it has brought people together and created a real sense of community in the neighborhood.",
      questions: [
        lq("Qu'est-ce que les voisins ont transformé ?", ["Un parking", "Un terrain vide", "Une ancienne école", "Un parc existant"], 1),
        lq("Que produit le jardin ?", ["Seulement des fleurs", "Des tomates, carottes, laitue et herbes", "Des fruits exotiques", "Rien pour l'instant"], 1),
        lq("Qu'a organisé le groupe l'été dernier ?", ["Un vide-grenier", "Un petit festival pour l'anniversaire du jardin", "Une compétition sportive", "Rien de spécial"], 1),
      ],
    },
    {
      id: "m17", level: "medium",
      text: "Six months ago, Camille started attending a weekly language exchange event in her city to improve her English. At these meetings, people practice different languages together, usually spending half the time speaking English and the other half speaking French. In the beginning, Camille felt shy and made many mistakes, but everyone at the event was friendly and patient, which helped her feel more comfortable. She was paired with an English speaker named David, who was learning French, and they quickly became good conversation partners. Every week, they discuss various topics, from their daily lives to current events, correcting each other's mistakes in a kind and constructive way. Camille has noticed a significant improvement in her English since she started attending these meetings; she can now understand conversations much faster and express her ideas with more confidence. David also says that his French has improved a lot thanks to their regular practice. Beyond language learning, they have also become good friends, sometimes meeting outside the event to explore the city together. Camille strongly recommends language exchange meetings to anyone trying to learn a new language, saying that practicing with real people is much more effective than just studying alone from books.",
      questions: [
        lq("Pourquoi Camille participe-t-elle à ces rencontres ?", ["Pour se faire des amis uniquement", "Pour améliorer son anglais", "Pour trouver un emploi", "Par obligation professionnelle"], 1),
        lq("Avec qui pratique-t-elle régulièrement ?", ["Un professeur", "David, qui apprend le français", "Sa sœur", "Personne en particulier"], 1),
        lq("Que recommande Camille à la fin ?", ["D'étudier seul avec des livres", "De pratiquer avec de vraies personnes lors d'échanges linguistiques", "D'arrêter d'apprendre les langues", "De ne parler qu'anglais"], 1),
      ],
    },
    {
      id: "m18", level: "medium",
      text: "When Chris and his partner bought an old house last year, they knew it would need a lot of work before it felt like home. The kitchen was outdated, the walls needed new paint, and the garden was completely overgrown. Instead of hiring a company to do everything, they decided to renovate the house themselves, room by room, to save money and enjoy the process. They started with the living room, learning how to paint walls properly by watching online tutorials. It took longer than expected, but they were proud of the result. Next, they focused on the kitchen, replacing old cabinets and installing new countertops with the help of a friend who works as a carpenter. The garden was the biggest challenge: they spent an entire weekend removing weeds and planting new flowers and vegetables. Although the renovation took almost eight months to complete, Chris says it was worth every bit of effort. They learned many new skills along the way and created a home that truly reflects their personality. Friends who visit are always impressed by how much the house has changed, and Chris enjoys telling them the story behind each room. He now feels a strong sense of pride every time he walks through the front door.",
      questions: [
        lq("Pourquoi ont-ils décidé de rénover eux-mêmes ?", ["Pour économiser de l'argent et profiter du processus", "Parce qu'ils n'avaient pas le choix", "Sur ordre d'un architecte", "Parce que c'était plus rapide"], 0),
        lq("Qui les a aidés pour la cuisine ?", ["Un ami charpentier", "Un architecte professionnel", "Personne", "Leurs parents"], 0),
        lq("Combien de temps a duré la rénovation ?", ["Un mois", "Environ huit mois", "Deux semaines", "Trois ans"], 1),
      ],
    },
    {
      id: "m2", level: "medium",
      text: "James works in an office in London for a company that specializes in financial consulting. Every day, he takes the train to work because there is a lot of traffic in the city, and driving would take almost twice as long during rush hour. His office is on the fifth floor of a big building near the city center, with large windows offering a nice view of the surrounding streets. He usually has a meeting with his team in the morning to discuss ongoing projects and set priorities for the day, and he answers emails in the afternoon, along with preparing reports for his manager. Around noon, James likes to take a short break and grab lunch at a nearby café with a few colleagues, which helps him recharge before the busier part of the afternoon. After work, James usually takes the same train home, sometimes reading a book or listening to a podcast during the journey.",
      questions: [
        lq("Comment James se rend-il au travail ?", ["En voiture", "En train", "À vélo", "À pied"], 1),
        lq("Pourquoi ne conduit-il pas ?", ["Il n'a pas de voiture", "Il y a beaucoup de circulation", "Il préfère marcher", "Son bureau est proche"], 1),
        lq("Que fait-il le matin ?", ["Il répond aux emails", "Il a une réunion", "Il cuisine", "Il dort"], 1),
      ],
    },
    {
      id: "m3", level: "medium",
      text: "Yesterday was my birthday, and it turned out to be one of the most memorable days of my life. My friends organized a surprise party at my house without me knowing anything about it, which was quite impressive considering how many people were involved in planning it. When I arrived home from work, expecting a quiet evening alone, I opened the door to find balloons, music, and a big cake waiting for me in the living room. There were balloons of every color hanging from the ceiling, and someone had even put up a banner with my name written across it. I was very happy, but also surprised because I didn't know anything about it! My best friend later explained that they had been planning it secretly for almost three weeks, coordinating with my family to make sure I wouldn't suspect anything. We spent the whole evening laughing, eating cake, and listening to my favorite songs.",
      questions: [
        lq("Qu'était hier ?", ["Un jour férié", "Son anniversaire", "Un mariage", "Une réunion"], 1),
        lq("Qui a organisé la fête ?", ["Sa famille", "Ses amis", "Ses collègues", "Ses voisins"], 1),
        lq("Comment s'est-il senti ?", ["En colère", "Ennuyé", "Heureux et surpris", "Fatigué"], 2),
      ],
    },
  ],
  hard: [
    {
      id: "h1", level: "hard",
      text: "Although the weather forecast had predicted heavy rain all weekend, Sophie decided to go hiking with her colleagues last Saturday, refusing to let the conditions ruin their long-awaited plans. They had been planning the trip for weeks, carefully choosing a scenic trail that climbed through a forest before reaching a mountain summit known for its breathtaking views, and nobody wanted to cancel it simply because of the rain. Early that morning, the group met at the trailhead, wearing waterproof jackets and carrying extra layers in case the temperature dropped further as they climbed higher. The first hour was particularly difficult, as the path became slippery and muddy, forcing everyone to walk carefully and support one another on the steeper sections. By the time they reached the top of the mountain, something remarkable happened: the sky had cleared, and they could enjoy a beautiful view over the valley below, with sunlight breaking through the remaining clouds. They stopped for almost an hour at the summit, taking photographs and sharing snacks while admiring the scenery. On the way back down, everyone agreed that the difficult climb had made the reward at the top feel even more satisfying.",
      questions: [
        lq("Quel temps faisait-il au début ?", ["Ensoleillé", "Terrible", "Froid mais clair", "Venteux"], 1),
        lq("Pourquoi n'ont-ils pas annulé la sortie ?", ["Le temps s'est vite amélioré", "Ils la planifiaient depuis des semaines", "Sophie a insisté seule", "C'était trop tard pour annuler"], 1),
        lq("Que s'est-il passé en arrivant au sommet ?", ["Il a plu plus fort", "Le ciel s'est dégagé", "Ils se sont perdus", "Ils sont rentrés chez eux"], 1),
      ],
    },
    {
      id: "h2", level: "hard",
      text: "Since she moved to a new city two years ago in search of better career opportunities, Maria has made many new friends and has learned to speak the local language quite well, something she considers one of her proudest achievements. At first, the transition was far from easy; she knew almost no one in the city and often felt overwhelmed by the unfamiliar streets, customs, and even the local sense of humor, which took her a while to fully understand. Gradually, through her job and a few local hobby groups she joined, she began building a small but meaningful circle of friends who helped her feel more at home. However, she still misses her hometown deeply, especially during the holidays, when her family gets together without her, gathering around the same table where she grew up celebrating every important occasion. Video calls help ease the distance somewhat, but she admits that nothing can truly replace being physically present during those cherished family moments. Despite this ongoing homesickness, Maria has no regrets about her decision to move, believing that the personal growth and independence she has gained were worth the emotional challenges along the way.",
      questions: [
        lq("Depuis quand Maria a-t-elle déménagé ?", ["Un an", "Deux ans", "Trois ans", "Cinq ans"], 1),
        lq("Qu'a-t-elle appris à faire ?", ["Cuisiner des plats locaux", "Parler la langue locale", "Conduire", "Pratiquer un nouveau sport"], 1),
        lq("Quand sa ville natale lui manque-t-elle le plus ?", ["Les jours de travail", "Pendant les fêtes", "En été", "Jamais"], 1),
      ],
    },
    {
      id: "h3", level: "hard",
      text: "If companies want to keep their best employees in today's competitive job market, they need to offer far more than just a good salary, according to recent studies on workplace satisfaction and employee retention. Flexible working hours, opportunities for professional growth, and a positive work environment are often just as important, if not more so, than money when employees decide whether to stay with an organization or look elsewhere. Many employees report that feeling valued and heard by their managers significantly influences their decision to remain loyal to a company, even when competing offers with higher salaries become available. Furthermore, organizations that invest in ongoing training and clear career progression paths tend to experience noticeably lower turnover rates compared to those that neglect employee development entirely. Work-life balance has also emerged as an increasingly important factor, particularly among younger generations entering the workforce, who often prioritize personal wellbeing and flexibility over traditional markers of career success such as title or salary alone. Companies that fail to adapt to these evolving expectations risk losing talented employees to competitors who better understand and address these modern priorities.",
      questions: [
        lq("Qu'est-ce qui compte aussi, selon le texte ?", ["Seulement les vacances", "Horaires flexibles, évolution et bon environnement", "Les repas gratuits", "Rien d'autre ne compte"], 1),
        lq("Quel type de texte est-ce ?", ["Une histoire personnelle", "Une opinion générale sur le travail", "Une recette", "Un bulletin météo"], 1),
        lq("Que risque-t-il de se passer sans ces éléments ?", ["Les employés pourraient partir", "Les employés auront une augmentation", "Rien ne change", "Les employés travailleront plus"], 0),
      ],
    },
    {
      id: "h4", level: "hard",
      text: "Since the pandemic transformed the way many people work, remote work has become a widely debated topic among employers and employees alike. On one hand, working from home offers undeniable advantages: employees save time and money by avoiding daily commutes, and many report feeling more productive without the constant interruptions of a traditional office environment. Parents, in particular, appreciate the flexibility to manage their family responsibilities alongside their professional duties. Companies, too, have benefited financially, as reducing office space has significantly lowered their operational costs. On the other hand, remote work is not without its drawbacks. Many employees report feeling isolated, missing the spontaneous conversations and social interactions that naturally occur in a shared workspace. Furthermore, some managers argue that collaboration and creativity suffer when teams are not physically together, making it harder to brainstorm new ideas or resolve complex problems quickly. There is also the challenge of maintaining a healthy work-life balance; without a clear separation between home and office, some workers find themselves working longer hours than they would in a traditional setting. Given these mixed outcomes, many companies have adopted a hybrid model, allowing employees to split their time between the office and home. This compromise seems to address some of the concerns on both sides, offering flexibility while preserving opportunities for in-person collaboration. Nevertheless, the debate continues, as there is no one-size-fits-all solution that works for every industry or individual.",
      questions: [
        lq("Quel est l'un des avantages du télétravail mentionné ?", ["Moins de productivité", "Gain de temps et d'argent en évitant les trajets", "Plus de réunions", "Aucun avantage"], 1),
        lq("Quel est l'un des inconvénients mentionnés ?", ["Trop de vacances", "Isolement et manque d'interactions sociales", "Salaires plus élevés", "Trop de collaboration"], 1),
        lq("Quelle solution beaucoup d'entreprises ont-elles adoptée ?", ["Le télétravail obligatoire", "Un modèle hybride entre bureau et domicile", "Le retour total au bureau", "La suppression des bureaux"], 1),
      ],
    },
    {
      id: "h5", level: "hard",
      text: "Artificial intelligence is rapidly transforming workplaces across nearly every industry, from healthcare to finance to customer service. Proponents argue that AI tools can handle repetitive, time-consuming tasks far more efficiently than humans, freeing employees to focus on more creative and strategic work. For instance, in customer service, chatbots can now answer simple questions instantly, any time of day, without needing breaks or vacations. In healthcare, AI systems can analyze medical images with remarkable accuracy, sometimes detecting diseases earlier than human doctors would. However, this rapid transformation has also raised significant concerns. Many workers fear that automation will eventually replace their jobs entirely, particularly in industries where tasks are highly repetitive or predictable. Economists disagree on how severe this impact will be; some believe that, as with previous technological revolutions, new jobs will emerge to replace those that disappear, while others warn that the transition could be far more disruptive this time, given the speed and scale of change. There are also ethical questions surrounding AI's role in the workplace. Should an algorithm be allowed to decide who gets hired or fired? Can we trust AI systems to make fair, unbiased decisions, given that they are trained on data that may reflect existing societal biases? Regardless of one's position in this debate, it seems clear that the workplace of the future will look very different from that of today.",
      questions: [
        lq("Quel avantage de l'IA est mentionné dans le service client ?", ["Elle coûte plus cher", "Les chatbots répondent instantanément à toute heure", "Elle remplace les managers", "Elle ralentit le service"], 1),
        lq("Quelle inquiétude les travailleurs expriment-ils ?", ["Trop de vacances", "La peur que l'automatisation remplace leurs emplois", "Des salaires trop élevés", "Rien de particulier"], 1),
        lq("Quelle question éthique est soulevée ?", ["Le prix des ordinateurs", "Si les algorithmes peuvent être justes dans les décisions d'embauche", "La couleur des robots", "Le nombre d'heures de travail"], 1),
      ],
    },
    {
      id: "h6", level: "hard",
      text: "When Julia decided to leave her stable corporate job to launch her own startup, most of her friends and family thought she was making a huge mistake. She had a comfortable salary, good benefits, and a clear path for career advancement, yet she felt unfulfilled, dreaming instead of building something of her own. Her idea was simple but powerful: an app that connected local farmers directly with consumers, cutting out expensive middlemen and reducing food waste. The first year was extremely difficult. Julia spent countless nights writing business plans, seeking investors, and refining her product based on user feedback. She faced rejection after rejection from potential investors who doubted whether her idea could become profitable. At one point, she nearly ran out of savings and considered giving up entirely. However, a turning point came when a small group of farmers in her area agreed to test her app, and to her relief, both farmers and customers loved it. Word spread quickly through local community groups, and within six months, her user base had grown from a handful of people to several thousand. This early success finally convinced an investor to provide the funding she desperately needed to expand her operations. Today, three years after that difficult first year, Julia's company operates in multiple regions and employs a team of twenty people. She often reflects on how close she came to quitting and credits her eventual success to persistence, adaptability, and the willingness to learn from every failure along the way.",
      questions: [
        lq("Quelle était l'idée de l'application de Julia ?", ["Connecter les agriculteurs locaux directement aux consommateurs", "Livrer des repas à domicile", "Vendre des vêtements en ligne", "Organiser des voyages"], 0),
        lq("Qu'est-ce qui a marqué un tournant dans son histoire ?", ["Elle a gagné à la loterie", "Un groupe d'agriculteurs a testé son application avec succès", "Elle a été licenciée", "Elle a arrêté son projet"], 1),
        lq("Où en est l'entreprise de Julia aujourd'hui ?", ["Elle a fermé", "Elle opère dans plusieurs régions avec vingt employés", "Elle est revenue à un seul employé", "Elle a été vendue à un concurrent"], 1),
      ],
    },
    {
      id: "h7", level: "hard",
      text: "On July 20, 1969, millions of people around the world gathered around their television sets to witness one of the most extraordinary achievements in human history: the first crewed moon landing. The mission, known as Apollo 11, had been the result of nearly a decade of intense effort, following President Kennedy's ambitious promise in 1961 to land an American on the moon before the end of the decade. Astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins had trained for years, preparing for every possible scenario during their journey. When the lunar module finally touched down on the moon's surface, mission control in Houston erupted in celebration, though the astronauts themselves remained remarkably calm, focused entirely on completing their tasks safely. A few hours later, Armstrong descended the ladder and became the first human to set foot on another celestial body, famously declaring, \"That's one small step for man, one giant leap for mankind.\" Aldrin joined him shortly after, and together they spent over two hours exploring the lunar surface, collecting rock samples and setting up scientific instruments, while Collins remained in orbit aboard the command module. The mission captured the imagination of an entire generation, symbolizing not only a scientific triumph but also a moment of unity during a turbulent period marked by the Cold War and social tensions. Decades later, the moon landing remains a powerful reminder of what humanity can achieve through determination, collaboration, and scientific innovation.",
      questions: [
        lq("En quelle année a eu lieu le premier alunissage habité ?", ["1961", "1965", "1969", "1975"], 2),
        lq("Qui a été le premier humain à marcher sur la lune ?", ["Buzz Aldrin", "Neil Armstrong", "Michael Collins", "John Kennedy"], 1),
        lq("Que symbolisait cette mission, selon le texte ?", ["Seulement une compétition militaire", "Un triomphe scientifique et un moment d'unité", "Un échec technologique", "Rien d'important"], 1),
      ],
    },
    {
      id: "h8", level: "hard",
      text: "A recent court case has drawn significant public attention due to its implications for consumer rights and corporate responsibility. The case involved a major technology company accused of misleading customers about the battery life of one of its most popular products. According to the lawsuit, the company had advertised that the battery would last up to twelve hours under normal usage, but independent testing revealed that most users experienced significantly shorter battery life, often less than eight hours. The plaintiffs, a group of consumers who purchased the product, argued that this discrepancy constituted false advertising and sought compensation for what they described as a deceptive marketing practice. During the trial, the company's lawyers maintained that the advertised battery life was based on specific testing conditions that were clearly stated in the product's technical specifications, and that variations in real-world usage were to be expected. However, the plaintiffs' legal team presented evidence suggesting that the company was aware of the discrepancy long before releasing the product, yet chose not to disclose this information to consumers. After several weeks of testimony and deliberation, the jury ultimately ruled in favor of the plaintiffs, ordering the company to pay substantial damages and to revise its advertising practices going forward. Legal experts believe this ruling could set an important precedent for future cases involving technology companies and their marketing claims.",
      questions: [
        lq("De quoi l'entreprise technologique était-elle accusée ?", ["Vol de données", "Publicité mensongère sur l'autonomie de la batterie", "Pollution industrielle", "Fraude fiscale"], 1),
        lq("Qu'a démontré l'équipe juridique des plaignants ?", ["Rien de concluant", "Que l'entreprise connaissait le problème avant la sortie du produit", "Que les plaignants avaient menti", "Que le produit n'existait pas"], 1),
        lq("Quelle a été la décision du jury ?", ["En faveur de l'entreprise", "En faveur des plaignants, avec des dommages et intérêts", "Aucune décision n'a été prise", "Un nouveau procès a été ordonné"], 1),
      ],
    },
    {
      id: "h9", level: "hard",
      text: "As cities around the world continue to grow at an unprecedented pace, urban planners face increasingly complex challenges in balancing development with sustainability and quality of life. One of the most pressing issues is housing affordability. In many major cities, property prices have risen far faster than average incomes, forcing lower and middle-income residents to move further away from city centers, often increasing their daily commute times significantly. To address this, some cities have introduced policies requiring developers to include a percentage of affordable units in new residential projects, though critics argue that these measures alone are insufficient to solve the broader crisis. Transportation is another significant concern. As populations expand, existing infrastructure, such as roads and public transit systems, often struggles to keep pace, resulting in traffic congestion and overcrowded trains and buses. Some cities have invested heavily in expanding public transportation networks and promoting alternatives such as cycling, in an effort to reduce reliance on private vehicles and lower carbon emissions. Environmental sustainability adds yet another layer of complexity to urban planning decisions. Green spaces, once considered a luxury, are now recognized as essential for both mental health and mitigating the effects of climate change, such as extreme heat in densely built areas. Consequently, many cities are integrating parks, urban gardens, and tree-planting initiatives into their development plans, even in areas with limited available space.",
      questions: [
        lq("Quel est l'un des défis majeurs mentionnés pour les urbanistes ?", ["Le manque de touristes", "L'accessibilité du logement", "Trop d'espaces verts", "Le manque de voitures"], 1),
        lq("Que font certaines villes pour les transports ?", ["Elles suppriment les transports en commun", "Elles investissent dans les transports publics et le vélo", "Elles interdisent les vélos", "Elles ne font rien"], 1),
        lq("Pourquoi les espaces verts sont-ils désormais considérés essentiels ?", ["Pour la santé mentale et lutter contre la chaleur", "Uniquement pour des raisons esthétiques", "Parce que c'est obligatoire par la loi partout", "Ils ne sont pas considérés comme essentiels"], 0),
      ],
    },
    {
      id: "h10", level: "hard",
      text: "At forty-five years old, after two decades working as a successful lawyer, Robert made a decision that surprised everyone who knew him: he quit his job to become a full-time high school teacher. For years, he had felt a growing sense of dissatisfaction with his career, despite the financial security and prestige it provided. He found himself increasingly drawn to volunteer work, particularly tutoring underprivileged teenagers in his spare time, and gradually realized that this was where his true passion lay. Making the transition was far from easy. Robert had to go back to university part-time to obtain his teaching certification, all while managing his existing responsibilities at the law firm. The pay cut was substantial, and he had to significantly adjust his lifestyle, giving up certain luxuries he had grown accustomed to over the years. His colleagues at the firm were confused, and some even questioned whether he was making a serious mistake by abandoning such a prestigious career. However, Robert remained determined, convinced that personal fulfillment mattered more to him than financial success alone. Two years into his new career, Robert describes teaching as the most rewarding decision of his life. He finds genuine joy in watching his students grow, both academically and personally, and takes particular pride in mentoring students who struggle with difficult circumstances at home. While he acknowledges that the transition required significant sacrifice, he insists that waking up excited to go to work every day is worth far more than any salary he previously earned.",
      questions: [
        lq("Quel métier Robert exerçait-il avant de devenir enseignant ?", ["Médecin", "Avocat", "Ingénieur", "Comptable"], 1),
        lq("Qu'est-ce qui l'a poussé vers l'enseignement ?", ["Un ami le lui a proposé", "Le bénévolat auprès d'adolescents défavorisés", "Il a été licencié", "Il voulait gagner plus d'argent"], 1),
        lq("Comment Robert décrit-il sa nouvelle carrière deux ans plus tard ?", ["Comme une erreur", "Comme la décision la plus enrichissante de sa vie", "Comme trop difficile financièrement pour continuer", "Il envisage de redevenir avocat"], 1),
      ],
    },
    {
      id: "h11", level: "hard",
      text: "Last month, two of the largest companies in the retail sector announced a merger that is expected to reshape the entire industry. The deal, valued at several billion dollars, will combine the extensive physical store network of one company with the advanced online delivery infrastructure of the other, creating what analysts describe as a formidable competitor capable of challenging even the largest global retailers. According to company executives, the merger will allow both businesses to reduce operational costs significantly by sharing warehouses, technology systems, and supply chains. Customers, they promise, will benefit from faster delivery times, more competitive prices, and a wider selection of products available both online and in physical stores. However, not everyone views the merger positively. Consumer advocacy groups have expressed concerns that reduced competition in the market could eventually lead to higher prices once the initial benefits of the merger fade. Regulators are currently reviewing the deal closely to determine whether it violates antitrust laws designed to prevent monopolistic practices that could harm consumers in the long run. Employees of both companies have also expressed anxiety about the merger, as similar deals in the past have often resulted in significant job losses due to overlapping roles and departments. Company representatives have attempted to reassure staff, stating that they intend to minimize layoffs wherever possible and will offer retraining programs for employees whose positions may be affected by the restructuring.",
      questions: [
        lq("Que combine cette fusion ?", ["Deux compagnies aériennes", "Un réseau de magasins physiques et une infrastructure de livraison en ligne", "Deux banques", "Deux universités"], 1),
        lq("Quelle inquiétude expriment les groupes de consommateurs ?", ["Trop de choix de produits", "Une possible hausse des prix due à la baisse de concurrence", "Trop de magasins physiques", "Rien d'inquiétant"], 1),
        lq("Que craignent les employés des deux entreprises ?", ["Une augmentation de salaire", "Des pertes d'emploi dues aux postes en double", "De nouveaux bureaux", "Rien de particulier"], 1),
      ],
    },
    {
      id: "h12", level: "hard",
      text: "When wealthy businessman Charles Whitfield passed away last year, few expected that his estate would become the center of a bitter legal dispute among his three children. According to his original will, drafted a decade earlier, his assets were to be divided equally among his children. However, shortly before his death, Charles had signed a new will that left the majority of his fortune to his youngest daughter, Elena, who had been his primary caregiver during his final years of declining health. His two other children immediately contested the validity of this new document, arguing that their father had not been mentally competent when he signed it, given his advanced age and various health conditions at the time. The case went to court, where lawyers for both sides presented extensive evidence. Elena's lawyers argued that medical records clearly showed her father remained mentally sharp until his final weeks, and that witnesses present during the signing confirmed he fully understood the document he was signing. The opposing lawyers claimed that Elena had exerted undue influence over their father during a vulnerable period in his life, using her position as caregiver to manipulate his decisions regarding the inheritance. After a lengthy trial involving testimony from doctors, close friends, and household staff, the judge ultimately ruled in favor of upholding the new will, concluding that there was insufficient evidence to prove either incompetence or manipulation. This ruling has reignited public debate about the complex legal and emotional issues surrounding inheritance disputes, particularly when family caregivers stand to benefit financially from decisions made by elderly relatives.",
      questions: [
        lq("Que prévoyait le nouveau testament de Charles ?", ["Une répartition égale entre les enfants", "La majorité de la fortune à sa plus jeune fille, Elena", "Aucun héritage pour ses enfants", "Un don à une œuvre caritative"], 1),
        lq("Que soutenaient les avocats des deux autres enfants ?", ["Que le testament était parfaitement valide", "Qu'Elena avait exercé une influence abusive sur leur père", "Que Charles n'avait pas d'enfants", "Que le testament avait disparu"], 1),
        lq("Quelle a été la décision du juge ?", ["Le nouveau testament a été annulé", "Le nouveau testament a été maintenu", "Le procès continue encore", "Les trois enfants ont hérité à parts égales"], 1),
      ],
    },
    {
      id: "h13", level: "hard",
      text: "What truly makes people happy has puzzled philosophers, psychologists, and ordinary individuals alike for centuries. Modern research suggests that, contrary to popular belief, wealth and material possessions contribute far less to long-term happiness than most people assume. Studies indicate that once basic needs are met, additional income tends to have a diminishing effect on overall life satisfaction. Instead, factors such as strong social relationships, a sense of purpose, and meaningful work appear to play a much more significant role in determining a person's wellbeing. This raises an interesting question: if money isn't the primary driver of happiness, why do so many people continue to prioritize career advancement and financial success above all else? Some psychologists argue that this behavior stems from deeply ingrained societal expectations, where success is often measured by external achievements rather than internal fulfillment. Others suggest that humans are simply prone to what researchers call \"hedonic adaptation,\" a tendency to quickly become accustomed to positive changes in circumstances, meaning that the happiness gained from a new car or a bigger house tends to fade relatively quickly, prompting individuals to constantly seek the next source of satisfaction. Interestingly, research on gratitude has shown promising results in improving overall happiness. People who regularly reflect on things they are thankful for tend to report higher levels of life satisfaction over time. Similarly, acts of kindness toward others, even small ones, have been shown to boost the happiness of both the giver and the receiver.",
      questions: [
        lq("Que suggère la recherche moderne sur l'argent et le bonheur ?", ["L'argent est le seul facteur de bonheur", "L'argent a un effet limité sur le bonheur à long terme", "Plus d'argent égale toujours plus de bonheur", "Le bonheur n'a jamais été étudié"], 1),
        lq("Qu'est-ce que « l'adaptation hédonique » ?", ["Une maladie mentale", "La tendance à s'habituer rapidement aux changements positifs", "Un régime alimentaire", "Une théorie économique"], 1),
        lq("Que montre la recherche sur la gratitude ?", ["Elle n'a aucun effet", "Elle améliore la satisfaction de vie", "Elle rend les gens plus riches", "Elle est dangereuse pour la santé"], 1),
      ],
    },
    {
      id: "h14", level: "hard",
      text: "Over the past few years, inflation has become one of the most discussed economic topics worldwide, affecting everything from grocery bills to housing costs. At its core, inflation refers to the general increase in prices over time, which reduces the purchasing power of money. Several factors can contribute to rising inflation, including increased demand for goods and services, disruptions in supply chains, and rising costs of raw materials such as oil and gas. Central banks typically respond to high inflation by raising interest rates, making borrowing more expensive in an effort to slow down spending and cool the economy. While this approach can be effective at reducing inflation over time, it also carries risks. Higher interest rates make mortgages, car loans, and business investments more expensive, which can slow economic growth and potentially lead to higher unemployment if companies struggle to expand or even maintain their current operations. This creates a delicate balancing act for policymakers, who must carefully weigh the need to control inflation against the risk of triggering a broader economic slowdown. For ordinary consumers, persistent inflation often means having to make difficult choices, cutting back on non-essential spending, or seeking additional sources of income to keep up with rising costs. Financial experts generally recommend that individuals review their budgets regularly during periods of high inflation and prioritize essential expenses.",
      questions: [
        lq("Que signifie l'inflation ?", ["Une baisse générale des prix", "Une augmentation générale des prix qui réduit le pouvoir d'achat", "Une hausse des salaires uniquement", "Un type de taxe"], 1),
        lq("Comment les banques centrales réagissent-elles souvent à une forte inflation ?", ["En baissant les taux d'intérêt", "En augmentant les taux d'intérêt", "En imprimant plus d'argent sans limite", "En ne faisant rien"], 1),
        lq("Quel risque comporte la hausse des taux d'intérêt ?", ["Aucun risque", "Un ralentissement économique et une hausse possible du chômage", "Une baisse immédiate des prix sans effet secondaire", "Une croissance économique garantie"], 1),
      ],
    },
    {
      id: "h15", level: "hard",
      text: "When Amara left her home country at the age of twenty-two, she carried only two suitcases and a small amount of savings, hoping to build a better future in a country where she knew no one. The first few months were incredibly challenging. She struggled with the language, often relying on translation apps to communicate even the simplest requests, and found herself feeling isolated despite living in a bustling city full of people. Finding stable employment proved particularly difficult, as many employers were reluctant to recognize her qualifications and professional experience from abroad. For nearly a year, she worked in a series of low-paying jobs, far below her actual skill level, while attending evening language classes to improve her fluency. Gradually, things began to change. As her language skills improved, she gained confidence in job interviews, eventually securing a position at a company willing to recognize her prior experience as an accountant. She also joined a local community group for immigrants, where she met people facing similar challenges, and these new friendships provided much-needed emotional support during difficult moments. Over the following years, Amara worked hard to advance in her career, eventually earning a promotion to a management position, something she never imagined possible during those first lonely months in her new country. She also became actively involved in mentoring newly arrived immigrants, offering the guidance and support she wished she had received when she first arrived.",
      questions: [
        lq("Quel âge avait Amara quand elle a quitté son pays ?", ["Dix-huit ans", "Vingt-deux ans", "Trente ans", "Quarante ans"], 1),
        lq("Quelle difficulté a-t-elle rencontrée pour trouver un emploi ?", ["Aucune, elle a trouvé immédiatement", "Les employeurs ne reconnaissaient pas ses qualifications étrangères", "Elle ne voulait pas travailler", "Elle n'avait pas de diplôme"], 1),
        lq("Que fait Amara aujourd'hui pour aider les autres ?", ["Rien, elle s'est isolée", "Elle accompagne de nouveaux immigrants", "Elle a quitté le pays", "Elle enseigne les langues uniquement"], 1),
      ],
    },
    {
      id: "h16", level: "hard",
      text: "In recent decades, one of the most pressing challenges facing global health has been the rise of antibiotic-resistant bacteria, often referred to as \"superbugs.\" Antibiotics, discovered in the early twentieth century, revolutionized medicine by allowing doctors to effectively treat infections that had previously been fatal. However, the widespread and sometimes excessive use of these medications, both in human healthcare and in agriculture, has accelerated the natural process by which bacteria evolve resistance to the drugs designed to kill them. When antibiotics are used unnecessarily, such as for viral infections against which they have no effect, or when patients fail to complete their prescribed treatment courses, surviving bacteria can develop mutations that make them resistant to future treatment. Over time, these resistant strains can spread within hospitals and communities, making certain infections increasingly difficult, and sometimes impossible, to treat with existing medications. In response, scientists and researchers are pursuing several strategies to address this crisis. Some are developing new antibiotics designed to overcome existing resistance mechanisms, though this process is notoriously slow and expensive. Others are exploring alternative treatments, such as bacteriophage therapy, which uses viruses that specifically target harmful bacteria without affecting beneficial ones. Public health campaigns are also working to educate both doctors and patients about the responsible use of antibiotics, emphasizing that these medications should only be used when truly necessary and always according to prescribed guidelines.",
      questions: [
        lq("Que sont les « superbugs » ?", ["Des insectes dangereux", "Des bactéries résistantes aux antibiotiques", "Un nouveau virus", "Un type de vaccin"], 1),
        lq("Qu'est-ce qui accélère la résistance aux antibiotiques ?", ["Leur usage excessif ou inapproprié", "Le manque de médecins", "Trop de vaccins", "Rien de spécifique"], 0),
        lq("Quelle alternative les chercheurs explorent-ils ?", ["Arrêter complètement la médecine moderne", "La thérapie par bactériophages", "Ignorer le problème", "Utiliser plus d'antibiotiques"], 1),
      ],
    },
    {
      id: "h17", level: "hard",
      text: "The impact of social media on mental health, particularly among young people, has become a subject of intense debate among researchers, parents, and policymakers alike. On one side of the argument, numerous studies have linked heavy social media use to increased rates of anxiety, depression, and low self-esteem among teenagers. Critics argue that constantly comparing oneself to carefully curated images of others' seemingly perfect lives can create unrealistic expectations and feelings of inadequacy. Additionally, concerns have been raised about the addictive nature of these platforms, which are often deliberately designed to maximize user engagement. On the other side, some researchers caution against oversimplifying the issue, pointing out that social media also offers meaningful benefits, particularly for young people who may feel isolated in their immediate communities. For instance, teenagers belonging to marginalized groups often find valuable support networks online, connecting with others who share similar experiences and identities. Moreover, these researchers argue that the relationship between social media use and mental health is far more complex than simple cause and effect, noting that how platforms are used, rather than simply how much time is spent on them, may be more significant. Given this complexity, many experts now recommend a balanced approach rather than outright restrictions, encouraging open conversations between parents and children about healthy social media habits and promoting digital literacy.",
      questions: [
        lq("Quel effet négatif du réseau social est mentionné ?", ["Une augmentation de l'anxiété et de la dépression chez les adolescents", "Une baisse du taux de chômage", "Une amélioration de la vue", "Rien de négatif"], 0),
        lq("Quel bénéfice potentiel des réseaux sociaux est mentionné ?", ["Ils rendent tout le monde riche", "Ils offrent un soutien à des groupes marginalisés isolés", "Ils remplacent l'école", "Ils sont totalement sans danger"], 1),
        lq("Que recommandent de nombreux experts ?", ["Interdire totalement les réseaux sociaux", "Une approche équilibrée avec dialogue et littératie numérique", "Ignorer le problème", "Supprimer toutes les applications"], 1),
      ],
    },
    {
      id: "h18", level: "hard",
      text: "Few environmental success stories are as remarkable as the recovery of the bald eagle population in North America. By the 1960s, this iconic bird had come dangerously close to extinction, with fewer than five hundred nesting pairs remaining in the United States. The primary cause of this dramatic decline was the widespread use of a pesticide called DDT, which, while effective at controlling insects, had devastating unintended consequences for birds of prey. The chemical accumulated in the eagles' bodies through the fish they consumed, causing their eggshells to become dangerously thin and often break before the chicks could hatch. Recognizing the severity of the crisis, scientists and environmental activists campaigned vigorously for stricter regulations, eventually leading to a nationwide ban on DDT in 1972. This decision, combined with legal protections under the Endangered Species Act and dedicated conservation efforts, including habitat protection and captive breeding programs, gradually allowed eagle populations to recover. The results have been extraordinary. Today, there are more than three hundred thousand bald eagles across the United States, a remarkable turnaround from the brink of extinction just decades earlier. This success story is often cited by conservationists as powerful evidence that, given sufficient political will, scientific understanding, and public support, even severely endangered species can be brought back from the edge of disappearance. However, experts caution against complacency, noting that many other species around the world continue to face similar threats without receiving the same level of attention.",
      questions: [
        lq("Quelle était la cause principale du déclin des aigles à tête blanche ?", ["La chasse excessive", "Un pesticide appelé DDT", "Le changement climatique uniquement", "Une maladie virale"], 1),
        lq("Que s'est-il passé en 1972 ?", ["Les aigles ont disparu complètement", "Le DDT a été interdit à l'échelle nationale", "Une nouvelle espèce a été découverte", "Rien d'important"], 1),
        lq("Combien d'aigles à tête blanche y a-t-il aux États-Unis aujourd'hui ?", ["Moins de 500", "Environ 10 000", "Plus de 300 000", "Ils ont totalement disparu"], 2),
      ],
    },
  ],
};
