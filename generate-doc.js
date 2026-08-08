const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, BorderStyle, HeadingLevel, ShadingType, TableLayoutType } = require("docx");
const fs = require("fs");

function headerCell(text) {
  return new TableCell({
    shading: { type: ShadingType.SOLID, color: "1B2A4A" },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", font: "Consolas", size: 20 })] })],
    width: { size: 33, type: WidthType.PERCENTAGE },
    verticalAlign: "center",
  });
}

function dataCell(text, bold) {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: !!bold, font: "Consolas", size: 18, color: bold ? "1B2A4A" : "333333" })] })],
    width: { size: 33, type: WidthType.PERCENTAGE },
    verticalAlign: "center",
  });
}

function makeTable(rows) {
  return new Table({
    rows: [
      new TableRow({ children: [headerCell("Type Karo"), headerCell("Example"), headerCell("Result")], tableHeader: true }),
      ...rows.map(r => new TableRow({ children: [dataCell(r[0], true), dataCell(r[1]), dataCell(r[2])] })),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
  });
}

function sectionTitle(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } });
}

function subtitle(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 80 } });
}

function blank() {
  return new Paragraph({ spacing: { after: 50 } });
}

const children = [];

// Title
children.push(new Paragraph({ text: "CODEMAP — Interactive Input Guide", heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }));
children.push(new Paragraph({ text: "Every concept — what to type, example, and result", alignment: AlignmentType.CENTER, spacing: { after: 200 } }));

// ═══════════════════════════════════════
// C PROGRAMMING
// ═══════════════════════════════════════
children.push(sectionTitle("Subject 1: Computer Programming Fundamentals (C) — Semester 1"));

children.push(subtitle("1. flowchart-algorithm"));
children.push(makeTable([
  ["factorial 5", "factorial 5", "5! = 120"],
  ["max2 10 25", "max2 10 25", "max(10,25) = 25"],
  ["max3 10 20 30", "max3 10 20 30", "max = 30"],
  ["min2 10 25", "min2 10 25", "min(10,25) = 10"],
  ["min3 10 20 30", "min3 10 20 30", "min = 10"],
  ["sum 10", "sum 10", "sum(1..10) = 55"],
  ["gcd 12 8", "gcd 12 8", "gcd = 4"],
  ["power 2 5", "power 2 5", "2^5 = 32"],
  ["evenodd 7", "evenodd 7", "7 is Odd"],
  ["fibonacci 8", "fibonacci 8", "0,1,1,2,3,5,8,13"],
  ["reverse 1234", "reverse 1234", "reverse = 4321"],
  ["palindrome 121", "palindrome 121", "121 is Palindrome"],
  ["swap 10 25", "swap 10 25", "a=25, b=10"],
  ["average 10 20 30 40", "average 10 20 30", "avg = 25.0"],
]));
children.push(blank());

children.push(subtitle("2. operators-expressions"));
children.push(makeTable([
  ["10, 3", "10, 3", "10+3=13, 10-3=7, 10*3=30, 10/3=3.33, 10%3=1"],
]));
children.push(blank());

children.push(subtitle("3. if-statement"));
children.push(makeTable([
  ["15", "15", "x=15 -> x>5 -> TRUE -> 'Big!' executed"],
  ["3", "3", "x=3 -> x>5 -> FALSE -> body skipped"],
]));
children.push(blank());

children.push(subtitle("4. if-else-statement"));
children.push(makeTable([
  ["7", "7", "x=7 -> x>5 -> TRUE -> 'Big!' runs"],
  ["2", "2", "x=2 -> x>5 -> FALSE -> 'Small!' runs"],
]));
children.push(blank());

children.push(subtitle("5. nested-if-statement"));
children.push(makeTable([
  ["10, 25, 18", "10, 25, 18", "a=10>5 yes, b=25>3 yes -> Both true"],
  ["3, 10, 5", "3, 10, 5", "a=3<=5 -> a<=5 path"],
  ["10, 2, 5", "10, 2, 5", "a=10>5 yes, b=2<=3 no -> a yes, b no"],
]));
children.push(blank());

children.push(subtitle("6. else-if-ladder"));
children.push(makeTable([
  ["82", "82", "x=82 -> x>=40 -> grade A+"],
  ["25", "25", "x=25 -> x<30 -> grade B"],
  ["5", "5", "x=5 -> x<10 -> grade D"],
  ["35", "35", "x=35 -> x<40 -> grade A"],
]));
children.push(blank());

