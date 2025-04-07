"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Sparkles } from "lucide-react"
import SimilarCompanies from "@/components/results"
import AnalysisReport from "@/components/analysis-report"

export default function Output({ isLoading, results, analysis, idea }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <AnimatePresence>
          {(isLoading || results || analysis) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              {isLoading ? (
                <motion.div
                  className="p-6 bg-card border rounded-lg shadow-lg backdrop-blur-sm bg-opacity-95"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="h-6 w-6 text-blue-500" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Analyzing your idea...</h3>
                      <p className="text-sm text-muted-foreground">We're evaluating your startup concept</p>
                    </div>
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {results && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <SimilarCompanies idea={idea} results={results.results} />
                    </motion.div>
                  )}
                  
                  {analysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <AnalysisReport analysis={analysis.analysis} />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
