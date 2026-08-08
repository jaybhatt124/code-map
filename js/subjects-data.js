var SUBJECTS = [
  {
    id: "cpfc",
    title: "Computer Programming Fundamentals",
    subtitle: "C Programming — Semester 1",
    icon: "💻",
    color: "#5EEAD4",
    description: "Learn C programming from basics to functions, arrays, pointers and file handling.",
    units: [
      {
        id: "unit-1",
        title: "Unit 1",
        subtitle: "Fundamentals",
        concepts: [
          {
            id: "flowchart-algorithm",
            title: "Flowchart & Algorithm",
            definition: "An algorithm is a step-by-step procedure, with a finite number of well-defined instructions, used to solve a problem; a flowchart is a graphical representation of these steps using standard symbols such as ovals, rectangles, and diamonds.",
            theory: "Think of an algorithm like a recipe for making tea ☕. First boil water, then add leaves, then pour — step by step! A flowchart draws these steps with pictures (ovals = start/end, rectangles = work, diamonds = decisions). It helps you see the logic before coding. Mistakes are easier to fix in a flowchart than in actual code!",
            code: "// Algorithm: Find largest of 3 numbers\n#include <stdio.h>\nint main() {\n    int a = 10, b = 25, c = 18;\n    int largest;\n    if (a > b && a > c)\n        largest = a;\n    else if (b > c)\n        largest = b;\n    else\n        largest = c;\n    printf(\"Largest = %d\\n\", largest);\n    return 0;\n}",
            examples: [
              { title: "Reverse a Number", code: "#include <stdio.h>\nint main() {\n    int num = 1234, rev = 0, rem;\n    int temp = num;\n    while (temp > 0) {\n        rem = temp % 10;\n        rev = rev * 10 + rem;\n        temp = temp / 10;\n    }\n    printf(\"Original: %d\\n\", num);\n    printf(\"Reversed: %d\\n\", rev);\n    return 0;\n}\n// Output: Original: 1234\n// Reversed: 4321" },
              { title: "Prime Number Check", code: "#include <stdio.h>\nint main() {\n    int num = 17, i, prime = 1;\n    for (i = 2; i < num; i++) {\n        if (num % i == 0) {\n            prime = 0;\n            break;\n        }\n    }\n    if (prime == 1)\n        printf(\"%d is a prime number\\n\", num);\n    else\n        printf(\"%d is not a prime number\\n\", num);\n    return 0;\n}\n// Output: 17 is a prime number" }
            ]
          },
          {
            id: "overview-of-c",
            title: "Overview of C",
            definition: "C is a general-purpose, structured programming language developed by Dennis Ritchie in 1972 at Bell Laboratories, which combines the power of assembly language with the features of high-level languages and is widely used for system programming because of its efficiency, portability, and proximity to the hardware.",
            theory: "C was created in 1972 by Dennis Ritchie to build the Unix operating system 🖥️. It is a simple, fast language that is still very popular today. Many modern languages like C++, Java, and Python are based on C. Learning C gives you a strong foundation for programming.",
            code: "#include <stdio.h>\nint main() {\n    printf(\"Hello, World!\\n\");\n    printf(\"Welcome to C Programming\\n\");\n    return 0;\n}",
            examples: [
              { title: "C Program Structure", code: "#include <stdio.h>\nint main() {\n    printf(\"C was created by Dennis Ritchie in 1972\\n\");\n    printf(\"It is fast and close to hardware\\n\");\n    return 0;\n}\n// Output: C was created by Dennis Ritchie in 1972\n// It is fast and close to hardware" },
              { title: "Two Numbers Addition", code: "#include <stdio.h>\nint main() {\n    int a = 5, b = 7;\n    int sum = a + b;\n    printf(\"Sum of %d and %d is %d\\n\", a, b, sum);\n    return 0;\n}\n// Output: Sum of 5 and 7 is 12" }
            ]
          },
          {
            id: "constants-variables",
            title: "Constants & Variables",
            definition: "A variable is a named memory location whose value can be changed during program execution, while a constant is an identifier whose value cannot be modified after its declaration.",
            theory: "A variable is like a labeled box 📦 where you store a value. You can change what's inside! A constant is a locked box — once you put a value, it cannot change. Example: your age is a variable (it increases every year), but pi = 3.14 is a constant (it never changes).",
            code: "#include <stdio.h>\nint main() {\n    int age = 20;           // variable\n    float marks = 85.5;     // variable\n    char grade = 'A';       // variable\n    const float PI = 3.14159; // constant\n\n    printf(\"Age: %d, Marks: %.1f, Grade: %c\\n\", age, marks, grade);\n    printf(\"PI: %.2f\\n\", PI);\n\n    age = 21;   // can change variable\n    printf(\"New Age: %d\\n\", age);\n    return 0;\n}",
            examples: [
              { title: "Area of Circle with PI", code: "#include <stdio.h>\nint main() {\n    const float PI = 3.14;  // constant: cannot change\n    float radius = 5.0;\n    float area = PI * radius * radius;\n    printf(\"Radius: %.1f\\n\", radius);\n    printf(\"Area: %.2f\\n\", area);\n    return 0;\n}\n// Output: Radius: 5.0\n// Area: 78.50" },
              { title: "Simple Interest Calculation", code: "#include <stdio.h>\nint main() {\n    float principal = 10000, rate = 5, time = 2;\n    float interest = (principal * rate * time) / 100;\n    printf(\"Simple Interest: %.2f\\n\", interest);\n    return 0;\n}\n// Output: Simple Interest: 1000.00" }
            ]
          },
          {
            id: "data-types-c",
            title: "Data Types",
            definition: "A data type defines the type and size of data associated with a variable, specifying the set of values it can hold and the operations that can be performed on it; in C the fundamental data types are int, char, float, and double.",
            theory: "Every value in C has a type. It's like different containers 🥤: int stores whole numbers (like 25), float stores decimals (like 3.14), char stores a single letter (like 'A'), double stores bigger decimals (more accurate). The sizeof operator tells you the container size in bytes.",
            code: "#include <stdio.h>\nint main() {\n    int a = 100;             // whole number\n    float b = 3.14f;         // decimal\n    double c = 3.14159265;   // bigger decimal\n    char d = 'A';            // single letter\n\n    printf(\"int size: %zu bytes\\n\", sizeof(int));     // usually 4\n    printf(\"float size: %zu bytes\\n\", sizeof(float)); // usually 4\n    printf(\"double size: %zu bytes\\n\", sizeof(double)); // usually 8\n    printf(\"char size: %zu bytes\\n\", sizeof(char));    // 1\n    return 0;\n}",
            examples: [
              { title: "Storing Student Data", code: "#include <stdio.h>\nint main() {\n    int age = 19;\n    float marks = 78.5;\n    char grade = 'B';\n    double pi = 3.14159265358979;\n    printf(\"Age: %d\\n\", age);\n    printf(\"Marks: %.1f\\n\", marks);\n    printf(\"Grade: %c\\n\", grade);\n    printf(\"Pi: %.2f\\n\", pi);\n    return 0;\n}\n// Output: Age: 19\n// Marks: 78.5\n// Grade: B\n// Pi: 3.14" },
              { title: "Sizes of Data Types", code: "#include <stdio.h>\nint main() {\n    printf(\"int: %zu bytes\\n\", sizeof(int));\n    printf(\"float: %zu bytes\\n\", sizeof(float));\n    printf(\"double: %zu bytes\\n\", sizeof(double));\n    printf(\"char: %zu byte\\n\", sizeof(char));\n    return 0;\n}\n// Output: int: 4 bytes\n// float: 4 bytes\n// double: 8 bytes\n// char: 1 byte" }
            ]
          },
          {
            id: "io-operations",
            title: "Input/Output Operations",
            definition: "Input/output operations are the processes by which a program reads data from an input device and writes results to an output device; in C they are performed through the library functions printf(), which produces formatted output, and scanf(), which reads formatted input.",
            theory: "You need two things in every program: take input (from keyboard ⌨️) and show output (on screen 🖥️). printf() prints text with %d for numbers, %f for decimals, %c for characters. scanf() reads what you type. Use & before variable name in scanf.",
            code: "#include <stdio.h>\nint main() {\n    int age;\n    float height;\n\n    printf(\"Enter your age: \");\n    scanf(\"%d\", &age);\n    printf(\"Enter your height: \");\n    scanf(\"%f\", &height);\n\n    printf(\"Age: %d, Height: %.1f\\n\", age, height);\n    return 0;\n}",
            examples: [
              { title: "Sum of Two Numbers", code: "#include <stdio.h>\nint main() {\n    int a, b;\n    printf(\"Enter first number: \");\n    scanf(\"%d\", &a);\n    printf(\"Enter second number: \");\n    scanf(\"%d\", &b);\n    printf(\"Sum = %d\\n\", a + b);\n    return 0;\n}\n// Input: 10, 20 (typed by user)\n// Output: Sum = 30" },
              { title: "Print Character and Number", code: "#include <stdio.h>\nint main() {\n    char initial = 'A';\n    int year = 2;\n    printf(\"Initial: %c\\n\", initial);\n    printf(\"Year: %d\\n\", year);\n    printf(\"I am in year %d, initial %c\\n\", year, initial);\n    return 0;\n}\n// Output: Initial: A\n// Year: 2\n// I am in year 2, initial A" }
            ]
          },
          {
            id: "operators-expressions",
            title: "Operators & Expressions",
            definition: "An operator is a symbol that directs the computer to perform a specific operation on one or more operands, and an expression is a combination of constants, variables, and operators that evaluates to a single value according to the precedence and associativity rules of the language.",
            theory: "Operators are like math symbols ➕➖✖️➗. They do calculations (+, -, *, /, %), compare values (==, !=, >, <), and combine decisions (&&, ||, !). Think of it like your calculator — you give numbers, it gives you results. C follows BODMAS rules for order.",
            code: "#include <stdio.h>\nint main() {\n    int a = 10, b = 3;\n\n    printf(\"%d + %d = %d\\n\", a, b, a + b);  // 10 + 3 = 13\n    printf(\"%d - %d = %d\\n\", a, b, a - b);  // 10 - 3 = 7\n    printf(\"%d * %d = %d\\n\", a, b, a * b);  // 10 * 3 = 30\n    printf(\"%d / %d = %d\\n\", a, b, a / b);  // 10 / 3 = 3 (integer)\n    printf(\"%d %% %d = %d\\n\", a, b, a % b); // 10 %% 3 = 1 (remainder)\n    printf(\"%d > %d is %d\\n\", a, b, a > b); // 1 means true\n\n    int x = 1, y = 0;\n    printf(\"%d && %d = %d\\n\", x, y, x && y); // 1 AND 0 = 0\n    printf(\"%d || %d = %d\\n\", x, y, x || y); // 1 OR 0 = 1\n    return 0;\n}",
            examples: [
              { title: "Arithmetic Operations", code: "#include <stdio.h>\nint main() {\n    int a = 15, b = 4;\n    printf(\"%d + %d = %d\\n\", a, b, a + b);\n    printf(\"%d - %d = %d\\n\", a, b, a - b);\n    printf(\"%d * %d = %d\\n\", a, b, a * b);\n    printf(\"%d / %d = %d\\n\", a, b, a / b);\n    printf(\"%d %% %d = %d\\n\", a, b, a % b);\n    return 0;\n}\n// Output: 15 + 4 = 19\n// 15 - 4 = 11\n// 15 * 4 = 60\n// 15 / 4 = 3\n// 15 % 4 = 3" },
              { title: "Even or Odd Check", code: "#include <stdio.h>\nint main() {\n    int num = 21;\n    if (num % 2 == 0)\n        printf(\"%d is even\\n\", num);\n    else\n        printf(\"%d is odd\\n\", num);\n    printf(\"%d is greater than 10: %d\\n\", num, num > 10);\n    return 0;\n}\n// Output: 21 is odd\n// 21 is greater than 10: 1" }
            ]
          }
        ]
      },
      {
        id: "unit-2",
        title: "Unit 2",
        subtitle: "Control Flow",
        concepts: [
          {
            id: "if-statement",
            title: "if Statement",
            definition: "The if statement is an entry-controlled conditional control statement that evaluates a given condition and executes a block of statements only when the condition is true, otherwise control passes to the statement following the if block.",
            theory: "The if statement checks a condition and runs code only if true ✅. Like if it's raining, take umbrella 🌂. If it's NOT raining, skip! The condition must be in parentheses. If it's true (not zero), the block inside { } runs. Simple, just one decision!",
            code: "#include <stdio.h>\nint main() {\n    int num = 15;\n\n    if (num > 0) {\n        printf(\"%d is positive\\n\", num);  // runs because 15 > 0\n    }\n\n    if (num %% 2 == 0)\n        printf(\"%d is even\\n\", num);\n    else\n        printf(\"%d is odd\\n\", num);\n    return 0;\n}",
            examples: [
              { title: "Greater than 100?", code: "#include <stdio.h>\nint main() {\n    int num = 150;\n    if (num > 100) {\n        printf(\"%d is greater than 100\\n\", num);\n    }\n    if (num < 100) {\n        printf(\"%d is less than 100\\n\", num);\n    }\n    return 0;\n}\n// Output: 150 is greater than 100" },
              { title: "Scholarship Check", code: "#include <stdio.h>\nint main() {\n    int marks = 95;\n    if (marks > 90) {\n        printf(\"You get a scholarship!\\n\");\n    }\n    return 0;\n}\n// Output: You get a scholarship!" }
            ]
          },
          {
            id: "if-else-statement",
            title: "if-else Statement",
            definition: "The if-else statement is a two-way decision-making control statement that executes the if block when the condition is true and the else block when the condition is false, ensuring that exactly one of the two alternatives is executed.",
            theory: "if-else gives TWO paths ⚡. If condition is true, do this; otherwise, do that. Like a coin toss 🪙: heads -> you win, tails -> you lose. Always exactly ONE path will run. Great for yes/no decisions like pass/fail, even/odd, adult/child.",
            code: "#include <stdio.h>\nint main() {\n    int num;\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    if (num %% 2 == 0)\n        printf(\"%d is even\\n\", num);\n    else\n        printf(\"%d is odd\\n\", num);\n\n    int marks;\n    printf(\"Enter marks: \");\n    scanf(\"%d\", &marks);\n    if (marks >= 40)\n        printf(\"Result: PASS\\n\");\n    else\n        printf(\"Result: FAIL\\n\");\n    return 0;\n}",
            examples: [
              { title: "Voting Eligibility", code: "#include <stdio.h>\nint main() {\n    int age = 16;\n    if (age >= 18)\n        printf(\"You can vote\\n\");\n    else\n        printf(\"You are too young to vote\\n\");\n    return 0;\n}\n// Output: You are too young to vote" },
              { title: "Divisible by 5", code: "#include <stdio.h>\nint main() {\n    int num = 35;\n    if (num % 5 == 0)\n        printf(\"%d is divisible by 5\\n\", num);\n    else\n        printf(\"%d is not divisible by 5\\n\", num);\n    return 0;\n}\n// Output: 35 is divisible by 5" }
            ]
          },
          {
            id: "nested-if-statement",
            title: "Nested if",
            definition: "A nested if is a conditional construct in which an if or else block contains another if statement, creating a hierarchy of conditions in which the inner condition is evaluated only when the outer condition is satisfied.",
            theory: "Nested if means if inside another if 🪆 (like Russian dolls). First check one condition, then inside check another. Example: if student passed, THEN check if they got A grade. Inner if only runs when outer if is true. Be careful with brackets!",
            code: "#include <stdio.h>\nint main() {\n    int a = 10, b = 25, c = 18;\n\n    if (a > b) {\n        // outer if: a is bigger than b\n        if (a > c)\n            printf(\"%d is the largest\\n\", a);\n        else\n            printf(\"%d is the largest\\n\", c);\n    } else {\n        // outer else: b is bigger or equal\n        if (b > c)\n            printf(\"%d is the largest\\n\", b);\n        else\n            printf(\"%d is the largest\\n\", c);\n    }\n    return 0;\n}",
            examples: [
              { title: "Result with Grade", code: "#include <stdio.h>\nint main() {\n    int marks = 75;\n    if (marks >= 40) {\n        printf(\"Result: PASS\\n\");\n        if (marks >= 80)\n            printf(\"Grade: Distinction\\n\");\n        else if (marks >= 60)\n            printf(\"Grade: First Class\\n\");\n        else\n            printf(\"Grade: Second Class\\n\");\n    } else {\n        printf(\"Result: FAIL\\n\");\n    }\n    return 0;\n}\n// Output: Result: PASS\n// Grade: First Class" },
              { title: "Positive Even Number", code: "#include <stdio.h>\nint main() {\n    int num = 24;\n    if (num > 0) {\n        printf(\"%d is positive\\n\", num);\n        if (num % 2 == 0)\n            printf(\"%d is also even\\n\", num);\n        else\n            printf(\"%d is odd\\n\", num);\n    } else {\n        printf(\"%d is not positive\\n\", num);\n    }\n    return 0;\n}\n// Output: 24 is positive\n// 24 is also even" }
            ]
          },
          {
            id: "else-if-ladder",
            title: "else-if Ladder",
            definition: "The else-if ladder is a chain of if-else statements in which conditions are tested sequentially from top to bottom; the block associated with the first condition that evaluates to true is executed and the remaining conditions are skipped, and the final else is executed only if all conditions fail.",
            theory: "The else-if ladder checks many conditions one by one 🪜. Top to bottom, the first true condition runs and remaining are skipped. If none is true, the final else runs. Like exam grading: 90+ = A+, 80+ = A, 70+ = B ... else = F.",
            code: "#include <stdio.h>\nint main() {\n    int marks;\n    printf(\"Enter marks: \");\n    scanf(\"%d\", &marks);\n\n    if (marks >= 90)\n        printf(\"Grade: A+\\n\");\n    else if (marks >= 80)\n        printf(\"Grade: A\\n\");\n    else if (marks >= 70)\n        printf(\"Grade: B\\n\");\n    else if (marks >= 60)\n        printf(\"Grade: C\\n\");\n    else if (marks >= 50)\n        printf(\"Grade: D\\n\");\n    else\n        printf(\"Grade: F\\n\");\n    return 0;\n}",
            examples: [
              { title: "Number to Word", code: "#include <stdio.h>\nint main() {\n    int num = 3;\n    if (num == 1)\n        printf(\"One\\n\");\n    else if (num == 2)\n        printf(\"Two\\n\");\n    else if (num == 3)\n        printf(\"Three\\n\");\n    else if (num == 4)\n        printf(\"Four\\n\");\n    else if (num == 5)\n        printf(\"Five\\n\");\n    else\n        printf(\"Number out of range\\n\");\n    return 0;\n}\n// Output: Three" },
              { title: "Age Category", code: "#include <stdio.h>\nint main() {\n    int age = 15;\n    if (age < 13)\n        printf(\"Child\\n\");\n    else if (age < 18)\n        printf(\"Teenager\\n\");\n    else if (age < 60)\n        printf(\"Adult\\n\");\n    else\n        printf(\"Senior citizen\\n\");\n    return 0;\n}\n// Output: Teenager" }
            ]
          },
          {
            id: "switch-statement",
            title: "switch Statement",
            definition: "The switch statement is a multi-way decision-making control statement that compares the value of an expression with a set of constant case labels and transfers control to the matching case, using break to terminate the switch and default to handle unmatched values.",
            theory: "switch is like a TV remote 📺 — you press a number, and it jumps to that channel. Each case matches a value (like channel 1 = Monday, channel 3 = Wednesday). break stops the switch from checking other cases. default runs when nothing matches. Works with numbers or characters only.",
            code: "#include <stdio.h>\nint main() {\n    int day;\n    printf(\"Enter day (1-7): \");\n    scanf(\"%d\", &day);\n\n    switch (day) {\n        case 1: printf(\"Monday\\n\"); break;\n        case 2: printf(\"Tuesday\\n\"); break;\n        case 3: printf(\"Wednesday\\n\"); break;\n        case 4: printf(\"Thursday\\n\"); break;\n        case 5: printf(\"Friday\\n\"); break;\n        case 6: printf(\"Saturday\\n\"); break;\n        case 7: printf(\"Sunday\\n\"); break;\n        default: printf(\"Invalid day!\\n\");\n    }\n    return 0;\n}",
            examples: [
              { title: "Simple Calculator", code: "#include <stdio.h>\nint main() {\n    int a = 12, b = 4;\n    char op = '*';\n    switch (op) {\n        case '+': printf(\"%d + %d = %d\\n\", a, b, a + b); break;\n        case '-': printf(\"%d - %d = %d\\n\", a, b, a - b); break;\n        case '*': printf(\"%d * %d = %d\\n\", a, b, a * b); break;\n        case '/': printf(\"%d / %d = %d\\n\", a, b, a / b); break;\n        default: printf(\"Invalid operator\\n\");\n    }\n    return 0;\n}\n// Output: 12 * 4 = 48" },
              { title: "Month Names", code: "#include <stdio.h>\nint main() {\n    int month = 6;\n    switch (month) {\n        case 1: printf(\"January\\n\"); break;\n        case 2: printf(\"February\\n\"); break;\n        case 3: printf(\"March\\n\"); break;\n        case 4: printf(\"April\\n\"); break;\n        case 5: printf(\"May\\n\"); break;\n        case 6: printf(\"June\\n\"); break;\n        default: printf(\"Invalid month\\n\");\n    }\n    return 0;\n}\n// Output: June" }
            ]
          },
          {
            id: "goto-statement",
            title: "goto Statement",
            definition: "The goto statement is an unconditional jump statement that transfers control to a labeled statement within the same function, and its excessive use is discouraged because it violates the principles of structured programming and reduces program readability.",
            theory: "goto jumps to a labeled place in your code 🔀. Like saying 'skip to the end' in a board game. But using goto makes code hard to read (spaghetti code). Modern programmers avoid it. Only useful for jumping out of deeply nested loops in special cases.",
            code: "#include <stdio.h>\nint main() {\n    for (int i = 0; i < 5; i++) {\n        for (int j = 0; j < 5; j++) {\n            if (i == 2 && j == 3) {\n                printf(\"Found at i=%d, j=%d\\n\", i, j);\n                goto exit;  // jump to 'exit' label\n            }\n        }\n    }\nexit:\n    printf(\"Exited nested loops using goto\\n\");\n    return 0;\n}",
            examples: [
              { title: "First Negative Number", code: "#include <stdio.h>\nint main() {\n    int arr[] = {5, 8, -3, 9, 2};\n    for (int i = 0; i < 5; i++) {\n        if (arr[i] < 0) {\n            printf(\"First negative: %d at index %d\\n\", arr[i], i);\n            goto found;\n        }\n    }\n    printf(\"No negative number found\\n\");\nfound:\n    printf(\"Search finished\\n\");\n    return 0;\n}\n// Output: First negative: -3 at index 2\n// Search finished" },
              { title: "Jump Over Number 5", code: "#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            printf(\"Jumping over 5!\\n\");\n            goto after;\n        }\n        printf(\"%d \", i);\n    }\nafter:\n    printf(\"\\nDone\\n\");\n    return 0;\n}\n// Output: 1 2 3 4 Jumping over 5!\n// Done" }
            ]
          },
          {
            id: "while-loop",
            title: "while Loop",
            definition: "A while loop is an entry-controlled looping statement that repeatedly executes a block of statements as long as the given condition evaluates to true; since the condition is tested before each iteration, the body may be executed zero times if the condition is initially false.",
            theory: "while loop repeats a block as long as condition is true ♻️. Like checking your phone while waiting for a bus: keep checking while bus NOT arrived. The condition is checked BEFORE each round. If false at first, the body never runs. Make sure to update the condition or it will run forever!",
            code: "#include <stdio.h>\nint main() {\n    int i = 1;\n    while (i <= 10) {\n        printf(\"%d \", i);\n        i++;  // important: i increases each time\n    }\n    printf(\"\\n\");\n\n    // Count digits of a number\n    int num = 12345, count = 0;\n    int temp = num;\n    while (temp > 0) {\n        count++;\n        temp /= 10;  // remove last digit\n    }\n    printf(\"%d has %d digits\\n\", num, count);\n    return 0;\n}",
            examples: [
              { title: "Sum of Digits", code: "#include <stdio.h>\nint main() {\n    int num = 345, sum = 0;\n    int temp = num;\n    while (temp > 0) {\n        sum += temp % 10;\n        temp /= 10;\n    }\n    printf(\"Sum of digits of %d = %d\\n\", num, sum);\n    return 0;\n}\n// Output: Sum of digits of 345 = 12" },
              { title: "Print Squares", code: "#include <stdio.h>\nint main() {\n    int i = 1;\n    while (i <= 5) {\n        printf(\"Square of %d = %d\\n\", i, i * i);\n        i++;\n    }\n    return 0;\n}\n// Output: Square of 1 = 1\n// Square of 2 = 4\n// Square of 3 = 9\n// Square of 4 = 16\n// Square of 5 = 25" }
            ]
          },
          {
            id: "do-while-loop",
            title: "do-while Loop",
            definition: "A do-while loop is an exit-controlled looping statement in which the block of statements is executed first and the condition is tested afterwards, so the loop body is executed at least once even if the condition is initially false.",
            theory: "do-while is like while but runs the body AT LEAST ONCE before checking condition 🔁. Like eating first, then deciding if you want more! The body runs, then condition is checked. Perfect for menus: show menu at least once, then ask if user wants to continue.",
            code: "#include <stdio.h>\nint main() {\n    int choice;\n    do {\n        printf(\"\\n=== Menu ===\\n\");\n        printf(\"1. Say Hello\\n\");\n        printf(\"2. Say Goodbye\\n\");\n        printf(\"3. Exit\\n\");\n        printf(\"Enter choice: \");\n        scanf(\"%d\", &choice);\n\n        switch (choice) {\n            case 1: printf(\"Hello!\\n\"); break;\n            case 2: printf(\"Goodbye!\\n\"); break;\n            case 3: printf(\"Exiting...\\n\"); break;\n            default: printf(\"Invalid!\\n\");\n        }\n    } while (choice != 3);  // repeat until user picks 3\n    return 0;\n}",
            examples: [
              { title: "Sum Until Zero", code: "#include <stdio.h>\nint main() {\n    int num, sum = 0;\n    do {\n        printf(\"Enter a number (0 to stop): \");\n        scanf(\"%d\", &num);\n        sum += num;\n    } while (num != 0);\n    printf(\"Total sum = %d\\n\", sum);\n    return 0;\n}\n// Input: 5, 3, 0 (typed by user)\n// Output: Total sum = 8" },
              { title: "Guess the Number", code: "#include <stdio.h>\nint main() {\n    int guess;\n    int secret = 7;\n    do {\n        printf(\"Guess the number (1-10): \");\n        scanf(\"%d\", &guess);\n        if (guess != secret)\n            printf(\"Wrong! Try again.\\n\");\n    } while (guess != secret);\n    printf(\"Correct! The number was %d\\n\", secret);\n    return 0;\n}\n// Input: 3, 9, 7 (typed by user)\n// Output: Wrong! Try again.\n// Wrong! Try again.\n// Correct! The number was 7" }
            ]
          },
          {
            id: "for-loop",
            title: "for Loop",
            definition: "The for loop is an entry-controlled looping statement that consolidates the initialization of the loop variable, the condition test, and the increment or decrement operation into a single line, repeating a block of statements a definite number of times as long as the condition holds.",
            theory: "for loop is the most compact loop — it combines start, condition, and update in ONE line 📏. Like counting 1 to 10: start at 1, check if <=10, then add 1. Very useful when you know exactly how many times to repeat. Perfect for arrays and fixed counts.",
            code: "#include <stdio.h>\nint main() {\n    int n, sum = 0;\n    printf(\"Enter N: \");\n    scanf(\"%d\", &n);\n\n    // Sum 1 to N\n    for (int i = 1; i <= n; i++)\n        sum += i;\n    printf(\"Sum of 1 to %d = %d\\n\", n, sum);\n\n    // Multiplication table of 7\n    for (int i = 1; i <= 10; i++)\n        printf(\"7 x %d = %d\\n\", i, 7 * i);\n    return 0;\n}",
            examples: [
              { title: "Even Numbers 2 to 20", code: "#include <stdio.h>\nint main() {\n    printf(\"Even numbers 2-20: \");\n    for (int i = 2; i <= 20; i += 2)\n        printf(\"%d \", i);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: Even numbers 2-20: 2 4 6 8 10 12 14 16 18 20" },
              { title: "Reverse Counting", code: "#include <stdio.h>\nint main() {\n    for (int i = 10; i >= 1; i--)\n        printf(\"%d \", i);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: 10 9 8 7 6 5 4 3 2 1" }
            ]
          },
          {
            id: "break-continue",
            title: "break & continue",
            definition: "The break statement terminates the enclosing loop or switch immediately and transfers control to the statement following it, whereas the continue statement skips the remaining statements of the current iteration and transfers control to the next iteration of the loop.",
            theory: "break stops the loop immediately 🛑 — like emergency exit from a building. continue skips the rest of current round and goes to next 🔄 — like skipping a bad song in a playlist. break for urgent stop, continue for skip this one time.",
            code: "#include <stdio.h>\nint main() {\n    // break: stop at first multiple of 7\n    for (int i = 1; i <= 100; i++) {\n        if (i %% 7 == 0) {\n            printf(\"First multiple of 7: %d\\n\", i);\n            break;  // exits loop NOW\n        }\n    }\n\n    // continue: print only odd numbers\n    printf(\"Odd numbers 1-20: \");\n    for (int i = 1; i <= 20; i++) {\n        if (i %% 2 == 0) continue;  // skip even\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Stop Loop at 10", code: "#include <stdio.h>\nint main() {\n    int i = 1;\n    while (1) {\n        printf(\"%d \", i);\n        i++;\n        if (i == 10)\n            break;  // stop loop here\n    }\n    printf(\"\\nLoop stopped at %d\\n\", i);\n    return 0;\n}\n// Output: 1 2 3 4 5 6 7 8 9\n// Loop stopped at 10" },
              { title: "Skip Number 5", code: "#include <stdio.h>\nint main() {\n    printf(\"Numbers 1-10 skipping 5: \");\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5)\n            continue;  // skip this one\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n// Output: Numbers 1-10 skipping 5: 1 2 3 4 6 7 8 9 10" }
            ]
          }
        ]
      },
      {
        id: "unit-3",
        title: "Unit 3",
        subtitle: "Data Structures Basics",
        concepts: [
          {
            id: "arrays-1d",
            title: "1D Arrays",
            definition: "An array is a fixed-size collection of elements of the same data type stored in contiguous memory locations and accessed through a common name using an integer index that starts from zero.",
            theory: "An array is like a row of lockers 🔢 — each locker has a number (index) from 0, 1, 2, 3... You store one value in each locker. All values must be the same type (all numbers or all letters). Arrays make it easy to store and process many values without creating many variables.",
            code: "#include <stdio.h>\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n\n    printf(\"First element: %d\\n\", arr[0]);  // indexes: 0,1,2,3,4\n    printf(\"Third element: %d\\n\", arr[2]);\n\n    // Find maximum\n    int max = arr[0];\n    for (int i = 1; i < 5; i++)\n        if (arr[i] > max) max = arr[i];\n    printf(\"Maximum: %d\\n\", max);\n\n    // Print all elements\n    printf(\"All elements: \");\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Sum and Average", code: "#include <stdio.h>\nint main() {\n    int marks[5] = {80, 90, 75, 65, 85};\n    int sum = 0;\n    for (int i = 0; i < 5; i++)\n        sum += marks[i];\n    float avg = sum / 5.0;\n    printf(\"Sum = %d\\n\", sum);\n    printf(\"Average = %.1f\\n\", avg);\n    return 0;\n}\n// Output: Sum = 395\n// Average = 79.0" },
              { title: "Count Positive and Negative", code: "#include <stdio.h>\nint main() {\n    int nums[6] = {5, -3, 8, -1, 0, 7};\n    int pos = 0, neg = 0;\n    for (int i = 0; i < 6; i++) {\n        if (nums[i] > 0) pos++;\n        else if (nums[i] < 0) neg++;\n    }\n    printf(\"Positive numbers: %d\\n\", pos);\n    printf(\"Negative numbers: %d\\n\", neg);\n    return 0;\n}\n// Output: Positive numbers: 3\n// Negative numbers: 2" }
            ]
          },
          {
            id: "arrays-2d",
            title: "2D Arrays",
            definition: "A two-dimensional array is a collection of elements of the same data type arranged logically in rows and columns, declared with two indices and stored in memory in row-major order.",
            theory: "A 2D array is like a spreadsheet or chessboard 🏁 — rows and columns! You need TWO indices: arr[row][col]. Like finding a seat in a cinema: row number and seat number. Nested loops (loop inside loop) are used to go through all elements row by row.",
            code: "#include <stdio.h>\nint main() {\n    int a[2][3] = {{1,2,3},{4,5,6}};  // 2 rows, 3 columns\n    int b[2][3] = {{7,8,9},{10,11,12}};\n    int sum[2][3];\n\n    // Add two matrices\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            sum[i][j] = a[i][j] + b[i][j];\n        }\n    }\n\n    printf(\"Result:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++)\n            printf(\"%d \", sum[i][j]);\n        printf(\"\\n\");\n    }\n    return 0;\n}",
            examples: [
              { title: "Total Sum of Elements", code: "#include <stdio.h>\nint main() {\n    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    int total = 0;\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            total += a[i][j];\n        }\n    }\n    printf(\"Total sum = %d\\n\", total);\n    return 0;\n}\n// Output: Total sum = 21" },
              { title: "Print the Matrix", code: "#include <stdio.h>\nint main() {\n    int m[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    printf(\"Matrix:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++)\n            printf(\"%d \", m[i][j]);\n        printf(\"\\n\");\n    }\n    return 0;\n}\n// Output: Matrix:\n// 1 2 3\n// 4 5 6" }
            ]
          },
          {
            id: "pointers-intro",
            title: "Introduction to Pointers",
            definition: "A pointer is a variable that stores the memory address of another variable, enabling indirect access to its value.",
            theory: "A pointer stores the ADDRESS (location) of another variable, not the value itself 📍. Think of it like a house address: you give the address, not the house. Use & to get address, * to get value. Pointers are powerful but need careful handling.",
            code: "#include <stdio.h>\nint main() {\n    int num = 42;\n    int *ptr = &num;  // ptr stores address of num\n\n    printf(\"Value: %d\\n\", num);\n    printf(\"Address: %p\\n\", &num);  // memory location\n    printf(\"Pointer: %p\\n\", ptr);    // same as &num\n    printf(\"Using *: %d\\n\", *ptr);   // get value at address\n\n    *ptr = 100;  // change value through pointer\n    printf(\"After change: %d\\n\", num);\n    return 0;\n}",
            examples: [
              { title: "Pointers for Different Types", code: "#include <stdio.h>\nint main() {\n    int num = 10;\n    char letter = 'A';\n    int *intPtr = &num;\n    char *charPtr = &letter;\n    printf(\"int value: %d\\n\", *intPtr);\n    printf(\"char value: %c\\n\", *charPtr);\n    *intPtr = 50;\n    *charPtr = 'B';\n    printf(\"After pointer changes:\\n\");\n    printf(\"num = %d, letter = %c\\n\", num, letter);\n    return 0;\n}\n// Output: int value: 10\n// char value: A\n// After pointer changes:\n// num = 50, letter = B" },
              { title: "Pointer Walks an Array", code: "#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30};\n    int *ptr = &arr[0];\n    printf(\"First: %d\\n\", *ptr);\n    ptr++;\n    printf(\"Next: %d\\n\", *ptr);\n    ptr++;\n    printf(\"Next: %d\\n\", *ptr);\n    return 0;\n}\n// Output: First: 10\n// Next: 20\n// Next: 30" }
            ]
          },
          {
            id: "address-indirection",
            title: "Address-of & Indirection",
            definition: "The address-of operator (&) returns the memory address of its operand, and the indirection or dereference operator (*) accesses the value stored at the address held by a pointer; together they provide indirect access to variables and enable call-by-reference in C.",
            theory: "The & operator gets the address (like 'where does this house sit?'), and * operator goes to that address and gets the value (like 'who lives here?') 🏠. Together, they allow functions to change variables directly (call by reference). Useful for swap function!",
            code: "#include <stdio.h>\nvoid swap(int *a, int *b) {\n    int temp = *a;  // get value at address a\n    *a = *b;        // put b's value into a's address\n    *b = temp;      // put old a's value into b's address\n}\n\nint main() {\n    int x = 10, y = 20;\n    printf(\"Before: x=%d, y=%d\\n\", x, y);\n    swap(&x, &y);  // passing addresses\n    printf(\"After: x=%d, y=%d\\n\", x, y);\n    return 0;\n}",
            examples: [
              { title: "Change Value in Function", code: "#include <stdio.h>\nvoid setToZero(int *x) {\n    *x = 0;  // change original value\n}\nint main() {\n    int num = 100;\n    printf(\"Before: %d\\n\", num);\n    setToZero(&num);\n    printf(\"After: %d\\n\", num);\n    return 0;\n}\n// Output: Before: 100\n// After: 0" },
              { title: "Copy Value Using Pointer", code: "#include <stdio.h>\nint main() {\n    int a = 5, b = 9;\n    int *ptr = &a;\n    printf(\"a = %d\\n\", a);\n    *ptr = b;  // put b's value into a using pointer\n    printf(\"After *ptr = b:\\n\");\n    printf(\"a = %d, b = %d\\n\", a, b);\n    return 0;\n}\n// Output: a = 5\n// After *ptr = b:\n// a = 9, b = 9" }
            ]
          },
          {
            id: "void-null-pointers",
            title: "Void & NULL Pointers",
            definition: "A void pointer is a generic pointer capable of pointing to data of any type and must be explicitly type-cast before dereferencing, while a NULL pointer is a pointer that does not refer to any valid memory location and is commonly used to initialize pointers or indicate failure.",
            theory: "A void pointer can point to ANY data type — like a universal charger 🔌. But you must cast it before using. NULL pointer points to nothing (address 0). If you try to use NULL, your program will crash 💥. Always check ptr != NULL before using a pointer.",
            code: "#include <stdio.h>\nint main() {\n    int i = 42;\n    float f = 3.14;\n    void *vp;\n\n    vp = &i;\n    printf(\"int: %d\\n\", *(int*)vp);  // cast to int*\n\n    vp = &f;\n    printf(\"float: %.2f\\n\", *(float*)vp);  // cast to float*\n\n    int *ptr = NULL;\n    if (ptr != NULL)\n        printf(\"Value: %d\\n\", *ptr);\n    else\n        printf(\"ptr is NULL - safe to skip\\n\");\n    return 0;\n}",
            examples: [
              { title: "Void Pointer with int and char", code: "#include <stdio.h>\nint main() {\n    int num = 7;\n    char ch = 'Z';\n    void *vp;\n    vp = &num;\n    printf(\"int: %d\\n\", *(int*)vp);\n    vp = &ch;\n    printf(\"char: %c\\n\", *(char*)vp);\n    return 0;\n}\n// Output: int: 7\n// char: Z" },
              { title: "Always Check NULL", code: "#include <stdio.h>\nint main() {\n    int *ptr = NULL;\n    if (ptr == NULL)\n        printf(\"ptr is NULL, do not use it!\\n\");\n    else\n        printf(\"Value: %d\\n\", *ptr);\n    return 0;\n}\n// Output: ptr is NULL, do not use it!" }
            ]
          }
        ]
      },
      {
        id: "unit-4",
        title: "Unit 4",
        subtitle: "Functions & Scope",
        concepts: [
          {
            id: "function-types",
            title: "Function Types",
            definition: "A function is a self-contained block of statements that performs a specific task and can be called from other parts of the program; functions in C are classified according to whether they are predefined (library) or user-defined, and by their return type and the presence or absence of parameters.",
            theory: "Functions are like a recipe book 📖 — you write a recipe once and use it many times. Built-in functions come with C (like printf). You can create your own functions to avoid repeating code. Syntax: return_type name(parameters) { body }.",
            code: "#include <stdio.h>\n// Function that adds two numbers\nint add(int a, int b) {\n    return a + b;\n}\n// Function that greets\nvoid greet(char name[]) {\n    printf(\"Hello, %s!\\n\", name);\n}\n\nint main() {\n    printf(\"Sum: %d\\n\", add(5, 3));\n    greet(\"Ali\");\n    return 0;\n}",
            examples: [
              { title: "Function Returns Maximum", code: "#include <stdio.h>\nint findMax(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\nint main() {\n    int x = 15, y = 25;\n    printf(\"Max = %d\\n\", findMax(x, y));\n    return 0;\n}\n// Output: Max = 25" },
              { title: "Void Function Prints a Line", code: "#include <stdio.h>\nvoid printLine() {\n    printf(\"----------------\\n\");\n}\nint main() {\n    printf(\"Welcome\\n\");\n    printLine();\n    printf(\"C is fun\\n\");\n    printLine();\n    return 0;\n}\n// Output: Welcome\n// ----------------\n// C is fun\n// ----------------" }
            ]
          },
          {
            id: "passing-arrays",
            title: "Passing Arrays to Functions",
            definition: "When an array is passed to a function, it is passed by reference, meaning the function receives a pointer to the first element of the array, so any modification made to the array inside the function affects the original array; the size of the array must therefore be passed as an additional argument.",
            theory: "When you pass an array to a function, C actually passes the address (like making a copy of the locker key 🔑, not the whole locker). So changes inside the function affect the original array. You also need to pass the size separately.",
            code: "#include <stdio.h>\nint arraySum(int arr[], int size) {\n    int sum = 0;\n    for (int i = 0; i < size; i++) sum += arr[i];\n    return sum;\n}\nvoid doubleElements(int arr[], int size) {\n    for (int i = 0; i < size; i++) arr[i] *= 2;\n}\n\nint main() {\n    int nums[] = {1, 2, 3, 4, 5};\n    printf(\"Sum = %d\\n\", arraySum(nums, 5));\n\n    doubleElements(nums, 5);  // changes original!\n    printf(\"After doubling: \");\n    for (int i = 0; i < 5; i++) printf(\"%d \", nums[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Maximum Score in Array", code: "#include <stdio.h>\nint arrayMax(int arr[], int size) {\n    int max = arr[0];\n    for (int i = 1; i < size; i++)\n        if (arr[i] > max) max = arr[i];\n    return max;\n}\nint main() {\n    int scores[] = {45, 90, 67, 88, 71};\n    printf(\"Maximum score = %d\\n\", arrayMax(scores, 5));\n    return 0;\n}\n// Output: Maximum score = 90" },
              { title: "Function Prints the Array", code: "#include <stdio.h>\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int nums[] = {2, 4, 6, 8, 10};\n    printf(\"Array: \");\n    printArray(nums, 5);\n    return 0;\n}\n// Output: Array: 2 4 6 8 10" }
            ]
          },
          {
            id: "recursion-c",
            title: "Recursion",
            definition: "Recursion is a technique in which a function calls itself directly or indirectly to solve a problem by breaking it into smaller subproblems, guided by a base case that terminates the process.",
            theory: "Recursion is when a function calls ITSELF 🔄. Like standing between two mirrors — you see infinite reflections! Two rules: 1) Base case to stop (like n=1), 2) Each call moves toward the base case. Common example: factorial (5! = 5×4×3×2×1). Without base case, program crashes (stack overflow).",
            code: "#include <stdio.h>\nint factorial(int n) {\n    if (n <= 1) return 1;  // base case: stop here\n    return n * factorial(n - 1);  // recursive call\n}\n\nint fibonacci(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nint main() {\n    printf(\"5! = %d\\n\", factorial(5));  // 5*4*3*2*1 = 120\n    printf(\"Fibonacci: \");\n    for (int i = 0; i < 10; i++)\n        printf(\"%d \", fibonacci(i));\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Sum of First N Numbers", code: "#include <stdio.h>\nint sum(int n) {\n    if (n == 0) return 0;  // base case\n    return n + sum(n - 1); // recursive call\n}\nint main() {\n    printf(\"Sum of 1 to 10 = %d\\n\", sum(10));\n    return 0;\n}\n// Output: Sum of 1 to 10 = 55" },
              { title: "Power Using Recursion", code: "#include <stdio.h>\nint power(int base, int exp) {\n    if (exp == 0) return 1;  // base case: any number ^ 0 = 1\n    return base * power(base, exp - 1);\n}\nint main() {\n    printf(\"2^5 = %d\\n\", power(2, 5));\n    printf(\"3^4 = %d\\n\", power(3, 4));\n    return 0;\n}\n// Output: 2^5 = 32\n// 3^4 = 81" }
            ]
          },
          {
            id: "scope-visibility",
            title: "Scope, Visibility & Lifetime",
            definition: "Scope is the region of the program within which a variable can be accessed, visibility determines whether an identifier is recognized in a given part of the program, and lifetime is the period for which a variable occupies a memory location during execution.",
            theory: "Scope = where a variable can be seen 👀. Local: inside one function only. Global: everywhere in the program. Static: stays alive even after function ends (remembers its value). Like a school: principal knows everyone (global), a teacher knows only their class (local), a class monitor stays from year to year (static).",
            code: "#include <stdio.h>\nint globalVar = 100;  // everyone can use this\n\nvoid demo() {\n    static int count = 0;  // remembers value between calls\n    count++;\n    printf(\"Function called %d times\\n\", count);\n}\n\nint main() {\n    int local = 10;  // only inside main\n    {\n        int blockVar = 20;  // only inside these {}\n        printf(\"Block var: %d\\n\", blockVar);\n    }\n    // printf(\"%d\", blockVar);  // ERROR! not visible here\n\n    printf(\"Global: %d\\n\", globalVar);\n    demo();  // count = 1\n    demo();  // count = 2\n    demo();  // count = 3\n    return 0;\n}",
            examples: [
              { title: "Global Variable Shared by Functions", code: "#include <stdio.h>\nint counter = 0;\nvoid login() {\n    counter++;\n    printf(\"Logged in. Total logins: %d\\n\", counter);\n}\nvoid logout() {\n    counter--;\n    printf(\"Logged out. Total logins: %d\\n\", counter);\n}\nint main() {\n    login();\n    login();\n    logout();\n    return 0;\n}\n// Output: Logged in. Total logins: 1\n// Logged in. Total logins: 2\n// Logged out. Total logins: 1" },
              { title: "Static vs Local Variable", code: "#include <stdio.h>\nvoid counter() {\n    static int staticCount = 0;\n    int localCount = 0;\n    staticCount++;\n    localCount++;\n    printf(\"static=%d, local=%d\\n\", staticCount, localCount);\n}\nint main() {\n    counter();\n    counter();\n    counter();\n    return 0;\n}\n// Output: static=1, local=1\n// static=2, local=1\n// static=3, local=1" }
            ]
          }
        ]
      },
      {
        id: "unit-5",
        title: "Unit 5",
        subtitle: "Advanced Basics",
        concepts: [
          {
            id: "strings-c",
            title: "Character Arrays & Strings",
            definition: "A string in C is a sequence of characters stored in a contiguous character array and terminated by the null character '\\0', and it is manipulated using the string library functions declared in the header file string.h.",
            theory: "A string in C is just an array of characters ending with '\\0' (null character) 🧵. Like 'H', 'e', 'l', 'l', 'o', '\\0'. string.h library has useful functions: strlen (length), strcpy (copy), strcat (join), strcmp (compare). Strings are like arrays, so you can loop through them.",
            code: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char name[] = \"Hello\";\n    char greeting[50];\n\n    printf(\"Length: %lu\\n\", strlen(name));  // 5\n\n    strcpy(greeting, name);  // copy name to greeting\n    strcat(greeting, \" World\");  // join strings\n    printf(\"Joined: %s\\n\", greeting);  // Hello World\n\n    printf(\"Compare: %d\\n\", strcmp(\"abc\", \"abd\"));  // negative = first smaller\n    return 0;\n}",
            examples: [
              { title: "Count Vowels in a Word", code: "#include <stdio.h>\nint main() {\n    char word[] = \"programming\";\n    int vowels = 0;\n    for (int i = 0; word[i] != '\\0'; i++) {\n        char c = word[i];\n        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')\n            vowels++;\n    }\n    printf(\"Vowels in \\\"%s\\\" = %d\\n\", word, vowels);\n    return 0;\n}\n// Output: Vowels in \"programming\" = 3" },
              { title: "Find Length Without strlen", code: "#include <stdio.h>\nint main() {\n    char name[] = \"Rahul\";\n    int len = 0;\n    while (name[len] != '\\0') {\n        len++;\n    }\n    printf(\"Length of %s = %d\\n\", name, len);\n    return 0;\n}\n// Output: Length of Rahul = 5" }
            ]
          },
          {
            id: "file-io-c",
            title: "File I/O",
            definition: "File input/output is the process of storing data permanently on secondary storage and retrieving it later; in C, files are accessed through a FILE pointer obtained from the fopen() function, after which data is transferred using functions such as fprintf(), fscanf(), and fclose().",
            theory: "File handling lets your program save data permanently 💾. Without files, data is lost when program ends! Steps: 1) Open file with fopen, 2) Read/write with fprintf/fscanf, 3) Close with fclose. Modes: 'r' = read, 'w' = write (overwrites), 'a' = add at end. Always check if file opened!",
            code: "#include <stdio.h>\nint main() {\n    FILE *fp;\n\n    // Write to file\n    fp = fopen(\"data.txt\", \"w\");\n    fprintf(fp, \"Ali 20\\nSara 22\\nAhmed 21\\n\");\n    fclose(fp);\n\n    // Read from file\n    char name[50]; int age;\n    fp = fopen(\"data.txt\", \"r\");\n    if (fp == NULL) {\n        printf(\"File not found!\\n\");\n        return 1;\n    }\n    printf(\"File contents:\\n\");\n    while (fscanf(fp, \"%s %d\", name, &age) != EOF)\n        printf(\"Name: %s, Age: %d\\n\", name, age);\n    fclose(fp);\n    return 0;\n}",
            examples: [
              { title: "Append Data to a File", code: "#include <stdio.h>\nint main() {\n    FILE *fp;\n    fp = fopen(\"notes.txt\", \"a\");  // 'a' = add at end\n    if (fp == NULL) {\n        printf(\"Cannot open file!\\n\");\n        return 1;\n    }\n    fprintf(fp, \"New line added by append\\n\");\n    fclose(fp);\n    printf(\"Data appended successfully\\n\");\n    return 0;\n}\n// Output: Data appended successfully" },
              { title: "Copy One File to Another", code: "#include <stdio.h>\nint main() {\n    FILE *in, *out;\n    char ch;\n    in = fopen(\"source.txt\", \"r\");\n    if (in == NULL) {\n        printf(\"Source file not found!\\n\");\n        return 1;\n    }\n    out = fopen(\"copy.txt\", \"w\");\n    while ((ch = fgetc(in)) != EOF)\n        fputc(ch, out);\n    fclose(in);\n    fclose(out);\n    printf(\"File copied successfully\\n\");\n    return 0;\n}\n// Output: File copied successfully" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Scripting Language",
    subtitle: "Python — Semester 2",
    icon: "🐍",
    color: "#7DD3FC",
    description: "Master Python programming from variables to NumPy and Matplotlib.",
    units: [
      {
        id: "unit-1",
        title: "Unit 1",
        subtitle: "Python Basics",
        concepts: [
          {
            id: "py-history",
            title: "History of Python",
            definition: "Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum and first released in 1991, designed with an emphasis on code readability through the use of significant indentation.",
            theory: "Python was created by Guido van Rossum in 1991 🐍. Named after Monty Python comedy group (not the snake!). Python focuses on readability — the code looks like English! Python 3 is the current version. The Zen of Python says: 'Simple is better than complex.'",
            code: "print(\"Python was created by Guido van Rossum\")\nprint(\"First released: 1991\")\nprint(\"Named after: Monty Python comedy group\")\n\n# The Zen of Python\nimport this",
            examples: [
              { title: "Python Fun Facts", code: "facts = [\n    \"Created by Guido van Rossum in 1991\",\n    \"Named after Monty Python, not the snake\",\n    \"Python 3 is the current version\",\n    \"One of the easiest languages to learn\",\n]\nfor i, fact in enumerate(facts, 1):\n    print(f\"{i}. {fact}\")\n# Output: 1. Created by Guido van Rossum in 1991\n# 2. Named after Monty Python, not the snake\n# 3. Python 3 is the current version\n# 4. One of the easiest languages to learn" },
              { title: "Why Python is Popular", code: "name = \"Python\"\ncreator = \"Guido van Rossum\"\nyear = 1991\nprint(f\"{name} was created by {creator} in {year}.\")\nprint(\"It is used for AI, web, games and data science.\")\nprint(\"Its motto is: Simple is better than complex.\")\n# Output: Python was created by Guido van Rossum in 1991.\n# It is used for AI, web, games and data science.\n# Its motto is: Simple is better than complex." }
            ]
          },
          {
            id: "py-features",
            title: "Features of Python",
            definition: "Python is an open-source, high-level, interpreted programming language characterized by dynamic typing, automatic memory management, simple syntax based on indentation, and an extensive standard library that makes it suitable for a wide range of applications.",
            theory: "Python is very beginner-friendly 🤗. No semicolons needed, no braces — just indentation! You don't need to declare variable types. Python has huge collection of ready-made libraries. Works on Windows, Mac, Linux. Free and open-source. Used everywhere: web, AI, games, data science!",
            code: "# Dynamic typing: no type declaration!\nx = 10\nx = \"hello\"  # now x is text - no error!\n\n# Easy syntax - no semicolons\nif x == \"hello\":\n    print(\"x is a greeting\")\n\n# OOP example\nclass Dog:\n    def bark(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.bark()",
            examples: [
              { title: "Indentation Rules the Code", code: "message = \"Python\"\nif message == \"Python\":\n    print(\"Indentation matters!\")\nprint(\"No semicolons required\")\nprint(\"No braces needed either\")\n# Output: Indentation matters!\n# No semicolons required\n# No braces needed either" },
              { title: "Free Libraries for Everyone", code: "import math\nprint(f\"Pi: {math.pi}\")\nprint(\"Python has thousands of free libraries\")\nprint(\"Used in AI, web, games and more\")\n# Output: Pi: 3.141592653589793\n# Python has thousands of free libraries\n# Used in AI, web, games and more" }
            ]
          },
          {
            id: "py-variables",
            title: "Variables",
            definition: "A variable is a named reference to a value stored in memory; in Python it is dynamically typed, meaning its type is inferred from the assigned value at runtime.",
            theory: "Variables in Python are like sticky notes 🏷️ — you just put a name and value. No need to say 'this is a number' — Python figures it out! Names can have letters, numbers, underscores but must start with letter or underscore. Use = for assignment. Python also lets you swap values in one line!",
            code: "name = \"Ali\"        # text (string)\nage = 20            # number (int)\nheight = 5.9        # decimal (float)\nis_student = True   # boolean (True/False)\n\nprint(type(name))   # <class 'str'>\nprint(type(age))    # <class 'int'>\n\n# Multiple assignment\nx, y, z = 1, 2, 3\nprint(f\"x={x}, y={y}, z={z}\")\n\n# Swap without temp variable\na, b = 10, 20\na, b = b, a\nprint(f\"After swap: a={a}, b={b}\")",
            examples: [
              { title: "Store Student Details", code: "name = \"Sara\"\nage = 22\nheight = 5.6\nprint(f\"Name: {name}\")\nprint(f\"Age: {age}\")\nprint(f\"Height: {height}\")\nprint(f\"Age type: {type(age)}\")\n# Output: Name: Sara\n# Age: 22\n# Height: 5.6\n# Age type: <class 'int'>" },
              { title: "Swap Two Values", code: "a = 5\nb = 10\nprint(f\"Before: a={a}, b={b}\")\na, b = b, a\nprint(f\"After swap: a={a}, b={b}\")\nprint(f\"Sum: {a + b}\")\n# Output: Before: a=5, b=10\n# After swap: a=10, b=5\n# Sum: 15" }
            ]
          },
          {
            id: "py-type-casting",
            title: "Type Casting",
            definition: "Type casting is the explicit conversion of a value from one data type to another using the built-in functions int(), float(), and str().",
            theory: "Converting one type to another 🔄. Like changing Rs to Dollars — same value, different format. int() converts to whole number, float() to decimal, str() to text. int(\"42\") gives 42, str(100) gives \"100\". int(3.7) gives 3 (truncates, doesn't round). Handy when reading user input!",
            code: "result = 5 + 2.5  # int + float = float (automatic)\nprint(f\"5 + 2.5 = {result}, type: {type(result)}\")\n\nnum_int = int(\"42\")     # string to int\nnum_float = float(\"3.14\")  # string to float\nprint(f\"int: {num_int}, float: {num_float}\")\n\nprint(f\"int(3.7) = {int(3.7)}\")    # 3 (truncates)\nprint(f\"float(10) = {float(10)}\")  # 10.0\n\nx = 42\nprint(f\"isinstance(x, int): {isinstance(x, int)}\")  # check type",
            examples: [
              { title: "Convert Input to Number", code: "age = \"21\"\nprint(f\"Before: {age}, type: {type(age)}\")\nage = int(age)\nprint(f\"After: {age}, type: {type(age)}\")\nyears_left = 60 - age\nprint(f\"Years to 60: {years_left}\")\n# Output: Before: 21, type: <class 'str'>\n# After: 21, type: <class 'int'>\n# Years to 60: 39" },
              { title: "Build a Message from Numbers", code: "name = \"Ali\"\nscore = 95\naverage = 8.75\nmessage = name + \" scored \" + str(score) + \"%\"\nprint(message)\nprint(\"Average: \" + str(average))\nprint(f\"Rounded average: {round(average)}\")\n# Output: Ali scored 95%\n# Average: 8.75\n# Rounded average: 9" }
            ]
          },
          {
            id: "py-io",
            title: "Input/Output",
            definition: "Input and output operations are the means by which a program receives data from the user and displays results; in Python they are performed using the built-in functions input(), which reads a line of input as a string, and print(), which writes a value to the console.",
            theory: "print() shows output on screen 🖨️. input() reads what user types and returns it as text. Use f-strings for easy formatting: f\"Hello {name}\". sep and end let you control spacing. input() always returns STRING, so convert to int/float for math.",
            code: "print(\"Hello, World!\")\nprint(\"A\", \"B\", \"C\", sep=\"-\")  # A-B-C\nprint(\"Hello\", end=\"\")\nprint(\" World\")  # Hello World (same line)\n\nname = \"Ali\"\nage = 20\nprint(f\"Name: {name}, Age: {age}\")  # f-string formatting\n\nage = int(input(\"Enter your age: \"))  # convert input to int\nprint(f\"In 5 years you will be {age + 5}\")",
            examples: [
              { title: "Greet the User", code: "name = input(\"Enter your name: \")\ncity = input(\"Enter your city: \")\nprint(f\"Hello, {name} from {city}!\")\nprint(\"Nice to meet you!\")\n# Input: Ali, Karachi (typed by user)\n# Output: Hello, Ali from Karachi!\n# Nice to meet you!" },
              { title: "Print with Separators", code: "print(\"1\", \"2\", \"3\", sep=\"-\")\nprint(\"A\", \"B\", \"C\", sep=\" | \")\nprint(\"First\", end=\" \")\nprint(\"Second\", end=\" \")\nprint(\"Third\")\n# Output: 1-2-3\n# A | B | C\n# First Second Third" }
            ]
          },
          {
            id: "py-data-types",
            title: "Data Types",
            definition: "A data type defines the nature and range of values that a variable can hold; in Python the fundamental types include int, float, complex, str, and bool, along with the collection types list, tuple, dict, and set.",
            theory: "Python has basic types: int (numbers), float (decimals), str (text), bool (True/False). Collection types: list [] (changeable, ordered), tuple () (cannot change, ordered), dict {} (key:value pairs), set {} (unique, unordered). Use type() to check type of any value.",
            code: "x = 42          # int\ny = 3.14        # float\nz = \"Python\"    # str\nb = True        # bool\n\nmy_list = [1, 2, 3]          # ordered, changeable\nmy_tuple = (1, 2, 3)         # ordered, FIXED\nmy_dict = {\"name\": \"Ali\", \"age\": 20}  # key:value\nmy_set = {1, 2, 3, 3, 4}     # unique values only\n\nprint(f\"list: {my_list}, type: {type(my_list)}\")\nprint(f\"tuple: {my_tuple}, type: {type(my_tuple)}\")\nprint(f\"dict: {my_dict}, type: {type(my_dict)}\")\nprint(f\"set: {my_set}, type: {type(my_set)}\")",
            examples: [
              { title: "Check Types with type()", code: "price = 99\ntax = 0.05\nproduct = \"Laptop\"\nin_stock = True\nprint(f\"price: {price} ({type(price)})\")\nprint(f\"tax: {tax} ({type(tax)})\")\nprint(f\"product: {product} ({type(product)})\")\nprint(f\"in_stock: {in_stock} ({type(in_stock)})\")\n# Output: price: 99 (<class 'int'>)\n# tax: 0.05 (<class 'float'>)\n# product: Laptop (<class 'str'>)\n# in_stock: True (<class 'bool'>)" },
              { title: "Collection Types in Action", code: "fruits = [\"apple\", \"banana\", \"mango\"]\nlocation = (3.2, 6.8)\nperson = {\"name\": \"Ali\", \"age\": 20}\nscores = set([55, 70, 55, 90])\nprint(f\"List: {fruits}\")\nprint(f\"Tuple: {location}\")\nprint(f\"Dict: {person}\")\nprint(f\"Set (no duplicates): {sorted(scores)}\")\n# Output: List: ['apple', 'banana', 'mango']\n# Tuple: (3.2, 6.8)\n# Dict: {'name': 'Ali', 'age': 20}\n# Set (no duplicates): [55, 70, 90]" }
            ]
          }
        ]
      },
      {
        id: "unit-2",
        title: "Unit 2",
        subtitle: "Operators & Loops",
        concepts: [
          {
            id: "py-arithmetic-ops",
            title: "Arithmetic Operators",
            definition: "Arithmetic operators are symbols that perform mathematical computations on numeric operands; Python provides +, -, *, /, //, %, and ** for addition, subtraction, multiplication, division, floor division, modulo, and exponentiation respectively.",
            theory: "Basic math: + add, - subtract, * multiply, / divide (gives decimal), // floor divide (drops decimal), % modulo (remainder), ** power (exponent). Think of // as 'how many times does this fully go into that'. % gives what's left over. Great for checking even/odd!",
            code: "a = 17\nb = 5\nprint(f\"{a} + {b} = {a + b}\")    # 22\nprint(f\"{a} - {b} = {a - b}\")    # 12\nprint(f\"{a} * {b} = {a * b}\")    # 85\nprint(f\"{a} / {b} = {a / b}\")    # 3.4 (decimal)\nprint(f\"{a} // {b} = {a // b}\")  # 3 (whole part)\nprint(f\"{a} % {b} = {a % b}\")    # 2 (remainder)\nprint(f\"2 ** 10 = {2 ** 10}\")    # 1024 (power)\n\nnum = 15\nprint(f\"{num} is even: {num % 2 == 0}\")",
            examples: [
              { title: "All Arithmetic Operators", code: "num1 = 25\nnum2 = 4\nprint(f\"{num1} + {num2} = {num1 + num2}\")\nprint(f\"{num1} - {num2} = {num1 - num2}\")\nprint(f\"{num1} * {num2} = {num1 * num2}\")\nprint(f\"{num1} / {num2} = {num1 / num2}\")\nprint(f\"{num1} // {num2} = {num1 // num2}\")\nprint(f\"{num1} % {num2} = {num1 % num2}\")\n# Output: 25 + 4 = 29\n# 25 - 4 = 21\n# 25 * 4 = 100\n# 25 / 4 = 6.25\n# 25 // 4 = 6\n# 25 % 4 = 1" },
              { title: "Temperature and Discount", code: "celsius = 30\nfahrenheit = (celsius * 9 / 5) + 32\nprint(f\"{celsius}C = {fahrenheit}F\")\nprice = 120\ndiscount = price * 20 / 100\nprint(f\"20% of {price} = {discount}\")\n# Output: 30C = 86.0F\n# 20% of 120 = 24.0" }
            ]
          },
          {
            id: "py-logical-ops",
            title: "Logical Operators",
            definition: "Logical operators combine Boolean expressions and produce a Boolean result; Python provides and, or, and not, which return True when both operands are true, when at least one operand is true, and when the operand is false, respectively.",
            theory: "Logical operators combine multiple conditions: and (BOTH true), or (AT LEAST ONE true), not (REVERSES). Like exam: you pass if marks >= 40 AND attendance >= 75. Python is smart — if first condition in 'and' is false, it doesn't check the second (short-circuit).",
            code: "age = 25\nhas_id = True\nprint(f\"Eligible: {age >= 18 and has_id}\")  # both must be True\n\nstudent = False\nprint(f\"Discount: {student or age < 18}\")   # at least one True\n\nis_vip = False\nprint(f\"Regular: {not is_vip}\")               # reverses False -> True\n\nscore = 85\nprint(f\"Grade A: {80 <= score <= 100}\")  # chained comparison",
            examples: [
              { title: "Admission Check", code: "marks = 78\nattendance = 90\nif marks >= 40 and attendance >= 75:\n    print(\"You can sit for the exam!\")\nelse:\n    print(\"You cannot sit for the exam.\")\n# Output: You can sit for the exam!" },
              { title: "Login Validator", code: "username = \"admin\"\npassword = \"1234\"\ncorrect_user = username == \"admin\"\ncorrect_pass = password == \"1234\"\nif correct_user and correct_pass:\n    print(\"Login successful!\")\nelif not correct_user:\n    print(\"Wrong username\")\nelse:\n    print(\"Wrong password\")\n# Output: Login successful!" }
            ]
          },
          {
            id: "py-comparison-ops",
            title: "Comparison Operators",
            definition: "Comparison operators compare two values and return a Boolean result; Python provides ==, !=, >, <, >=, and <=, and supports chained comparisons such as a < b < c.",
            theory: "Compare values: == (equal?), != (not equal?), > (greater?), < (smaller?), >= (greater or equal?), <= (smaller or equal?). Always returns True or False ✅❌. Python allows chaining: 10 < x < 20 (x between 10 and 20). String comparison uses alphabetical order (a < b).",
            code: "a = 10\nb = 20\nprint(f\"{a} == {b}: {a == b}\")  # equal? -> False\nprint(f\"{a} != {b}: {a != b}\")  # not equal? -> True\nprint(f\"{a} <= {b}: {a <= b}\")  # less or equal? -> True\n\nx = 15\nprint(f\"10 < {x} < 20: {10 < x < 20}\")  # chained: True\n\nprint(f\"'apple' < 'banana': {'apple' < 'banana'}\")  # alphabetical: True",
            examples: [
              { title: "Pass or Fail", code: "pass_marks = 40\nscore = 55\nprint(f\"Score: {score}\")\nprint(f\"Passed: {score >= pass_marks}\")\nprint(f\"Score is not zero: {score != 0}\")\n# Output: Score: 55\n# Passed: True\n# Score is not zero: True" },
              { title: "Compare Values", code: "a = 12\nb = 12\nc = 20\nprint(f\"{a} == {b}: {a == b}\")\nprint(f\"{a} != {c}: {a != c}\")\nprint(f\"{a} < {c}: {a < c}\")\n# Output: 12 == 12: True\n# 12 != 20: True\n# 12 < 20: True" }
            ]
          },
          {
            id: "py-assignment-ops",
            title: "Assignment Operators",
            definition: "An assignment operator assigns a value to a variable; compound assignment operators such as +=, -=, *=, /=, //=, %=, and **= perform an operation and assign the result in a single step.",
            theory: "= assigns value. Compound operators do math AND assign in one step: += (add and assign), -= (subtract and assign), *= (multiply and assign). Like saying 'x = x + 5' is same as 'x += 5'. Shortcuts to write less code!",
            code: "x = 10\nprint(f\"Initial: x = {x}\")\n\nx += 5   # x = x + 5\nprint(f\"x += 5: {x}\")  # 15\n\nx -= 3   # x = x - 3\nprint(f\"x -= 3: {x}\")  # 12\n\nx *= 2   # x = x * 2\nprint(f\"x *= 2: {x}\")  # 24\n\nx /= 4   # x = x / 4\nprint(f\"x /= 4: {x}\")  # 6.0\n\nx = 17\nx //= 5  # x = x // 5\nprint(f\"x //= 5: {x}\")  # 3\n\nx = 2\nx **= 10\nprint(f\"x **= 10: {x}\")  # 1024",
            examples: [
              { title: "Count Up and Down", code: "count = 0\ncount += 5\ncount += 3\ncount -= 2\nprint(f\"Count: {count}\")\ncount *= 4\nprint(f\"After multiply: {count}\")\n# Output: Count: 6\n# After multiply: 24" },
              { title: "Shopping Bill", code: "total = 0\ntotal += 250  # shirt\ntotal += 120  # jeans\ntotal += 80   # socks\ntotal -= 50   # coupon\nprint(f\"Total bill: {total}\")\n# Output: Total bill: 400" }
            ]
          },
          {
            id: "py-bitwise-ops",
            title: "Bitwise Operators",
            definition: "Bitwise operators perform operations on the individual bits of integer operands; Python provides &, |, ^, ~, <<, and >> for bitwise AND, OR, XOR, complement, left shift, and right shift respectively.",
            theory: "Bitwise operators work on binary (0s and 1s) 🔢. & = AND (both must be 1), | = OR (at least one 1), ^ = XOR (exactly one 1), ~ = NOT (flip all), << = shift left (multiply by 2), >> = shift right (divide by 2). Used in low-level programming and flags.",
            code: "a = 5    # binary: 0101\nb = 3    # binary: 0011\nprint(f\"a & b  = {a & b}\")  # 0101 & 0011 = 0001 (1)\nprint(f\"a | b  = {a | b}\")  # 0101 | 0011 = 0111 (7)\nprint(f\"a ^ b  = {a ^ b}\")  # 0101 ^ 0011 = 0110 (6)\nprint(f\"~a     = {~a}\")     # invert -> -6\nprint(f\"a << 1 = {a << 1}\") # 0101 << 1 = 1010 (10)\nprint(f\"a >> 1 = {a >> 1}\") # 0101 >> 1 = 0010 (2)",
            examples: [
              { title: "Even or Odd with Bitwise", code: "num = 9\nif num & 1:\n    print(f\"{num} is odd\")\nelse:\n    print(f\"{num} is even\")\nprint(f\"9 & 6 = {9 & 6}\")\n# Output: 9 is odd\n# 9 & 6 = 0" },
              { title: "Binary Showcase", code: "a = 6\nb = 3\nprint(f\"{a} in binary: {bin(a)}\")\nprint(f\"{b} in binary: {bin(b)}\")\nprint(f\"a | b = {a | b}\")\nprint(f\"a << 1 = {a << 1}\")\nprint(f\"b >> 1 = {b >> 1}\")\n# Output: 6 in binary: 0b110\n# 3 in binary: 0b11\n# a | b = 7\n# a << 1 = 12\n# b >> 1 = 1" }
            ]
          },
          {
            id: "py-membership-ops",
            title: "Membership Operators",
            definition: "Membership operators test for the presence of a value within a sequence or collection; Python provides in, which returns True if the value exists, and not in, which returns True if it does not exist.",
            theory: "in checks if a value exists inside a collection 🔍. Like checking if your name is on the class list: 'Ali' in ['Ali', 'Sara', 'Ahmed'] -> True. not in checks if it DOESN'T exist. Works with strings, lists, tuples, sets, dictionaries.",
            code: "word = \"Hello, World!\"\nprint(f\"'World' in word: {'World' in word}\")  # True\nprint(f\"'Python' not in word: {'Python' not in word}\")  # True\n\nfruits = [\"apple\", \"banana\", \"cherry\"]\nprint(f\"'apple' in fruits: {'apple' in fruits}\")  # True\nprint(f\"'grape' in fruits: {'grape' in fruits}\")  # False\n\nperson = {\"name\": \"Ali\", \"age\": 20}\nprint(f\"'name' in person: {'name' in person}\")  # True (checks KEYS)",
            examples: [
              { title: "Count Vowels", code: "word = \"education\"\nvowels = \"aeiou\"\ncount = 0\nfor letter in word:\n    if letter in vowels:\n        count += 1\nprint(f\"Vowels in {word}: {count}\")\n# Output: Vowels in education: 5" },
              { title: "Course Enrollment", code: "courses = [\"math\", \"physics\", \"cs\", \"english\"]\ncheck_cs = \"cs\" in courses\ncheck_art = \"art\" in courses\nprint(f\"cs in courses: {check_cs}\")\nprint(f\"art in courses: {check_art}\")\n# Output: cs in courses: True\n# art in courses: False" }
            ]
          },
          {
            id: "py-identity-ops",
            title: "Identity Operators",
            definition: "Identity operators compare the memory addresses of two objects rather than their values; Python provides is and is not, which return True when two names refer to the same object and when they refer to different objects, respectively.",
            theory: "is checks if two variables are the SAME object (same address in memory) 🆔. == checks if values are equal. They are different! Like twins: same value (== True), but different people (is False). Use is only for None (special value meaning 'nothing').",
            code: "a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(f\"a == b: {a == b}\")  # True (same values)\nprint(f\"a is b: {a is b}\")  # False (different objects)\nprint(f\"a is c: {a is c}\")  # True (same object)\n\nx = None\nprint(f\"x is None: {x is None}\")  # True",
            examples: [
              { title: "Check for None", code: "result = None\nif result is None:\n    print(\"No result found\")\nelse:\n    print(f\"Result: {result}\")\n# Output: No result found" },
              { title: "Same Object or Same Value?", code: "a = [1, 2]\nb = [1, 2]\nc = a\nprint(f\"a == b: {a == b}\")\nprint(f\"a is b: {a is b}\")\nprint(f\"a is c: {a is c}\")\n# Output: a == b: True\n# a is b: False\n# a is c: True" }
            ]
          },
          {
            id: "py-if-elif-else",
            title: "if-elif-else",
            definition: "The if-elif-else statement is a conditional control structure that evaluates conditions sequentially from top to bottom and executes the block associated with the first condition that evaluates to true, with the else block executed only when no condition holds.",
            theory: "if-elif-else makes decisions with multiple options 🚦. if = first check, elif = else if (many allowed), else = catch-all (optional). Conditions checked top to bottom, first true one runs. Ternary operator: x if condition else y — a one-line if-else!",
            code: "marks = 75\n\nif marks >= 90:\n    grade = \"A+\"\nelif marks >= 80:\n    grade = \"A\"\nelif marks >= 70:\n    grade = \"B\"\nelif marks >= 60:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(f\"Marks: {marks}, Grade: {grade}\")\n\n# Ternary (one-liner)\nage = 20\nstatus = \"Adult\" if age >= 18 else \"Minor\"\nprint(f\"Status: {status}\")",
            examples: [
              { title: "Number Category", code: "num = 0\nif num > 0:\n    print(\"Positive\")\nelif num < 0:\n    print(\"Negative\")\nelse:\n    print(\"Zero\")\n# Output: Zero" },
              { title: "Weekend or Study Day", code: "day = \"Saturday\"\nweekend = day == \"Saturday\" or day == \"Sunday\"\nactivity = \"Rest\" if weekend else \"Study\"\nprint(f\"Day: {day}\")\nprint(f\"Activity: {activity}\")\n# Output: Day: Saturday\n# Activity: Rest" }
            ]
          },
          {
            id: "py-while-loop",
            title: "while Loop",
            definition: "A while loop is an entry-controlled iterative statement that executes a block of code repeatedly as long as the given condition remains true; it may also have an optional else clause that runs when the loop terminates normally.",
            theory: "while repeats code as long as condition is True ♻️. Like watching a pot: while water NOT boiling, keep waiting. Condition checked BEFORE each run. If false at start, never runs. Use i += 1 inside to update counter. Optional else runs when condition becomes False.",
            code: "count = 5\nwhile count > 0:\n    print(f\"Countdown: {count}\")\n    count -= 1\nprint(\"Go!\")\n\n# Table of 7\nn = 7\ni = 1\nwhile i <= 10:\n    print(f\"{n} x {i} = {n * i}\")\n    i += 1\n\n# while with else\ni = 0\nwhile i < 3:\n    print(f\"i = {i}\")\n    i += 1\nelse:\n    print(\"Loop finished normally\")",
            examples: [
              { title: "Sum of First N Numbers", code: "n = 5\ntotal = 0\ni = 1\nwhile i <= n:\n    total += i\n    i += 1\nprint(f\"Sum of 1 to {n} = {total}\")\n# Output: Sum of 1 to 5 = 15" },
              { title: "Factorial with while", code: "n = 5\nfact = 1\ni = 1\nwhile i <= n:\n    fact *= i\n    i += 1\nprint(f\"{n}! = {fact}\")\n# Output: 5! = 120" }
            ]
          },
          {
            id: "py-for-loop-range",
            title: "for Loop & range()",
            definition: "A for loop is an iterative statement that traverses each item of an iterable such as a sequence or iterator, executing its body once per item; the range() function generates a sequence of numbers to support a definite number of iterations.",
            theory: "for loop goes through each item in a collection 🔁. Like going through a list of names one by one. range(5) gives numbers 0 to 4. range(2, 8) gives 2 to 7. range(0, 10, 2) gives 0, 2, 4, 6, 8. enumerate() gives index AND value together. zip() goes through two lists at once.",
            code: "for char in \"Python\":\n    print(char, end=\" \")\nprint()\n\nprint(\"range(5):\", list(range(5)))      # [0,1,2,3,4]\nprint(\"range(2,8):\", list(range(2,8)))  # [2,3,4,5,6,7]\nprint(\"range(0,10,2):\", list(range(0,10,2)))  # [0,2,4,6,8]\n\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor i, fruit in enumerate(fruits):\n    print(f\"{i}. {fruit}\")",
            examples: [
              { title: "Sum of Even Numbers", code: "total = 0\nfor i in range(2, 11, 2):\n    total += i\nprint(f\"Sum of even numbers 2-10: {total}\")\n# Output: Sum of even numbers 2-10: 30" },
              { title: "Match Names to Scores", code: "names = [\"Ali\", \"Sara\", \"Hina\"]\nscores = [85, 90, 78]\nfor name, score in zip(names, scores):\n    print(f\"{name} scored {score}\")\n# Output: Ali scored 85\n# Sara scored 90\n# Hina scored 78" }
            ]
          },
          {
            id: "py-break-continue-pass",
            title: "break, continue, pass",
            definition: "The break statement terminates the enclosing loop immediately, the continue statement skips the remaining statements of the current iteration and proceeds to the next iteration, and the pass statement performs no operation and serves as a placeholder.",
            theory: "break stops the loop completely 🛑 — like 'I'm done!'. continue skips current round and goes to next ⏭ — like 'skip this one'. pass does nothing — a placeholder for empty code 🫥. Useful when you plan to write code later.",
            code: "# break: stop at first multiple of 7\nfor i in range(1, 100):\n    if i % 7 == 0:\n        print(f\"First multiple of 7: {i}\")\n        break\n\n# continue: skip even numbers\nprint(\"Odd numbers 1-10:\", end=\" \")\nfor i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    print(i, end=\" \")\nprint()\n\n# pass: placeholder\nfor i in range(5):\n    if i == 3:\n        pass  # do nothing (will write later)\n    print(i, end=\" \")\nprint()",
            examples: [
              { title: "Stop at a Negative Number", code: "nums = [3, 8, 2, -5, 10, 7]\nfor num in nums:\n    if num < 0:\n        print(f\"Stopped at negative: {num}\")\n        break\n    print(num)\n# Output: 3\n# 8\n# 2\n# Stopped at negative: -5" },
              { title: "Skip Multiples of 3", code: "for i in range(1, 11):\n    if i % 3 == 0:\n        continue\n    print(i, end=\" \")\nprint()\nprint(\"Multiples of 3 were skipped\")\n# Output: 1 2 4 5 7 8 10\n# Multiples of 3 were skipped" }
            ]
          },
          {
            id: "py-nested-loops",
            title: "Nested Loops",
            definition: "A nested loop is a loop contained within the body of another loop, so that for each iteration of the outer loop, the inner loop completes all of its iterations.",
            theory: "Nested loops = loop inside another loop 🔄🔄. Like running laps: for each outer lap, run ALL inner laps. If outer runs 5 times and inner runs 5 times, total = 25 iterations. Used for multiplication tables, patterns, and matrices. break/continue only affects the innermost loop.",
            code: "# Multiplication table\nfor i in range(1, 6):\n    for j in range(1, 6):\n        print(f\"{i*j:4d}\", end=\"\")\n    print()  # new line\n\n# Star patterns\nn = 5\nfor i in range(1, n + 1):\n    print(\"*\" * i)\n\nprint()\n\n# Pyramid\nfor i in range(1, n + 1):\n    spaces = \" \" * (n - i)\n    stars = \"*\" * (2 * i - 1)\n    print(spaces + stars)",
            examples: [
              { title: "Number Triangle", code: "for i in range(1, 5):\n    for j in range(1, i + 1):\n        print(j, end=\" \")\n    print()\n# Output: 1\n# 1 2\n# 1 2 3\n# 1 2 3 4" },
              { title: "Rectangle Pattern", code: "rows = 3\ncols = 5\nfor i in range(rows):\n    for j in range(cols):\n        print(\"*\", end=\"\")\n    print()\n# Output: *****\n# *****\n# *****" }
            ]
          }
        ]
      },
      {
        id: "unit-3",
        title: "Unit 3",
        subtitle: "Built-in Data Structures",
        concepts: [
          {
            id: "py-lists",
            title: "Lists",
            definition: "A list is an ordered, mutable collection of elements enclosed in square brackets, which can store values of different types and supports operations such as append, insert, remove, and slicing.",
            theory: "Lists are like a shopping cart 🛒 — you can add, remove, and change items. Created with []. Order is preserved. Methods: append (add at end), insert (at position), remove (by value), pop (remove and return last), sort (ascending order), reverse (flip). Slice [1:3] gets items from index 1 to 2.",
            code: "numbers = [1, 2, 3, 4, 5]\nnumbers.append(6)       # [1,2,3,4,5,6]\nnumbers.insert(1, 99)   # [1,99,2,3,4,5,6]\nnumbers.remove(3)       # [1,99,2,4,5,6]\nlast = numbers.pop()    # removes 6, returns 6\nprint(f\"Popped: {last}, List: {numbers}\")\n\n# Slice\nnums = [0, 1, 2, 3, 4, 5]\nprint(f\"nums[1:4]: {nums[1:4]}\")  # [1,2,3]\n\n# List comprehension (shortcut)\nsquares = [x**2 for x in range(10)]\nprint(f\"Squares: {squares}\")",
            examples: [
              { title: "Fruit Shopping Cart", code: "cart = []\ncart.append(\"apple\")\ncart.append(\"banana\")\ncart.append(\"orange\")\ncart.remove(\"banana\")\nprint(f\"Cart: {cart}\")\nprint(f\"Size: {len(cart)}\")\n# Output: Cart: ['apple', 'orange']\n# Size: 2" },
              { title: "Evens and Squares", code: "numbers = [1, 2, 3, 4, 5, 6, 7, 8]\nevens = [x for x in numbers if x % 2 == 0]\nsquares = [x * x for x in range(1, 6)]\nprint(f\"Evens: {evens}\")\nprint(f\"Squares: {squares}\")\nprint(f\"Squares[1:3]: {squares[1:3]}\")\n# Output: Evens: [2, 4, 6, 8]\n# Squares: [1, 4, 9, 16, 25]\n# Squares[1:3]: [4, 9]" }
            ]
          },
          {
            id: "py-tuples",
            title: "Tuples",
            definition: "A tuple is an ordered, immutable collection of elements enclosed in parentheses, which cannot be modified after creation and can be used as dictionary keys and for returning multiple values from a function.",
            theory: "Tuples are like lists that CANNOT be changed 🔒. Created with (). Once made, no adding, removing, or modifying. Safer for data that should stay constant. Can be used as dictionary keys (lists can't). Single item needs a comma: (42,). Good for coordinates (x, y) that shouldn't change.",
            code: "colors = (\"red\", \"green\", \"blue\")\nprint(f\"First: {colors[0]}\")   # red\nprint(f\"Last: {colors[-1]}\")   # blue\n\n# colors[0] = \"yellow\"  # ERROR! tuples can't change\n\n# Unpacking\npoint = (3, 4)\nx, y = point\nprint(f\"x={x}, y={y}\")\n\n# Tuple as dictionary key\nlocations = {\n    (40.71, -74.00): \"New York\",\n    (51.50, -0.12): \"London\"\n}\nprint(locations[(40.71, -74.00)])  # New York",
            examples: [
              { title: "City Coordinates", code: "city1 = (24.86, 67.01)\ncity2 = (31.52, 74.35)\nprint(f\"City 1: {city1}\")\nx, y = city1\nprint(f\"Latitude: {x}, Longitude: {y}\")\nprint(f\"Different cities: {city1 != city2}\")\n# Output: City 1: (24.86, 67.01)\n# Latitude: 24.86, Longitude: 67.01\n# Different cities: True" },
              { title: "Tuple of Colors", code: "colors = (\"red\", \"green\", \"blue\")\nprint(f\"First color: {colors[0]}\")\nprint(f\"Last color: {colors[-1]}\")\nfor color in colors:\n    print(f\"Color: {color}\")\n# Output: First color: red\n# Last color: blue\n# Color: red\n# Color: green\n# Color: blue" }
            ]
          },
          {
            id: "py-sets",
            title: "Sets",
            definition: "A set is an unordered collection of unique elements enclosed in braces, which automatically eliminates duplicates and supports set operations such as union, intersection, and difference.",
            theory: "Sets are unordered and contain UNIQUE values only 🎯. Created with {}. Duplicates automatically removed. Supports math operations: union | (combine), intersection & (common), difference - (items in first NOT in second). Handy for removing duplicates from a list!",
            code: "# Set removes duplicates automatically\nfrom_list = set([1, 2, 2, 3, 3, 3])\nprint(f\"From list: {from_list}\")  # {1, 2, 3}\n\na = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\n\nprint(f\"Union: {a | b}\")           # {1,2,3,4,5,6,7,8}\nprint(f\"Intersection: {a & b}\")    # {4,5}\nprint(f\"Difference: {a - b}\")      # {1,2,3}\n\n# Remove duplicates\nwords = [\"hello\", \"world\", \"hello\", \"python\"]\nprint(f\"Unique words: {set(words)}\")",
            examples: [
              { title: "Common Friends", code: "ali_friends = {\"sara\", \"ahmed\", \"hina\"}\nsara_friends = {\"hina\", \"bilal\", \"umair\"}\ncommon = sorted(ali_friends & sara_friends)\nall_friends = sorted(ali_friends | sara_friends)\nprint(f\"Common friends: {common}\")\nprint(f\"All unique friends: {all_friends}\")\n# Output: Common friends: ['hina']\n# All unique friends: ['ahmed', 'bilal', 'hina', 'sara', 'umair']" },
              { title: "Remove Duplicates", code: "roll_numbers = [101, 102, 101, 103, 102, 104]\nunique = sorted(set(roll_numbers))\nprint(f\"Original list: {roll_numbers}\")\nprint(f\"Unique values: {unique}\")\nprint(f\"Count of unique: {len(unique)}\")\n# Output: Original list: [101, 102, 101, 103, 102, 104]\n# Unique values: [101, 102, 103, 104]\n# Count of unique: 4" }
            ]
          },
          {
            id: "py-dictionaries",
            title: "Dictionaries",
            definition: "A dictionary is an unordered collection of key-value pairs, where each key is unique and immutable and maps to an associated value.",
            theory: "Dictionaries store key:value pairs like a phonebook 📒. Key = name, Value = number. Access with d['key'] or d.get('key', default). Keys must be unique and unchangeable. Methods: keys(), values(), items(). Can create dicts with comprehension: {x: x**2 for x in range(5)}.",
            code: "student = {\"name\": \"Ali\", \"age\": 20, \"gpa\": 3.75}\n\nprint(f\"Name: {student['name']}\")     # Ali\nprint(f\"Grade: {student.get('grade', 'N/A')}\")  # N/A (safe access)\n\nstudent[\"age\"] = 21  # change value\nstudent[\"major\"] = \"CS\"  # add new key:value\n\nfor key, value in student.items():\n    print(f\"  {key}: {value}\")\n\n# Dictionary comprehension\nsquares = {x: x**2 for x in range(1, 6)}\nprint(f\"Squares: {squares}\")",
            examples: [
              { title: "Phonebook", code: "phonebook = {\"Ali\": \"0300-1111111\", \"Sara\": \"0301-2222222\"}\nphonebook[\"Hina\"] = \"0302-3333333\"\nfor name, number in phonebook.items():\n    print(f\"{name}: {number}\")\n# Output: Ali: 0300-1111111\n# Sara: 0301-2222222\n# Hina: 0302-3333333" },
              { title: "Count Word Frequency", code: "sentence = \"the cat and the dog and the bird\"\ncounts = {}\nfor word in sentence.split():\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)\n# Output: {'the': 3, 'cat': 1, 'and': 2, 'dog': 1, 'bird': 1}" }
            ]
          }
        ]
      },
      {
        id: "unit-4",
        title: "Unit 4",
        subtitle: "Functions",
        concepts: [
          {
            id: "py-built-in-functions",
            title: "Built-in Functions",
            definition: "Built-in functions are the predefined functions that are always available in Python without requiring an import, such as len(), sum(), max(), min(), sorted(), and type(), which perform common operations on data.",
            theory: "Python has many ready-made functions 🛠️. Type: int(), float(), str(). Math: round(), max(), min(), sum(), len(). String: upper(), lower(), split(), join(). Iteration: enumerate() (index & value), zip() (combine lists), map() (apply to all), filter() (keep matching). These save you time!",
            code: "print(int(\"42\"), float(\"3.14\"))  # type conversion\n\nnums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(f\"Sum: {sum(nums)}, Max: {max(nums)}, Min: {min(nums)}\")\nprint(f\"Length: {len(nums)}\")\n\ntext = \"  Hello, World!  \"\nprint(f\"'{text.strip().upper()}'\")\n\n# enumerate & zip\nnames = [\"Ali\", \"Sara\"]\nscores = [85, 92]\nfor i, (n, s) in enumerate(zip(names, scores), 1):\n    print(f\"{i}. {n}: {s}\")",
            examples: [
              { title: "Analyze Student Scores", code: "scores = [72, 85, 90, 65, 88]\nprint(f\"Sum: {sum(scores)}\")\nprint(f\"Average: {sum(scores) / len(scores)}\")\nprint(f\"Max: {max(scores)}, Min: {min(scores)}\")\nprint(f\"Sorted: {sorted(scores)}\")\n# Output: Sum: 400\n# Average: 80.0\n# Max: 90, Min: 65\n# Sorted: [65, 72, 85, 88, 90]" },
              { title: "Clean and Split a Sentence", code: "text = \"  hello, world, python  \"\ncleaned = text.strip().upper()\nwords = cleaned.split(\", \")\nprint(f\"Cleaned: {cleaned}\")\nprint(f\"Words: {words}\")\nprint(f\"Number of words: {len(words)}\")\n# Output: Cleaned: HELLO, WORLD, PYTHON\n# Words: ['HELLO', 'WORLD', 'PYTHON']\n# Number of words: 3" }
            ]
          },
          {
            id: "py-file-handling",
            title: "File Handling",
            definition: "File handling is the process of reading from and writing to files on secondary storage; in Python files are accessed using the open() function with modes such as r, w, and a, and are managed safely with the with statement, which automatically closes the file.",
            theory: "Files save data permanently 💾. Use open('file.txt', 'r') to read, 'w' to write (overwrites!), 'a' to add. Always close file or use 'with' (auto-closes). read() gets all text, readlines() gets list of lines. Write with write() or print(file=f). Always check file exists!",
            code: "# Write to file\nwith open(\"example.txt\", \"w\") as f:\n    f.write(\"Hello, World!\\n\")\n    f.write(\"Python is fun!\\n\")\n\n# Read whole file\nwith open(\"example.txt\", \"r\") as f:\n    content = f.read()\n    print(\"Full content:\")\n    print(content)\n\n# Read line by line\nwith open(\"example.txt\", \"r\") as f:\n    for line in f:\n        print(line.strip())",
            examples: [
              { title: "Write and Count Lines", code: "with open(\"scores.txt\", \"w\") as f:\n    f.write(\"85\\n90\\n78\\n92\\n\")\nwith open(\"scores.txt\", \"r\") as f:\n    lines = f.readlines()\nprint(f\"Lines read: {len(lines)}\")\nprint(f\"First line: {lines[0].strip()}\")\n# Output: Lines read: 4\n# First line: 85" },
              { title: "Read Names from a File", code: "with open(\"names.txt\", \"w\") as f:\n    f.write(\"Ali\\nSara\\nHina\\n\")\nprint(\"Names in file:\")\nwith open(\"names.txt\", \"r\") as f:\n    for line in f:\n        print(line.strip())\n# Output: Names in file:\n# Ali\n# Sara\n# Hina" }
            ]
          },
          {
            id: "py-functions",
            title: "User-defined Functions",
            definition: "A user-defined function is a named, reusable block of statements that performs a specific task and can accept parameters and return a value; Python functions support default parameters, variable-length arguments, and lambda expressions.",
            theory: "Functions are mini-programs you create and reuse 🏗️. Def with def, return value with return. Parameters are inputs. Default parameters: def f(x=10) — if no argument given, uses 10. *args collects multiple arguments as tuple. **kwargs collects named arguments as dict.",
            code: "def greet(name):\n    return f\"Hello, {name}!\"\nprint(greet(\"Ali\"))\n\n# Default parameter\ndef power(base, exp=2):\n    return base ** exp\nprint(power(3))      # 9 (uses default exp=2)\nprint(power(3, 3))   # 27\n\n# Multiple arguments\ndef total(*args):\n    return sum(args)\nprint(total(1, 2, 3, 4, 5))  # 15\n\n# Lambda (one-liner function)\nsquare = lambda x: x ** 2\nprint(f\"Square 5: {square(5)}\")",
            examples: [
              { title: "Area Calculator", code: "def area_of_rectangle(length, width):\n    return length * width\n\nprint(f\"Area: {area_of_rectangle(5, 4)}\")\nprint(f\"Area: {area_of_rectangle(7, 3)}\")\n# Output: Area: 20\n# Area: 21" },
              { title: "Average of Marks", code: "def average(*marks):\n    return sum(marks) / len(marks)\n\nresult = average(85, 90, 70)\nprint(f\"Average: {result:.2f}\")\nprint(f\"Above 80? {result > 80}\")\n# Output: Average: 81.67\n# Above 80? True" }
            ]
          },
          {
            id: "py-recursion",
            title: "Recursion in Python",
            definition: "Recursion is a programming technique in which a function calls itself to solve a smaller instance of the same problem, terminating through a base case.",
            theory: "Recursion = function calling ITSELF 🔄. Like a dream within a dream within a dream (Inception!). Need base case (stop condition) and recursive call (simpler version). Python has limit (~1000 calls) to prevent infinite recursion. Classic examples: factorial, Fibonacci, Tower of Hanoi.",
            code: "def factorial(n):\n    if n <= 1: return 1      # base case\n    return n * factorial(n-1) # recursive case\n\nprint(f\"5! = {factorial(5)}\")  # 120\n\ndef fibonacci(n):\n    if n == 0: return 0\n    if n == 1: return 1\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint([fibonacci(i) for i in range(10)])\n\ndef hanoi(n, src, tgt, aux):\n    if n == 1:\n        print(f\"Move disk 1 from {src} to {tgt}\")\n        return\n    hanoi(n-1, src, aux, tgt)\n    print(f\"Move disk {n} from {src} to {tgt}\")\n    hanoi(n-1, aux, tgt, src)\n\nhanoi(3, 'A', 'C', 'B')",
            examples: [
              { title: "Sum of Natural Numbers", code: "def sum_natural(n):\n    if n == 1:\n        return 1\n    return n + sum_natural(n - 1)\n\nprint(f\"Sum of 1 to 100: {sum_natural(100)}\")\n# Output: Sum of 1 to 100: 5050" },
              { title: "Recursive Countdown", code: "def countdown(n):\n    print(n, end=\" \")\n    if n <= 0:\n        return\n    countdown(n - 1)\n\ncountdown(5)\nprint()\n# Output: 5 4 3 2 1 0" }
            ]
          },
          {
            id: "py-scope",
            title: "Scope (LEGB Rule)",
            definition: "Scope defines the region of a program in which a name is accessible; Python resolves names according to the LEGB rule, searching the local, enclosing, global, and built-in scopes in that order.",
            theory: "Scope = where Python looks for a variable 👀. LEGB: Local (inside function) → Enclosing (outer function) → Global (module level) → Built-in (Python itself). Use global to modify a global variable inside a function. Use nonlocal for nested functions.",
            code: "x = \"global\"\n\ndef outer():\n    x = \"outer\"\n    def inner():\n        x = \"inner\"\n        print(f\"Inner: {x}\")  # inner (closest)\n    inner()\n    print(f\"Outer: {x}\")  # outer\nouter()\nprint(f\"Global: {x}\")  # global\n\n# global keyword\ndef increment():\n    global counter\n    counter += 1\n\ncounter = 0\nincrement()\nincrement()\nprint(f\"Counter: {counter}\")  # 2",
            examples: [
              { title: "Counter with global", code: "counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n\nincrement()\nincrement()\nincrement()\nprint(f\"Counter: {counter}\")\n# Output: Counter: 3" },
              { title: "Local vs Global", code: "message = \"global message\"\n\ndef show():\n    message = \"local message\"\n    print(f\"Inside function: {message}\")\n\nshow()\nprint(f\"Outside function: {message}\")\n# Output: Inside function: local message\n# Outside function: global message" }
            ]
          }
        ]
      },
      {
        id: "unit-5",
        title: "Unit 5",
        subtitle: "Modules & Libraries",
        concepts: [
          {
            id: "py-modules-packages",
            title: "Modules & Packages",
            definition: "A module is a single Python file containing definitions and statements that can be imported for reuse, and a package is a directory of related modules; together they enable code organization and reuse through the import statement.",
            theory: "Modules are Python files with reusable code 📦. Import with import math or from math import pi. Standard library has many useful modules: math (math functions), random (random numbers), datetime (dates), os (operating system). if __name__ == '__main__' lets a file be both run directly and imported.",
            code: "import math\nimport random\nimport datetime\n\nprint(f\"pi = {math.pi}\")\nprint(f\"sqrt(16) = {math.sqrt(16)}\")  # 4.0\nprint(f\"ceil(3.2) = {math.ceil(3.2)}\")  # 4\nprint(f\"Random 1-100: {random.randint(1, 100)}\")\n\nnow = datetime.datetime.now()\nprint(f\"Now: {now.strftime('%Y-%m-%d %H:%M:%S')}\")\n\nfrom math import pi, sin\nprint(f\"sin(pi/2) = {sin(pi/2)}\")",
            examples: [
              { title: "Math Helpers", code: "import math\n\nprint(f\"sqrt(144) = {math.sqrt(144)}\")\nprint(f\"2 ** 10 = {math.pow(2, 10)}\")\nprint(f\"floor(4.8) = {math.floor(4.8)}\")\nprint(f\"gcd(48, 18) = {math.gcd(48, 18)}\")\n# Output: sqrt(144) = 12.0\n# 2 ** 10 = 1024.0\n# floor(4.8) = 4\n# gcd(48, 18) = 6" },
              { title: "Import Specific Names", code: "from math import pi, sqrt\n\nprint(f\"sqrt(25) = {sqrt(25)}\")\nprint(f\"Pi: {pi}\")\nprint(f\"Rounded Pi: {round(pi, 2)}\")\n# Output: sqrt(25) = 5.0\n# Pi: 3.141592653589793\n# Rounded Pi: 3.14" }
            ]
          },
          {
            id: "py-matplotlib",
            title: "Matplotlib",
            definition: "Matplotlib is a comprehensive plotting library for Python that provides functions such as plot(), bar(), pie(), and scatter() for creating a wide variety of charts and graphs.",
            theory: "Matplotlib creates charts 📊📈. Import as plt. plot() for line chart, bar() for bar chart, scatter() for dots, pie() for pie chart. Customize with title, xlabel, ylabel, legend, grid. show() displays, savefig() saves. The most popular charting library in Python!",
            code: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\nplt.plot(x, y, marker='o', color='blue', label='y=2x')\nplt.title(\"Simple Line Chart\")\nplt.xlabel(\"X-axis\")\nplt.ylabel(\"Y-axis\")\nplt.legend()\nplt.grid(True)\nplt.show()\n\n# Bar chart\nsubjects = ['Math', 'Science', 'English', 'CS']\nscores = [85, 78, 92, 95]\nplt.bar(subjects, scores, color=['red','green','blue','cyan'])\nplt.title(\"Subject Scores\")\nplt.show()",
            examples: [
              { title: "Pie Chart of Favorites", code: "import matplotlib.pyplot as plt\n\nfruits = [\"Apple\", \"Banana\", \"Mango\", \"Grapes\"]\ncounts = [30, 25, 20, 25]\nplt.pie(counts, labels=fruits, autopct=\"%1.1f%%\")\nplt.title(\"Fruit Preference Survey\")\nplt.show()\n# Output: displays a pie chart with fruit percentages" },
              { title: "Scatter Plot", code: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [3, 5, 4, 6, 8]\nplt.scatter(x, y, color=\"red\")\nplt.title(\"Scatter Plot\")\nplt.xlabel(\"X values\")\nplt.ylabel(\"Y values\")\nplt.grid(True)\nplt.show()\n# Output: displays a scatter plot with red dots" }
            ]
          },
          {
            id: "py-numpy",
            title: "NumPy",
            definition: "NumPy is a Python library that provides a high-performance multidimensional array object and functions for performing fast numerical operations such as element-wise arithmetic, aggregation, and reshaping.",
            theory: "NumPy (Numerical Python) handles arrays efficiently 🧮. Faster than Python lists for math. np.array() creates array. np.zeros(), np.ones(), np.arange() are shortcuts. Supports element-wise operations: add, multiply without loops. shape gives dimensions. reshape changes layout.",
            code: "import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nprint(f\"Array: {arr}\")\n\nzeros = np.zeros((2, 3))  # 2x3 matrix of zeros\nones = np.ones((2, 3))    # 2x3 matrix of ones\nprint(f\"Zeros:\\n{zeros}\")\n\narange = np.arange(0, 10, 2)  # [0,2,4,6,8]\nprint(f\"Arange: {arange}\")\n\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(f\"Add: {a + b}\")        # [5,7,9]\nprint(f\"Multiply: {a * b}\")   # [4,10,18]\n\nprint(f\"Mean: {arr.mean()}, Sum: {arr.sum()}\")",
            examples: [
              { title: "Reshape a Matrix", code: "import numpy as np\n\ndata = np.arange(1, 13)  # numbers 1 to 12\nmatrix = data.reshape(3, 4)\nprint(f\"Matrix shape: {matrix.shape}\")\nprint(matrix)\n# Output: Matrix shape: (3, 4)\n# [[ 1  2  3  4]\n#  [ 5  6  7  8]\n#  [ 9 10 11 12]]" },
              { title: "Statistics with NumPy", code: "import numpy as np\n\nscores = np.array([65, 75, 85, 95, 80])\nprint(f\"Mean: {scores.mean()}\")\nprint(f\"Max: {scores.max()}\")\nprint(f\"Sum: {scores.sum()}\")\nprint(f\"Std deviation: {scores.std():.2f}\")\n# Output: Mean: 80.0\n# Max: 95\n# Sum: 400\n# Std deviation: 10.00" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ds",
    title: "Data Structures",
    subtitle: "C/Python — Semester 3",
    icon: "📊",
    color: "#F0ABFC",
    description: "Understand stacks, queues, linked lists, trees, graphs, sorting and searching.",
    units: [
      {
        id: "unit-1",
        title: "Unit 1",
        subtitle: "Foundations",
        concepts: [
          {
            id: "ds-basics",
            title: "Data Structure Basics",
            definition: "A data structure is a systematic way of organizing and storing data in computer memory so that it can be accessed and manipulated efficiently, classified as either linear or non-linear.",
            theory: "Data structures are ways to organize data efficiently 🗂️. Like a wardrobe: you can hang clothes (linked list), stack plates (stack), queue at counter (queue), family tree (tree), friend network (graph). Linear = one after another. Non-linear = hierarchy/connections. Choose the right one for speed!",
            code: "#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int n = 5;\n\n    // Traverse\n    printf(\"Elements: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n\n    // Search\n    int key = 30;\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) {\n            printf(\"Found %d at index %d\\n\", key, i);\n            break;\n        }\n\n    // Insert at position\n    int pos = 2, val = 25;\n    for (int i = n; i > pos; i--) arr[i] = arr[i-1];\n    arr[pos] = val; n++;\n    printf(\"After insert: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Reverse an Array", code: "#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int n = 5;\n    printf(\"Original: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    for (int i = 0, j = n-1; i < j; i++, j--) {\n        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n    }\n    printf(\"Reversed: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: Original: 10 20 30 40 50\n// Reversed: 50 40 30 20 10" },
              { title: "Find Largest Element", code: "#include <stdio.h>\nint main() {\n    int arr[] = {34, 12, 78, 45, 9, 61};\n    int n = 6;\n    int largest = arr[0];\n    for (int i = 1; i < n; i++)\n        if (arr[i] > largest) largest = arr[i];\n    printf(\"Largest element: %d\\n\", largest);\n    return 0;\n}\n// Output: Largest element: 78" }
            ]
          },
          {
            id: "algorithm-complexity",
            title: "Algorithm Complexity",
            definition: "Algorithm complexity is a measure of the time and space required by an algorithm as a function of its input size, used to compare the efficiency of different algorithms.",
            theory: "Complexity = how fast/slow an algorithm runs 📈. O(1) = constant (instant). O(log n) = very fast (binary search). O(n) = proportional (linear search). O(n²) = slow (nested loops). O(2ⁿ) = very slow (avoid!). We measure WORST case. Helps choose between algorithms.",
            code: "#include <stdio.h>\nint main() {\n    int n = 1000000;\n    printf(\"For n = %d:\\n\", n);\n    printf(\"O(1)      : ~1 operation\\n\");\n    printf(\"O(log n)  : ~20 operations (very fast)\\n\");\n    printf(\"O(n)      : ~1,000,000 operations\\n\");\n    printf(\"O(n^2)    : ~1 trillion operations (slow!)\\n\");\n    return 0;\n}",
            examples: [
              { title: "Counting Comparisons (O(n^2))", code: "#include <stdio.h>\nint main() {\n    int arr[] = {5, 4, 3, 2, 1};\n    int n = 5, comparisons = 0;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++) {\n            comparisons++;\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n        }\n    printf(\"Sorted: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    printf(\"Comparisons for n=%d: %d (about n^2/2)\\n\", n, comparisons);\n    return 0;\n}\n// Output: Sorted: 1 2 3 4 5\n// Comparisons for n=5: 10 (about n^2/2)" },
              { title: "Linear vs Binary Steps", code: "#include <stdio.h>\nint linearSteps(int arr[], int n, int key) {\n    int steps = 0;\n    for (int i = 0; i < n; i++) {\n        steps++;\n        if (arr[i] == key) break;\n    }\n    return steps;\n}\nint main() {\n    int arr[1000];\n    for (int i = 0; i < 1000; i++) arr[i] = i;\n    int key = 999;\n    printf(\"Linear search steps: %d (O(n))\\n\", linearSteps(arr, 1000, key));\n    int steps = 0, low = 0, high = 999;\n    while (low <= high) {\n        steps++;\n        int mid = (low + high) / 2;\n        if (arr[mid] == key) break;\n        else if (arr[mid] < key) low = mid + 1;\n        else high = mid - 1;\n    }\n    printf(\"Binary search steps: %d (O(log n))\\n\", steps);\n    return 0;\n}\n// Output: Linear search steps: 1000 (O(n))\n// Binary search steps: 10 (O(log n))" }
            ]
          },
          {
            id: "big-o-omega-theta",
            title: "Asymptotic Notations",
            definition: "Asymptotic notations are mathematical notations used to describe the growth rate of an algorithm's running time, where Big-O provides an upper bound, Omega provides a lower bound, and Theta provides a tight bound.",
            theory: "Three ways to describe algorithm speed 📏: Big-O = worst case (upper bound, most used), Omega = best case (lower bound), Theta = average case (tight bound). Think of exam: Best = all answers correct, Worst = all wrong, Average = typical score. We usually care about worst case!",
            code: "#include <stdio.h>\nint main() {\n    int n = 1000000;\n    printf(\"For n = %d:\\n\", n);\n    printf(\"O(1)      : Constant (array access)\\n\");\n    printf(\"O(log n)  : Logarithmic (binary search)\\n\");\n    printf(\"O(n)      : Linear (single loop)\\n\");\n    printf(\"O(n log n): Linearithmic (merge sort)\\n\");\n    printf(\"O(n^2)    : Quadratic (nested loops)\\n\");\n    return 0;\n}",
            examples: [
              { title: "Best vs Worst Case in Linear Search", code: "#include <stdio.h>\nint search(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) return i + 1;  // comparisons made\n    return n;\n}\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    printf(\"Best (Omega - first element):   %d comparison\\n\", search(arr, 5, 10));\n    printf(\"Average (Theta - middle):       %d comparisons\\n\", search(arr, 5, 30));\n    printf(\"Worst (Big-O - not found):      %d comparisons\\n\", search(arr, 5, 99));\n    return 0;\n}\n// Output: Best (Omega - first element):   1 comparison\n// Average (Theta - middle):       3 comparisons\n// Worst (Big-O - not found):      5 comparisons" },
              { title: "Omega vs Theta vs Big-O Steps", code: "#include <stdio.h>\nint main() {\n    int n = 10;\n    printf(\"For n = %d:\\n\", n);\n    printf(\"Omega (best)   : ~%d step\\n\", 1);\n    printf(\"Theta (average): ~%d steps\\n\", n);\n    printf(\"Big-O (worst)  : ~%d steps\\n\", n * n);\n    return 0;\n}\n// Output: For n = 10:\n// Omega (best)   : ~1 step\n// Theta (average): ~10 steps\n// Big-O (worst)  : ~100 steps" }
            ]
          },
          {
            id: "arrays-row-column",
            title: "Row Major & Column Major",
            definition: "Row-major and column-major are the two orders in which a multi-dimensional array is mapped into one-dimensional memory, where row-major stores elements row by row and column-major stores them column by column.",
            theory: "Computers store 2D arrays in two ways 📐. Row major (C): stores row 0, then row 1, then row 2... Like reading a book line by line. Column major (Fortran): stores column 0, then column 1... Like reading a newspaper column by column. Mostly useful for performance optimization.",
            code: "#include <stdio.h>\nint main() {\n    int arr[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};\n\n    printf(\"Row Major (row by row):\\n\");\n    for (int i = 0; i < 3; i++)\n        for (int j = 0; j < 4; j++)\n            printf(\"%d \", arr[i][j]);\n    printf(\"\\n\\n\");\n\n    printf(\"Column Major (column by column):\\n\");\n    for (int j = 0; j < 4; j++)\n        for (int i = 0; i < 3; i++)\n            printf(\"%d \", arr[i][j]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Flat Pointer View of 2D Array", code: "#include <stdio.h>\nint main() {\n    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    int *p = &arr[0][0];  // flat pointer into 2D array\n    printf(\"Flat view (row major): \");\n    for (int i = 0; i < 6; i++) printf(\"%d \", p[i]);\n    printf(\"\\n\");\n    printf(\"arr[1][0] = %d, same as p[3] = %d\\n\", arr[1][0], p[3]);\n    return 0;\n}\n// Output: Flat view (row major): 1 2 3 4 5 6\n// arr[1][0] = 4, same as p[3] = 4" },
              { title: "Column-Major Reading", code: "#include <stdio.h>\nint main() {\n    int arr[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    printf(\"Column major (column by column): \");\n    for (int j = 0; j < 3; j++)\n        for (int i = 0; i < 3; i++)\n            printf(\"%d \", arr[i][j]);  // same column, jump rows\n    printf(\"\\n\");\n    return 0;\n}\n// Output: Column major (column by column): 1 4 7 2 5 8 3 6 9" }
            ]
          },
          {
            id: "array-operations",
            title: "Array Operations",
            definition: "Array operations are the fundamental manipulations performed on an array, namely traversal, search, insertion, deletion, and updating of its elements.",
            theory: "Typical operations on arrays 🛠️: Traverse (visit each element), Search (find a value), Insert (add at position — shift others), Delete (remove — shift others), Update (change value). Insert/Delete are slow O(n) because shifting is needed. Access by index is instant O(1).",
            code: "#include <stdio.h>\nvoid display(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int arr[100] = {10, 20, 30, 40, 50};\n    int n = 5;\n\n    printf(\"Original: \"); display(arr, n);\n\n    // Insert at position 2\n    int pos = 2, val = 25;\n    for (int i = n; i > pos; i--) arr[i] = arr[i-1];\n    arr[pos] = val; n++;\n    printf(\"After insert: \"); display(arr, n);\n\n    // Delete at position 3\n    pos = 3;\n    for (int i = pos; i < n-1; i++) arr[i] = arr[i+1];\n    n--;\n    printf(\"After delete: \"); display(arr, n);\n    return 0;\n}",
            examples: [
              { title: "Search First Occurrence", code: "#include <stdio.h>\nint search(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) return i;\n    return -1;\n}\nint main() {\n    int arr[] = {5, 8, 2, 8, 9, 8};\n    int key = 8;\n    int idx = search(arr, 6, key);\n    if (idx != -1)\n        printf(\"First %d at index %d\\n\", key, idx);\n    else\n        printf(\"%d not found\\n\", key);\n    return 0;\n}\n// Output: First 8 at index 1" },
              { title: "Update All Occurrences", code: "#include <stdio.h>\nint main() {\n    int arr[] = {3, 7, 3, 2, 3, 8};\n    int n = 6, old = 3, nw = 99, count = 0;\n    for (int i = 0; i < n; i++)\n        if (arr[i] == old) { arr[i] = nw; count++; }\n    printf(\"After update: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\nReplaced %d occurrences\\n\", count);\n    return 0;\n}\n// Output: After update: 99 7 99 2 99 8\n// Replaced 3 occurrences" }
            ]
          }
        ]
      },
      {
        id: "unit-2",
        title: "Unit 2",
        subtitle: "Linear DS",
        concepts: [
          {
            id: "stack",
            title: "Stack (LIFO)",
            definition: "A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle, in which insertion (push) and deletion (pop) are performed only at the top of the stack.",
            theory: "Stack = Last In First Out 📚. Like a stack of plates: you put plates on TOP, take plates from TOP. The last plate placed is the first removed. Operations: push (add on top), pop (remove from top), peek (see top without removing). Used in: undo (Ctrl+Z), browser back button, function calls.",
            code: "#include <stdio.h>\n#define MAX 100\nint stack[MAX], top = -1;\n\nvoid push(int val) {\n    if (top == MAX-1) { printf(\"Overflow!\\n\"); return; }\n    stack[++top] = val;\n    printf(\"Pushed: %d\\n\", val);\n}\n\nint pop() {\n    if (top == -1) { printf(\"Underflow!\\n\"); return -1; }\n    return stack[top--];\n}\n\nint main() {\n    push(10); push(20); push(30);\n    printf(\"Pop: %d\\n\", pop());  // 30\n    printf(\"Pop: %d\\n\", pop());  // 20\n    return 0;\n}",
            examples: [
              { title: "Check Balanced Parentheses", code: "#include <stdio.h>\nchar stack[100]; int top = -1;\nvoid push(char c) { stack[++top] = c; }\nchar pop() { return stack[top--]; }\n\nint isBalanced(char expr[]) {\n    for (int i = 0; expr[i] != '\\0'; i++) {\n        char c = expr[i];\n        if (c == '(') push(c);\n        else if (c == ')') {\n            if (top == -1) return 0;\n            pop();\n        }\n    }\n    return top == -1;\n}\n\nint main() {\n    char e1[] = \"(a+b)*(c-d)\";\n    char e2[] = \"(a+b)*(c-d\";\n    printf(\"%s -> %s\\n\", e1, isBalanced(e1) ? \"Balanced\" : \"Not balanced\");\n    printf(\"%s -> %s\\n\", e2, isBalanced(e2) ? \"Balanced\" : \"Not balanced\");\n    return 0;\n}\n// Output: (a+b)*(c-d) -> Balanced\n// (a+b)*(c-d -> Not balanced" },
              { title: "Decimal to Binary Using Stack", code: "#include <stdio.h>\nint main() {\n    int n = 45, stack[100], top = -1;\n    printf(\"Decimal %d in binary: \", n);\n    while (n > 0) {\n        stack[++top] = n % 2;\n        n /= 2;\n    }\n    while (top != -1) printf(\"%d\", stack[top--]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: Decimal 45 in binary: 101101" }
            ]
          },
          {
            id: "infix-prefix-postfix",
            title: "Infix, Prefix & Postfix",
            definition: "Expressions are represented in three notations, where infix places the operator between operands, prefix places the operator before the operands, and postfix places the operator after the operands.",
            theory: "Three ways to write expressions ✏️. Infix: a + b (normal, with operators between). Prefix: + a b (operator before, no parentheses needed). Postfix: a b + (operator after, computer-friendly). Computers prefer postfix because no brackets or precedence rules needed — just a stack!",
            code: "#include <stdio.h>\n#include <ctype.h>\nchar stack[100]; int top = -1;\nvoid push(char c) { stack[++top] = c; }\nchar pop() { return stack[top--]; }\nint prec(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    return 0;\n}\n\nvoid infixToPostfix(char infix[], char postfix[]) {\n    int j = 0;\n    for (int i = 0; infix[i]; i++) {\n        char c = infix[i];\n        if (isalnum(c)) postfix[j++] = c;\n        else if (c == '(') push(c);\n        else if (c == ')') {\n            while (top != -1 && stack[top] != '(')\n                postfix[j++] = pop();\n            pop();\n        } else {\n            while (top != -1 && prec(stack[top]) >= prec(c))\n                postfix[j++] = pop();\n            push(c);\n        }\n    }\n    while (top != -1) postfix[j++] = pop();\n    postfix[j] = '\\0';\n}\n\nint main() {\n    char infix[] = \"A+B*C\";\n    char postfix[100];\n    infixToPostfix(infix, postfix);\n    printf(\"Infix: %s\\nPostfix: %s\\n\", infix, postfix);\n    return 0;\n}",
            examples: [
              { title: "Evaluate Postfix Expression", code: "#include <stdio.h>\n#include <ctype.h>\nint stack[100]; int top = -1;\nvoid push(int v) { stack[++top] = v; }\nint pop() { return stack[top--]; }\n\nint main() {\n    char expr[] = \"5 3 + 8 *\";  // means (5+3)*8\n    int num = 0, hasNum = 0;\n    for (int i = 0; expr[i]; i++) {\n        char c = expr[i];\n        if (isdigit(c)) { num = num * 10 + (c - '0'); hasNum = 1; }\n        else if (c == ' ' && hasNum) { push(num); num = 0; hasNum = 0; }\n        else if (c == '+' || c == '-' || c == '*' || c == '/') {\n            int b = pop(), a = pop();\n            push(c == '+' ? a+b : c == '-' ? a-b : c == '*' ? a*b : a/b);\n        }\n    }\n    printf(\"Result of \\\"%s\\\" = %d\\n\", expr, pop());\n    return 0;\n}\n// Output: Result of \"5 3 + 8 *\" = 64" },
              { title: "Evaluate Prefix Expression", code: "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nint stack[100]; int top = -1;\nvoid push(int v) { stack[++top] = v; }\nint pop() { return stack[top--]; }\n\nint main() {\n    char expr[] = \"* + 5 3 8\";  // means (5+3)*8\n    for (int i = strlen(expr) - 1; i >= 0; i--) {\n        char c = expr[i];\n        if (isdigit(c)) push(c - '0');\n        else if (c == '+' || c == '-' || c == '*' || c == '/') {\n            int a = pop(), b = pop();\n            push(c == '+' ? a+b : c == '-' ? a-b : c == '*' ? a*b : a/b);\n        }\n    }\n    printf(\"Result of \\\"%s\\\" = %d\\n\", expr, pop());\n    return 0;\n}\n// Output: Result of \"* + 5 3 8\" = 64" }
            ]
          },
          {
            id: "recursion-ds",
            title: "Recursion & DS",
            definition: "Recursion is a technique in which a function calls itself on a smaller subproblem until it reaches a base case, and it forms the basis of operations on recursive data structures such as trees and graphs.",
            theory: "Recursion in data structures = function calling itself to solve smaller version of same problem 🔄. Factorial: n! = n * (n-1)!. GCD: gcd(a,b) = gcd(b, a%b). Fibonacci: fib(n) = fib(n-1) + fib(n-2). Each call uses memory (stack space). Great for tree and graph traversals!",
            code: "#include <stdio.h>\nint factorial(int n) {\n    if (n <= 1) return 1;  // base case\n    return n * factorial(n - 1);  // recursive case\n}\n\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n\nint main() {\n    printf(\"5! = %d\\n\", factorial(5));  // 120\n    printf(\"GCD(48,18) = %d\\n\", gcd(48, 18));  // 6\n    return 0;\n}",
            examples: [
              { title: "Fibonacci Series (Recursive)", code: "#include <stdio.h>\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    printf(\"Fibonacci series: \");\n    for (int i = 0; i < 8; i++) printf(\"%d \", fib(i));\n    printf(\"\\n\");\n    return 0;\n}\n// Output: Fibonacci series: 0 1 1 2 3 5 8 13" },
              { title: "Tower of Hanoi", code: "#include <stdio.h>\nvoid hanoi(int n, char from, char aux, char to) {\n    if (n == 1) {\n        printf(\"Move disk 1 from %c to %c\\n\", from, to);\n        return;\n    }\n    hanoi(n - 1, from, to, aux);\n    printf(\"Move disk %d from %c to %c\\n\", n, from, to);\n    hanoi(n - 1, aux, from, to);\n}\n\nint main() {\n    hanoi(3, 'A', 'B', 'C');\n    return 0;\n}\n// Output: Move disk 1 from A to C\n// Move disk 2 from A to B\n// Move disk 1 from C to B\n// Move disk 3 from A to C\n// Move disk 1 from B to A\n// Move disk 2 from B to C\n// Move disk 1 from A to C" }
            ]
          },
          {
            id: "queue-simple",
            title: "Simple Queue (FIFO)",
            definition: "A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, in which insertion (enqueue) occurs at the rear and deletion (dequeue) occurs at the front.",
            theory: "Queue = First In First Out 🚶‍♂️🚶‍♀️. Like a line at a ticket counter: the first person in line is the first to be served. Operations: enqueue (add at rear/back), dequeue (remove from front). Used in: printer queue, ticket booking, BFS algorithm. Simple queue wastes space as front moves forward.",
            code: "#include <stdio.h>\n#define MAX 100\nint queue[MAX], front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if (rear == MAX-1) { printf(\"Full!\\n\"); return; }\n    if (front == -1) front = 0;\n    queue[++rear] = val;\n    printf(\"Enqueued: %d\\n\", val);\n}\n\nint dequeue() {\n    if (front == -1 || front > rear) { printf(\"Empty!\\n\"); return -1; }\n    return queue[front++];  // front moves forward (wastes space)\n}\n\nint main() {\n    enqueue(10); enqueue(20); enqueue(30);\n    printf(\"Dequeue: %d\\n\", dequeue());  // 10\n    printf(\"Dequeue: %d\\n\", dequeue());  // 20\n    return 0;\n}",
            examples: [
              { title: "Queue of Customer Names", code: "#include <stdio.h>\n#include <string.h>\n#define MAX 100\nchar queue[MAX][50];\nint front = -1, rear = -1;\n\nvoid enqueue(char name[]) {\n    if (front == -1) front = 0;\n    strcpy(queue[++rear], name);\n}\n\nvoid serve() {\n    if (front > rear) { printf(\"Queue empty\\n\"); return; }\n    printf(\"Serving: %s\\n\", queue[front++]);\n}\n\nint main() {\n    enqueue(\"Ali\"); enqueue(\"Sara\"); enqueue(\"Omar\");\n    while (front <= rear) serve();\n    return 0;\n}\n// Output: Serving: Ali\n// Serving: Sara\n// Serving: Omar" },
              { title: "Simulate Printer Jobs", code: "#include <stdio.h>\n#define MAX 100\nint queue[MAX], front = -1, rear = -1;\n\nvoid enqueue(int job) {\n    if (front == -1) front = 0;\n    queue[++rear] = job;\n}\n\nvoid printJob() {\n    if (front > rear) { printf(\"No jobs\\n\"); return; }\n    printf(\"Printing job %d... done\\n\", queue[front++]);\n}\n\nint main() {\n    enqueue(101); enqueue(102); enqueue(103);\n    printf(\"Printer queue: 3 jobs waiting\\n\");\n    printJob();\n    printJob();\n    enqueue(104);\n    printJob();\n    printJob();\n    return 0;\n}\n// Output: Printer queue: 3 jobs waiting\n// Printing job 101... done\n// Printing job 102... done\n// Printing job 103... done\n// Printing job 104... done" }
            ]
          },
          {
            id: "queue-circular",
            title: "Circular Queue",
            definition: "A circular queue is a linear data structure in which the rear and front pointers wrap around to the beginning of the array using modular arithmetic, thereby reusing the space vacated after dequeue operations.",
            theory: "Circular queue fixes the wasted space problem 🌀. When rear reaches end, it wraps around to front. Like a roundabout — you keep going around instead of stopping. Full when (rear+1)%MAX == front. Empty when front == -1. Efficient use of array space — no shifting needed!",
            code: "#include <stdio.h>\n#define MAX 5\nint queue[MAX], front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if ((rear+1)%MAX == front) { printf(\"Full!\\n\"); return; }\n    if (front == -1) front = 0;\n    rear = (rear+1)%MAX;\n    queue[rear] = val;\n    printf(\"Enqueued: %d\\n\", val);\n}\n\nint dequeue() {\n    if (front == -1) { printf(\"Empty!\\n\"); return -1; }\n    int val = queue[front];\n    if (front == rear) front = rear = -1;\n    else front = (front+1)%MAX;\n    return val;\n}\n\nint main() {\n    enqueue(10); enqueue(20); enqueue(30);\n    printf(\"Dequeue: %d\\n\", dequeue());  // 10\n    printf(\"Dequeue: %d\\n\", dequeue());  // 20\n    enqueue(40); enqueue(50);  // wraps around!\n    return 0;\n}",
            examples: [
              { title: "Display Circular Queue", code: "#include <stdio.h>\n#define MAX 5\nint queue[MAX], front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if ((rear + 1) % MAX == front) { printf(\"Full\\n\"); return; }\n    if (front == -1) front = 0;\n    rear = (rear + 1) % MAX;\n    queue[rear] = val;\n}\n\nint dequeue() {\n    if (front == -1) { printf(\"Empty\\n\"); return -1; }\n    int v = queue[front];\n    if (front == rear) front = rear = -1;\n    else front = (front + 1) % MAX;\n    return v;\n}\n\nvoid display() {\n    if (front == -1) { printf(\"Queue empty\\n\"); return; }\n    printf(\"Queue: \");\n    for (int i = front; ; i = (i + 1) % MAX) {\n        printf(\"%d \", queue[i]);\n        if (i == rear) break;\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    enqueue(10); enqueue(20); enqueue(30);\n    display();\n    dequeue();\n    enqueue(40); enqueue(50);\n    display();\n    return 0;\n}\n// Output: Queue: 10 20 30\n// Queue: 20 30 40 50" },
              { title: "Producer-Consumer Cycle", code: "#include <stdio.h>\n#define MAX 5\nint queue[MAX], front = -1, rear = -1, items = 0;\n\nvoid enqueue(int val) {\n    if (items == MAX) { printf(\"Buffer FULL, producer waits\\n\"); return; }\n    if (front == -1) front = 0;\n    rear = (rear + 1) % MAX;\n    queue[rear] = val; items++;\n    printf(\"Produced %d (buffer: %d/5)\\n\", val, items);\n}\n\nvoid dequeue() {\n    if (items == 0) { printf(\"Buffer EMPTY, consumer waits\\n\"); return; }\n    int v = queue[front];\n    if (front == rear) front = rear = -1;\n    else front = (front + 1) % MAX;\n    items--;\n    printf(\"Consumed %d (buffer: %d/5)\\n\", v, items);\n}\n\nint main() {\n    enqueue(1); enqueue(2); enqueue(3);\n    dequeue(); enqueue(4);\n    dequeue(); dequeue(); dequeue(); dequeue();\n    return 0;\n}\n// Output: Produced 1 (buffer: 1/5)\n// Produced 2 (buffer: 2/5)\n// Produced 3 (buffer: 3/5)\n// Consumed 1 (buffer: 2/5)\n// Produced 4 (buffer: 3/5)\n// Consumed 2 (buffer: 2/5)\n// Consumed 3 (buffer: 1/5)\n// Consumed 4 (buffer: 0/5)\n// Buffer EMPTY, consumer waits" }
            ]
          }
        ]
      },
      {
        id: "unit-3",
        title: "Unit 3",
        subtitle: "Dynamic DS",
        concepts: [
          {
            id: "pointers-structures",
            title: "Pointers & Structures",
            definition: "A structure is a user-defined data type that groups variables of different data types under a single name, while a pointer is a variable that stores the memory address of another variable and enables dynamic memory allocation.",
            theory: "Structures group different data types into one 📋. Like a student form: name (text), age (number), grade (letter). struct defines the template. -> accesses members through pointer. malloc() allocates memory dynamically (at runtime). free() releases memory. Essential for linked lists!",
            code: "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nint main() {\n    // Direct access\n    struct Student s1 = {\"Ali\", 20, 3.75};\n    printf(\"Name: %s, Age: %d\\n\", s1.name, s1.age);\n\n    // Pointer access\n    struct Student *s2 = malloc(sizeof(struct Student));\n    strcpy(s2->name, \"Sara\");\n    s2->age = 22;\n    s2->gpa = 3.9;\n    printf(\"Name: %s, Age: %d\\n\", s2->name, s2->age);\n    free(s2);  // release memory\n    return 0;\n}",
            examples: [
              { title: "Pointer Arithmetic Demo", code: "#include <stdio.h>\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *p = arr;\n    printf(\"arr[0] = %d, *p = %d\\n\", arr[0], *p);\n    p++;\n    printf(\"After p++, *p = %d (arr[1])\\n\", *p);\n    printf(\"*(p + 1) = %d (arr[2])\\n\", *(p + 1));\n    printf(\"Address gap between elements: %d bytes\\n\", (int)((char*)(p+1) - (char*)p));\n    return 0;\n}\n// Output: arr[0] = 10, *p = 10\n// After p++, *p = 20 (arr[1])\n// *(p + 1) = 30 (arr[2])\n// Address gap between elements: 4 bytes" },
              { title: "Array of Structures", code: "#include <stdio.h>\nstruct Student { char name[30]; int marks; };\n\nint main() {\n    struct Student students[3] = {{\"Ali\", 85}, {\"Sara\", 92}, {\"Omar\", 78}};\n    for (int i = 0; i < 3; i++)\n        printf(\"%s got %d marks\\n\", students[i].name, students[i].marks);\n    struct Student *p = &students[1];\n    printf(\"Top: %s with %d\\n\", p->name, p->marks);\n    return 0;\n}\n// Output: Ali got 85 marks\n// Sara got 92 marks\n// Omar got 78 marks\n// Top: Sara with 92" }
            ]
          },
          {
            id: "singly-linked-list",
            title: "Singly Linked List",
            definition: "A singly linked list is a linear data structure in which each node contains a data part and a pointer to the next node, with the last node pointing to NULL.",
            theory: "A chain of nodes where each node has data + pointer to next node ⛓️. Head points to first, last points to NULL. Unlike arrays: dynamic size, no shifting for insert/delete, but no direct access by index. Each node must be traversed one by one to find data.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL;\n    if (*head == NULL) { *head = n; return; }\n    struct Node *t = *head;\n    while (t->next != NULL) t = t->next;\n    t->next = n;\n}\n\nvoid display(struct Node *h) {\n    while (h) { printf(\"%d -> \", h->data); h = h->next; }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n    display(head);  // 10 -> 20 -> 30 -> NULL\n    return 0;\n}",
            examples: [
              { title: "Insert at Beginning", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nvoid insertAtStart(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val;\n    n->next = *head;  // new node points to old head\n    *head = n;        // new node becomes head\n}\n\nvoid display(struct Node *h) {\n    while (h) { printf(\"%d -> \", h->data); h = h->next; }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtStart(&head, 30);\n    insertAtStart(&head, 20);\n    insertAtStart(&head, 10);\n    display(head);  // 10 -> 20 -> 30 -> NULL\n    return 0;\n}\n// Output: 10 -> 20 -> 30 -> NULL" },
              { title: "Count Nodes and Search", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nstruct Node* createList() {\n    struct Node *h = NULL, *t;\n    for (int i = 1; i <= 5; i++) {\n        struct Node *n = malloc(sizeof(struct Node));\n        n->data = i * 10; n->next = NULL;\n        if (!h) h = n; else t->next = n;\n        t = n;\n    }\n    return h;\n}\n\nint count(struct Node *h) {\n    int c = 0;\n    while (h) { c++; h = h->next; }\n    return c;\n}\n\nint search(struct Node *h, int key) {\n    int pos = 1;\n    while (h) {\n        if (h->data == key) return pos;\n        h = h->next; pos++;\n    }\n    return -1;\n}\n\nint main() {\n    struct Node *head = createList();\n    printf(\"Total nodes: %d\\n\", count(head));\n    printf(\"Value 30 found at position %d\\n\", search(head, 30));\n    printf(\"Value 99 found at position %d\\n\", search(head, 99));\n    return 0;\n}\n// Output: Total nodes: 5\n// Value 30 found at position 3\n// Value 99 found at position -1" }
            ]
          },
          {
            id: "circular-linked-list",
            title: "Circular Linked List",
            definition: "A circular linked list is a linked list in which the last node points back to the first node instead of NULL, forming a continuous loop in which every node can be reached from any other node.",
            theory: "Last node points BACK to head instead of NULL 🔵. Creates a circle! No natural end — traversal uses do-while and stops when back at head. Useful for round-robin scheduling (taking turns equally), song playlists looping, and multiplayer games passing turns.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val;\n    if (*head == NULL) { *head = n; n->next = *head; return; }\n    struct Node *t = *head;\n    while (t->next != *head) t = t->next;\n    t->next = n; n->next = *head;\n}\n\nvoid display(struct Node *head) {\n    if (!head) return;\n    struct Node *t = head;\n    do {\n        printf(\"%d -> \", t->data);\n        t = t->next;\n    } while (t != head);\n    printf(\"(back to head)\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n    display(head);\n    return 0;\n}",
            examples: [
              { title: "Count Nodes in Circular List", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val;\n    if (*head == NULL) { *head = n; n->next = *head; return; }\n    struct Node *t = *head;\n    while (t->next != *head) t = t->next;\n    t->next = n; n->next = *head;\n}\n\nint count(struct Node *head) {\n    if (!head) return 0;\n    int c = 0;\n    struct Node *t = head;\n    do { c++; t = t->next; } while (t != head);\n    return c;\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10); insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30); insertAtEnd(&head, 40);\n    printf(\"Nodes in circular list: %d\\n\", count(head));\n    return 0;\n}\n// Output: Nodes in circular list: 4" },
              { title: "Rotation Demo (Josephus-lite)", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val;\n    if (*head == NULL) { *head = n; n->next = *head; return; }\n    struct Node *t = *head;\n    while (t->next != *head) t = t->next;\n    t->next = n; n->next = *head;\n}\n\nvoid rotate(struct Node **head) {\n    if (*head) *head = (*head)->next;\n}\n\nvoid show(struct Node *head) {\n    struct Node *t = head;\n    do { printf(\"%d \", t->data); t = t->next; } while (t != head);\n    printf(\"\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    for (int i = 1; i <= 5; i++) insertAtEnd(&head, i * 10);\n    printf(\"Start: \"); show(head);\n    rotate(&head);\n    printf(\"Rotate: \"); show(head);\n    rotate(&head);\n    printf(\"Rotate: \"); show(head);\n    return 0;\n}\n// Output: Start: 10 20 30 40 50\n// Rotate: 20 30 40 50 10\n// Rotate: 30 40 50 10 20" }
            ]
          },
          {
            id: "doubly-linked-list",
            title: "Doubly Linked List",
            definition: "A doubly linked list is a linear data structure in which each node contains a data part and two pointers, one pointing to the previous node and one to the next node, enabling traversal in both directions.",
            theory: "Nodes have TWO pointers: prev (previous) and next (forward) ↔️. Can traverse forward and backward! Easier to delete (no need to find previous). More memory (extra pointer). Used in: browser history (back/forward), text editors (undo/redo), music playlists (previous/next).",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *prev, *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL; n->prev = NULL;\n    if (*head == NULL) { *head = n; return; }\n    struct Node *t = *head;\n    while (t->next) t = t->next;\n    t->next = n; n->prev = t;\n}\n\nvoid displayForward(struct Node *head) {\n    while (head) { printf(\"%d <-> \", head->data); head = head->next; }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n    displayForward(head);  // 10 <-> 20 <-> 30 <-> NULL\n    return 0;\n}",
            examples: [
              { title: "Display Backward (Reverse Traverse)", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *prev, *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL; n->prev = NULL;\n    if (*head == NULL) { *head = n; return; }\n    struct Node *t = *head;\n    while (t->next) t = t->next;\n    t->next = n; n->prev = t;\n}\n\nvoid displayForward(struct Node *h) {\n    while (h) { printf(\"%d <-> \", h->data); h = h->next; }\n    printf(\"NULL\\n\");\n}\n\nvoid displayBackward(struct Node *h) {\n    while (h->next) h = h->next;\n    while (h) { printf(\"%d <-> \", h->data); h = h->prev; }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10); insertAtEnd(&head, 20); insertAtEnd(&head, 30);\n    printf(\"Forward:  \"); displayForward(head);\n    printf(\"Backward: \"); displayBackward(head);\n    return 0;\n}\n// Output: Forward:  10 <-> 20 <-> 30 <-> NULL\n// Backward: 30 <-> 20 <-> 10 <-> NULL" },
              { title: "Delete a Node by Value", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *prev, *next; };\n\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL; n->prev = NULL;\n    if (*head == NULL) { *head = n; return; }\n    struct Node *t = *head;\n    while (t->next) t = t->next;\n    t->next = n; n->prev = t;\n}\n\nvoid deleteVal(struct Node **head, int val) {\n    struct Node *t = *head;\n    while (t && t->data != val) t = t->next;\n    if (!t) { printf(\"%d not found\\n\", val); return; }\n    if (t->prev) t->prev->next = t->next;\n    else *head = t->next;\n    if (t->next) t->next->prev = t->prev;\n    free(t);\n    printf(\"Deleted %d\\n\", val);\n}\n\nvoid display(struct Node *h) {\n    while (h) { printf(\"%d <-> \", h->data); h = h->next; }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10); insertAtEnd(&head, 20); insertAtEnd(&head, 30);\n    deleteVal(&head, 20);\n    display(head);\n    deleteVal(&head, 10);\n    display(head);\n    return 0;\n}\n// Output: Deleted 20\n// 10 <-> 30 <-> NULL\n// Deleted 10\n// 30 <-> NULL" }
            ]
          }
        ]
      },
      {
        id: "unit-4",
        title: "Unit 4",
        subtitle: "Non-linear DS",
        concepts: [
          {
            id: "tree-terminology",
            title: "Tree Terminology",
            definition: "A tree is a non-linear hierarchical data structure consisting of a set of nodes connected by edges, with a single root node, and terms such as parent, child, leaf, and height used to describe its structure.",
            theory: "A tree is like a family tree 🌳. Root = top node (grandfather). Parent = direct connection above. Child = direct connection below. Leaf = no children (baby). Height = longest path from root to leaf. Binary tree = each parent has at most 2 children (left and right).",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct TreeNode { int data; struct TreeNode *left, *right; };\n\nstruct TreeNode* createNode(int val) {\n    struct TreeNode *n = malloc(sizeof(struct TreeNode));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint height(struct TreeNode *r) {\n    if (!r) return -1;\n    int lh = height(r->left);\n    int rh = height(r->right);\n    return (lh > rh ? lh : rh) + 1;\n}\n\nint countLeaves(struct TreeNode *r) {\n    if (!r) return 0;\n    if (!r->left && !r->right) return 1;\n    return countLeaves(r->left) + countLeaves(r->right);\n}\n\nint main() {\n    struct TreeNode *root = createNode(1);\n    root->left = createNode(2); root->right = createNode(3);\n    root->left->left = createNode(4);\n    printf(\"Height: %d\\n\", height(root));  // 2\n    printf(\"Leaves: %d\\n\", countLeaves(root));  // 2\n    return 0;\n}",
            examples: [
              { title: "3-Level Tree Height", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct TreeNode { int data; struct TreeNode *left, *right; };\n\nstruct TreeNode* createNode(int val) {\n    struct TreeNode *n = malloc(sizeof(struct TreeNode));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint height(struct TreeNode *r) {\n    if (!r) return -1;\n    int lh = height(r->left), rh = height(r->right);\n    return (lh > rh ? lh : rh) + 1;\n}\n\nint main() {\n    // 3-level tree:         1\n    //                     /   \\\n    //                    2     3\n    //                   / \\   /\n    //                  4   5 6\n    struct TreeNode *root = createNode(1);\n    root->left = createNode(2);\n    root->right = createNode(3);\n    root->left->left = createNode(4);\n    root->left->right = createNode(5);\n    root->right->left = createNode(6);\n    printf(\"Height of tree: %d (3 levels)\\n\", height(root));\n    return 0;\n}\n// Output: Height of tree: 2 (3 levels)" },
              { title: "Count Total Nodes", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct TreeNode { int data; struct TreeNode *left, *right; };\n\nstruct TreeNode* createNode(int val) {\n    struct TreeNode *n = malloc(sizeof(struct TreeNode));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint countNodes(struct TreeNode *r) {\n    if (!r) return 0;\n    return 1 + countNodes(r->left) + countNodes(r->right);\n}\n\nint main() {\n    struct TreeNode *root = createNode(10);\n    root->left = createNode(20);\n    root->right = createNode(30);\n    root->left->left = createNode(40);\n    printf(\"Total nodes: %d\\n\", countNodes(root));\n    printf(\"Left subtree nodes: %d\\n\", countNodes(root->left));\n    return 0;\n}\n// Output: Total nodes: 4\n// Left subtree nodes: 2" }
            ]
          },
          {
            id: "tree-traversals",
            title: "Tree Traversals",
            definition: "Tree traversal is the process of visiting every node in a tree exactly once in a systematic order, the common orders being inorder, preorder, postorder, and level-order traversal.",
            theory: "Traversals = visiting all nodes in different orders 🚶. Inorder (Left-Root-Right): gives sorted order for BST. Preorder (Root-Left-Right): used to copy tree. Postorder (Left-Right-Root): used to delete tree. Level-order (BFS): visits level by level using queue.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *left, *right; };\n\nstruct Node* createNode(int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\n\nvoid inorder(struct Node *r) {   // Left-Root-Right\n    if (!r) return;\n    inorder(r->left);\n    printf(\"%d \", r->data);\n    inorder(r->right);\n}\n\nvoid preorder(struct Node *r) {  // Root-Left-Right\n    if (!r) return;\n    printf(\"%d \", r->data);\n    preorder(r->left);\n    preorder(r->right);\n}\n\nvoid postorder(struct Node *r) { // Left-Right-Root\n    if (!r) return;\n    postorder(r->left);\n    postorder(r->right);\n    printf(\"%d \", r->data);\n}\n\nint main() {\n    struct Node *root = createNode(1);\n    root->left = createNode(2); root->right = createNode(3);\n    root->left->left = createNode(4); root->left->right = createNode(5);\n\n    printf(\"Inorder:   \"); inorder(root); printf(\"\\n\");\n    printf(\"Preorder:  \"); preorder(root); printf(\"\\n\");\n    printf(\"Postorder: \"); postorder(root); printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Level-Order (BFS) Traversal", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* createNode(int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\n\nvoid levelOrder(struct Node *root) {\n    struct Node *queue[100];\n    int front = 0, rear = 0;\n    queue[rear++] = root;\n    while (front < rear) {\n        struct Node *cur = queue[front++];\n        printf(\"%d \", cur->data);\n        if (cur->left) queue[rear++] = cur->left;\n        if (cur->right) queue[rear++] = cur->right;\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    struct Node *root = createNode(1);\n    root->left = createNode(2);\n    root->right = createNode(3);\n    root->left->left = createNode(4);\n    root->left->right = createNode(5);\n    root->right->right = createNode(6);\n    printf(\"Level order: \");\n    levelOrder(root);  // 1 2 3 4 5 6\n    return 0;\n}\n// Output: Level order: 1 2 3 4 5 6" },
              { title: "Build from Array, Print All Traversals", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* createNode(int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\n\nstruct Node* buildFromArray(int arr[], int i, int n) {\n    if (i >= n || arr[i] == -1) return NULL;\n    struct Node *r = createNode(arr[i]);\n    r->left = buildFromArray(arr, 2*i + 1, n);\n    r->right = buildFromArray(arr, 2*i + 2, n);\n    return r;\n}\n\nvoid inorder(struct Node *r) {\n    if (!r) return;\n    inorder(r->left); printf(\"%d \", r->data); inorder(r->right);\n}\nvoid preorder(struct Node *r) {\n    if (!r) return;\n    printf(\"%d \", r->data); preorder(r->left); preorder(r->right);\n}\nvoid postorder(struct Node *r) {\n    if (!r) return;\n    postorder(r->left); postorder(r->right); printf(\"%d \", r->data);\n}\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5, -1, 6};  // -1 = no node\n    struct Node *root = buildFromArray(arr, 0, 7);\n    printf(\"Inorder:   \"); inorder(root); printf(\"\\n\");\n    printf(\"Preorder:  \"); preorder(root); printf(\"\\n\");\n    printf(\"Postorder: \"); postorder(root); printf(\"\\n\");\n    return 0;\n}\n// Output: Inorder:   4 2 5 1 3 6\n// Preorder:  1 2 4 5 3 6\n// Postorder: 4 5 2 6 3 1" }
            ]
          },
          {
            id: "bst",
            title: "Binary Search Tree",
            definition: "A binary search tree (BST) is a binary tree in which every node's left subtree contains only smaller values and its right subtree contains only larger values, enabling O(log n) search.",
            theory: "BST is a sorted tree 🔠. Rule: left child < parent < right child. So searching is fast: compare target with root, go left if smaller, right if bigger. Average O(log n). Insert follows same rule to find correct leaf position. Inorder traversal gives sorted list automatically!",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *left, *right; };\n\nstruct Node* createNode(int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\n\nstruct Node* insert(struct Node *r, int val) {\n    if (!r) return createNode(val);\n    if (val < r->data) r->left = insert(r->left, val);\n    else if (val > r->data) r->right = insert(r->right, val);\n    return r;\n}\n\nstruct Node* search(struct Node *r, int key) {\n    if (!r || r->data == key) return r;\n    if (key < r->data) return search(r->left, key);\n    return search(r->right, key);\n}\n\nvoid inorder(struct Node *r) {\n    if (!r) return;\n    inorder(r->left); printf(\"%d \", r->data); inorder(r->right);\n}\n\nint main() {\n    struct Node *root = NULL;\n    int vals[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, vals[i]);\n\n    printf(\"Inorder: \"); inorder(root); printf(\"\\n\");  // sorted!\n    printf(\"Search 40: %s\\n\", search(root,40)?\"Found\":\"Not found\");\n    return 0;\n}",
            examples: [
              { title: "Find Min and Max in BST", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* createNode(int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\nstruct Node* insert(struct Node *r, int val) {\n    if (!r) return createNode(val);\n    if (val < r->data) r->left = insert(r->left, val);\n    else if (val > r->data) r->right = insert(r->right, val);\n    return r;\n}\n\nint findMin(struct Node *r) {\n    while (r->left) r = r->left;\n    return r->data;\n}\nint findMax(struct Node *r) {\n    while (r->right) r = r->right;\n    return r->data;\n}\n\nint main() {\n    struct Node *root = NULL;\n    int vals[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, vals[i]);\n    printf(\"Minimum: %d\\n\", findMin(root));\n    printf(\"Maximum: %d\\n\", findMax(root));\n    return 0;\n}\n// Output: Minimum: 20\n// Maximum: 80" },
              { title: "Delete a Node from BST", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* createNode(int val) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\nstruct Node* insert(struct Node *r, int val) {\n    if (!r) return createNode(val);\n    if (val < r->data) r->left = insert(r->left, val);\n    else if (val > r->data) r->right = insert(r->right, val);\n    return r;\n}\n\nstruct Node* findMinNode(struct Node *r) {\n    while (r->left) r = r->left;\n    return r;\n}\n\nstruct Node* deleteNode(struct Node *r, int key) {\n    if (!r) return NULL;\n    if (key < r->data) r->left = deleteNode(r->left, key);\n    else if (key > r->data) r->right = deleteNode(r->right, key);\n    else {\n        if (!r->left) return r->right;\n        if (!r->right) return r->left;\n        struct Node *t = findMinNode(r->right);\n        r->data = t->data;\n        r->right = deleteNode(r->right, t->data);\n    }\n    return r;\n}\n\nvoid inorder(struct Node *r) {\n    if (!r) return;\n    inorder(r->left); printf(\"%d \", r->data); inorder(r->right);\n}\n\nint main() {\n    struct Node *root = NULL;\n    int vals[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, vals[i]);\n    printf(\"Before: \"); inorder(root); printf(\"\\n\");\n    root = deleteNode(root, 50);\n    printf(\"After:  \"); inorder(root); printf(\"\\n\");\n    return 0;\n}\n// Output: Before: 20 30 40 50 60 70 80\n// After:  20 30 40 60 70 80" }
            ]
          },
          {
            id: "graph-terminology",
            title: "Graph Terminology",
            definition: "A graph is a non-linear data structure composed of a finite set of vertices (nodes) and a set of edges connecting pairs of vertices, with terms such as degree, path, and adjacency used to describe its properties.",
            theory: "Graph = nodes (vertices) connected by edges (lines) 🌐. Like a social network: people (vertices), friendships (edges). Directed: one-way (Instagram follow). Undirected: two-way (Facebook friend). Weighted: edges have cost (distance between cities). Adjacency matrix = table. Adjacency list = list of neighbors.",
            code: "#include <stdio.h>\n#define V 5\n\nint adjMatrix[V][V] = {0};\nvoid addEdge(int i, int j) { adjMatrix[i][j] = 1; adjMatrix[j][i] = 1; }\n\nvoid printMatrix() {\n    printf(\"\\nAdjacency Matrix:\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) printf(\"%d \", adjMatrix[i][j]);\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    addEdge(0,1); addEdge(0,2); addEdge(1,3); addEdge(2,4);\n    printMatrix();\n    return 0;\n}",
            examples: [
              { title: "Adjacency List Representation", code: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int vertex; struct Node *next; };\nstruct Node *adj[5];\n\nvoid addEdge(int u, int v) {\n    struct Node *n = malloc(sizeof(struct Node));\n    n->vertex = v; n->next = adj[u]; adj[u] = n;\n    n = malloc(sizeof(struct Node));\n    n->vertex = u; n->next = adj[v]; adj[v] = n;\n}\n\nvoid printList() {\n    for (int i = 0; i < 5; i++) {\n        printf(\"%d: \", i);\n        struct Node *t = adj[i];\n        while (t) { printf(\"%d -> \", t->vertex); t = t->next; }\n        printf(\"NULL\\n\");\n    }\n}\n\nint main() {\n    addEdge(0, 1); addEdge(0, 4);\n    addEdge(1, 2); addEdge(1, 3); addEdge(1, 4);\n    addEdge(2, 3); addEdge(3, 4);\n    printList();\n    return 0;\n}\n// Output (order may vary):\n// 0: 4 -> 1 -> NULL\n// 1: 4 -> 3 -> 2 -> 0 -> NULL\n// 2: 3 -> 1 -> NULL\n// 3: 4 -> 2 -> 1 -> NULL\n// 4: 3 -> 1 -> 0 -> NULL" },
              { title: "Degree of Each Vertex", code: "#include <stdio.h>\n#define V 5\nint adj[V][V] = {0};\n\nvoid addEdge(int i, int j) { adj[i][j] = 1; adj[j][i] = 1; }\n\nvoid degrees() {\n    for (int i = 0; i < V; i++) {\n        int deg = 0;\n        for (int j = 0; j < V; j++) deg += adj[i][j];\n        printf(\"Vertex %d degree: %d\\n\", i, deg);\n    }\n}\n\nint main() {\n    addEdge(0, 1); addEdge(0, 4);\n    addEdge(1, 2); addEdge(1, 3); addEdge(1, 4);\n    addEdge(2, 3); addEdge(3, 4);\n    degrees();\n    return 0;\n}\n// Output: Vertex 0 degree: 2\n// Vertex 1 degree: 4\n// Vertex 2 degree: 2\n// Vertex 3 degree: 3\n// Vertex 4 degree: 3" }
            ]
          },
          {
            id: "graph-types",
            title: "Types of Graphs",
            definition: "Graphs are classified according to their connectivity and density as complete, connected, sparse, or dense, and are traversed using breadth-first search (BFS) and depth-first search (DFS).",
            theory: "Complete: everyone connected to everyone (like full party 🤝). Connected: there's a path between any two nodes (like road network 🛣️). Sparse: few edges (like remote village). Dense: many edges (like city center). BFS (Breadth First Search): explores level by level (like checking nearby friends first).",
            code: "#include <stdio.h>\n#define V 5\n\nint adj[V][V] = {0};\nvoid addEdge(int i, int j) { adj[i][j] = 1; adj[j][i] = 1; }\n\nvoid bfs(int start) {\n    int visited[V] = {0}, queue[V], f = 0, r = 0;\n    visited[start] = 1; queue[r++] = start;\n    printf(\"BFS: \");\n    while (f < r) {\n        int node = queue[f++];\n        printf(\"%d \", node);\n        for (int i = 0; i < V; i++)\n            if (adj[node][i] && !visited[i]) {\n                visited[i] = 1; queue[r++] = i;\n            }\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    addEdge(0,1); addEdge(0,2); addEdge(1,3); addEdge(2,4);\n    bfs(0);  // 0, 1, 2, 3, 4\n    return 0;\n}",
            examples: [
              { title: "DFS (Depth First Search)", code: "#include <stdio.h>\n#define V 5\nint adj[V][V] = {0};\nint visited[V] = {0};\n\nvoid addEdge(int i, int j) { adj[i][j] = 1; adj[j][i] = 1; }\n\nvoid dfs(int node) {\n    visited[node] = 1;\n    printf(\"%d \", node);\n    for (int i = 0; i < V; i++)\n        if (adj[node][i] && !visited[i])\n            dfs(i);\n}\n\nint main() {\n    addEdge(0, 1); addEdge(0, 2);\n    addEdge(1, 3); addEdge(2, 4);\n    printf(\"DFS: \");\n    dfs(0);  // 0 1 3 2 4\n    printf(\"\\n\");\n    return 0;\n}\n// Output: DFS: 0 1 3 2 4" },
              { title: "Check if Graph is Complete", code: "#include <stdio.h>\n#define V 4\nint adj[V][V] = {0};\n\nvoid addEdge(int i, int j) { adj[i][j] = 1; adj[j][i] = 1; }\n\nint isComplete() {\n    for (int i = 0; i < V; i++)\n        for (int j = i + 1; j < V; j++)\n            if (!adj[i][j]) return 0;\n    return 1;\n}\n\nint main() {\n    addEdge(0, 1); addEdge(0, 2); addEdge(0, 3);\n    addEdge(1, 2); addEdge(1, 3); addEdge(2, 3);\n    printf(\"Graph complete: %s\\n\", isComplete() ? \"Yes\" : \"No\");\n    adj[0][3] = adj[3][0] = 0;\n    printf(\"After removing edge: %s\\n\", isComplete() ? \"Yes\" : \"No\");\n    return 0;\n}\n// Output: Graph complete: Yes\n// After removing edge: No" }
            ]
          }
        ]
      },
      {
        id: "unit-5",
        title: "Unit 5",
        subtitle: "Algorithms",
        concepts: [
          {
            id: "bubble-sort",
            title: "Bubble Sort",
            definition: "Bubble sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order, with a worst-case time complexity of O(n²).",
            theory: "Bubble sort compares adjacent elements and swaps if wrong order 🫧. Like bubbles rising to top — the largest value 'bubbles up' to its correct position each pass. After each pass, one more element is in correct place at the end. Simple but slow O(n²). Optimized version stops early if no swaps needed.",
            code: "#include <stdio.h>\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;  // already sorted!\n    }\n}\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(arr, 7);\n    for (int i = 0; i < 7; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Bubble Sort on Characters", code: "#include <stdio.h>\nvoid bubbleSortChar(char arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                char t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n}\n\nint main() {\n    char letters[] = \"dcbaef\";\n    bubbleSortChar(letters, 6);\n    printf(\"Sorted letters: %s\\n\", letters);\n    return 0;\n}\n// Output: Sorted letters: abcdef" },
              { title: "Step-by-Step Passes (Python)", code: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        swapped = False\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        print(f\"Pass {i + 1}: {arr}\")\n        if not swapped:\n            break\n\narr = [64, 34, 25, 12]\nbubble_sort(arr)\n# Output:\n# Pass 1: [34, 25, 12, 64]\n# Pass 2: [25, 12, 34, 64]\n# Pass 3: [12, 25, 34, 64]" }
            ]
          },
          {
            id: "selection-sort",
            title: "Selection Sort",
            definition: "Selection sort is a comparison-based sorting algorithm that repeatedly selects the minimum element from the unsorted part of the list and swaps it with the first unsorted position, achieving O(n²) comparisons and O(n) swaps.",
            theory: "Selection sort finds the MINIMUM element and swaps it with the first unsorted position 🔍. Like selecting the smallest card from a deck and placing it first, then next smallest, etc. Always makes O(n²) comparisons but only O(n) swaps. Good when writing to memory is expensive (fewer swaps than bubble).",
            code: "#include <stdio.h>\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min = i;\n        for (int j = i+1; j < n; j++)  // find minimum\n            if (arr[j] < arr[min]) min = j;\n        if (min != i) {  // swap with first\n            int t = arr[i]; arr[i] = arr[min]; arr[min] = t;\n        }\n    }\n}\n\nint main() {\n    int arr[] = {64, 25, 12, 22, 11};\n    selectionSort(arr, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Selection Sort Descending", code: "#include <stdio.h>\nvoid selectionSortDesc(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int max = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] > arr[max]) max = j;\n        if (max != i) {\n            int t = arr[i]; arr[i] = arr[max]; arr[max] = t;\n        }\n    }\n}\n\nint main() {\n    int arr[] = {4, 1, 9, 3, 6};\n    selectionSortDesc(arr, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: 9 6 4 3 1" },
              { title: "Selection Sort on Strings", code: "#include <stdio.h>\n#include <string.h>\nvoid selectionSortStr(char arr[][20], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min = i;\n        for (int j = i+1; j < n; j++)\n            if (strcmp(arr[j], arr[min]) < 0) min = j;\n        if (min != i) {\n            char t[20]; strcpy(t, arr[i]);\n            strcpy(arr[i], arr[min]); strcpy(arr[min], t);\n        }\n    }\n}\n\nint main() {\n    char words[][20] = {\"banana\", \"apple\", \"grape\", \"cherry\"};\n    selectionSortStr(words, 4);\n    for (int i = 0; i < 4; i++) printf(\"%s\\n\", words[i]);\n    return 0;\n}\n// Output: apple\n// banana\n// cherry\n// grape" }
            ]
          },
          {
            id: "insertion-sort",
            title: "Insertion Sort",
            definition: "Insertion sort is a comparison-based sorting algorithm that builds the sorted list one element at a time by inserting each element into its correct position among the already sorted elements.",
            theory: "Insertion sort picks each element and inserts it in the correct position among earlier sorted elements 📝. Like arranging cards in your hand: pick a card, compare with cards you already hold, and slide it into the right spot. Best for almost-sorted data — runs O(n) in best case. Used in real life for small datasets!",
            code: "#include <stdio.h>\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];  // element to place\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];  // shift right\n            j--;\n        }\n        arr[j+1] = key;  // place in correct position\n    }\n}\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6};\n    insertionSort(arr, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Insertion Sort Descending", code: "#include <stdio.h>\nvoid insertionSortDesc(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] < key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6};\n    insertionSortDesc(arr, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: 13 12 11 6 5" },
              { title: "Sort Strings Alphabetically", code: "#include <stdio.h>\n#include <string.h>\nvoid insertionSortStr(char arr[][20], int n) {\n    for (int i = 1; i < n; i++) {\n        char key[20];\n        strcpy(key, arr[i]);\n        int j = i - 1;\n        while (j >= 0 && strcmp(arr[j], key) > 0) {\n            strcpy(arr[j+1], arr[j]);\n            j--;\n        }\n        strcpy(arr[j+1], key);\n    }\n}\n\nint main() {\n    char words[][20] = {\"pear\", \"apple\", \"kiwi\", \"orange\"};\n    insertionSortStr(words, 4);\n    for (int i = 0; i < 4; i++) printf(\"%s \", words[i]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: apple kiwi orange pear" }
            ]
          },
          {
            id: "quick-sort",
            title: "Quick Sort",
            definition: "Quick sort is a divide-and-conquer sorting algorithm that selects a pivot element, partitions the array so that elements smaller than the pivot are placed to its left and larger elements to its right, and then recursively sorts the two partitions.",
            theory: "Quick sort picks a 'pivot', then partitions: smaller than pivot go left, larger go right, then recursively sort each side ⚡. Like organizing books by a reference book: put shorter on left, taller on right, then repeat for each pile. Very fast O(n log n) on average. Most practical sorting algorithm!",
            code: "#include <stdio.h>\nvoid swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];  // last element as pivot\n    int i = low - 1;\n    for (int j = low; j < high; j++)\n        if (arr[j] <= pivot)\n            { i++; swap(&arr[i], &arr[j]); }\n    swap(&arr[i+1], &arr[high]);\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi-1);   // sort left part\n        quickSort(arr, pi+1, high);  // sort right part\n    }\n}\n\nint main() {\n    int arr[] = {10, 7, 8, 9, 1, 5};\n    quickSort(arr, 0, 5);\n    for (int i = 0; i < 6; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Quick Sort (First Element as Pivot)", code: "#include <stdio.h>\nvoid swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[low];\n    int i = low + 1;\n    for (int j = low + 1; j <= high; j++)\n        if (arr[j] < pivot) { swap(&arr[i], &arr[j]); i++; }\n    swap(&arr[low], &arr[i-1]);\n    return i - 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi-1);\n        quickSort(arr, pi+1, high);\n    }\n}\n\nint main() {\n    int arr[] = {9, 2, 7, 1, 5};\n    quickSort(arr, 0, 4);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: 1 2 5 7 9" },
              { title: "Sort Strings (Python)", code: "def quicksort(words):\n    if len(words) <= 1:\n        return words\n    pivot = words[0]\n    smaller = [w for w in words[1:] if w <= pivot]\n    larger = [w for w in words[1:] if w > pivot]\n    return quicksort(smaller) + [pivot] + quicksort(larger)\n\nwords = [\"grape\", \"apple\", \"banana\", \"cherry\"]\nprint(quicksort(words))\n# Output: ['apple', 'banana', 'cherry', 'grape']" }
            ]
          },
          {
            id: "merge-sort",
            title: "Merge Sort",
            definition: "Merge sort is a divide-and-conquer sorting algorithm that recursively divides the array into two halves, sorts each half independently, and then merges the sorted halves, always achieving a time complexity of O(n log n).",
            theory: "Merge sort DIVIDES the array in half, recursively sorts each half, then MERGES the sorted halves together ⚔️. Like splitting a stack of papers into two stacks, sorting each stack, then combining them in order. Always O(n log n) regardless of input. Uses extra memory but is very stable.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m-l+1, n2 = r-m;\n    int *L = malloc(n1*sizeof(int));\n    int *R = malloc(n2*sizeof(int));\n    for (int i = 0; i < n1; i++) L[i] = arr[l+i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m+1+j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2)\n        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n    free(L); free(R);\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r-l)/2;\n        mergeSort(arr, l, m);      // sort left half\n        mergeSort(arr, m+1, r);    // sort right half\n        merge(arr, l, m, r);        // merge sorted halves\n    }\n}\n\nint main() {\n    int arr[] = {38, 27, 43, 3, 9, 82, 10};\n    mergeSort(arr, 0, 6);\n    for (int i = 0; i < 7; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Merge Sort on Characters", code: "#include <stdio.h>\n#include <string.h>\n\nvoid merge(char arr[], int l, int m, int r) {\n    int n1 = m - l + 1, n2 = r - m;\n    char L[n1], R[n2];\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2)\n        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(char arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}\n\nint main() {\n    char letters[] = \"geeksforgeeks\";\n    int n = strlen(letters);\n    mergeSort(letters, 0, n - 1);\n    printf(\"Sorted: %s\\n\", letters);\n    return 0;\n}\n// Output: Sorted: eeefggkkorss" },
              { title: "Count Inversions (Python)", code: "def count_inversions(arr):\n    if len(arr) <= 1:\n        return arr, 0\n    mid = len(arr) // 2\n    left, inv_l = count_inversions(arr[:mid])\n    right, inv_r = count_inversions(arr[mid:])\n    merged, inv = [], inv_l + inv_r\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i]); i += 1\n        else:\n            merged.append(right[j]); j += 1\n            inv += len(left) - i\n    merged += left[i:] + right[j:]\n    return merged, inv\n\narr = [3, 1, 2]\nsorted_arr, inv = count_inversions(arr)\nprint(\"Sorted:\", sorted_arr)\nprint(\"Inversions:\", inv)\n# Output:\n# Sorted: [1, 2, 3]\n# Inversions: 2" }
            ]
          },
          {
            id: "radix-sort",
            title: "Radix Sort",
            definition: "Radix sort is a non-comparative integer sorting algorithm that sorts numbers digit by digit from the least significant to the most significant digit, using a stable counting sort as a subroutine at each pass.",
            theory: "Radix sort sorts by individual digits, from least to most significant 🔢. Like sorting dates: first by day, then by month, then by year. It uses counting sort (a stable sort) as a helper for each digit. For numbers, it needs 10 passes (digits 0-9). Fastest integer sorting algorithm for fixed-length numbers!",
            code: "#include <stdio.h>\nint getMax(int arr[], int n) {\n    int mx = arr[0];\n    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];\n    return mx;\n}\n\nvoid countSort(int arr[], int n, int exp) {\n    int out[n], count[10] = {0};\n    for (int i = 0; i < n; i++) count[(arr[i]/exp)%10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i-1];\n    for (int i = n-1; i >= 0; i--) {\n        out[count[(arr[i]/exp)%10]-1] = arr[i];\n        count[(arr[i]/exp)%10]--;\n    }\n    for (int i = 0; i < n; i++) arr[i] = out[i];\n}\n\nvoid radixSort(int arr[], int n) {\n    int m = getMax(arr, n);\n    for (int exp = 1; m/exp > 0; exp *= 10)\n        countSort(arr, n, exp);\n}\n\nint main() {\n    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};\n    radixSort(arr, 8);\n    for (int i = 0; i < 8; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}",
            examples: [
              { title: "Radix Sort with Different Max Digits", code: "#include <stdio.h>\nint getMax(int arr[], int n) {\n    int mx = arr[0];\n    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];\n    return mx;\n}\n\nvoid countSort(int arr[], int n, int exp) {\n    int out[n], count[10] = {0};\n    for (int i = 0; i < n; i++) count[(arr[i]/exp)%10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i-1];\n    for (int i = n-1; i >= 0; i--) {\n        out[count[(arr[i]/exp)%10]-1] = arr[i];\n        count[(arr[i]/exp)%10]--;\n    }\n    for (int i = 0; i < n; i++) arr[i] = out[i];\n}\n\nvoid radixSort(int arr[], int n) {\n    int m = getMax(arr, n);  // largest number = max digits\n    for (int exp = 1; m/exp > 0; exp *= 10)\n        countSort(arr, n, exp);  // ones, then tens, then hundreds...\n}\n\nint main() {\n    int arr[] = {9, 45, 123, 2, 678};  // 1, 2 and 3 digit numbers\n    radixSort(arr, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n// Output: 2 9 45 123 678" },
              { title: "Sort 3-Digit Numbers (Python)", code: "def counting_sort(arr, exp):\n    n = len(arr)\n    output = [0] * n\n    count = [0] * 10\n    for x in arr:\n        count[(x // exp) % 10] += 1\n    for i in range(1, 10):\n        count[i] += count[i - 1]\n    for i in range(n - 1, -1, -1):\n        digit = (arr[i] // exp) % 10\n        output[count[digit] - 1] = arr[i]\n        count[digit] -= 1\n    return output\n\ndef radix_sort(arr):\n    exp = 1\n    m = max(arr)\n    while m // exp > 0:\n        arr = counting_sort(arr, exp)\n        exp *= 10\n    return arr\n\nnums = [432, 8, 115, 309, 76]\nprint(radix_sort(nums))\n# Output: [8, 76, 115, 309, 432]" }
            ]
          },
          {
            id: "linear-search",
            title: "Linear Search",
            definition: "Linear search is a sequential searching algorithm that compares the target element with each element of the list one by one from the beginning until it is found, achieving a worst-case time complexity of O(n).",
            theory: "Linear search checks each element one by one from start to end 🔎. Like looking for a specific book on a shelf — you check every book until you find it. Works on ANY data (sorted or unsorted). Simple to code. Slow for large data: O(n). If data is small or unsorted, this is your best bet!",
            code: "#include <stdio.h>\nint linearSearch(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) return i;  // found at index i\n    return -1;  // not found\n}\n\nint main() {\n    int arr[] = {10, 23, 45, 70, 11, 15};\n    int key = 70;\n    int result = linearSearch(arr, 6, key);\n    if (result != -1)\n        printf(\"Found %d at index %d\\n\", key, result);\n    else\n        printf(\"%d not found\\n\", key);\n    return 0;\n}",
            examples: [
              { title: "Search in 2D Array", code: "#include <stdio.h>\nint main() {\n    int mat[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n    int key = 6, found = 0;\n    for (int i = 0; i < 3 && !found; i++)\n        for (int j = 0; j < 3; j++)\n            if (mat[i][j] == key) {\n                printf(\"Found %d at row %d, col %d\\n\", key, i, j);\n                found = 1;\n                break;\n            }\n    if (!found) printf(\"%d not found\\n\", key);\n    return 0;\n}\n// Output: Found 6 at row 1, col 2" },
              { title: "Count Occurrences of a Value", code: "#include <stdio.h>\nint main() {\n    int arr[] = {5, 2, 8, 5, 9, 5, 1};\n    int n = 7, key = 5, count = 0;\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) count++;\n    printf(\"%d appears %d times\\n\", key, count);\n    return 0;\n}\n// Output: 5 appears 3 times" }
            ]
          },
          {
            id: "binary-search",
            title: "Binary Search",
            definition: "Binary search is an efficient searching algorithm that repeatedly divides a sorted array in half and compares the middle element with the target, achieving a time complexity of O(log n).",
            theory: "Binary search repeatedly divides the sorted array in half 📐. Compare middle with target — if equal, found! If target smaller, search left half; if larger, search right half. Like finding a word in a dictionary: open middle, decide which half, repeat. Only works on SORTED data! Very fast O(log n).",
            code: "#include <stdio.h>\nint binarySearch(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == key) return mid;      // found!\n        else if (arr[mid] < key) low = mid + 1;  // search right\n        else high = mid - 1;                      // search left\n    }\n    return -1;  // not found\n}\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int key = 23;\n    int result = binarySearch(arr, 10, key);\n    if (result != -1)\n        printf(\"Found %d at index %d\\n\", key, result);\n    else\n        printf(\"%d not found\\n\", key);\n    return 0;\n}",
            examples: [
              { title: "Binary Search (Recursive)", code: "#include <stdio.h>\nint binarySearch(int arr[], int low, int high, int key) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == key) return mid;\n    if (arr[mid] < key) return binarySearch(arr, mid + 1, high, key);\n    return binarySearch(arr, low, mid - 1, key);\n}\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int key = 16;\n    int result = binarySearch(arr, 0, 9, key);\n    if (result != -1)\n        printf(\"Found %d at index %d\\n\", key, result);\n    else\n        printf(\"%d not found\\n\", key);\n    return 0;\n}\n// Output: Found 16 at index 4" },
              { title: "First Occurrence (Python)", code: "def first_occurrence(arr, key):\n    low, high = 0, len(arr) - 1\n    first = -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == key:\n            first = mid\n            high = mid - 1\n        elif arr[mid] < key:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return first\n\narr = [1, 3, 3, 3, 7, 9]\nprint(\"First occurrence of 3:\", first_occurrence(arr, 3))\nprint(\"First occurrence of 5:\", first_occurrence(arr, 5))\n# Output:\n# First occurrence of 3: 1\n# First occurrence of 5: -1" }
            ]
          },
          {
            id: "hashing",
            title: "Hashing",
            definition: "Hashing is a technique that maps keys to array indices using a hash function, providing O(1) average-time insertion, deletion, and search, while collisions are resolved using chaining or open addressing.",
            theory: "Hashing maps keys to array indices using a hash function 🗺️. Like assigning each student a locker: student ID -> locker number. Gives O(1) average access — very fast! Collision = two keys map to same index (two students assigned same locker). Chaining = linked list at each slot. Open addressing = find next empty slot.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n#define SIZE 10\n\nstruct Node { int key; struct Node *next; };\nstruct Node *table[SIZE] = {NULL};\n\nint hash(int key) { return key % SIZE; }  // simple hash function\n\nvoid insert(int key) {\n    int idx = hash(key);\n    struct Node *n = malloc(sizeof(struct Node));\n    n->key = key;\n    n->next = table[idx];  // chaining\n    table[idx] = n;\n}\n\nint search(int key) {\n    int idx = hash(key);\n    struct Node *t = table[idx];\n    while (t) { if (t->key == key) return 1; t = t->next; }\n    return 0;\n}\n\nvoid display() {\n    for (int i = 0; i < SIZE; i++) {\n        printf(\"%d: \", i);\n        struct Node *t = table[i];\n        while (t) { printf(\"%d -> \", t->key); t = t->next; }\n        printf(\"NULL\\n\");\n    }\n}\n\nint main() {\n    insert(15); insert(25); insert(35); insert(20);\n    display();\n    printf(\"Search 25: %s\\n\", search(25)?\"Found\":\"Not found\");\n    return 0;\n}",
            examples: [
              { title: "Open Addressing (Linear Probing)", code: "#include <stdio.h>\n#define SIZE 10\nint table[SIZE];\n\nvoid init() {\n    for (int i = 0; i < SIZE; i++) table[i] = -1;\n}\n\nint hash(int key) { return key % SIZE; }\n\nvoid insert(int key) {\n    int idx = hash(key);\n    while (table[idx] != -1) idx = (idx + 1) % SIZE;\n    table[idx] = key;\n}\n\nint search(int key) {\n    int idx = hash(key);\n    for (int i = 0; i < SIZE; i++) {\n        if (table[idx] == key) return 1;\n        if (table[idx] == -1) return 0;\n        idx = (idx + 1) % SIZE;\n    }\n    return 0;\n}\n\nint main() {\n    init();\n    insert(42); insert(92); insert(2);  // all hash to slot 2\n    for (int i = 0; i < SIZE; i++)\n        if (table[i] != -1) printf(\"slot %d: %d\\n\", i, table[i]);\n    printf(\"Search 92: %s\\n\", search(92) ? \"Found\" : \"Not found\");\n    printf(\"Search 15: %s\\n\", search(15) ? \"Found\" : \"Not found\");\n    return 0;\n}\n// Output: slot 2: 42\n// slot 3: 92\n// slot 4: 2\n// Search 92: Found\n// Search 15: Not found" },
              { title: "Hash with String Keys (Python)", code: "def hash_string(text, size=10):\n    total = sum(ord(ch) for ch in text)  # sum of ASCII codes\n    return total % size\n\nnames = [\"Ali\", \"Sara\", \"Omar\", \"Hana\"]\nfor name in names:\n    print(f\"{name:5} -> slot {hash_string(name)}\")\n# Output:\n# Ali   -> slot 8\n# Sara  -> slot 1\n# Omar  -> slot 9\n# Hana  -> slot 6" }
            ]
          }
        ]
      }
    ]
  }
];