children.push(subtitle("7. switch-statement"));
children.push(makeTable([
  ["1", "1", "day=1 -> Mon -> 'Start week'"],
  ["3", "3", "day=3 -> Wed -> 'Midweek'"],
  ["5", "5", "day=5 -> Fri -> 'TGIF!'"],
  ["7", "7", "day=7 -> Sun -> 'Rest day'"],
  ["4", "4", "day=4 -> Thu -> 'Almost there'"],
]));
children.push(blank());

children.push(subtitle("8. while-loop"));
children.push(makeTable([
  ["10", "10", "Counts 1 to 10, sum = 55"],
  ["5", "5", "Counts 1 to 5, sum = 15"],
  ["20", "20", "Counts 1 to 20, sum = 210"],
]));
children.push(blank());

children.push(subtitle("9. for-loop"));
children.push(makeTable([
  ["10", "10", "for i=0 to 9 -> sum = 45"],
  ["5", "5", "for i=0 to 4 -> sum = 10"],
  ["100", "100", "for i=0 to 99 -> sum = 4950"],
]));
children.push(blank());

children.push(subtitle("10. arrays-1d"));
children.push(makeTable([
  ["4, 7, 2, 9, 1, 6", "4, 7, 2, 9, 1, 6", "Array [4,7,2,9,1,6] — traverse, insert, delete, search, update"],
  ["5, 3, 8, 1", "5, 3, 8, 1", "Array [5,3,8,1] — all operations cycle"],
  ["10, 20, 30", "10, 20, 30", "Array [10,20,30] — all operations cycle"],
]));
children.push(blank());

children.push(subtitle("11. arrays-2d"));
children.push(makeTable([
  ["2, 3, 1, 2, 3, 4, 5, 6", "2, 3, 1, 2, 3, 4, 5, 6", "2x3 matrix: [[1,2,3],[4,5,6]] — row & column traversal"],
  ["3, 2, 1, 2, 3, 4, 5, 6", "3, 2, 1, 2, 3, 4, 5, 6", "3x2 matrix: [[1,2],[3,4],[5,6]]"],
]));
children.push(blank());

children.push(subtitle("12. pointers-intro"));
children.push(makeTable([
  ["42", "42", "value=42, address=0x7ff4, pointer stores address"],
  ["100", "100", "value=100, address=0x7ff8, pointer stores address"],
]));
children.push(blank());

children.push(subtitle("13. address-indirection"));
children.push(makeTable([
  ["10, 25", "10, 25", "Before: a=10, b=25 -> After swap: a=25, b=10"],
  ["100, 200", "100, 200", "Before: a=100, b=200 -> After swap: a=200, b=100"],
]));
children.push(blank());

children.push(subtitle("14. passing-arrays"));
children.push(makeTable([
  ["1, 2, 3, 4, 5", "1, 2, 3, 4, 5", "Array [1,2,3,4,5] passed to function"],
  ["10, 20, 30", "10, 20, 30", "Array [10,20,30] passed to function"],
]));
children.push(blank());

children.push(subtitle("15. recursion-c"));
children.push(makeTable([
  ["5", "5", "5! = 120 — shows recursive call stack: f(5)->f(4)->f(3)->f(2)->f(1)"],
  ["3", "3", "3! = 6 — shows 3 recursive calls"],
  ["10", "10", "10! = 3628800"],
]));
children.push(blank());

children.push(subtitle("16. strings-c"));
children.push(makeTable([
  ["Hello, World", "Hello, World", "\"Hello\" + \" \" + \"World\" = \"Hello World\""],
  ["Code, Map", "Code, Map", "\"Code\" + \"Map\" = \"CodeMap\""],
]));
children.push(blank());

// ═══════════════════════════════════════
// PYTHON
// ═══════════════════════════════════════
children.push(sectionTitle("Subject 2: Scripting Language (Python) — Semester 2"));

children.push(subtitle("17. py-arithmetic-ops"));
children.push(makeTable([
  ["17, 5", "17, 5", "17+5=22, 17-5=12, 17*5=85, 17/5=3.4, 17%5=2, 17//5=3, 17**5=1419857"],
  ["10, 3", "10, 3", "10+3=13, 10-3=7, 10*3=30, 10/3=3.33, 10%3=1, 10//3=3, 10**3=1000"],
]));
children.push(blank());

children.push(subtitle("18. py-comparison-ops"));
children.push(makeTable([
  ["5, 3", "5, 3", "5>3=True, 5<3=False, 5==3=False, 5!=3=True, 5>=3=True, 5<=3=False"],
  ["10, 10", "10, 10", "10>10=False, 10==10=True, 10<=10=True"],
]));
children.push(blank());

