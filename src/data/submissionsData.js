/**
 * Zentrion Skill OS - Submission History Dataset
 * Sample data for frontend demonstration, structured for backend API compatibility.
 */

export const SUBMISSION_STATUSES = {
  ACCEPTED: {
    key: "ACCEPTED",
    label: "Accepted",
    color: "#059669",
    bgColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.3)",
    icon: "✓",
  },
  WRONG_ANSWER: {
    key: "WRONG_ANSWER",
    label: "Wrong Answer",
    color: "#dc2626",
    bgColor: "rgba(239, 68, 68, 0.12)",
    borderColor: "rgba(239, 68, 68, 0.3)",
    icon: "✗",
  },
  TIME_LIMIT_EXCEEDED: {
    key: "TIME_LIMIT_EXCEEDED",
    label: "Time Limit Exceeded",
    color: "#d97706",
    bgColor: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.3)",
    icon: "⏱",
  },
  COMPILATION_ERROR: {
    key: "COMPILATION_ERROR",
    label: "Compilation Error",
    color: "#7c3aed",
    bgColor: "rgba(124, 58, 237, 0.12)",
    borderColor: "rgba(124, 58, 237, 0.3)",
    icon: "⚠",
  },
  RUNTIME_ERROR: {
    key: "RUNTIME_ERROR",
    label: "Runtime Error",
    color: "#e11d48",
    bgColor: "rgba(225, 29, 72, 0.12)",
    borderColor: "rgba(225, 29, 72, 0.3)",
    icon: "⚡",
  },
  PENDING: {
    key: "PENDING",
    label: "Pending",
    color: "#2563eb",
    bgColor: "rgba(37, 99, 235, 0.12)",
    borderColor: "rgba(37, 99, 235, 0.3)",
    icon: "⏳",
  },
};

