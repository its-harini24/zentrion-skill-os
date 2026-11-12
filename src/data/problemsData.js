/**
 * Zentrion Skill OS — Engineering Problems Dataset
 * Target audience: First-year and second-year engineering students.
 * Topics: Arrays, Strings, Conditions, Searching, Sorting,
 *         Binary numbers, Logic gates, Basic digital electronics.
 * Every problem includes scenario, hints, starter code for 5 languages.
 */

export const problemsData = [
  /* ─────────────────────────── EASY ─────────────────────────── */

  {
    id: "find-largest-in-array",
    title: "Find the Largest Number in an Array",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Arrays · Loops · Conditions",
    summary:
      "Given a list of numbers, find and print the largest one using a simple loop.",
    description:
      `A temperature monitoring system records hourly readings from a sensor throughout the day. At the end of the day, an engineer needs to find the peak temperature recorded. Write a program that reads N temperature readings and outputs the highest value.

**Concepts required:** Arrays, for-loop, if-condition.

**Beginner tip:** Start with the first element as your maximum, then walk through the rest and update whenever you find something bigger.`,
    inputFormat:
      `• First line: An integer N (number of readings).
• Second line: N space-separated integers (temperature values).`,
    outputFormat: `A single integer — the maximum temperature recorded.`,
    constraints: [
      "1 ≤ N ≤ 1000",
      "-100 ≤ temperature ≤ 100",
    ],
    hints: [
      "Set max = first element before the loop starts.",
      "Inside the loop, check: if current > max, update max.",
      "Print max after the loop ends.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Normal day readings",
        input: `5\n22 35 29 41 18`,
        expectedOutput: `41`,
        explanation:
          "The readings are 22, 35, 29, 41, 18. The highest is 41.",
      },
      {
        id: 2,
        name: "All same values",
        input: `3\n15 15 15`,
        expectedOutput: `15`,
        explanation: "All values are equal, so the maximum is 15.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Find the Largest Number
# Concept: Arrays, Loops, Conditions

def find_largest(readings):
    """
    Return the maximum value from the list.
    Hint: Start with readings[0] as max, then loop.
    """
    # TODO: implement your solution
    pass

n = int(input())
readings = list(map(int, input().split()))
print(find_largest(readings))
`,
      javascript: `// Zentrion – Find the Largest Number
// Concept: Arrays, Loops, Conditions

function findLargest(readings) {
  // TODO: start with readings[0] as max, loop through the rest
  let max = readings[0];
  for (let i = 1; i < readings.length; i++) {
    // if readings[i] > max, update max
  }
  return max;
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const readings = lines[1].trim().split(/\\s+/).map(Number);
console.log(findLargest(readings));
`,
      java: `// Zentrion – Find the Largest Number
// Concept: Arrays, Loops, Conditions

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] readings = new int[n];
        for (int i = 0; i < n; i++) readings[i] = sc.nextInt();

        int max = readings[0];
        for (int i = 1; i < n; i++) {
            // TODO: update max if readings[i] is larger
        }
        System.out.println(max);
    }
}
`,
      cpp: `// Zentrion – Find the Largest Number
// Concept: Arrays, Loops, Conditions

#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> readings(n);
    for (int i = 0; i < n; i++) cin >> readings[i];

    int maxVal = readings[0];
    for (int i = 1; i < n; i++) {
        // TODO: update maxVal if readings[i] is larger
    }
    cout << maxVal << endl;
    return 0;
}
`,
      c: `// Zentrion – Find the Largest Number
// Concept: Arrays, Loops, Conditions

#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int readings[1000];
    for (int i = 0; i < n; i++) scanf("%d", &readings[i]);

    int maxVal = readings[0];
    for (int i = 1; i < n; i++) {
        // TODO: update maxVal if readings[i] is larger
    }
    printf("%d\\n", maxVal);
    return 0;
}
`,
    },
  },

  {
    id: "count-vowels-in-string",
    title: "Count Vowels in a Word",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Strings · Loops · Conditions",
    summary:
      "Count how many vowels (a, e, i, o, u) appear in a given word or sentence.",
    description:
      `A text-analysis tool for a language lab needs to count vowels in student-submitted words. Write a program that reads a string and prints the total number of vowel characters (both uppercase and lowercase count).

**Concepts required:** Strings, for-loop, character comparison.

**Beginner tip:** Loop through each character. Check if it belongs to the set {a, e, i, o, u, A, E, I, O, U}. Count it if it does.`,
    inputFormat: `A single line containing a word or sentence (no leading/trailing spaces).`,
    outputFormat: `A single integer — the number of vowels.`,
    constraints: [
      "1 ≤ length of string ≤ 1000",
      "String contains only English letters and spaces.",
    ],
    hints: [
      "Convert the string to lowercase first to simplify the check.",
      "Use a set or just compare each character to 'a','e','i','o','u'.",
      "Increment a counter each time a match is found.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Single word",
        input: `Engineering`,
        expectedOutput: `5`,
        explanation: "Vowels: E, i, e, i, i — 5 vowels total.",
      },
      {
        id: 2,
        name: "No vowels",
        input: `rhythm`,
        expectedOutput: `0`,
        explanation: "The word 'rhythm' has no standard vowels.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Count Vowels in a Word
# Concept: Strings, Loops, Conditions

def count_vowels(text):
    """Return the count of vowels in text."""
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        # TODO: check if char is a vowel and increment count
        pass
    return count

text = input()
print(count_vowels(text))
`,
      javascript: `// Zentrion – Count Vowels in a Word

function countVowels(text) {
  const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
  let count = 0;
  for (const ch of text) {
    // TODO: check if ch is in vowels and increment count
  }
  return count;
}

const text = require("fs").readFileSync(0, "utf-8").trim();
console.log(countVowels(text));
`,
      java: `// Zentrion – Count Vowels in a Word

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        String text = new Scanner(System.in).nextLine();
        String vowels = "aeiouAEIOU";
        int count = 0;
        for (char c : text.toCharArray()) {
            // TODO: check if vowels.indexOf(c) >= 0 and increment count
        }
        System.out.println(count);
    }
}
`,
      cpp: `// Zentrion – Count Vowels in a Word

#include <iostream>
#include <string>
using namespace std;

int main() {
    string text;
    getline(cin, text);
    string vowels = "aeiouAEIOU";
    int count = 0;
    for (char c : text) {
        // TODO: check if c is a vowel and increment count
    }
    cout << count << endl;
    return 0;
}
`,
      c: `// Zentrion – Count Vowels in a Word

#include <stdio.h>
#include <string.h>

int isVowel(char c) {
    char v[] = "aeiouAEIOU";
    for (int i = 0; v[i]; i++) if (v[i] == c) return 1;
    return 0;
}

int main() {
    char text[1001];
    fgets(text, sizeof(text), stdin);
    int count = 0;
    for (int i = 0; text[i] && text[i] != '\\n'; i++) {
        // TODO: call isVowel(text[i]) and increment count
    }
    printf("%d\\n", count);
    return 0;
}
`,
    },
  },

  {
    id: "decimal-to-binary",
    title: "Decimal to Binary Converter",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Binary Numbers · Loops · Conditions",
    summary:
      "Convert a decimal (base-10) integer to its binary (base-2) representation.",
    description:
      `Digital electronics and computer architecture are built entirely on binary numbers. Every decimal number your computer stores is first converted to 1s and 0s. Write a program that takes a non-negative integer and prints its binary equivalent.

**Concepts required:** Division, modulo operator, loops, string building.

**Beginner tip:** Repeatedly divide the number by 2 and collect the remainders in reverse order. For example, 13 → 1101 because 13÷2=6 r1, 6÷2=3 r0, 3÷2=1 r1, 1÷2=0 r1 → read remainders bottom-up: 1101.`,
    inputFormat: `A single non-negative integer N.`,
    outputFormat: `A single string — the binary representation of N (no leading zeros, except "0" for input 0).`,
    constraints: [
      "0 ≤ N ≤ 10^9",
    ],
    hints: [
      "If N is 0, the answer is simply '0'.",
      "Use a loop: while N > 0, record N % 2 and divide N by 2.",
      "Reverse the collected remainders to get the final answer.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Convert 13",
        input: `13`,
        expectedOutput: `1101`,
        explanation: "13 = 8+4+1 = 2³+2²+2⁰ → 1101 in binary.",
      },
      {
        id: 2,
        name: "Convert 0",
        input: `0`,
        expectedOutput: `0`,
        explanation: "Special case — zero is '0' in any base.",
      },
      {
        id: 3,
        name: "Convert 255",
        input: `255`,
        expectedOutput: `11111111`,
        explanation: "255 = 2⁸ - 1, so all eight bits are 1.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Decimal to Binary Converter
# Concept: Binary numbers, division, loops

def decimal_to_binary(n):
    if n == 0:
        return "0"
    bits = []
    while n > 0:
        bits.append(n % 2)  # remainder is the next bit
        n //= 2
    # TODO: reverse bits and join into a string
    return ""

n = int(input())
print(decimal_to_binary(n))
`,
      javascript: `// Zentrion – Decimal to Binary Converter

function decimalToBinary(n) {
  if (n === 0) return "0";
  let bits = [];
  while (n > 0) {
    bits.push(n % 2);
    n = Math.floor(n / 2);
  }
  // TODO: reverse and join bits into a string
  return bits.reverse().join("");
}

const n = parseInt(require("fs").readFileSync(0, "utf-8").trim(), 10);
console.log(decimalToBinary(n));
`,
      java: `// Zentrion – Decimal to Binary Converter

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        if (n == 0) { System.out.println("0"); return; }
        StringBuilder bits = new StringBuilder();
        while (n > 0) {
            bits.append(n % 2);
            n /= 2;
        }
        // TODO: reverse bits and print
        System.out.println(bits.reverse().toString());
    }
}
`,
      cpp: `// Zentrion – Decimal to Binary Converter

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    long long n;
    cin >> n;
    if (n == 0) { cout << 0 << endl; return 0; }
    string bits = "";
    while (n > 0) {
        bits += (char)('0' + n % 2);
        n /= 2;
    }
    reverse(bits.begin(), bits.end());
    cout << bits << endl;
    return 0;
}
`,
      c: `// Zentrion – Decimal to Binary Converter

#include <stdio.h>
#include <string.h>

int main() {
    long long n;
    scanf("%lld", &n);
    if (n == 0) { printf("0\\n"); return 0; }
    char bits[64];
    int idx = 0;
    while (n > 0) {
        bits[idx++] = '0' + (n % 2);
        n /= 2;
    }
    // Reverse in-place
    for (int i = 0, j = idx - 1; i < j; i++, j--) {
        char tmp = bits[i]; bits[i] = bits[j]; bits[j] = tmp;
    }
    bits[idx] = '\\0';
    printf("%s\\n", bits);
    return 0;
}
`,
    },
  },

  {
    id: "odd-even-checker",
    title: "Odd or Even Checker",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Conditions · Loops · Arrays",
    summary:
      "Given a list of numbers, classify each as ODD or EVEN and print the result.",
    description:
      `A quality-control system at a factory labels products by their ID number. Even-numbered IDs go to one assembly line, odd-numbered IDs to another. Write a program that reads N product IDs and prints "EVEN" or "ODD" for each one.

**Concepts required:** Modulo operator (%), conditions (if/else), loops.

**Beginner tip:** A number N is even if N % 2 == 0. Otherwise it is odd.`,
    inputFormat:
      `• First line: An integer N (count of product IDs).
