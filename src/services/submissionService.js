/**
 * Zentrion Skill OS - Submission History Service
 *
 * Designed for REST API backend integration (GET /api/v1/submissions).
 * Provides structured query filtering, sorting, and details retrieval.
 */

import { sampleSubmissions } from "../data/submissionsData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch list of submission records with optional search, filter, and sorting.
 *
 * @param {Object} options
 * @param {string} [options.searchQuery]
 * @param {string} [options.statusFilter]
 * @param {string} [options.languageFilter]
 * @param {'latest' | 'oldest'} [options.sortBy]
 * @returns {Promise<Array>} List of submissions
 */
export async function fetchSubmissions({
  searchQuery = "",
  statusFilter = "ALL",
  languageFilter = "ALL",
  sortBy = "latest",
} = {}) {
  // If backend endpoint is configured, connect to live API
  if (API_BASE_URL) {
    try {
      const queryParams = new URLSearchParams({
        query: searchQuery,
        status: statusFilter,
        language: languageFilter,
        sort: sortBy,
      });

      const response = await fetch(`${API_BASE_URL}/api/v1/submissions?${queryParams.toString()}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn("Backend submissions endpoint unreachable, using frontend demo dataset:", err);
    }
  }

  // Frontend demonstration simulation
  await new Promise((resolve) => setTimeout(resolve, 300));

  let results = [...sampleSubmissions];

  // 1. Problem Name Search Filter
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    results = results.filter(
      (sub) =>
        sub.problemTitle.toLowerCase().includes(q) ||
        sub.id.toLowerCase().includes(q) ||
        sub.domain.toLowerCase().includes(q)
    );
  }

  // 2. Status Filter
  if (statusFilter && statusFilter !== "ALL") {
    results = results.filter((sub) => sub.status === statusFilter);
  }

  // 3. Programming Language Filter
  if (languageFilter && languageFilter !== "ALL") {
    results = results.filter((sub) => sub.languageId === languageFilter);
  }

  // 4. Sorting
  results.sort((a, b) => {
    if (sortBy === "oldest") {
      return a.timestamp - b.timestamp;
    }
    return b.timestamp - a.timestamp;
  });

  return results;
}

/**
 * Fetch full submission details by ID.
 *
 * @param {string} id - e.g. 'SUB-94021'
 * @returns {Promise<Object>}
 */
export async function fetchSubmissionDetails(id) {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/submissions/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn("Backend submission details endpoint unreachable:", err);
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 150));
  const found = sampleSubmissions.find((s) => s.id === id);
  if (!found) {
    throw new Error(`Submission with ID ${id} not found.`);
  }
  return found;
}