export const sampleSubmissions = [
  {
    id: "SUB-94021",
    problemId: "smart-parking-allocation",
    problemTitle: "Smart Parking Allocation",
    domain: "Computer Science",
    difficulty: "Easy",
    language: "Python 3",
    languageId: "python",
    submittedAt: "2026-11-06 09:42:15",
    timestamp: 1794025335000,
    status: "ACCEPTED",
    executionTime: "38 ms",
    memoryUsed: "14.2 MB",
    code: `import sys
import heapq

def allocate_parking(n, slots, queries):
    tiers = {1: [], 2: [], 3: []}
    slot_tier = {}
    
    for idx, cap in enumerate(slots, 1):
        heapq.heappush(tiers[cap], idx)
        slot_tier[idx] = cap
        
    occupied = {}
    results = []
    
    for q in queries:
        parts = q.strip().split()
        op = parts[0]
        
        if op == "ALLOCATE":
            v_size = int(parts[1])
            best_slot = None
            best_tier = None
            
            for t in range(v_size, 4):
                if tiers[t]:
                    cand = tiers[t][0]
                    if best_slot is None or cand < best_slot:
                        best_slot = cand
                        best_tier = t
                        
            if best_slot is not None:
                heapq.heappop(tiers[best_tier])
                occupied[best_slot] = best_tier
                results.append(str(best_slot))
            else:
                results.append("-1")
                
        elif op == "RELEASE":
            s_idx = int(parts[1])
            if s_idx in occupied:
                t = occupied.pop(s_idx)
                heapq.heappush(tiers[t], s_idx)
                results.append(f"RELEASED {s_idx}")
            else:
                results.append("INVALID")
                
    return results`,
    testCases: [
      {
        id: 1,
        name: "Sample Case 1: Sequential Allocation",
        status: "PASSED",
        input: "5\\n1 2 2 3 1\\n4\\nALLOCATE 2\\nALLOCATE 1\\nRELEASE 2\\nALLOCATE 2",
        expectedOutput: "2\\n1\\nRELEASED 2\\n2",
        actualOutput: "2\\n1\\nRELEASED 2\\n2",
        runtime: "12 ms",
      },
      {
        id: 2,
        name: "Sample Case 2: Full Capacity Rejection",
        status: "PASSED",
        input: "3\\n1 1 2\\n3\\nALLOCATE 3\\nALLOCATE 2\\nALLOCATE 1",
        expectedOutput: "-1\\n3\\n1",
        actualOutput: "-1\\n3\\n1",
        runtime: "14 ms",
      },
      {
        id: 3,
        name: "Benchmark Case 3: High Frequency Operations",
        status: "PASSED",
        input: "[10,000 Operations Stream]",
        expectedOutput: "[System Output Match]",
        actualOutput: "[System Output Match]",
        runtime: "38 ms",
      },
    ],
    errorDetails: null,
  },
  {
    id: "SUB-93884",
    problemId: "campus-route-optimizer",
    problemTitle: "Campus Route Optimizer",
    domain: "Computer Science",
    difficulty: "Medium",
    language: "C++ (C++20)",
    languageId: "cpp",
    submittedAt: "2026-11-06 09:15:30",
    timestamp: 1794023730000,
    status: "ACCEPTED",
    executionTime: "22 ms",
    memoryUsed: "9.8 MB",
    code: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const long long INF = 1e18;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int v, e;
    if (!(cin >> v >> e)) return 0;

    vector<vector<pair<int, int>>> adj(v + 1);
    for (int i = 0; i < e; i++) {
        int u, to, w;
        cin >> u >> to >> w;
        adj[u].push_back({to, w});
    }

    int start, dest;
    cin >> start >> dest;

    vector<long long> dist(v + 1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue;
        if (u == dest) break;

        for (auto &[nxt, weight] : adj[u]) {
            if (dist[u] + weight < dist[nxt]) {
                dist[nxt] = dist[u] + weight;
                pq.push({dist[nxt], nxt});
            }
        }
    }

    cout << (dist[dest] == INF ? -1 : dist[dest]) << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: 1,
        name: "Sample Case 1: Standard Campus Graph",
        status: "PASSED",
        input: "5 6\\n1 2 4\\n1 3 2\\n3 2 1\\n2 4 5\\n3 5 8\\n4 5 3\\n1 5",
        expectedOutput: "11",
        actualOutput: "11",
        runtime: "8 ms",
      },
      {
        id: 2,
        name: "Sample Case 2: Disconnected Node",
        status: "PASSED",
        input: "3 1\\n1 2 5\\n1 3",
        expectedOutput: "-1",
        actualOutput: "-1",
        runtime: "6 ms",
      },
      {
        id: 3,
        name: "Benchmark Case 3: Dense Grid Network",
        status: "PASSED",
        input: "[Graph V=10,000, E=50,000]",
        expectedOutput: "348",
        actualOutput: "348",
        runtime: "22 ms",
      },
    ],
    errorDetails: null,
  },
  {
    id: "SUB-93512",
    problemId: "machine-load-analysis",
    problemTitle: "Machine Load Analysis",
    domain: "Mechanical",
    difficulty: "Medium",
    language: "Java (OpenJDK 17)",
    languageId: "java",
    submittedAt: "2026-11-05 18:30:12",
    timestamp: 1793970612000,
    status: "WRONG_ANSWER",
    executionTime: "64 ms",
    memoryUsed: "28.4 MB",
    code: `import java.io.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String first = br.readLine();
        if (first == null) return;
        
        StringTokenizer st = new StringTokenizer(first);
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        long threshold = Long.parseLong(st.nextToken());

        String[] tokens = br.readLine().trim().split("\\\\s+");
        long[] readings = new long[n];
        for (int i = 0; i < n; i++) readings[i] = Long.parseLong(tokens[i]);

        List<Integer> violations = new ArrayList<>();
        // Bug: Window boundary off-by-one error in average calculation
        for (int i = 0; i <= n - k; i++) {
            long max = readings[i];
            for (int j = i; j < i + k; j++) {
                if (readings[j] > max) max = readings[j];
            }
            if (max > threshold) {
                violations.add(i); // Note: 0-based instead of expected 1-based index
            }
        }
        
        if (violations.isEmpty()) System.out.println("ALL_SAFE");
        else {
            StringBuilder sb = new StringBuilder();
            for (int v : violations) sb.append(v).append(" ");
            System.out.println(sb.toString().trim());
        }
    }
}`,
    testCases: [
      {
        id: 1,
        name: "Sample Case 1: Standard Load Spike",
        status: "FAILED",
        input: "8 3 50\\n40 45 55 52 48 30 70 65",
        expectedOutput: "1 2 3 6",
        actualOutput: "0 1 2 5",
        runtime: "28 ms",
      },
      {
        id: 2,
        name: "Sample Case 2: Completely Safe Shift",
        status: "PASSED",
        input: "5 2 100\\n20 30 25 40 35",
        expectedOutput: "ALL_SAFE",
        actualOutput: "ALL_SAFE",
        runtime: "22 ms",
      },
    ],
    errorDetails: "Output mismatch on Test Case 1:\nExpected: 1 2 3 6\nActual Output: 0 1 2 5\n(Hint: Review zero-based versus 1-based index expectations in output format)",
  },
  {
    id: "SUB-93105",
    problemId: "traffic-flow-planning",
    problemTitle: "Traffic Flow Planning",
    domain: "Civil",
    difficulty: "Medium",
    language: "Python 3",
    languageId: "python",
    submittedAt: "2026-11-05 16:45:00",
    timestamp: 1793964300000,
    status: "TIME_LIMIT_EXCEEDED",
    executionTime: "2005 ms",
    memoryUsed: "48.6 MB",
    code: `import sys

def dfs_augment(graph, u, t, visited, flow):
    if u == t:
        return flow
    visited.add(u)
    for v in graph[u]:
        cap = graph[u][v]
        if v not in visited and cap > 0:
            pushed = dfs_augment(graph, v, t, visited, min(flow, cap))
            if pushed > 0:
                graph[u][v] -= pushed
                graph[v][u] += pushed
                return pushed
    return 0

# Unoptimized Ford-Fulkerson with DFS on large unit network
def solve():
    lines = sys.stdin.read().splitlines()
    if not lines: return
    n, m = map(int, lines[0].split())
    # DFS without scaling leads to O(E * max_flow) bottleneck`,
    testCases: [
      {
        id: 1,
        name: "Sample Case 1: Small Junction Grid",
        status: "PASSED",
        input: "4 5\\n1 2 1000\\n1 3 800\\n2 3 400\\n2 4 700\\n3 4 900\\n1 4",
        expectedOutput: "1600",
        actualOutput: "1600",
        runtime: "18 ms",
      },
      {
        id: 2,
        name: "Stress Benchmark Case 2: Large High-Capacity Bipartite Graph",
        status: "TIME_LIMIT",
        input: "[500 Nodes, 5000 Edges]",
        expectedOutput: "[Computed Max Flow]",
        actualOutput: "[Execution Timed Out]",
        runtime: "2005 ms",
      },
    ],
    errorDetails: "Time Limit Exceeded: Process terminated after exceeding the maximum allowable wall-clock limit of 2.000s.\nOptimization Suggestion: Consider replacing DFS-based Ford-Fulkerson with Dinic's Algorithm or Edmonds-Karp with BFS.",
  },
  {
    id: "SUB-92942",
    problemId: "signal-noise-detection",
    problemTitle: "Signal Noise Detection",
    domain: "ECE",
    difficulty: "Easy",
    language: "C (C17)",
    languageId: "c",
    submittedAt: "2026-11-05 14:12:08",
    timestamp: 1793955128000,
    status: "COMPILATION_ERROR",
    executionTime: "—",
    memoryUsed: "—",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, delta;
    if (scanf("%d %d", &n, &delta) != 2) return 0;

    int *sig = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &sig[i]);
    }

    int glitch_count = 0
    int glitches[1000];

    for (int i = 1; i < n - 1; i++) {
        int median = sig[i-1];
        if (abs(sig[i] - median) > delta) {
            glitches[glitch_count++] = i + 1;
        }
    }
    return 0;
}`,
    testCases: [],
    errorDetails: `solution.c: In function 'main':