• Second line: N space-separated integers.`,
    outputFormat:
      `N lines, each containing "EVEN" or "ODD" for the corresponding ID.`,
    constraints: [
      "1 ≤ N ≤ 500",
      "0 ≤ ID ≤ 10^6",
    ],
    hints: [
      "Use the % (modulo) operator to check the remainder when divided by 2.",
      "If remainder is 0 → EVEN. Otherwise → ODD.",
      "Print one result per line inside a loop.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Mixed IDs",
        input: `4\n12 7 20 3`,
        expectedOutput: `EVEN\nODD\nEVEN\nODD`,
        explanation: "12 and 20 are even; 7 and 3 are odd.",
      },
      {
        id: 2,
        name: "All even",
        input: `3\n2 4 100`,
        expectedOutput: `EVEN\nEVEN\nEVEN`,
        explanation: "All three numbers are divisible by 2.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Odd or Even Checker
# Concept: Modulo, conditions, loops

n = int(input())
ids = list(map(int, input().split()))
for num in ids:
    # TODO: print "EVEN" if num % 2 == 0, else "ODD"
    pass
`,
      javascript: `// Zentrion – Odd or Even Checker

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const ids = lines[1].trim().split(/\\s+/).map(Number);
for (const num of ids) {
  // TODO: print "EVEN" or "ODD"
  console.log(num % 2 === 0 ? "EVEN" : "ODD");
}
`,
      java: `// Zentrion – Odd or Even Checker

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            int id = sc.nextInt();
            // TODO: print "EVEN" or "ODD"
            System.out.println(id % 2 == 0 ? "EVEN" : "ODD");
        }
    }
}
`,
      cpp: `// Zentrion – Odd or Even Checker

#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    while (n--) {
        int id; cin >> id;
        // TODO: print "EVEN" or "ODD"
        cout << (id % 2 == 0 ? "EVEN" : "ODD") << "\\n";
    }
    return 0;
}
`,
      c: `// Zentrion – Odd or Even Checker

#include <stdio.h>

int main() {
    int n; scanf("%d", &n);
    while (n--) {
        int id; scanf("%d", &id);
        /* TODO: print "EVEN" or "ODD" */
        printf("%s\\n", id % 2 == 0 ? "EVEN" : "ODD");
    }
    return 0;
}
`,
    },
  },

  {
    id: "linear-search",
    title: "Linear Search",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Arrays · Searching · Loops",
    summary:
      "Search for a target value in an unsorted array and return its position.",
    description:
      `A student record system stores roll numbers in an unsorted list. When a teacher queries a roll number, the system must find its position. Write a program that searches for a target value in an array and prints its 1-based index, or "NOT FOUND" if it doesn't exist.

**Concepts required:** Arrays, for-loop, comparison.

**Beginner tip:** Walk through each element one by one. The moment you find the target, print its position (index + 1 for 1-based). If you finish the loop without finding it, print "NOT FOUND".`,
    inputFormat:
      `• First line: N (size of array) and T (target value), space-separated.
• Second line: N space-separated integers.`,
    outputFormat:
      `The 1-based index of the first occurrence, or "NOT FOUND".`,
    constraints: [
      "1 ≤ N ≤ 1000",
      "-10^6 ≤ elements ≤ 10^6",
    ],
    hints: [
      "Use a for loop from index 0 to N-1.",
      "If arr[i] == target, print i+1 and stop.",
      "If the loop ends without a match, print NOT FOUND.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Target found",
        input: `6 29\n10 45 29 67 3 29`,
        expectedOutput: `3`,
        explanation: "29 first appears at index 2 (0-based), so position 3 (1-based).",
      },
      {
        id: 2,
        name: "Target not in array",
        input: `4 99\n5 10 15 20`,
        expectedOutput: `NOT FOUND`,
        explanation: "99 is not present in the array.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Linear Search
# Concept: Arrays, loops, searching

def linear_search(arr, target):
    for i in range(len(arr)):
        # TODO: return i+1 if arr[i] == target
        pass
    return "NOT FOUND"

first_line = input().split()
n, target = int(first_line[0]), int(first_line[1])
arr = list(map(int, input().split()))
print(linear_search(arr, target))
`,
      javascript: `// Zentrion – Linear Search

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i + 1;
  }
  return "NOT FOUND";
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const [n, target] = lines[0].trim().split(/\\s+/).map(Number);
const arr = lines[1].trim().split(/\\s+/).map(Number);
console.log(linearSearch(arr, target));
`,
      java: `// Zentrion – Linear Search

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), target = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        boolean found = false;
        for (int i = 0; i < n; i++) {
            if (arr[i] == target) {
                System.out.println(i + 1);
                found = true;
                break;
            }
        }
        if (!found) System.out.println("NOT FOUND");
    }
}
`,
      cpp: `// Zentrion – Linear Search

#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> arr(n);
    for (int& x : arr) cin >> x;

    for (int i = 0; i < n; i++) {
        if (arr[i] == target) { cout << i + 1 << endl; return 0; }
    }
    cout << "NOT FOUND" << endl;
    return 0;
}
`,
      c: `// Zentrion – Linear Search

#include <stdio.h>

int main() {
    int n, target;
    scanf("%d %d", &n, &target);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < n; i++) {
        if (arr[i] == target) { printf("%d\\n", i + 1); return 0; }
    }
    printf("NOT FOUND\\n");
    return 0;
}
`,
    },
  },

  {
    id: "reverse-a-string",
    title: "Reverse a String",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Strings · Two Pointers · Loops",
    summary:
      "Print the characters of a string in reverse order.",
    description:
      `Many encryption and encoding systems reverse strings as an initial step. Write a program that reads a word and prints it reversed.

**Concepts required:** Strings, indexing, loops.

**Beginner tip:** You can walk from the last character to the first, or swap characters using two pointers (one from the start, one from the end) moving toward the middle.`,
    inputFormat: `A single word (no spaces).`,
    outputFormat: `The word reversed.`,
    constraints: [
      "1 ≤ length ≤ 500",
      "Only lowercase and uppercase English letters.",
    ],
    hints: [
      "In Python you can slice: word[::-1].",
      "Otherwise loop from len-1 down to 0 and collect characters.",
      "Two-pointer swap: swap word[left] and word[right], then move left++ and right--.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Normal word",
        input: `Zentrion`,
        expectedOutput: `noirtneZ`,
        explanation: "Characters read from right to left.",
      },
      {
        id: 2,
        name: "Palindrome",
        input: `level`,
        expectedOutput: `level`,
        explanation: "A palindrome reads the same forwards and backwards.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Reverse a String
# Concept: strings, indexing

word = input().strip()
# TODO: print the reversed string
# Hint: word[::-1] works in Python
print(word[::-1])
`,
      javascript: `// Zentrion – Reverse a String

const word = require("fs").readFileSync(0, "utf-8").trim();
// TODO: reverse and print the string
console.log(word.split("").reverse().join(""));
`,
      java: `// Zentrion – Reverse a String

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        String word = new Scanner(System.in).next();
        // TODO: reverse using StringBuilder
        System.out.println(new StringBuilder(word).reverse().toString());
    }
}
`,
      cpp: `// Zentrion – Reverse a String

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string word; cin >> word;
    reverse(word.begin(), word.end());
    cout << word << endl;
    return 0;
}
`,
      c: `// Zentrion – Reverse a String

#include <stdio.h>
#include <string.h>

int main() {
    char word[501];
    scanf("%s", word);
    int len = strlen(word);
    for (int l = 0, r = len - 1; l < r; l++, r--) {
        char tmp = word[l]; word[l] = word[r]; word[r] = tmp;
    }
    printf("%s\\n", word);
    return 0;
}
`,
    },
  },

  {
    id: "and-or-xor-gate",
    title: "AND, OR, XOR Logic Gate Simulator",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Logic Gates · Binary Numbers · Conditions",
    summary:
      "Simulate the output of AND, OR, and XOR logic gates for given binary inputs.",
    description:
      `Logic gates are the building blocks of all digital circuits. In this problem you will simulate three basic gates.

**Gate truth tables:**
| A | B | AND | OR | XOR |
|---|---|-----|----|-----|
| 0 | 0 |  0  |  0 |  0  |
| 0 | 1 |  0  |  1 |  1  |
| 1 | 0 |  0  |  1 |  1  |
| 1 | 1 |  1  |  1 |  0  |

Given two binary digits A and B, print the output of AND, OR, and XOR gates on separate lines.

**Concepts required:** Binary digits, conditional logic (or bitwise operators).

**Beginner tip:** AND = 1 only when both inputs are 1. OR = 1 when at least one is 1. XOR = 1 only when the inputs differ.`,
    inputFormat: `Two integers A and B (each is 0 or 1) on a single line.`,
    outputFormat:
      `Three lines:
• AND <result>
• OR <result>
• XOR <result>`,
    constraints: ["A, B ∈ {0, 1}"],
    hints: [
      "AND: A & B  (or: A == 1 and B == 1)",
      "OR:  A | B  (or: A == 1 or B == 1)",
      "XOR: A ^ B  (or: A != B)",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Both 1",
        input: `1 1`,
        expectedOutput: `AND 1\nOR 1\nXOR 0`,
        explanation:
          "1 AND 1 = 1. 1 OR 1 = 1. 1 XOR 1 = 0 (same inputs → XOR is 0).",
      },
      {
        id: 2,
        name: "0 and 1",
        input: `0 1`,
        expectedOutput: `AND 0\nOR 1\nXOR 1`,
        explanation: "0 AND 1 = 0. 0 OR 1 = 1. 0 XOR 1 = 1 (different inputs).",
      },
    ],
    starterCode: {
      python: `# Zentrion – Logic Gate Simulator
# Concept: Logic gates, binary digits

a, b = map(int, input().split())
# TODO: compute and print AND, OR, XOR
print("AND", a & b)
print("OR",  a | b)
print("XOR", a ^ b)
`,
      javascript: `// Zentrion – Logic Gate Simulator

const [a, b] = require("fs").readFileSync(0, "utf-8").trim().split(/\\s+/).map(Number);
console.log("AND", a & b);
console.log("OR",  a | b);
console.log("XOR", a ^ b);
`,
      java: `// Zentrion – Logic Gate Simulator

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        System.out.println("AND " + (a & b));
        System.out.println("OR "  + (a | b));
        System.out.println("XOR " + (a ^ b));
    }
}
`,
      cpp: `// Zentrion – Logic Gate Simulator

#include <iostream>
using namespace std;

int main() {
    int a, b; cin >> a >> b;
    cout << "AND " << (a & b) << "\\n";
    cout << "OR "  << (a | b) << "\\n";
    cout << "XOR " << (a ^ b) << "\\n";
    return 0;
}
`,
      c: `// Zentrion – Logic Gate Simulator

#include <stdio.h>

int main() {
    int a, b; scanf("%d %d", &a, &b);
    printf("AND %d\\n", a & b);
    printf("OR %d\\n",  a | b);
    printf("XOR %d\\n", a ^ b);
    return 0;
}
`,
    },
  },

  {
    id: "sum-of-array",
    title: "Sum of Array Elements",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Arrays · Loops · Conditions",
    summary:
      "Calculate the sum of all elements in an array — a building block for almost every real application.",
    description:
      `An energy meter records daily power consumption (in watts) from multiple households. At the end of the month, the billing system totals up all readings. Write a program that computes and prints the total sum of an array.

**Concepts required:** Arrays, accumulation with a loop.

**Beginner tip:** Start with sum = 0. Loop through each element and add it to sum.`,
    inputFormat:
      `• First line: N (number of readings).
• Second line: N space-separated integers.`,
    outputFormat: `A single integer — the total sum.`,
    constraints: [
      "1 ≤ N ≤ 1000",
      "0 ≤ each reading ≤ 10^6",
    ],
    hints: [
      "Initialize total = 0 before the loop.",
      "total += arr[i] inside the loop.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Five households",
        input: `5\n120 340 275 90 410`,
        expectedOutput: `1235`,
        explanation: "120+340+275+90+410 = 1235.",
      },
      {
        id: 2,
        name: "Single reading",
        input: `1\n500`,
        expectedOutput: `500`,
        explanation: "Only one element; sum equals that element.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Sum of Array Elements

n = int(input())
readings = list(map(int, input().split()))
total = 0
for val in readings:
    # TODO: add val to total
    total += val
print(total)
`,
      javascript: `// Zentrion – Sum of Array Elements

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const readings = lines[1].trim().split(/\\s+/).map(Number);
let total = 0;
for (const val of readings) total += val;
console.log(total);
`,
      java: `// Zentrion – Sum of Array Elements

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long total = 0;
        for (int i = 0; i < n; i++) total += sc.nextLong();
        System.out.println(total);
    }
}
`,
      cpp: `// Zentrion – Sum of Array Elements

