"use client"

import { useState } from "react"
import IdeaForm from "@/components/idea-form"
import Output from "@/components/output"
import { fetchSimilarCompanies, fetchAnalysis } from "@/api/api"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (ideaText) => {
    setIdea(ideaText)
    setIsLoading(true)
    setError(null)
    setResults(null)
    setAnalysis(null)

    try {
      // Step 1: Fetch similar companies
      const similarCompanies = await fetchSimilarCompanies(ideaText)
      setResults(similarCompanies)

      // Step 2: Get analysis based on similar companies
      const analysisData = await fetchAnalysis(ideaText, similarCompanies.results)
      setAnalysis(analysisData)
    } catch (err) {
      setError(err.message || "An error occurred while analyzing your idea")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col">
      <div className="flex-1">
        <IdeaForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
        />
        <Output 
          isLoading={isLoading}
          results={results}
          analysis={analysis}
          idea={idea}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 mx-auto max-w-2xl w-full">
          {error}
        </div>
      )}      
    </main>
  )
}