solution.c:13:25: error: expected ';' before 'int'
   13 |     int glitch_count = 0
      |                         ^
      |                         ;
   14 |     int glitches[1000];
      |     ~~~
solution.c:18:13: warning: implicit declaration of function 'abs' [-Wimplicit-function-declaration]
   18 |         if (abs(sig[i] - median) > delta) {
      |             ^~~
solution.c:3:1: note: include '<stdlib.h>' or provide a declaration of 'abs'`,
  },
  {
    id: "SUB-92608",
    problemId: "structural-load-scenario",
    problemTitle: "Structural Load Scenario",
    domain: "Civil",
    difficulty: "Hard",
    language: "JavaScript (Node.js)",
    languageId: "javascript",
    submittedAt: "2026-11-04 20:10:45",
    timestamp: 1793890245000,
    status: "RUNTIME_ERROR",
    executionTime: "45 ms",
    memoryUsed: "18.2 MB",
    code: `const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
  const length = parseFloat(lines[0]);
  const p = parseInt(lines[1]);
  
  // Bug: Accessing undefined index when point loads array is empty
  const [load, dist] = lines[2].split(' ').map(Number);
  const r_b = (load * dist) / length;
  const r_a = load - r_b;
  console.log(r_a.toFixed(2), r_b.toFixed(2));
}

