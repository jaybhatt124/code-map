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
            theory: "An algorithm is a step-by-step procedure to solve a problem written in plain English. A flowchart is a visual diagram of an algorithm using standard symbols: ovals for start/end, parallelograms for input/output, rectangles for processing, diamonds for decisions, and arrows for flow direction. Flowcharts make logic easier to understand and debug before writing actual code.",
            code: "// Algorithm: Find largest of 3 numbers\n#include <stdio.h>\nint main() {\n    int a = 10, b = 25, c = 18, largest;\n    if (a > b && a > c)\n        largest = a;\n    else if (b > c)\n        largest = b;\n    else\n        largest = c;\n    printf(\"Largest = %d\n\", largest);\n    return 0;\n}"
          },
          {
            id: "overview-of-c",
            title: "Overview of C",
            theory: "C was developed by Dennis Ritchie in 1972 at Bell Labs, originally for building the Unix operating system. It is a mid-level language with features of both high-level and low-level languages. C is fast, portable, structured, and forms the foundation of many modern languages like C++, Java, and Python.",
            code: "#include <stdio.h>\nint main() {\n    printf(\"Hello, World!\\n\");\n    printf(\"Welcome to C Programming\\n\");\n    return 0;\n}"
          },
          {
            id: "constants-variables",
            title: "Constants & Variables",
            theory: "A variable is a named container that stores a value which can change during execution. A constant cannot be changed after assignment. Variable names must start with a letter or underscore, are case-sensitive, and cannot be keywords. Use the const keyword to declare constants in C.",
            code: "#include <stdio.h>\nint main() {\n    int age = 20;\n    float marks = 85.5;\n    char grade = 'A';\n    const float PI = 3.14159;\n    printf(\"Age: %d, Marks: %.1f, Grade: %c\\n\", age, marks, grade);\n    printf(\"PI: %.2f\\n\", PI);\n    age = 21;\n    printf(\"New Age: %d\\n\", age);\n    return 0;\n}"
          },
          {
            id: "data-types-c",
            title: "Data Types",
            theory: "C has four basic data types: int for integers (4 bytes), float for single precision decimals (4 bytes), double for double precision decimals (8 bytes), and char for single characters (1 byte). The sizeof operator tells you the size in bytes. Modifiers like short, long, unsigned, and signed adjust the range.",
            code: "#include <stdio.h>\nint main() {\n    int a = 100;\n    float b = 3.14f;\n    double c = 3.14159265;\n    char d = 'A';\n    printf(\"int: %zu bytes\\n\", sizeof(int));\n    printf(\"float: %zu bytes\\n\", sizeof(float));\n    printf(\"double: %zu bytes\\n\", sizeof(double));\n    printf(\"char: %zu bytes\\n\", sizeof(char));\n    return 0;\n}"
          },
          {
            id: "io-operations",
            title: "Input/Output Operations",
            theory: "printf() is used for output with format specifiers: %d for int, %f for float, %c for char, %s for string. scanf() is used for input and requires the & operator before variables. getchar() reads a single character and putchar() displays one. These functions are in stdio.h.",
            code: "#include <stdio.h>\nint main() {\n    int age;\n    float height;\n    printf(\"Enter age: \");\n    scanf(\"%d\", &age);\n    printf(\"Enter height: \");\n    scanf(\"%f\", &height);\n    printf(\"Age: %d, Height: %.1f\\n\", age, height);\n    printf(\"Integer: %d, Float: %.2f, Char: %c, String: %s\\n\", 42, 3.14, 'X', \"Hello\");\n    return 0;\n}"
          },
          {
            id: "operators-expressions",
            title: "Operators & Expressions",
            theory: "Arithmetic operators (+,-,*,/,%) perform math. Relational operators (==,!=,>,<,>=,<=) compare values returning 0 or 1. Logical operators (&&,||,!) combine conditions. Assignment operators (=,+=,-=,*=,/=) store values. Operator precedence determines evaluation order: parentheses first, then arithmetic, then relational, then logical.",
            code: "#include <stdio.h>\nint main() {\n    int a = 10, b = 3;\n    printf(\"%d + %d = %d\\n\", a, b, a + b);\n    printf(\"%d - %d = %d\\n\", a, b, a - b);\n    printf(\"%d * %d = %d\\n\", a, b, a * b);\n    printf(\"%d / %d = %d\\n\", a, b, a / b);\n    printf(\"%d %% %d = %d\\n\", a, b, a % b);\n    printf(\"%d == %d is %d\\n\", a, b, a == b);\n    printf(\"%d > %d is %d\\n\", a, b, a > b);\n    int x = 1, y = 0;\n    printf(\"%d && %d = %d\\n\", x, y, x && y);\n    printf(\"%d || %d = %d\\n\", x, y, x || y);\n    printf(\"!%d = %d\\n\", x, !x);\n    return 0;\n}"
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
            theory: "The if statement checks a condition and executes the block only if the condition is true (non-zero). If false, the block is skipped. The condition must be in parentheses and the body can be a single statement or a block in braces.",
            code: "#include <stdio.h>\nint main() {\n    int num = 15;\n    if (num > 0) {\n        printf(\"%d is positive\\n\", num);\n    }\n    if (num % 2 == 0)\n        printf(\"%d is even\\n\", num);\n    else\n        printf(\"%d is odd\\n\", num);\n    return 0;\n}"
          },
          {
            id: "if-else-statement",
            title: "if-else Statement",
            theory: "The if-else provides two branches of execution. If the condition is true, the if block runs; otherwise the else block runs. Exactly one of the two blocks will always execute. This is useful for binary decisions like yes/no, true/false, pass/fail.",
            code: "#include <stdio.h>\nint main() {\n    int num;\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n    if (num % 2 == 0)\n        printf(\"%d is even\\n\", num);\n    else\n        printf(\"%d is odd\\n\", num);\n    int marks;\n    printf(\"Enter marks: \");\n    scanf(\"%d\", &marks);\n    if (marks >= 40)\n        printf(\"Result: PASS\\n\");\n    else\n        printf(\"Result: FAIL\\n\");\n    return 0;\n}"
          },
          {
            id: "nested-if-statement",
            title: "Nested if",
            theory: "A nested if is an if statement inside another if or else block. This allows checking multiple conditions in a hierarchy. Each inner if only runs if its parent condition was true. Be careful with indentation and brace placement to avoid logic errors.",
            code: "#include <stdio.h>\nint main() {\n    int a = 10, b = 25, c = 18;\n    if (a > b) {\n        if (a > c)\n            printf(\"%d is the largest\\n\", a);\n        else\n            printf(\"%d is the largest\\n\", c);\n    } else {\n        if (b > c)\n            printf(\"%d is the largest\\n\", b);\n        else\n            printf(\"%d is the largest\\n\", c);\n    }\n    return 0;\n}"
          },
          {
            id: "else-if-ladder",
            title: "else-if Ladder",
            theory: "The else-if ladder checks multiple conditions sequentially. Each condition is checked from top to bottom, and the first true condition's block executes. The remaining conditions are skipped. If no condition is true, the final else block runs. Useful for grading systems.",
            code: "#include <stdio.h>\nint main() {\n    int marks;\n    printf(\"Enter marks: \");\n    scanf(\"%d\", &marks);\n    if (marks >= 90)\n        printf(\"Grade: A+\\n\");\n    else if (marks >= 80)\n        printf(\"Grade: A\\n\");\n    else if (marks >= 70)\n        printf(\"Grade: B\\n\");\n    else if (marks >= 60)\n        printf(\"Grade: C\\n\");\n    else if (marks >= 50)\n        printf(\"Grade: D\\n\");\n    else\n        printf(\"Grade: F\\n\");\n    return 0;\n}"
          },
          {
            id: "switch-statement",
            title: "switch Statement",
            theory: "The switch selects one of many code blocks based on the value of an expression. Each case is matched by value and requires break to prevent fall-through. The default handles unmatched values. Switch works only with int and char types, not ranges or floats.",
            code: "#include <stdio.h>\nint main() {\n    int day;\n    printf(\"Enter day (1-7): \");\n    scanf(\"%d\", &day);\n    switch (day) {\n        case 1: printf(\"Monday\\n\"); break;\n        case 2: printf(\"Tuesday\\n\"); break;\n        case 3: printf(\"Wednesday\\n\"); break;\n        case 4: printf(\"Thursday\\n\"); break;\n        case 5: printf(\"Friday\\n\"); break;\n        case 6: printf(\"Saturday\\n\"); break;\n        case 7: printf(\"Sunday\\n\"); break;\n        default: printf(\"Invalid!\\n\");\n    }\n    return 0;\n}"
          },
          {
            id: "goto-statement",
            title: "goto Statement",
            theory: "The goto transfers program control to a labeled line. It can jump forward or backward within the same function. Goto is generally avoided because it breaks structured programming. However, it can be useful for breaking out of deeply nested loops or error handling in C.",
            code: "#include <stdio.h>\nint main() {\n    for (int i = 0; i < 5; i++) {\n        for (int j = 0; j < 5; j++) {\n            if (i == 2 && j == 3) {\n                printf(\"Found at i=%d, j=%d\\n\", i, j);\n                goto exit;\n            }\n        }\n    }\nexit:\n    printf(\"Exited nested loops using goto\\n\");\n    return 0;\n}"
          },
          {
            id: "while-loop",
            title: "while Loop",
            theory: "The while loop repeatedly executes its body as long as its condition remains true. The condition is checked BEFORE each iteration, so if false initially, the body never runs. This is an entry-controlled loop. Make sure the condition eventually becomes false to avoid infinite loops.",
            code: "#include <stdio.h>\nint main() {\n    int i = 1;\n    while (i <= 10) {\n        printf(\"%d \", i);\n        i++;\n    }\n    printf(\"\\n\");\n    int num, count = 0;\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n    int temp = num;\n    while (temp > 0) {\n        count++;\n        temp /= 10;\n    }\n    printf(\"%d has %d digits\\n\", num, count);\n    return 0;\n}"
          },
          {
            id: "do-while-loop",
            title: "do-while Loop",
            theory: "The do-while executes the body first, then checks the condition. This guarantees the body runs at least once, making it ideal for menu-driven programs where you want to display options at least one time before checking if the user wants to continue.",
            code: "#include <stdio.h>\nint main() {\n    int choice;\n    do {\n        printf(\"\\n=== Menu ===\\n\");\n        printf(\"1. Hello\\n2. Goodbye\\n3. Exit\\n\");\n        printf(\"Enter choice: \");\n        scanf(\"%d\", &choice);\n        switch (choice) {\n            case 1: printf(\"Hello!\\n\"); break;\n            case 2: printf(\"Goodbye!\\n\"); break;\n            case 3: printf(\"Exiting...\\n\"); break;\n            default: printf(\"Invalid!\\n\");\n        }\n    } while (choice != 3);\n    return 0;\n}"
          },
          {
            id: "for-loop",
            title: "for Loop",
            theory: "The for loop combines initialization, condition, and update in one line: for(init; condition; update). Init runs once, condition is checked before each iteration, and update runs after each iteration. Most compact loop, ideal when number of iterations is known in advance.",
            code: "#include <stdio.h>\nint main() {\n    int n, sum = 0;\n    printf(\"Enter N: \");\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++)\n        sum += i;\n    printf(\"Sum of 1 to %d = %d\\n\", n, sum);\n    printf(\"Multiplication table of 7:\\n\");\n    for (int i = 1; i <= 10; i++)\n        printf(\"7 x %d = %d\\n\", i, 7 * i);\n    return 0;\n}"
          },
          {
            id: "break-continue",
            title: "break & continue",
            theory: "break exits the innermost loop immediately, transferring control after the loop. continue skips remaining code in the current iteration and jumps to the next iteration. Both work with for, while, and do-while loops.",
            code: "#include <stdio.h>\nint main() {\n    for (int i = 1; i <= 100; i++) {\n        if (i % 7 == 0) {\n            printf(\"First multiple of 7: %d\\n\", i);\n            break;\n        }\n    }\n    printf(\"Odd numbers 1-20: \");\n    for (int i = 1; i <= 20; i++) {\n        if (i % 2 == 0) continue;\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n    return 0;\n}"
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
            theory: "An array is a collection of elements of the same type stored in contiguous memory. Elements are accessed by index starting from 0. Declaration: int arr[5]; Initialization: int arr[]={1,2,3}; The array name acts as a pointer to the first element.",
            code: "#include <stdio.h>\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    printf(\"First: %d, Third: %d\\n\", arr[0], arr[2]);\n    int max = arr[0];\n    for (int i = 1; i < 5; i++)\n        if (arr[i] > max) max = arr[i];\n    printf(\"Maximum: %d\\n\", max);\n    printf(\"Array: \");\n    for (int i = 0; i < 5; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}"
          },
          {
            id: "arrays-2d",
            title: "2D Arrays",
            theory: "A 2D array is like a matrix with rows and columns: int mat[3][3]. It is stored in row-major order in C (row by row). Nested loops are used to traverse 2D arrays. Common operations include matrix addition, multiplication, and transposition.",
            code: "#include <stdio.h>\nint main() {\n    int a[2][3] = {{1,2,3},{4,5,6}};\n    int b[2][3] = {{7,8,9},{10,11,12}};\n    int sum[2][3];\n    for (int i = 0; i < 2; i++)\n        for (int j = 0; j < 3; j++)\n            sum[i][j] = a[i][j] + b[i][j];\n    printf(\"Matrix Sum:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++)\n            printf(\"%d \", sum[i][j]);\n        printf(\"\\n\");\n    }\n    return 0;\n}"
          },
          {
            id: "pointers-intro",
            title: "Introduction to Pointers",
            theory: "A pointer is a variable that stores the memory address of another variable. Declared with an asterisk: int *ptr; The & operator gets the address, and the * operator gets the value at the address. Pointers are powerful but require careful use to avoid errors.",
            code: "#include <stdio.h>\nint main() {\n    int num = 42;\n    int *ptr = &num;\n    printf(\"Value: %d\\n\", num);\n    printf(\"Address: %p\\n\", (void*)&num);\n    printf(\"Pointer: %p\\n\", (void*)ptr);\n    printf(\"Dereferenced: %d\\n\", *ptr);\n    *ptr = 100;\n    printf(\"After modification: %d\\n\", num);\n    return 0;\n}"
          },
          {
            id: "address-indirection",
            title: "Address-of & Indirection",
            theory: "The address-of operator (&) returns the memory address of a variable. The indirection operator (*) dereferences a pointer to get the value at that address. These two operators are the foundation of pointer arithmetic and allow functions to modify variables passed by reference.",
            code: "#include <stdio.h>\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\nint main() {\n    int x = 10, y = 20;\n    printf(\"Before: x=%d, y=%d\\n\", x, y);\n    swap(&x, &y);\n    printf(\"After: x=%d, y=%d\\n\", x, y);\n    return 0;\n}"
          },
          {
            id: "void-null-pointers",
            title: "Void & NULL Pointers",
            theory: "A void pointer (void*) is generic and can point to any data type. It must be cast before dereferencing. A NULL pointer points to nothing (address 0). Dereferencing NULL causes a crash. Always check for NULL before using a pointer.",
            code: "#include <stdio.h>\nint main() {\n    int i = 42;\n    float f = 3.14;\n    void *vp;\n    vp = &i;\n    printf(\"int: %d\\n\", *(int*)vp);\n    vp = &f;\n    printf(\"float: %.2f\\n\", *(float*)vp);\n    int *ptr = NULL;\n    if (ptr != NULL)\n        printf(\"Value: %d\\n\", *ptr);\n    else\n        printf(\"ptr is NULL - safe to skip\\n\");\n    return 0;\n}"
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
            theory: "Functions are reusable blocks of code. Built-in functions like printf() come from libraries. User-defined functions are created by the programmer. Syntax: return_type name(params) { body }. C passes arguments by value (copies). Call by reference uses pointers to modify the original.",
            code: "#include <stdio.h>\nint add(int a, int b) { return a + b; }\nvoid greet(char name[]) { printf(\"Hello, %s!\\n\", name); }\nfloat circleArea(float r) { return 3.14159 * r * r; }\nint main() {\n    printf(\"Sum: %d\\n\", add(5, 3));\n    greet(\"Ali\");\n    printf(\"Area: %.2f\\n\", circleArea(5.0));\n    return 0;\n}"
          },
          {
            id: "passing-arrays",
            title: "Passing Arrays to Functions",
            theory: "When an array is passed to a function, it decays into a pointer to its first element. The function receives the address, not a copy, so changes affect the original array. You must also pass the size separately since the function cannot determine array length from a pointer.",
            code: "#include <stdio.h>\nint arraySum(int arr[], int size) {\n    int sum = 0;\n    for (int i = 0; i < size; i++) sum += arr[i];\n    return sum;\n}\nvoid doubleElements(int arr[], int size) {\n    for (int i = 0; i < size; i++) arr[i] *= 2;\n}\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int nums[] = {1, 2, 3, 4, 5};\n    printf(\"Sum = %d\\n\", arraySum(nums, 5));\n    doubleElements(nums, 5);\n    printf(\"Doubled: \");\n    printArray(nums, 5);\n    return 0;\n}"
          },
          {
            id: "recursion-c",
            title: "Recursion",
            theory: "Recursion is when a function calls itself. Every recursive function needs a base case to stop and a recursive case that reduces the problem toward the base case. Without a base case, the function calls forever causing stack overflow. Common examples: factorial, Fibonacci.",
            code: "#include <stdio.h>\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nint fibonacci(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\nint main() {\n    printf(\"5! = %d\\n\", factorial(5));\n    printf(\"Fibonacci: \");\n    for (int i = 0; i < 10; i++)\n        printf(\"%d \", fibonacci(i));\n    printf(\"\\n\");\n    return 0;\n}"
          },
          {
            id: "scope-visibility",
            title: "Scope, Visibility & Lifetime",
            theory: "Scope determines where a variable can be accessed. Local variables exist only within their block. Global variables are accessible everywhere. Static variables persist their value across function calls. Lifetime is how long a variable exists in memory during execution.",
            code: "#include <stdio.h>\nint globalVar = 100;\nvoid demo() {\n    static int count = 0;\n    count++;\n    printf(\"Function called %d times\\n\", count);\n}\nint main() {\n    int local = 10;\n    { int blockVar = 20; printf(\"Block: %d\\n\", blockVar); }\n    printf(\"Global: %d\\n\", globalVar);\n    demo(); demo(); demo();\n    return 0;\n}"
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
            theory: "A string in C is a character array terminated by null '\\0'. Declaration: char str[] = \"hello\"; string.h provides strlen() for length, strcpy() to copy, strcat() to join, strcmp() to compare. Strings are arrays so they can be traversed with loops.",
            code: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char name[] = \"Hello\";\n    char greeting[50];\n    printf(\"Length: %lu\\n\", strlen(name));\n    strcpy(greeting, name);\n    strcat(greeting, \" World\");\n    printf(\"Concatenated: %s\\n\", greeting);\n    printf(\"Compare abc vs abd: %d\\n\", strcmp(\"abc\", \"abd\"));\n    return 0;\n}"
          },
          {
            id: "file-io-c",
            title: "File I/O",
            theory: "File handling uses FILE pointer. fopen() opens a file with modes: 'r' read, 'w' write (overwrites), 'a' append, 'r+' read-write. fclose() closes the file. fprintf/fscanf work like printf/scanf for files. fgets/fputs handle string I/O. Always check if fopen returns NULL.",
            code: "#include <stdio.h>\nint main() {\n    FILE *fp;\n    fp = fopen(\"data.txt\", \"w\");\n    fprintf(fp, \"Ali 20\\nSara 22\\nAhmed 21\\n\");\n    fclose(fp);\n    char name[50]; int age;\n    fp = fopen(\"data.txt\", \"r\");\n    printf(\"File contents:\\n\");\n    while (fscanf(fp, \"%s %d\", name, &age) != EOF)\n        printf(\"Name: %s, Age: %d\\n\", name, age);\n    fclose(fp);\n    return 0;\n}"
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
            theory: "Python was created by Guido van Rossum and first released in 1991. Named after the British comedy group Monty Python. Python 3 is the current standard (not backward-compatible with Python 2). The Zen of Python summarizes its philosophy: readability, simplicity, and one obvious way to do things.",
            code: "# The Zen of Python\nimport this\n\nprint(\"Python was created by Guido van Rossum\")\nprint(\"First released: 1991\")\nprint(\"Current major version: Python 3.x\")\nprint(\"Named after: Monty Python comedy group\")"
          },
          {
            id: "py-features",
            title: "Features of Python",
            theory: "Python is interpreted (no compilation needed). It has simple, readable syntax resembling English. Supports dynamic typing (no variable type declarations), multiple paradigms (procedural, OOP, functional), has a vast standard library, runs on all platforms, and is open source.",
            code: "# Dynamic typing\nx = 10\nx = \"hello\"  # now x is str - no error!\n\n# Easy syntax\nif x == \"hello\":\n    print(\"x is a greeting\")\n\n# OOP\nclass Dog:\n    def bark(self):\n        print(\"Woof!\")\n\n# Lambda (functional)\nsquare = lambda n: n ** 2\nprint(f\"5 squared = {square(5)}\")"
          },
          {
            id: "py-variables",
            title: "Variables",
            theory: "Python variables are dynamically typed. You don't declare the type; Python infers it. Valid names contain letters, digits, underscores, and must start with a letter or underscore. Keywords like if, for, class cannot be used as variable names. Multiple assignment: x, y, z = 1, 2, 3.",
            code: "name = \"Ali\"\nage = 20\nheight = 5.9\nis_student = True\nprint(type(name))    # <class 'str'>\nprint(type(age))     # <class 'int'>\n\n# Multiple assignment\na, b, c = 1, 2, 3\nprint(f\"a={a}, b={b}, c={c}\")\n\n# Swap without temp\na, b = 10, 20\na, b = b, a\nprint(f\"After swap: a={a}, b={b}\")"
          },
          {
            id: "py-type-casting",
            title: "Type Casting",
            theory: "Type casting converts a value from one type to another. Python does automatic promotion (int + float = float). Explicit casting uses int(), float(), str(), bool(). isinstance() checks type. int() truncates decimals. Useful when combining different types or processing input.",
            code: "result = 5 + 2.5\nprint(f\"5 + 2.5 = {result}, type: {type(result)}\")\n\nnum_int = int(\"42\")\nnum_float = float(\"3.14\")\nprint(f\"int: {num_int}, float: {num_float}\")\n\nprint(f\"int(3.7) = {int(3.7)}\")  # 3\nprint(f\"float(10) = {float(10)}\")  # 10.0\n\nx = 42\nprint(f\"isinstance(x, int): {isinstance(x, int)}\")"
          },
          {
            id: "py-io",
            title: "Input/Output",
            theory: "print() outputs text. Use end='' to avoid newline, sep='' to change separator. input() reads user input as a string. Wrap with int() or float() for numbers. f-strings (f\"{var}\") provide easy string formatting.",
            code: "print(\"Hello, World!\")\nprint(\"Name:\", \"Ali\", \"Age:\", 20)\nprint(\"A\", \"B\", \"C\", sep=\"-\")\nprint(\"Hello\", end=\"\")\nprint(\" World\")\n\nname = \"Ali\"\nage = 20\ngpa = 3.75\nprint(f\"Name: {name}, Age: {age}, GPA: {gpa:.2f}\")\n\nage = int(input(\"Enter your age: \"))\nprint(f\"In 5 years you will be {age + 5}\")"
          },
          {
            id: "py-data-types",
            title: "Data Types",
            theory: "Python has int (unlimited size), float (decimal), str (text), bool (True/False). Collections: list [] (mutable, ordered), tuple () (immutable, ordered), dict {} (key-value pairs), set {} (unique, unordered). type() returns the type. None represents absence of value.",
            code: "x = 42          # int\ny = 3.14        # float\nz = \"Python\"    # str\nb = True        # bool\n\nmy_list = [1, 2, 3]\nmy_tuple = (1, 2, 3)\nmy_dict = {\"name\": \"Ali\", \"age\": 20}\nmy_set = {1, 2, 3, 3, 4}\n\nprint(f\"list: {my_list}, type: {type(my_list)}\")\nprint(f\"tuple: {my_tuple}, type: {type(my_tuple)}\")\nprint(f\"dict: {my_dict}, type: {type(my_dict)}\")\nprint(f\"set: {my_set}, type: {type(my_set)}\")"
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
            theory: "Arithmetic: + (add), - (subtract), * (multiply), / (float division), // (floor division), % (modulo/remainder), ** (power). Floor division truncates: 17//5 = 3. Modulo gives remainder: 17%5 = 2. Power: 2**10 = 1024.",
            code: "a = 17\nb = 5\nprint(f\"{a} + {b} = {a + b}\")    # 22\nprint(f\"{a} / {b} = {a / b}\")    # 3.4\nprint(f\"{a} // {b} = {a // b}\")  # 3\nprint(f\"{a} % {b} = {a % b}\")    # 2\nprint(f\"2 ** 10 = {2 ** 10}\")    # 1024\n\nnum = 15\nprint(f\"{num} is even: {num % 2 == 0}\")\n\ntotal = 3661\nh = total // 3600\nm = (total % 3600) // 60\ns = total % 60\nprint(f\"{total}s = {h}h {m}m {s}s\")"
          },
          {
            id: "py-logical-ops",
            title: "Logical Operators",
            theory: "and (both True), or (at least one True), not (inverts). Python uses short-circuit evaluation: in 'A and B', if A is False, B is not evaluated. Logical operators work with booleans and are used in conditionals.",
            code: "age = 25\nhas_id = True\nprint(f\"Eligible: {age >= 18 and has_id}\")\n\nstudent = False\nprint(f\"Discount: {student or age < 18}\")\n\nis_vip = False\nprint(f\"Regular: {not is_vip}\")\n\nx = 0\nresult = x != 0 and 10 / x > 1\nprint(f\"Short-circuit: {result}\")\n\nscore = 85\nprint(f\"Grade A: {80 <= score <= 100}\")"
          },
          {
            id: "py-comparison-ops",
            title: "Comparison Operators",
            theory: "Compare two values returning True/False: == (equal), != (not equal), >, <, >=, <=. Python allows chaining: 1 < x < 10 is equivalent to (1 < x) and (x < 10). String comparison is lexicographic.",
            code: "a = 10\nb = 20\nprint(f\"{a} == {b}: {a == b}\")  # False\nprint(f\"{a} != {b}: {a != b}\")  # True\nprint(f\"{a} < {b}: {a < b}\")    # True\n\nx = 15\nprint(f\"10 < {x} < 20: {10 < x < 20}\")   # True\nprint(f\"10 < {x} < 12: {10 < x < 12}\")   # False\n\nprint(f\"'apple' < 'banana': {'apple' < 'banana'}\")  # True"
          },
          {
            id: "py-assignment-ops",
            title: "Assignment Operators",
            theory: "Basic = assigns, compound operators (+=, -=, *=, /=, //=, %=, **=) modify in-place. Python 3.8 introduced the walrus operator (:=) which assigns and returns the value in one expression.",
            code: "x = 10\nprint(f\"x = {x}\")\n\nx += 5\nprint(f\"x += 5: {x}\")  # 15\n\nx -= 3\nprint(f\"x -= 3: {x}\")  # 12\n\nx *= 2\nprint(f\"x *= 2: {x}\")  # 24\n\nx /= 4\nprint(f\"x /= 4: {x}\")  # 6.0\n\nx = 17\nx //= 5\nprint(f\"x //= 5: {x}\")  # 3\n\nx = 2\nx **= 10\nprint(f\"x **= 10: {x}\")  # 1024"
          },
          {
            id: "py-bitwise-ops",
            title: "Bitwise Operators",
            theory: "Bitwise: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift: multiply by 2), >> (right shift: divide by 2). Used in low-level programming, masks, and optimization.",
            code: "a = 5   # 0101\nb = 3   # 0011\nprint(f\"a & b  = {a & b}\")   # 1\nprint(f\"a | b  = {a | b}\")   # 7\nprint(f\"a ^ b  = {a ^ b}\")   # 6\nprint(f\"~a     = {~a}\")      # -6\nprint(f\"a << 1 = {a << 1}\")  # 10\nprint(f\"a >> 1 = {a >> 1}\")  # 2\n\nnum = 14\nprint(f\"{num} is even: {(num & 1) == 0}\")"
          },
          {
            id: "py-membership-ops",
            title: "Membership Operators",
            theory: "'in' checks if a value exists in a sequence (string, list, tuple, set, dict). Returns True or False. 'not in' is the inverse. Very readable and commonly used in conditionals.",
            code: "word = \"Hello, World!\"\nprint(f\"'World' in word: {'World' in word}\")\nprint(f\"'Python' not in word: {'Python' not in word}\")\n\nfruits = [\"apple\", \"banana\", \"cherry\"]\nprint(f\"'apple' in fruits: {'apple' in fruits}\")\nprint(f\"'grape' in fruits: {'grape' in fruits}\")\n\nperson = {\"name\": \"Ali\", \"age\": 20}\nprint(f\"'name' in person: {'name' in person}\")\nprint(f\"'Ali' in person: {'Ali' in person}\")"
          },
          {
            id: "py-identity-ops",
            title: "Identity Operators",
            theory: "'is' checks if two variables point to the SAME object in memory (not just equal values). 'is not' is the inverse. Unlike == which checks value equality, is checks object identity. Use 'is' to compare with None.",
            code: "a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\n\nprint(f\"a == b: {a == b}\")  # True (same value)\nprint(f\"a is b: {a is b}\")  # False (different objects)\nprint(f\"a is c: {a is c}\")  # True (same object)\nprint(f\"id(a): {id(a)}, id(b): {id(b)}\")\n\nx = None\nprint(f\"x is None: {x is None}\")  # True"
          },
          {
            id: "py-if-elif-else",
            title: "if-elif-else",
            theory: "if, elif, else for conditional branching. Conditions are followed by colon and body must be indented (no braces). Checks conditions top to bottom, executes first true block. Ternary: x if condition else y.",
            code: "marks = 75\n\nif marks >= 90:\n    grade = \"A+\"\nelif marks >= 80:\n    grade = \"A\"\nelif marks >= 70:\n    grade = \"B\"\nelif marks >= 60:\n    grade = \"C\"\nelse:\n    grade = \"F\"\nprint(f\"Marks: {marks}, Grade: {grade}\")\n\nage = 20\nstatus = \"Adult\" if age >= 18 else \"Minor\"\nprint(f\"Status: {status}\")"
          },
          {
            id: "py-while-loop",
            title: "while Loop",
            theory: "while repeatedly executes body as long as condition is True. Condition checked before each iteration. Optional else clause runs when condition becomes False. Ensure the condition eventually becomes False.",
            code: "count = 5\nwhile count > 0:\n    print(f\"Countdown: {count}\")\n    count -= 1\nprint(\"Go!\")\n\nn = 7\ni = 1\nwhile i <= 10:\n    print(f\"{n} x {i} = {n * i}\")\n    i += 1\n\ni = 0\nwhile i < 3:\n    print(f\"i = {i}\")\n    i += 1\nelse:\n    print(\"Loop finished normally\")"
          },
          {
            id: "py-for-loop-range",
            title: "for Loop & range()",
            theory: "for iterates over any iterable. range(stop) generates 0 to stop-1. range(start,stop) from start to stop-1. range(start,stop,step) with custom step. enumerate() gives index+value. zip() iterates multiple sequences together.",
            code: "for char in \"Python\":\n    print(char, end=\" \")\nprint()\n\nprint(\"range(5):\", list(range(5)))\nprint(\"range(2,8):\", list(range(2,8)))\nprint(\"range(0,10,2):\", list(range(0,10,2)))\n\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor i, fruit in enumerate(fruits, 1):\n    print(f\"{i}. {fruit}\")\n\nnames = [\"Ali\", \"Sara\"]\nscores = [85, 92]\nfor name, score in zip(names, scores):\n    print(f\"{name}: {score}\")"
          },
          {
            id: "py-break-continue-pass",
            title: "break, continue, pass",
            theory: "break exits the loop entirely. continue skips the current iteration. pass is a no-op placeholder that does nothing. These work in both for and while loops.",
            code: "for i in range(1, 100):\n    if i % 7 == 0:\n        print(f\"First multiple of 7: {i}\")\n        break\n\nprint(\"Odd numbers 1-10:\", end=\" \")\nfor i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    print(i, end=\" \")\nprint()\n\nclass EmptyClass:\n    pass\n\nfor i in range(5):\n    if i == 3:\n        pass\n    print(i, end=\" \")\nprint()"
          },
          {
            id: "py-nested-loops",
            title: "Nested Loops",
            theory: "A loop inside another loop. Inner loop completes all iterations for each outer iteration. Total iterations = outer x inner. Common uses: matrix operations, pattern printing. break/continue affect the innermost loop only.",
            code: "for i in range(1, 6):\n    for j in range(1, 6):\n        print(f\"{i*j:4d}\", end=\"\")\n    print()\n\nn = 5\nfor i in range(1, n + 1):\n    print(\"*\" * i)\n\nfor i in range(1, n + 1):\n    spaces = \" \" * (n - i)\n    stars = \"*\" * (2 * i - 1)\n    print(spaces + stars)"
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
            theory: "Lists are ordered, mutable collections in []. They hold mixed types. Methods: append() adds to end, insert() at position, remove() by value, pop() removes and returns, sort() orders in place, reverse() flips. Slicing [1:3] extracts sublists. List comprehension: [x**2 for x in range(10)].",
            code: "fruits = [\"apple\", \"banana\", \"cherry\"]\nnumbers = [1, 2, 3, 4, 5]\n\nfruits.append(\"date\")\nfruits.insert(1, \"blueberry\")\nfruits.remove(\"banana\")\nlast = fruits.pop()\nprint(f\"Popped: {last}, List: {fruits}\")\n\nnumbers.sort(reverse=True)\nprint(f\"Sorted desc: {numbers}\")\n\nnums = [0, 1, 2, 3, 4, 5]\nprint(f\"nums[1:4]: {nums[1:4]}\")\n\nsquares = [x**2 for x in range(10)]\nprint(f\"Squares: {squares}\")"
          },
          {
            id: "py-tuples",
            title: "Tuples",
            theory: "Tuples are ordered, immutable collections in (). Once created they cannot be modified. Single-element tuples need trailing comma: (1,). Tuples support indexing/slicing but not append/remove. Faster than lists and can be dict keys. Tuple unpacking: a,b,c = (1,2,3).",
            code: "colors = (\"red\", \"green\", \"blue\")\npoint = (3, 4)\nsingle = (42,)\n\nprint(f\"First: {colors[0]}\")\nprint(f\"Last: {colors[-1]}\")\n\nx, y = point\nprint(f\"x={x}, y={y}\")\n\nlocations = {\n    (40.7128, -74.0060): \"New York\",\n    (51.5074, -0.1278): \"London\"\n}\nprint(f\"Location: {locations[(40.7128, -74.0060)]}\")\n\nfrom collections import namedtuple\nPoint = namedtuple(\"Point\", [\"x\", \"y\"])\np = Point(3, 4)\nprint(f\"Named: x={p.x}, y={p.y}\")"
          },
          {
            id: "py-sets",
            title: "Sets",
            theory: "Sets are unordered collections of unique elements in {}. Duplicates removed automatically. Operations: union (|), intersection (&), difference (-), symmetric_difference (^). Useful for removing duplicates and testing membership. Mutable but elements must be hashable.",
            code: "numbers = {1, 2, 3, 4, 5}\nfrom_list = set([1, 2, 2, 3, 3, 3])\nprint(f\"From list: {from_list}\")\n\nnumbers.add(6)\nnumbers.remove(3)\n\na = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nprint(f\"Union: {a | b}\")\nprint(f\"Intersection: {a & b}\")\nprint(f\"Difference: {a - b}\")\n\nwords = [\"hello\", \"world\", \"hello\", \"python\"]\nprint(f\"Unique: {set(words)}\")\n\nevens = {x for x in range(20) if x % 2 == 0}\nprint(f\"Evens: {evens}\")"
          },
          {
            id: "py-dictionaries",
            title: "Dictionaries",
            theory: "Dictionaries store key-value pairs in {}. Access: d['key'] or d.get('key', default). Keys must be immutable. Methods: keys(), values(), items(), update(). Dictionary comprehension creates dicts concisely.",
            code: "student = {\"name\": \"Ali\", \"age\": 20, \"gpa\": 3.75}\nprint(f\"Name: {student['name']}\")\nprint(f\"Grade: {student.get('grade', 'N/A')}\")\n\nstudent[\"age\"] = 21\nstudent[\"major\"] = \"CS\"\nprint(f\"Keys: {list(student.keys())}\")\nprint(f\"Values: {list(student.values())}\")\n\nfor key, value in student.items():\n    print(f\"  {key}: {value}\")\n\nsquares = {x: x**2 for x in range(1, 6)}\nprint(f\"Squares: {squares}\")\n\ntext = \"hello world hello python world hello\"\nwords = text.split()\nfreq = {}\nfor w in words:\n    freq[w] = freq.get(w, 0) + 1\nprint(f\"Frequency: {freq}\")"
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
            theory: "Type conversion: int(), str(), float(). Math: abs(), round(), min(), max(), sum(), len(). String: upper(), lower(), split(), join(), strip(), replace(). Iteration: enumerate(), zip(), map(), filter(). These avoid reinventing common operations.",
            code: "print(int(\"42\"), float(\"3.14\"), str(100))\n\nnums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(f\"Sum: {sum(nums)}, Min: {min(nums)}, Max: {max(nums)}\")\n\ntext = \"  Hello, World!  \"\nprint(f\"Upper: {text.strip().upper()}\")\nprint(f\"Split: {text.strip().split(', ')}\")\n\nnames = [\"Ali\", \"Sara\"]\nscores = [85, 92]\nfor i, (n, s) in enumerate(zip(names, scores), 1):\n    print(f\"{i}. {n}: {s}\")\n\ndoubled = list(map(lambda x: x*2, [1,2,3,4]))\nevens = list(filter(lambda x: x%2==0, range(10)))\nprint(f\"Doubled: {doubled}, Evens: {evens}\")"
          },
          {
            id: "py-file-handling",
            title: "File Handling",
            theory: "Use open(filename, mode) to work with files. Modes: 'r' read, 'w' write (overwrites), 'a' append, 'r+' read-write. 'with' statement auto-closes. read() returns content, readline() reads one line, readlines() returns list of lines.",
            code: "with open(\"example.txt\", \"w\") as f:\n    f.write(\"Hello, World!\\n\")\n    f.write(\"Python is fun!\\n\")\n\nwith open(\"example.txt\", \"r\") as f:\n    content = f.read()\n    print(\"Full content:\")\n    print(content)\n\nwith open(\"example.txt\", \"r\") as f:\n    for line in f:\n        print(line.strip())\n\nwith open(\"example.txt\", \"a\") as f:\n    f.write(\"This is appended.\\n\")"
          },
          {
            id: "py-functions",
            title: "User-defined Functions",
            theory: "Define with def name(params): return value. Default params: def f(x=10). *args collects extra positional args as tuple. **kwargs collects extra keyword args as dict. Lambda: lambda x: x*2 for one-liners.",
            code: "def greet(name):\n    return f\"Hello, {name}!\"\nprint(greet(\"Ali\"))\n\ndef power(base, exp=2):\n    return base ** exp\nprint(power(3))      # 9\nprint(power(3, 3))   # 27\n\ndef total(*args):\n    return sum(args)\nprint(total(1, 2, 3, 4, 5))  # 15\n\ndef info(**kwargs):\n    for key, value in kwargs.items():\n        print(f\"  {key}: {value}\")\ninfo(name=\"Ali\", age=20, major=\"CS\")\n\nsquare = lambda x: x ** 2\nprint(f\"Square: {square(5)}\")\n\nnums = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, nums))\nprint(f\"Squared: {squared}\")"
          },
          {
            id: "py-recursion",
            title: "Recursion in Python",
            theory: "Recursion is when a function calls itself. Base case is essential to prevent infinite recursion. Python has default recursion limit (~1000), adjustable with sys.setrecursionlimit(). Elegant for factorial, Fibonacci, Tower of Hanoi.",
            code: "import sys\nsys.setrecursionlimit(2000)\n\ndef factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\nprint(f\"5! = {factorial(5)}\")\n\ndef fibonacci(n):\n    if n == 0: return 0\n    if n == 1: return 1\n    return fibonacci(n-1) + fibonacci(n-2)\nprint([fibonacci(i) for i in range(10)])\n\ndef hanoi(n, src, tgt, aux):\n    if n == 1:\n        print(f\"Move disk 1 from {src} to {tgt}\")\n        return\n    hanoi(n-1, src, aux, tgt)\n    print(f\"Move disk {n} from {src} to {tgt}\")\n    hanoi(n-1, aux, tgt, src)\n\nhanoi(3, 'A', 'C', 'B')"
          },
          {
            id: "py-scope",
            title: "Scope (LEGB Rule)",
            theory: "Python follows LEGB: Local (inside function), Enclosing (outer function for nested), Global (module level), Built-in (Python built-ins). global keyword declares global inside function. nonlocal refers to nearest enclosing scope. Closures are inner functions remembering outer variables.",
            code: "x = \"global\"\n\ndef outer():\n    x = \"outer\"\n    def inner():\n        x = \"inner\"\n        print(f\"Inner: {x}\")\n    inner()\n    print(f\"Outer: {x}\")\nouter()\nprint(f\"Global: {x}\")\n\ncounter = 0\ndef increment():\n    global counter\n    counter += 1\nincrement()\nincrement()\nprint(f\"Counter: {counter}\")  # 2\n\ndef multiplier(factor):\n    def multiply(number):\n        return number * factor\n    return multiply\ndouble = multiplier(2)\ntriple = multiplier(3)\nprint(f\"Double 5: {double(5)}\")\nprint(f\"Triple 5: {triple(5)}\")"
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
            theory: "Modules are Python files with functions/classes/variables. Import with 'import module' or 'from module import func'. if __name__ == '__main__' ensures code runs only when executed directly. Packages are folders with __init__.py. Install with pip. Useful: math, random, datetime, os.",
            code: "import math\nimport random\nimport datetime\n\nprint(f\"pi = {math.pi}\")\nprint(f\"sqrt(16) = {math.sqrt(16)}\")\nprint(f\"ceil(3.2) = {math.ceil(3.2)}\")\n\nprint(f\"Random int: {random.randint(1, 100)}\")\nprint(f\"Choice: {random.choice(['a','b','c'])}\")\n\nnow = datetime.datetime.now()\nprint(f\"Now: {now.strftime('%Y-%m-%d %H:%M:%S')}\")\n\nfrom math import pi, sin\nprint(f\"sin(pi/2) = {sin(pi/2)}\")\n\ndef main():\n    print(\"Runs only when executed directly\")\n\nif __name__ == \"__main__\":\n    main()"
          },
          {
            id: "py-matplotlib",
            title: "Matplotlib",
            theory: "Matplotlib creates charts and graphs. import matplotlib.pyplot as plt. plt.plot() line chart, plt.bar() bar chart, plt.scatter() scatter, plt.hist() histogram. plt.title/label for labels, plt.show() to display, plt.savefig() to save.",
            code: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\nplt.plot(x, y, marker='o', color='blue', label='y=2x')\nplt.title(\"Line Chart\")\nplt.xlabel(\"X-axis\")\nplt.ylabel(\"Y-axis\")\nplt.legend()\nplt.grid(True)\nplt.show()\n\nsubjects = ['Math', 'Science', 'English', 'CS']\nscores = [85, 78, 92, 95]\nplt.bar(subjects, scores, color=['red','green','blue','cyan'])\nplt.title(\"Scores by Subject\")\nplt.ylabel(\"Marks\")\nplt.show()"
          },
          {
            id: "py-numpy",
            title: "NumPy",
            theory: "NumPy is the fundamental package for numerical computing. np.array() creates arrays. np.zeros(), np.ones(), np.arange() are useful. Supports element-wise operations without loops. np.dot() for dot product. Slicing works in multiple dimensions. shape and reshape manage dimensions.",
            code: "import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nprint(f\"Array: {arr}\")\n\nzeros = np.zeros((2, 3))\nprint(f\"Zeros:\\n{zeros}\")\n\narange = np.arange(0, 10, 2)\nprint(f\"Arange: {arange}\")\n\nmatrix = np.array([[1, 2, 3], [4, 5, 6]])\nprint(f\"Shape: {matrix.shape}\")\n\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(f\"Add: {a + b}\")\nprint(f\"Multiply: {a * b}\")\n\nprint(f\"Mean: {arr.mean()}, Sum: {arr.sum()}\")\nprint(f\"First 3: {arr[:3]}\")\nprint(f\"Reshape: {arr.reshape(1, 5)}\")"
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
            theory: "A data structure is a way of organizing and storing data for efficient operations. Linear types (array, linked list, stack, queue) arrange data sequentially. Non-linear types (tree, graph) use hierarchical or graph-based connections. Static structures have fixed size; dynamic structures grow. Common operations: traverse, search, insert, delete, sort.",
            code: "#include <stdio.h>\nint main() {\n    int arr[100] = {10, 20, 30, 40, 50};\n    int n = 5;\n    printf(\"Elements: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    int key = 30, found = -1;\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) { found = i; break; }\n    printf(\"Found %d at index %d\\n\", key, found);\n    int pos = 2, val = 25;\n    for (int i = n; i > pos; i--) arr[i] = arr[i-1];\n    arr[pos] = val; n++;\n    printf(\"After insert: \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}"
          },
          {
            id: "algorithm-complexity",
            title: "Algorithm Complexity",
            theory: "Algorithm complexity measures how running time and memory grow with input size. Time complexity counts operations relative to input n. Space complexity measures extra memory. We use asymptotic analysis to describe growth rates, ignoring constants and focusing on the dominant term.",
            code: "#include <stdio.h>\nint accessElement(int arr[], int idx) { return arr[idx]; }\nint linearSum(int arr[], int n) {\n    int sum = 0;\n    for (int i = 0; i < n; i++) sum += arr[i];\n    return sum;\n}\nint binarySearch(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == key) return mid;\n        else if (arr[mid] < key) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\nint main() {\n    printf(\"O(1)    : Constant    - Array access\\n\");\n    printf(\"O(log n): Logarithmic - Binary search\\n\");\n    printf(\"O(n)    : Linear      - Simple search\\n\");\n    printf(\"O(n^2)  : Quadratic   - Nested loops\\n\");\n    return 0;\n}"
          },
          {
            id: "big-o-omega-theta",
            title: "Asymptotic Notations",
            theory: "Big-O describes upper bound (worst case). Omega (Omega) describes lower bound (best case). Theta describes tight bound (average). Growth rates: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n). We typically care about worst case (Big-O) for algorithm analysis.",
            code: "#include <stdio.h>\nint getFirst(int arr[]) { return arr[0]; }\nint binarySearch(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == key) return mid;\n        if (arr[mid] < key) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\nint linearSearch(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) return i;\n    return -1;\n}\nint main() {\n    int n = 1000000;\n    printf(\"For n = %d:\\n\", n);\n    printf(\"O(1)      : ~1 operation\\n\");\n    printf(\"O(log n)  : ~20 operations\\n\");\n    printf(\"O(n)      : ~1,000,000 operations\\n\");\n    printf(\"O(n log n): ~20,000,000 operations\\n\");\n    printf(\"O(n^2)    : ~1,000,000,000,000 operations\\n\");\n    return 0;\n}"
          },
          {
            id: "arrays-row-column",
            title: "Row Major & Column Major",
            theory: "Row major (C default) stores elements row by row in memory. Column major (Fortran) stores column by column. Address of [i][j] in row major: base + (i*n + j)*size. Column major: base + (j*m + i)*size. Understanding this helps optimize cache performance.",
            code: "#include <stdio.h>\nint main() {\n    int m = 3, n = 4;\n    int arr[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};\n    printf(\"Row Major:\\n\");\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            printf(\"%d \", arr[i][j]);\n    printf(\"\\n\");\n    printf(\"Column Major:\\n\");\n    for (int j = 0; j < n; j++)\n        for (int i = 0; i < m; i++)\n            printf(\"%d \", arr[i][j]);\n    printf(\"\\n\");\n    return 0;\n}"
          },
          {
            id: "array-operations",
            title: "Array Operations",
            theory: "Traversal: O(n) visits every element. Search: O(n) linear or O(log n) binary on sorted. Insert at end: O(1) if space. Insert at position: O(n) requires shifting. Delete: O(n) requires shifting. Arrays offer fast random access but slow insertion/deletion.",
            code: "#include <stdio.h>\nvoid display(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[100] = {10, 20, 30, 40, 50};\n    int n = 5;\n    printf(\"Original: \"); display(arr, n);\n    int pos = 2, val = 25;\n    for (int i = n; i > pos; i--) arr[i] = arr[i-1];\n    arr[pos] = val; n++;\n    printf(\"Insert at %d: \", pos); display(arr, n);\n    pos = 3;\n    int del = arr[pos];\n    for (int i = pos; i < n-1; i++) arr[i] = arr[i+1];\n    n--;\n    printf(\"Delete %d: \", del); display(arr, n);\n    return 0;\n}"
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
            theory: "Stack follows Last In First Out. Last pushed element is first popped. Operations: push (add top), pop (remove top), peek (view top), isEmpty. Can be implemented with arrays (fixed size) or linked lists (dynamic). Applications: undo, expression evaluation, function call management.",
            code: "#include <stdio.h>\n#define MAX 100\nint stack[MAX], top = -1;\nvoid push(int val) {\n    if (top == MAX-1) { printf(\"Overflow!\\n\"); return; }\n    stack[++top] = val;\n    printf(\"Pushed: %d\\n\", val);\n}\nint pop() {\n    if (top == -1) { printf(\"Underflow!\\n\"); return -1; }\n    return stack[top--];\n}\nint peek() { return (top == -1) ? -1 : stack[top]; }\nvoid display() {\n    printf(\"Stack: \");\n    for (int i = top; i >= 0; i--) printf(\"%d \", stack[i]);\n    printf(\"\\n\");\n}\nint main() {\n    push(10); push(20); push(30);\n    display();\n    printf(\"Top: %d\\n\", peek());\n    printf(\"Popped: %d\\n\", pop());\n    display();\n    return 0;\n}"
          },
          {
            id: "infix-prefix-postfix",
            title: "Infix, Prefix & Postfix",
            theory: "Infix: a+b (human). Prefix: +ab (Polish). Postfix: ab+ (Reverse Polish). Infix-to-postfix uses stack with operator precedence. Postfix evaluation: push operands, pop and compute on operators. Postfix removes need for parentheses and precedence rules.",
            code: "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nchar stack[100]; int top = -1;\nvoid push(char c) { stack[++top] = c; }\nchar pop() { return stack[top--]; }\nchar peek() { return stack[top]; }\nint prec(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    return 0;\n}\nvoid infixToPostfix(char infix[], char postfix[]) {\n    int j = 0;\n    for (int i = 0; infix[i]; i++) {\n        char c = infix[i];\n        if (isalnum(c)) postfix[j++] = c;\n        else if (c == '(') push(c);\n        else if (c == ')') {\n            while (top != -1 && peek() != '(')\n                postfix[j++] = pop();\n            pop();\n        } else {\n            while (top != -1 && prec(peek()) >= prec(c))\n                postfix[j++] = pop();\n            push(c);\n        }\n    }\n    while (top != -1) postfix[j++] = pop();\n    postfix[j] = '\\0';\n}\nint main() {\n    char infix[] = \"A+B*C\";\n    char postfix[100];\n    infixToPostfix(infix, postfix);\n    printf(\"Infix: %s\\nPostfix: %s\\n\", infix, postfix);\n    return 0;\n}"
          },
          {
            id: "recursion-ds",
            title: "Recursion & DS",
            theory: "Recursion is fundamental to DS algorithms. Factorial: f(n) = n * f(n-1), base f(0)=1. GCD: gcd(a,b) = gcd(b, a%b), base gcd(a,0)=a. Fibonacci: fib(n) = fib(n-1) + fib(n-2), base fib(0)=0, fib(1)=1. Each call uses stack space.",
            code: "#include <stdio.h>\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\nint fibonacci(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\nvoid hanoi(int n, char src, char tgt, char aux) {\n    if (n == 1) { printf(\"Move disk 1 from %c to %c\\n\", src, tgt); return; }\n    hanoi(n-1, src, aux, tgt);\n    printf(\"Move disk %d from %c to %c\\n\", n, src, tgt);\n    hanoi(n-1, aux, tgt, src);\n}\nint main() {\n    printf(\"5! = %d\\n\", factorial(5));\n    printf(\"GCD(48,18) = %d\\n\", gcd(48, 18));\n    printf(\"Fib(10) = %d\\n\", fibonacci(10));\n    hanoi(3, 'A', 'C', 'B');\n    return 0;\n}"
          },
          {
            id: "queue-simple",
            title: "Simple Queue (FIFO)",
            theory: "Queue follows First In First Out. First enqueued element is first dequeued. Operations: enqueue (add rear), dequeue (remove front), front, isEmpty. Array implementation wastes space as front moves forward. Linked list is more flexible. Applications: print queue, BFS, task scheduling.",
            code: "#include <stdio.h>\n#define MAX 100\nint queue[MAX], front = -1, rear = -1;\nvoid enqueue(int val) {\n    if (rear == MAX-1) { printf(\"Full!\\n\"); return; }\n    if (front == -1) front = 0;\n    queue[++rear] = val;\n    printf(\"Enqueued: %d\\n\", val);\n}\nint dequeue() {\n    if (front == -1 || front > rear) { printf(\"Empty!\\n\"); return -1; }\n    return queue[front++];\n}\nvoid display() {\n    printf(\"Queue: \");\n    for (int i = front; i <= rear; i++) printf(\"%d \", queue[i]);\n    printf(\"\\n\");\n}\nint main() {\n    enqueue(10); enqueue(20); enqueue(30);\n    display();\n    printf(\"Dequeued: %d\\n\", dequeue());\n    display();\n    return 0;\n}"
          },
          {
            id: "queue-circular",
            title: "Circular Queue",
            theory: "Circular queue wraps rear to front, solving wasted space. Full: (rear+1)%MAX == front. Empty: front == -1. After dequeue: front = (front+1)%MAX. After enqueue: rear = (rear+1)%MAX. Reuses freed positions at array start.",
            code: "#include <stdio.h>\n#define MAX 5\nint queue[MAX], front = -1, rear = -1;\nvoid enqueue(int val) {\n    if ((rear+1)%MAX == front) { printf(\"Full!\\n\"); return; }\n    if (front == -1) front = 0;\n    rear = (rear+1)%MAX;\n    queue[rear] = val;\n    printf(\"Enqueued: %d\\n\", val);\n}\nint dequeue() {\n    if (front == -1) { printf(\"Empty!\\n\"); return -1; }\n    int val = queue[front];\n    if (front == rear) front = rear = -1;\n    else front = (front+1)%MAX;\n    return val;\n}\nvoid display() {\n    if (front == -1) { printf(\"Empty\\n\"); return; }\n    printf(\"Queue: \");\n    int i = front;\n    while (1) { printf(\"%d \", queue[i]); if (i == rear) break; i = (i+1)%MAX; }\n    printf(\"\\n\");\n}\nint main() {\n    enqueue(10); enqueue(20); enqueue(30);\n    display();\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    enqueue(40); enqueue(50); enqueue(60);\n    display();\n    return 0;\n}"
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
            theory: "Structures group different data types using struct. Access: dot (.) for direct, arrow (->) for pointer. Dynamic allocation: malloc() allocates, calloc() allocates and initializes, free() releases. Essential for building linked data structures.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\nint main() {\n    struct Student s1 = {\"Ali\", 20, 3.75};\n    printf(\"Name: %s, Age: %d\\n\", s1.name, s1.age);\n    struct Student *s2 = (struct Student*)malloc(sizeof(struct Student));\n    strcpy(s2->name, \"Sara\");\n    s2->age = 22;\n    s2->gpa = 3.9;\n    printf(\"Name: %s, Age: %d\\n\", s2->name, s2->age);\n    free(s2);\n    return 0;\n}"
          },
          {
            id: "singly-linked-list",
            title: "Singly Linked List",
            theory: "A chain of nodes where each has data and a pointer to next. Head references first node, last points to NULL. Dynamic size, efficient insertion/deletion without shifting, but no random access. Unlike arrays, memory is not contiguous.",
            code: "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *next; };\nvoid insertAtBeginning(struct Node **head, int val) {\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val; n->next = *head; *head = n;\n}\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL;\n    if (*head == NULL) { *head = n; return; }\n    struct Node *t = *head;\n    while (t->next != NULL) t = t->next;\n    t->next = n;\n}\nvoid deleteNode(struct Node **head, int val) {\n    struct Node *t = *head, *p = NULL;\n    if (t && t->data == val) { *head = t->next; free(t); return; }\n    while (t && t->data != val) { p = t; t = t->next; }\n    if (t) { p->next = t->next; free(t); }\n}\nvoid display(struct Node *h) {\n    while (h) { printf(\"%d -> \", h->data); h = h->next; }\n    printf(\"NULL\\n\");\n}\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10); insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30); insertAtBeginning(&head, 5);\n    display(head);\n    deleteNode(&head, 20);\n    display(head);\n    return 0;\n}"
          },
          {
            id: "circular-linked-list",
            title: "Circular Linked List",
            theory: "Last node points back to head instead of NULL, forming a circle. No natural end, so traversal uses do-while stopping when returning to head. Useful for round-robin scheduling, playlists, Josephus problem. Can be singly or doubly linked.",
            code: "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *next; };\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val;\n    if (*head == NULL) { *head = n; n->next = *head; return; }\n    struct Node *t = *head;\n    while (t->next != *head) t = t->next;\n    t->next = n; n->next = *head;\n}\nvoid display(struct Node *head) {\n    if (!head) return;\n    struct Node *t = head;\n    do { printf(\"%d -> \", t->data); t = t->next; } while (t != head);\n    printf(\"(back to head)\\n\");\n}\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n    display(head);\n    return 0;\n}"
          },
          {
            id: "doubly-linked-list",
            title: "Doubly Linked List",
            theory: "Nodes have prev, data, and next pointers. Bidirectional traversal. Easier deletion (no need to find previous). More memory for extra pointer. Used in browser history, LRU caches, text editors.",
            code: "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *prev, *next; };\nvoid insertAtEnd(struct Node **head, int val) {\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL; n->prev = NULL;\n    if (*head == NULL) { *head = n; return; }\n    struct Node *t = *head;\n    while (t->next) t = t->next;\n    t->next = n; n->prev = t;\n}\nvoid deleteNode(struct Node **head, int val) {\n    struct Node *t = *head;\n    while (t) {\n        if (t->data == val) {\n            if (t->prev) t->prev->next = t->next;\n            else *head = t->next;\n            if (t->next) t->next->prev = t->prev;\n            free(t); return;\n        }\n        t = t->next;\n    }\n}\nvoid display(struct Node *head) {\n    printf(\"Forward:  \");\n    struct Node *t = head;\n    while (t) { printf(\"%d <-> \", t->data); t = t->next; }\n    printf(\"NULL\\n\");\n}\nint main() {\n    struct Node *head = NULL;\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n    display(head);\n    deleteNode(&head, 20);\n    display(head);\n    return 0;\n}"
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
            theory: "A tree is hierarchical with nodes and edges. Topmost is root. Direct connections above are parents, below are children. Nodes with no children are leaves. Level starts at 0 (root). Height is max level. Binary tree: max 2 children per node. Complete trees fill all levels except possibly the last.",
            code: "#include <stdio.h>\n#include <stdlib.h>\nstruct TreeNode { int data; struct TreeNode *left, *right; };\nstruct TreeNode* createNode(int val) {\n    struct TreeNode *n = (struct TreeNode*)malloc(sizeof(struct TreeNode));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\nint height(struct TreeNode *r) {\n    if (!r) return -1;\n    int lh = height(r->left), rh = height(r->right);\n    return (lh > rh ? lh : rh) + 1;\n}\nint countNodes(struct TreeNode *r) {\n    if (!r) return 0;\n    return 1 + countNodes(r->left) + countNodes(r->right);\n}\nint countLeaves(struct TreeNode *r) {\n    if (!r) return 0;\n    if (!r->left && !r->right) return 1;\n    return countLeaves(r->left) + countLeaves(r->right);\n}\nint main() {\n    struct TreeNode *root = createNode(1);\n    root->left = createNode(2); root->right = createNode(3);\n    root->left->left = createNode(4); root->left->right = createNode(5);\n    printf(\"Height: %d\\n\", height(root));\n    printf(\"Nodes: %d\\n\", countNodes(root));\n    printf(\"Leaves: %d\\n\", countLeaves(root));\n    return 0;\n}"
          },
          {
            id: "tree-traversals",
            title: "Tree Traversals",
            theory: "Inorder (Left-Root-Right): sorted for BST. Preorder (Root-Left-Right): copy/serialize tree. Postorder (Left-Right-Root): delete tree, evaluate expressions. Level-order (BFS): visit level by level using queue.",
            code: "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* createNode(int val) {\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\nvoid inorder(struct Node *r) {\n    if (!r) return; inorder(r->left); printf(\"%d \", r->data); inorder(r->right);\n}\nvoid preorder(struct Node *r) {\n    if (!r) return; printf(\"%d \", r->data); preorder(r->left); preorder(r->right);\n}\nvoid postorder(struct Node *r) {\n    if (!r) return; postorder(r->left); postorder(r->right); printf(\"%d \", r->data);\n}\nint main() {\n    struct Node *root = createNode(1);\n    root->left = createNode(2); root->right = createNode(3);\n    root->left->left = createNode(4); root->left->right = createNode(5);\n    printf(\"Inorder:   \"); inorder(root); printf(\"\\n\");\n    printf(\"Preorder:  \"); preorder(root); printf(\"\\n\");\n    printf(\"Postorder: \"); postorder(root); printf(\"\\n\");\n    return 0;\n}"
          },
          {
            id: "bst",
            title: "Binary Search Tree",
            theory: "BST: left child < parent < right child. Enables O(log n) average search, insert, delete. Search compares target and goes left/right. Insert finds correct leaf position. Delete: leaf (remove), one child (replace), two children (replace with in-order successor).",
            code: "#include <stdio.h>\n#include <stdlib.h>\nstruct Node { int data; struct Node *left, *right; };\nstruct Node* createNode(int val) {\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL; return n;\n}\nstruct Node* insert(struct Node *r, int val) {\n    if (!r) return createNode(val);\n    if (val < r->data) r->left = insert(r->left, val);\n    else if (val > r->data) r->right = insert(r->right, val);\n    return r;\n}\nstruct Node* search(struct Node *r, int key) {\n    if (!r || r->data == key) return r;\n    if (key < r->data) return search(r->left, key);\n    return search(r->right, key);\n}\nvoid inorder(struct Node *r) {\n    if (!r) return; inorder(r->left); printf(\"%d \", r->data); inorder(r->right);\n}\nint main() {\n    struct Node *root = NULL;\n    int vals[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, vals[i]);\n    printf(\"BST inorder: \"); inorder(root); printf(\"\\n\");\n    struct Node *f = search(root, 40);\n    printf(\"Search 40: %s\\n\", f ? \"Found\" : \"Not found\");\n    return 0;\n}"
          },
          {
            id: "graph-terminology",
            title: "Graph Terminology",
            theory: "Graph has vertices (nodes) and edges (connections). Directed: one-way edges. Undirected: two-way. Weighted: values on edges. Adjacency matrix: O(V^2) space. Adjacency list: O(V+E). Degree: edges at a vertex. Path: sequence of connected vertices. Cycle: returns to start.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n#define V 5\nint adjMatrix[V][V] = {0};\nvoid addEdge(int i, int j) { adjMatrix[i][j] = 1; adjMatrix[j][i] = 1; }\nvoid printMatrix() {\n    printf(\"  \"); for (int i = 0; i < V; i++) printf(\"%d \", i); printf(\"\\n\");\n    for (int i = 0; i < V; i++) {\n        printf(\"%d \", i);\n        for (int j = 0; j < V; j++) printf(\"%d \", adjMatrix[i][j]);\n        printf(\"\\n\");\n    }\n}\nstruct AdjNode { int dest; struct AdjNode *next; };\nstruct AdjList { struct AdjNode *head; };\nstruct AdjList adjList[V];\nvoid addEdgeList(int s, int d) {\n    struct AdjNode *n = (struct AdjNode*)malloc(sizeof(struct AdjNode));\n    n->dest = d; n->next = adjList[s].head; adjList[s].head = n;\n}\nvoid printList() {\n    printf(\"\\nAdjacency List:\\n\");\n    for (int i = 0; i < V; i++) {\n        printf(\"%d: \", i);\n        struct AdjNode *t = adjList[i].head;\n        while (t) { printf(\"%d -> \", t->dest); t = t->next; }\n        printf(\"NULL\\n\");\n    }\n}\nint main() {\n    addEdge(0,1); addEdge(0,2); addEdge(1,3); addEdge(2,4);\n    printMatrix();\n    addEdgeList(0,1); addEdgeList(0,2); addEdgeList(1,3); addEdgeList(2,4);\n    printList();\n    return 0;\n}"
          },
          {
            id: "graph-types",
            title: "Types of Graphs",
            theory: "Complete: every vertex connects to every other. Connected: path between any two vertices. Sparse: few edges (E approx V). Dense: many edges (E approx V^2). Cyclic: has cycle. Acyclic (DAG): no cycles. Representation: matrix for dense O(V^2), list for sparse O(V+E).",
            code: "#include <stdio.h>\n#include <stdlib.h>\n#define V 5\nint adj[V][V] = {0};\nvoid addEdge(int i, int j) { adj[i][j] = 1; adj[j][i] = 1; }\nint isComplete() {\n    for (int i = 0; i < V; i++)\n        for (int j = 0; j < V; j++)\n            if (i != j && adj[i][j] == 0) return 0;\n    return 1;\n}\nvoid bfs(int start) {\n    int visited[V] = {0}, queue[V], f = 0, r = 0;\n    visited[start] = 1; queue[r++] = start;\n    printf(\"BFS: \");\n    while (f < r) {\n        int node = queue[f++];\n        printf(\"%d \", node);\n        for (int i = 0; i < V; i++)\n            if (adj[node][i] && !visited[i]) {\n                visited[i] = 1; queue[r++] = i;\n            }\n    }\n    printf(\"\\n\");\n}\nint main() {\n    addEdge(0,1); addEdge(0,2); addEdge(1,3); addEdge(2,4);\n    printf(\"Complete: %s\\n\", isComplete() ? \"Yes\" : \"No\");\n    bfs(0);\n    int edges = 0;\n    for (int i = 0; i < V; i++)\n        for (int j = i+1; j < V; j++) if (adj[i][j]) edges++;\n    printf(\"Vertices: %d, Edges: %d\\n\", V, edges);\n    return 0;\n}"
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
            theory: "Bubble sort compares adjacent elements and swaps if wrong order. Largest bubbles to end each pass. O(n^2) worst/average, O(n) best with optimization (no swaps). O(1) space, in-place sorting.",
            code: "#include <stdio.h>\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n                swapped = 1;\n            }\n        if (!swapped) break;\n    }\n}\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    printf(\"Before: \"); printArr(arr, 7);\n    bubbleSort(arr, 7);\n    printf(\"After:  \"); printArr(arr, 7);\n    return 0;\n}"
          },
          {
            id: "selection-sort",
            title: "Selection Sort",
            theory: "Finds minimum from unsorted part, swaps with first unsorted element. Always O(n^2) comparisons regardless of input. At most n-1 swaps, useful when writes are expensive. Simple but not efficient for large data.",
            code: "#include <stdio.h>\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min]) min = j;\n        if (min != i) { int t = arr[i]; arr[i] = arr[min]; arr[min] = t; }\n    }\n}\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[] = {64, 25, 12, 22, 11};\n    printf(\"Before: \"); printArr(arr, 5);\n    selectionSort(arr, 5);\n    printf(\"After:  \"); printArr(arr, 5);\n    return 0;\n}"
          },
          {
            id: "insertion-sort",
            title: "Insertion Sort",
            theory: "Picks element, inserts in correct position in sorted part by shifting. O(n^2) worst, O(n) best (already sorted). Stable, in-place. Efficient for small or nearly sorted datasets.",
            code: "#include <stdio.h>\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j]; j--;\n        }\n        arr[j+1] = key;\n    }\n}\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[] = {12, 11, 13, 5, 6};\n    printf(\"Before: \"); printArr(arr, 5);\n    insertionSort(arr, 5);\n    printf(\"After:  \"); printArr(arr, 5);\n    return 0;\n}"
          },
          {
            id: "quick-sort",
            title: "Quick Sort",
            theory: "Pick pivot, partition (smaller left, larger right), recursively sort. O(n log n) average, O(n^2) worst (bad pivot). In-place, not stable. Very fast in practice due to cache efficiency. Lomuto and Hoare are common partition schemes.",
            code: "#include <stdio.h>\nvoid swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high], i = low - 1;\n    for (int j = low; j < high; j++)\n        if (arr[j] <= pivot) { i++; swap(&arr[i], &arr[j]); }\n    swap(&arr[i+1], &arr[high]);\n    return i + 1;\n}\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi-1);\n        quickSort(arr, pi+1, high);\n    }\n}\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[] = {10, 7, 8, 9, 1, 5};\n    printf(\"Before: \"); printArr(arr, 6);\n    quickSort(arr, 0, 5);\n    printf(\"After:  \"); printArr(arr, 6);\n    return 0;\n}"
          },
          {
            id: "merge-sort",
            title: "Merge Sort",
            theory: "Divide and conquer: split in half, sort halves, merge. O(n log n) always. O(n) extra space. Stable. Excellent for linked lists and external sorting. The merge step combines two sorted subarrays into one sorted array.",
            code: "#include <stdio.h>\n#include <stdlib.h>\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m-l+1, n2 = r-m;\n    int *L = malloc(n1*sizeof(int)), *R = malloc(n2*sizeof(int));\n    for (int i = 0; i < n1; i++) L[i] = arr[l+i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m+1+j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2)\n        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n    free(L); free(R);\n}\nvoid mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r-l)/2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m+1, r);\n        merge(arr, l, m, r);\n    }\n}\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[] = {38, 27, 43, 3, 9, 82, 10};\n    printf(\"Before: \"); printArr(arr, 7);\n    mergeSort(arr, 0, 6);\n    printf(\"After:  \"); printArr(arr, 7);\n    return 0;\n}"
          },
          {
            id: "radix-sort",
            title: "Radix Sort",
            theory: "Non-comparison sort: sorts digit by digit from least significant. Uses counting sort as subroutine per digit. O(d*(n+k)) where d=digits, k=range. Not comparison-based. Stable when using stable subroutine. Efficient for fixed-length integers.",
            code: "#include <stdio.h>\nint getMax(int arr[], int n) {\n    int mx = arr[0];\n    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];\n    return mx;\n}\nvoid countSort(int arr[], int n, int exp) {\n    int out[n], count[10] = {0};\n    for (int i = 0; i < n; i++) count[(arr[i]/exp)%10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i-1];\n    for (int i = n-1; i >= 0; i--) {\n        out[count[(arr[i]/exp)%10]-1] = arr[i];\n        count[(arr[i]/exp)%10]--;\n    }\n    for (int i = 0; i < n; i++) arr[i] = out[i];\n}\nvoid radixSort(int arr[], int n) {\n    int m = getMax(arr, n);\n    for (int exp = 1; m/exp > 0; exp *= 10)\n        countSort(arr, n, exp);\n}\nvoid printArr(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\nint main() {\n    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};\n    printf(\"Before: \"); printArr(arr, 8);\n    radixSort(arr, 8);\n    printf(\"After:  \"); printArr(arr, 8);\n    return 0;\n}"
          },
          {
            id: "linear-search",
            title: "Linear Search",
            theory: "Checks each element one by one from start to end. O(n) time. Works on unsorted data. Simple implementation but slow for large data. Returns index if found, -1 if not found.",
            code: "#include <stdio.h>\nint linearSearch(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == key) return i;\n    return -1;\n}\nint main() {\n    int arr[] = {10, 23, 45, 70, 11, 15};\n    int key = 70;\n    int result = linearSearch(arr, 6, key);\n    if (result != -1)\n        printf(\"Found %d at index %d\\n\", key, result);\n    else\n        printf(\"%d not found\\n\", key);\n    return 0;\n}"
          },
          {
            id: "binary-search",
            title: "Binary Search",
            theory: "On sorted array only. Compare middle element with target, go left or right. O(log n). Much faster than linear. Can be recursive or iterative. Requires sorted input which adds O(n log n) preprocessing cost if unsorted.",
            code: "#include <stdio.h>\nint binarySearch(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == key) return mid;\n        else if (arr[mid] < key) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int key = 23;\n    int result = binarySearch(arr, 10, key);\n    if (result != -1)\n        printf(\"Found %d at index %d\\n\", key, result);\n    else\n        printf(\"%d not found\\n\", key);\n    return 0;\n}"
          },
          {
            id: "hashing",
            title: "Hashing",
            theory: "Hash function maps key to index for O(1) direct access. Collision occurs when two keys map to same index. Chaining: linked list at each slot. Open addressing: find next empty slot (linear/quadratic probing). Load factor = n/table_size, determines when to resize.",
            code: "#include <stdio.h>\n#include <stdlib.h>\n#define SIZE 10\nstruct Node { int key; struct Node *next; };\nstruct Node *table[SIZE] = {NULL};\nint hash(int key) { return key % SIZE; }\nvoid insert(int key) {\n    int idx = hash(key);\n    struct Node *n = (struct Node*)malloc(sizeof(struct Node));\n    n->key = key;\n    n->next = table[idx];\n    table[idx] = n;\n}\nint search(int key) {\n    int idx = hash(key);\n    struct Node *t = table[idx];\n    while (t) { if (t->key == key) return 1; t = t->next; }\n    return 0;\n}\nvoid display() {\n    for (int i = 0; i < SIZE; i++) {\n        printf(\"%d: \", i);\n        struct Node *t = table[i];\n        while (t) { printf(\"%d -> \", t->key); t = t->next; }\n        printf(\"NULL\\n\");\n    }\n}\nint main() {\n    insert(15); insert(25); insert(35); insert(45); insert(20);\n    display();\n    printf(\"Search 25: %s\\n\", search(25) ? \"Found\" : \"Not found\");\n    printf(\"Search 50: %s\\n\", search(50) ? \"Found\" : \"Not found\");\n    return 0;\n}"
          }
        ]
      }
    ]
  }
];