#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    long long total = 0;
    for (int i = 0; i < n; i++) { long long x; cin >> x; total += x; }
    cout << total << endl;
    return 0;
}
`,
      c: `// Zentrion – Sum of Array Elements

#include <stdio.h>

int main() {
    int n; scanf("%d", &n);
    long long total = 0, x;
    for (int i = 0; i < n; i++) { scanf("%lld", &x); total += x; }
    printf("%lld\\n", total);
    return 0;
}
`,
    },
  },

  {
    id: "palindrome-check",
    title: "Palindrome Check",
    domain: "Computer Science",
    difficulty: "Easy",
    topics: "Strings · Two Pointers · Conditions",
    summary:
      "Check whether a word reads the same forwards and backwards.",
    description:
      `A cybersecurity tool validates authentication tokens. Tokens that are palindromes (they read identically in both directions) are flagged for further inspection. Write a program that reads a string and prints "YES" if it is a palindrome, otherwise "NO".

**Concepts required:** Strings, two-pointer technique, comparison.

**Beginner tip:** Compare the first character with the last, then the second with the second-to-last, and so on. If any pair doesn't match, it's not a palindrome.`,
    inputFormat: `A single word (no spaces, all lowercase).`,
    outputFormat: `"YES" if palindrome, otherwise "NO".`,
    constraints: [
      "1 ≤ length ≤ 500",
      "Only lowercase English letters.",
    ],
    hints: [
      "Reversed string == original string? Then YES.",
      "Or use two pointers: left=0, right=len-1, move inward comparing.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Classic palindrome",
        input: `racecar`,
        expectedOutput: `YES`,
        explanation: "'racecar' reversed is 'racecar' — same.",
      },
      {
        id: 2,
        name: "Not a palindrome",
        input: `hello`,
        expectedOutput: `NO`,
        explanation: "'hello' reversed is 'olleh' — different.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Palindrome Check

word = input().strip()
# TODO: check if word == word reversed
if word == word[::-1]:
    print("YES")
else:
    print("NO")
`,
      javascript: `// Zentrion – Palindrome Check

const word = require("fs").readFileSync(0, "utf-8").trim();
const reversed = word.split("").reverse().join("");
console.log(word === reversed ? "YES" : "NO");
`,
      java: `// Zentrion – Palindrome Check

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        String word = new Scanner(System.in).next();
        String rev = new StringBuilder(word).reverse().toString();
        System.out.println(word.equals(rev) ? "YES" : "NO");
    }
}
`,
      cpp: `// Zentrion – Palindrome Check

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string word; cin >> word;
    string rev = word;
    reverse(rev.begin(), rev.end());
    cout << (word == rev ? "YES" : "NO") << endl;
    return 0;
}
`,
      c: `// Zentrion – Palindrome Check

#include <stdio.h>
#include <string.h>

int main() {
    char word[501]; scanf("%s", word);
    int len = strlen(word);
    int ok = 1;
    for (int l = 0, r = len - 1; l < r; l++, r--)
        if (word[l] != word[r]) { ok = 0; break; }
    printf("%s\\n", ok ? "YES" : "NO");
    return 0;
}
`,
    },
  },

  /* ─────────────────────────── MEDIUM ─────────────────────────── */

  {
    id: "binary-search",
    title: "Binary Search",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Arrays · Searching · Divide & Conquer",
    summary:
      "Search for a target in a sorted array much faster than linear search by halving the search space each step.",
    description:
      `A large sorted directory of student IDs needs to be queried frequently. A linear search would be too slow for 100,000 entries. Binary search cuts the search space in half every iteration and finds the answer in at most log₂(N) steps.

**Concepts required:** Sorted arrays, mid-point calculation, loop or recursion.

**Beginner tip:**
1. Set low = 0, high = N-1.
2. While low ≤ high, compute mid = (low + high) / 2.
3. If arr[mid] == target → found (print mid+1).
4. If arr[mid] < target → search right half (low = mid+1).
5. If arr[mid] > target → search left half (high = mid-1).
6. If loop ends without finding → print NOT FOUND.`,
    inputFormat:
      `• First line: N (array size) and T (target), space-separated.
• Second line: N sorted integers in ascending order.`,
    outputFormat: `1-based index of target, or "NOT FOUND".`,
    constraints: [
      "1 ≤ N ≤ 10^5",
      "Array is sorted in non-decreasing order.",
      "-10^6 ≤ elements ≤ 10^6",
    ],
    hints: [
      "Make sure mid = low + (high - low) / 2 to avoid overflow in some languages.",
      "The array must be sorted — binary search only works on sorted data!",
      "Think of it like looking up a word in a dictionary.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Target in middle",
        input: `7 23\n5 10 15 23 37 44 60`,
        expectedOutput: `4`,
        explanation: "23 is at index 3 (0-based), so position 4 (1-based).",
      },
      {
        id: 2,
        name: "Target absent",
        input: `5 8\n1 3 5 7 9`,
        expectedOutput: `NOT FOUND`,
        explanation: "8 is not in the sorted list.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Binary Search
# Concept: Divide and conquer, sorted arrays

def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid + 1       # 1-based index
        elif arr[mid] < target:
            low = mid + 1        # search right half
        else:
            high = mid - 1       # search left half
    return "NOT FOUND"

first = input().split()
n, target = int(first[0]), int(first[1])
arr = list(map(int, input().split()))
print(binary_search(arr, target))
`,
      javascript: `// Zentrion – Binary Search

function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid + 1;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return "NOT FOUND";
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const [n, target] = lines[0].split(/\\s+/).map(Number);
const arr = lines[1].split(/\\s+/).map(Number);
console.log(binarySearch(arr, target));
`,
      java: `// Zentrion – Binary Search

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), target = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        int low = 0, high = n - 1, result = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) { result = mid + 1; break; }
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        System.out.println(result == -1 ? "NOT FOUND" : result);
    }
}
`,
      cpp: `// Zentrion – Binary Search

#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target; cin >> n >> target;
    vector<int> arr(n);
    for (int& x : arr) cin >> x;

    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) { cout << mid + 1 << endl; return 0; }
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    cout << "NOT FOUND" << endl;
    return 0;
}
`,
      c: `// Zentrion – Binary Search

#include <stdio.h>

int main() {
    int n, target; scanf("%d %d", &n, &target);
    int arr[100000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) { printf("%d\\n", mid + 1); return 0; }
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    printf("NOT FOUND\\n");
    return 0;
}
`,
    },
  },

  {
    id: "bubble-sort",
    title: "Bubble Sort",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Arrays · Sorting · Loops",
    summary:
      "Sort an array of numbers in ascending order using the Bubble Sort algorithm.",
    description:
      `A school leaderboard needs to rank student scores from lowest to highest. Bubble sort repeatedly compares adjacent elements and swaps them if they are in the wrong order — just like bubbles rising to the top of water.

**Concepts required:** Arrays, nested loops, swapping.

**Beginner tip:**
- Outer loop runs N-1 times.
- Inner loop compares each pair arr[j] and arr[j+1].
- If arr[j] > arr[j+1], swap them.
- After each outer iteration, the largest unsorted value "bubbles" to its correct position.`,
    inputFormat:
      `• First line: N (number of scores).
• Second line: N space-separated integers.`,
    outputFormat: `N space-separated integers sorted in ascending order.`,
    constraints: [
      "1 ≤ N ≤ 500",
      "0 ≤ scores ≤ 10^6",
    ],
    hints: [
      "You can optimise by stopping early if no swap happened in an inner pass.",
      "After k outer iterations, the last k elements are already sorted.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Unsorted scores",
        input: `5\n64 34 25 12 22`,
        expectedOutput: `12 22 25 34 64`,
        explanation: "Sorted ascending using bubble sort.",
      },
      {
        id: 2,
        name: "Already sorted",
        input: `3\n1 2 3`,
        expectedOutput: `1 2 3`,
        explanation: "No swaps needed.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Bubble Sort
# Concept: Nested loops, swapping

def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # swap
    return arr

n = int(input())
arr = list(map(int, input().split()))
print(*bubble_sort(arr))
`,
      javascript: `// Zentrion – Bubble Sort

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // swap
      }
    }
  }
  return arr;
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const arr = lines[1].split(/\\s+/).map(Number);
console.log(bubbleSort(arr).join(" "));
`,
      java: `// Zentrion – Bubble Sort

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - 1 - i; j++)
                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
                }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { if (i > 0) sb.append(' '); sb.append(arr[i]); }
        System.out.println(sb);
    }
}
`,
      cpp: `// Zentrion – Bubble Sort

#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int& x : arr) cin >> x;

    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);

    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");
    return 0;
}
`,
      c: `// Zentrion – Bubble Sort

#include <stdio.h>

int main() {
    int n; scanf("%d", &n);
    int arr[500];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }

    for (int i = 0; i < n; i++) printf("%d%s", arr[i], i < n - 1 ? " " : "\\n");
    return 0;
}
`,
    },
  },

  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Strings · Stack · Conditions",
    summary:
      "Check whether brackets in a code expression are correctly matched and nested.",
    description:
      `Every programming language compiler checks that opening and closing brackets are properly paired. Given a string containing only '(', ')', '{', '}', '[', and ']', determine whether the brackets are balanced.

**Concepts required:** Stack (LIFO), string iteration, mapping pairs.

**Beginner tip:**
- Scan the string left to right.
- If you see an opening bracket: push it onto a stack.
- If you see a closing bracket: pop from the stack and check whether the popped bracket matches the closing one.
- At the end, if the stack is empty → VALID, else → INVALID.`,
    inputFormat: `A single string of bracket characters.`,
    outputFormat: `"VALID" if balanced, otherwise "INVALID".`,
    constraints: [
      "1 ≤ length ≤ 10^4",
      "String contains only (, ), {, }, [, ]",
    ],
    hints: [
      "A stack naturally handles the nesting — last opened must be first closed.",
      "If the stack is empty when you try to pop, the string is already invalid.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Balanced expression",
        input: `({[]})`,
        expectedOutput: `VALID`,
        explanation: "Every opening bracket has a matching closing bracket.",
      },
      {
        id: 2,
        name: "Mismatched brackets",
        input: `([)]`,
        expectedOutput: `INVALID`,
        explanation: "'[' is closed by ')' instead of ']'.",
      },
      {
        id: 3,
        name: "Unclosed bracket",
        input: `(((`,
        expectedOutput: `INVALID`,
        explanation: "Three openings but no closings.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Valid Parentheses
# Concept: Stack, string iteration

def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in '({[':
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return "INVALID"
            stack.pop()
    return "VALID" if not stack else "INVALID"

s = input().strip()
print(is_valid(s))
`,
      javascript: `// Zentrion – Valid Parentheses

function isValid(s) {
  const stack = [];
  const pairs = {')':'(', '}':'{', ']':'['};
  for (const ch of s) {
    if ("({[".includes(ch)) stack.push(ch);
    else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch])
        return "INVALID";
      stack.pop();
    }
  }
  return stack.length === 0 ? "VALID" : "INVALID";
}

