const LANGUAGES = [
  {
    id: "c",
    name: "C",
    year: 1972,
    creator: "Dennis Ritchie",
    paradigm: "Procedural / Structured",
    typed: "Statically typed",
    compiled: true,
    color: "#5B9BD5",
    icon: "C",
    tagline: "The foundation of modern computing",
    history: {
      title: "History of C",
      content: `C was developed in 1972 at Bell Labs by Dennis Ritchie as an evolution of the B language (itself derived from BCPL). It was created to rewrite the Unix operating system, which had previously been written in assembly language.

Before C, programmers had to choose between high-level languages that were portable but slow, or assembly that was fast but non-portable. C bridged this gap — it gave programmers direct access to memory while remaining readable and portable across hardware.

The language was standardized as ANSI C in 1989 (C89/C90), then updated to C99, C11, and C17. Its influence is enormous: C++, Java, C#, JavaScript, Go, Rust, and PHP all borrowed syntax or concepts from C.`
    },
    advantages: [
      { title: "Speed & Performance", desc: "C compiles directly to machine code with minimal runtime overhead. It's the fastest general-purpose language — critical for operating systems, game engines, and embedded devices." },
      { title: "Low-Level Memory Access", desc: "Through pointers, C lets you directly read and write memory. This gives unparalleled control for system programming, drivers, and hardware interaction." },
      { title: "Portability", desc: "C compilers exist for virtually every platform — from tiny microcontrollers to supercomputers. Code written in C can be compiled and run almost anywhere." },
      { title: "Foundation for Other Languages", desc: "Learning C makes learning C++, Java, Python, and JavaScript much easier because their syntax and concepts were derived from C." },
      { title: "Small Runtime", desc: "C programs require minimal system resources, making them ideal for embedded systems, IoT devices, and environments with limited memory." },
      { title: "Rich Ecosystem of Libraries", desc: "Decades of battle-tested libraries exist for networking (libcurl), graphics (OpenGL), databases (SQLite), and more." }
    ],
    security: {
      title: "Security in C",
      features: [
        { feature: "Buffer Overflow Protection", desc: "C does NOT automatically protect against buffer overflows. Functions like strcpy() and gets() can write past array bounds. Modern practice requires manual bounds checking and using safer alternatives (strncpy, fgets).", risk: "HIGH" },
        { feature: "Memory Management", desc: "Manual malloc/free means memory leaks and use-after-free bugs are common. Tools like Valgrind and AddressSanitizer help detect these.", risk: "HIGH" },
        { feature: "No Built-in Type Safety", desc: "C allows implicit type conversions that can cause subtle bugs. Modern compilers warn about dangerous conversions with -Wall.", risk: "MEDIUM" },
        { feature: "Format String Vulnerabilities", desc: "Using user input directly in printf() format strings can leak memory contents. Always use printf(\"%s\", input) instead of printf(input).", risk: "MEDIUM" },
        { feature: "Integer Overflow", desc: "Arithmetic overflow is undefined behavior in C. Validated input and careful arithmetic prevent exploitation.", risk: "MEDIUM" }
      ],
      bestPractices: [
        "Always validate array bounds before writing",
        "Use strncpy() instead of strcpy()",
        "Free every malloc() — use RAII patterns or smart wrappers",
        "Compile with -Wall -Wextra -Werror",
        "Use static analysis tools (cppcheck, Clang Static Analyzer)",
        "Never use gets() — it was removed from C11 standard"
      ]
    },
    basics: [
      { topic: "Data Types", content: "C has fundamental types: int (whole numbers), float/double (decimals), char (single characters), and _Bool. These map directly to CPU representations — an int is typically 4 bytes in memory.", code: "int age = 25;\nfloat price = 19.99f;\nchar grade = 'A';\nint is_active = 1;  // bool-like" },
      { topic: "Variables & Constants", content: "Variables must be declared with their type before use. Constants use #define (preprocessor) or the const keyword.", code: "int count = 0;          // mutable\nconst int MAX = 100;     // read-only\n#define PI 3.14159       // preprocessor" },
      { topic: "Operators", content: "C provides arithmetic (+, -, *, /, %), relational (==, !=, <, >, <=, >=), logical (&&, ||, !), bitwise (&, |, ^, <<, >>), and assignment operators.", code: "int sum = 10 + 5;       // 15\nint mod = 10 % 3;       // 1\nint and = 1 && 0;       // 0\nint or  = 1 || 0;       // 1" },
      { topic: "Control Flow", content: "if/else for decisions, switch/case for multi-way branching, for/while/do-while for loops. C uses curly braces {} to group blocks.", code: "if (age >= 18) {\n    printf(\"Adult\");\n} else {\n    printf(\"Minor\");\n}\n\nfor (int i = 0; i < 5; i++) {\n    printf(\"%d\\n\", i);\n}" },
      { topic: "Functions", content: "Functions have a return type, name, parameters, and a body. C uses pass-by-value — modifications to parameters don't affect the caller unless pointers are passed.", code: "int add(int a, int b) {\n    return a + b;\n}\n\nvoid greet(char *name) {\n    printf(\"Hello, %s!\\n\", name);\n}" },
      { topic: "Pointers", content: "A pointer stores a memory address. Use & to get an address, * to dereference. Pointers enable dynamic memory, arrays, and efficient data passing.", code: "int x = 10;\nint *p = &x;    // p holds address of x\nprintf(\"%d\", *p);  // dereference: 10\n*p = 20;            // x is now 20" },
      { topic: "Arrays & Strings", content: "Arrays store contiguous elements of the same type. Strings in C are char arrays terminated by a null byte (\\0).", code: "int nums[5] = {10, 20, 30, 40, 50};\nchar name[] = \"Hello\";  // 6 bytes with \\0\nprintf(\"%c\", name[0]);  // 'H'" },
      { topic: "Structs", content: "Structs group related variables of different types under one name — C's way of creating custom data types before OOP existed.", code: "struct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nstruct Student s1 = {\"Jay\", 20, 3.8};" }
    ],
    useCases: ["Operating Systems (Linux, Windows kernel)", "Embedded Systems & IoT", "Game Engines (Unreal Engine core)", "Database Engines (MySQL, PostgreSQL)", "Compilers & Interpreters", "Network Drivers & Firmware", "High-Performance Computing"],
    ecosystem: {
      compilers: ["GCC", "Clang", "MSVC", "TinyCC"],
      tools: ["GDB (debugger)", "Valgrind (memory)", "Make/CMake (build)", "Git (version control)"],
      frameworks: ["POSIX APIs", "Win32 API", "libcurl", "OpenGL", "SDL2"]
    }
  },

  {
    id: "python",
    name: "Python",
    year: 1991,
    creator: "Guido van Rossum",
    paradigm: "Multi-paradigm (Object-Oriented, Functional, Procedural)",
    typed: "Dynamically typed",
    compiled: false,
    color: "#3776AB",
    icon: "Py",
    tagline: "Simple syntax, powerful possibilities",
    history: {
      title: "History of Python",
      content: `Python was created by Guido van Rossum at CWI (Centrum Wiskunde & Informatica) in the Netherlands, first released in 1991. Guido wanted a language that was easy to read, with clean syntax and the ability to handle exceptions and interface with the Amoeba operating system.

The language was named after Monty Python's Flying Circus — not the snake. Guido wanted a name that was short, unique, and slightly mysterious.

Python 2.0 (2000) added list comprehensions and garbage collection. Python 3.0 (2008) was a major cleanup that broke backward compatibility for long-term health. Today, Python 3 dominates and is the most popular programming language in the world (by many metrics), powering AI, data science, web development, and automation.`
    },
    advantages: [
      { title: "Readability & Simplicity", desc: "Python's syntax uses indentation instead of braces, enforcing clean, readable code. It's often the first language taught in universities because it reads almost like English." },
      { title: "Massive Ecosystem (PyPI)", desc: "Over 400,000 packages on PyPI: NumPy for math, Pandas for data, Django/Flask for web, TensorFlow/PyTorch for AI, Selenium for automation." },
      { title: "Rapid Development", desc: "Python's dynamic typing, built-in data structures, and concise syntax mean you can prototype ideas 3-10x faster than in C or Java." },
      { title: "AI & Data Science Leader", desc: "Python is the dominant language for machine learning, deep learning, data analysis, and scientific computing, with libraries like NumPy, Pandas, scikit-learn, and PyTorch." },
      { title: "Cross-Platform", desc: "Write once, run anywhere — Python interpreters exist for Windows, macOS, Linux, Raspberry Pi, and even web browsers (Pyodide)." },
      { title: "Huge Community", desc: "Stack Overflow, Reddit, and countless tutorials make finding help easy. Python consistently ranks #1 in developer satisfaction surveys." }
    ],
    security: {
      title: "Security in Python",
      features: [
        { feature: "Input Validation", desc: "Python doesn't sanitize input by default. Always validate and sanitize user input before processing, especially in web applications.", risk: "MEDIUM" },
        { feature: "SQL Injection Prevention", desc: "Never use string formatting in SQL queries. Use parameterized queries with placeholders (?) instead of concatenating user input.", risk: "HIGH" },
        { feature: "Dependency Security", desc: "Python's package ecosystem (pip) can pull in packages with vulnerabilities. Use tools like safety, pip-audit, and dependabot to scan dependencies.", risk: "MEDIUM" },
        { feature: "Code Injection (eval/exec)", desc: "Never call eval() or exec() on untrusted user input — it allows arbitrary code execution. Use ast.literal_eval() for safe evaluation of literals.", risk: "CRITICAL" },
        { feature: "Pickled Data Deserialization", desc: "Loading pickle files from untrusted sources can execute arbitrary code. Use JSON instead for data interchange, or validate pickle sources carefully.", risk: "HIGH" }
      ],
      bestPractices: [
        "Use parameterized SQL queries (never string formatting)",
        "Never use eval() or exec() on user input",
        "Use virtual environments to isolate dependencies",
        "Keep dependencies updated (pip-audit, safety)",
        "Use HTTPS for all web communication",
        "Hash passwords with bcrypt or argon2, never MD5/SHA1",
        "Use CSRF tokens and CORS headers in web apps"
      ]
    },
    basics: [
      { topic: "Dynamic Typing", content: "Python variables don't need type declarations — the type is determined at runtime. This makes code concise but requires careful testing.", code: "age = 25          # int\nname = \"Jay\"      # str\nprice = 19.99     # float\nis_active = True   # bool\n\n# Same variable can change type:\nval = 42\nval = \"hello\"   # now a string" },
      { topic: "Indentation as Syntax", content: "Python uses indentation (spaces or tabs) to define code blocks instead of curly braces. This enforces readable code structure.", code: "if age >= 18:\n    print(\"Adult\")\n    if age >= 65:\n        print(\"Senior\")\nelse:\n    print(\"Minor\")" },
      { topic: "Built-in Data Structures", content: "Python comes with powerful built-in structures: lists, tuples, dictionaries, and sets — no need to implement them from scratch.", code: "fruits = [\"apple\", \"banana\", \"cherry\"]  # list\ncolors = (\"red\", \"green\", \"blue\")        # tuple\nperson = {\"name\": \"Jay\", \"age\": 20}       # dict\nunique = {1, 2, 3, 3}                     # set -> {1, 2, 3}" },
      { topic: "Functions", content: "Functions use def keyword. Python supports default parameters, *args (variable positional), **kwargs (variable keyword), and lambda expressions.", code: "def add(a, b=0):\n    return a + b\n\ndef greet(*names):\n    for n in names:\n        print(f\"Hello, {n}!\")\n\ngreet(\"Alice\", \"Bob\")" },
      { topic: "List Comprehensions", content: "Concise syntax for creating lists by applying an expression to each item in a sequence, optionally filtering.", code: "squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\nnames_upper = [n.upper() for n in [\"jay\", \"sam\"]]" },
      { topic: "Classes & Objects", content: "Python supports full OOP with classes, inheritance, encapsulation (via name mangling), and polymorphism.", code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")" },
      { topic: "Error Handling", content: "Try/except/finally blocks catch exceptions. Python has a rich hierarchy of built-in exception types.", code: "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\nexcept Exception as e:\n    print(f\"Error: {e}\")\nfinally:\n    print(\"Cleanup here\")" },
      { topic: "Modules & Imports", content: "Python's import system lets you organize code across files and reuse packages from PyPI.", code: "import math\nfrom datetime import datetime\nimport numpy as np\n\nprint(math.sqrt(16))  # 4.0\nprint(datetime.now())" }
    ],
    useCases: ["Data Science & Analytics", "Machine Learning & AI (TensorFlow, PyTorch)", "Web Development (Django, Flask, FastAPI)", "Automation & Scripting", "Scientific Computing (NumPy, SciPy)", "Education & Prototyping", "DevOps & Cloud (AWS, Docker)"],
    ecosystem: {
      interpreters: ["CPython (standard)", "PyPy (fast JIT)", "MicroPython (embedded)", "Jython (JVM)"],
      tools: ["pip (packages)", "venv (environments)", "pytest (testing)", "Black (formatter)", "mypy (type checking)", "Jupyter (notebooks)"],
      frameworks: ["Django (full-stack web)", "Flask (lightweight web)", "FastAPI (async web)", "NumPy/Pandas (data)", "TensorFlow/PyTorch (AI)", "Pygame (games)"]
    }
  },

  {
    id: "javascript",
    name: "JavaScript",
    year: 1995,
    creator: "Brendan Eich",
    paradigm: "Multi-paradigm (Event-Driven, Functional, Object-Oriented)",
    typed: "Dynamically typed",
    compiled: false,
    color: "#F7DF1E",
    icon: "JS",
    tagline: "The language of the web",
    history: {
      title: "History of JavaScript",
      content: `JavaScript was created by Brendan Eich in just 10 days in May 1995, while he was at Netscape Communications. It was originally called "Mocha" then "LiveScript" before being renamed to JavaScript — a marketing move to ride Java's popularity, despite the two languages being fundamentally different.

For years, JavaScript was dismissed as a "toy language" for making buttons blink. But everything changed with AJAX (Asynchronous JavaScript and XML) in the early 2000s, which let web pages update without reloading — powering Gmail and Google Maps.

Node.js (2009) brought JavaScript to the server, making it a full-stack language. Today, JavaScript runs everywhere: browsers, servers (Node.js), mobile apps (React Native), desktop apps (Electron), and even IoT devices. It has the largest package ecosystem (npm) of any language, with over 2 million packages.`
    },
    advantages: [
      { title: "Runs Everywhere", desc: "JavaScript is the only language that runs natively in every web browser — no installation needed. With Node.js, it also runs on servers, making it a true full-stack language." },
      { title: "Massive Ecosystem (npm)", desc: "Over 2 million packages on npm. Whatever you need — React, Vue, Express, TensorFlow.js, Three.js — there's a library for it." },
      { title: "Asynchronous Programming", desc: "Built-in async/await and Promises make JavaScript excellent for handling concurrent operations like API calls, file I/O, and real-time data streams." },
      { title: "Immediate Visual Feedback", desc: "Write code in the browser console and see results instantly. This makes JavaScript one of the best languages for learning to code." },
      { title: "Full-Stack Capability", desc: "Use JavaScript for both frontend (React, Vue, Angular) and backend (Node.js, Express, Deno) — one language for the entire application." },
      { title: "Huge Community & Job Market", desc: "JavaScript consistently has the most GitHub repositories and Stack Overflow questions. It's the most in-demand language in the job market." }
    ],
    security: {
      title: "Security in JavaScript",
      features: [
        { feature: "Cross-Site Scripting (XSS)", desc: "JavaScript's biggest web vulnerability. Never insert unsanitized user content into HTML/DOM. Use textContent instead of innerHTML, and frameworks like React auto-escape by default.", risk: "HIGH" },
        { feature: "Cross-Site Request Forgery (CSRF)", desc: "Attackers trick logged-in users into making unintended requests. Use CSRF tokens, SameSite cookies, and validate origin headers.", risk: "HIGH" },
        { feature: "Prototype Pollution", desc: "Modifying Object.prototype can affect all objects. Avoid using untrusted data as object keys and freeze prototypes in sensitive code.", risk: "MEDIUM" },
        { feature: "Dependency Supply Chain Attacks", desc: "npm packages can contain malicious code. Use lockfiles, audit with npm audit, and vet packages before installing.", risk: "MEDIUM" },
        { feature: "Client-Side Data Exposure", desc: "JavaScript runs in the user's browser — never store sensitive data (API keys, passwords) in client-side code. It's all visible in DevTools.", risk: "HIGH" }
      ],
      bestPractices: [
        "Use Content Security Policy (CSP) headers",
        "Never use innerHTML with user content — use textContent or frameworks",
        "Validate and sanitize ALL user input on both client and server",
        "Use HTTPS everywhere — no exceptions",
        "Store secrets on the server, never in client JavaScript",
        "Keep npm packages updated (npm audit)",
        "Use Subresource Integrity (SRI) for CDN scripts"
      ]
    },
    basics: [
      { topic: "Variables (let, const, var)", content: "const for values that won't change, let for values that will. Avoid var — it has confusing function-scoping behavior.", code: "const PI = 3.14159;    // can't reassign\nlet count = 0;          // can reassign\ncount = 1;             // works\n// var oldWay = \"avoid\"; // function-scoped" },
      { topic: "Dynamic Typing", content: "Variables can hold any type without declaration. Use === (strict equality) to avoid type coercion surprises.", code: "let x = 42;       // number\nx = \"hello\";      // now string\nx = [1, 2, 3];    // now array\n\n42 === \"42\"   // false (strict)\n42 == \"42\"    // true  (loose — avoid)" },
      { topic: "Functions", content: "Three ways: function declarations, function expressions, and arrow functions (ES6+). Arrow functions have different `this` behavior.", code: "function add(a, b) { return a + b; }\n\nconst multiply = (a, b) => a * b;\n\nconst greet = (name) => {\n  return `Hello, ${name}!`;\n};" },
      { topic: "Objects & Arrays", content: "Objects store key-value pairs. Arrays are ordered lists. Both are reference types — copying creates a reference, not a deep copy.", code: "const person = {\n  name: \"Jay\",\n  age: 20,\n  greet() { return `Hi, ${this.name}`; }\n};\n\nconst nums = [1, 2, 3, 4, 5];\nnums.push(6);        // add to end\nnums.filter(n => n > 3);  // [4, 5, 6]" },
      { topic: "DOM Manipulation", content: "JavaScript can find, create, modify, and remove HTML elements — making web pages dynamic and interactive.", code: "document.getElementById(\"title\")\n  .textContent = \"New Title\";\n\ndocument.querySelector(\".btn\")\n  .addEventListener(\"click\", () => {\n    alert(\"Clicked!\");\n  });" },
      { topic: "Async / Await", content: "Modern async code uses async functions and await — it reads like synchronous code but doesn't block the main thread.", code: "async function fetchData() {\n  try {\n    const res = await fetch(\"/api/data\");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(\"Failed:\", err);\n  }\n}" },
      { topic: "ES6+ Features", content: "Modern JavaScript (ES2015+) added destructuring, spread operator, template literals, optional chaining, and more.", code: "const [a, b] = [1, 2];          // destructuring\nconst [first, ...rest] = [1,2,3]; // rest\nconst copy = [...original];       // spread\nconst name = user?.profile?.name; // optional chaining" },
      { topic: "Modules", content: "ES Modules let you split code across files with import/export — supported natively in browsers and Node.js.", code: "// math.js\nexport const add = (a, b) => a + b;\n\n// main.js\nimport { add } from \"./math.js\";\nconsole.log(add(3, 4));  // 7" }
    ],
    useCases: ["Web Development (Frontend & Backend)", "Single-Page Apps (React, Vue, Angular)", "Server-Side (Node.js, Express, Deno)", "Mobile Apps (React Native)", "Desktop Apps (Electron)", "Game Development (Phaser, Three.js)", "Machine Learning (TensorFlow.js)"],
    ecosystem: {
      runtimes: ["Node.js (server)", "Deno (secure runtime)", "Bun (fast runtime)", "Browser (V8, SpiderMonkey, JSC)"],
      tools: ["npm/yarn/pnpm (packages)", "Webpack/Vite (bundling)", "ESLint (linting)", "Prettier (formatting)", "Jest/Vitest (testing)", "TypeScript (types)"],
      frameworks: ["React (UI library)", "Vue.js (progressive framework)", "Angular (full framework)", "Express/Fastify (server)", "Next.js/Nuxt.js (SSR)", "React Native (mobile)", "Electron (desktop)"]
    }
  },

  {
    id: "java",
    name: "Java",
    year: 1995,
    creator: "James Gosling (Sun Microsystems)",
    paradigm: "Object-Oriented",
    typed: "Statically typed",
    compiled: true,
    color: "#ED8B00",
    icon: "Jv",
    tagline: "Write once, run anywhere",
    history: {
      title: "History of Java",
      content: `Java was developed by James Gosling at Sun Microsystems, released in 1995. Originally called "Oak" (after a tree outside Gosling's office), it was designed for interactive television but found its niche in web applets and enterprise software.

Java's killer feature was the JVM (Java Virtual Machine) — code compiles to bytecode that runs on any platform with a JVM, fulfilling the "write once, run anywhere" promise. This made it the dominant language for enterprise backends.

Java evolved significantly: generics (2004), lambdas (2014), records (2020). It powers 3 billion devices worldwide — from Android apps to banking systems to Hadoop clusters. Despite Kotlin's rise on Android and newer languages gaining ground, Java remains one of the top 3 most-used languages in enterprise.`
    },
    advantages: [
      { title: "Write Once, Run Anywhere", desc: "Java bytecode runs on any platform with a JVM — Windows, macOS, Linux, and more. This platform independence is why it dominates enterprise environments." },
      { title: "Enterprise-Grade Ecosystem", desc: "Spring Boot, Jakarta EE, Maven, and Gradle form a mature ecosystem for building scalable, maintainable enterprise applications." },
      { title: "Strong Type Safety", desc: "Static typing catches errors at compile time. Java's type system prevents many common bugs that plague dynamically-typed languages." },
      { title: "Automatic Memory Management", desc: "The JVM's garbage collector handles memory allocation and deallocation, eliminating memory leaks and dangling pointers." },
      { title: "Massive Job Market", desc: "Java has one of the largest job markets in programming, especially in enterprise, banking, and Android development." },
      { title: "Backward Compatibility", desc: "Code written in Java 8 (2014) still runs on modern JVMs. Oracle's commitment to backward compatibility protects massive enterprise investments." }
    ],
    security: {
      title: "Security in Java",
      features: [
        { feature: "Bytecode Verification", desc: "The JVM verifies bytecode before execution, preventing malformed code from accessing memory or performing unauthorized operations.", risk: "LOW" },
        { feature: "Sandboxing (SecurityManager)", desc: "Java's SecurityManager can restrict what code can do — file access, network connections, system properties. Essential for running untrusted applets.", risk: "MEDIUM" },
        { feature: "Deserialization Attacks", desc: "Deserializing untrusted objects can execute arbitrary code. Use whitelisting, avoid ObjectInputStream with untrusted data, and prefer JSON.", risk: "HIGH" },
        { feature: "JNDI Injection", desc: "JNDI lookups with untrusted URLs can load remote malicious classes (Log4Shell vulnerability). Disable remote codebase loading in JNDI.", risk: "CRITICAL" },
        { feature: "XML External Entity (XXE)", desc: "Parsing XML from untrusted sources can disclose files or execute SSRF attacks. Disable external entity processing in XML parsers.", risk: "HIGH" }
      ],
      bestPractices: [
        "Keep Java and all dependencies updated",
        "Use parameterized queries for SQL (PreparedStatement)",
        "Avoid deserializing untrusted data",
        "Disable JNDI remote codebase loading",
        "Use SAST/DAST security scanning tools",
        "Apply principle of least privilege to JVM security policies",
        "Use OWASP dependency-check for vulnerability scanning"
      ]
    },
    basics: [
      { topic: "Data Types & Variables", content: "Java has 8 primitive types (int, double, float, long, short, byte, char, boolean) and reference types (objects). All variables must be declared with a type.", code: "int age = 25;\ndouble price = 19.99;\nString name = \"Jay\";  // reference type\nboolean isActive = true;\nfinal int MAX = 100;  // constant" },
      { topic: "Classes & Objects", content: "Everything in Java is inside a class. Objects are created with 'new'. Java uses constructors, and every class inherits from Object.", code: "public class Car {\n    private String brand;\n    \n    public Car(String brand) {\n        this.brand = brand;\n    }\n    \n    public void drive() {\n        System.out.println(brand + \" moving!\");\n    }\n}\nCar myCar = new Car(\"Toyota\");" },
      { topic: "Inheritance & Interfaces", content: "Java supports single inheritance (extends) and multiple interfaces (implements). Interfaces define contracts that classes must follow.", code: "interface Drivable {\n    void drive();\n}\n\nclass Car extends Vehicle implements Drivable {\n    @Override\n    public void drive() {\n        System.out.println(\"Driving!\");\n    }\n}" },
      { topic: "Collections Framework", content: "Java's Collections API provides List, Set, Map, and Queue interfaces with implementations like ArrayList, HashMap, and LinkedList.", code: "List<String> names = new ArrayList<>();\nnames.add(\"Jay\");\nnames.add(\"Sam\");\n\nMap<String, Integer> ages = new HashMap<>();\nages.put(\"Jay\", 20);\n\nfor (String n : names) {\n    System.out.println(n);\n}" },
      { topic: "Exception Handling", content: "Java uses checked exceptions (must be caught or declared) and unchecked exceptions. try-catch-finally blocks handle errors gracefully.", code: "try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Error: \" + e.getMessage());\n} finally {\n    System.out.println(\"Cleanup\");\n}" },
      { topic: "Generics", content: "Generics enable type-safe collections and methods that work with any type, catching type errors at compile time.", code: "public class Box<T> {\n    private T value;\n    public void set(T value) { this.value = value; }\n    public T get() { return value; }\n}\n\nBox<Integer> intBox = new Box<>();\nintBox.set(42);" },
      { topic: "Streams & Lambdas", content: "Java 8+ introduced functional programming with lambda expressions and the Stream API for processing collections declaratively.", code: "List<String> names = List.of(\"Jay\", \"Sam\", \"Mia\");\n\nnames.stream()\n    .filter(n -> n.length() > 3)\n    .map(String::toUpperCase)\n    .sorted()\n    .forEach(System.out::println);" },
      { topic: "Multithreading", content: "Java has built-in thread support with Thread class, Runnable interface, and modern CompletableFuture for async operations.", code: "Thread t = new Thread(() -> {\n    System.out.println(\"Running in thread!\");\n});\nt.start();\n\nt.join(); // wait for completion" }
    ],
    useCases: ["Enterprise Backend Systems", "Android App Development", "Web Applications (Spring Boot)", "Big Data (Hadoop, Spark)", "Banking & Financial Systems", "Cloud Microservices", "Embedded Systems (Java ME)"],
    ecosystem: {
      compilers: ["javac (standard)", "ECJ (Eclipse)", "GraalVM Native Image"],
      tools: ["Maven (build)", "Gradle (build)", "IntelliJ IDEA (IDE)", "JUnit (testing)", "JProfiler (profiling)"],
      frameworks: ["Spring Boot (enterprise web)", "Jakarta EE (enterprise)", "Hibernate (ORM)", "Android SDK", "Micronaut (microservices)", "Vaadin (web UI)"]
    }
  },

  {
    id: "php",
    name: "PHP",
    year: 1995,
    creator: "Rasmus Lerdorf",
    paradigm: "Multi-paradigm (Procedural, Object-Oriented, Functional)",
    typed: "Dynamically typed",
    compiled: false,
    color: "#777BB4",
    icon: "PhP",
    tagline: "The web's original scripting language",
    history: {
      title: "History of PHP",
      content: `PHP was created by Rasmus Lerdorf in 1995 as "Personal Home Page" tools — a set of CGI scripts for tracking visits to his online resume. It evolved into PHP/FI, then PHP 3 (1998) with extensible syntax, and PHP 4 (2000) with the Zend engine.

PHP 5 (2004) brought proper OOP with classes, interfaces, and exceptions. PHP 7 (2015) doubled performance and reduced memory usage. PHP 8 (2020) added JIT compilation, union types, and attributes.

PHP powers approximately 77% of all websites with known server-side languages — including WordPress (43% of the web), Facebook, Wikipedia, and Slack. Despite criticism of its older versions, modern PHP (7/8) is fast, well-typed, and productive.`
    },
    advantages: [
      { title: "Web-Native", desc: "PHP was designed for the web. Embedding HTML, session management, form handling, and database connectivity are built-in from day one." },
      { title: "WordPress & CMS Ecosystem", desc: "WordPress, Drupal, Joomla, and Magento are all PHP-based. This gives PHP access to an enormous ecosystem of themes, plugins, and hosting." },
      { title: "Easy Deployment", desc: "PHP runs on almost any web hosting service — shared hosting, VPS, or cloud. Just upload files and it works." },
      { title: "Modern Performance", desc: "PHP 8 with OPcache and JIT compilation delivers performance comparable to Node.js and Python for web workloads." },
      { title: "Large Developer Pool", desc: "Millions of PHP developers worldwide. Easy to hire, easy to find tutorials, easy to get help." },
      { title: "Framework Maturity", desc: "Laravel and Symfony are world-class frameworks with elegant syntax,ORM, authentication, and testing built in." }
    ],
    security: {
      title: "Security in PHP",
      features: [
        { feature: "SQL Injection", desc: "PHP's mysql_* functions were notoriously insecure. Always use PDO with prepared statements or Laravel's Eloquent ORM.", risk: "HIGH" },
        { feature: "Cross-Site Scripting (XSS)", desc: "Use htmlspecialchars() to escape output, or use a framework like Laravel that auto-escapes by default.", risk: "HIGH" },
        { feature: "File Upload Vulnerabilities", desc: "Never trust user-uploaded filenames or types. Validate extensions, scan for malware, and store outside webroot.", risk: "HIGH" },
        { feature: "Remote Code Execution", desc: "eval(), system(), exec() with user input = remote code execution. Never use these with unsanitized data.", risk: "CRITICAL" },
        { feature: "Session Hijacking", desc: "Use secure session settings: httponly cookies, secure flag, session regeneration after login, and SameSite attribute.", risk: "MEDIUM" }
      ],
      bestPractices: [
        "Always use PDO with prepared statements for SQL",
        "Escape all output with htmlspecialchars() or use Laravel",
        "Validate and sanitize ALL user input with filter_var()",
        "Never use eval(), system(), or exec() with user input",
        "Use HTTPS and secure session settings",
        "Keep PHP version and Composer packages updated",
        "Use CSRF tokens on all forms (Laravel includes this)"
      ]
    },
    basics: [
      { topic: "Variables & Types", content: "Variables start with $. PHP is dynamically typed with 8 types: int, float, string, bool, array, object, null, resource.", code: "$name = \"Jay\";\n$age = 25;\n$price = 19.99;\n$active = true;\n$nothing = null;\n\n$arr = [1, 2, 3];  // array\n$assoc = [\"name\" => \"Jay\", \"age\" => 20];" },
      { topic: "String Handling", content: "Double-quoted strings interpolate variables. Single-quoted strings are literal. Heredoc for multi-line.", code: "$name = \"Jay\";\n$greeting = \"Hello, $name!\";     // interpolate\n$literal = 'Hello, $name!';       // literal\n\n// Heredoc:\n$html = <<<HTML\n<p>Hello, $name</p>\nHTML;" },
      { topic: "Arrays & Associative Arrays", content: "PHP arrays are ordered maps — they work as lists, dictionaries, and even stacks.", code: "$fruits = [\"apple\", \"banana\", \"cherry\"];\n$fruits[] = \"date\";  // append\n\n$person = [\n    \"name\" => \"Jay\",\n    \"age\" => 20\n];\n\necho $person[\"name\"];  // Jay\nforeach ($fruits as $f) echo $f;" },
      { topic: "Functions", content: "Functions use function keyword. PHP has 1000+ built-in functions. Type hints are optional but recommended.", code: "function add(int $a, int $b): int {\n    return $a + $b;\n}\n\nfunction greet(string $name = \"World\"): string {\n    return \"Hello, $name!\";\n}\n\necho greet();       // Hello, World!\necho greet(\"Jay\");  // Hello, Jay!" },
      { topic: "Classes & OOP", content: "PHP 5+ supports full OOP: classes, inheritance, interfaces, traits, and abstract classes.", code: "class Car {\n    public string $brand;\n    \n    public function __construct(string $brand) {\n        $this->brand = $brand;\n    }\n    \n    public function drive(): void {\n        echo \"$this->brand is moving!\";\n    }\n}\n\n$car = new Car(\"Toyota\");" },
      { topic: "Error Handling", content: "PHP 7+ uses Throwable interface with Error and Exception classes. try/catch/finally works like other languages.", code: "try {\n    $data = json_decode($input, true);\n    if ($data === null) {\n        throw new \\Exception(\"Invalid JSON\");\n    }\n} catch (\\Exception $e) {\n    echo \"Error: \" . $e->getMessage();\n} finally {\n    // cleanup\n}" },
      { topic: "Superglobals", content: "PHP has built-in superglobal arrays for request data, sessions, and server info.", code: "// Form data ($_GET, $_POST, $_REQUEST)\n$name = $_POST[\"name\"] ?? \"\";\n\n// Server info\n$ua = $_SERVER[\"HTTP_USER_AGENT\"];\n\n// Sessions\nsession_start();\n$_SESSION[\"user\"] = \"Jay\";\n\necho $_SESSION[\"user\"];" },
      { topic: "Include & Require", content: "PHP loads other files with include/require. Use require_once to avoid redefinition errors.", code: "// config.php\n<?php\n$db_host = \"localhost\";\n$db_name = \"myapp\";\n?>\n\n// index.php\n<?php\nrequire_once \"config.php\";\necho \"Connecting to $db_host\";\n?>" }
    ],
    useCases: ["WordPress & CMS Development", "Web Applications (Laravel, Symfony)", "E-Commerce (WooCommerce, Magento)", "APIs & REST Services", "Server-Side Rendering", "Legacy Enterprise Systems", "Rapid Prototyping"],
    ecosystem: {
      interpreters: ["PHP-FPM", "PHP CLI", "HHVM (Facebook, legacy)"],
      tools: ["Composer (packages)", "PHPUnit (testing)", "PHP-CS-Fixer (formatting)", "PHPStan (static analysis)", "Xdebug (debugger)"],
      frameworks: ["Laravel (full-stack)", "Symfony (enterprise)", "CodeIgniter (lightweight)", "CakePHP", "Slim (micro-framework)", "WordPress (CMS)"]
    }
  },

  {
    id: "html",
    name: "HTML",
    year: 1993,
    creator: "Tim Berners-Lee",
    paradigm: "Markup Language",
    typed: "N/A",
    compiled: false,
    color: "#E34F26",
    icon: "H5",
    tagline: "The backbone of every web page",
    history: {
      title: "History of HTML",
      content: `HTML was created by Tim Berners-Lee at CERN in 1993 to share documents between physicists. It evolved from HTML 2.0 (1995) through HTML5 (2014) which added semantic elements, canvas, video/audio, and modern APIs. Today HTML5 is the standard for web content.`
    },
    advantages: [
      { title: "Universal Browser Support", desc: "Every web browser in the world understands HTML. It is the universal standard for rendering content on the web." },
      { title: "Semantic Elements", desc: "HTML5 introduced semantic tags like <article>, <section>, <nav>, and <header> that improve accessibility, SEO, and code readability." },
      { title: "No Compilation Needed", desc: "HTML is interpreted directly by browsers. Write a .html file, open it in a browser, and it works — no build step required." },
      { title: "Integrates with CSS/JS", desc: "HTML provides the structure, CSS provides the style, and JavaScript provides the behavior. Together they form the complete web stack." },
      { title: "Declarative Structure", desc: "You describe what content is, not how to render it. This makes HTML easy to learn, read, and maintain." },
      { title: "Massive Community", desc: "Decades of documentation, tutorials, and community support make HTML the most accessible entry point to programming." }
    ],
    security: {
      title: "Security in HTML",
      features: [
        { feature: "Cross-Site Scripting (XSS)", desc: "If user input is inserted into HTML without sanitization, attackers can inject malicious scripts. Always escape output and use Content Security Policy headers.", risk: "HIGH" },
        { feature: "Form Security", desc: "HTML forms can submit data to any URL. Always validate input server-side, use CSRF tokens, and set proper form actions.", risk: "MEDIUM" },
        { feature: "Content Security Policy", desc: "CSP headers restrict which scripts, styles, and resources a page can load, mitigating XSS and data injection attacks.", risk: "MEDIUM" },
        { feature: "Clickjacking", desc: "Malicious sites can iframe your content to trick users. Use X-Frame-Options or CSP frame-ancestors to prevent this.", risk: "MEDIUM" },
        { feature: "Auto-fill Risks", desc: "Browsers auto-fill form fields, which can leak sensitive data to unintended forms. Use autocomplete=\"off\" on sensitive fields.", risk: "LOW" }
      ],
      bestPractices: [
        "Always escape user-provided content before inserting into HTML",
        "Use Content Security Policy (CSP) headers",
        "Set X-Frame-Options to prevent clickjacking",
        "Use autocomplete=\"off\" on sensitive form fields",
        "Validate all form input server-side, never trust client-side validation alone",
        "Use HTTPS for all form submissions",
        "Set proper form action URLs and method attributes"
      ]
    },
    basics: [
      { topic: "Elements & Tags", content: "HTML is built from elements wrapped in angle brackets. Most elements have an opening tag and a closing tag with content in between.", code: "<h1>Hello World</h1>\n<p>This is a paragraph.</p>\n<img src=\"photo.jpg\" alt=\"A photo\" />\n<a href=\"https://example.com\">Click me</a>" },
      { topic: "Document Structure", content: "Every HTML document follows a standard structure with doctype declaration, html, head, and body sections.", code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n  <p>Content goes here.</p>\n</body>\n</html>" },
      { topic: "Forms & Input", content: "Forms collect user input. HTML5 provides many input types for validation and UX — email, date, range, color, and more.", code: "<form action=\"/submit\" method=\"POST\">\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\" required>\n  \n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n  \n  <label for=\"dob\">Date of Birth:</label>\n  <input type=\"date\" id=\"dob\" name=\"dob\">\n  \n  <button type=\"submit\">Submit</button>\n</form>" },
      { topic: "Tables", content: "Tables organize data in rows and columns using table, tr, th, and td elements.", code: "<table>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n      <th>Grade</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Jay</td>\n      <td>20</td>\n      <td>A</td>\n    </tr>\n    <tr>\n      <td>Sam</td>\n      <td>22</td>\n      <td>B+</td>\n    </tr>\n  </tbody>\n</table>" },
      { topic: "Semantic HTML", content: "Semantic elements describe the meaning of content, improving accessibility, SEO, and code maintainability.", code: "<header>\n  <nav>\n    <a href=\"/home\">Home</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Blog Post Title</h2>\n    <section>\n      <p>Post content here...</p>\n    </section>\n  </article>\n  <aside>Sidebar content</aside>\n</main>\n\n<footer>\n  <p>&copy; 2024 My Website</p>\n</footer>" },
      { topic: "Media Elements", content: "HTML5 provides native elements for images, audio, video, and drawing — no plugins required.", code: "<img src=\"photo.jpg\" alt=\"Description\" width=\"600\">\n\n<video controls width=\"640\">\n  <source src=\"movie.mp4\" type=\"video/mp4\">\n  Your browser does not support video.\n</video>\n\n<audio controls>\n  <source src=\"song.mp3\" type=\"audio/mpeg\">\n  Your browser does not support audio.\n</audio>\n\n<canvas id=\"myCanvas\" width=\"400\" height=\"300\"></canvas>" },
      { topic: "Links & Navigation", content: "The <a> element creates hyperlinks. Use href for URLs, target for where to open, and download for file downloads.", code: "<a href=\"https://example.com\">External Link</a>\n<a href=\"/about\">Internal Link</a>\n<a href=\"mailto:jay@email.com\">Send Email</a>\n<a href=\"#section2\">Jump to Section</a>\n<a href=\"file.pdf\" download>Download PDF</a>\n\n<nav>\n  <ul>\n    <li><a href=\"/\">Home</a></li>\n    <li><a href=\"/courses\">Courses</a></li>\n    <li><a href=\"/contact\">Contact</a></li>\n  </ul>\n</nav>" },
      { topic: "HTML5 APIs", content: "HTML5 introduced powerful APIs for geolocation, local storage, drag-and-drop, web workers, and more.", code: "// Geolocation\nnavigator.geolocation.getCurrentPosition(pos => {\n  console.log(pos.coords.latitude);\n});\n\n// Local Storage\nlocalStorage.setItem(\"user\", \"Jay\");\nconsole.log(localStorage.getItem(\"user\"));\n\n// Drag and Drop\nelement.draggable = true;\nelement.addEventListener(\"dragstart\", e => {\n  e.dataTransfer.setData(\"text/plain\", \"hello\");\n});" },
      { topic: "Lists & Embedding", content: "Ordered lists, unordered lists, and description lists organize content. The iframe element embeds external content.", code: "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n\n<ol>\n  <li>Step one</li>\n  <li>Step two</li>\n  <li>Step three</li>\n</ol>\n\n<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>\n\n<iframe src=\"https://example.com\" width=\"600\" height=\"400\"></iframe>" }
    ],
    useCases: ["Web Pages", "Web Applications", "Email Templates", "Documentation", "Web APIs & Interfaces"],
    ecosystem: {
      standards: ["W3C", "WHATWG"],
      tools: ["W3C Validator", "Emmet", "Prettier"],
      frameworks: ["Bootstrap", "Tailwind HTML", "Semantic UI"]
    }
  },

  {
    id: "css",
    name: "CSS",
    year: 1996,
    creator: "Håkon Wium Lie & Bert Bos",
    paradigm: "Style Sheet Language",
    typed: "N/A",
    compiled: false,
    color: "#1572B6",
    icon: "CS",
    tagline: "Making the web beautiful",
    history: {
      title: "History of CSS",
      content: `CSS was proposed by Håkon Wium Lie in 1994 and developed with Bert Bos. CSS1 (1996), CSS2 (1998), CSS3 (1999+) with modules. Modern CSS includes Flexbox, Grid, custom properties, animations, and responsive design.`
    },
    advantages: [
      { title: "Separates Content from Presentation", desc: "CSS lets you change the entire look of a website by editing a single file, without touching the HTML structure." },
      { title: "Responsive Design", desc: "Media queries and modern layout systems (Flexbox, Grid) let you create layouts that adapt perfectly to any screen size." },
      { title: "Animations & Transitions", desc: "CSS can animate properties like color, position, and size without JavaScript, creating smooth visual effects." },
      { title: "Thousands of Selectors", desc: "Powerful selectors let you target specific elements by attribute, position, state, or relationship without adding classes." },
      { title: "Browser Caching", desc: "CSS files are cached by browsers, so returning visitors load pages faster without re-downloading styles." },
      { title: "No Compilation Needed", desc: "Write CSS, save it, and refresh the browser. No build tools required for basic styling." }
    ],
    security: {
      title: "Security in CSS",
      features: [
        { feature: "CSS Injection", desc: "If user input is inserted into CSS without sanitization, attackers can exfiltrate data via background-image URLs or attribute selectors.", risk: "MEDIUM" },
        { feature: "Data Exfiltration via CSS", desc: "Crafted CSS selectors can read attribute values character by character and send them to external servers via background images.", risk: "MEDIUM" },
        { feature: "Clickjacking via Overlay", desc: "CSS can create invisible overlays to trick users into clicking hidden elements. Mitigated by CSP and frame-busting techniques.", risk: "MEDIUM" },
        { feature: "Content Spoofing", desc: "CSS can hide or modify visible content, potentially misleading users about what they see on a page.", risk: "LOW" },
        { feature: "Third-Party Stylesheet Risks", desc: "External stylesheets from CDNs can be compromised, altering the appearance and potentially injecting malicious styles.", risk: "LOW" }
      ],
      bestPractices: [
        "Never insert user input directly into style attributes or style blocks",
        "Use Subresource Integrity (SRI) for external stylesheets",
        "Validate CSS output when generating styles dynamically",
        "Use Content Security Policy to restrict stylesheet sources",
        "Audit third-party stylesheets before including them",
        "Avoid using CSS to hide critical security UI elements",
        "Test CSS for data exfiltration vectors in sensitive applications"
      ]
    },
    basics: [
      { topic: "Selectors & Specificity", content: "Selectors target HTML elements for styling. Specificity determines which rule wins when multiple rules apply to the same element.", code: "/* Element selector */\np { color: blue; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 24px; }\n\n/* Descendant */\nnav a { text-decoration: none; }\n\n/* Pseudo-class */\na:hover { color: red; }\n\n/* Specificity: ID > Class > Element */\n#nav .link { color: green; }  /* beats p { color: blue; } */" },
      { topic: "Box Model", content: "Every element is a box with content, padding, border, and margin. box-sizing: border-box includes padding and border in the element's total width.", code: "div {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #333;\n  margin: 10px;\n  /* Total width: 300px (not 344px) */\n}\n\n/* Apply globally */\n*, *::before, *::after {\n  box-sizing: border-box;\n}" },
      { topic: "Flexbox Layout", content: "Flexbox provides one-dimensional layout — arranging items in a row or column with alignment, distribution, and ordering.", code: ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.item {\n  flex: 1;           /* grow to fill space */\n  flex-shrink: 0;    /* don't shrink */\n  flex-basis: 200px; /* initial size */\n}\n\n/* Center anything */\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}" },
      { topic: "Grid Layout", content: "CSS Grid provides two-dimensional layout — arranging items in rows and columns simultaneously.", code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto;\n  gap: 20px;\n}\n\n/* Span multiple columns */\n.featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}\n\n/* Named areas */\n.layout {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n  grid-template-columns: 250px 1fr;\n}" },
      { topic: "Responsive Design (Media Queries)", content: "Media queries apply different styles based on device characteristics like screen width, height, and orientation.", code: "/* Mobile first */\n.container {\n  padding: 16px;\n}\n\n/* Tablet */\n@media (min-width: 768px) {\n  .container {\n    padding: 24px;\n    max-width: 720px;\n  }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container {\n    padding: 32px;\n    max-width: 960px;\n    margin: 0 auto;\n  }\n}\n\n/* Orientation */\n@media (orientation: landscape) {\n  .hero { height: 50vh; }\n}" },
      { topic: "Animations & Transitions", content: "Transitions animate property changes smoothly. Keyframe animations create complex multi-step animations.", code: "/* Transition */\n.button {\n  background: blue;\n  transition: background 0.3s ease, transform 0.2s;\n}\n.button:hover {\n  background: darkblue;\n  transform: scale(1.05);\n}\n\n/* Keyframe Animation */\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-in {\n  animation: fadeIn 0.5s ease forwards;\n}" },
      { topic: "Custom Properties (Variables)", content: "CSS custom properties let you define reusable values that cascade through the DOM.", code: ":root {\n  --primary: #3b82f6;\n  --text: #1f2937;\n  --spacing: 16px;\n  --radius: 8px;\n}\n\n.button {\n  background: var(--primary);\n  color: var(--text);\n  padding: var(--spacing);\n  border-radius: var(--radius);\n}\n\n/* Override in a context */\n.dark-theme {\n  --primary: #60a5fa;\n  --text: #f9fafb;\n}" },
      { topic: "Positioning", content: "CSS positioning controls where elements are placed — static, relative, absolute, fixed, or sticky.", code: "/* Static (default) */\n.static { position: static; }\n\n/* Relative (offset from normal position) */\n.relative {\n  position: relative;\n  top: 10px;\n  left: 20px;\n}\n\n/* Absolute (relative to positioned ancestor) */\n.absolute {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n\n/* Fixed (relative to viewport) */\n.fixed-nav {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 1000;\n}\n\n/* Sticky (scrolls until threshold) */\n.sticky-header {\n  position: sticky;\n  top: 0;\n}" },
      { topic: "Typography & Units", content: "CSS controls fonts, sizes, spacing, and responsive units (rem, em, vw, vh, %).", code: "body {\n  font-family: 'Inter', system-ui, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n  color: #333;\n}\n\nh1 {\n  font-size: 2.5rem;   /* 40px */\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n}\n\n.container {\n  width: 90%;           /* percentage */\n  max-width: 1200px;    /* fixed max */\n  min-height: 100vh;    /* viewport height */\n  padding: clamp(1rem, 3vw, 3rem);  /* fluid */\n}" }
    ],
    useCases: ["Web Styling", "Responsive Design", "Animations", "Print Styles", "Email Styling"],
    ecosystem: {
      preprocessors: ["SASS/SCSS", "LESS", "PostCSS"],
      tools: ["Chrome DevTools", "Stylelint", "Autoprefixer"],
      frameworks: ["Tailwind CSS", "Bootstrap", "Bulma", "Foundation"]
    }
  },

  {
    id: "dsa",
    name: "DSA",
    year: 1970,
    creator: "Edsger Dijkstra, Donald Knuth, etc.",
    paradigm: "Computer Science Fundamentals",
    typed: "N/A",
    compiled: false,
    color: "#8B5CF6",
    icon: "DS",
    tagline: "The foundation of efficient programming",
    history: {
      title: "History of DSA",
      content: `Data structures and algorithms form the backbone of computer science. Key contributors include Edsger Dijkstra (shortest path), Donald Knuth (The Art of Computer Programming), Tony Hoare (quicksort), and many others. DSA knowledge enables writing efficient, scalable code regardless of language.`
    },
    advantages: [
      { title: "Essential for Technical Interviews", desc: "Every major tech company tests DSA knowledge in interviews. Mastering these concepts opens doors to top engineering roles." },
      { title: "Improves Problem-Solving Skills", desc: "DSA teaches you to break complex problems into manageable pieces and choose the right approach for each situation." },
      { title: "Optimizes Performance", desc: "Choosing the right data structure or algorithm can reduce runtime from hours to milliseconds — the difference between O(n^2) and O(n log n)." },
      { title: "Language-Agnostic Knowledge", desc: "DSA concepts apply to any programming language. Once learned, you can implement them in C, Python, Java, or anything else." },
      { title: "Critical for System Design", desc: "Understanding how data structures work under the hood is essential for designing databases, caches, and distributed systems." },
      { title: "Foundation for All Software", desc: "Every piece of software uses data structures and algorithms — arrays, hash maps, trees, sorting, and searching are everywhere." }
    ],
    security: {
      title: "Security Implications of DSA",
      features: [
        { feature: "Algorithmic Complexity Attacks", desc: "Attackers can craft inputs that trigger worst-case performance in hash tables (hash flooding) or sorting algorithms, causing denial of service.", risk: "HIGH" },
        { feature: "Hash Collision Attacks", desc: "Predictable hash functions allow attackers to create many colliding keys, degrading hash table performance from O(1) to O(n).", risk: "MEDIUM" },
        { feature: "Stack Overflow via Recursion", desc: "Deep recursion without proper base cases can overflow the call stack, causing crashes or denial of service.", risk: "MEDIUM" },
        { feature: "Memory Exhaustion", desc: "Unbounded data structures (linked lists, trees) without size limits can consume all available memory when processing untrusted input.", risk: "MEDIUM" },
        { feature: "Side-Channel Timing Attacks", desc: "Constant-time algorithms are essential for cryptographic operations. Variable-time comparisons leak secret information through timing.", risk: "HIGH" }
      ],
      bestPractices: [
        "Use randomized hash functions to prevent hash flooding",
        "Set maximum recursion depth limits",
        "Impose size limits on all data structures processing untrusted input",
        "Use constant-time comparison for secrets (timing-safe equality)",
        "Analyze time and space complexity before deployment",
        "Use iterative solutions for deep recursion scenarios",
        "Test with adversarial inputs that trigger worst-case behavior"
      ]
    },
    basics: [
      { topic: "What is an Algorithm", content: "An algorithm is a step-by-step procedure for solving a problem. Good algorithms are correct, efficient, and finite. They are described in pseudocode or a programming language.", code: "// Algorithm: Find maximum in array\nfunction findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}\n\nfindMax([3, 7, 2, 9, 1]);  // 9" },
      { topic: "Big-O Notation", content: "Big-O describes how an algorithm scales with input size. Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n^2) quadratic.", code: "// O(1) - Constant time\nfunction getFirst(arr) { return arr[0]; }\n\n// O(n) - Linear time\nfunction findItem(arr, target) {\n  for (let item of arr) {\n    if (item === target) return true;\n  }\n  return false;\n}\n\n// O(n^2) - Quadratic time\nfunction hasDuplicate(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = i + 1; j < arr.length; j++)\n      if (arr[i] === arr[j]) return true;\n  return false;\n}\n\n// O(log n) - Logarithmic time\nfunction binarySearch(sorted, target) {\n  let lo = 0, hi = sorted.length - 1;\n  while (lo <= hi) {\n    let mid = Math.floor((lo + hi) / 2);\n    if (sorted[mid] === target) return mid;\n    if (sorted[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}" },
      { topic: "Arrays & Linked Lists", content: "Arrays store elements in contiguous memory with O(1) access by index. Linked lists store elements in nodes with pointers, allowing O(1) insertion/deletion at known positions.", code: "// Array - O(1) access, O(n) insertion\nlet arr = [10, 20, 30, 40];\narr.push(50);      // O(1) amortized\narr.splice(2, 1);  // O(n) - shift elements\n\n// Linked List concept\nclass Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() { this.head = null; }\n  prepend(value) {\n    const node = new Node(value);\n    node.next = this.head;\n    this.head = node;  // O(1)\n  }\n  append(value) {\n    const node = new Node(value);\n    let curr = this.head;\n    while (curr.next) curr = curr.next;\n    curr.next = node;  // O(n)\n  }\n}" },
      { topic: "Stacks & Queues", content: "Stacks are LIFO (Last In First Out) — push/pop from the top. Queues are FIFO (First In First Out) — enqueue at back, dequeue from front.", code: "// Stack\nlet stack = [];\nstack.push(1);    // push: [1]\nstack.push(2);    // push: [1, 2]\nstack.pop();      // pop: 2, stack: [1]\n\n// Queue\nlet queue = [];\nqueue.push(1);    // enqueue: [1]\nqueue.push(2);    // enqueue: [1, 2]\nqueue.shift();    // dequeue: 1, queue: [2]\n\n// Stack use: undo, function call stack, DFS\n// Queue use: BFS, task scheduling, print queue" },
      { topic: "Trees & Graphs", content: "Trees are hierarchical structures with a root node and children. Binary trees have at most 2 children. Graphs have nodes connected by edges (can have cycles).", code: "class TreeNode {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\n// Binary Search Tree\nfunction insert(root, value) {\n  if (!root) return new TreeNode(value);\n  if (value < root.value)\n    root.left = insert(root.left, value);\n  else\n    root.right = insert(root.right, value);\n  return root;\n}\n\n// Graph (adjacency list)\nconst graph = {\n  'A': ['B', 'C'],\n  'B': ['A', 'D'],\n  'C': ['A', 'D'],\n  'D': ['B', 'C']\n};" },
      { topic: "Sorting Algorithms", content: "Sorting arranges elements in order. Different algorithms have different time/space tradeoffs. Quicksort is O(n log n) average, bubblesort is O(n^2).", code: "// Bubble Sort - O(n^2)\nfunction bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++)\n    for (let j = 0; j < arr.length - 1 - i; j++)\n      if (arr[j] > arr[j + 1])\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n  return arr;\n}\n\n// Quick Sort - O(n log n) average\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = arr.filter(x => x < pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}" },
      { topic: "Searching Algorithms", content: "Binary search finds items in sorted data in O(log n) by repeatedly halving the search space. Linear search checks every element in O(n).", code: "// Binary Search - O(log n)\nfunction binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    let mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n\nbinarySearch([1, 3, 5, 7, 9, 11], 7);  // 3\n\n// Linear Search - O(n)\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++)\n    if (arr[i] === target) return i;\n  return -1;\n}" },
      { topic: "Recursion & Dynamic Programming", content: "Recursion solves problems by breaking them into smaller subproblems. Dynamic programming caches results to avoid recomputation — turning exponential into polynomial time.", code: "// Recursion: Fibonacci (naive) - O(2^n)\nfunction fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n\n// Dynamic Programming: Fibonacci - O(n)\nfunction fibDP(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++)\n    dp[i] = dp[i - 1] + dp[i - 2];\n  return dp[n];\n}\n\n// Memoized version\nfunction fibMemo(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n  return memo[n];\n}" },
      { topic: "Hash Tables", content: "Hash tables map keys to values using a hash function for O(1) average lookup. Collisions are handled by chaining or open addressing.", code: "// Hash Table concept (JavaScript object/Map)\nconst map = new Map();\nmap.set(\"apple\", 3);   // O(1)\nmap.set(\"banana\", 5);  // O(1)\nmap.get(\"apple\");      // O(1) -> 3\nmap.has(\"banana\");      // O(1) -> true\n\n// Hash function concept\nfunction hash(key, tableSize) {\n  let hash = 0;\n  for (let i = 0; i < key.length; i++) {\n    hash = (hash * 31 + key.charCodeAt(i)) % tableSize;\n  }\n  return hash;\n}" }
    ],
    useCases: ["Technical Interviews", "System Optimization", "Competitive Programming", "Database Indexing", "Networking Protocols", "Operating Systems"],
    ecosystem: {
      books: ["CLRS Introduction to Algorithms", "Algorithm Design Manual", "Cracking the Coding Interview"],
      platforms: ["LeetCode", "HackerRank", "Codeforces", "GeeksforGeeks"],
      courses: ["MIT OCW", "Stanford Algorithms", "Coursera"]
    }
  },

  {
    id: "dbms",
    name: "DBMS",
    year: 1970,
    creator: "E.F. Codd",
    paradigm: "Database Management",
    typed: "N/A",
    compiled: false,
    color: "#336791",
    icon: "DB",
    tagline: "Organize, query, and manage data",
    history: {
      title: "History of DBMS",
      content: `E.F. Codd proposed the relational model in 1970. Oracle (1979), MySQL (1995), PostgreSQL (1996), SQLite (2000) followed. NoSQL emerged in 2009 (MongoDB, Cassandra). Modern databases span relational, document, key-value, and graph models.`
    },
    advantages: [
      { title: "Data Integrity & Consistency", desc: "Constraints (primary keys, foreign keys, check constraints) ensure data follows rules and remains consistent across the entire database." },
      { title: "ACID Compliance", desc: "Atomicity, Consistency, Isolation, and Durability guarantee that transactions are processed reliably, even during system failures." },
      { title: "SQL Standardization", desc: "SQL is a standardized language for querying data. Learn it once, and you can work with MySQL, PostgreSQL, SQLite, and most other databases." },
      { title: "Concurrent Access", desc: "Database management systems handle multiple users reading and writing simultaneously without data corruption through locking and isolation levels." },
      { title: "Data Security", desc: "Granular access control, encryption at rest and in transit, audit logging, and role-based permissions protect sensitive data." },
      { title: "Backup & Recovery", desc: "Automated backups, point-in-time recovery, and replication ensure data survives hardware failures and human errors." }
    ],
    security: {
      title: "Security in DBMS",
      features: [
        { feature: "SQL Injection", desc: "The most critical database vulnerability. Attackers insert malicious SQL into input fields to extract, modify, or delete data. Always use parameterized queries.", risk: "CRITICAL" },
        { feature: "Privilege Escalation", desc: "Users with excessive privileges can access or modify data beyond their role. Apply principle of least privilege.", risk: "HIGH" },
        { feature: "Data Encryption", desc: "Data at rest and in transit must be encrypted. TDE (Transparent Data Encryption) and TLS protect against physical theft and network sniffing.", risk: "HIGH" },
        { feature: "Backup Exposure", desc: "Database backups contain all data. If unencrypted and unsecured, they're a complete data breach waiting to happen.", risk: "HIGH" },
        { feature: "Audit Trail Gaps", desc: "Without query logging, you can't detect who accessed or modified data. Enable audit logging for compliance and forensics.", risk: "MEDIUM" }
      ],
      bestPractices: [
        "ALWAYS use parameterized queries / prepared statements",
        "Apply principle of least privilege to database accounts",
        "Encrypt data at rest (TDE) and in transit (TLS)",
        "Enable audit logging for all data modifications",
        "Regular backup testing with encrypted storage",
        "Use separate accounts for admin, read, and write access",
        "Keep database software and patches updated"
      ]
    },
    basics: [
      { topic: "Relational Model Basics", content: "Data is organized into tables (relations) with rows (tuples) and columns (attributes). Each table has a primary key that uniquely identifies rows.", code: "CREATE TABLE students (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  age INT CHECK (age >= 16),\n  enrollment_date DATE DEFAULT (CURRENT_DATE)\n);\n\nCREATE TABLE courses (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  title VARCHAR(200) NOT NULL,\n  credits INT DEFAULT 3\n);" },
      { topic: "SQL Queries (SELECT, INSERT, UPDATE, DELETE)", content: "CRUD operations: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE) — the four fundamental database operations.", code: "-- Read\nSELECT name, email FROM students WHERE age > 18 ORDER BY name;\n\n-- Create\nINSERT INTO students (name, email, age)\nVALUES ('Jay', 'jay@email.com', 20);\n\n-- Update\nUPDATE students SET age = 21 WHERE name = 'Jay';\n\n-- Delete\nDELETE FROM students WHERE age < 16;" },
      { topic: "Normalization", content: "Normalization reduces data redundancy by organizing data into related tables. Normal forms (1NF, 2NF, 3NF, BCNF) progressively eliminate anomalies.", code: "-- Bad: Unnormalized (redundant data)\n-- orders table has customer_name, customer_email repeated\n\n-- Good: Normalized (3NF)\nCREATE TABLE customers (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(255)\n);\n\nCREATE TABLE orders (\n  id INT PRIMARY KEY,\n  customer_id INT REFERENCES customers(id),\n  amount DECIMAL(10,2),\n  order_date DATE\n);\n\n-- Customer data stored once, referenced by ID" },
      { topic: "Joins (INNER, LEFT, RIGHT, FULL)", content: "Joins combine rows from multiple tables based on related columns. Different join types determine which rows are included.", code: "-- INNER JOIN: only matching rows\nSELECT s.name, o.amount\nFROM students s\nINNER JOIN orders o ON s.id = o.student_id;\n\n-- LEFT JOIN: all students, even without orders\nSELECT s.name, o.amount\nFROM students s\nLEFT JOIN orders o ON s.id = o.student_id;\n\n-- RIGHT JOIN: all orders, even without matching student\nSELECT s.name, o.amount\nFROM students s\nRIGHT JOIN orders o ON s.id = o.student_id;\n\n-- FULL JOIN: all rows from both tables\nSELECT s.name, o.amount\nFROM students s\nFULL JOIN orders o ON s.id = o.student_id;" },
      { topic: "Indexing & Performance", content: "Indexes speed up queries by creating a data structure (usually B-tree) that allows the database to find rows without full table scans.", code: "-- Create index on frequently queried column\nCREATE INDEX idx_students_email ON students(email);\n\n-- Composite index for multi-column queries\nCREATE INDEX idx_orders_student_date\nON orders(student_id, order_date);\n\n-- Verify index usage\nEXPLAIN SELECT * FROM students WHERE email = 'jay@email.com';\n\n-- Partial index (PostgreSQL)\nCREATE INDEX idx_active_orders\nON orders(order_date)\nWHERE status = 'active';" },
      { topic: "Transactions & ACID", content: "Transactions group multiple operations into a single unit that either all succeeds or all fails. ACID ensures reliability.", code: "BEGIN TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Verify no negative balances\nSELECT balance FROM accounts WHERE id = 1;\n\n-- If all good:\nCOMMIT;\n\n-- If something went wrong:\n-- ROLLBACK;\n\n-- ACID: Atomicity (all or nothing)\n--        Consistency (valid state)\n--        Isolation (concurrent safety)\n--        Durability (committed = permanent)" },
      { topic: "Entity-Relationship Diagrams", content: "ER diagrams model data requirements visually: entities (tables), attributes (columns), and relationships (foreign keys).", code: "-- ER Diagram concepts as SQL:\n\n-- Entity: Students table\nCREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(100));\n\n-- Entity: Courses table\nCREATE TABLE courses (id INT PRIMARY KEY, title VARCHAR(200));\n\n-- Many-to-Many relationship (junction table)\nCREATE TABLE enrollments (\n  student_id INT REFERENCES students(id),\n  course_id INT REFERENCES courses(id),\n  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  grade CHAR(2),\n  PRIMARY KEY (student_id, course_id)\n);\n\n-- One-to-Many: One student has many enrollments\n-- Many-to-Many: Many students enroll in many courses" },
      { topic: "NoSQL Concepts", content: "NoSQL databases trade ACID for scalability and flexibility. Types: document (MongoDB), key-value (Redis), column-family (Cassandra), graph (Neo4j).", code: "-- Document store (MongoDB)\ndb.users.insertOne({\n  name: \"Jay\",\n  age: 20,\n  courses: [\"DSA\", \"DBMS\"],\n  address: { city: \"Mumbai\", zip: \"400001\" }\n});\n\ndb.users.find({ \"courses\": \"DSA\" });\n\n-- Key-Value (Redis)\nSET user:1:name \"Jay\"\nGET user:1:name  // \"Jay\"\n\n-- When to use NoSQL:\n// Document: flexible schemas, nested data\n// Key-Value: caching, sessions, counters\n// Graph: social networks, recommendations\n// Column: time-series, analytics" },
      { topic: "Views & Stored Procedures", content: "Views are virtual tables defined by queries. Stored procedures are precompiled SQL programs stored in the database.", code: "-- View: reusable query\nCREATE VIEW active_students AS\nSELECT id, name, email\nFROM students\nWHERE status = 'active';\n\nSELECT * FROM active_students;\n\n-- Stored Procedure\nDELIMITER //\nCREATE PROCEDURE EnrollStudent(\n  IN p_student_id INT,\n  IN p_course_id INT\n)\nBEGIN\n  INSERT INTO enrollments (student_id, course_id)\n  VALUES (p_student_id, p_course_id);\n  \n  UPDATE courses\n  SET enrolled_count = enrolled_count + 1\n  WHERE id = p_course_id;\nEND //\nDELIMITER ;\n\nCALL EnrollStudent(1, 5);" }
    ],
    useCases: ["Web Applications", "E-Commerce", "Banking", "Healthcare", "Analytics", "Content Management", "IoT Data"],
    ecosystem: {
      databases: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Oracle"],
      tools: ["DBeaver", "pgAdmin", "MySQL Workbench", "TablePlus"],
      frameworks: ["Sequelize", "SQLAlchemy", "Prisma", "TypeORM", "Hibernate"]
    }
  }
];

