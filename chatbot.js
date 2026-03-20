'use strict';
(function initChatbot() {

  const orb      = document.getElementById('chatbotOrb');
  const win      = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const input    = document.getElementById('chatbotInput');
  const sendBtn  = document.getElementById('chatbotSend');
  const voiceBtn = document.getElementById('chatbotVoice');
  const msgBox   = document.getElementById('chatbotMessages');
  const quickBox = document.getElementById('chatbotQuickReplies');

  if (!orb || !win) return;

  let isOpen = false, isTyping = false, greeted = false;
  let memory = [], recognition = null, listening = false;

  /* ══════════════════════════════════════════════════════════
     KNOWLEDGE BASE
     ══════════════════════════════════════════════════════════ */
  const KB = {

    /* ── Personal ── */
    name: ["My full name is **Yedlapalli Devi Namith Chowdary**, but I go by **Namith**. I'm a Full Stack Developer and ML practitioner from Vijayawada, Andhra Pradesh. 😊"],
    location: ["I'm originally from **Vijayawada, Andhra Pradesh** and currently living in **Phagwara, Punjab**, pursuing my B.Tech at Lovely Professional University. 📍"],
    contact: ["You can reach me at **namithchowdary143@gmail.com** 📧 or call **+91-6304475233**. You can also connect on LinkedIn or use the contact form on this page!"],
    email: ["📧 **namithchowdary143@gmail.com** — always happy to connect!"],
    phone: ["📱 **+91-6304475233** — feel free to call or WhatsApp!"],

    /* ── Education ── */
    education: ["I'm pursuing **B.Tech in Computer Science & Engineering** at Lovely Professional University (2023–present), currently at a **6.56 CGPA**. Before this, I scored **92% in Intermediate** (MPC) and **99% in Matriculation** from Sri Chaitanya schools in Vijayawada. 🎓"],
    cgpa: ["My current CGPA is **6.56** at LPU. I know it can be higher — I'm actively working on improving it while simultaneously building real projects, earning certifications, and solving DSA problems. I believe practical skills matter alongside grades. 📚"],
    lpu: ["**LPU (Lovely Professional University)** is a NAAC A++ rated university in Phagwara, Punjab. I'm in the School of Computer Science and Engineering, and it's been a great environment to build real skills beyond just academics."],

    /* ── Skills ── */
    skills: ["My core tech stack:\n\n💻 **Languages** — Python (80%), Java (75%), C++ (70%), C (68%)\n🌐 **Web** — HTML5, CSS3, JavaScript, Flask\n🛠️ **Tools** — MySQL, SQLite, Git, GitHub\n🤖 **ML** — Scikit-learn, Pandas, NumPy, Matplotlib\n\nI'm most confident in Python for backend/ML and Java for enterprise apps."],
    python: ["**Python** is my primary language — I've used it for Flask backends, ML models with Scikit-learn, Gradient Boosting, K-Means clustering, and data analysis with Pandas and NumPy. Proficiency: ~80%. 🐍"],
    java: ["**Java** is a strong suit — I completed a full Java + MySQL summer training at LPU covering OOP, Collections, Exception Handling, Multithreading, JDBC, and Maven. Got Grade A. I'm comfortable building database-driven Java applications. ☕"],
    javascript: ["I use **JavaScript** for frontend interactivity. I have a freeCodeCamp certification in Responsive Web Design. While JS isn't my primary language, I'm comfortable with DOM manipulation, events, and basic ES6+. 🌐"],
    ml: ["For ML, I work with **Python's Scikit-learn, Pandas, NumPy, and Matplotlib**. I've applied K-Means clustering for soil analysis and Gradient Boosting + Decision Trees for energy prediction. Real applied ML, not just theory. 🤖"],
    database: ["I work with **MySQL and SQLite** — used them in both web apps and Java projects. I know JDBC for Java-database connectivity, and I'm comfortable with query writing, normalization, and database design."],
    git: ["**Git and GitHub** are part of my daily workflow. I version-control all my projects, maintain clean commit history, and use GitHub to showcase my work. Check github.com/namithchowdary2 🐙"],

    /* ── Projects ── */
    projects: ["I've built **3 real production-level projects**:\n\n1️⃣ **Online Learning Platform** — Full-stack Flask + Python app with in-browser Python editor, real-time code execution, user auth, quizzes, progress tracking (Jan 2026)\n\n2️⃣ **ML Smart Resource Conservation** — ML model predicting home appliance energy/water usage with anomaly detection & dashboard (May 2025)\n\n3️⃣ **Soil Clustering for Precision Farming** — K-Means ML model for agricultural soil analysis to recommend crops (Apr 2025)"],
    learning_platform: ["The **Online Learning Platform** is a complete full-stack web application:\n\n🔧 **Tech**: Python, Flask, HTML/CSS/JS, SQLite\n✨ **Features**: In-browser Python code editor with real-time execution, user login/signup with session management, quiz-based assessments, progress tracking per user, clean responsive UI\n📅 Built: January 2026\n🔗 GitHub: github.com/namithchowdary2/learning-platform"],
    energy: ["The **ML Smart Resource Conservation** system:\n\n🔧 **Tech**: Python, Flask, Scikit-learn, SQLite, HTML/CSS/JS\n✨ **Features**: Gradient Boosting & Decision Tree regression for energy/water prediction, real-time anomaly detection, usage optimization recommendations, bar-graph analytics dashboard\n📈 **Result**: Helps homeowners reduce consumption by identifying anomalies\n📅 Built: May 2025 | 🔗 Live: smart-resource-conservation.vercel.app"],
    soil: ["The **Soil Clustering for Precision Farming** project:\n\n🔧 **Tech**: Python, Pandas, NumPy, Scikit-learn, Matplotlib\n✨ **Features**: K-Means clustering on soil nutrient data (N, P, K, pH, moisture), pattern recognition across soil variables, visual cluster maps, crop & fertilizer recommendations per cluster\n🌾 **Impact**: Helps farmers make data-driven decisions for better yield\n📅 Built: April 2025 | 🔗 GitHub: github.com/namithchowdary2/soil-clustering-precision-farming"],
    flask: ["I've used **Flask** as the backend for two major projects — the Learning Platform and Smart Resource Conservation. I'm comfortable with Flask routes, Jinja2 templates, form handling, SQLite integration, session management, and building REST-like backends."],

    /* ── Certifications ── */
    certifications: ["I hold **6 verified certifications**:\n\n🏅 **Oracle Cloud Infrastructure 2025 AI Foundations Associate** — valid until Oct 2027\n📊 **LinkedIn Learning** — Career Skills in Data Analytics\n⚙️ **Infosys Springboard** — Computational Theory & Finite Automata\n🤖 **Infosys Springboard** — ChatGPT-4 Prompt Engineering & LLM\n☕ **LPU** — Java & MySQL Application Development (Grade A)\n🌐 **freeCodeCamp** — Responsive Web Design (~300 hrs)"],
    oracle: ["I'm an **Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate** — certified October 24, 2025, valid until October 2027. Credential ID: 102971378OCI25AICFA. This covered AI services on OCI, machine learning concepts, and ethical AI. 🏅"],
    infosys: ["From **Infosys Springboard** (August 2025):\n• **Computational Theory: Language Principle & Finite Automata Theory** (Aug 11)\n• **ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM** (Aug 16)\n\nBoth covered foundational and applied AI/CS concepts. 📜"],
    freecodecamp: ["**freeCodeCamp Responsive Web Design** — earned October 31, 2023. Represents ~300 hours of learning covering HTML5, CSS3, Flexbox, CSS Grid, Accessibility, and Responsive Design principles. My first major web certification. 🌐"],

    /* ── Experience ── */
    experience: ["I completed a **Java and MySQL: Application Development** summer training at LPU's Centre for Professional Enhancement (June–July 2025).\n\n📚 Covered: OOP, JDBC, Multithreading, Collections, Exception Handling, Maven, Git\n🏗️ Built: Complete database-integrated Java applications\n🎖️ Result: **Grade A**\n\nThis gave me real industry-level backend development experience with Java."],

    /* ── Competitive ── */
    competitive: ["My competitive programming & achievements:\n\n🏆 **Hack-a-Throne 1.0 Finalist** — GeeksforGeeks hackathon, reached finals competing against teams nationwide (Oct 2024)\n🎖️ **Google Skill Badge** — Introduction to Responsible AI (Nov 2025)\n⚡ **LeetCode** — Actively solving DSA problems at leetcode.com/u/GKElTSRAI9/"],
    leetcode: ["My LeetCode: **leetcode.com/u/GKElTSRAI9/** — I'm actively solving Data Structures & Algorithms problems. My focus areas are Arrays, Strings, Trees, and Dynamic Programming — the core interview topics. ⚡"],
    hackathon: ["I was a **Finalist at Hack-a-Throne 1.0** — a hackathon organized by GeeksforGeeks in October 2024. Our team reached the final round, competing against teams from across India. It was a real test of building fast under pressure. 🏆"],

    /* ── Interview questions ── */
    introduce: ["**Tell me about yourself:**\n\nI'm Namith Chowdary, a B.Tech CSE student at Lovely Professional University (2023–present). I'm a full-stack developer and ML practitioner who builds real, production-level applications.\n\nI've built 3 projects — a Python learning platform, an ML energy conservation system, and a soil clustering model for precision farming. I'm certified by Oracle, Infosys, and freeCodeCamp.\n\nI'm a Hack-a-Throne finalist, active on LeetCode, and always looking for opportunities to solve real problems with clean code. 🎯"],
    strength: ["**My key strengths:**\n\n💡 **Problem-solving** — I break complex problems into small, solvable pieces. K-Means clustering for agriculture, ML for energy — real problems, practical solutions\n🔨 **Building real things** — I don't just learn theory; I ship projects\n📚 **Fast learner** — I earned 6 certifications while completing coursework and building projects simultaneously\n🔗 **Full-stack mindset** — I can handle both backend logic (Python/Java) and frontend (HTML/CSS/JS)"],
    weakness: ["**My weakness:**\n\nHonestly, my CGPA at 6.56 isn't where I want it. I invested heavily in building real projects and earning certifications, and sometimes that came at the cost of pure academic marks. But I'm actively working to balance both — because I know companies look at grades too. I see it as a work in progress, not a failure. 📈"],
    why_hire: ["**Why should we hire you?**\n\nBecause I ship things. While most students have projects on paper, I have 3 working applications — a full-stack learning platform, an ML energy dashboard live on Vercel, and a soil analysis model. I'm certified by Oracle, trained in Java enterprise development, and I solve DSA problems on LeetCode regularly.\n\nI bring practical skills, a learning mindset, and the drive to build things that actually work. 💼"],
    where_5_years: ["**Where do I see myself in 5 years?**\n\nIn 5 years, I see myself as a senior full-stack or ML engineer at a product company, ideally working on systems that solve real-world problems at scale. I want to have contributed to open-source projects, deepened my expertise in distributed systems, and possibly mentored junior developers. The foundation — Python, Java, ML, web development — is already being built now. 🎯"],
    why_cs: ["**Why did you choose Computer Science?**\n\nI've always been curious about how software solves problems. When I saw that code could build a learning platform that helps students, or predict energy usage to help homeowners, or help farmers choose better crops — that's when I knew CS was the right choice. Building things that have real impact is what drives me. 💻"],
    team_work: ["**Tell me about working in a team:**\n\nAt the Hack-a-Throne 1.0 hackathon, I worked with a team under serious time pressure to build and present a working solution. We divided responsibilities based on strengths — I handled the backend and ML component while others worked on frontend and presentation. We made it to the finals. Collaboration, clear communication, and playing to each person's strengths made it work. 🤝"],
    challenge: ["**Biggest technical challenge:**\n\nIn the ML Smart Resource Conservation project, getting the anomaly detection right was tricky — false positives were too high initially. I experimented with multiple thresholds and model configurations, compared Gradient Boosting vs Decision Tree outputs, and eventually built a hybrid approach that reduced false positives by ~40%. Debugging ML models taught me to always validate with real data, not just training metrics. 🔧"],
    internship: ["I'm actively looking for **internship opportunities** in software development, full-stack web development, or ML engineering. I bring 3 real projects, 6 certifications, Java enterprise training (Grade A), and strong Python skills. If your company has an opening, I'd love to connect! 📧 namithchowdary143@gmail.com"],

    /* ── General knowledge — interview style ── */
    oop: ["**OOP (Object-Oriented Programming)** has 4 pillars:\n\n🔷 **Encapsulation** — bundling data + methods, hiding internals\n🔷 **Inheritance** — child class inherits parent class properties\n🔷 **Polymorphism** — same interface, different implementations\n🔷 **Abstraction** — hiding complexity, showing only what's needed\n\nIn my Java training, I applied all four when building database-integrated applications. ☕"],
    oops_diff: ["**Abstraction vs Encapsulation:**\nEncapsulation = how you hide data (private fields, getters/setters)\nAbstraction = what you hide (showing only relevant behavior via interfaces/abstract classes).\n\nSimple analogy: A car's gear system is **abstracted** (you don't need to know how it works), and the engine internals are **encapsulated** (private, accessed through controls). 🚗"],
    dsa: ["**Common DSA topics for interviews:**\n\n📌 Arrays & Strings — sliding window, two pointers\n📌 Linked Lists — reverse, cycle detection\n📌 Trees & BST — traversals, height, LCA\n📌 Dynamic Programming — memoization, tabulation\n📌 Graphs — BFS, DFS, Dijkstra\n📌 Sorting — merge sort, quick sort (O(n log n))\n\nI practice these actively on LeetCode. ⚡"],
    time_complexity: ["**Big O Notation quick guide:**\n\nO(1) — Constant (array index access)\nO(log n) — Binary search\nO(n) — Linear scan\nO(n log n) — Merge sort\nO(n²) — Nested loops (bubble sort)\nO(2ⁿ) — Recursive Fibonacci\n\nAlways aim for the most efficient solution for the given constraints. 📊"],
    dbms: ["**Key DBMS concepts:**\n\n🗃️ **ACID** — Atomicity, Consistency, Isolation, Durability\n🔑 **Normalization** — 1NF, 2NF, 3NF (eliminate redundancy)\n📊 **Joins** — INNER, LEFT, RIGHT, FULL OUTER\n🔍 **Indexing** — speeds up reads, slows writes slightly\n⚡ **Transactions** — group operations, rollback on failure\n\nI've applied MySQL and SQLite in multiple real projects. 🛠️"],
    networking: ["**Basic networking concepts:**\n\n🌐 **OSI Model** — 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application\n📡 **TCP vs UDP** — TCP: reliable, ordered; UDP: fast, no guarantee\n🔒 **HTTP vs HTTPS** — HTTPS encrypts with TLS/SSL\n📍 **DNS** — translates domain names to IP addresses\n⚡ **REST API** — stateless, uses HTTP methods (GET, POST, PUT, DELETE)"],
    os: ["**Operating System concepts:**\n\n⚙️ **Process vs Thread** — Process: independent execution; Thread: lightweight, shares memory\n🔄 **Deadlock** — 4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait\n🧠 **Virtual Memory** — extends RAM using disk\n📅 **Scheduling** — FCFS, Round Robin, Priority-based\n🔐 **Mutex vs Semaphore** — Mutex: binary lock; Semaphore: counter for multiple resources"],
    system_design: ["**System Design basics:**\n\n📈 **Scalability** — horizontal (more servers) vs vertical (bigger server)\n⚖️ **Load Balancer** — distributes traffic, prevents overload\n🗄️ **Caching** — Redis/Memcached for fast reads (reduce DB load)\n🔀 **Message Queue** — async communication (Kafka, RabbitMQ)\n📦 **Microservices** — small independent services vs monolith\n\nFor a learning platform like mine, I'd scale with load balancing + Redis caching for user sessions. 🏗️"],
    python_qa: ["**Python interview essentials:**\n\n🐍 **GIL** — Global Interpreter Lock limits true parallelism in threads; use multiprocessing for CPU-bound tasks\n📦 **List vs Tuple** — List: mutable; Tuple: immutable, faster\n🔑 **Dict comprehension** — {k:v for k,v in items.items()}\n⚡ **Generators** — yield keyword, memory-efficient iterators\n🎨 **Decorators** — @wrapper to extend function behavior\n📊 **Pandas** — I use it for data cleaning, transformation, and analysis in my ML projects"],
    java_qa: ["**Java interview essentials:**\n\n☕ **JVM vs JRE vs JDK** — JDK contains JRE+tools; JRE contains JVM+libraries; JVM runs bytecode\n🔒 **String immutability** — Strings are immutable in Java for security and thread safety\n📦 **Collections** — ArrayList (fast read), LinkedList (fast insert), HashMap (O(1) lookup)\n⚙️ **Multithreading** — implements Runnable or extends Thread; use synchronized for thread safety\n🗃️ **JDBC** — Java Database Connectivity; I used it in my LPU Java training to connect to MySQL"],
    ml_concepts: ["**ML concepts I know and use:**\n\n🤖 **Supervised Learning** — labeled data; classification & regression\n🔀 **Unsupervised Learning** — unlabeled; clustering (K-Means in my soil project)\n📈 **Gradient Boosting** — ensemble of weak learners; used in my energy project\n📊 **Overfitting** — model too specific to training data; fix: regularization, cross-validation\n🎯 **Accuracy vs Precision vs Recall** — choose based on problem (Recall matters in medical; Precision in spam)\n⚙️ **Feature Engineering** — transforming raw data into meaningful features"],
    web_concepts: ["**Web development concepts:**\n\n🌐 **REST API** — stateless, resource-based URLs, HTTP methods\n🔄 **Session vs Cookie** — Session: server-side; Cookie: client-side storage\n🛡️ **CSRF Protection** — token-based protection against cross-site request forgery\n⚡ **AJAX** — asynchronous requests without page reload\n📱 **Responsive Design** — CSS media queries, Flexbox, Grid\n🔒 **HTTPS** — TLS encryption for data in transit"],

    /* ── Soft skills / behavioural ── */
    communicate: ["**Communication is key in engineering.** I believe in clear, concise documentation and talking through problems before coding. In team settings, I explain technical concepts in simple terms and always confirm alignment before implementing. Good code without good communication is half the work. 🗣️"],
    leadership: ["I demonstrated leadership at the Hack-a-Throne hackathon — I took initiative in structuring our approach, divided work by strengths, and kept the team focused when we hit bugs. Leadership for me means being the person who drives the solution forward, not just assigning tasks. 👑"],
    learn_new: ["I learn new things by building something with them immediately. When I learned K-Means clustering, I applied it to a soil dataset the same week. When I learned Flask, I built an app immediately. Theory without practice fades. GitHub is my learning log. 📚"],
    failure: ["My biggest failure was underperforming in some university exams while focusing on project work. I learned that balance is crucial — you can't ignore one aspect for another. Since then, I time-block my schedule more carefully and treat coursework with the same discipline I apply to projects. 💪"],

    /* ── Social ── */
    github: ["My GitHub: **github.com/namithchowdary2** — 6+ repos covering Python, Java, Flask, and ML. Every project I build goes there. 🐙"],
    linkedin: ["LinkedIn: **linkedin.com/in/yedlapallidevinamithchowdary** — connect with me! I post about my projects and learning. 🤝"],
    resume: ["You can **download my resume** directly from this page — hit the Resume ↓ button in the navbar or the Download Resume button in the hero section! 📄"],
    hire: ["I'm **actively looking for opportunities** — internships, entry-level roles, or project collaborations in software development or ML engineering. Best way: **namithchowdary143@gmail.com** or use the contact form. Let's build something! 🚀"],

    /* ── Fun ── */
    joke: ["Why do Java developers wear glasses? Because they don't C#! 😄 Speaking of Java — ask me about my Java training where I got an A grade!"],
    fun_fact: ["Fun fact: I scored **99% in my 10th standard exams** at Sri Chaitanya school! From 99% in school to building ML models for farmers and energy systems — quite the journey. The curiosity never stopped. 🌾"],
    hobby: ["Based on everything I do, my passion is clearly **building things that solve real problems**. When not coding, I'm on LeetCode sharpening DSA skills, learning new frameworks, or exploring ML research papers. ⚡"],

    /* ── Fallbacks ── */
    greeting: ["Hey! 👋 I'm **NamithBot** — Namith's AI interview assistant. Ask me anything about his skills, projects, experience, or even general CS concepts. I answer like he would in an interview! 🤖"],
    thanks: ["You're welcome! 😊 Feel free to ask anything else — projects, interview questions, tech concepts, or how to contact Namith!"],
    farewell: ["Take care! 👋 If you're interested in Namith's work, reach out at **namithchowdary143@gmail.com**. Hope to hear from you!"],
    fallback: ["Great question! I'm built to answer as Namith would in an interview. You can ask me about:\n\n• **Projects** (Learning Platform, ML Energy, Soil Clustering)\n• **Skills** (Python, Java, ML, Web)\n• **Interview questions** (introduce yourself, strengths, weaknesses)\n• **CS concepts** (OOP, DSA, DBMS, System Design)\n• **Certifications, Experience, Achievements**\n\nWhat would you like to know? 🎯"]
  };

  /* ── Nav map ── */
  const NAV_MAP = {
    'projects':'projects','portfolio':'projects','built':'projects',
    'skills':'skills','technologies':'skills','tech':'skills','tools':'skills',
    'certifications':'certifications','certs':'certifications','certificates':'certifications',
    'experience':'experience','training':'experience',
    'competitive':'competitive','leetcode':'competitive','hackathon':'competitive',
    'contact':'contact','reach':'contact','hire':'contact',
    'about':'about','story':'about',
    'home':'hero','top':'hero',
  };

  /* ── Keyword → KB ── */
  const KEYWORD_MAP = [
    { keys:['tell me about yourself','introduce yourself','introduce','about yourself','who is namith','who are you'],  cat:'introduce' },
    { keys:['strength','good at','best quality','what can you do','your plus'],   cat:'strength' },
    { keys:['weakness','improve','limitation','negative','bad at'],               cat:'weakness' },
    { keys:['why hire','why should we','why you','what makes you','stand out'],   cat:'why_hire' },
    { keys:['5 years','five years','future plan','career goal','where do you see'],cat:'where_5_years' },
    { keys:['why cs','why computer','why software','why engineering'],            cat:'why_cs' },
    { keys:['team','collaborate','work with others','group','teamwork'],          cat:'team_work' },
    { keys:['challenge','difficult','tough','hard problem','struggle'],           cat:'challenge' },
    { keys:['internship','job','looking for','opportunity','opening'],            cat:'internship' },
    { keys:['failure','fail','mistake','regret'],                                 cat:'failure' },
    { keys:['communicate','communication','explain'],                             cat:'communicate' },
    { keys:['leadership','lead','initiative','manage'],                           cat:'leadership' },
    { keys:['learn new','pick up','study','how do you learn'],                   cat:'learn_new' },
    { keys:['oop','object oriented','encapsulation','inheritance','polymorphism','abstraction'], cat:'oop' },
    { keys:['oops diff','abstraction vs','encapsulation vs'],                    cat:'oops_diff' },
    { keys:['dsa','data structure','algorithm','linked list','tree','graph','sorting'], cat:'dsa' },
    { keys:['big o','time complexity','space complexity','complexity'],           cat:'time_complexity' },
    { keys:['dbms','database concept','acid','normalization','join','transaction'],cat:'dbms' },
    { keys:['networking','network','osi','tcp','http','dns','rest api'],         cat:'networking' },
    { keys:['operating system','os','process','thread','deadlock','scheduling'], cat:'os' },
    { keys:['system design','scalability','load balancer','microservice','caching'],cat:'system_design' },
    { keys:['python interview','python concept','gil','generator','decorator'],  cat:'python_qa' },
    { keys:['java interview','java concept','jvm','collections','multithreading'],cat:'java_qa' },
    { keys:['machine learning concept','ml concept','supervised','unsupervised','overfitting','gradient boosting'], cat:'ml_concepts' },
    { keys:['web concept','session','cookie','csrf','ajax','rest'],              cat:'web_concepts' },
    { keys:['your name','who are you','full name','namith'],                     cat:'name' },
    { keys:['where','location','from','city','based'],                           cat:'location' },
    { keys:['contact','reach','email','phone','whatsapp'],                       cat:'contact' },
    { keys:['education','degree','university','lpu','college'],                  cat:'education' },
    { keys:['cgpa','gpa','marks','grade','score','percentage'],                  cat:'cgpa' },
    { keys:['skill','tech stack','know','language','technology'],                cat:'skills' },
    { keys:['python'],                                                            cat:'python' },
    { keys:['java'],                                                              cat:'java' },
    { keys:['javascript','js'],                                                   cat:'javascript' },
    { keys:['machine learning','ml','artificial intelligence','ai'],             cat:'ml' },
    { keys:['database','mysql','sqlite','sql'],                                  cat:'database' },
    { keys:['git','github','repo'],                                               cat:'git' },
    { keys:['project','built','made','app','platform'],                          cat:'projects' },
    { keys:['learning platform','online learning','code editor'],               cat:'learning_platform' },
    { keys:['energy','resource','conservation','appliance','water'],            cat:'energy' },
    { keys:['soil','farm','cluster','agriculture','crop'],                       cat:'soil' },
    { keys:['flask','backend'],                                                   cat:'flask' },
    { keys:['certif','cert','course','credential'],                              cat:'certifications' },
    { keys:['oracle','oci'],                                                     cat:'oracle' },
    { keys:['infosys','springboard'],                                            cat:'infosys' },
    { keys:['freecodecamp','fcc','responsive'],                                  cat:'freecodecamp' },
    { keys:['experience','training','summer'],                                   cat:'experience' },
    { keys:['leetcode','dsa problem','competitive'],                             cat:'leetcode' },
    { keys:['hackathon','hack-a-throne','geeksforgeeks','gfg'],                 cat:'hackathon' },
    { keys:['resume','cv','download'],                                           cat:'resume' },
    { keys:['linkedin'],                                                          cat:'linkedin' },
    { keys:['goal','future','aspiration','aim','plan'],                          cat:'where_5_years' },
    { keys:['interest','passion','hobby'],                                        cat:'hobby' },
    { keys:['hire','recruit','job','work with','openings'],                      cat:'hire' },
    { keys:['thank','thanks','appreciate','awesome','great','cool','nice'],      cat:'thanks' },
    { keys:['bye','goodbye','see you','later'],                                  cat:'farewell' },
    { keys:['joke','funny','laugh','humor'],                                     cat:'joke' },
    { keys:['fun fact','interesting','tell me something'],                       cat:'fun_fact' },
  ];

  /* ══════════════════════════════════════════════════════════
     OPEN / CLOSE
     ══════════════════════════════════════════════════════════ */
  orb.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key==='Escape' && isOpen) closeChat(); });

  function toggleChat() { isOpen ? closeChat() : openChat(); }
  function openChat() {
    isOpen = true;
    win.removeAttribute('hidden');
    orb.setAttribute('aria-expanded','true');
    input.focus();
    if (!greeted) {
      greeted = true;
      setTimeout(() => {
        botTypeThenSay(pick(KB.greeting));
        setTimeout(() => renderQuickReplies([
          'Introduce yourself', 'Strengths?', 'Your projects?', 'Skills?'
        ]), 1400);
      }, 300);
    }
  }
  function closeChat() {
    isOpen = false;
    win.setAttribute('hidden','');
    orb.setAttribute('aria-expanded','false');
  }

  /* ══════════════════════════════════════════════════════════
     SEND
     ══════════════════════════════════════════════════════════ */
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleSend(); }});

  function handleSend() {
    const text = input.value.trim();
    if (!text || isTyping) return;
    input.value = '';
    addMessage('user', text);
    memory.push({role:'user', content:text});
    clearQuickReplies();
    processInput(text);
  }

  /* ══════════════════════════════════════════════════════════
     PROCESS
     ══════════════════════════════════════════════════════════ */
  function processInput(text) {
    const lower = text.toLowerCase();
    const nav    = detectNav(lower);
    const answer = findAnswer(lower);

    if (nav && answer) {
      botTypeThenSay(answer, () => { scrollToSection(nav); setTimeout(()=>renderQuickReplies(ctxReplies(nav)),200); });
    } else if (nav) {
      const msg = navMsgs[nav] || `Jumping to ${nav}! 👆`;
      botTypeThenSay(msg, () => { scrollToSection(nav); setTimeout(()=>renderQuickReplies(ctxReplies(nav)),200); });
    } else if (answer) {
      botTypeThenSay(answer, () => { setTimeout(()=>renderQuickReplies(followUp(lower)),400); });
    } else {
      botTypeThenSay(pick(KB.fallback), () => {
        setTimeout(()=>renderQuickReplies(['Projects?','Skills?','Interview Q?','CS concepts?']),400);
      });
    }
  }

  function detectNav(lower) {
    const pats = [/go to (.+)/,/take me to (.+)/,/show (?:me )?(?:the )?(.+) section/,/scroll to (.+)/];
    for (const p of pats) {
      const m = lower.match(p);
      if (m) for (const [k,v] of Object.entries(NAV_MAP)) if (m[1].includes(k)) return v;
    }
    const isInfo = /tell me about|what about|know about/.test(lower);
    for (const [k,v] of Object.entries(NAV_MAP)) {
      if (k==='about' && isInfo) continue;
      if (new RegExp(`\\b${k}\\b`).test(lower)) return v;
    }
    return null;
  }

  function findAnswer(lower) {
    if (/^(hi\b|hey\b|hello\b|howdy|sup\b|yo\b|hiya|good\s*(morning|evening|afternoon))/.test(lower))
      return pick(KB.greeting);
    for (const {keys,cat} of KEYWORD_MAP)
      if (keys.some(k => lower.includes(k))) return pick(KB[cat]);
    // General knowledge fallbacks
    if (/python vs java|java vs python|best language|which language/.test(lower))
      return "**Python vs Java?**\nPython: best for ML, data science, rapid prototyping, scripting.\nJava: best for enterprise, Android, performance-critical systems.\nI use both — Python for ML projects, Java for database applications. The best language is the one that fits the problem. 🐍 vs ☕";
    if (/what is (web|app) development/.test(lower))
      return "**Web development** involves building applications that run in browsers. I work with Flask (backend), HTML/CSS/JS (frontend), and SQLite (database). Full-stack means handling both server-side and client-side. I've built 2 full-stack web applications.";
    if (/how to crack|crack interview|interview tips|interview preparation/.test(lower))
      return "**Interview prep tips:**\n\n1. Master DSA — LeetCode 150-200 problems minimum\n2. Know OOP, DBMS, OS, Networking fundamentals\n3. Build real projects (like I have) — not just tutorials\n4. Prepare STAR stories for behavioural questions\n5. Practice mock interviews out loud\n6. Know your projects inside out — every line of code\n\nI practice DSA on LeetCode daily. 🎯";
    if (/salary|package|ctc|compensation/.test(lower))
      return "For freshers in India with strong skills:\n💰 Service-based (TCS, Infosys, Wipro): ₹3.5–7 LPA\n💰 Product companies (startups): ₹8–18 LPA\n💰 FAANG-level: ₹30–80 LPA\n\nSkills + projects + DSA = better package. That's exactly what I'm working toward! 📈";
    if (/cloud|aws|azure|gcp/.test(lower))
      return "I have foundational cloud knowledge through my **Oracle Cloud Infrastructure AI Foundations certification** (valid until 2027). AWS, Azure, and GCP are on my learning roadmap — cloud deployment is the next frontier. My energy project is already deployed on Vercel! ☁️";
    if (/react|angular|vue|frontend framework/.test(lower))
      return "I currently use vanilla HTML/CSS/JS for frontend. React is on my learning list — it's the most in-demand frontend framework. My priority has been backend (Flask, Python, Java) and ML, but I'm expanding to React for more dynamic UIs. 📱";
    if (/docker|kubernetes|devops|ci cd/.test(lower))
      return "DevOps concepts I'm aware of:\n🐳 **Docker** — containerize apps for consistent deployment\n☸️ **Kubernetes** — orchestrate containers at scale\n🔄 **CI/CD** — automate testing and deployment (GitHub Actions)\n\nI currently deploy on Vercel but plan to learn Docker for more complex deployments. 🚀";
    if (/open source|contribute|github project/.test(lower))
      return "I'm actively exploring open source contribution. Currently all my repos are public on GitHub (github.com/namithchowdary2). Contributing to established open source projects is on my roadmap — starting with Python/Flask projects aligned with my experience. 🌟";
    return null;
  }

  const navMsgs = { hero:"Taking you to the top! 🚀", about:"Let me show you Namith's story! 📖", skills:"Here's his tech stack! 💻", projects:"Checking his real-world projects! 🛠️", certifications:"Looking at his credentials! 🏅", experience:"His training experience! ☕", competitive:"CP & Hackathons! ⚡", contact:"Contact section! 📬" };

  function ctxReplies(s) {
    return ({
      projects:['Learning Platform?','ML project?','Soil clustering?'],
      skills:['Python level?','Java experience?','ML libraries?'],
      certifications:['Oracle cert?','Infosys courses?','freeCodeCamp?'],
      competitive:['LeetCode profile?','Hackathon details?'],
      contact:['His email?','His LinkedIn?','Download resume?'],
      about:['Education?','Goals?','Strengths?'],
    }[s]) || ['Projects?','Skills?','Contact?'];
  }

  function followUp(l) {
    if (l.includes('project'))  return ['Learning platform?','ML energy project?','Soil clustering?'];
    if (l.includes('skill'))    return ['Python depth?','Java experience?','System design?'];
    if (l.includes('interview') || l.includes('strength') || l.includes('weakness')) return ['Why hire you?','5 year plan?','Biggest challenge?'];
    if (l.includes('concept') || l.includes('oop') || l.includes('dsa')) return ['System design?','DBMS concepts?','ML concepts?'];
    return ['His projects?','Interview Q?','Tech skills?','Contact him?'];
  }

  /* ══════════════════════════════════════════════════════════
     UI
     ══════════════════════════════════════════════════════════ */
  function addMessage(role, text) {
    const wrap = document.createElement('div');
    wrap.className = `chat-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = role==='bot' ? '' : formatText(text);
    wrap.appendChild(bubble);
    msgBox.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function formatText(t) {
    return t
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>')
      .replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener" style="color:var(--cyan);text-decoration:underline">$1</a>');
  }

  function botTypeThenSay(text, cb) {
    if (isTyping) return;
    isTyping = true;
    const tw = document.createElement('div');
    tw.className = 'chat-msg bot'; tw.id = 'typing-indicator';
    tw.innerHTML = '<div class="chat-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
    msgBox.appendChild(tw); scrollBottom();
    const delay = Math.min(500 + text.length * 10, 1800);
    setTimeout(() => {
      const ind = document.getElementById('typing-indicator');
      if (ind) ind.remove();
      const wrap = addMessage('bot','');
      const bubble = wrap.querySelector('.chat-bubble');
      memory.push({role:'assistant',content:text});
      revealText(bubble, text, () => { isTyping=false; if(cb) cb(); });
    }, delay);
  }

  function revealText(el, text, cb) {
    const html = formatText(text);
    const words = html.split(/(<[^>]+>|&[^;]+;|\s+)/);
    let i = 0;
    const step = () => {
      if (i >= words.length) { el.innerHTML = html; if(cb) cb(); return; }
      i = Math.min(i+3, words.length);
      el.innerHTML = words.slice(0,i).join('');
      scrollBottom();
      setTimeout(step, 16);
    };
    step();
  }

  function renderQuickReplies(replies) {
    quickBox.innerHTML = '';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-btn'; btn.textContent = r;
      btn.addEventListener('click', () => { input.value=r; handleSend(); });
      quickBox.appendChild(btn);
    });
  }
  function clearQuickReplies() { quickBox.innerHTML=''; }
  function scrollBottom() { msgBox.scrollTop = msgBox.scrollHeight; }
  function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

  /* ── Voice ── */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    recognition = new SR();
    recognition.continuous=false; recognition.interimResults=true; recognition.lang='en-IN';
    recognition.onstart = () => { listening=true; voiceBtn.classList.add('listening'); input.placeholder='🎤 Listening...'; };
    recognition.onresult = e => {
      const t = Array.from(e.results).map(r=>r[0].transcript).join('');
      input.value = t;
      if (e.results[e.results.length-1].isFinal) setTimeout(()=>handleSend(),400);
    };
    recognition.onerror = e => { stopListening(); };
    recognition.onend = stopListening;
    voiceBtn.addEventListener('click', () => { listening ? recognition.stop() : recognition.start(); });
  } else { voiceBtn.disabled=true; voiceBtn.style.opacity='0.3'; }

  function stopListening() { listening=false; voiceBtn.classList.remove('listening'); input.placeholder='Ask me anything...'; }

  function scrollToSection(id) {
    if (typeof window.scrollToSection==='function') window.scrollToSection(id);
    else { const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth'}); }
  }

})();