solve();`,
    testCases: [
      {
        id: 1,
        name: "Corner Case: Zero Point Loads (UDL Only)",
        status: "ERROR",
        input: "12.0\\n0\\n1\\n10.0 0.0 12.0",
        expectedOutput: "60.00 60.00 180.00",
        actualOutput: "TypeError: Cannot read properties of undefined (reading 'split')",
        runtime: "45 ms",
      },
    ],
    errorDetails: `TypeError: Cannot read properties of undefined (reading 'split')
    at solve (/tmp/submission/solution.js:8:33)
    at Object.<anonymous> (/tmp/submission/solution.js:14:1)
    at Module._compile (node:internal/modules/cjs/loader:1256:14)`,
  },
  {
    id: "SUB-92415",
    problemId: "smart-parking-allocation",
    problemTitle: "Smart Parking Allocation",
    domain: "Computer Science",
    difficulty: "Easy",
    language: "Java (OpenJDK 17)",
    languageId: "java",
    submittedAt: "2026-11-04 19:55:00",
    timestamp: 1793889300000,
    status: "PENDING",
    executionTime: "—",
    memoryUsed: "—",
    code: `import java.io.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) throws IOException {
        // Enqueued for automated test bench evaluation
    }
}`,
    testCases: [],
    errorDetails: "Submission currently in judge queue. Awaiting execution slot on testing cluster.",
  },
  {
    id: "SUB-91910",
    problemId: "campus-route-optimizer",
    problemTitle: "Campus Route Optimizer",
    domain: "Computer Science",
    difficulty: "Medium",
    language: "Python 3",
    languageId: "python",
    submittedAt: "2026-11-04 15:20:10",
    timestamp: 1793872810000,
    status: "ACCEPTED",
    executionTime: "42 ms",
    memoryUsed: "15.1 MB",
    code: `import sys, heapq

def solve():
    lines = sys.stdin.read().splitlines()
    if not lines: return
    v, e = map(int, lines[0].split())
    adj = [[] for _ in range(v + 1)]
    for i in range(1, e + 1):
        u, to, w = map(int, lines[i].split())
        adj[u].append((to, w))
    s, d = map(int, lines[e + 1].split())
    
    dist = [float('inf')] * (v + 1)
    dist[s] = 0
    pq = [(0, s)]
    
    while pq:
        cur_d, u = heapq.heappop(pq)
        if cur_d > dist[u]: continue
        if u == d: return cur_d
        for nxt, w in adj[u]:
            if cur_d + w < dist[nxt]:
                dist[nxt] = cur_d + w
                heapq.heappush(pq, (dist[nxt], nxt))
    return -1

print(solve())`,
    testCases: [
      {
        id: 1,
        name: "Standard Campus Navigation",
        status: "PASSED",
        input: "5 6\\n1 2 4\\n1 3 2\\n3 2 1\\n2 4 5\\n3 5 8\\n4 5 3\\n1 5",
        expectedOutput: "11",
        actualOutput: "11",
        runtime: "14 ms",
      },
    ],
    errorDetails: null,
  },
  {
    id: "SUB-91450",
    problemId: "machine-load-analysis",
    problemTitle: "Machine Load Analysis",
    domain: "Mechanical",
    difficulty: "Medium",
    language: "C++ (C++20)",
    languageId: "cpp",
    submittedAt: "2026-11-03 21:05:32",
    timestamp: 1793807132000,
    status: "ACCEPTED",
    executionTime: "18 ms",
    memoryUsed: "8.4 MB",
    code: `#include <iostream>
