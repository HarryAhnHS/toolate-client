"use client"

import { useState } from "react"
import IdeaForm from "@/components/idea-form"
import Output from "@/components/output"
import { fetchSimilarCompanies, fetchAnalysis } from "@/api/api"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = async (ideaText) => {
    setIdea(ideaText)
    setIsLoading(true)
    setError(null)
    setResults(null)
    setAnalysis(null)
    setShowResults(true)

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

  const handleNewIdea = () => {
    setShowResults(false)
    setIdea("")
    setResults(null)
    setAnalysis(null)
    setError(null)
  }

  return (
    <main className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <IdeaForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="min-h-screen"
          >
            <div className="flex-1">
              <Output 
                isLoading={isLoading}
                results={results}
                analysis={analysis}
                idea={idea}
                onNewIdea={handleNewIdea}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 mx-auto max-w-2xl w-full">
                {error}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}