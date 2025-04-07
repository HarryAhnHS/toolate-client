"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Fingerprint, ArrowRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function AnalysisReport({ analysis }) {
  if (!analysis) return null

  console.log(analysis)

  const uniquenessScore = Number.parseInt(analysis.uniqueness_score, 10)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analysis Report</h2>
        <Badge variant={getUniquenessVariant(uniquenessScore)}>
          {uniquenessScore}% Unique
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-2 font-medium flex items-center">
            <Fingerprint className="mr-2 h-4 w-4" />
            Uniqueness Score
          </div>
          <Progress value={uniquenessScore} className="h-2" />
        </div>

        <Accordion type="single" collapsible defaultValue="similarities" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AccordionItem value="similarities" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  <span>Similarities</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{analysis.similarities}</ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AccordionItem value="differences" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  <span>Differences</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{analysis.differences}</ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AccordionItem value="suggestions" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  <span>Suggestions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{analysis.suggestions}</ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        </Accordion>
      </div>
    </div>
  )
}

function getUniquenessVariant(score) {
  if (score >= 70) return "success"
  if (score >= 40) return "warning"
  return "destructive"
}