const s = require("fs").readFileSync(0, "utf-8").trim();
console.log(isValid(s));
`,
      java: `// Zentrion – Valid Parentheses

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> pairs = Map.of(')', '(', '}', '{', ']', '[');
        boolean valid = true;
        for (char ch : s.toCharArray()) {
            if ("({[".indexOf(ch) >= 0) stack.push(ch);
            else {
                if (stack.isEmpty() || stack.peek() != pairs.get(ch)) { valid = false; break; }
                stack.pop();
            }
        }
        System.out.println(valid && stack.isEmpty() ? "VALID" : "INVALID");
    }
}
`,
      cpp: `// Zentrion – Valid Parentheses

#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s; cin >> s;
    stack<char> st;
    for (char ch : s) {
        if (ch == '(' || ch == '{' || ch == '[') st.push(ch);
        else {
            if (st.empty()) { cout << "INVALID\\n"; return 0; }
            char top = st.top(); st.pop();
            if ((ch==')' && top!='(') || (ch=='}' && top!='{') || (ch==']' && top!='['))
            { cout << "INVALID\\n"; return 0; }
        }
    }
    cout << (st.empty() ? "VALID" : "INVALID") << "\\n";
    return 0;
}
`,
      c: `// Zentrion – Valid Parentheses

#include <stdio.h>
#include <string.h>

int main() {
    char s[10001]; scanf("%s", s);
    char stack[10001]; int top = 0;
    int valid = 1;
    for (int i = 0; s[i] && valid; i++) {
        char ch = s[i];
        if (ch=='(' || ch=='{' || ch=='[') stack[top++] = ch;
        else {
            if (top == 0) { valid = 0; break; }
            char t = stack[--top];
            if ((ch==')' && t!='(') || (ch=='}' && t!='{') || (ch==']' && t!='['))
                valid = 0;
        }
    }
    printf("%s\\n", (valid && top == 0) ? "VALID" : "INVALID");
    return 0;
}
`,
    },
  },

  {
    id: "count-bits-in-number",
    title: "Count Set Bits (1s) in a Binary Number",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Binary Numbers · Loops · Conditions",
    summary:
      "Count how many 1-bits are set in the binary representation of a given integer.",
    description:
      `Digital electronics students often need to verify logic circuit outputs by counting set bits. For example, checking how many signals are HIGH in a byte of sensor data. Write a program that counts the number of 1s in the binary representation of an integer (this is also called the Hamming weight or popcount).

**Concepts required:** Bitwise AND, right-shift, loops.

**Beginner tip:**
Method 1 — Convert to binary and count '1' characters.
Method 2 (Bitwise) — Repeatedly check the last bit with n & 1, then right-shift n >> 1 until n becomes 0.

**Example:** 13 = 1101 in binary → three 1-bits.`,
    inputFormat: `A single non-negative integer N.`,
    outputFormat: `Count of 1-bits.`,
    constraints: [
      "0 ≤ N ≤ 10^9",
    ],
    hints: [
      "n & 1 gives the last bit (0 or 1).",
      "n >> 1 discards the last bit (shifts right by 1).",
      "Repeat until n == 0.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "13 in binary",
        input: `13`,
        expectedOutput: `3`,
        explanation: "13 = 1101 → three 1-bits.",
      },
      {
        id: 2,
        name: "Zero",
        input: `0`,
        expectedOutput: `0`,
        explanation: "0 = 00000000 → no bits set.",
      },
      {
        id: 3,
        name: "255",
        input: `255`,
        expectedOutput: `8`,
        explanation: "255 = 11111111 → all 8 bits set.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Count Set Bits
# Concept: Bitwise operations, loops

def count_set_bits(n):
    count = 0
    while n > 0:
        count += n & 1   # check last bit
        n >>= 1          # shift right
    return count

n = int(input())
print(count_set_bits(n))
`,
      javascript: `// Zentrion – Count Set Bits

function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

const n = parseInt(require("fs").readFileSync(0, "utf-8").trim(), 10);
console.log(countSetBits(n));
`,
      java: `// Zentrion – Count Set Bits

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        int count = 0;
        while (n > 0) { count += n & 1; n >>= 1; }
        System.out.println(count);
    }
}
`,
      cpp: `// Zentrion – Count Set Bits

#include <iostream>
using namespace std;

int main() {
    long long n; cin >> n;
    int count = 0;
    while (n > 0) { count += n & 1; n >>= 1; }
    cout << count << endl;
    return 0;
}
`,
      c: `// Zentrion – Count Set Bits

#include <stdio.h>

int main() {
    long long n; scanf("%lld", &n);
    int count = 0;
    while (n > 0) { count += n & 1; n >>= 1; }
    printf("%d\\n", count);
    return 0;
}
`,
    },
  },

  {
    id: "sensor-threshold-alert",
    title: "Sensor Threshold Alert",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Arrays · Conditions · Loops",
    summary:
      "Given sensor readings, identify every reading that exceeds a safe threshold and print an alert.",
    description:
      `An IoT temperature monitoring system reads values from N sensors every minute. If any reading exceeds a defined safe threshold T, the system must log it as an ALERT. Write a program that processes sensor readings and prints "ALERT <value> at index <i>" for every dangerous reading, or "ALL SAFE" if none exceeded the threshold.

**Concepts required:** Arrays, loops, conditional output.

**Beginner tip:** Loop through the array. For each element, compare it with T. Print the corresponding message.`,
    inputFormat:
      `• First line: N (number of readings) and T (threshold), space-separated.
• Second line: N space-separated sensor readings.`,
    outputFormat:
      `One line per alert: "ALERT <value> at index <i>" (1-based index).
If no alerts → print "ALL SAFE".`,
    constraints: [
      "1 ≤ N ≤ 500",
      "0 ≤ T, readings ≤ 1000",
    ],
    hints: [
      "Track whether any alert was printed using a boolean flag.",
      "Only print ALL SAFE if the flag is still false after the loop.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Two alerts",
        input: `6 50\n30 55 42 71 48 60`,
        expectedOutput: `ALERT 55 at index 2\nALERT 71 at index 4\nALERT 60 at index 6`,
        explanation: "Readings 55, 71, and 60 exceed the threshold of 50.",
      },
      {
        id: 2,
        name: "Safe readings",
        input: `4 100\n20 45 70 90`,
        expectedOutput: `ALL SAFE`,
        explanation: "All readings are ≤ 100.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Sensor Threshold Alert
# Concept: Arrays, loops, conditions

first = input().split()
n, threshold = int(first[0]), int(first[1])
readings = list(map(int, input().split()))

alert_found = False
for i, val in enumerate(readings):
    if val > threshold:
        print(f"ALERT {val} at index {i + 1}")
        alert_found = True

if not alert_found:
    print("ALL SAFE")
`,
      javascript: `// Zentrion – Sensor Threshold Alert

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const [n, threshold] = lines[0].split(/\\s+/).map(Number);
const readings = lines[1].split(/\\s+/).map(Number);

let alertFound = false;
readings.forEach((val, i) => {
  if (val > threshold) {
    console.log(\`ALERT \${val} at index \${i + 1}\`);
    alertFound = true;
  }
});
if (!alertFound) console.log("ALL SAFE");
`,
      java: `// Zentrion – Sensor Threshold Alert

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), threshold = sc.nextInt();
        boolean alertFound = false;
        for (int i = 1; i <= n; i++) {
            int val = sc.nextInt();
            if (val > threshold) {
                System.out.println("ALERT " + val + " at index " + i);
                alertFound = true;
            }
        }
        if (!alertFound) System.out.println("ALL SAFE");
    }
}
`,
      cpp: `// Zentrion – Sensor Threshold Alert

#include <iostream>
using namespace std;

int main() {
    int n, threshold; cin >> n >> threshold;
    bool alertFound = false;
    for (int i = 1; i <= n; i++) {
        int val; cin >> val;
        if (val > threshold) {
            cout << "ALERT " << val << " at index " << i << "\\n";
            alertFound = true;
        }
    }
    if (!alertFound) cout << "ALL SAFE\\n";
    return 0;
}
`,
      c: `// Zentrion – Sensor Threshold Alert

#include <stdio.h>

int main() {
    int n, threshold; scanf("%d %d", &n, &threshold);
    int alertFound = 0;
    for (int i = 1; i <= n; i++) {
        int val; scanf("%d", &val);
        if (val > threshold) {
            printf("ALERT %d at index %d\\n", val, i);
            alertFound = 1;
        }
    }
    if (!alertFound) printf("ALL SAFE\\n");
    return 0;
}
`,
    },
  },

  {
    id: "anagram-check",
    title: "Anagram Check",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Strings · Hash Map · Sorting",
    summary:
      "Determine whether two strings are anagrams of each other (same characters, different order).",
    description:
      `A puzzle game checks whether two words entered by a player are anagrams — made of exactly the same letters in a different arrangement. For example, "listen" and "silent" are anagrams. Write a program that reads two words and prints "YES" if they are anagrams, otherwise "NO".

**Concepts required:** Character frequency counting, sorting.

**Beginner tip:**
Method 1 — Sort both strings. If sorted versions are equal → YES.
Method 2 — Build a frequency map for each string. If maps are identical → YES.`,
    inputFormat: `Two words on separate lines (all lowercase, no spaces).`,
    outputFormat: `"YES" if anagram, otherwise "NO".`,
    constraints: [
      "1 ≤ length ≤ 500",
      "Only lowercase English letters.",
    ],
    hints: [
      "If lengths differ, they cannot be anagrams — return NO immediately.",
      "Sorting is the simplest approach: sort(word1) == sort(word2).",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Classic anagram",
        input: `listen\nsilent`,
        expectedOutput: `YES`,
        explanation: "Both words contain the same letters: e,i,l,n,s,t.",
      },
      {
        id: 2,
        name: "Not an anagram",
        input: `hello\nworld`,
        expectedOutput: `NO`,
        explanation: "Different character sets.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Anagram Check
# Concept: Sorting, frequency counting

word1 = input().strip()
word2 = input().strip()
# Method: sort both and compare
if sorted(word1) == sorted(word2):
    print("YES")
else:
    print("NO")
`,
      javascript: `// Zentrion – Anagram Check

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const [w1, w2] = lines.map(l => l.trim());
const sort = s => s.split("").sort().join("");
console.log(sort(w1) === sort(w2) ? "YES" : "NO");
`,
      java: `// Zentrion – Anagram Check

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        char[] w1 = sc.next().toCharArray();
        char[] w2 = sc.next().toCharArray();
        Arrays.sort(w1); Arrays.sort(w2);
        System.out.println(Arrays.equals(w1, w2) ? "YES" : "NO");
    }
}
`,
      cpp: `// Zentrion – Anagram Check

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string w1, w2; cin >> w1 >> w2;
    sort(w1.begin(), w1.end());
    sort(w2.begin(), w2.end());
    cout << (w1 == w2 ? "YES" : "NO") << endl;
    return 0;
}
`,
      c: `// Zentrion – Anagram Check

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return *(char*)a - *(char*)b; }

int main() {
    char w1[501], w2[501];
    scanf("%s %s", w1, w2);
    if (strlen(w1) != strlen(w2)) { printf("NO\\n"); return 0; }
    qsort(w1, strlen(w1), 1, cmp);
    qsort(w2, strlen(w2), 1, cmp);
    printf("%s\\n", strcmp(w1, w2) == 0 ? "YES" : "NO");
    return 0;
}
`,
    },
  },

  {
    id: "binary-to-decimal",
    title: "Binary to Decimal Converter",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Binary Numbers · Loops · Conditions",
    summary:
      "Convert a binary (base-2) string to its decimal (base-10) equivalent.",
    description:
      `Microcontrollers send data as binary strings over serial ports. A monitoring dashboard needs to decode these strings into human-readable decimal values. Write a program that reads a binary string and prints its decimal value.

**Concepts required:** Powers of 2, string iteration, accumulation.

**Beginner tip:**
Walk through the binary string from left to right.
Multiply the current result by 2 (shift left one position) and add the current bit (0 or 1).

Example: "1101"
- Start: result = 0
- Bit '1': result = 0×2 + 1 = 1
- Bit '1': result = 1×2 + 1 = 3
- Bit '0': result = 3×2 + 0 = 6
- Bit '1': result = 6×2 + 1 = 13 ✓`,
    inputFormat: `A single string of 0s and 1s.`,
    outputFormat: `The decimal integer equivalent.`,
    constraints: [
      "1 ≤ length of binary string ≤ 32",
      "String contains only '0' and '1'.",
    ],
    hints: [
      "Process each character as an integer (char - '0' in C/C++/Java).",
      "result = result * 2 + bit_value",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Convert 1101",
        input: `1101`,
        expectedOutput: `13`,
        explanation: "1×8 + 1×4 + 0×2 + 1×1 = 13.",
      },
      {
        id: 2,
        name: "Convert 11111111",
        input: `11111111`,
        expectedOutput: `255`,
        explanation: "All 8 bits set = 2⁸ - 1 = 255.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Binary to Decimal
# Concept: Powers of 2, string processing

binary = input().strip()
result = 0
for bit in binary:
    result = result * 2 + int(bit)
print(result)
`,
      javascript: `// Zentrion – Binary to Decimal

const binary = require("fs").readFileSync(0, "utf-8").trim();
let result = 0;
for (const bit of binary) result = result * 2 + parseInt(bit, 10);
console.log(result);
`,
      java: `// Zentrion – Binary to Decimal

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        String binary = new Scanner(System.in).next();
        long result = 0;
        for (char bit : binary.toCharArray()) result = result * 2 + (bit - '0');
        System.out.println(result);
    }
}
`,
      cpp: `// Zentrion – Binary to Decimal

#include <iostream>
#include <string>
using namespace std;

int main() {
    string binary; cin >> binary;
    long long result = 0;
    for (char bit : binary) result = result * 2 + (bit - '0');
    cout << result << endl;
    return 0;
}
`,
      c: `// Zentrion – Binary to Decimal

#include <stdio.h>
#include <string.h>

int main() {
    char binary[33]; scanf("%s", binary);
    long long result = 0;
    for (int i = 0; binary[i]; i++) result = result * 2 + (binary[i] - '0');
    printf("%lld\\n", result);
    return 0;
}
`,
    },
  },

  {
    id: "two-sum",
    title: "Two Sum",
    domain: "Computer Science",
    difficulty: "Medium",
    topics: "Arrays · Hash Map · Searching",
    summary:
      "Given an array and a target, find two numbers that add up to the target and print their indices.",
    description:
      `A financial reconciliation tool searches a list of transactions to find two amounts that together equal a target balance. Write a program that finds the 1-based indices of the two elements in the array that sum to the target value. Assume exactly one valid pair always exists.

**Concepts required:** Arrays, hash map (dictionary), two-pass or one-pass lookup.

**Beginner tip (brute force):**
Use two nested loops. For each element i, check every element j > i. If arr[i] + arr[j] == target, print i+1 and j+1.

**Better approach (one-pass hash map):**
Loop once. For each element, check if (target - element) is already in the map. If yes → found! Otherwise store current element and index in the map.`,
    inputFormat:
      `• First line: N (array size) and T (target), space-separated.
• Second line: N space-separated integers.`,
    outputFormat: `Two 1-based indices i and j (i < j), space-separated.`,
    constraints: [
      "2 ≤ N ≤ 10^4",
      "Exactly one valid solution exists.",
      "-10^5 ≤ elements ≤ 10^5",
    ],
    hints: [
      "Brute force O(N²): try every pair. Good enough for small N.",
      "Hash map O(N): store seen elements. For each arr[i], look up target - arr[i].",
      "The problem guarantees a unique answer, so stop as soon as you find it.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Standard case",
        input: `6 9\n2 7 11 15 1 8`,
        expectedOutput: `1 2`,
        explanation: "arr[0]+arr[1] = 2+7 = 9. Indices 1 and 2 (1-based).",
      },
      {
        id: 2,
        name: "Later in array",
        input: `4 6\n1 2 3 4`,
        expectedOutput: `2 4`,
        explanation: "arr[1]+arr[3] = 2+4 = 6.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Two Sum
# Concept: Hash map, one-pass lookup

def two_sum(arr, target):
    seen = {}                   # value -> index (0-based)
    for i, val in enumerate(arr):
        complement = target - val
        if complement in seen:
            return seen[complement] + 1, i + 1   # 1-based
        seen[val] = i
    return -1, -1

first = input().split()
n, target = int(first[0]), int(first[1])
arr = list(map(int, input().split()))
i, j = two_sum(arr, target)
print(i, j)
`,
      javascript: `// Zentrion – Two Sum

function twoSum(arr, target) {
  const seen = {};
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (complement in seen) return [seen[complement] + 1, i + 1];
    seen[arr[i]] = i;
  }
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const [n, target] = lines[0].split(/\\s+/).map(Number);
const arr = lines[1].split(/\\s+/).map(Number);
console.log(twoSum(arr, target).join(" "));
`,
      java: `// Zentrion – Two Sum

import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), target = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int complement = target - arr[i];
            if (seen.containsKey(complement)) {
                System.out.println((seen.get(complement) + 1) + " " + (i + 1));
                return;
            }
            seen.put(arr[i], i);
        }
    }
}
`,
      cpp: `// Zentrion – Two Sum

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target; cin >> n >> target;
    vector<int> arr(n);
    for (int& x : arr) cin >> x;

    unordered_map<int, int> seen;
    for (int i = 0; i < n; i++) {
        int comp = target - arr[i];
        if (seen.count(comp)) {
            cout << seen[comp] + 1 << " " << i + 1 << "\\n";
            return 0;
        }
        seen[arr[i]] = i;
    }
    return 0;
}
`,
      c: `// Zentrion – Two Sum (brute force for C)

