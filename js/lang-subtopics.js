var SHARED_SUBTOPICS = {
  variables: [
    {
      id: "declaration",
      title: "Variable Declaration",
      content: "Variables are declared using keywords like var, let, or const depending on the language. Declaration tells the compiler or interpreter to reserve memory for a named value. Without declaration, a variable cannot be used in most statically-typed languages.",
      code: "int count;\nString name;\nfloat price;\nbool isActive;\ndouble volume;"
    },
    {
      id: "initialization",
      title: "Variable Initialization",
      content: "Initialization assigns an initial value to a variable at the time of declaration. This ensures the variable holds a valid value before it is first used. Failing to initialize can lead to undefined behavior or runtime errors in some languages.",
      code: 'int count = 0;\nString name = "Alice";\nfloat price = 9.99f;\nbool isActive = true;\ndouble volume = 0.0;'
    },
    {
      id: "naming-rules",
      title: "Naming Rules",
      content: "Variable names must follow specific rules: they cannot start with a digit, cannot contain spaces, and cannot be reserved keywords. Most conventions use camelCase or snake_case for readability. Consistent naming improves code maintainability.",
      code: "int userName = 10;     // valid\nint 2ndPlace = 5;      // invalid: starts with digit\nint user_name = 10;    // valid (snake_case)\nint user-name = 10;    // invalid: contains hyphen\nint totalScore = 100;  // valid (camelCase)"
    },
    {
      id: "scope",
      title: "Variable Scope",
      content: "Scope determines where a variable can be accessed within a program. Local variables exist only within their block, while global variables are accessible throughout the program. Understanding scope helps avoid naming conflicts and unintended side effects.",
      code: "int globalVar = 10;\nvoid myFunction() {\n    int localVar = 20;\n    System.out.println(globalVar); // accessible\n    System.out.println(localVar);  // accessible\n}\n// localVar is NOT accessible here"
    },
    {
      id: "mutability",
      title: "Variable Mutability",
      content: "Mutable variables can have their values changed after initialization, while immutable variables cannot. Some languages like Java and C# support both via final or readonly keywords. Immutable variables help prevent accidental modification and improve program reliability.",
      code: "int age = 25;\nage = 30;            // allowed: mutable\nfinal int YEAR = 2024;\n// YEAR = 2025;      // error: immutable\nconst double PI = 3.14159;\n// PI = 3.0;         // error: immutable"
    },
    {
      id: "constants",
      title: "Constants",
      content: "Constants are variables whose values cannot be changed after assignment. They are declared using keywords like const, final, or readonly. Constants improve code readability by giving meaningful names to fixed values and prevent accidental modification.",
      code: 'const int MAX_SIZE = 100;\nfinal String APP_NAME = "MyApp";\nconst double PI = 3.14159;\nconst int DAYS_IN_WEEK = 7;\n// MAX_SIZE = 200;   // compile-time error'
    }
  ],
  "data-types": [
    {
      id: "integers",
      title: "Integer Types",
      content: "Integers represent whole numbers without fractional parts. Common sizes include byte (8-bit), short (16-bit), int (32-bit), and long (64-bit). Choosing the appropriate size prevents overflow and optimizes memory usage in large-scale applications.",
      code: "byte smallNum = 127;\nshort medNum = 32000;\nint largeNum = 2147483647;\nlong hugeNum = 9223372036854775807L;\nunsigned int positiveOnly = 4294967295U;"
    },
    {
      id: "floats",
      title: "Floating-Point Types",
      content: "Floating-point types represent real numbers with decimal precision. Float provides single precision (32-bit) while double provides double precision (64-bit). Be aware that floating-point arithmetic can introduce small rounding errors due to binary representation.",
      code: "float temperature = 98.6f;\ndouble pi = 3.141592653589793;\nfloat percentage = 75.5f;\ndouble preciseValue = 0.1 + 0.2;\n// preciseValue may not equal 0.3 exactly"
    },
    {
      id: "booleans",
      title: "Boolean Type",
      content: "Booleans represent truth values: true or false. They are used in conditional statements and logical operations. Many languages use 1 byte to store a boolean value, though some use a full integer for compatibility.",
      code: "bool isReady = true;\nbool hasData = false;\nbool result = (5 > 3);    // true\nbool check = (10 == 10);   // true\nbool combined = isReady && hasData; // false"
    },
    {
      id: "characters",
      title: "Character Type",
      content: "Characters represent single letters, digits, or symbols stored as numeric codes (typically ASCII or Unicode). The char type occupies 1 byte in most languages. Characters can be manipulated using arithmetic operations on their underlying numeric values.",
      code: "char grade = 'A';\nchar digit = '9';\nchar symbol = '@';\nchar newLine = '\\n';\nint asciiValue = (int) grade;  // 65"
    },
    {
      id: "type-casting",
      title: "Type Casting",
      content: "Type casting converts a value from one data type to another. Implicit casting (coercion) happens automatically for compatible types, while explicit casting requires manual notation. Improper casting can cause data loss or runtime errors.",
      code: "int myInt = 42;\ndouble myDouble = myInt;      // implicit: int to double\ndouble pi = 3.14159;\nint truncated = (int) pi;     // explicit: 3, data lost\nchar letter = 'A';\nint ascii = (int) letter;     // explicit: 65"
    },
    {
      id: "type-inference",
      title: "Type Inference",
      content: "Type inference allows the compiler to automatically determine the data type of a variable based on its assigned value. This reduces verbosity while maintaining type safety. Languages like Java (var), C++ (auto), and Swift use this feature extensively.",
      code: 'var name = "Alice";    // inferred as String\nauto count = 42;        // inferred as int\ndouble pi = 3.14;       // explicit type\nauto result = 5 * 2.0;  // inferred as double\nvar flag = true;        // inferred as bool'
    }
  ],
  "control-flow": [
    {
      id: "if",
      title: "If Statement",
      content: "The if statement executes a block of code only when its condition evaluates to true. It is the most basic conditional construct in programming. The condition must be a boolean expression that the compiler or interpreter can evaluate.",
      code: 'int age = 20;\nif (age >= 18) {\n    System.out.println("Adult");\n}\n// Output: Adult'
    },
    {
      id: "if-else",
      title: "If-Else Statement",
      content: "The if-else statement provides two execution paths based on a condition. If the condition is true, the if block runs; otherwise, the else block runs. This ensures one of the two branches always executes.",
      code: 'int score = 75;\nif (score >= 60) {\n    System.out.println("Passed");\n} else {\n    System.out.println("Failed");\n}\n// Output: Passed'
    },
    {
      id: "nested-if",
      title: "Nested If",
      content: "A nested if is an if statement placed inside another if or else block. It allows for multi-level conditional checks. Excessive nesting can reduce readability, so consider refactoring complex nested conditions.",
      code: 'int age = 25;\nbool hasID = true;\nif (age >= 18) {\n    if (hasID) {\n        System.out.println("Entry allowed");\n    } else {\n        System.out.println("ID required");\n    }\n}'
    },
    {
      id: "if-else-ladder",
      title: "If-Else Ladder",
      content: "An if-else ladder chains multiple conditions in sequence, evaluating them from top to bottom. It is used when there are more than two possible outcomes. The first matching condition executes its block, and the rest are skipped.",
      code: 'int score = 85;\nif (score >= 90) {\n    System.out.println("Grade: A");\n} else if (score >= 80) {\n    System.out.println("Grade: B");\n} else if (score >= 70) {\n    System.out.println("Grade: C");\n} else {\n    System.out.println("Grade: F");\n}\n// Output: Grade: B'
    },
    {
      id: "for-loop",
      title: "For Loop",
      content: "The for loop repeats a block of code a predetermined number of times. It combines initialization, condition check, and update in a single line. It is ideal when the number of iterations is known before entering the loop.",
      code: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n// Output: 0 1 2 3 4\n\nfor (int i = 10; i > 0; i -= 2) {\n    System.out.println(i);\n}\n// Output: 10 8 6 4 2'
    },
    {
      id: "while-loop",
      title: "While Loop",
      content: "The while loop executes a block of code repeatedly as long as its condition remains true. The condition is checked before each iteration, so the loop may execute zero times. It is best suited when the number of iterations is not known in advance.",
      code: "int count = 0;\nwhile (count < 5) {\n    System.out.println(count);\n    count++;\n}\n// Output: 0 1 2 3 4"
    },
    {
      id: "do-while-loop",
      title: "Do-While Loop",
      content: "The do-while loop is similar to the while loop but guarantees at least one execution of the code block. The condition is checked after each iteration. It is useful when you need to execute code before validating the condition.",
      code: "int count = 10;\ndo {\n    System.out.println(count);\n    count++;\n} while (count < 5);\n// Output: 10 (runs once even though condition is false)"
    },
    {
      id: "switch",
      title: "Switch Statement",
      content: "The switch statement selects one of many code blocks to execute based on the value of a variable. It compares the variable against multiple case values and runs the matching block. Each case typically ends with a break to prevent fall-through.",
      code: 'int day = 3;\nswitch (day) {\n    case 1: System.out.println("Monday"); break;\n    case 2: System.out.println("Tuesday"); break;\n    case 3: System.out.println("Wednesday"); break;\n    default: System.out.println("Other day"); break;\n}\n// Output: Wednesday'
    },
    {
      id: "break-continue",
      title: "Break and Continue",
      content: "The break statement exits the innermost loop or switch immediately, skipping remaining iterations. The continue statement skips the rest of the current iteration and proceeds to the next one. Both provide fine-grained control over loop execution flow.",
      code: "for (int i = 0; i < 10; i++) {\n    if (i == 3) continue;  // skip 3\n    if (i == 7) break;     // stop at 7\n    System.out.println(i);\n}\n// Output: 0 1 2 4 5 6"
    }
  ],
  "functions": [
    {
      id: "declaration",
      title: "Function Declaration",
      content: "A function is declared with a return type, name, and optional parameters. It encapsulates reusable logic that can be called from elsewhere in the program. Proper function design follows the single-responsibility principle, keeping each function focused on one task.",
      code: 'int add(int a, int b) {\n    return a + b;\n}\n\nvoid greet() {\n    System.out.println("Hello!");\n}\n\nint result = add(5, 3);  // 8'
    },
    {
      id: "parameters",
      title: "Function Parameters",
      content: "Parameters are variables listed in a function definition that accept values when the function is called. They allow functions to operate on different inputs. Parameters can be of any data type, including other functions in some languages.",
      code: 'void printInfo(String name, int age, bool active) {\n    System.out.println(name + ", age " + age);\n    System.out.println("Active: " + active);\n}\n\nprintInfo("Alice", 30, true);'
    },
    {
      id: "return-values",
      title: "Return Values",
      content: "A function returns a value using the return keyword, which immediately exits the function. The return type must match the declared return type. Void functions do not return a value and can omit the return statement.",
      code: "int square(int num) {\n    return num * num;\n}\n\ndouble divide(double a, double b) {\n    if (b == 0) return 0.0;\n    return a / b;\n}\n\nint result = square(5);  // 25"
    },
    {
      id: "default-params",
      title: "Default Parameters",
      content: "Default parameters provide fallback values when arguments are not supplied during a function call. They improve function flexibility by allowing optional arguments. Parameters with defaults must come after required parameters in most languages.",
      code: "int power(int base, int exponent = 2) {\n    int result = 1;\n    for (int i = 0; i < exponent; i++) {\n        result *= base;\n    }\n    return result;\n}\n\npower(3);      // 9  (uses default exponent=2)\npower(3, 3);   // 27"
    },
    {
      id: "recursion",
      title: "Recursion",
      content: "Recursion occurs when a function calls itself to solve a smaller instance of the same problem. Every recursive function needs a base case to prevent infinite recursion. Recursion is elegant for problems like tree traversal and mathematical sequences.",
      code: "int factorial(int n) {\n    if (n <= 1) return 1;       // base case\n    return n * factorial(n - 1); // recursive call\n}\n\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}"
    },
    {
      id: "scope",
      title: "Function Scope",
      content: "Function scope defines the visibility and lifetime of variables within a function. Local variables exist only during function execution and are destroyed upon return. Variables from outer scopes may be accessible via closures in some languages.",
      code: "int globalVar = 100;\n\nvoid myFunction() {\n    int localVar = 50;\n    System.out.println(globalVar);  // accessible\n    System.out.println(localVar);   // accessible\n}\n\nmyFunction();\n// System.out.println(localVar);  // error: not in scope"
    }
  ],
  "arrays": [
    {
      id: "declaration",
      title: "Array Declaration",
      content: "Arrays are declared with a fixed size and a specific data type. All elements are stored in contiguous memory locations. The size is determined at creation and typically cannot be changed in statically-typed languages.",
      code: 'int[] numbers = new int[5];\nString[] names = {"Alice", "Bob", "Charlie"};\nint[] scores = new int[]{90, 85, 92, 88, 95};\nbool[] flags = new bool[3];\nchar[] letters = {\'A\', \'B\', \'C\'};'
    },
    {
      id: "indexing",
      title: "Array Indexing",
      content: "Array indexing accesses elements by their position, starting from 0 in most languages. Accessing an index outside the valid range causes an out-of-bounds error. Negative indices are supported in some languages like Python.",
      code: "int[] arr = {10, 20, 30, 40, 50};\nint first = arr[0];   // 10\nint third = arr[2];   // 30\nint last = arr[4];    // 50\narr[1] = 99;          // modify: arr is {10, 99, 30, 40, 50}"
    },
    {
      id: "iteration",
      title: "Array Iteration",
      content: "Arrays are traversed using loops to access or modify each element. Common approaches include for loops with index access, for-each loops, and while loops. Choosing the right iteration method depends on whether you need the index or just the value.",
      code: "int[] arr = {10, 20, 30, 40, 50};\n\n// for loop with index\nfor (int i = 0; i < arr.length; i++) {\n    System.out.println(arr[i]);\n}\n\n// for-each loop\nfor (int val : arr) {\n    System.out.println(val);\n}"
    },
    {
      id: "multi-dimensional",
      title: "Multi-Dimensional Arrays",
      content: "Multi-dimensional arrays are arrays of arrays, commonly used to represent grids, matrices, or tables. A 2D array has rows and columns, while higher dimensions add more axes. They are accessed using multiple index brackets.",
      code: "int[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\nint val = matrix[1][2];  // 6 (row 1, col 2)\nmatrix[0][0] = 10;       // modify first element"
    },
    {
      id: "built-in-methods",
      title: "Built-in Array Methods",
      content: "Most languages provide built-in methods for common array operations such as finding length, sorting, reversing, and searching. These methods reduce boilerplate code and are typically optimized for performance. Method availability varies by language.",
      code: "int[] arr = {5, 2, 8, 1, 9};\nint len = arr.length;         // 5\nArrays.sort(arr);             // {1, 2, 5, 8, 9}\nArrays.reverse(arr);          // {9, 8, 5, 2, 1}\nint idx = Arrays.indexOf(arr, 5); // 2"
    },
    {
      id: "slicing",
      title: "Array Slicing",
      content: "Array slicing creates a new array from a subset of an existing array using a range of indices. It is useful for extracting portions of data without modifying the original. The start index is inclusive and the end index is typically exclusive.",
      code: "int[] arr = {10, 20, 30, 40, 50};\nint[] slice = Arrays.copyOfRange(arr, 1, 4); // {20, 30, 40}\nint[] first3 = Arrays.copyOfRange(arr, 0, 3); // {10, 20, 30}\nint[] last2 = Arrays.copyOfRange(arr, 3, 5);  // {40, 50}"
    }
  ],
  "strings": [
    {
      id: "creation",
      title: "String Creation",
      content: "Strings are sequences of characters enclosed in quotes. Double quotes are used for regular strings, while single quotes denote characters in some languages. Strings can be created from literals, other strings, or character arrays.",
      code: 'String greeting = "Hello, World!";\nString empty = "";\nString fromChars = new String(new char[]{\'H\', \'i\'});\nString name = "Alice";\nchar[] chars = {\'J\', \'a\', \'v\', \'a\'};\nString fromArr = new String(chars);'
    },
    {
      id: "concatenation",
      title: "String Concatenation",
      content: "String concatenation joins two or more strings into one using the + operator or built-in methods. Be aware that repeated concatenation in loops can be inefficient due to immutable string creation. Use StringBuilder for performance-critical scenarios.",
      code: 'String first = "Hello";\nString second = " World";\nString result = first + second;  // "Hello World"\n\nStringBuilder sb = new StringBuilder();\nsb.append("Hello").append(" ").append("There");\nString built = sb.toString();'
    },
    {
      id: "interpolation",
      title: "String Interpolation",
      content: "String interpolation embeds variable values directly into a string using special syntax. This is cleaner than concatenation and improves readability. Different languages use different syntax: template literals, format methods, or f-strings.",
      code: 'String name = "Alice";\nint age = 30;\n\n// Template literals (JS)\nString msg1 = `Hello, ${name}! Age: ${age}`;\n\n// String.format (Java)\nString msg2 = String.format("Hello, %s! Age: %d", name, age);\n\n// f-strings (Python)\nString msg3 = f"Hello, {name}! Age: {age}";'
    },
    {
      id: "slicing",
      title: "String Slicing",
      content: "String slicing extracts a portion of a string using start and end indices. The substring is a new string that does not modify the original. Out-of-range indices may cause errors depending on the language.",
      code: 'String str = "Hello, World!";\nString sub1 = str.substring(0, 5);   // "Hello"\nString sub2 = str.substring(7, 12);  // "World"\nString last = str.substring(7);       // "World!"\nString first3 = str.substring(0, 3);  // "Hel"'
    },
    {
      id: "common-methods",
      title: "Common String Methods",
      content: "Strings offer methods for searching, transforming, splitting, and trimming. Common methods include length, indexOf, toUpperCase, replace, and split. These methods are essential for text processing and data validation.",
      code: 'String str = "  Hello, World!  ";\nint len = str.length();              // 16\nString upper = str.toUpperCase();    // "  HELLO, WORLD!  "\nString trimmed = str.trim();         // "Hello, World!"\nint idx = str.indexOf("World");      // 9'
    },
    {
      id: "immutability",
      title: "String Immutability",
      content: "Strings are immutable in most languages, meaning once created, their content cannot be changed. Any operation that appears to modify a string actually creates a new one. This design ensures thread safety and allows strings to be used as map keys.",
      code: 'String original = "Hello";\nString modified = original.concat(" World");\nSystem.out.println(original);  // "Hello" (unchanged)\nSystem.out.println(modified);  // "Hello World"\n\nStringBuilder sb = new StringBuilder("Hello");\nsb.append(" World");  // modifies in place'
    }
  ],
  "error-handling": [
    {
      id: "try-catch",
      title: "Try-Catch",
      content: "Try-catch blocks handle runtime exceptions gracefully by wrapping potentially dangerous code. The try block contains code that might throw, and the catch block handles the specific exception. Multiple catch blocks can handle different exception types.",
      code: 'try {\n    int result = 10 / 0;\n    System.out.println(result);\n} catch (ArithmeticException e) {\n    System.out.println("Error: " + e.getMessage());\n}\n// Output: Error: / by zero'
    },
    {
      id: "throwing-errors",
      title: "Throwing Errors",
      content: "The throw keyword explicitly raises an exception with a descriptive error message. It is used when invalid states are detected during execution. Thrown exceptions must be caught or declared in the function signature using the throws keyword.",
      code: "int divide(int a, int b) {\n    if (b == 0) {\n        throw new ArithmeticException(\"Division by zero\");\n    }\n    return a / b;\n}\n\nint result = divide(10, 0);  // throws exception"
    },
    {
      id: "custom-errors",
      title: "Custom Errors",
      content: "Custom error classes extend built-in exception types to represent domain-specific errors. They carry additional context like error codes, detailed messages, or metadata. Custom errors make it easier to handle business logic failures distinctly from system errors.",
      code: 'class InsufficientFundsException extends Exception {\n    double balance;\n    double amount;\n\n    InsufficientFundsException(double bal, double amt) {\n        super("Cannot withdraw " + amt + " from balance " + bal);\n        this.balance = bal;\n        this.amount = amt;\n    }\n}'
    },
    {
      id: "finally",
      title: "Finally Block",
      content: "The finally block executes after try and catch blocks, regardless of whether an exception occurred. It is commonly used for cleanup operations like closing files, releasing locks, or freeing resources. Finally always runs even if return is called in catch.",
      code: "FileReader reader = null;\ntry {\n    reader = new FileReader(\"data.txt\");\n    // read file\n} catch (FileNotFoundException e) {\n    System.out.println(\"File not found\");\n} finally {\n    if (reader != null) reader.close();\n    System.out.println(\"Cleanup complete\");\n}"
    },
    {
      id: "error-propagation",
      title: "Error Propagation",
      content: "Error propagation passes exceptions up the call stack to be handled by a caller. Functions that may throw declare it in their signature, pushing responsibility upward. This allows centralized error handling at appropriate levels of the application.",
      code: "void processFile(String path) throws IOException {\n    BufferedReader br = new BufferedReader(new FileReader(path));\n    // process lines\n    br.close();\n}\n\nvoid run() {\n    try {\n        processFile(\"data.txt\");\n    } catch (IOException e) {\n        System.out.println(\"Failed: \" + e.getMessage());\n    }\n}"
    }
  ],
  "modules": [
    {
      id: "creating-modules",
      title: "Creating Modules",
      content: "Modules are self-contained units of code that encapsulate related functionality. They promote code reuse, separation of concerns, and easier maintenance. Each module typically focuses on a single responsibility and exposes a clean public interface.",
      code: '// MathModule.java\npublic class MathModule {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n}'
    },
    {
      id: "importing",
      title: "Importing Modules",
      content: "Importing brings external module functionality into the current file. Different syntaxes exist: import statements, require calls, or use declarations. Selective imports improve performance by loading only what is needed from large modules.",
      code: '// Import entire module\nimport java.util.ArrayList;\n\n// Import specific members\nimport java.util.Map;\nimport java.util.HashMap;\n\n// Static imports\nimport static java.lang.Math.PI;\nimport static java.lang.Math.sqrt;'
    },
    {
      id: "exporting",
      title: "Exporting from Modules",
      content: "Exporting makes functions, classes, or variables available for use by other modules. Public APIs are intentionally designed to expose only necessary functionality. Private implementation details remain hidden within the module boundary.",
      code: '// StringUtils.java\npublic class StringUtils {\n    public static String capitalize(String str) {\n        if (str.isEmpty()) return str;\n        return str.substring(0, 1).toUpperCase() + str.substring(1);\n    }\n    private static void internalHelper() { }\n}'
    },
    {
      id: "namespaces",
      title: "Namespaces",
      content: "Namespaces prevent naming conflicts by organizing code into logical groupings. They allow multiple libraries to define identically-named entities without collision. Most modern languages support namespaces via packages, modules, or dedicated syntax.",
      code: "namespace GameEngine {\n    namespace Physics {\n        class Rigidbody {\n            double mass;\n            void applyForce(double force) { }\n        }\n    }\n    namespace Rendering {\n        class Sprite { }\n    }\n}\n\nGameEngine::Physics::Rigidbody rb;"
    },
    {
      id: "package-managers",
      title: "Package Managers",
      content: "Package managers automate the installation, updating, and removal of external libraries. They resolve dependencies and ensure compatible versions across a project. Examples include npm for JavaScript, pip for Python, and Maven for Java.",
      code: "# npm (JavaScript)\nnpm install lodash\nnpm install --save-dev jest\n\n# pip (Python)\npip install requests\npip install -r requirements.txt\n\n# gradle (Java)\nimplementation 'com.google.guava:guava:31.1-jre'"
    }
  ],
  "file-io": [
    {
      id: "reading-files",
      title: "Reading Files",
      content: "Reading files opens a file and extracts its contents into memory. Common methods include reading the entire file, line by line, or in chunks. Always handle exceptions for missing files and close the file after reading to free resources.",
      code: "BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) {\n    System.out.println(line);\n}\nbr.close();"
    },
    {
      id: "writing-files",
      title: "Writing Files",
      content: "Writing files creates or overwrites a file with new content. Use append mode to add data to the end of an existing file. Always use buffered writers for performance and handle IO exceptions that may occur during the write operation.",
      code: "FileWriter fw = new FileWriter(\"output.txt\");\nBufferedWriter bw = new BufferedWriter(fw);\nbw.write(\"Line 1\");\nbw.newLine();\nbw.write(\"Line 2\");\nbw.flush();\nbw.close();"
    },
    {
      id: "streaming",
      title: "File Streaming",
      content: "Streaming processes large files piece by piece without loading the entire content into memory. This is essential for handling files larger than available RAM. Streams can be chained with filters and transformers for efficient data pipelines.",
      code: "FileInputStream fis = new FileInputStream(\"large.bin\");\nBufferedInputStream bis = new BufferedInputStream(fis);\nbyte[] buffer = new byte[1024];\nint bytesRead;\nwhile ((bytesRead = bis.read(buffer)) != -1) {\n    // process buffer[0..bytesRead]\n}\nbis.close();"
    },
    {
      id: "file-exists",
      title: "File Existence Check",
      content: "Before reading or writing, it is good practice to check whether a file exists. This prevents unnecessary exceptions and allows graceful fallback behavior. Many languages provide simple boolean functions for this check.",
      code: 'File file = new File("data.txt");\nif (file.exists()) {\n    System.out.println("File found");\n    System.out.println("Size: " + file.length());\n    System.out.println("Readable: " + file.canRead());\n} else {\n    System.out.println("File not found");\n}'
    },
    {
      id: "paths",
      title: "File Paths",
      content: "File paths specify the location of a file in the filesystem. Absolute paths start from the root, while relative paths start from the current directory. Cross-platform code should use path builders instead of hardcoded separators.",
      code: "Path path = Paths.get(\"data\", \"users\", \"config.txt\");\nString absolute = path.toAbsolutePath().toString();\nString name = path.getFileName().toString();\nint count = path.getNameCount();\nPath parent = path.getParent();"
    }
  ],
  "testing": [
    {
      id: "unit-tests",
      title: "Unit Tests",
      content: "Unit tests verify that individual functions or methods work correctly in isolation. They test the smallest testable parts of an application independently. Good unit tests are fast, deterministic, and cover edge cases as well as happy paths.",
      code: "@Test\npublic void testAddition() {\n    Calculator calc = new Calculator();\n    assertEquals(5, calc.add(2, 3));\n    assertEquals(0, calc.add(0, 0));\n    assertEquals(-1, calc.add(-3, 2));\n}"
    },
    {
      id: "assertions",
      title: "Assertions",
      content: "Assertions validate that the actual output matches the expected result. They form the backbone of all test frameworks and report failures when expectations are not met. Common assertions include equality, null checks, and boolean conditions.",
      code: "assertEquals(expected, actual);     // values are equal\nassertNotEquals(a, b);               // values differ\nassertTrue(condition);               // condition is true\nassertFalse(condition);              // condition is false\nassertNull(obj);                     // object is null\nassertNotNull(obj);                  // object is not null"
    },
    {
      id: "test-cases",
      title: "Test Cases",
      content: "A test case defines the inputs, execution conditions, and expected results for a single test scenario. Well-structured test cases follow the Arrange-Act-Assert pattern. Each test should verify one specific behavior to keep failures focused and diagnosable.",
      code: "public void testLogin() {\n    // Arrange\n    AuthService auth = new AuthService();\n    String validUser = \"admin\";\n    String validPass = \"secret123\";\n\n    // Act\n    boolean result = auth.login(validUser, validPass);\n\n    // Assert\n    assertTrue(result);\n}"
    },
    {
      id: "mocking",
      title: "Mocking",
      content: "Mocking replaces real dependencies with controlled fakes that simulate behavior. This isolates the code under test from external systems like databases or APIs. Mocks allow you to verify interactions, simulate errors, and control return values precisely.",
      code: "@Test\npublic void testSendEmail() {\n    // Arrange\n    MockEmailService mockService = new MockEmailService();\n    when(mockService.send(anyString())).thenReturn(true);\n    NotificationEngine engine = new NotificationEngine(mockService);\n\n    // Act\n    boolean sent = engine.notifyUser(\"test@example.com\");\n\n    // Assert\n    assertTrue(sent);\n    verify(mockService, times(1)).send(\"test@example.com\");\n}"
    },
    {
      id: "test-runners",
      title: "Test Runners",
      content: "Test runners discover, organize, and execute test suites automatically. They provide reporting, filtering, and parallel execution capabilities. Popular runners include JUnit, pytest, and Jest, each offering tools for configuration and output formatting.",
      code: "# pytest (Python)\npytest              # run all tests\npytest -v           # verbose output\n\n# JUnit (Java) command line\njava -cp lib/* org.junit.runner.JUnitCore com.example.CalculatorTest\n\n# Jest (JavaScript)\nnpm test -- --coverage"
    }
  ],
  "data-structures": [
    {
      id: "linked-list",
      title: "Linked Lists",
      content: "A linked list stores elements in nodes where each node contains data and a pointer to the next node. Unlike arrays, linked lists allow O(1) insertion and deletion at any position by re-pointing references. However, accessing an element by index requires traversing the list from the head, making lookup O(n).",
      code: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef insert_at_head(head, data):\n    new_node = Node(data)\n    new_node.next = head\n    return new_node"
    },
    {
      id: "stack",
      title: "Stacks",
      content: "A stack is a LIFO (Last In, First Out) data structure where elements are added and removed from the same end called the top. The two primary operations are push (add to top) and pop (remove from top). Stacks are used for function call management, undo operations, and expression parsing.",
      code: "stack = []\nstack.append(10)    # push\nstack.append(20)\nstack.append(30)\ntop = stack.pop()   # 30 (LIFO)\npeek = stack[-1]    # 20\nprint(len(stack))   # 2"
    },
    {
      id: "queue",
      title: "Queues",
      content: "A queue is a FIFO (First In, First Out) data structure where elements are added at the rear and removed from the front. The two primary operations are enqueue (add to rear) and dequeue (remove from front). Queues are used for task scheduling, breadth-first search, and print job management.",
      code: "from collections import deque\nqueue = deque()\nqueue.append(10)    # enqueue\nqueue.append(20)\nqueue.append(30)\nfront = queue.popleft()  # 10 (FIFO)\nprint(queue)        # deque([20, 30])"
    },
    {
      id: "binary-tree",
      title: "Binary Trees",
      content: "A binary tree is a hierarchical data structure where each node has at most two children, called left and right. A binary search tree (BST) maintains the order property: left < parent < right, enabling O(log n) search, insert, and delete on balanced trees. Traversals include in-order, pre-order, and post-order.",
      code: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\ndef inorder(node):\n    if node:\n        inorder(node.left)\n        print(node.val)\n        inorder(node.right)"
    },
    {
      id: "hash-table",
      title: "Hash Tables",
      content: "A hash table maps keys to values using a hash function to compute an index into an array of buckets. Average-case lookup, insertion, and deletion are O(1). Collisions are handled via chaining (linked lists) or open addressing. Hash tables power dictionaries, sets, and caches in most languages.",
      code: "hash_map = {}\nhash_map[\"name\"] = \"Alice\"    # insert O(1)\nhash_map[\"age\"] = 30\nval = hash_map[\"name\"]        # lookup O(1)\ndel hash_map[\"age\"]           # delete O(1)\nif \"name\" in hash_map:        # check existence\n    print(hash_map[\"name\"])"
    },
    {
      id: "heap",
      title: "Heaps",
      content: "A heap is a complete binary tree that satisfies the heap property: in a max-heap every parent is >= its children, in a min-heap every parent is <= its children. Heaps are used to implement priority queues and for heap sort. Insertion and extraction of the root are O(log n).",
      code: "import heapq\n\nnums = [5, 3, 8, 1, 2]\nheapq.heapify(nums)          # min-heap in-place\nheapq.heappush(nums, 0)      # insert O(log n)\nsmallest = heapq.heappop(nums)  # extract min O(log n)\n\n# max-heap via negation\nmax_heap = []\nheapq.heappush(max_heap, -value)"
    },
    {
      id: "graph",
      title: "Graphs",
      content: "A graph consists of vertices (nodes) connected by edges. Graphs can be directed or undirected, weighted or unweighted. They model networks, relationships, and dependencies. Common representations are adjacency lists (space-efficient) and adjacency matrices (fast edge lookup). Traversal uses BFS or DFS.",
      code: "# Adjacency list representation\ngraph = {\n    \"A\": [\"B\", \"C\"],\n    \"B\": [\"A\", \"D\"],\n    \"C\": [\"A\"],\n    \"D\": [\"B\"]\n}\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = [start]\n    while queue:\n        node = queue.pop(0)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)"
    },
    {
      id: "doubly-linked-list",
      title: "Doubly Linked List",
      content: "A doubly linked list has nodes with both next and prev pointers. Allows traversal in both directions. Insert/delete at any position is O(1) if you have the node reference. Uses more memory per node than singly linked.",
      code: "// C doubly linked list\ntypedef struct Node {\n    int data;\n    struct Node *next;\n    struct Node *prev;\n} Node;\n\n// Insert after a known node\nvoid insert_after(Node *prev, int data) {\n    Node *n = malloc(sizeof(Node));\n    n->data = data;\n    n->next = prev->next;\n    n->prev = prev;\n    if (prev->next) prev->next->prev = n;\n    prev->next = n;\n}"
    },
    {
      id: "circular-linked-list",
      title: "Circular Linked List",
      content: "A circular linked list has the last node pointing back to the first node instead of null. Useful for round-robin scheduling, music playlists, and Josephus problem. Can be singly or doubly circular.",
      code: "// Circular: last->next = head\n// Check end: curr->next == head\n// Traverse:\nNode *curr = head;\ndo {\n    printf(\"%d \", curr->data);\n    curr = curr->next;\n} while (curr != head);\n\n// Insert at end in circular list\nvoid insert_end(Node **head, int data) {\n    Node *n = malloc(sizeof(Node));\n    n->data = data;\n    if (!*head) { n->next = n; *head = n; return; }\n    Node *last = (*head)->prev;\n    n->next = *head;\n    n->prev = last;\n    last->next = n;\n    (*head)->prev = n;\n}"
    }
  ],
  "recursion": [
    {
      id: "base-case",
      title: "Base Case",
      content: "The base case is the condition that stops recursion by returning a value without making another recursive call. Without a base case, the function calls itself infinitely, causing a stack overflow. Every recursive function must have at least one base case that is guaranteed to be reached.",
      code: "def countdown(n):\n    if n <= 0:        # base case\n        print(\"Done!\")\n        return\n    print(n)\n    countdown(n - 1)   # recursive case\n\ncountdown(5)  # 5, 4, 3, 2, 1, Done!"
    },
    {
      id: "recursive-case",
      title: "Recursive Case",
      content: "The recursive case breaks the problem into smaller subproblems and calls itself with modified arguments that move toward the base case. Each recursive call must make progress toward termination. The recursive case combines results from subproblems to solve the original problem.",
      code: "def sum_list(lst):\n    if len(lst) == 0:   # base case\n        return 0\n    return lst[0] + sum_list(lst[1:])  # recursive case\n\nprint(sum_list([1, 2, 3, 4, 5]))  # 15\n# 1 + (2 + (3 + (4 + (5 + 0))))"
    },
    {
      id: "tail-recursion",
      title: "Tail Recursion",
      content: "Tail recursion occurs when the recursive call is the last operation in the function, with no additional computation after it returns. Some compilers optimize tail recursion into loops, preventing stack growth. Tail-recursive functions are easier to convert to iterative equivalents.",
      code: "def factorial_tail(n, accumulator=1):\n    if n <= 1:          # base case\n        return accumulator\n    return factorial_tail(n - 1, n * accumulator)\n    # recursive call is the LAST operation\n\nprint(factorial_tail(5))  # 120\n# factorial_tail(5, 1) -> factorial_tail(4, 5) -> ... -> 120"
    },
    {
      id: "memoization",
      title: "Memoization",
      content: "Memoization caches results of expensive recursive calls to avoid redundant computation. It transforms exponential-time recursion into polynomial-time by storing previously computed values. This technique is the foundation of dynamic programming and dramatically speeds up problems like Fibonacci and shortest path.",
      code: "def fib_memo(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)\n    return memo[n]\n\nprint(fib_memo(50))  # fast, no repeated work"
    },
    {
      id: "tree-recursion",
      title: "Tree Recursion",
      content: "Tree recursion happens when a function makes multiple recursive calls, creating a tree of calls. This naturally models problems like Fibonacci, tree traversal, and divide-and-conquer algorithms. Without memoization, tree recursion can be exponentially slow due to overlapping subproblems.",
      code: "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)  # TWO calls\n\n# Call tree for fib(4):\n#            fib(4)\n#           /      \\\n#        fib(3)    fib(2)\n#       /    \\       /   \\\n#   fib(2) fib(1) fib(1) fib(0)"
    }
  ],
  "sorting": [
    {
      id: "bubble-sort",
      title: "Bubble Sort",
      content: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Each pass bubbles the largest unsorted element to its correct position. It has O(n²) time complexity and is mainly used for educational purposes.",
      code: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr"
    },
    {
      id: "merge-sort",
      title: "Merge Sort",
      content: "Merge sort divides the array in half recursively, sorts each half, then merges the sorted halves. It guarantees O(n log n) time complexity and is stable (preserves order of equal elements). The trade-off is O(n) extra space for the merge step.",
      code: "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i]); i += 1\n        else:\n            result.append(right[j]); j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result"
    },
    {
      id: "quick-sort",
      title: "Quick Sort",
      content: "Quick sort picks a pivot element, partitions the array into elements less than and greater than the pivot, then recursively sorts the partitions. It has O(n log n) average time but O(n²) worst case with poor pivot choices. It sorts in-place with O(log n) stack space.",
      code: "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)"
    },
    {
      id: "insertion-sort",
      title: "Insertion Sort",
      content: "Insertion sort builds the sorted array one element at a time by inserting each element into its correct position among the previously sorted elements. It has O(n²) worst case but O(n) best case for nearly sorted data. It is efficient for small datasets and is used as a subroutine in TimSort.",
      code: "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j+1] = arr[j]\n            j -= 1\n        arr[j+1] = key\n    return arr"
    },
    {
      id: "selection-sort",
      title: "Selection Sort",
      content: "Selection sort divides the array into sorted and unsorted regions, repeatedly finding the minimum element from the unsorted region and placing it at the beginning. It always performs O(n²) comparisons regardless of input, making it inefficient for large lists but simple to implement.",
      code: "def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr"
    }
  ],
  "searching": [
    {
      id: "linear-search",
      title: "Linear Search",
      content: "Linear search checks each element in a collection sequentially until the target is found or the end is reached. It works on both sorted and unsorted data with O(n) time complexity. It is the simplest search method and is optimal for small or unsorted datasets.",
      code: "def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i  # found at index i\n    return -1  # not found\n\nresult = linear_search([5, 3, 8, 1, 9], 8)\nprint(result)  # 2"
    },
    {
      id: "binary-search",
      title: "Binary Search",
      content: "Binary search repeatedly divides the search interval in half by comparing the target with the middle element. It requires a sorted array and runs in O(log n) time. It is exponentially faster than linear search for large datasets.",
      code: "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1"
    },
    {
      id: "hash-search",
      title: "Hash-Based Search",
      content: "Hash-based search uses a hash function to compute an index directly, providing O(1) average-case lookup. Hash tables store key-value pairs where the key is hashed to find the bucket. Collision handling via chaining or open addressing ensures correctness when different keys hash to the same index.",
      code: "hash_map = {}\n# Insert key-value pairs (hash computed automatically)\nhash_map[\"apple\"] = 1\nhash_map[\"banana\"] = 2\nhash_map[\"cherry\"] = 3\n\n# O(1) average lookup\nval = hash_map[\"banana\"]  # 2\n\n# Check if key exists\nif \"apple\" in hash_map:\n    print(hash_map[\"apple\"])"
    },
    {
      id: "dfs-bfs",
      title: "DFS & BFS Traversal",
      content: "DFS (Depth-First Search) explores as far as possible along each branch before backtracking, using a stack or recursion. BFS (Breadth-First Search) explores all neighbors at the current depth before moving deeper, using a queue. DFS uses less memory; BFS finds shortest paths in unweighted graphs.",
      code: "def dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    print(node)\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = [start]\n    while queue:\n        node = queue.pop(0)\n        print(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)"
    }
  ],
  "oop-concepts": [
    {
      id: "encapsulation",
      title: "Encapsulation",
      content: "Encapsulation bundles data and methods that operate on that data within a single unit (class), restricting direct access to some components. Private fields are accessed through public getters and setters, allowing validation and controlled modification. This protects internal state from unintended interference.",
      code: "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance  # private\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount(1000)\nacc.deposit(500)\nprint(acc.get_balance())  # 1500"
    },
    {
      id: "inheritance",
      title: "Inheritance",
      content: "Inheritance allows a child class to reuse fields and methods from a parent class, establishing an is-a relationship. The child class can override parent methods to customize behavior. Inheritance promotes code reuse but can create tight coupling, so composition is often preferred.",
      code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n\nrex = Dog(\"Rex\")\nprint(rex.name)    # Rex (inherited)\nprint(rex.speak())  # Woof! (overridden)"
    },
    {
      id: "polymorphism",
      title: "Polymorphism",
      content: "Polymorphism allows objects of different types to be treated through the same interface. A parent class reference can point to a child class object, and the correct method is called at runtime. This enables writing generic code that works with any type implementing the interface.",
      code: "class Shape:\n    def area(self): pass\n\nclass Circle(Shape):\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r ** 2\n\nclass Rect(Shape):\n    def __init__(self, w, h): self.w, self.h = w, h\n    def area(self): return self.w * self.h\n\nshapes = [Circle(5), Rect(4, 6)]\nfor s in shapes:\n    print(s.area())  # each calls its own area()"
    },
    {
      id: "abstraction",
      title: "Abstraction",
      content: "Abstraction hides complex implementation details and exposes only the essential features through abstract classes or interfaces. An abstract class cannot be instantiated and may contain unimplemented methods that subclasses must define. This enforces a contract while hiding the how.",
      code: "from abc import ABC, abstractmethod\n\nclass Vehicle(ABC):\n    @abstractmethod\n    def start(self): pass\n\n    @abstractmethod\n    def stop(self): pass\n\nclass Car(Vehicle):\n    def start(self):\n        print(\"Car started\")\n    def stop(self):\n        print(\"Car stopped\")\n\n# v = Vehicle()  # ERROR: can't instantiate abstract"
    }
  ],
  "time-complexity": [
    {
      id: "big-o-notation",
      title: "Big-O Notation",
      content: "Big-O notation describes the upper bound of an algorithm's growth rate as input size increases. It focuses on the dominant term and ignores constants. O(1) is constant, O(log n) is logarithmic, O(n) is linear, O(n log n) is linearithmic, O(n²) is quadratic, and O(2ⁿ) is exponential.",
      code: "// O(1) - constant\nx = arr[5];\n\n// O(n) - linear\nfor (i = 0; i < n; i++) { sum += arr[i]; }\n\n// O(n²) - quadratic\nfor (i = 0; i < n; i++)\n  for (j = 0; j < n; j++)\n    matrix[i][j] = 0;\n\n// O(log n) - logarithmic\nwhile (n > 1) { n = n / 2; }"
    },
    {
      id: "common-complexities",
      title: "Common Complexities",
      content: "Understanding common complexity classes helps choose the right algorithm. For n = 1,000,000: O(1) is instant, O(log n) is ~20 steps, O(n) is 1 million steps, O(n log n) is ~20 million, O(n²) is a trillion (too slow). Always analyze best, average, and worst case for accurate assessment.",
      code: "O(1)       -> constant:    hash lookup\nO(log n)   -> logarithmic: binary search\nO(n)       -> linear:      find max in array\nO(n log n) -> linearithmic: merge sort\nO(n²)      -> quadratic:   nested loop compare\nO(2^n)     -> exponential: brute force subsets\nO(n!)      -> factorial:   generate all permutations"
    },
    {
      id: "space-complexity",
      title: "Space Complexity",
      content: "Space complexity measures the extra memory an algorithm uses relative to input size. An algorithm with O(1) space uses constant extra memory regardless of input. In-place algorithms modify data without significant extra allocation. Recursive algorithms consume stack space proportional to depth.",
      code: "// O(1) space - in place\nvoid reverse(int[] arr) {\n    int left = 0, right = arr.length - 1;\n    while (left < right) {\n        int temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        left++; right--;\n    }\n}\n\n// O(n) space - uses extra array\nint[] copy = new int[arr.length];\nfor (int i = 0; i < arr.length; i++)\n    copy[i] = arr[i];"
    },
    {
      id: "amortized",
      title: "Amortized Analysis",
      content: "Amortized analysis averages the cost of operations over a sequence, finding the average cost per operation. A single operation may be expensive, but if it happens rarely enough the average cost stays low. Dynamic array resizing and hash table rehashing are classic amortized O(1) operations.",
      code: "// Dynamic array amortized O(1) append\nlist = []\nfor i in range(16):\n    list.append(i)  # most: O(1)\n    # occasionally O(n) when resizing\n    # but amortized still O(1)\n\n// Hash table amortized O(1)\nmap = {}\nfor i in range(1000):\n    map[i] = i * 2  # occasional rehash O(n)\n    # but amortized O(1) per insert"
    }
  ]
};