children.push(subtitle("19. py-assignment-ops"));
children.push(makeTable([
  ["10", "10", "x=10 -> x+=5->15 -> x-=3->12 -> x*=2->24 -> x/=4->6 -> x%=4->2"],
  ["20", "20", "x=20 -> cascading assignment operations shown step by step"],
]));
children.push(blank());

children.push(subtitle("20. py-bitwise-ops"));
children.push(makeTable([
  ["5, 3", "5, 3", "5&3=1, 5|3=7, 5^3=6, ~5=-6, 5<<1=10, 5>>1=2"],
  ["12, 10", "12, 10", "12&10=8, 12|10=14, 12^10=6"],
]));
children.push(blank());

children.push(subtitle("21. py-membership-ops"));
children.push(makeTable([
  ["Hello World, World", "Hello World, World", "\"World\" in \"Hello World\" -> True"],
  ["Python is fun, fun", "Python is fun, fun", "\"fun\" in \"Python is fun\" -> True"],
]));
children.push(blank());

children.push(subtitle("22. py-if-elif-else"));
children.push(makeTable([
  ["82", "82", "marks=82 -> x>=80 -> Grade: A+"],
  ["45", "45", "marks=45 -> x>=40 -> Grade: B"],
  ["15", "15", "marks=15 -> x<20 -> Grade: F"],
]));
children.push(blank());

children.push(subtitle("23. py-while-loop"));
children.push(makeTable([
  ["10", "10", "Counts 1 to 10, sum = 55"],
  ["5", "5", "Counts 1 to 5, sum = 15"],
]));
children.push(blank());

children.push(subtitle("24. py-for-loop-range"));
children.push(makeTable([
  ["10", "10", "range(10) -> 0,1,2...9"],
  ["5", "5", "range(5) -> 0,1,2,3,4"],
]));
children.push(blank());

children.push(subtitle("25. py-nested-loops"));
children.push(makeTable([
  ["5", "5", "5x5 multiplication table"],
  ["3", "3", "3x3 multiplication table"],
  ["10", "10", "10x10 multiplication table"],
]));
children.push(blank());

children.push(subtitle("26. py-lists"));
children.push(makeTable([
  ["10, 20, 30, 40", "10, 20, 30, 40", "Creates list -> append, insert, delete, sort, slice phases"],
  ["5, 3, 8, 1, 4", "5, 3, 8, 1, 4", "Creates [5,3,8,1,4] -> sort -> [1,3,4,5,8]"],
]));
children.push(blank());

children.push(subtitle("27. py-tuples"));
children.push(makeTable([
  ["red, green, blue", "red, green, blue", "Creates ('red','green','blue') -> indexing, iteration, unpacking"],
  ["apple, banana, cherry", "apple, banana, cherry", "Creates tuple -> immutability demo"],
]));
children.push(blank());

children.push(subtitle("28. py-sets"));
children.push(makeTable([
  ["1, 2, 3, 4, 5", "1, 2, 3, 4, 5", "Set A = {1,2,3,4,5} -> union, intersection, difference, subset"],
  ["1, 2, 3", "1, 2, 3", "Set A = {1,2,3} -> operations with Set B"],
]));
children.push(blank());

children.push(subtitle("29. py-built-in-functions"));
children.push(makeTable([
  ["3, 1, 4, 1, 5, 9, 2, 6", "3, 1, 4, 1, 5, 9, 2, 6", "min=1, max=9, sum=29, len=8, sorted=[1,1,2,3,4,5,6,9]"],
  ["10, 20, 30", "10, 20, 30", "min=10, max=30, sum=60, len=3"],
]));
children.push(blank());

children.push(subtitle("30. py-recursion"));
children.push(makeTable([
  ["5", "5", "5! = 120 — recursive call tree visualized"],
  ["3", "3", "3! = 6"],
]));
children.push(blank());

children.push(subtitle("31. py-matplotlib"));
children.push(makeTable([
  ["2, 4, 1, 5, 3, 6", "2, 4, 1, 5, 3, 6", "Bar chart with YOUR values plotted"],
  ["10, 20, 30, 40", "10, 20, 30, 40", "Bar chart of [10,20,30,40]"],
]));
children.push(blank());

children.push(subtitle("32. py-numpy"));
children.push(makeTable([
  ["1, 2, 3, 4, 5", "1, 2, 3, 4, 5", "Array ops: sum=15, mean=3.0, std, min=1, max=5"],
  ["10, 20, 30", "10, 20, 30", "Array ops on [10,20,30]"],
]));
children.push(blank());

