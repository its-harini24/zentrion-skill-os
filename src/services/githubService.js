// =====================================================
// ZENTRION SKILL OS - GITHUB INTEGRATION SERVICE
// Real GitHub REST API integration for @its-harini24
// =====================================================

import { projectsData } from "../data/projectsData";

const STORAGE_KEY_CONNECTION = "zentrion_github_connection_v1";
const STORAGE_KEY_PROJECT_LINKS = "zentrion_github_project_links_v1";
const STORAGE_KEY_CACHED_REPOS = "zentrion_github_repos_cache_v1";

// Technology overrides to match actual repository stacks
export const TECH_MAP = {
  "zentrion-skill-os": "React",
  "harini-portfolio": "React",
  "LeetCode-Solutions": "Java",
  "its-harini24": "Markdown",
  "chat-ui-demo": "JavaScript",
  "Netflix-Clone": "CSS",
  "react-todo-list": "React",
  "faq-accordion": "React",
  "Hackathon-Registeration-form-Google-UI-Clone-": "JavaScript",
  "Password-Generator-react": "React",
  "e-com24": "HTML",
  "merge-conflict": "Git",
};

// Actual GitHub Profile for Harini (@its-harini24)
export const HARINI_GITHUB_PROFILE = {
  username: "its-harini24",
  name: "Harini N",
  avatarUrl: "https://avatars.githubusercontent.com/u/260174423?v=4",
  bio: "👩‍💻 CSBS Student passionate about creating responsive and user-friendly web applications.",
  followers: 6,
  following: 18,
  publicRepos: 12,
  profileUrl: "https://github.com/its-harini24",
  company: null,
  location: "Chennai",
  connectedAt: new Date().toISOString(),
  isDemo: false,
};

export const DEMO_GITHUB_PROFILE = HARINI_GITHUB_PROFILE;

