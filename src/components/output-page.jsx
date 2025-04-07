"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Sparkles, ArrowLeft } from "lucide-react"
import SimilarCompanies from "@/components/similar-companies"
import AnalysisReport from "@/components/analysis-report"
import { Button } from "@/components/ui/button"

export default function Output({ isLoading, results, analysis, idea, onNewIdea }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={onNewIdea}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

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
                      <p className="p-3 text-xs text-center text-muted-foreground">"{idea}"</p>
                    </div>
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    {results && (
                      <SimilarCompanies idea={idea} results={results.results} />
                    )}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    {analysis && (
                      <AnalysisReport analysis={analysis.analysis} />
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