// ═══════════════════════════════════════
// DATA STRUCTURES
// ═══════════════════════════════════════
children.push(sectionTitle("Subject 3: Data Structures (C/Python) — Semester 3"));

children.push(subtitle("33. arrays-row-column"));
children.push(makeTable([
  ["3, 4", "3, 4", "3 rows x 4 cols matrix — row-wise then column-wise traversal"],
  ["2, 3", "2, 3", "2 rows x 3 cols matrix traversal"],
]));
children.push(blank());

children.push(subtitle("34. array-operations"));
children.push(makeTable([
  ["10, 20, 30, 40, 50", "10, 20, 30, 40, 50", "Array -> traversal, insert, delete, search, update cycles"],
  ["5, 3, 8, 1, 4", "5, 3, 8, 1, 4", "Array operations on [5,3,8,1,4]"],
]));
children.push(blank());

children.push(subtitle("35. stack"));
children.push(makeTable([
  ["10, 20, 30, 40", "10, 20, 30, 40", "Push 10,20,30,40 -> Pop 40,30 -> Peek -> isEmpty check"],
  ["5, 10, 15", "5, 10, 15", "Push 5,10,15 -> Pop 15,10 -> LIFO order"],
]));
children.push(blank());

children.push(subtitle("36. infix-prefix-postfix"));
children.push(makeTable([
  ["A+B*C", "A+B*C", "Infix -> Prefix: +A*BC, Postfix: ABC*+"],
  ["A+B-C", "A+B-C", "Infix -> Prefix/Postfix conversion step by step"],
  ["(A+B)*C", "(A+B)*C", "Infix -> Prefix: *+ABC, Postfix: AB+C*"],
]));
children.push(blank());

children.push(subtitle("37. recursion-ds"));
children.push(makeTable([
  ["5", "5", "5! = 120 — stack-based recursion visualization"],
  ["3", "3", "3! = 6"],
]));
children.push(blank());

children.push(subtitle("38. queue-simple"));
children.push(makeTable([
  ["10, 20, 30, 40", "10, 20, 30, 40", "Enqueue 10,20,30,40 -> Dequeue 10,20 -> Front check -> isEmpty"],
  ["5, 10, 15, 20", "5, 10, 15, 20", "Enqueue 5,10,15,20 -> Dequeue 5,10 -> FIFO order"],
]));
children.push(blank());

children.push(subtitle("39. queue-circular"));
children.push(makeTable([
  ["10, 20, 30, 40, 50", "10, 20, 30, 40, 50", "Circular enqueue -> wrap-around -> dequeue -> front/rear"],
  ["5, 10, 15", "5, 10, 15", "Circular queue with wrap-around demo"],
]));
children.push(blank());

children.push(subtitle("40. singly-linked-list"));
children.push(makeTable([
  ["10, 20, 30, 40", "10, 20, 30, 40", "Create list -> insert, delete, search, traverse phases"],
  ["5, 10, 15", "5, 10, 15", "Linked list: 5->10->15 -> operations"],
]));
children.push(blank());

children.push(subtitle("41. circular-linked-list"));
children.push(makeTable([
  ["10, 20, 30, 40", "10, 20, 30, 40", "Circular: 10->20->30->40->(back to 10) -> insert, delete"],
  ["5, 10, 15", "5, 10, 15", "Circular: 5->10->15->(back to 5)"],
]));
children.push(blank());

children.push(subtitle("42. doubly-linked-list"));
children.push(makeTable([
  ["10, 20, 30, 40", "10, 20, 30, 40", "Doubly: 10<->20<->30<->40 -> insert, delete, traverse"],
  ["5, 10, 15", "5, 10, 15", "Forward & backward traversal demo"],
]));
children.push(blank());

children.push(subtitle("43. tree-terminology"));
children.push(makeTable([
  ["50, 30, 70, 20, 40, 60, 80", "50, 30, 70, 20, 40, 60, 80", "Labels: root=50, leaves=20,40,60,80, height=2, parent/child"],
]));
children.push(blank());

children.push(subtitle("44. tree-traversals"));
children.push(makeTable([
  ["50, 30, 70, 20, 40, 60, 80", "50, 30, 70, 20, 40, 60, 80", "Inorder: 20,30,40,50,60,70,80 | Preorder: 50,30,20,40,70,60,80 | Postorder | Level-order"],
  ["10, 5, 15, 3, 7", "10, 5, 15, 3, 7", "All 4 traversal sequences shown"],
]));
children.push(blank());

