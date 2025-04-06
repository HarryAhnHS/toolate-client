// API service for backend communication

// Get the API base URL from environment variable or use default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

/**
 * Fetch similar companies based on the idea
 * @param {string} idea - The startup idea
 * @param {number} topK - Number of similar companies to return
 * @returns {Promise<Object>} - Similar companies data
 */
export async function fetchSimilarCompanies(idea, topK = 5) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea,
        top_k: topK,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error fetching similar companies: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching similar companies:", error)
    throw error
  }
}

/**
 * Fetch analysis based on the idea and similar companies
 * @param {string} idea - The startup idea
 * @param {Object} results - The similar companies data
 * @returns {Promise<Object>} - Analysis data
 */
export async function fetchAnalysis(idea, results) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea,
        results,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error fetching analysis: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching analysis:", error)
    throw error
  }
}