#include <stdio.h>

int main() {
    int n, target; scanf("%d %d", &n, &target);
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            if (arr[i] + arr[j] == target) {
                printf("%d %d\\n", i + 1, j + 1);
                return 0;
            }
    return 0;
}
`,
    },
  },

  /* ─────────────────────────── HARD ─────────────────────────── */

  {
    id: "merge-sort",
    title: "Merge Sort",
    domain: "Computer Science",
    difficulty: "Hard",
    topics: "Arrays · Sorting · Divide & Conquer",
    summary:
      "Sort an array using the Merge Sort algorithm — O(N log N) in all cases.",
    description:
      `Bubble sort works fine for small arrays, but it becomes painfully slow on large datasets. Merge Sort is the go-to efficient sorting algorithm, used inside Python's built-in sort and Java's Arrays.sort. It follows the Divide and Conquer approach:
1. Split the array into two halves.
2. Recursively sort each half.
3. Merge the two sorted halves back into one sorted array.

**Concepts required:** Recursion, two-pointer merging, arrays.

**Beginner tip:** The merge step is the core — use two pointers (i for left half, j for right half) and always pick the smaller element first.`,
    inputFormat:
      `• First line: N (array size).
• Second line: N space-separated integers.`,
    outputFormat: `N space-separated integers sorted in ascending order.`,
    constraints: [
      "1 ≤ N ≤ 10^5",
      "-10^6 ≤ elements ≤ 10^6",
      "Must achieve O(N log N) time.",
    ],
    hints: [
      "Base case: an array of size 0 or 1 is already sorted.",
      "Find mid = (left + right) / 2, recurse on [left..mid] and [mid+1..right].",
      "In merge: compare arr[i] and arr[j], pick smaller, advance that pointer.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Random array",
        input: `6\n38 27 43 3 9 82`,
        expectedOutput: `3 9 27 38 43 82`,
        explanation: "Sorted ascending using merge sort.",
      },
      {
        id: 2,
        name: "Already sorted",
        input: `4\n1 2 3 4`,
        expectedOutput: `1 2 3 4`,
        explanation: "No change needed.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Merge Sort
# Concept: Divide & Conquer, recursion

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

n = int(input())
arr = list(map(int, input().split()))
print(*merge_sort(arr))
`,
      javascript: `// Zentrion – Merge Sort

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return result.concat(left.slice(i)).concat(right.slice(j));
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const arr = lines[1].split(/\\s+/).map(Number);
console.log(mergeSort(arr).join(" "));
`,
      java: `// Zentrion – Merge Sort

import java.util.*;

public class Solution {
    static void merge(int[] arr, int l, int m, int r) {
        int[] left  = Arrays.copyOfRange(arr, l, m + 1);
        int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        while (i < left.length && j < right.length)
            arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        while (i < left.length)  arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }

    static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        mergeSort(arr, 0, n - 1);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { if (i > 0) sb.append(' '); sb.append(arr[i]); }
        System.out.println(sb);
    }
}
`,
      cpp: `// Zentrion – Merge Sort

#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i < (int)left.size() && j < (int)right.size())
        arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    while (i < (int)left.size())  arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int n; cin >> n;
    vector<int> arr(n);
    for (int& x : arr) cin >> x;
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) cout << arr[i] << (i < n-1 ? " " : "\\n");
    return 0;
}
`,
      c: `// Zentrion – Merge Sort

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void merge(int* arr, int l, int m, int r) {
    int ln = m - l + 1, rn = r - m;
    int* left  = malloc(ln * sizeof(int));
    int* right = malloc(rn * sizeof(int));
    memcpy(left,  arr + l,     ln * sizeof(int));
    memcpy(right, arr + m + 1, rn * sizeof(int));
    int i = 0, j = 0, k = l;
    while (i < ln && j < rn) arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    while (i < ln)  arr[k++] = left[i++];
    while (j < rn)  arr[k++] = right[j++];
    free(left); free(right);
}

void mergeSort(int* arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int n; scanf("%d", &n);
    int* arr = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d%s", arr[i], i < n - 1 ? " " : "\\n");
    free(arr);
    return 0;
}
`,
    },
  },

  {
    id: "bst-insert-search",
    title: "BST Insert and Search",
    domain: "Computer Science",
    difficulty: "Hard",
    topics: "Trees · BST · Recursion",
    summary:
      "Build a Binary Search Tree by inserting values and then search for a target.",
    description:
      `A Binary Search Tree (BST) organises values so that for every node:
- All values in the **left subtree** are smaller.
- All values in the **right subtree** are larger.

This property makes search very efficient — O(log N) on average. Write a program that:
1. Reads N values and inserts them into a BST one by one.
2. Reads a target value and prints "FOUND" or "NOT FOUND".

**Concepts required:** Nodes, recursion, BST property.

**Beginner tip:** Define a Node struct with value, left, right. Insert recursively — if value < node.value go left; if value > node.value go right; if null, create a new node here.`,
    inputFormat:
      `• First line: N (number of values to insert).
• Second line: N space-separated integers (insert in this order).
• Third line: T (target to search for).`,
    outputFormat: `"FOUND" if T is in the BST, otherwise "NOT FOUND".`,
    constraints: [
      "1 ≤ N ≤ 1000",
      "All values are distinct.",
      "-10^6 ≤ values ≤ 10^6",
    ],
    hints: [
      "Build the BST first by inserting all N values.",
      "Then search: at each node, go left if target < value, right if target > value.",
      "If you reach null without finding it → NOT FOUND.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Target present",
        input: `5\n10 5 15 3 7\n7`,
        expectedOutput: `FOUND`,
        explanation: "7 was inserted and can be reached by going left from 10, then right from 5.",
      },
      {
        id: 2,
        name: "Target absent",
        input: `4\n8 3 12 1\n6`,
        expectedOutput: `NOT FOUND`,
        explanation: "6 was never inserted into the tree.",
      },
    ],
    starterCode: {
      python: `# Zentrion – BST Insert and Search
# Concept: Trees, recursion

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if root is None:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)
    return root

def search(root, target):
    if root is None:
        return "NOT FOUND"
    if target == root.val:
        return "FOUND"
    elif target < root.val:
        return search(root.left, target)
    else:
        return search(root.right, target)

n = int(input())
values = list(map(int, input().split()))
target = int(input())

root = None
for v in values:
    root = insert(root, v)
print(search(root, target))
`,
      javascript: `// Zentrion – BST Insert and Search

class Node { constructor(v) { this.val=v; this.left=null; this.right=null; } }

function insert(root, val) {
  if (!root) return new Node(val);
  if (val < root.val) root.left  = insert(root.left,  val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root;
}

function search(root, target) {
  if (!root) return "NOT FOUND";
  if (target === root.val) return "FOUND";
  return target < root.val ? search(root.left, target) : search(root.right, target);
}

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const values = lines[1].split(/\\s+/).map(Number);
const target = parseInt(lines[2].trim(), 10);
let root = null;
for (const v of values) root = insert(root, v);
console.log(search(root, target));
`,
      java: `// Zentrion – BST Insert and Search

import java.util.Scanner;

public class Solution {
    static class Node { int val; Node left, right; Node(int v){val=v;} }

    static Node insert(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) root.left  = insert(root.left,  val);
        else if (val > root.val) root.right = insert(root.right, val);
        return root;
    }

    static String search(Node root, int target) {
        if (root == null) return "NOT FOUND";
        if (target == root.val) return "FOUND";
        return target < root.val ? search(root.left, target) : search(root.right, target);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Node root = null;
        for (int i = 0; i < n; i++) root = insert(root, sc.nextInt());
        System.out.println(search(root, sc.nextInt()));
    }
}
`,
      cpp: `// Zentrion – BST Insert and Search

#include <iostream>
using namespace std;

struct Node { int val; Node* left; Node* right; Node(int v):val(v),left(nullptr),right(nullptr){} };

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->val) root->left  = insert(root->left,  val);
    else if (val > root->val) root->right = insert(root->right, val);
    return root;
}

string search(Node* root, int target) {
    if (!root) return "NOT FOUND";
    if (target == root->val) return "FOUND";
    return target < root->val ? search(root->left, target) : search(root->right, target);
}

int main() {
    int n; cin >> n;
    Node* root = nullptr;
    for (int i = 0; i < n; i++) { int v; cin >> v; root = insert(root, v); }
    int target; cin >> target;
    cout << search(root, target) << endl;
    return 0;
}
`,
      c: `// Zentrion – BST Insert and Search

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node { int val; struct Node* left; struct Node* right; } Node;

Node* insert(Node* root, int val) {
    if (!root) { Node* n = malloc(sizeof(Node)); n->val=val; n->left=n->right=NULL; return n; }
    if (val < root->val) root->left  = insert(root->left,  val);
    else if (val > root->val) root->right = insert(root->right, val);
    return root;
}

const char* search(Node* root, int target) {
    if (!root) return "NOT FOUND";
    if (target == root->val) return "FOUND";
    return target < root->val ? search(root->left, target) : search(root->right, target);
}

int main() {
    int n; scanf("%d", &n);
    Node* root = NULL;
    for (int i = 0; i < n; i++) { int v; scanf("%d", &v); root = insert(root, v); }
    int target; scanf("%d", &target);
    printf("%s\\n", search(root, target));
    return 0;
}
`,
    },
  },

  {
    id: "detect-cycle-linked-list",
    title: "Detect Cycle in a Linked List",
    domain: "Computer Science",
    difficulty: "Hard",
    topics: "Linked Lists · Two Pointers · Algorithms",
    summary:
      "Given a sequence of linked-list node connections, detect whether the list has a cycle.",
    description:
      `A network packet routing system models connections as a linked list. If a cycle exists in the route, packets loop forever and the network hangs. Write a program to detect whether a linked list defined by its next-pointer connections contains a cycle.

**Concept: Floyd's Cycle Detection (Tortoise and Hare)**
- Use two pointers: slow moves one step at a time, fast moves two steps at a time.
- If they ever point to the same node → cycle exists.
- If fast reaches null → no cycle.

**Input representation:** Nodes are numbered 1 to N. Each line specifies which node a given node points to. A next pointer of 0 means null (end of list). One node's next pointer points back into the list to form the cycle (or 0 for no cycle).`,
    inputFormat:
      `• First line: N (number of nodes) and H (head node, 1-based).
• Next N lines: "i -> j" meaning node i points to node j (j=0 means null).`,
    outputFormat: `"CYCLE DETECTED" if a cycle exists, otherwise "NO CYCLE".`,
    constraints: [
      "1 ≤ N ≤ 10^4",
      "Nodes numbered 1 to N.",
      "0 means null pointer.",
    ],
    hints: [
      "Build a next[] array from the input.",
      "Start slow = head, fast = head.",
      "While fast != 0 and next[fast] != 0: slow = next[slow], fast = next[next[fast]].",
      "If slow == fast inside the loop → CYCLE DETECTED.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "List with cycle",
        input: `4 1\n1 -> 2\n2 -> 3\n3 -> 4\n4 -> 2`,
        expectedOutput: `CYCLE DETECTED`,
        explanation: "Node 4 points back to node 2, forming a cycle: 2→3→4→2.",
      },
      {
        id: 2,
        name: "No cycle",
        input: `3 1\n1 -> 2\n2 -> 3\n3 -> 0`,
        expectedOutput: `NO CYCLE`,
        explanation: "Node 3 points to null — the list terminates normally.",
      },
    ],
    starterCode: {
      python: `# Zentrion – Detect Cycle in Linked List
# Concept: Floyd's tortoise and hare

import sys

def has_cycle(nxt, head):
    slow = head
    fast = head
    while fast != 0 and nxt[fast] != 0:
        slow = nxt[slow]
        fast = nxt[nxt[fast]]
        if slow == fast:
            return True
    return False

lines = sys.stdin.read().splitlines()
n, h = map(int, lines[0].split())
nxt = [0] * (n + 1)
for i in range(1, n + 1):
    parts = lines[i].split("->")
    node = int(parts[0].strip())
    nxt[node] = int(parts[1].strip())

print("CYCLE DETECTED" if has_cycle(nxt, h) else "NO CYCLE")
`,
      javascript: `// Zentrion – Detect Cycle in Linked List

const lines = require("fs").readFileSync(0, "utf-8").trim().split("\\n");
const [n, h] = lines[0].split(/\\s+/).map(Number);
const nxt = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  const parts = lines[i].split("->");
  nxt[parseInt(parts[0].trim())] = parseInt(parts[1].trim());
}

let slow = h, fast = h;
let cycle = false;
while (fast !== 0 && nxt[fast] !== 0) {
  slow = nxt[slow];
  fast = nxt[nxt[fast]];
  if (slow === fast) { cycle = true; break; }
}
console.log(cycle ? "CYCLE DETECTED" : "NO CYCLE");
`,
      java: `// Zentrion – Detect Cycle in Linked List

import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), h = sc.nextInt();
        int[] nxt = new int[n + 1];
        sc.nextLine();
        for (int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().split("->");
            int node = Integer.parseInt(parts[0].trim());
            nxt[node] = Integer.parseInt(parts[1].trim());
        }
        int slow = h, fast = h;
        while (fast != 0 && nxt[fast] != 0) {
            slow = nxt[slow];
            fast = nxt[nxt[fast]];
            if (slow == fast) { System.out.println("CYCLE DETECTED"); return; }
        }
        System.out.println("NO CYCLE");
    }
}
`,
      cpp: `// Zentrion – Detect Cycle in Linked List

#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, h; cin >> n >> h;
    vector<int> nxt(n + 1, 0);
    for (int i = 0; i < n; i++) {
        int node, to; char arrow;
        cin >> node >> arrow >> arrow >> to;
        nxt[node] = to;
    }
    int slow = h, fast = h;
    while (fast != 0 && nxt[fast] != 0) {
        slow = nxt[slow];
        fast = nxt[nxt[fast]];
        if (slow == fast) { cout << "CYCLE DETECTED\\n"; return 0; }
    }
    cout << "NO CYCLE\\n";
    return 0;
}
`,
      c: `// Zentrion – Detect Cycle in Linked List

#include <stdio.h>
#include <string.h>

int main() {
    int n, h; scanf("%d %d", &n, &h);
    int nxt[10001]; memset(nxt, 0, sizeof(nxt));
    for (int i = 0; i < n; i++) {
        int node, to; char buf[8];
        scanf("%d %s %d", &node, buf, &to);
        nxt[node] = to;
    }
    int slow = h, fast = h;
    while (fast != 0 && nxt[fast] != 0) {
        slow = nxt[slow];
        fast = nxt[nxt[fast]];
        if (slow == fast) { printf("CYCLE DETECTED\\n"); return 0; }
    }
    printf("NO CYCLE\\n");
    return 0;
}
`,
    },
  },

  // ─── ECE PROBLEMS ─────────────────────────────────────────────────────────

  /* 21 ── Digital Logic Gate Output (Easy) */
  {
    id: "digital-logic-gate-output",
    title: "Digital Logic Gate Output",
    domain: "ECE",
    difficulty: "Easy",
    topics: "Logic Gates · Binary Numbers · Conditions",
    summary:
      "Simulate six fundamental logic gates (AND, OR, NOT, NAND, NOR, XOR) for given binary inputs.",
    description: `## Real-World Scenario
Every digital device — from your phone to a calculator — is built on top of tiny circuits called **logic gates**. Each gate takes one or two binary inputs (0 or 1) and produces a single binary output according to a fixed rule.

In this problem you will write a program that behaves like a mini logic-gate simulator: given a gate name and one or two binary inputs, output the gate's result.

## Beginner Tip
Think of each gate as an \`if-else\` decision:
- **AND** → output is 1 only when **both** inputs are 1.
- **OR** → output is 1 when **at least one** input is 1.
- **NOT** → flips the single input (0 → 1, 1 → 0).
- **NAND** → opposite of AND.
- **NOR** → opposite of OR.
- **XOR** → output is 1 when the inputs are **different**.

## Task
Given the gate name and its input(s), print the output of the gate.`,
    inputFormat: `Line 1: A string — the gate name (AND, OR, NOT, NAND, NOR, or XOR).
Line 2: One integer (for NOT) or two space-separated integers (for the other gates). Each integer is 0 or 1.`,
    outputFormat: `A single integer — the output of the gate (0 or 1).`,
    constraints: [
      "Gate name is one of: AND, OR, NOT, NAND, NOR, XOR (case-sensitive).",
      "Inputs are always 0 or 1.",
      "NOT receives exactly one input; all other gates receive exactly two.",
    ],
    hints: [
      "Start by reading the gate name, then decide how many inputs to read.",
      "Use simple if-else or switch-case for each gate type.",
      "NAND is just NOT(AND) — compute AND first, then flip the result.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "AND gate",
        input: "AND\n1 0",
        expectedOutput: "0",
        explanation: "AND requires both inputs to be 1. Since one input is 0, output is 0.",
      },
      {
        id: 2,
        name: "NOT gate",
        input: "NOT\n1",
        expectedOutput: "0",
        explanation: "NOT flips the input: 1 becomes 0.",
      },
      {
        id: 3,
        name: "XOR gate",
        input: "XOR\n1 1",
        expectedOutput: "0",
        explanation: "XOR outputs 1 only when inputs differ. Both are 1, so output is 0.",
      },
    ],
    starterCode: {
      python: `gate = input().strip()

if gate == "NOT":
    a = int(input())
    # TODO: compute NOT output
else:
    a, b = map(int, input().split())
    # TODO: compute output for the given gate

# Print the result
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', l => lines.push(l.trim()));
rl.on('close', () => {
  const gate = lines[0];
  if (gate === "NOT") {
    const a = parseInt(lines[1]);
    // TODO: compute NOT output
  } else {
    const [a, b] = lines[1].split(' ').map(Number);
    // TODO: compute output for the given gate
  }
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String gate = sc.nextLine().trim();
        if (gate.equals("NOT")) {
            int a = sc.nextInt();
            // TODO: compute NOT output
        } else {
            int a = sc.nextInt(), b = sc.nextInt();
            // TODO: compute output for the given gate
        }
    }
}
`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string gate;
    cin >> gate;
    if (gate == "NOT") {
        int a; cin >> a;
        // TODO: compute NOT output
    } else {
        int a, b; cin >> a >> b;
        // TODO: compute output for the given gate
    }
    return 0;
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char gate[8];
    scanf("%s", gate);
    if (strcmp(gate, "NOT") == 0) {
        int a; scanf("%d", &a);
        // TODO: compute NOT output
    } else {
        int a, b; scanf("%d %d", &a, &b);
        // TODO: compute output for the given gate
    }
    return 0;
}
`,
    },
  },

  /* 22 ── Binary Signal Pattern Detector (Easy) */
  {
    id: "binary-signal-pattern-detector",
    title: "Binary Signal Pattern Detector",
    domain: "ECE",
    difficulty: "Easy",
    topics: "Binary Numbers · Pattern Detection · Arrays",
    summary:
      "Detect how many times a specific short binary pattern appears in a longer binary signal string.",
    description: `## Real-World Scenario