#include <vector>
#include <deque>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    long long threshold;
    if (!(cin >> n >> k >> threshold)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    deque<int> dq;
    vector<int> violations;

    for (int i = 0; i < n; i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);

        if (i >= k - 1) {
            if (a[dq.front()] > threshold) {
                violations.push_back(i - k + 2); // 1-based start
            }
        }
    }

    if (violations.empty()) {
        cout << "ALL_SAFE\\n";
    } else {
        for (int i = 0; i < (int)violations.size(); i++) {
            cout << violations[i] << (i + 1 == (int)violations.size() ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`,
    testCases: [
      {
        id: 1,
        name: "Standard Load Spike Detection",
        status: "PASSED",
        input: "8 3 50\\n40 45 55 52 48 30 70 65",
        expectedOutput: "1 2 3 6",
        actualOutput: "1 2 3 6",
        runtime: "8 ms",
      },
    ],
    errorDetails: null,
  },
  {
    id: "SUB-91102",
    problemId: "signal-noise-detection",
    problemTitle: "Signal Noise Detection",
    domain: "ECE",
    difficulty: "Easy",
    language: "Python 3",
    languageId: "python",
    submittedAt: "2026-11-03 17:40:15",
    timestamp: 1793794815000,
    status: "ACCEPTED",
    executionTime: "34 ms",
    memoryUsed: "13.9 MB",
    code: `import sys

def detect():
    lines = sys.stdin.read().splitlines()
    if not lines: return
    n, delta = map(int, lines[0].split())
    sig = list(map(int, lines[1].split()))
    
    glitches = []
    for i in range(1, n - 1):
        window = [sig[i-1], sig[i], sig[i+1]]
        median = sorted(window)[1]
        if abs(sig[i] - median) > delta:
            glitches.append(i + 1)
            
    if glitches:
        print(len(glitches))
        print(" ".join(map(str, glitches)))
    else:
        print("0\\nCLEAN_SIGNAL")

detect()`,
    testCases: [
      {
        id: 1,
        name: "EMI Spikes in Temperature Sensor",
        status: "PASSED",
        input: "6 15\\n100 102 180 101 99 103",
        expectedOutput: "1\\n3",
        actualOutput: "1\\n3",
        runtime: "12 ms",
      },
    ],
    errorDetails: null,
  },
  {
    id: "SUB-90820",
    problemId: "traffic-flow-planning",
    problemTitle: "Traffic Flow Planning",
    domain: "Civil",
    difficulty: "Medium",
    language: "Java (OpenJDK 17)",
    languageId: "java",
    submittedAt: "2026-11-02 11:20:00",
    timestamp: 1793685600000,
    status: "WRONG_ANSWER",
    executionTime: "58 ms",
    memoryUsed: "24.1 MB",
    code: `import java.io.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Greedy flow heuristic without residual back-edge capability
    }
}`,
    testCases: [
      {
        id: 1,
        name: "Standard Grid Network",
        status: "FAILED",
        input: "4 5\\n1 2 1000\\n1 3 800\\n2 3 400\\n2 4 700\\n3 4 900\\n1 4",
        expectedOutput: "1600",
        actualOutput: "1400",
        runtime: "25 ms",
      },
    ],
    errorDetails: "Output Mismatch on Test Case 1: Expected '1600', got '1400'. Back-flow residual edges required.",
  },
  {
    id: "SUB-90510",
    problemId: "structural-load-scenario",
    problemTitle: "Structural Load Scenario",
    domain: "Civil",
    difficulty: "Hard",
    language: "C++ (C++20)",
    languageId: "cpp",
    submittedAt: "2026-11-01 16:30:45",
    timestamp: 1793617845000,
    status: "ACCEPTED",
    executionTime: "25 ms",
    memoryUsed: "10.2 MB",
    code: `#include <iostream>
#include <iomanip>

using namespace std;

int main() {
    double l;
    if (!(cin >> l)) return 0;

    int p;
    cin >> p;
    double sum_mom_A = 0, sum_w = 0;
    for (int i = 0; i < p; i++) {
        double w, d;
        cin >> w >> d;
        sum_w += w;
        sum_mom_A += w * d;
    }

    int u;
    cin >> u;
    for (int i = 0; i < u; i++) {
        double w, s, e;
        cin >> w >> s >> e;
        double total_udl = w * (e - s);
        double centroid = (s + e) / 2.0;
        sum_w += total_udl;
        sum_mom_A += total_udl * centroid;
    }

    double r_b = sum_mom_A / l;
    double r_a = sum_w - r_b;
    double max_m = (r_a * l / 2.0); // Sample central point load approximation

    cout << fixed << setprecision(2) << r_a << " " << r_b << " " << max_m << "\\n";
    return 0;
}`,
    testCases: [
      {
        id: 1,
        name: "Symmetric Point Load Beam",
        status: "PASSED",
        input: "10.0\\n1\\n50.0 5.0\\n0",
        expectedOutput: "25.00 25.00 125.00",
        actualOutput: "25.00 25.00 125.00",
        runtime: "10 ms",
      },
    ],
    errorDetails: null,
  },
];

export const calculateSubmissionStats = (submissions) => {
  const total = submissions.length;
  const accepted = submissions.filter((s) => s.status === "ACCEPTED").length;
  const wrongAnswer = submissions.filter((s) => s.status === "WRONG_ANSWER").length;
  const successRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : "0.0";

  return {
    total,
    accepted,
    wrongAnswer,
    successRate: `${successRate}%`,
  };
};