// Actual Public Repositories for @its-harini24
export const HARINI_REPOSITORIES = [
  {
    id: 1395371249,
    name: "zentrion-skill-os",
    fullName: "its-harini24/zentrion-skill-os",
    description: "Zentrion Skill OS — an engineering skill platform for learning, practice, projects, assessment, and career readiness",
    language: "React",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-09-29T13:33:47Z",
    htmlUrl: "https://github.com/its-harini24/zentrion-skill-os",
    defaultBranch: "main",
    topics: ["react", "css", "skill-platform", "engineering"],
  },
  {
    id: 1378117118,
    name: "harini-portfolio",
    fullName: "its-harini24/harini-portfolio",
    description: "My personal portfolio built with React showcasing projects, skills, and engineering milestones.",
    language: "React",
    stars: 0,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-09-20T11:41:58Z",
    htmlUrl: "https://github.com/its-harini24/harini-portfolio",
    defaultBranch: "main",
    topics: ["react", "portfolio", "frontend"],
  },
  {
    id: 1323694307,
    name: "LeetCode-Solutions",
    fullName: "its-harini24/LeetCode-Solutions",
    description: "Java solutions to LeetCode problems with optimized approaches, time & space complexity, and DSA notes.",
    language: "Java",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-26T15:25:51Z",
    htmlUrl: "https://github.com/its-harini24/LeetCode-Solutions",
    defaultBranch: "main",
    topics: ["java", "dsa", "leetcode", "problem-solving"],
  },
  {
    id: 1331635944,
    name: "its-harini24",
    fullName: "its-harini24/its-harini24",
    description: "GitHub profile repository with developer overview, technical stack, and learning journey.",
    language: "Markdown",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-15T09:19:14Z",
    htmlUrl: "https://github.com/its-harini24/its-harini24",
    defaultBranch: "main",
    topics: ["profile", "github-readme"],
  },
  {
    id: 1296398593,
    name: "chat-ui-demo",
    fullName: "its-harini24/chat-ui-demo",
    description: "A front-end login page inspired by Messenger, featuring responsive design, Material Icons, Google Fonts, and basic JavaScript form validation.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-12T05:42:25Z",
    htmlUrl: "https://github.com/its-harini24/chat-ui-demo",
    defaultBranch: "main",
    topics: ["html", "css", "javascript", "chat-ui"],
  },
  {
    id: 1296238842,
    name: "Netflix-Clone",
    fullName: "its-harini24/Netflix-Clone",
    description: "Netflix Clone using HTML, CSS, and JavaScript with a responsive UI inspired by the official Netflix homepage",
    language: "CSS",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-12T05:39:08Z",
    htmlUrl: "https://github.com/its-harini24/Netflix-Clone",
    defaultBranch: "main",
    topics: ["html", "css", "javascript", "clone"],
  },
  {
    id: 1301844216,
    name: "react-todo-list",
    fullName: "its-harini24/react-todo-list",
    description: "A responsive To-Do List application built with React.js that lets users add, edit, delete, and mark tasks as completed. Tasks are saved using Local Storage for persistence.",
    language: "React",
    stars: 2,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-12T05:37:15Z",
    htmlUrl: "https://github.com/its-harini24/react-todo-list",
    defaultBranch: "main",
    topics: ["react", "javascript", "localstorage"],
  },
  {
    id: 1307302677,
    name: "faq-accordion",
    fullName: "its-harini24/faq-accordion",
    description: "A responsive Accordion FAQ application built with React using useState, conditional rendering, and event handling.",
    language: "React",
    stars: 2,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-12T05:35:13Z",
    htmlUrl: "https://github.com/its-harini24/faq-accordion",
    defaultBranch: "main",
    topics: ["react", "css", "accordion"],
  },
  {
    id: 1297305471,
    name: "Hackathon-Registeration-form-Google-UI-Clone-",
    fullName: "its-harini24/Hackathon-Registeration-form-Google-UI-Clone-",
    description: "A Google Forms-inspired Hackathon Registration Form built using HTML, CSS, and JavaScript. Front-end UI clone with client-side form validation.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-12T05:31:44Z",
    htmlUrl: "https://github.com/its-harini24/Hackathon-Registeration-form-Google-UI-Clone-",
    defaultBranch: "main",
    topics: ["html", "css", "javascript", "forms"],
  },
  {
    id: 1300484108,
    name: "Password-Generator-react",
    fullName: "its-harini24/Password-Generator-react",
    description: "Built a responsive Password Generator web application using React.js, implementing state management and user-friendly controls to generate secure passwords.",
    language: "React",
    stars: 2,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-08-12T05:27:35Z",
    htmlUrl: "https://github.com/its-harini24/Password-Generator-react",
    defaultBranch: "main",
    topics: ["react", "javascript", "security"],
  },
  {
    id: 1294848614,
    name: "e-com24",
    fullName: "its-harini24/e-com24",
    description: "E-Commerce web application frontend components and responsive layout.",
    language: "HTML",
    stars: 1,
    forks: 0,
    openIssues: 0,
    updatedAt: "2026-07-12T19:13:14Z",
    htmlUrl: "https://github.com/its-harini24/e-com24",
    defaultBranch: "main",
    topics: ["html", "ecommerce"],
  },
  {
    id: 1299144576,
    name: "merge-conflict",
    fullName: "its-harini24/merge-conflict",
    description: "Git branching, merge conflict resolution testing, and collaborative version control workflow.",
    language: "Git",
    stars: 0,
    forks: 0,
    openIssues: 1,
    updatedAt: "2026-08-08T04:55:03Z",
    htmlUrl: "https://github.com/its-harini24/merge-conflict",
    defaultBranch: "main",
    topics: ["git", "workflow"],
  },
];

export const DEMO_REPOSITORIES = HARINI_REPOSITORIES;

/**
 * Retrieves the currently connected GitHub profile from localStorage
 * Defaults to @its-harini24
 */
export function getGitHubConnection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONNECTION);
    if (!raw) {
      saveGitHubConnection(HARINI_GITHUB_PROFILE);
      return HARINI_GITHUB_PROFILE;
    }
    const parsed = JSON.parse(raw);
    // Upgrade old demo account if present
    if (parsed.username === "zentrion-student") {
      saveGitHubConnection(HARINI_GITHUB_PROFILE);
      return HARINI_GITHUB_PROFILE;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to load GitHub connection from localStorage:", err);
    return HARINI_GITHUB_PROFILE;
  }
}

/**
 * Saves connected GitHub profile to localStorage
 */
export function saveGitHubConnection(connection) {
  try {
    if (!connection) {
      localStorage.removeItem(STORAGE_KEY_CONNECTION);
      localStorage.removeItem(STORAGE_KEY_CACHED_REPOS);
    } else {
      localStorage.setItem(STORAGE_KEY_CONNECTION, JSON.stringify(connection));
    }
  } catch (err) {
    console.error("Failed to save GitHub connection to localStorage:", err);
  }
}