In communication systems, devices continuously receive a stream of binary bits. To decode a message, the receiver must first locate a **synchronization pattern** (a known short bit sequence) within the stream. Finding this pattern tells the device where meaningful data begins.

Your task is to count how many times a given short pattern occurs in a longer binary signal.

## Beginner Tip
A binary signal is just a string of '0's and '1's. You can slide a window of the pattern's length across the signal and compare each window to the pattern — this is called a **sliding window** approach.

## Task
Given a binary signal string and a pattern string, count the number of times the pattern appears as a **contiguous substring** in the signal. Overlapping occurrences count.`,
    inputFormat: `Line 1: The binary signal string (only '0' and '1' characters).
Line 2: The pattern string (only '0' and '1' characters).`,
    outputFormat: `A single integer — the number of times the pattern appears in the signal (including overlapping matches).`,
    constraints: [
      "1 ≤ length of signal ≤ 10,000",
      "1 ≤ length of pattern ≤ length of signal",
      "Both strings contain only '0' and '1'.",
    ],
    hints: [
      "Loop from index 0 to len(signal) - len(pattern). At each position, check if the substring matches the pattern.",
      "In Python you can use string slicing: signal[i:i+len(pattern)].",
      "Remember to count overlapping matches — after a match, advance by 1, not by the pattern length.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Non-overlapping matches",
        input: "110110110\n110",
        expectedOutput: "3",
        explanation:
          "The pattern '110' appears starting at index 0, 3, and 6.",
      },
      {
        id: 2,
        name: "Overlapping matches",
        input: "1111\n11",
        expectedOutput: "3",
        explanation:
          "'11' appears at indices 0, 1, and 2 (overlapping).",
      },
    ],
    starterCode: {
      python: `signal = input().strip()
