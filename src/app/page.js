"use client"

import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import IdeaForm from "@/components/idea-form"
import SimilarCompanies from "@/components/results"
import AnalysisReport from "@/components/analysis-report"
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
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Startup Similarity & Analysis Tool</h1>
        </div>

        <IdeaForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="p-4 my-6 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {results && <SimilarCompanies idea={idea} results={results.results} />}

          {analysis && <AnalysisReport analysis={analysis.analysis} />}
        </div>
      </div>
    </main>
  )
}