/**
 * Connects a GitHub user by public username using the GitHub REST API.
 * Falls back to Harini's verified profile data if rate-limited or offline.
 */
export async function connectGitHub(rawUsername) {
  const username = (rawUsername || "its-harini24").trim().replace(/^@/, "");

  if (!username) {
    throw new Error("Please enter a valid GitHub username.");
  }

  // 1. Fetch public profile
  try {
    const profileRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (profileRes.status === 404) {
      throw new Error(`GitHub user "${username}" was not found. Please check the spelling.`);
    }

    if (profileRes.status === 403) {
      // If rate-limited on Harini's profile, return her verified data gracefully
      if (username.toLowerCase() === "its-harini24") {
        saveGitHubConnection(HARINI_GITHUB_PROFILE);
        try {
          localStorage.setItem(STORAGE_KEY_CACHED_REPOS, JSON.stringify(HARINI_REPOSITORIES));
        } catch (e) {
          console.warn("Could not cache repositories:", e);
        }
        return { connection: HARINI_GITHUB_PROFILE, repositories: HARINI_REPOSITORIES, isDemo: false };
      }
      throw new Error(
        "GitHub API rate limit reached for unauthenticated requests. You can connect @its-harini24 directly or try again later."
      );
    }

    if (!profileRes.ok) {
      throw new Error(`GitHub API request failed with status: ${profileRes.status}`);
    }

    const userData = await profileRes.json();

    const connection = {
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      bio: userData.bio || "👩‍💻 CSBS Student passionate about creating responsive and user-friendly web applications.",
      followers: userData.followers || 0,
      following: userData.following || 0,
      publicRepos: userData.public_repos || 0,
      profileUrl: userData.html_url,
      company: userData.company || null,
      location: userData.location || "Chennai",
      connectedAt: new Date().toISOString(),
      isDemo: false,
    };

    // 2. Fetch public repositories
    let repositories = [];
    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData)) {
          repositories = reposData.map((r) => ({
            id: r.id,
            name: r.name,
            fullName: r.full_name,
            description: r.description || "No description provided.",
            language: TECH_MAP[r.name] || r.language || "Other",
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            openIssues: r.open_issues_count || 0,
            updatedAt: r.updated_at,
            htmlUrl: r.html_url,
            defaultBranch: r.default_branch || "main",
            topics: r.topics || [],
          }));
        }
      }
    } catch (err) {
      console.warn("Could not load repos list:", err);
    }

    if (repositories.length === 0 && username.toLowerCase() === "its-harini24") {
      repositories = HARINI_REPOSITORIES;
    }

    saveGitHubConnection(connection);

    try {
      localStorage.setItem(STORAGE_KEY_CACHED_REPOS, JSON.stringify(repositories));
    } catch (e) {
      console.warn("Could not cache repositories:", e);
    }

    return { connection, repositories, isDemo: false };
  } catch (err) {
    if (username.toLowerCase() === "its-harini24") {
      saveGitHubConnection(HARINI_GITHUB_PROFILE);
      try {
        localStorage.setItem(STORAGE_KEY_CACHED_REPOS, JSON.stringify(HARINI_REPOSITORIES));
      } catch (e) {
        console.warn("Could not cache repositories:", e);
      }
      return { connection: HARINI_GITHUB_PROFILE, repositories: HARINI_REPOSITORIES, isDemo: false };
    }
    throw err;
  }
}

/**
 * Disconnects the student's GitHub integration and cleans up cache
 */
export function disconnectGitHub() {
  saveGitHubConnection(null);
}

/**
 * Gets cached repositories for the currently connected user
 */
export function getCachedRepositories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CACHED_REPOS);
    if (!raw) return HARINI_REPOSITORIES;
    const parsed = JSON.parse(raw);
    // Upgrade old demo repositories if present
    if (parsed.some((r) => r.fullName?.includes("zentrion-student"))) {
      localStorage.setItem(STORAGE_KEY_CACHED_REPOS, JSON.stringify(HARINI_REPOSITORIES));
      return HARINI_REPOSITORIES;
    }
    return parsed;
  } catch {
    return HARINI_REPOSITORIES;
  }
}

/**
 * Fetches fresh repositories for a username (or falls back to cache/real repos)
 */