pattern = input().strip()

count = 0
# TODO: slide a window across signal and count pattern matches

print(count)
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', l => lines.push(l.trim()));
rl.on('close', () => {
  const signal = lines[0];
  const pattern = lines[1];
  let count = 0;
  // TODO: count occurrences of pattern in signal
  console.log(count);
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String signal = sc.nextLine().trim();
        String pattern = sc.nextLine().trim();
        int count = 0;
        // TODO: count pattern occurrences (including overlaps)
        System.out.println(count);
    }
}
`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string signal, pattern;
    cin >> signal >> pattern;
    int count = 0;
    // TODO: count pattern occurrences
    cout << count << endl;
    return 0;
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char signal[10001], pattern[10001];
    scanf("%s", signal);
    scanf("%s", pattern);
    int count = 0, sLen = strlen(signal), pLen = strlen(pattern);
    // TODO: slide window and count matches
    printf("%d\\n", count);
    return 0;
}
`,
    },
  },

  /* 23 ── Half Adder Logic (Easy) */
  {
    id: "half-adder-logic",
    title: "Half Adder Logic",
    domain: "ECE",
    difficulty: "Easy",
    topics: "Logic Gates · Binary Arithmetic · Conditions",
    summary:
      "Simulate a half adder circuit that adds two single-bit binary numbers and returns Sum and Carry.",
    description: `## Real-World Scenario
A **half adder** is the simplest addition circuit in digital electronics. It adds two single binary digits and produces two outputs:
- **Sum** — the result of XOR(A, B).
- **Carry** — the result of AND(A, B).

Half adders are the building blocks inside every computer's arithmetic logic unit (ALU). Understanding them is the first step to understanding how computers perform addition.

## Beginner Tip
Think of adding in decimal: 1 + 1 = 2, but in binary 1 + 1 = 10 (which is "0 with a carry of 1"). The **Sum** bit is the ones place and the **Carry** bit is what gets carried over.

## Task
Given two single-bit binary inputs A and B, compute and print the Sum and Carry outputs of a half adder.`,
    inputFormat: `A single line containing two space-separated integers A and B (each is 0 or 1).`,
    outputFormat: `Two space-separated integers: Sum Carry`,
    constraints: [
      "A and B are each 0 or 1.",
    ],
    hints: [
      "Sum = A XOR B. In most languages XOR is the ^ operator.",
      "Carry = A AND B. In most languages AND is the & operator.",
      "There are only 4 possible input combinations — you can verify your solution against all of them.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "1 + 1",
        input: "1 1",
        expectedOutput: "0 1",
        explanation:
          "Sum = 1 XOR 1 = 0, Carry = 1 AND 1 = 1. (Binary: 1+1 = 10)",
      },
      {
        id: 2,
        name: "1 + 0",
        input: "1 0",
        expectedOutput: "1 0",
        explanation:
          "Sum = 1 XOR 0 = 1, Carry = 1 AND 0 = 0.",
      },
    ],
    starterCode: {
      python: `a, b = map(int, input().split())

# TODO: compute Sum and Carry
# Sum  = A XOR B
# Carry = A AND B

print(sum_bit, carry_bit)
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', line => {
  const [a, b] = line.trim().split(' ').map(Number);
  // TODO: compute Sum and Carry
  rl.close();
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        // TODO: compute Sum and Carry using XOR and AND
    }
}
`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // TODO: compute Sum (XOR) and Carry (AND)
    return 0;
}
`,
      c: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    // TODO: compute Sum and Carry
    return 0;
}
`,
    },
  },

  /* 24 ── Full Adder Logic (Medium) */
  {
    id: "full-adder-logic",
    title: "Full Adder Logic",
    domain: "ECE",
    difficulty: "Medium",
    topics: "Logic Gates · Binary Arithmetic · Conditions",
    summary:
      "Simulate a full adder circuit that adds two bits plus a carry-in and produces Sum and Carry-out.",
    description: `## Real-World Scenario
A **full adder** extends the half adder by accepting a **carry-in** bit from a previous stage. When you add two multi-bit binary numbers, each column (except the least significant bit) needs a full adder because it must account for the carry from the column to its right.

CPUs chain multiple full adders together to form a **ripple-carry adder** that can add entire binary numbers.

## Beginner Tip
A full adder can be built from **two half adders** and an **OR gate**:
1. Half-add A and B → get partial Sum₁ and Carry₁.
2. Half-add Sum₁ and Cin → get final Sum and Carry₂.
3. Carry-out = Carry₁ OR Carry₂.

## Task
Given three single-bit binary inputs A, B, and Cin (carry-in), compute and print the Sum and Cout (carry-out) of a full adder.`,
    inputFormat: `A single line containing three space-separated integers A, B, and Cin (each is 0 or 1).`,
    outputFormat: `Two space-separated integers: Sum Cout`,
    constraints: [
      "A, B, and Cin are each 0 or 1.",
    ],
    hints: [
      "First compute: Sum1 = A ^ B, Carry1 = A & B.",
      "Then: Sum = Sum1 ^ Cin, Carry2 = Sum1 & Cin.",
      "Finally: Cout = Carry1 | Carry2.",
      "There are 8 possible input combinations (2³). Test all of them to be sure.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "All ones",
        input: "1 1 1",
        expectedOutput: "1 1",
        explanation:
          "1+1+1 = 3 in decimal = 11 in binary → Sum=1, Cout=1.",
      },
      {
        id: 2,
        name: "Two ones",
        input: "1 1 0",
        expectedOutput: "0 1",
        explanation:
          "1+1+0 = 2 = 10 in binary → Sum=0, Cout=1.",
      },
      {
        id: 3,
        name: "One and carry",
        input: "0 1 1",
        expectedOutput: "0 1",
        explanation:
          "0+1+1 = 2 = 10 in binary → Sum=0, Cout=1.",
      },
    ],
    starterCode: {
      python: `a, b, cin = map(int, input().split())

# TODO: implement full adder logic
# Step 1: half-add A and B
# Step 2: half-add Sum1 and Cin
# Step 3: Cout = Carry1 OR Carry2

print(total_sum, cout)
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', line => {
  const [a, b, cin] = line.trim().split(' ').map(Number);
  // TODO: full adder logic
  rl.close();
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt(), cin = sc.nextInt();
        // TODO: full adder — two half adders + OR
    }
}
`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b, carry_in;
    cin >> a >> b >> carry_in;
    // TODO: full adder logic
    return 0;
}
`,
      c: `#include <stdio.h>

int main() {
    int a, b, cin;
    scanf("%d %d %d", &a, &b, &cin);
    // TODO: full adder logic
    return 0;
}
`,
    },
  },

  /* 25 ── Multiplexer Selector (Medium) */
  {
    id: "multiplexer-selector",
    title: "Multiplexer Selector",
    domain: "ECE",
    difficulty: "Medium",
    topics: "Digital Electronics · Logic · Arrays",
    summary:
      "Simulate a 2ⁿ-to-1 multiplexer that selects one of several data inputs based on binary select lines.",
    description: `## Real-World Scenario