children.push(subtitle("45. bst"));
children.push(makeTable([
  ["50, 30, 70, 20, 40, 60, 80", "50, 30, 70, 20, 40, 60, 80", "BST insert: 50 root -> 30 left -> 70 right -> full tree"],
  ["40, 20, 60, 10, 30", "40, 20, 60, 10, 30", "BST step-by-step insert with comparisons"],
]));
children.push(blank());

children.push(subtitle("46. bubble-sort"));
children.push(makeTable([
  ["5, 3, 8, 1, 4, 7, 2, 6", "5, 3, 8, 1, 4, 7, 2, 6", "[5,3,8,1,4,7,2,6] -> [1,2,3,4,5,6,7,8]"],
  ["9, 5, 1, 4, 3", "9, 5, 1, 4, 3", "Sort step-by-step with swap highlighting"],
]));
children.push(blank());

children.push(subtitle("47. selection-sort"));
children.push(makeTable([
  ["5, 3, 8, 1, 4, 7, 2, 6", "5, 3, 8, 1, 4, 7, 2, 6", "Find min -> swap to front -> repeat"],
  ["9, 5, 1, 4, 3", "9, 5, 1, 4, 3", "Min-selection + swap animation"],
]));
children.push(blank());

children.push(subtitle("48. insertion-sort"));
children.push(makeTable([
  ["5, 3, 8, 1, 4, 7, 2, 6", "5, 3, 8, 1, 4, 7, 2, 6", "Pick element -> insert in correct position"],
  ["9, 5, 1, 4, 3", "9, 5, 1, 4, 3", "Element insertion with shift animation"],
]));
children.push(blank());

children.push(subtitle("49. quick-sort"));
children.push(makeTable([
  ["5, 3, 8, 1, 4, 7, 2, 6", "5, 3, 8, 1, 4, 7, 2, 6", "Pivot select -> partition -> recurse"],
  ["9, 5, 1, 4, 3", "9, 5, 1, 4, 3", "Pivot partitioning animation"],
]));
children.push(blank());

children.push(subtitle("50. merge-sort"));
children.push(makeTable([
  ["5, 3, 8, 1, 4, 7, 2, 6", "5, 3, 8, 1, 4, 7, 2, 6", "Divide -> merge pairs -> sorted"],
  ["9, 5, 1, 4, 3", "9, 5, 1, 4, 3", "Split & merge animation"],
]));
children.push(blank());

children.push(subtitle("51. radix-sort"));
children.push(makeTable([
  ["170, 45, 75, 90, 802, 24, 2, 66", "170, 45, 75, 90, 802, 24, 2, 66", "Sort by 1s -> 10s -> 100s digits"],
  ["5, 3, 8, 1", "5, 3, 8, 1", "Digit-by-digit bucket sort"],
]));
children.push(blank());

children.push(subtitle("52. linear-search"));
children.push(makeTable([
  ["4, 7, 2, 9, 1, 6, 3, 8 | 6", "4, 7, 2, 9, 1, 6, 3, 8 | 6", "Found 6 at index 5"],
  ["10, 20, 30, 40, 50 | 30", "10, 20, 30, 40, 50 | 30", "Found 30 at index 2"],
  ["1, 2, 3 | 9", "1, 2, 3 | 9", "9 not found"],
]));
children.push(blank());

children.push(subtitle("53. binary-search"));
children.push(makeTable([
  ["1, 2, 3, 4, 5, 6, 7, 8 | 6", "1, 2, 3, 4, 5, 6, 7, 8 | 6", "Found 6 at index 5 (low->mid->right)"],
  ["2, 5, 8, 12, 16, 23 | 23", "2, 5, 8, 12, 16, 23 | 23", "Found 23 at index 5"],
  ["10, 20, 30 | 15", "10, 20, 30 | 15", "15 not found"],
]));
children.push(blank());

children.push(subtitle("54. hashing"));
children.push(makeTable([
  ["15, 25, 35, 45, 55", "15, 25, 35, 45, 55", "Hash table with chaining: 15->slot 5, 25->slot 5 (chain)"],
]));
children.push(blank());

const doc = new Document({
  sections: [{
    properties: {},
    children,
  }],
});

Packer.toBuffer(doc).then(function(buf) {
  fs.writeFileSync("D:/NEW PROJECTS/progsite/CODEMAP_Input_Guide.docx", buf);
  console.log("Word file created: CODEMAP_Input_Guide.docx");
});