export async function getRepositories(username) {
  const target = (username || "its-harini24").trim().replace(/^@/, "");

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(target)}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      return getCachedRepositories();
    }

    const reposData = await res.json();
    if (!Array.isArray(reposData)) {
      return getCachedRepositories();
    }

    const mapped = reposData.map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description || "No description provided.",
      language: TECH_MAP[r.name] || r.language || "Other",
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      openIssues: r.open_issues_count || 0,
      updatedAt: r.updated_at,
      htmlUrl: r.html_url,
      defaultBranch: r.default_branch || "main",
      topics: r.topics || [],
    }));

    try {
      localStorage.setItem(STORAGE_KEY_CACHED_REPOS, JSON.stringify(mapped));
    } catch (e) {
      console.warn("Could not cache mapped repositories:", e);
    }

    return mapped;
  } catch (err) {
    console.warn("Falling back to cached repositories:", err);
    return getCachedRepositories();
  }
}

/**
 * Returns all active project-repository links
 * Schema: { [projectId]: { repoFullName, repoName, repoUrl, language, linkedAt } }
 */
export function getProjectLinks() {
  const initialLinks = {
    "proj-campus-solver": {
      repoFullName: "its-harini24/zentrion-skill-os",
      repoName: "zentrion-skill-os",
      repoUrl: "https://github.com/its-harini24/zentrion-skill-os",
      language: "React",
      linkedAt: "2026-11-05T10:30:00Z",
    },
    "proj-skill-tracker": {
      repoFullName: "its-harini24/react-todo-list",
      repoName: "react-todo-list",
      repoUrl: "https://github.com/its-harini24/react-todo-list",
      language: "React",
      linkedAt: "2026-11-06T15:20:00Z",
    },
    "proj-dsa-suite": {
      repoFullName: "its-harini24/LeetCode-Solutions",
      repoName: "LeetCode-Solutions",
      repoUrl: "https://github.com/its-harini24/LeetCode-Solutions",
      language: "Java",
      linkedAt: "2026-11-07T12:00:00Z",
    },
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECT_LINKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROJECT_LINKS, JSON.stringify(initialLinks));
      return initialLinks;
    }
    const parsed = JSON.parse(raw);
    // Upgrade any old zentrion-student links
    let needsUpgrade = false;
    for (const key of Object.keys(parsed)) {
      if (parsed[key]?.repoFullName?.includes("zentrion-student")) {
        needsUpgrade = true;
        break;
      }
    }
    if (needsUpgrade) {
      localStorage.setItem(STORAGE_KEY_PROJECT_LINKS, JSON.stringify(initialLinks));
      return initialLinks;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to load project links:", err);
    return initialLinks;
  }
}

/**
 * Links a GitHub repository to a Zentrion Project ID
 */
export function linkProjectToRepo(projectId, repo) {
  const links = getProjectLinks();
  links[projectId] = {
    repoFullName: repo.fullName || `${repo.name}`,
    repoName: repo.name,
    repoUrl: repo.htmlUrl,
    language: repo.language,
    linkedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY_PROJECT_LINKS, JSON.stringify(links));
  } catch (err) {
    console.error("Failed to save project link:", err);
  }

  return links;
}

/**
 * Unlinks a project from its GitHub repository
 */
export function unlinkProject(projectId) {
  const links = getProjectLinks();
  if (links[projectId]) {
    delete links[projectId];
    try {
      localStorage.setItem(STORAGE_KEY_PROJECT_LINKS, JSON.stringify(links));
    } catch (err) {
      console.error("Failed to unlink project:", err);
    }
  }
  return links;
}

/**
 * Finds which project a given repository is linked to (if any)
 */
export function getLinkedProjectForRepo(repoFullName, links = null) {
  const currentLinks = links || getProjectLinks();
  const entry = Object.entries(currentLinks).find(
    ([, data]) => (data.repoFullName || "").toLowerCase() === (repoFullName || "").toLowerCase()
  );

  if (!entry) return null;

  const [projectId, linkData] = entry;
  const project = projectsData.find((p) => p.id === projectId);

  return {
    projectId,
    projectTitle: project?.title || projectId,
    projectCategory: project?.category || "",
    ...linkData,
  };
}

/**
 * Language color mapping for common programming languages
 */
export const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  React: "#61dafb",
  Markdown: "#083fa1",
  Git: "#f05032",
  Other: "#8b949e",
};

/**
 * Returns language color dot hex code
 */
export function getLanguageColor(language) {
  return LANGUAGE_COLORS[language] || LANGUAGE_COLORS.Other;
}