A **multiplexer (MUX)** is a digital switch that selects one of many input signals and forwards it to a single output. Think of a TV remote choosing between channels — the channel number is the "select" input and the video feed is the data.

Multiplexers are used everywhere: in CPU data paths, memory addressing, and communication systems.

## Beginner Tip
A 2-to-1 MUX has 2 data inputs, 1 select line, and 1 output. The select line (0 or 1) determines which data input reaches the output.

A 4-to-1 MUX has 4 data inputs and 2 select lines. The select lines form a 2-bit binary number (00, 01, 10, 11) that picks one of the 4 inputs.

In general, a MUX with **n** select lines can choose from **2ⁿ** data inputs. The select lines form a binary index into the data array.

## Task
Given **n** select lines (as binary digits) and **2ⁿ** data inputs, output the data input selected by the binary index formed by the select lines.`,
    inputFormat: `Line 1: An integer n — the number of select lines (1 ≤ n ≤ 4).
Line 2: n space-separated integers — the select bits (MSB first, each 0 or 1).
Line 3: 2ⁿ space-separated integers — the data inputs (each 0 or 1).`,
    outputFormat: `A single integer — the selected data input (0 or 1).`,
    constraints: [
      "1 ≤ n ≤ 4 (so at most 16 data inputs).",
      "Each select bit and data input is 0 or 1.",
      "Select bits are given MSB (most significant bit) first.",
    ],
    hints: [
      "Convert the select bits to a decimal index. For example, select bits [1, 0] → binary 10 → decimal 2.",
      "Use that index to pick the corresponding data input from the array.",
      "In Python: index = int(''.join(map(str, select_bits)), 2).",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "4-to-1 MUX",
        input: "2\n1 0\n0 1 1 0",
        expectedOutput: "1",
        explanation:
          "Select bits 1,0 → binary 10 → index 2. Data[2] = 1.",
      },
      {
        id: 2,
        name: "2-to-1 MUX",
        input: "1\n0\n1 0",
        expectedOutput: "1",
        explanation:
          "Select bit 0 → index 0. Data[0] = 1.",
      },
    ],
    starterCode: {
      python: `n = int(input())
select_bits = list(map(int, input().split()))
data_inputs = list(map(int, input().split()))

# TODO: convert select_bits to a decimal index, then print data_inputs[index]
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', l => lines.push(l.trim()));
rl.on('close', () => {
  const n = parseInt(lines[0]);
  const selectBits = lines[1].split(' ').map(Number);
  const dataInputs = lines[2].split(' ').map(Number);
  // TODO: compute index from selectBits and print dataInputs[index]
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] sel = new int[n];
        for (int i = 0; i < n; i++) sel[i] = sc.nextInt();
        int total = 1 << n;
        int[] data = new int[total];
        for (int i = 0; i < total; i++) data[i] = sc.nextInt();
        // TODO: convert sel[] to index, print data[index]
    }
}
`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n; cin >> n;
    int sel[4], data[16];
    for (int i = 0; i < n; i++) cin >> sel[i];
    int total = 1 << n;
    for (int i = 0; i < total; i++) cin >> data[i];
    // TODO: compute index from sel[], print data[index]
    return 0;
}
`,
      c: `#include <stdio.h>

int main() {
    int n; scanf("%d", &n);
    int sel[4], data[16];
    for (int i = 0; i < n; i++) scanf("%d", &sel[i]);
    int total = 1 << n;
    for (int i = 0; i < total; i++) scanf("%d", &data[i]);
    // TODO: compute index from sel[], print data[index]
    return 0;
}
`,
    },
  },

  /* 26 ── Seven-Segment Display Decoder (Medium) */
  {
    id: "seven-segment-display-decoder",
    title: "Seven-Segment Display Decoder",
    domain: "ECE",
    difficulty: "Medium",
    topics: "Digital Electronics · Binary Numbers · Conditions",
    summary:
      "Convert a decimal digit (0–9) to the seven-segment display encoding showing which segments are ON.",
    description: `## Real-World Scenario
**Seven-segment displays** are the glowing digit panels you see on digital clocks, microwave timers, and elevator floor indicators. Each display has 7 LED segments labelled **a** through **g**. Different combinations of ON/OFF segments form different digits.

\`\`\`
  ─ a ─
 |     |
 f     b
 |     |
  ─ g ─
 |     |
 e     c
 |     |
  ─ d ─
\`\`\`

For example, to display the digit **7**, segments a, b, and c are ON and the rest are OFF.

## Beginner Tip
You can store the segment patterns for digits 0–9 in an array or dictionary. Each entry is a 7-character string like "1111110" where each character represents segment a–g in order (1 = ON, 0 = OFF).

## Task
Given a decimal digit (0–9), output a 7-character string representing the segments a through g, where '1' means the segment is ON and '0' means it is OFF.`,
    inputFormat: `A single integer d (0 ≤ d ≤ 9).`,
    outputFormat: `A 7-character string of '0's and '1's representing segments a, b, c, d, e, f, g in order.`,
    constraints: [
      "0 ≤ d ≤ 9.",
      "Segment order is always a, b, c, d, e, f, g.",
    ],
    hints: [
      "Create a lookup table (array or map) with 10 entries, one per digit.",
      "The classic segment encodings are: 0→1111110, 1→0110000, 2→1101101, 3→1111001, 4→0110011, 5→1011011, 6→1011111, 7→1110000, 8→1111111, 9→1111011.",
      "Just index into your table with the input digit and print the result.",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Digit 0",
        input: "0",
        expectedOutput: "1111110",
        explanation:
          "For digit 0, segments a,b,c,d,e,f are ON and g is OFF → 1111110.",
      },
      {
        id: 2,
        name: "Digit 5",
        input: "5",
        expectedOutput: "1011011",
        explanation:
          "For digit 5, segments a,c,d,f,g are ON → 1011011.",
      },
    ],
    starterCode: {
      python: `d = int(input())

# Seven-segment lookup table for digits 0-9 (segments a-g)
segments = [
    # TODO: fill in the segment patterns
]

print(segments[d])
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', line => {
  const d = parseInt(line.trim());
  const segments = [
    // TODO: fill in segment patterns for 0-9
  ];
  console.log(segments[d]);
  rl.close();
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int d = sc.nextInt();
        String[] segments = {
            // TODO: fill in segment patterns for 0-9
        };
        System.out.println(segments[d]);
    }
}
`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int d; cin >> d;
    string segments[] = {
        // TODO: fill in segment patterns for 0-9
    };
    cout << segments[d] << endl;
    return 0;
}
`,
      c: `#include <stdio.h>

int main() {
    int d; scanf("%d", &d);
    const char *segments[] = {
        // TODO: fill in segment patterns for 0-9
    };
    printf("%s\\n", segments[d]);
    return 0;
}
`,
    },
  },

  /* 27 ── Sensor Data Threshold Analysis (Medium) */
  {
    id: "sensor-data-threshold-analysis",
    title: "Sensor Data Threshold Analysis",
    domain: "ECE",
    difficulty: "Medium",
    topics: "Arrays · Conditions · Signal Processing",
    summary:
      "Analyze a stream of sensor readings to find all values exceeding a threshold and report statistics.",
    description: `## Real-World Scenario
In IoT and embedded systems, sensors (temperature, pressure, humidity) continuously send readings to a microcontroller. Engineers must detect when readings cross critical **thresholds** — for example, an engine overheating above 100 °C or water pressure dropping below a safe level.

Your task is to analyze a sequence of sensor readings and report useful statistics about threshold violations.

## Beginner Tip
This is essentially an **array filtering** problem. Loop through the readings, check each against the threshold, and keep track of:
- How many readings exceed the threshold.
- The maximum reading.
- The average of all readings.

## Task
Given an array of N sensor readings (integers) and a threshold value T, output:
1. The count of readings **strictly greater than** T.
2. The maximum reading in the entire array.
3. The average of all readings, rounded to 2 decimal places.`,
    inputFormat: `Line 1: Two space-separated integers N (number of readings) and T (threshold).
Line 2: N space-separated integers — the sensor readings.`,
    outputFormat: `Line 1: An integer — the count of readings > T.
Line 2: An integer — the maximum reading.
Line 3: A float — the average of all readings, rounded to 2 decimal places.`,
    constraints: [
      "1 ≤ N ≤ 10,000",
      "-1,000 ≤ each reading ≤ 10,000",
      "-1,000 ≤ T ≤ 10,000",
    ],
    hints: [
      "Use a single loop to compute count, max, and sum all at once.",
      "For the average, divide the total sum by N. Be careful with integer division — cast to float/double.",
      "Use language-specific rounding: Python round(val, 2), JavaScript .toFixed(2), Java String.format(\"%.2f\", val).",
    ],
    sampleTestCases: [
      {
        id: 1,
        name: "Temperature readings",
        input: "6 75\n60 80 72 90 65 78",
        expectedOutput: "3\n90\n74.17",
        explanation:
          "Readings > 75: 80, 90, 78 → count = 3. Max = 90. Average = (60+80+72+90+65+78)/6 = 445/6 = 74.17.",
      },
      {
        id: 2,
        name: "All below threshold",
        input: "4 100\n20 30 40 50",
        expectedOutput: "0\n50\n35.00",
        explanation:
          "No reading exceeds 100. Max = 50. Average = 140/4 = 35.00.",
      },
    ],
    starterCode: {
      python: `n, t = map(int, input().split())
readings = list(map(int, input().split()))

count = 0
max_val = readings[0]
total = 0

# TODO: loop through readings and compute count, max_val, total

print(count)
print(max_val)
print(f"{total / n:.2f}")
`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', l => lines.push(l.trim()));
rl.on('close', () => {
  const [n, t] = lines[0].split(' ').map(Number);
  const readings = lines[1].split(' ').map(Number);
  let count = 0, maxVal = readings[0], total = 0;
  // TODO: loop and compute
  console.log(count);
  console.log(maxVal);
  console.log((total / n).toFixed(2));
});
`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), t = sc.nextInt();
        int[] readings = new int[n];
        for (int i = 0; i < n; i++) readings[i] = sc.nextInt();
        int count = 0, maxVal = readings[0], total = 0;
        // TODO: loop and compute count, maxVal, total
        System.out.println(count);
        System.out.println(maxVal);
        System.out.printf("%.2f%n", (double) total / n);
    }
}
`,
      cpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n, t; cin >> n >> t;
    int readings[10000];
    for (int i = 0; i < n; i++) cin >> readings[i];
    int count = 0, maxVal = readings[0], total = 0;
    // TODO: loop and compute
    cout << count << endl;
    cout << maxVal << endl;
    cout << fixed << setprecision(2) << (double)total / n << endl;
    return 0;
}
`,
      c: `#include <stdio.h>

int main() {
    int n, t; scanf("%d %d", &n, &t);
    int readings[10000];
    for (int i = 0; i < n; i++) scanf("%d", &readings[i]);
    int count = 0, maxVal = readings[0], total = 0;
    // TODO: loop and compute
    printf("%d\\n", count);
    printf("%d\\n", maxVal);
    printf("%.2f\\n", (double)total / n);
    return 0;
}
`,
    },
  },
];

/**
 * Find a problem by its unique string ID.
 * Falls back to the first problem if no match is found.
 */
export const getProblemById = (id) =>
  problemsData.find((p) => p.id === id) || problemsData[0];