if (typeof SHARED_CONCEPTS !== "undefined" && typeof LANG_SPECIFIC_CONCEPTS !== "undefined") {
  var NON_PROGRAMMING = { html: 1, css: 1, dsa: 1, dbms: 1 };
  LANGUAGES.forEach(function(lang) {
    var shared = NON_PROGRAMMING[lang.id] ? [] : Object.keys(SHARED_CONCEPTS).map(function(k) {
      var c = Object.assign({}, SHARED_CONCEPTS[k]);
      if (lang.id === "c" && k === "arrays") { c.id = "arrays-c"; c.title = "Arrays"; c.content = "C arrays are contiguous blocks of memory with a fixed size. They're zero-indexed and decay into pointers when passed to functions. No bounds checking — writing past the end corrupts memory. Use sizeof to get the total byte size."; c.code = "int nums[5] = {10, 20, 30, 40, 50};\nchar name[] = \"Hello\";  // 6 bytes with null\n\nprintf(\"%d\", nums[0]);  // 10\nprintf(\"%zu\", sizeof(nums));  // 20 (5 * 4 bytes)\n\n// Arrays decay to pointers\nint *p = nums;\nprintf(\"%d\", *(p + 2));  // 30"; }
      if (lang.id === "c" && k === "strings") { c.id = "strings-c"; c.title = "Strings"; c.content = "C strings are null-terminated char arrays — the last character is always '\\0'. There's no string type; you manipulate char arrays with functions from <string.h>. Buffer overflows are a constant danger. Always allocate enough space for the null terminator."; c.code = "char name[] = \"Hello\";  // 6 bytes: H e l l o \\0\nchar buf[20];\nstrncpy(buf, name, sizeof(buf) - 1);\nbuf[sizeof(buf) - 1] = '\\0';\n\nprintf(\"%lu\\n\", strlen(name));  // 5 (not 6!)\nstrcat(buf, \" World\");\nprintf(\"%s\\n\", buf);  // \"Hello World\""; }
      if (lang.id === "python" && k === "functions") { c.id = "functions-python"; c.title = "Functions"; c.content = "Python functions are defined with 'def', support default arguments, *args (variadic positional), **kwargs (variadic keyword), type hints, and decorators. Everything is an object including functions. Python uses lexical scoping with closures."; c.code = "def greet(name: str, greeting: str = \"Hello\") -> str:\n    return f\"{greeting}, {name}!\"\n\ndef total(*args, **kwargs):\n    print(f\"Args: {args}\")\n    print(f\"Kwargs: {kwargs}\")\n    return sum(args)\n\nprint(greet(\"Jay\"))  # \"Hello, Jay!\"\ntotal(1, 2, 3, tax=0.1)  # Args: (1, 2, 3)"; }
      if (lang.id === "python" && k === "error-handling") { c.id = "error-handling-python"; c.title = "Error Handling"; c.content = "Python uses try/except/else/finally for exception handling. raise creates exceptions. You can define custom exception classes. Context managers ensure cleanup. Python exceptions carry full tracebacks. EAFP (Easier to Ask Forgiveness than Permission) is the Pythonic style."; c.code = "try:\n    value = int(input(\"Enter number: \"))\n    result = 100 / value\nexcept ValueError:\n    print(\"Not a number!\")\nexcept ZeroDivisionError as e:\n    print(f\"Error: {e}\")\nelse:\n    print(f\"Result: {result}\")\nfinally:\n    print(\"Always runs\")"; }
      if (lang.id === "javascript" && k === "error-handling") { c.id = "error-handling-js"; c.title = "Error Handling"; c.content = "JavaScript uses try/catch/finally for exception handling. throw can throw any value (not just Error objects). Error types: TypeError, RangeError, ReferenceError, SyntaxError. Promise rejections use .catch() or try with await. Error.cause chains errors."; c.code = "try {\n  const data = JSON.parse(input);\n  if (!data.name) throw new TypeError(\"Missing name\");\n} catch (err) {\n  if (err instanceof SyntaxError) {\n    console.error(\"Invalid JSON\");\n  } else {\n    console.error(err.message);\n  }\n} finally {\n  console.log(\"Cleanup\");\n}\n\n// Async\nasync function fetch() {\n  try { return await riskyCall(); }\n  catch (e) { console.error(e); }\n}"; }
      return c;
    }).filter(Boolean);
    var unique = (LANG_SPECIFIC_CONCEPTS[lang.id] || []).slice();
    lang.concepts = shared.concat(unique);

    if (typeof SHARED_SUBTOPICS !== "undefined" || typeof LANG_UNIQUE_SUBTOPICS !== "undefined") {
      lang.concepts.forEach(function(c) {
        var subs = null;
        if (LANG_UNIQUE_SUBTOPICS && LANG_UNIQUE_SUBTOPICS[lang.id] && LANG_UNIQUE_SUBTOPICS[lang.id][c.id]) {
          subs = LANG_UNIQUE_SUBTOPICS[lang.id][c.id];
        }
        if (!subs && SHARED_SUBTOPICS && SHARED_SUBTOPICS[c.id]) {
          subs = SHARED_SUBTOPICS[c.id];
        }
        if (subs) {
          c.subtopics = subs.map(function(s) {
            return { id: s.id, title: s.title, content: s.content, code: s.code };
          });
        }
      });
    }
  });
}
